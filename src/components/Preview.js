import React, { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as typingActions } from '../redux/modules/typing';
import { actionCreators as wordActions } from '../redux/modules/word';
import { actionCreators as scriptActions } from '../redux/modules/script';
import DictModal from './DictModal';

const Preview = memo(forwardRef(({userInput,focus,text_num,setTextNum,setText,giveFocus,script_id,setEnterState},ref) => {

    useImperativeHandle(ref, ()=>({
        next
    }))
    const script_data = useSelector(state => state.script.typing_script);
    const script = script_data?.scriptParagraph
    const [word_modal, setWordModal] = useState(false);
    const [word, setWord] = useState('');
    const [sentence, setSentence] = useState('');

    const charRef = useRef();

    // const [focus, setFocus] = useState('out');

    const dispatch = useDispatch()
    
    const script_splitted_sentence = useMemo(()=>{  // 문장수준까지 나눈 배열
        return script?.map(a=>{
            return a.match( /[^\.!\?]+[(\.\s|\.)(!\s|!)(\?\s|\?)]+/g);
        })    
    },[script])

    const script_splitted_word = useMemo(()=>{  // 단어수준까지 나눈 배열
        return script_splitted_sentence?.map(a=>a.map(b=>{
            return b.match( /[0-9a-z.,’'"\-\$\%\&\#]+[$(\.|\s)+]/gi);
        }))
    },[script])

    const script_splitted = useMemo(() => script_splitted_word?.map(a=>a.map(b=>b.map(c=>c.split('')))),[script])  // 글자수준으로 나눈 배열

    const scrollRef = useRef();
    const paragraphRef = useRef([]);
    const paragraphWrapRef = useRef([]);

    const paragraph_divided = useSelector(state => state.typing.divided_num);
    const current_divided = useSelector(state => state.typing.current_divided);

    useEffect(()=>{
        console.log(charRef.current?.offsetTop)
        const p = 57+(current_divided+1)*120
        if(p < charRef.current?.offsetTop && charRef.current?.offsetTop <= p+40){
            setEnterState(true);
        }else{
            setEnterState(false);
        }
    },[userInput])
    
    useEffect(()=>{
        let paragraph_height = [];
        for(let i = 0; i < script?.length; i++){
            console.log(paragraphRef.current[i].clientHeight)
            paragraph_height[i] = paragraphRef.current[i].clientHeight;
        }

        if(script_data === {} || script_data.scriptId !== script_id){
            dispatch(scriptActions.setOneScriptDB(script_id)).then((res)=>{
                for(let i = 0; i < res.length; i++){
                    console.log(paragraphRef.current[i].clientHeight)
                    paragraph_height[i] = paragraphRef.current[i].clientHeight;
                }
                dispatch(typingActions.divideParagraph(paragraph_height));
            })
        }else{
            dispatch(typingActions.divideParagraph(paragraph_height));
        }

    },[])
    

    useEffect(()=>{
        document.body.style.overflow = 'hidden'
        // scrollRef.current.style.height = `${paragraphRef.current[text_num].clientHeight}px`;
    },[])

    const nextInParagraph = () => {

    }

    const prev = () => {
        if(current_divided !== 0){
            console.log((current_divided-1)*120)
            paragraphWrapRef.current[text_num].scroll({
                behavior: 'smooth',
                left: 0,
                top: (current_divided-1)*120
            })
            dispatch(typingActions.setCurrentDivided(current_divided-1));
        } else if(text_num > 0 && current_divided === 0){
            // scrollRef.current.style.height = `${paragraphRef.current[text_num-1].clientHeight}px`;
            scrollRef.current.scroll({
                behavior: 'smooth',
                left: 0,
                top: paragraphRef.current[text_num-1].offsetTop - 96.5
            });
            dispatch(typingActions.setCurrentDivided(paragraph_divided[text_num-1]-1));
            // removeEvent();
            setTextNum(text_num => text_num-1);
            setText(script[text_num-1]);
        }
    }

    const next = () => {
        console.log(current_divided, paragraph_divided[text_num])
        if(current_divided+1 !== paragraph_divided[text_num]){
            paragraphWrapRef.current[text_num].scroll({
                behavior: 'smooth',
                left: 0,
                top: (current_divided+1)*120
            })
            dispatch(typingActions.setCurrentDivided(current_divided+1));
        } else if(text_num < script_splitted?.length-1 && current_divided+1 === paragraph_divided[text_num]){
            // scrollRef.current.style.height = `${paragraphRef.current[text_num+1].clientHeight}px`;
            scrollRef.current.scroll({
                behavior: 'smooth',
                left: 0,
                top: paragraphRef.current[text_num+1].offsetTop - 96.5
            });
            // removeEvent();
            setTextNum(text_num => text_num+1);
            setText(script[text_num+1]);
            dispatch(typingActions.setCurrentDivided(0));
        }
    }

    const openDict = (w,si) => {
        // if(focus){
            setWord(w.join('').trim().match(/[a-zA-z]+/).toString().toLowerCase());
            setSentence(script_splitted_sentence[text_num][si].trim());
            setWordModal(true);
        // }
    }

    const sentences = useMemo(()=>{
        return script_splitted?.map((p,pi)=>{
            return <div className='paragraph-wrap' key={pi} ref={e=>paragraphWrapRef.current[pi] = e}>
                <div key={pi} ref={e=>paragraphRef.current[pi] = e} className='paragraph-box'>{
                p?.map((s,si) => {
                    return <ul className='sentence' key={si}>{
                        s?.map((w,wi)=>{
                            return <li className={focus ? 'word word-click' : 'word'} 
                                        key={wi} 
                                        onClick={()=>{openDict(w,si)}}
                                        >{
                                w?.map((a,i)=>{
                                    let n = 0;
                                    for(let j=0; j<pi; j++){
                                        n += script[j].length;
                                    }

                                    for(let j=0; j<si; j++){
                                        n += script_splitted_sentence[pi][j].length;
                                    }

                                    for(let j=0; j<wi; j++){
                                        n += script_splitted_word[pi][si][j].length;
                                    }

                                    n += i;
                                    if(n < userInput?.length){
                                        if(a === userInput[n]){
                                            if(a === ' '){
                                                return <span key={i} className='space'>{a}</span>
                                            } else{
                                                return <span key={i} className='correct'>{a}</span>
                                            }
                                        } else{
                                            if(userInput[n] === ' '){
                                                return <span key={i} className='space-wrong'>_</span>
                                            }else{
                                                return <span key={i} className='wrong'>{userInput[n]}</span>
                                            }
                                        }
        
                                    }
                                    if(text_num === pi && n === userInput?.length){
                                        if(a === ' '){
                                            return <span key={i} className={focus ? 'is-next-space space' : 'space'}>{a}</span>                            
                                        } else{
                                            return <span key={i} className={focus ? 'is-next' : ''}>{a}</span>
                                        }
                                    }
                                    if(text_num === pi && n === userInput?.length+1){
                                        if(a === ' '){
                                            return <span key={i} className='space' ref={charRef}>{a}</span>
                                        } else{
                                            return <span key={i} ref={charRef}>{a}</span>
                                        }
                                    }
                                    if(a === ' '){
                                        return <span key={i} className='space'>{a}</span>                            
                                    } else if(a.match(/[0-9.,!"';:%$&\(\)]/)){
                                        return <span key={i} className='not-char'>{a}</span>
                                    } else{
                                        return <span key={i} >{a}</span>
                                    }
                                })
                            }</li>
                        })       
                    }</ul>
                })
            }</div>
            </div>                
        })
    },[userInput,focus,word_modal,script])

    return (
        <>  
            <Wrapper onClick={giveFocus}>
                <UpDownButtonBox>
                    <button onClick={(e)=>{e.stopPropagation(); prev();}} disabled={text_num === 0 && current_divided === 0 ? true : false}>
                        <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 15.6508C19 15.2011 18.8204 14.8188 18.5623 14.369L10.9982 1.25926C10.4483 0.326057 10.0892 -4.41013e-07 9.49439 -4.15013e-07C8.89958 -3.89013e-07 8.54046 0.326057 8.00177 1.25926L0.426462 14.369C0.16834 14.8188 -7.86342e-08 15.2011 -5.89757e-08 15.6508C-2.26073e-08 16.4828 0.62847 17 1.60484 17L17.3839 17C18.3603 17 19 16.4828 19 15.6508Z" fill="#D2D2D2"/>
                        </svg>
                    </button>
                    <button onClick={(e)=>{e.stopPropagation(); next();}} disabled={text_num === script_splitted?.length-1 && current_divided+1 === paragraph_divided[text_num] ? true : false}>
                        <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 15.6508C19 15.2011 18.8204 14.8188 18.5623 14.369L10.9982 1.25926C10.4483 0.326057 10.0892 -4.41013e-07 9.49439 -4.15013e-07C8.89958 -3.89013e-07 8.54046 0.326057 8.00177 1.25926L0.426462 14.369C0.16834 14.8188 -7.86342e-08 15.2011 -5.89757e-08 15.6508C-2.26073e-08 16.4828 0.62847 17 1.60484 17L17.3839 17C18.3603 17 19 16.4828 19 15.6508Z" fill="#D2D2D2"/>
                        </svg>
                    </button>
                    <div className='paragraph-now'>{`${text_num+1}/${script?.length}`}</div>
                </UpDownButtonBox>
                <div className='bookmark-button'>
                    <div className='bookmark-innershadow'></div>
                    <svg width="27" height="35" viewBox="0 0 27 35" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M23 0H3.83333C1.725 0 0 1.725 0 3.83333V34.5L13.4167 28.75L26.8333 34.5V3.83333C26.8333 1.725 25.1083 0 23 0Z"/>
                    </svg>
                </div>
                <PreviewBox ref={scrollRef} >
                    {sentences}
                </PreviewBox>
            </Wrapper>
            {word_modal&&(
                <>
                    <DictModalBg onClick={()=>{setWordModal(false); setWord(''); setSentence(''); dispatch(wordActions.setDict([]));}}/>
                    <DictModal word={word} sentence={sentence}>
                        <DictModalClose onClick={()=>{setWordModal(false); setWord(''); setSentence(''); dispatch(wordActions.setDict([]));}}>
                            <svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.5 17C13.1944 17 17 13.1943 17 8.5C17 3.80566 13.1944 0 8.5 0C3.80557 0 0 3.80566 0 8.5C0 13.1943 3.80557 17 8.5 17ZM12.2657 4.73438C12.5781 5.04663 12.5781 5.55322 12.2657 5.86572L9.63138 8.5L12.2657 11.1343C12.5781 11.4468 12.5781 11.9534 12.2657 12.2656C11.9533 12.5781 11.4467 12.5781 11.1343 12.2656L8.5 9.63135L5.86569 12.2656C5.55328 12.5781 5.04675 12.5781 4.73431 12.2656C4.42191 11.9534 4.42191 11.4468 4.73431 11.1343L7.36862 8.5L4.73431 5.86572C4.42191 5.55322 4.42191 5.04663 4.73431 4.73438C5.04672 4.42188 5.55325 4.42188 5.86569 4.73438L8.5 7.36865L11.1343 4.73438C11.4467 4.42188 11.9533 4.42188 12.2657 4.73438Z" fill="#F5F5F5"/>
                            </svg>
                        </DictModalClose>
                    </DictModal>
                </>
            )}
        </>
    );
}));

const DictModalBg = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
`
const DictModalClose = styled.div`
    width: 17px;
    height: 17px;
    border-radius: 50%;
    position: absolute;
    right: 34px;
    top: 22px;
    cursor: pointer;
    z-index: 10001;

    svg{
        width: 100%;
        height: 100%;
    }
`

const Wrapper = styled.div`
    position: relative;

        .bookmark-button{
            position: absolute;
            top: -17px;
            right: 30px ;
            height: min-content;
            cursor: pointer;
            
            svg{
                fill: #D8D8D8;
            }
            
            .bookmark-innershadow{
                position: absolute;
                top: 0px;
                left: 0px;
                width: 27px;
                height: 35px;
                border-radius: 4px;
                box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.25);
            }
        }
    `;

const UpDownButtonBox = styled.div`
    position: absolute;
    bottom: 0;
    right: -50px;
    height: 97px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    button{
        display: block;
        background-color: transparent;
        border-radius: 0;
        border: 0;
        cursor: pointer;
    }
    button:last-of-type{
        transform: rotate(180deg);
    }
    .paragraph-now{
        margin-top: -1px;
        font-weight: 500;
        font-size: 20px;
        letter-spacing: -0.015em;
        color: #878889;
    }
    `;

const PreviewBox = styled.div`
    width: 100%;
    height: 313px;
    font-size: 25px;
    color: #878889;
    background-color: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    letter-spacing: 0.02em;
    line-height: 40px;
    overflow: hidden;

    .paragraph-wrap{
        width: calc(100% - 50px);
        height: 120px;
        padding-left: 2px;
        box-sizing: border-box;
        overflow: hidden;
        margin: 96.5px 25px;
    }
    
    .paragraph-box{
        width: 100%;
        box-sizing: border-box;
        word-wrap: break-word;
    }

    .sentence{
        display: inline;
        padding: 0;
    }

    .word{
        display: inline-flex;
    }
    
    .word-click{
        &:hover{
            span:not(.space, .space-wrong, .not-char){
                background-color: #FFC4B8;
                cursor: pointer;
            }
        }
    }

    span{
        display: inline-block;
        font-weight: 400;
        /* transition: 0.3s; */
    }

    .correct{
        color: #333;
    }

    .wrong, .space-wrong{
        color: #FF2E00;
    }

    .space{
        width: 10px;
    }

    .is-next{
        position: relative;
        &::before{
            content: '';
            display: block;
            position: absolute;
            top: calc(50% - 15px);
            left: -0.0625rem;
            height: 30px;
            border-left: 3px solid #FF6442;
            animation: 1000ms ease 0ms 1 normal forwards running blinking;
            animation-iteration-count: infinite;
            z-index: 1000000;

            @keyframes blinking {
                0%{
                    border-left: 3px solid #FF6442;
                }
                100%{
                    border-left: 0px solid #FF6442;
                    border-left: none;
                }
            }
        }
    }

    .is-next-space{
        position: relative;
        &::before{
            content: '';
            display: block;
            position: absolute;
            bottom: -0.3125rem;
            left: 0;
            width: 100%;
            border-bottom: 3px solid #FF2E00;
            animation: 1000ms ease 0ms 1 normal forwards running blinking_s;
            animation-iteration-count: infinite;

            @keyframes blinking_s {
                0%{
                    border-bottom: 3px solid #FF2E00;
                }
                100%{
                    border-bottom: 3px solid #FF2E00;
                    border-bottom: none;
                }
            }
        }
    }
`
export default Preview;