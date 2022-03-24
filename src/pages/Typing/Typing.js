import Preview from '../../components/Preview';
import React, { useCallback, useEffect, useState } from 'react';
import { textList } from '../../shared/getText';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as scriptActions } from '../../redux/modules/script';

import { useParams } from 'react-router-dom';
import { history } from '../../redux/configureStore';

import {
  TypingWrap,
  SectionSide,
  CategoryWrapper,
  Category,
  SmallCategory,
  SelectCategory,
  SelectHeader,
  SelectList,
  TranslateHeader,
  Translate,
  SectionCenter,
  TitleProgress,
  Title,
  ProgressBar,
  ProgressNum,
  TypingBox,
  Source,
  StateBox,
  Toggle,
  State,
  StateItem,
  ModalBg,
} from './style';
import CertificateModal from '../../components/CertificateModal/CertificateModal';
import dayjs from 'dayjs';
import styled from 'styled-components';

function Typing() {
  const script_id = +useParams().script_id;
  const script_data = useSelector((state) => state.script.typing_script);

  const _script = useSelector(
    (state) => state.script.typing_script?.scriptParagraph
  );
  const script = _script?.join('\n').split('\n');
  // const script = textList.split('\n');
  // console.log(script)
  const [text_num, setTextNum] = useState(0); // 현재 위치한 문단 번호
  const [text, setText] = useState(script ? script[0] : ''); // 현재 위치한 문단의 텍스트 내용
  const [userInput, setUserInput] = useState(''); // 문단 별 유저가 입력한 텍스트 값
  const [sec, setSec] = useState(0); // 문단 별 타이핑을 시작하고 흐른 시간 (cpm계산에 사용)
  const [sec_added, setSecAdded] = useState(0); // 시간 멈추기 전에 흘렀던 시간
  const [cpm, setCpm] = useState(0); // 문단 별 cpm(타수)
  const [started, setStarted] = useState(false); // 시작 여부 (false일 경우 타이핑 시작 시 setInterval 작동)
  const [accuracy, setAccuracy] = useState(100); // 문단 별 정확도
  const [focusin, setFocusin] = useState(false); // 현재 텍스트 입력 창에 포커스 여부

  const [list_on, setListOn] = useState(false); // 카테고리 리스트 열기
  const [list_arrow_on, setListArrowOn] = useState(false); // 카테고리 리스트 아이콘
  const [state_on, setStateOn] = useState(false); // 상태박스 리스트 열기
  const [state_button_on, setStateButtonOn] = useState(false); // 상태박스 버튼

  const [enter_state, setEnterState] = useState(false);
  const [left_open, setLeftOpen] = useState(false);
  const [right_open, setRightOpen] = useState(false);

  const [certificate, setCertificate] = useState(false);

  const textbox = React.useRef(); // textarea

  const nowRef = React.useRef(null); // 시작한 시각
  const intervalRef = React.useRef(null); // setInterval 담기
  // const secRef = React.useRef(0); // 시작시간으로부터 지난 시간

  const upDownRef = React.useRef(); // preview에서 가져올 함수

  const titleRef = React.useRef();

  const paragraph_divided = useSelector((state) => state.typing.divided_num);

  const dispatch = useDispatch();

  // const script = useSelector(state => state.script.typing_script?.scriptParagraph);

  useEffect(() => {
    // textarea에서 방향키 작동 X
    console.log(dayjs().format('YYYY/MM/DD hh:mm A'));
    textbox.current.addEventListener('keydown', (e) => {
      if (
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp'
      ) {
        console.log('방향키');
        e.preventDefault();
      }
    });
    // textarea에 포커스되었을 때 state값 세팅 (preview박스에서 커서 보이도록 작동시키는 데에 사용)
    textbox.current.addEventListener('focusin', () => {
      console.log('포커스 세팅');
      setFocusin(true);
    });
  }, []);

  useEffect(()=>{
    textbox.current.addEventListener("focusout", () => {
    console.log("포커스 아웃");
    console.log(sec,sec_added)
    setFocusin(false);
    const _sec = sec
    setSecAdded(sec_added+_sec);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    nowRef.current = null;
    setStarted(false);
    setSec(0);
  });
  },[sec,sec_added])

  // // 다음 문단으로 넘어갈 때 세팅해야하는 것들
  // const onStop = () => {
  //   clearInterval(intervalRef.current);
  //   intervalRef.current = null;
  //   nowRef.current = null;
  //   setStarted(false);
  // };
  // 문단을 초기화 할 때 세팅해야하는 것들
  const onRestart = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    nowRef.current = null;
    setUserInput('');
    setSec((sec) => 0);
    setSecAdded((sec_added) => 0);
    setAccuracy(100);
    setStarted(false);
  };
  // 다음문단으로 넘어가거나 내용을 모두 지웠을 때 이벤트리스너로 전달될 함수
  const nextStart = useCallback(
    (e) => {
      // 텍스트를 모두 입력했을 때
      const text_length = (n) => {
        let total_length = 0;
        for (let i = 0; i <= n; i++) {
          total_length += script[i].length;
        }
        return total_length;
      };
      if (e.key === 'Shift') return;
      if (userInput.length >= script[0].length) {
        e.preventDefault();
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setCpm(calCpm(userInput));
        setCertificate(true);
        // alert("스크립트 타이핑을 완료하셨습니다!");
        // history.push("/");
        return;
      }
      if (userInput.length >= text_length(text_num)) {
        const a = text_num;
        e.preventDefault();
        upDownRef.current.next();
        setTextNum((text_num) => a + 1);
        setText(script[a + 1]);
        giveFocus();
        return;
      } else if (enter_state) {
        e.preventDefault();
        upDownRef.current.next();
        // onNextstart();
        userInput.concat(' ');
        setEnterState(false);
        giveFocus();
        return;
      } else if (userInput.length <= 1 && e.key === 'Backspace') {
        // 텍스트를 모두 지웠을 때 초기화
        e.preventDefault();
        setUserInput((userInput) => userInput.slice(0, -1));
        console.log('...');
        onRestart();
        return;
      }
      setTimer();
      setAccuracy(checkAccuracy(userInput));
      setUserInput((userInput) => {
        e.preventDefault();
        if (e.key === 'Backspace') {
          e.preventDefault();
          return userInput.slice(0, -1);
        }

        if (e.key === 'Enter') {
          e.preventDefault();
          return;
        }

        if (e.key.length > 1) return userInput;

        return userInput.concat(e.key);
      });
    },
    [userInput, text_num, setSec, script]
  );

  useEffect(() => {
    // 한 문단의 작성이 끝났을 때 다음 문단으로 넘어가는 이벤트
    console.log(enter_state);
    textbox.current.addEventListener('keydown', nextStart);
    return () => textbox.current.removeEventListener('keydown', nextStart);
  }, [nextStart]);

  // const onUserInputChange = (e) => {
  //   const v = e.target.value;
  //   setTimer();
  //   setUserInput(v);
  //   // setSymbols(countCorrectSymbols(v));
  //   // setCpm(calCpm(v));
  //   setAccuracy(checkAccuracy(v));
  // }

  const calCpm = (userInput) => {
    const cpm =
      sec + sec_added === 0
        ? userInput.length * (50 / 0.01)
        : userInput.length / ((sec + sec_added) / 60);
    return Math.round(cpm);
  };

  const checkAccuracy = (userInput) => {
    if (userInput.length === 0) {
      return 100;
    }
    const correct_num = userInput
      .split('')
      .filter((a, i) => a === script.join('')[i]).length;
    return Number.isNaN(accuracy)
      ? 100
      : Math.floor((correct_num / userInput.length) * 100);
  };

  // const countCorrectSymbols = (userInput) => {
  //   const _text = text.replace(' ','');
  //   return userInput.replace(' ','').split('').filter((a,i) => a === _text[i]).length;
  // }

  const setTimer = () => {
    if (!started && intervalRef.current === null) {
      if (nowRef.current === null) {
        nowRef.current = Date.now();
      }
      setStarted(true);
      intervalRef.current = setInterval(() => {
        const elapsedTime = Date.now() - nowRef.current;
        setSec(elapsedTime / 1000);
      }, 100);
    }
  };

  const listOn = () => {
    setListOn(!list_on);
    setListArrowOn(!list_arrow_on);
  };

  const listOff = () => {
    setListArrowOn(!list_arrow_on);
    setTimeout(() => {
      setListOn(!list_on);
    }, 300);
  };

  const stateOn = () => {
    setStateOn(!state_on);
    setStateButtonOn(!state_button_on);
  };

  const stateOff = () => {
    setStateButtonOn(!state_button_on);
    setTimeout(() => {
      setStateOn(!state_on);
    }, 300);
  };

  const giveFocus = () => {
    textbox.current.focus();
    textbox.current.selectionStart = textbox.current.selectionEnd =
      textbox.current.value.length;
  };

  const toefl_small = [
    'Agree / Disagree',
    'Paired Choice',
    'Multiple Choice',
    'Good Idea',
  ];
  const ielts_small = [
    'Agree / Disagree',
    'Both views',
    'Advantage / Disadvantage',
    'Problem & Solution',
  ];
  const article_small = [
    'The New York Times',
    'National Geographic',
    'The Korea Times',
  ];

  const moveScript = (e) => {
    const _small_category = e.target.innerText
      .split('')
      .map((a) => (a === '/' ? (a = '%2F') : a))
      .join('');
    dispatch(
      scriptActions.randomCategoryScriptDB(
        script_data?.scriptType,
        _small_category
      )
    ).then((res) => {
      history.replace(`/typing/${res.script_id}`);
    });
  };

  return (
    <>
      {certificate && (
        <>
          <ModalBg />
          <CertificateModal
            sec={sec + sec_added}
            cpm={cpm}
            char_num={userInput.length}
            progress={(userInput.length / textList.length) * 100}
          />
        </>
      )}
      <TypingWrap>
        <SectionSide side={'left'} on={left_open && true}>
          <i
            onClick={() => {
              setLeftOpen(!left_open);
            }}
          >
            <svg
              width='13'
              height='21'
              viewBox='0 0 13 21'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M11.4853 1.99909L3 10.4844L11.4853 18.9697'
                stroke='#636366'
                strokeWidth='3'
                strokeLinecap='round'
              />
            </svg>
          </i>
          <CategoryWrapper>
            <Category>{script_data?.scriptType}</Category>
            <SmallCategory>{script_data?.scriptCategory}</SmallCategory>
          </CategoryWrapper>
          <SelectCategory>
            <SelectHeader
              onClick={() => {
                list_on ? listOff() : listOn();
              }}
              on={list_arrow_on && true}
            >
              카테고리 바꾸기
              <i>
                <svg
                  width='12'
                  height='9'
                  viewBox='0 0 12 9'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M5.19384 1.09666C5.59344 0.552846 6.40591 0.552845 6.80551 1.09666L10.8919 6.65786C11.3772 7.31828 10.9056 8.25 10.0861 8.25L1.91325 8.25C1.09371 8.25 0.622136 7.31828 1.10742 6.65786L5.19384 1.09666Z'
                    fill='#636366'
                  />
                </svg>
              </i>
            </SelectHeader>
            {list_on && script_data?.scriptType === 'TOEFL' && (
              <SelectList off={!list_arrow_on && true}>
                {toefl_small.map((a, i) => {
                  return (
                    <li key={i} onClick={moveScript}>
                      {a}
                    </li>
                  );
                })}
              </SelectList>
            )}
            {list_on && script_data?.scriptType === 'IELTS' && (
              <SelectList off={!list_arrow_on && true}>
                {ielts_small.map((a, i) => {
                  return (
                    <li key={i} onClick={moveScript}>
                      {a}
                    </li>
                  );
                })}
              </SelectList>
            )}
            {list_on && script_data?.scriptType === 'Article' && (
              <SelectList off={!list_arrow_on && true}>
                {article_small.map((a, i) => {
                  return (
                    <li key={i} onClick={moveScript}>
                      {a}
                    </li>
                  );
                })}
              </SelectList>
            )}
          </SelectCategory>
        </SectionSide>
        <SectionSide side={'right'} on={right_open && true}>
          <i
            onClick={() => {
              setRightOpen(!right_open);
            }}
          >
            <svg
              width='13'
              height='21'
              viewBox='0 0 13 21'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M11.4853 1.99909L3 10.4844L11.4853 18.9697'
                stroke='#636366'
                strokeWidth='3'
                strokeLinecap='round'
              />
            </svg>
          </i>
          <TranslateHeader>
            Translate
            <span>번역</span>
          </TranslateHeader>
          <Translate>
            <div>
              <span>한글 뜻</span>
            </div>
            <div>
              {!script_data?.scriptTranslate
                ? ''
                : script_data?.scriptTranslate[text_num]}
            </div>
          </Translate>
        </SectionSide>
        <SectionCenter>
          <TitleProgress>
            <Title>

              <h3>{script_data?.scriptType} - {script_data?.scriptCategory}</h3>
              <h4 ref={titleRef} onClick={(e)=>console.log(e.target.clientHeight, e.target.offsetHeight, e.target.scrollHeight)}>{script_data?.scriptTitle}</h4>
              {titleRef.current?.clientHeight+2 < titleRef.current?.scrollHeight && (
<<<<<<< HEAD
=======

>>>>>>> d2ecef5c45ce2fad5e983744813736f70d339191
                <TitleMore>
                  <span></span>
                  <div>
                    {script_data?.scriptTitle}
                    <svg
                      viewBox='0 0 24 40'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g filter='url(#filter0_d_1569_11513)'>
                        <path
                          d='M16.1758 36C18.5132 36 19.9527 33.4452 18.7419 31.4459L0 0.5L4 36H16.1758Z'
                          fill='#DEDEDE'
                        />
                      </g>
                      <defs>
                        <filter
                          id='filter0_d_1569_11513'
                          x='0'
                          y='0.5'
                          width='23.1797'
                          height='39.5'
                          filterUnits='userSpaceOnUse'
                          colorInterpolationFilters='sRGB'
                        >
                          <feFlood
                            floodOpacity='0'
                            result='BackgroundImageFix'
                          />
                          <feColorMatrix
                            in='SourceAlpha'
                            type='matrix'
                            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                            result='hardAlpha'
                          />
                          <feOffset dx='2' dy='2' />
                          <feGaussianBlur stdDeviation='1' />
                          <feComposite in2='hardAlpha' operator='out' />
                          <feColorMatrix
                            type='matrix'
                            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0'
                          />
                          <feBlend
                            mode='normal'
                            in2='BackgroundImageFix'
                            result='effect1_dropShadow_1569_11513'
                          />
                          <feBlend
                            mode='normal'
                            in='SourceGraphic'
                            in2='effect1_dropShadow_1569_11513'
                            result='shape'
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                </TitleMore>
              )}
            </Title>
            <ProgressBar>
              <div
                style={{
                  width: `${(userInput.length * 100) / textList.length}%`,
                }}
              ></div>
            </ProgressBar>
            <ProgressNum>
              <span>
                {userInput.length}/{textList.length}
              </span>
            </ProgressNum>
          </TitleProgress>
          <TypingBox>
            <Preview
              userInput={userInput}
              focus={focusin}
              text_num={text_num}
              giveFocus={giveFocus}
              setTextNum={(n) => {
                setTextNum(n);
              }}
              setText={(n) => {
                setText(n);
              }}
              script_id={script_id}
              setEnterState={setEnterState}
              ref={upDownRef}
            />
            <textarea ref={textbox} />
          </TypingBox>
          <Source>
            <span>출처 - </span>
            <a
              href={script_data?.scriptSource}
              target='_blank'
              rel='noreferrer'
            >
              {script_data?.scriptSource}
            </a>
          </Source>
          <StateBox>
            <Toggle
              on={state_button_on && true}
              onClick={() => {
                state_on ? stateOff() : stateOn();
              }}
            />
            {state_on && (
              <State on={state_button_on && true}>
                <StateItem timer>
                  <div>TIMER</div>
                  {Math.floor(Math.round(sec + sec_added) / 60).toString()
                    .length < 2
                    ? '0' + Math.floor(Math.round(sec + sec_added) / 60)
                    : Math.floor(Math.round(sec + sec_added) / 60)}
                  :
                  {(Math.round(sec + sec_added) % 60).toString().length < 2
                    ? '0' + (Math.round(sec + sec_added) % 60)
                    : Math.round(sec + sec_added) % 60}
                </StateItem>
                <StateItem>
                  <div>SPEED</div>
                  {calCpm(userInput)}
                </StateItem>
                <StateItem>
                  <div>ACC</div>
                  {accuracy}
                </StateItem>
              </State>
            )}
          </StateBox>
        </SectionCenter>
      </TypingWrap>
    </>
  );
}

const TitleMore = styled.div`
  position: absolute;
  right: 0;
  bottom: 8px;

  > span {
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #ff2e00;
    position: relative;
    transition: 0.3s;

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: calc(50% - 1px);
      left: calc(50% - 5px);
      width: 10px;
      height: 2px;
      border-radius: 1px;
      background-color: #fff;
    }
    &::after {
      content: '';
      display: block;
      position: absolute;
      left: calc(50% - 1px);
      top: calc(50% - 5px);
      width: 2px;
      height: 10px;
      border-radius: 1px;
      background-color: #fff;
    }
  }

  > div {
    display: none;
    right: 22px;
    bottom: -270%;
    position: absolute;
    width: 1139px;
    padding: 26px 35px;
    box-sizing: border-box;
    background: #dedede;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.08);
    border-radius: 12px;

    font-weight: 500;
    font-size: 25px;
    line-height: 38px;
    letter-spacing: -0.017em;
    color: #616161;

    > svg {
      position: absolute;
      right: -20px;
      top: calc(50% - 20px);
      width: 24px;
      height: 40px;
    }
  }
  > span:hover + div {
    display: block;
  }
`;

export default Typing;
