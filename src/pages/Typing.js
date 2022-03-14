import styled from 'styled-components';
import Preview from '../components/Preview';
import React,{ useCallback, useEffect, useState } from 'react';
import { textList } from '../shared/getText';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as scriptActions } from '../redux/modules/script';
import { useParams } from 'react-router-dom';


function Typing() {

  const script = textList.split('\n')
  const [text_num, setTextNum] = useState(0); // 현재 위치한 문단 번호 
  const [text, setText] = useState(script[0]); // 현재 위치한 문단의 텍스트 내용
  const [userInput, setUserInput] = useState(''); // 문단 별 유저가 입력한 텍스트 값
  const [symbols, setSymbols] = useState(''); // 문단 별 유저가 입력한 텍스트에서 띄워쓰기를 제외하고 틀리지 않게 쓴 글자 수 (wpm계산에 사용)
  const [sec, setSec] = useState(0); // 문단 별 타이핑을 시작하고 흐른 시간 (cpm계산에 사용)
  const [cpm, setCpm] = useState(0); // 문단 별 cpm(타수)
  const [started, setStarted] = useState(false); // 시작 여부 (false일 경우 타이핑 시작 시 setInterval 작동)
  const [accuracy, setAccuracy] = useState(0); // 문단 별 정확도
  const [focusin, setFocusin] = useState(false); // 현재 텍스트 입력 창에 포커스 여부
  
  const [list_on, setListOn] = useState(false); // 카테고리 리스트 열기
  const [list_arrow_on, setListArrowOn] = useState(false) // 카테고리 리스트 아이콘
  
  const textbox = React.useRef(); // textarea
  
  const nowRef = React.useRef(null); // 시작한 시각
  const intervalRef = React.useRef(); // setInterval 담기
  const secRef = React.useRef(0); // 시작시간으로부터 지난 시간

  const upDownRef = React.useRef(); // preview에서 가져올 함수

  const listRef = React.useRef(); // 카테고리 리스트

  const paragraph_divided = useSelector(state => state.typing.divided_num);
  
  const dispatch = useDispatch();

  const script_id = useParams().script_id
  const script_data = useSelector(state => state.script.typing_script);

  useEffect(()=>{
    dispatch(scriptActions.setOneScriptDB(script_id));
  
    console.log(script_data);
  },[])

  useEffect(()=>{
    // 한 문단의 작성이 끝났을 때 다음 문단으로 넘어가는 이벤트
    console.log('다음문단이벤트')
    textbox.current.addEventListener('keydown', nextStart)
  },[text_num])
  
  useEffect(()=>{
    // textarea에서 방향키 작동 X
    console.log('이런저런 이벤트')
    textbox.current.addEventListener('keydown', (e) => {
      if(e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'ArrowUp'){
        console.log('방향키');
        e.preventDefault();
      }
    })
    // textarea에 포커스되었을 때 state값 세팅 (preview박스에서 커서 보이도록 작동시키는 데에 사용)
    textbox.current.addEventListener('focusin', ()=>{
      console.log('포커스 세팅');
      setFocusin(true);
    })
    textbox.current.addEventListener('focusout', ()=>{
      console.log('포커스 아웃');
      setFocusin(false);
      clearInterval(intervalRef.current);
      setStarted(false);
    })
  },[])

  // 다음 문단으로 넘어갈 때 세팅해야하는 것들
  const onNextstart = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setStarted(false);
  }
  // 문단을 초기화 할 때 세팅해야하는 것들
  const onRestart = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    nowRef.current = null;
    setUserInput('');
    secRef.current = 0;
    setAccuracy(0);
    setSymbols(0);
    setStarted(false);
  }
  // 다음문단으로 넘어가거나 내용을 모두 지웠을 때 이벤트리스너로 전달될 함수
  const nextStart = useCallback(
    (e) => {
      // 텍스트를 모두 입력했을 때
      const text_length = (n) => {
        let total_length = 0
        for(let i=0; i<=n; i++){
          total_length += script[i].length;
        }
        return total_length;
      } 
      if(e.key !== 'Backspace' && e.target.value.length >= text_length(text_num)){
        console.log('넘기기')
        e.preventDefault();
  
        upDownRef.current.next();
  
        onNextstart();
        
        textbox.current.removeEventListener('keydown', nextStart);
        console.log('백하기');
        console.log(text_num);
        console.log(text);
      } else if(e.target.value <= 1 && e.key === 'Backspace'){ // 텍스트를 모두 지웠을 때 초기화
        onRestart();  
      }
    },[])

  const onUserInputChange = (e) => {
    const v = e.target.value;
    setTimer();
    setUserInput(v);
    setSymbols(countCorrectSymbols(v)); 
    setCpm(calCpm(v));
    setAccuracy(checkAccuracy(v));
  }

  const calCpm = (userInput) => {
    const cpm = secRef.current === 0 ? userInput.length * (60 / 0.05) : userInput.length * (60 / secRef.current);
    return Math.round(cpm)
  }

  const checkAccuracy = (userInput) => {
    const correct_num = userInput.split('').filter((a,i) => a === text[i]).length;
    return Number.isNaN(accuracy) ? 0 : Math.floor((correct_num/userInput.length)*100)
  }
  
  const countCorrectSymbols = (userInput) => {
    const _text = text.replace(' ','');
    return userInput.replace(' ','').split('').filter((a,i) => a === _text[i]).length;
  }
  
  const setTimer = () => {
    if(!started){
      if(nowRef.current === null){
        nowRef.current = Date.now();
      }
      setStarted(true);
      intervalRef.current = setInterval(() => {
        const elapsedTime = Date.now() - nowRef.current; 
        secRef.current = elapsedTime/1000
      },100)
    }
  }

  const listOn = () => {
    setListOn(!list_on);
    setListArrowOn(!list_arrow_on);
  }

  const listOff = () => {
    listRef.current.classList.add('typing-category-list-off');
    setListArrowOn(!list_arrow_on);
    setTimeout(()=>{
      setListOn(!list_on);
    },300)
  }

  return (
    <>
      <TypingWrap per={userInput.length * 100 / textList.length}>
        <div className='typing-section-left'>
          <div className='category-wrapper'>
            <div className='typing-category'>{script_data?.scriptType === 'ARTICLE' ? 'Article' : script_data?.scriptType }</div>
            <div className='typing-small-category'>{script_data?.scriptCategory}</div>
          </div>
          <div className='typing-select-small-category'>
            <div className='typing-select-small-category-header' onClick={()=>{list_on ? listOff() : listOn()}}>
              Change the category 
              <i className={list_arrow_on ? 'typing-category-on' : ''}>
                <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.19384 1.09666C5.59344 0.552846 6.40591 0.552845 6.80551 1.09666L10.8919 6.65786C11.3772 7.31828 10.9056 8.25 10.0861 8.25L1.91325 8.25C1.09371 8.25 0.622136 7.31828 1.10742 6.65786L5.19384 1.09666Z" fill="#636366"/>
                </svg>
              </i>
            </div>
            {list_on && (
              <ul className='typing-select-small-category-list' ref={listRef} >
                <li className='typing-select-isnow'>Agree/Disagree</li>
                <li>Both views</li>
                <li>Advantage/Disadvatage</li>
              </ul>
            )}
          </div>
        </div>
        <div className='typing-section-right'>
            <div className='title-progress-wrapper'>
              <div className='title'>
                <h3>
                  {script_data?.scriptTitle}
                </h3>
              </div>

              <div className='progress-box'>
                <div className='progress-bar'>
                  <div className='progress-gauge'></div>
                </div>
                <div className='progress-number'>
                  <span>{ userInput.length }/{ textList.length }</span>
                </div>
              </div>
            </div>
          <div className='typing-box' onClick={()=>{textbox.current.focus(); textbox.current.selectionStart = textbox.current.selectionEnd = textbox.current.value.length}}>
            <Preview 
              userInput={userInput} 
              focus={focusin} 
              script={script} 
              text_num={text_num} 
              setTextNum={(n)=>{setTextNum(n)}} 
              setText={(n)=>{setText(n)}} 
              removeEvent={()=>{textbox.current.removeEventListener('keydown', nextStart)}}
              ref={upDownRef}/>
            <textarea value={userInput} onChange={onUserInputChange} ref={textbox}/>  
          </div>
          <div className='source'>{script_data?.scriptSource}</div>
          <div className='state-box'>
            <button></button>
            <div>
q             <span>TIMER</span>
              {secRef.current}
            </div>
            <div style={{fontFamily: 'Digital-Numbers'}}>
              <span>SPEED</span>
              {calCpm(userInput)}
            </div>
            <div> 
              <span>ACC</span>
              {accuracy}
            </div>
          </div>
        </div>
      </TypingWrap>
    </>
  );
}


