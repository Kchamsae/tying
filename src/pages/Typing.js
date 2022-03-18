import styled from 'styled-components';
import Preview from '../components/Preview';
import React,{ useCallback, useEffect, useState } from 'react';
import { textList } from '../shared/getText';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as scriptActions } from '../redux/modules/script';
import { useParams } from 'react-router-dom';


function Typing() {
  const script_id = +(useParams().script_id)
  const script_data = useSelector(state => state.script.typing_script);
  
  useEffect(()=>{
    if(script_data === {} || script_data.scriptId !== script_id){
      dispatch(scriptActions.setOneScriptDB(script_id));
    }
  
    console.log(script_data);
  },[])
  
  const _script = useSelector(state => state.script.typing_script?.scriptParagraph)
  const script = _script?.join('\n').split('\n');
  // const script = textList.split('\n');
  // console.log(script)
  const [text_num, setTextNum] = useState(0); // 현재 위치한 문단 번호 
  const [text, setText] = useState(script?script[0]:''); // 현재 위치한 문단의 텍스트 내용
  const [userInput, setUserInput] = useState(''); // 문단 별 유저가 입력한 텍스트 값
  const [symbols, setSymbols] = useState(''); // 문단 별 유저가 입력한 텍스트에서 띄워쓰기를 제외하고 틀리지 않게 쓴 글자 수 (wpm계산에 사용)
  const [sec, setSec] = useState(0); // 문단 별 타이핑을 시작하고 흐른 시간 (cpm계산에 사용)
  const [cpm, setCpm] = useState(0); // 문단 별 cpm(타수)
  const [started, setStarted] = useState(false); // 시작 여부 (false일 경우 타이핑 시작 시 setInterval 작동)
  const [accuracy, setAccuracy] = useState(0); // 문단 별 정확도
  const [focusin, setFocusin] = useState('out'); // 현재 텍스트 입력 창에 포커스 여부
  
  const [list_on, setListOn] = useState(false); // 카테고리 리스트 열기
  const [list_arrow_on, setListArrowOn] = useState(false); // 카테고리 리스트 아이콘
  const [state_on, setStateOn] = useState(false); // 상태박스 리스트 열기
  const [state_button_on, setStateButtonOn] = useState(false); // 상태박스 버튼
  
  const textbox = React.useRef(); // textarea
  
  const nowRef = React.useRef(null); // 시작한 시각
  const intervalRef = React.useRef(null); // setInterval 담기
  const secRef = React.useRef(0); // 시작시간으로부터 지난 시간

  // const upDownRef = React.useRef(); // preview에서 가져올 함수

  const listRef = React.useRef(); // 카테고리 리스트
  const stateRef = React.useRef(); // 카테고리 리스트

  const paragraph_divided = useSelector(state => state.typing.divided_num);
  
  const dispatch = useDispatch();


  // const script = useSelector(state => state.script.typing_script?.scriptParagraph);

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
      setFocusin('in');
    })
    textbox.current.addEventListener('focusout', ()=>{
      console.log('포커스 아웃');
      setFocusin('out');
      clearInterval(intervalRef.current);
      intervalRef.current = null;
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
    setSec(sec => 0);
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
  
        // upDownRef.current.next();
  
        onNextstart();
        
        // textbox.current.removeEventListener('keydown', nextStart);
        
        return;
      } else if(userInput.length <= 1 && e.key === 'Backspace'){ // 텍스트를 모두 지웠을 때 초기화
        e.preventDefault();
        setUserInput (userInput => userInput.slice(0, -1))
        console.log('...');
        onRestart(); 
        return;
      }
      setTimer();
      setUserInput((userInput)=>{
        e.preventDefault();
        if(e.key === 'Backspace'){
          e.preventDefault();
          return userInput.slice(0, -1);
        }

        if(e.key === 'Enter'){
          return userInput.concat('\n');
        }

        if(e.key.length > 1) return userInput;

        return userInput.concat(e.key);
      })
    },[userInput, text_num, setSec])

    useEffect(()=>{
      // 한 문단의 작성이 끝났을 때 다음 문단으로 넘어가는 이벤트
      console.log('다음문단이벤트')
      textbox.current.addEventListener('keydown', nextStart)
      return(()=>textbox.current.removeEventListener('keydown', nextStart))
    },[nextStart])
    

  // const onUserInputChange = (e) => {
  //   const v = e.target.value;
  //   setTimer();
  //   setUserInput(v);
  //   // setSymbols(countCorrectSymbols(v)); 
  //   // setCpm(calCpm(v));
  //   setAccuracy(checkAccuracy(v));
  // }

  const calCpm = (userInput) => {
    const cpm = sec === 0 ? userInput.length * (60 / 0.05) : userInput.length * (60 / sec);
    return Math.round(cpm)
  }

  const checkAccuracy = (userInput) => {
    const correct_num = userInput.split('').filter((a,i) => a === text[i]).length;
    return Number.isNaN(accuracy) ? 0 : Math.floor((correct_num/userInput.length)*100)
  }
  
  // const countCorrectSymbols = (userInput) => {
  //   const _text = text.replace(' ','');
  //   return userInput.replace(' ','').split('').filter((a,i) => a === _text[i]).length;
  // }
  
  const setTimer = () => {
    if(!started && intervalRef.current === null){
      if(nowRef.current === null){
        nowRef.current = Date.now();
      }
      setStarted(true);
      intervalRef.current = setInterval(() => {
        const elapsedTime = Date.now() - nowRef.current; 
        setSec(elapsedTime/1000)  
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

  const stateOn = () => {
    setStateOn(!state_on);
    setStateButtonOn(!state_button_on);
  }

  const stateOff = () => {
    stateRef.current.classList.add('state-box-off');
    setStateButtonOn(!state_button_on);
    setTimeout(()=>{
      setStateOn(!state_on);
    },300)
  }

  const giveFocus = () => {
    textbox.current.focus(); 
    textbox.current.selectionStart = textbox.current.selectionEnd = textbox.current.value.length;
  }

  return (
    <>
      <TypingWrap>
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
                  <div className='progress-gauge' style={{width: `${userInput.length * 100 / textList.length}%`}}></div>
                </div>
                <div className='progress-number'>
                  <span>{ userInput.length }/{ textList.length }</span>
                </div>
              </div>
            </div>
          <div className='typing-box'>
            <Preview 
              userInput={userInput} 
              focus={focusin} 
              script={script??[]} 
              text_num={text_num}
              giveFocus={giveFocus} 
              setTextNum={(n)=>{setTextNum(n)}} 
              setText={(n)=>{setText(n)}}
              />
            <textarea ref={textbox}/>  
          </div>
          <div className='source'>{script_data?.scriptSource}</div>
          <div className='state-box-wrapper'>
            <button className={state_button_on ? 'state-box-toggle' : 'state-box-toggle state-box-toggle-off' } onClick={()=>{state_on ? stateOff() : stateOn()}}/>
            {state_on && (
              <div className='state-box' ref={stateRef}>
                <div className='state-box-item'>
                  <div>TIMER</div>
                  {sec}
                  {/* 00:00 */}
                </div>
                <div className='state-box-item'>
                  <div>SPEED</div>
                  {calCpm(userInput)}
                </div>
                <div className='state-box-item'> 
                  <div>ACC</div>
                  {accuracy}
                </div>
              </div>
            )}
          </div>
        </div>
      </TypingWrap>
    </>
  );
}


const TypingWrap = styled.div`
  position: absolute;
  width: 1467px;
  /* margin: 1.09vw 0 0 135px; */
  top: 171px;
  left: calc(50% - 825px);
  display: flex;
  justify-content: space-between;

  .typing-section-left{
    flex: 18.2%  0 0;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    /* align-items: center; */

    .category-wrapper{
      margin: -1.25vw 0 0 0.26vw;
      font-family: 'Paytone One';
      letter-spacing: -0.015em;
      position: relative;
      z-index: 5;
      
      .typing-category{
        font-size: 80px;
      }
      .typing-small-category{
        font-size: 25px;
        margin: -0.94vw 0 0 0.42vw;
      }
    }

    .typing-select-small-category{
      margin-top: 63px;
      width: 13.96vw;
      height: 23.8vw;
      position: relative;

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
        position: absolute;
        left: 0;
        z-index: 2;
        bottom: 3px;
        padding: 0;
        margin: 0;
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

  .typing-section-right{
    flex: 79.2% 0 0;
    position: relative;

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
    
    .state-box-wrapper{
      width: 119px;
      height: 240;
      position: absolute;
      top: 240px;
      left: -157px;
      z-index: 0;
      
      .state-box-toggle{
        position: absolute;
        top: 6px;
        right: 5px;
        border: none;
        padding: 0;
        width: 16px;
        height: 16px; 
        border-radius: 50%;
        background-color: #3A3A3C;
        cursor: pointer;
        z-index: 1;
        transition: 0.3s;

        &::before{
          content:'';
          display: block;
          position: absolute;
          top: calc(50% - 1px);
          left: calc(50% - 5px);
          width: 10px;
          height: 2px;
          border-radius: 1px;
          background-color: #fff;
        }

        &.state-box-toggle-off{
          background-color: #FF2E00;

          &::after{
            content:'';
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
      }
      .state-box{
        width: 119px;
        height: 240px;
        background: #FFFFFF;
        box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.08);
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        
        animation: 300ms ease 0ms 1 normal forwards running opacityIn;
        @keyframes opacityIn {
            0%{
                opacity: 0;
            }
            100%{
                opacity: 1;
            }
        }

        &.state-box-off{
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

        .state-box-item{
          position: relative;
          flex: 1 0 0;
          font-family: 'Digital Numbers';
          font-size: 19px;
          line-height: 23px;
          letter-spacing: -0.015em;
          border-bottom: 1px solid #D2D2D2;
          padding-top: 14px;
          box-sizing: border-box;
          text-align: right;
          display: flex;
          justify-content: center;
          align-items: center;

          &:last-of-type{
            border: 0;
          }

          > div{
            position: absolute;
            top: 6px;
            left: 8px;
            width: max-content;
            font-family: noto-sans;
            font-weight: 700;
            font-size: 14px;
            line-height: 19px;
            color: #272727;
            margin-bottom: 7px;
            
            &::before{
              content: '';
              width: 100%;
              height: 1px;
              border-radius: 0.5px;
              background-color: #FF2E00;
              position: absolute;
              bottom: -1px;
              left: 0;
              
              
            }
          }
        }
      }
    }
  }

` 

export default Typing;
