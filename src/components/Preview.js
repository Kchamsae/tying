import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  useCallback
} from 'react';

import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as typingActions } from '../redux/modules/typing';
import { actionCreators as wordActions } from '../redux/modules/word';
import { actionCreators as scriptActions } from '../redux/modules/script';
import DictModal from './DictModal/DictModal';
import Bookmark from './Bookmark';
import _ from 'lodash';

const Preview = memo(
  forwardRef(
    (
      {
        userInput,
        focus,
        text_num,
        setTextNum,
        setText,
        giveFocus,
        script_id,
        setEnterState,
      },
      ref
    ) => {
      useImperativeHandle(ref, () => ({
        next,
      }));
      const script_data = useSelector((state) => state.script.typing_script);
      const script = script_data?.scriptParagraph;
      const [word_modal, setWordModal] = useState(false);
      const [word, setWord] = useState('');
      const [sentence, setSentence] = useState('');
      const [focus_in, setFocusIn] = useState(false);

      const charRef = useRef();
      const charPrevRef = useRef();
      const charHeightRef = useRef();

      // const [focus, setFocus] = useState('out');

      const dispatch = useDispatch();

      const script_splitted_sentence = useMemo(() => {
        // 문장수준까지 나눈 배열
        return script?.map((a) => {
          return a.match(/[^\.!\?]+[(\.\s|\.)(!\s|!)(\?\s|\?)(\:\s|\:)]+/g);
        });
      }, [script]);

      const script_splitted_word = useMemo(() => {
        // 단어수준까지 나눈 배열
        return script_splitted_sentence?.map((a) =>
          a.map((b) => {
            return b.match(/[0-9a-zA-Z.,’'?\(\)":;\-—\$\%\&\#]+[$(\.|\s:?)+]/gi);
          })
        );
      }, [script]);

      const script_splitted = useMemo(
        () =>
          script_splitted_word?.map((a) =>
            a.map((b) => b.map((c) => c.split('')))
          ),
        [script]
      ); // 글자수준으로 나눈 배열

      const scrollRef = useRef();
      const paragraphRef = useRef([]);
      const paragraphWrapRef = useRef([]);

      const paragraph_divided = useSelector(
        (state) => state.typing.divided_num
      );
      const current_divided = useSelector(
        (state) => state.typing.current_divided
      );

      useEffect(()=>{
        if(focus){
          setFocusIn(true);
        }else if(!focus){
          setFocusIn(false);
        }
      },[focus])

      useEffect(() => {
        const standard = paragraphRef.current[text_num]?.offsetTop + ((current_divided + 1)*3-1) * charPrevRef.current?.clientHeight;
        
        if (standard < charRef.current?.offsetTop && charRef.current?.offsetTop > charPrevRef.current?.offsetTop) {
          setEnterState(true);
        } else {
          setEnterState(false);
        }
      }, [userInput]);

      useEffect(() => {
        let paragraph_height = [];
        for (let i = 0; i < script?.length; i++) {
          // console.log(paragraphRef.current[i].clientHeight);
          paragraph_height[i] = paragraphRef.current[i]?.clientHeight;
        }

        if (script_data === {} || script_data.scriptId !== script_id) {
          dispatch(scriptActions.setOneScriptDB(script_id)).then((res) => {
            for (let i = 0; i < res?.length; i++) {
              console.log(paragraphRef.current[i]?.clientHeight);
              paragraph_height[i] = paragraphRef.current[i]?.clientHeight;
            }
            dispatch(typingActions.divideParagraph(paragraph_height,charPrevRef.current?.clientHeight));
          });
        } else {
          dispatch(typingActions.divideParagraph(paragraph_height,charPrevRef.current?.clientHeight));
        }
       
      }, [script]);


      const prev = useCallback(
        () => {
          if (current_divided !== 0) {
            paragraphWrapRef.current[text_num].scroll({
              behavior: 'smooth',
              left: 0,
              top: (current_divided - 1) * (charHeightRef.current?.clientHeight*3),
            });
            dispatch(typingActions.setCurrentDivided(current_divided - 1));
          } else if (text_num > 0 && current_divided === 0) {
            scrollRef.current.scroll({
              behavior: 'smooth',
              left: 0,
              top: paragraphRef.current[text_num - 1].offsetTop - parseFloat(window.getComputedStyle(paragraphWrapRef.current[0]).getPropertyValue('margin-top')),
            });
            dispatch(
              typingActions.setCurrentDivided(paragraph_divided[text_num - 1] - 1)
            );
            setTextNum((text_num) => text_num - 1);
            setText(script[text_num - 1]);
          }
        },[text_num,userInput, current_divided]
      )

      const next = useCallback(
        () => {
          console.log(current_divided, )
          if (current_divided + 1 !== paragraph_divided[text_num]) {
            paragraphWrapRef.current[text_num].scroll({
              behavior: 'smooth',
              left: 0,
              top: (current_divided + 1) * (charPrevRef.current?.clientHeight*3),
            });
            dispatch(typingActions.setCurrentDivided(current_divided + 1));
          } else if (
            text_num < script_splitted?.length - 1 &&
            current_divided + 1 === paragraph_divided[text_num]
          ) {
            scrollRef.current.scroll({
              behavior: 'smooth',
              left: 0,
              top: paragraphRef.current[text_num + 1].offsetTop - parseFloat(window.getComputedStyle(paragraphWrapRef.current[0]).getPropertyValue('margin-top')),
            });
            setTextNum((text_num) => text_num + 1);
            setText(script[text_num + 1]);
            dispatch(typingActions.setCurrentDivided(0));
          }
        },[userInput,text_num, current_divided]
      )

      const openDict = _.throttle(
        (w, si) => {
            console.log(focus,focus_in);
          if(focus_in){
            setWord(w.join('').trim().match(/^[a-zA-Z][a-zA-z-]+/).toString().toLowerCase());
            setSentence(script_splitted_sentence[text_num][si].trim());
            setWordModal(true);
          }
        },1000);

      const sentences = useMemo(() => {
        return script_splitted?.map((p, pi) => {
          return (
            <div
              className='paragraph-wrap'
              key={pi}
              ref={(e) => (paragraphWrapRef.current[pi] = e)}
            >
              <div
                key={pi}
                ref={(e) => (paragraphRef.current[pi] = e)}
                className='paragraph-box'
              >
                {p?.map((s, si) => {
                  return (
                    <ul className='sentence' key={si}> 
                      {s?.map((w, wi) => {
                        return (
                          <li className={focus ? 'word word-click' : 'word'} key={wi} onClick={()=>{openDict(w, si)}}>
                            {w?.map((a, i) => {
                              let n = 0;
                              for (let j = 0; j < pi; j++) {
                                n += script[j].length;
                              }

                              for (let j = 0; j < si; j++) {
                                n += script_splitted_sentence[pi][j].length;
                              }

                              for (let j = 0; j < wi; j++) {
                                n += script_splitted_word[pi][si][j].length;
                              }
                              n += i;

                              if (n < userInput?.length) {
                                if (a === userInput[n]) {
                                  if (a === ' ') {
                                    return (
                                      <span key={i} className='space'>
                                        {a}
                                      </span>
                                    );
                                  } else {
                                    return (
                                      <span key={i} className='correct'>
                                        {a}
                                      </span>
                                    );
                                  }
                                } else {
                                  if (userInput[n] === ' ') {
                                    return (
                                      <span key={i} className='space-wrong'>
                                        _
                                      </span>
                                    );
                                  } else {
                                    return (
                                      <span key={i} className='wrong'>
                                        {userInput[n]}
                                      </span>
                                    );
                                  }
                                }
                              }
                              if (n === userInput?.length) {
                                if (a === ' ') {
                                  return (
                                    <span key={i} className={focus ? 'is-next-space space' : 'space'} ref={charPrevRef}>
                                      {a}
                                    </span>
                                  );
                                } else {
                                  return (
                                    <span key={i} className={focus ? 'is-next' : ''} ref={charPrevRef}>
                                      {a}
                                    </span>
                                  );
                                }
                              }
                              if (
                                text_num === pi &&
                                n === userInput?.length + 1
                              ) {
                                if (a === ' ') {
                                  return (
                                    <span key={i} className='space' ref={charRef}>
                                      {a}
                                    </span>
                                  );
                                } else {
                                  return (
                                    <span key={i} ref={charRef}>
                                      {a}
                                    </span>
                                  );
                                }
                              }
                              if (a === ' ') {
                                return (
                                  <span key={i} className='space'>
                                    {a}
                                  </span>
                                );
                              } else if (a.match(/[0-9.,!?"'-;:%$&\(\)]/)) {
                                return (
                                  <span key={i} className='not-char'>
                                    {a}
                                  </span>
                                );
                              } else {
                                return <span key={i}>{a}</span>;
                              }
                            })}
                          </li>
                        );
                      })}
                    </ul>
                  );
                })}
              </div>
            </div>
          );
        });
      }, [userInput, focus, word_modal, script, text_num, script]);

      return (
        <>
          <Wrapper onClick={giveFocus}>
            <UpDownButtonBox>
              <button onClick={(e) => { e.stopPropagation(); if(paragraph_divided.length !== 0) prev(); }}
                disabled={text_num === 0 && current_divided === 0 ? true : false}>
                <svg width='19' height='17' viewBox='0 0 19 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M19 15.6508C19 15.2011 18.8204 14.8188 18.5623 14.369L10.9982 1.25926C10.4483 0.326057 10.0892 -4.41013e-07 9.49439 -4.15013e-07C8.89958 -3.89013e-07 8.54046 0.326057 8.00177 1.25926L0.426462 14.369C0.16834 14.8188 -7.86342e-08 15.2011 -5.89757e-08 15.6508C-2.26073e-08 16.4828 0.62847 17 1.60484 17L17.3839 17C18.3603 17 19 16.4828 19 15.6508Z' fill='#c1c1c1'/>
                </svg>
              </button>
              <button onClick={(e) => { e.stopPropagation(); if(paragraph_divided.length !== 0) next(); }}
                disabled={text_num === script_splitted?.length - 1 &&current_divided + 1 === paragraph_divided[text_num]? true : false}>
                <svg width='19' height='17' viewBox='0 0 19 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M19 15.6508C19 15.2011 18.8204 14.8188 18.5623 14.369L10.9982 1.25926C10.4483 0.326057 10.0892 -4.41013e-07 9.49439 -4.15013e-07C8.89958 -3.89013e-07 8.54046 0.326057 8.00177 1.25926L0.426462 14.369C0.16834 14.8188 -7.86342e-08 15.2011 -5.89757e-08 15.6508C-2.26073e-08 16.4828 0.62847 17 1.60484 17L17.3839 17C18.3603 17 19 16.4828 19 15.6508Z' fill='#c1c1c1'/>
                </svg>
              </button>
              <div className='paragraph-now'>{`${text_num + 1}/${script ? script?.length : '1'}`}</div>
            </UpDownButtonBox>
            <Bookmark script_id={script_id} detail/>
            <PreviewBox ref={scrollRef}>{sentences}</PreviewBox>
          </Wrapper>
          {word_modal && (
            <>
              <DictModalBg
                onClick={() => {
                  setWordModal(false);
                  setWord('');
                  setSentence('');
                  dispatch(wordActions.setDict([]));
                }}
              />
              <DictModal word={word} sentence={sentence}>
                <DictModalClose
                  onClick={() => {
                    setWordModal(false);
                    setWord('');
                    setSentence('');
                    dispatch(wordActions.setDict([]));
                  }}
                >
                  <svg
                    viewBox='0 0 17 17'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M8.5 17C13.1944 17 17 13.1943 17 8.5C17 3.80566 13.1944 0 8.5 0C3.80557 0 0 3.80566 0 8.5C0 13.1943 3.80557 17 8.5 17ZM12.2657 4.73438C12.5781 5.04663 12.5781 5.55322 12.2657 5.86572L9.63138 8.5L12.2657 11.1343C12.5781 11.4468 12.5781 11.9534 12.2657 12.2656C11.9533 12.5781 11.4467 12.5781 11.1343 12.2656L8.5 9.63135L5.86569 12.2656C5.55328 12.5781 5.04675 12.5781 4.73431 12.2656C4.42191 11.9534 4.42191 11.4468 4.73431 11.1343L7.36862 8.5L4.73431 5.86572C4.42191 5.55322 4.42191 5.04663 4.73431 4.73438C5.04672 4.42188 5.55325 4.42188 5.86569 4.73438L8.5 7.36865L11.1343 4.73438C11.4467 4.42188 11.9533 4.42188 12.2657 4.73438Z'
                      fill='#F5F5F5'
                    />
                  </svg>
                </DictModalClose>
              </DictModal>
            </>
          )}
        </>
      );
    }
  )
);

const DictModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 850;
`;
const DictModalClose = styled.div`
  width: 0.89vw;
  height: 0.89vw;
  border-radius: 50%;
  position: absolute;
  right: 1.77vw;
  top: 1.15vw;
  cursor: pointer;
  z-index: 10001;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

const UpDownButtonBox = styled.div`
  position: absolute;
  bottom: 0;
  right: -3.39vw;
  height: 5.05vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 6;

  button {
    display: block;
    background-color: transparent;
    border-radius: 0;
    border: 0;
    cursor: pointer;
    outline: none;
    >svg{
      width: 0.99vw;
      height: 0.89vw;
    }
    > svg > path {
      transition: 0.3s;
    }
    > svg:hover > path {
      fill: #878889;
    }
  }
  button:last-of-type {
    transform: rotate(180deg);
  }
  .paragraph-now {
    margin-top: -0.05vw;
    font-weight: 500;
    font-size: 0.83vw;
    letter-spacing: -0.015em;
    color: #878889;
    text-align: center;
  }
`;

const PreviewBox = styled.div`
  width: 100%;
  height: 16.3vw;
  font-size: 1.3vw;
  color: #878889;
  background-color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 0.26vw;
  letter-spacing: 0.02em;
  line-height: 2.08vw;
  overflow: hidden;

  .paragraph-wrap {
    width: calc(100% - 2.6vw);
    height: 6.25vw;
    padding-left: 2Wpx;
    box-sizing: border-box;
    overflow: hidden;
    margin: 5.03vw 1.3vw;
  }

  .paragraph-box {
    width: 100%;
    box-sizing: border-box;
    word-wrap: break-word;
  }

  .sentence {
    display: inline;
    padding: 0;
  }

  .word {
    display: inline-flex;
  }

  .word-click {
    &:hover {
      span:not(.space, .space-wrong, .not-char) {
        background-color: #ffc4b8;
        cursor: pointer;
      }
    }
  }

  span {
    display: inline-block;
    font-weight: 400;
  }

  .correct {
    color: #333;
  }

  .wrong,
  .space-wrong {
    color: #ff2e00;
  }

  .space {
    width: 0.52vw;
  }

  .is-next {
    position: relative;
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: calc(50% - 0.78vw);
      left: -0.0625rem;
      height: 1.56vw;
      border-left: 0.16vw solid #ff6442;
      animation: 1000ms ease 0ms 1 normal forwards running blinking;
      animation-iteration-count: infinite;
      z-index: 0;

      @keyframes blinking {
        0% {
          border-left: 0.16vw solid #ff6442;
        }
        100% {
          border-left: 0px solid #ff6442;
          border-left: none;
        }
      }
    }
  }

  .is-next-space {
    position: relative;
    &::before {
      content: '';
      display: block;
      position: absolute;
      bottom: 0.36vw;
      left: 0;
      width: 100%;
      border-bottom: 0.16vw solid #ff2e00;
      animation: 1000ms ease 0ms 1 normal forwards running blinking_s;
      animation-iteration-count: infinite;

      @keyframes blinking_s {
        0% {
          border-bottom: 0.16vw solid #ff2e00;
        }
        100% {
          border-bottom: 0px solid #ff2e00;
          border-bottom: none;
        }
      }
    }
  }
`;
export default Preview;