const TypingWrap = styled.div`
  position: relative;
  width: 80.21vw;
  margin-top: 1.09vw;
  display: flex;

  .typing-section-left{
    flex: 25%  0 0;
    display: flex;
    flex-direction: column;
    padding-left: 4.17vw;
    box-sizing: border-box;
    /* align-items: center; */

    .category-wrapper{
      margin: -1.25vw 0 0 0.26vw;
      font-family: 'Paytone One';
      letter-spacing: -0.015em;
      
      .typing-category{
        font-size: 4.17vw;
        line-height: 5.83vw;
      }
      .typing-small-category{
        font-size: 1.3vw;
        line-height: 1.82vw;
        margin: -0.94vw 0 0 0.42vw;
      }
    }

    .typing-select-small-category{
      margin-top: 3.39vw;
      width: 13.96vw;
      height: 23.8vw;

      .typing-select-small-category-header{
        width: 13.91vw;
        height: 1.72vw;
        background: #fff;
        box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.08);
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: 'Roboto';
        padding: 0 0.68vw 0 0.42vw;
        box-sizing: border-box;

        font-weight: 500;
        font-size: 0.83vw;
        line-height: 1.04vw;
        letter-spacing: 0.01vw;

        cursor: pointer;

        i{
          transform: rotate(180deg);
          transition: 0.3s;
          &.typing-category-on{
            transform: rotate(0deg);
          }
        }
      }
      
      .typing-select-small-category-list{
        padding: 0;
        margin: 0.47vw 0 0 0;
        list-style: none;
        width: 13.91vw;
        height: 21.51vw;
        background: #fff;
        box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.08);
        border-radius: 4px;
        display: block;

        animation: 300ms ease 0ms 1 normal forwards running opacityIn;
        @keyframes opacityIn {
            0%{
                opacity: 0;
            }
            100%{
                opacity: 1;
            }
        }

        &.typing-category-list-off{
          animation: 300ms ease 0ms 1 normal forwards running opacityOut;
          @keyframes opacityOut {
              0%{
                  opacity: 1;
              }
              100%{
                  opacity: 0;
              }
          }
        }

        li{
          width: 100%;
          height: 1.72vw;
          border-bottom: 1px solid rgba(33, 33, 33, 0.08);
          padding-left: 0.31vw;
          box-sizing: border-box;

          font-family: 'Roboto';
          font-weight: 400;
          font-size: 0.83vw;
          line-height: 1.04vw;
          color: #878889;

          display: flex;
          align-items: center;

          &.typing-select-isnow{
            color: #FF2E00;
          }

        }
      }
    }
  }

  .title-progress-wrapper{
    margin-bottom: 2.5vw;

    .title{
      width: 100%;
      height: 3.54vw;
      margin-bottom: 0.94vw;
      h3{
        font-weight: 500;
        font-size: 1.3vw;
        line-height: 1.77vw;
        letter-spacing: -0.015em;
        margin: 0;
      }
    } 

    .progress-bar{
      width: 100%;
      height: 5px;
      background: #F4F4F4;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
      border-radius: 1px;
      box-sizing: border-box;
  
      .progress-gauge{
        width: ${props => props.per ?? '0'}%;
        height: 5px;
        border-radius: 1px;
        background-color: #FF6442;
        transition: 0.3s;
      }
    }
  
    .progress-number{
      font-family: 'Montserrat';
      font-weight: 500;
      font-size: 1.04vw;
      line-height: 1.25vw;
      letter-spacing: -0.015em;
      width: 100%;
      margin-top: 5px;
      text-align: right;
      color: #959595; 
    }
  }


  .typing-box{
    width: 100%;
    position: relative;
    margin-bottom: 0.83vw;

    textarea{
      width: 0;
      height: 0;
      position: absolute;
      top: 0;
      left: 0;
      resize: none;
      z-index: -999;
      opacity: 0;
      border: none;
      outline: none;
      background: none;
    }
  }

  .source{
    text-align: right;
    font-weight: 400;
    font-size: 0.78vw;
    letter-spacing: -0.015em;
    color: rgba(135, 136, 137, 0.55);
  }

 .state-box{
   display: flex;
   justify-content: space-between;
 }

 .record-box{
   margin-top: 30px;
   > div {
     width: 100%;
     text-align: center;
   }
 }
`

export default Typing;
