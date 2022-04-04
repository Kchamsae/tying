import Preview from '../../components/Preview';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as scriptActions } from '../../redux/modules/script';

import { useParams } from 'react-router-dom';

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
  TitleMore,
  FinishBtn,
} from './style';
import CertificateModal from '../../components/CertificateModal/CertificateModal';
import dayjs from 'dayjs';
import { alertNew, confirmNew } from '../../shared/alert';
import HowToUseButton from '../../components/HowToUseButton';

function Typing() {
  const script_id = +useParams().script_id;
  const script_data = useSelector((state) => state.script.typing_script);

  const script = useSelector((state) => state.script.typing_script?.scriptParagraph);

  const [text_num, setTextNum] = useState(0); // 현재 위치한 문단 번호
  const [text, setText] = useState(script ? script[0] : ''); // 현재 위치한 문단의 텍스트 내용
  const [userInput, setUserInput] = useState(''); // 문단 별 유저가 입력한 텍스트 값
  const [sec, setSec] = useState(0); // 문단 별 타이핑을 시작하고 흐른 시간 (cpm계산에 사용)
  const [sec_added, setSecAdded] = useState(0); // 시간 멈추기 전에 흘렀던 시간
  const [cpm, setCpm] = useState(0); // 문단 별 cpm(타수)
  const [started, setStarted] = useState(false); // 시작 여부 (false일 경우 타이핑 시작 시 setInterval 작동)
  const [accuracy, setAccuracy] = useState(100); // 문단 별 정확도
  const [focusin, setFocusin] = useState(false); // 현재 텍스트 입력 창에 포커스 여부
  const [enter_state, setEnterState] = useState(false); // 문단은 바뀌지 않으면서 다음페이지로 넘어갈 상태가 되었는지 여부

  const [list_on, setListOn] = useState(false); // 카테고리 리스트 열기
  const [list_arrow_on, setListArrowOn] = useState(false); // 카테고리 리스트 아이콘
  const [state_on, setStateOn] = useState(true); // 상태박스 리스트 열기
  const [state_button_on, setStateButtonOn] = useState(true); // 상태박스 버튼
  
  const [left_open, setLeftOpen] = useState(false); // 왼쪽 카테고리 이동 창 개폐 여부
  const [right_open, setRightOpen] = useState(false); // 오른쪽 해석 창 개폐 여부
  
  const [save_phrase, setSavePhrase] = useState(true); // 인증서발급 버튼 안내 문구 표시 여부
  const [save_phrase_ani, setSavePhraseAni] = useState(true); // 인증서발급 버튼 안내 문구 애니메이션

  const [certificate, setCertificate] = useState(false); // 인증서 모달 활성화

  const textbox = React.useRef(); // textarea

  const nowRef = React.useRef(null); // 시작한 시각
  const intervalRef = React.useRef(null); // setInterval 담기

  const upDownRef = React.useRef(); // preview에서 가져올 함수

  const titleRef = React.useRef();

  const dispatch = useDispatch();


  useEffect(() => {
    // textarea에서 방향키 작동 X
    textbox.current.addEventListener('keydown', (e) => {
      if (
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp'
      ) {
        e.preventDefault();
      }
    });
    // textarea에 포커스되었을 때 
    textbox.current.addEventListener('focusin', () => {
      setFocusin(true);
    });
  }, []);

  const focusOut = useCallback(
    ()=>{
      setFocusin(false);
      const _sec = sec;
      setSecAdded(sec_added+_sec);
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      nowRef.current = null;
      setStarted(false);
      setSec(0);
    },
    [sec,sec_added]
  )

  useEffect(()=>{
    textbox.current.addEventListener("focusout", focusOut)
    return (()=>textbox.current?.removeEventListener("focusout", focusOut))
  },[sec,sec_added])

  // 초기화 할 때 세팅해야하는 것들
  const onRestart = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    nowRef.current = null;
    setUserInput('');
    setSec((sec) => 0);
    setSecAdded((sec_added) => 0);
    setAccuracy(100);
    setStarted(false);
    setTextNum(0)
  };

  // 키가 눌릴 때마다 작동할 함수
  const nextStart = useCallback(
    (e) => {
      const text_length = (n) => {
        let total_length = 0;
        for (let i = 0; i <= n; i++) {
          total_length += script[i].length;
        }
        return total_length;
      };
      // 한글로 입력했을 때
      if(e.key === 'Process'){
        e.preventDefault();
        alertNew('영어로 입력해주세요!');
        return;
      }
      // shift키 이벤트 없음
      if(e.key === 'Shift') return;
      // 텍스트를 모두 입력했을 때 모달창 활성화
      if(userInput.length >= script?.join('').length && e.key !== 'Backspace') {
        e.preventDefault();
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setCpm(calCpm(userInput));
        setCertificate(true);
        return;
      }
      // 한 문단을 다 입력했을 때 다음 문단으로 넘어감
      if (userInput.length >= text_length(text_num) && e.key !== 'Backspace') {
        const a = text_num;
        e.preventDefault();
        upDownRef.current.next();
        setTextNum((text_num) => a + 1);
        setText(script[a + 1]);
        giveFocus();
        return;
      // 문단이 끝나지는 않았지만 화면상의 텍스트를 모두 입력해 페이지가 넘어감
      } else if (enter_state && e.key !== 'Backspace') {
        upDownRef.current.next();
        userInput.concat(' ');
        setEnterState(false);
        giveFocus();  
      // 텍스트를 모두 지웠을 때 초기화
      } else if (userInput.length <= 1 && e.key === 'Backspace') {
        e.preventDefault();
        setUserInput((userInput) => userInput.slice(0, -1));
        console.log('...');
        onRestart();
        return;
      // 한 문단의 텍스트를 모두 지워 전 문단으로 넘어감
      } else if(text_num >= 1 && userInput.length === text_length(text_num-1) && e.key === 'Backspace'){
        const a = text_num;
        e.preventDefault();
        upDownRef.current.prev();
        setTextNum((text_num) => a - 1);
        setText(script[a - 1]);
        giveFocus();
        return;
      }
      // enter키 이벤트 없음
      if (e.key === 'Enter') {
        e.preventDefault();
        return;
      }
      // 타이머가 멈춰있었을 경우 작동 시작
      setTimer();
      // 정확도 계산
      setAccuracy(checkAccuracy(userInput));
      // 입력되는 키에 따라 userInput에 값 추가
      setUserInput((userInput) => {
        e.preventDefault();
        // backspace는 마지막값 하나 삭제
        if (e.key === 'Backspace') {
          e.preventDefault();
          return userInput.slice(0, -1);
        }
        // 입력된 값의 길이가 1보다 클 경우 값의 변경 없음
        if (e.key.length > 1) return userInput;
        // 그 외의 경우 입력된 값을 마지막에 추가
        return userInput.concat(e.key);
      });
    },
    [userInput, text_num, setSec, script, enter_state]
  );

  // 키가 눌릴 때 마다 작동할 이벤트
  useEffect(() => {
    textbox.current.addEventListener('keydown', nextStart);
    return () => textbox.current?.removeEventListener('keydown', nextStart);
  }, [nextStart]);

  // 타이핑 속도 계산
  const calCpm = (userInput) => {
    const cpm =
      sec + sec_added === 0
        ? userInput.length * (50 / 0.01)
        : userInput.length / ((sec + sec_added) / 60);
    return Math.round(cpm);
  };

  // 정확도 계산
  const checkAccuracy = (userInput) => {
    if (userInput.length === 0) {
      return 100;
    }
    const correct_num = userInput.split('').filter((a, i) => a === script.join('')[i]).length;

    return Number.isNaN(accuracy) ? 100 : Math.floor((correct_num / userInput.length) * 100);
  };

  // 타이머 작동
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

  // 상태 창 on
  const stateOn = () => {
    setStateOn(!state_on);
    setStateButtonOn(!state_button_on);
  };

  // 상태 창 off
  const stateOff = () => {
    setStateButtonOn(!state_button_on);
    setTimeout(() => {
      setStateOn(!state_on);
    }, 300);
  };

  // 인증서 발급버튼 문구 on
  const phraseOn = () => {
    setSavePhrase(true);
    setSavePhraseAni(true);
  }

  // 인증서 발급버튼 문구 off
  const phraseOff = () => {
    setSavePhraseAni(false);
    setTimeout(()=>{
      setSavePhrase(false);
    },300);
  }

  // 타이핑 창에 포커스
  const giveFocus = () => {
    textbox.current.focus();
    textbox.current.selectionStart = textbox.current.selectionEnd =
      textbox.current.value.length;
  };

  // 카테고리 변경 창 리스트
  const toefl_small = [
    'Agree / Disagree',
    'Paired Choice',
    'Multiple Choice',
    'Good Idea',
    'All'
  ];
  const ielts_small = [
    'Agree / Disagree',
    'Both views',
    'Advantage / Disadvantage',
    'Problem & Solution',
    'All'
  ];
  const article_small = [
    'The New York Times',
    'National Geographic',
    'The Korea Times',
    'All'
  ];

  // 카테고리 변경 창 선택 시 작동
  const moveScript = (e) => {
    if(e.target.innerText === 'All'){
      dispatch(
        scriptActions.randomCategoryScriptDB(
          script_data?.scriptType,
          'all',
          true
        )
      ).then((res) => {
        window.location.replace(`/typing/${res}`);
      });
    } else{
      const _small_category = e.target.innerText
        .split('')
        .map((a) => (a === '/' ? (a = '%2F') : a))
        .join('');
      dispatch(
        scriptActions.randomCategoryScriptDB(
          script_data?.scriptType,
          _small_category,
          true
        )
      ).then((res) => {
        window.location.replace(`/typing/${res}`);
      });
    }
  };

  // 타이핑 모두 끝냈을 때 작동
  const finishScript = () => {
    confirmNew('정말 타이핑을 끝내시겠습니까?',()=>{
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setCpm(calCpm(userInput));
      setCertificate(true);
    },()=>{
      return;
    });
  }

  return (
    <>
      {certificate && (
        <>
          <ModalBg />
          <CertificateModal
            sec={sec + sec_added}
            cpm={cpm}
            char_num={userInput.length}
            progress={(userInput.length / script?.join('').length) * 100}
            onRestart={onRestart}
            setCertificate={setCertificate}
          />
        </>
      )}
      <TypingWrap>
        {script && userInput.length >= script[0]?.length && (
          <FinishBtn onClick={finishScript} onMouseEnter={phraseOn} onMouseLeave={phraseOff} on={save_phrase && true} onAni={save_phrase_ani && true}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 16.5V21H3V16.5H0V21C0 22.65 1.35 24 3 24H21C22.65 24 24 22.65 24 21V16.5H21ZM19.5 10.5L17.385 8.385L13.5 12.255V0H10.5V12.255L6.615 8.385L4.5 10.5L12 18L19.5 10.5Z" fill="black"/>
            </svg>
            <div>
              인증서 발급받고 마치기
              <span/>
            </div>
          </FinishBtn>
        )}
        <HowToUseButton/>
        <SectionSide side={'left'} on={left_open && true}>
          <i onClick={() => { setLeftOpen(!left_open); }}>
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
                  width: `${(userInput.length * 100) / script?.join('').length}%`,
                }}
              ></div>
            </ProgressBar>
            <ProgressNum>
              <span>
                {userInput.length}/{script?.join('').length}
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
            <textarea ref={textbox}/>
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

export default Typing;
