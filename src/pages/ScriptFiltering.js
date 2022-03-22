import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ScriptItem from '../components/ScriptItem';
import ScriptItemLoading from '../components/ScriptItemLoading';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as scriptActions } from '../redux/modules/script';

const ScriptFiltering = () => {

    const [filter, setFilter] = useState([]);
    const [topic, setTopic] = useState([]);

    const [done, setDone] = useState(false);
    const [reset, setReset] = useState(false);

    const scrollRef = useRef();

    const dispatch = useDispatch();

    const filter_list = useSelector(state => state.script.filter_list);

    useEffect(()=>{
        if(filter_list !== []){
            dispatch(scriptActions.setFilterList([]))
        }
    },[])

    const addFilter = (e) => {
        if(reset) setReset(false);
        const idx = filter.indexOf(e.target.innerText);
        if(idx === -1){
            setFilter(list => list.concat(e.target.innerText));
        } else if(idx !== -1){
            setFilter(list => list.filter(a => a !== e.target.innerText));
        }
    }
    const addFilterOverlap = (e) => {
        if(reset) setReset(false);
        if(filter.indexOf('1Agree/Disagree') === -1){
            setFilter(list => list.concat('1Agree/Disagree'));
            return;
        } else{
            setFilter(list => list.filter(a => a !== '1Agree/Disagree')); 
            return;
        }
    }
    const addTopic = (e) => {
        if(reset) setReset(false);
        const idx = topic.indexOf(e.target.innerText);
        if(idx === -1){
            setTopic(list => list.concat(e.target.innerText));
        } else if(idx !== -1){
            setTopic(list => list.filter(a => a !== e.target.innerText));
        }
    }

    const FilterList = () => {
        setDone(true);
        setReset(true);
        const _category = filter.length === 0 ? 'all' : filter.join('|').split('').map(a => {
            if(a === '&') return '%26';
            if(a === '/') return '%2F';
            return a;
        }).join('');
        const _topic = topic.length === 0 ? 'all' : topic.join('|').split('').map(a=>a==='&'?'%26':a).join('');

        dispatch(scriptActions.setFilterListDB(_category,_topic));
        setDone(false);
        scrollRef.current.scrollTo(0,0);
    }

    const selectReset = () => {
        setFilter([]);
        setTopic([]);
        setReset(false);
    }


    return (
        <>
            <FilteringWrapper>
                <div className='filtering-left'>
                    <div className='filtering-title'>
                        <h2>Filtering</h2>
                        <p>원하는 조건을 모두 선택해주세요!</p>
                    </div>
                    <div className='filtering-left-inner'>
                        <div className='filtering-box'>
                            <div>
                                <div className='filtering-box-title'>TOFEL</div>
                                <ul>
                                    <li className={filter.indexOf('Agree/Disagree') !== -1 ? 'filter-checked' : ''}>
                                        <span onClick={addFilter}>Agree/Disagree</span>
                                    </li>
                                    <li className={filter.indexOf('Multiple Choice') !== -1 ? 'filter-checked' : ''}>
                                        <span onClick={addFilter}>Multiple Choice</span>
                                    </li>
                                    <li className={filter.indexOf('Paired Choice') !== -1 ? 'filter-checked' : ''}>
                                        <span onClick={addFilter}>Paired Choice</span>
                                    </li>
                                    <li className={filter.indexOf('Good Idea') !== -1 ? 'filter-checked' : ''}>
                                        <span onClick={addFilter}>Good Idea</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <div className='filtering-box-title'>IELTS</div>
                                <ul>
                                    <li className={filter.indexOf('1Agree/Disagree') !== -1 ? 'filter-checked' : ''}>
                                        <span onClick={addFilterOverlap}>Agree/Disagree</span>
                                    </li>
                                    <li className={filter.indexOf('Both views') !== -1 ? 'filter-checked' : ''}>
                                        <span onClick={addFilter}>Both views</span>
                                    </li>
                                    <li className={filter.indexOf('Advantage/Disadvantage') !== -1 ? 'filter-checked' : ''}>
                                        <span onClick={addFilter}>Advantage/Disadvantage</span>
                                    </li>
                                    <li className={filter.indexOf('Problem&Solution') !== -1 ? 'filter-checked' : ''}>
                                        <span onClick={addFilter}>Problem&amp;Solution</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='filtering-box'>
                            <div className='filtering-box-title'>ARTICLE</div>
                            <ul>
                                <li className={filter.indexOf('The New York Times') !== -1 ? 'filter-checked' : ''}>
                                    <span onClick={addFilter}>The New York Times</span>
                                </li>
                                <li className={filter.indexOf('National Geographic') !== -1 ? 'filter-checked' : ''}>
                                    <span onClick={addFilter}>National Geographic</span>
                                </li>
                                <li className={filter.indexOf('The Korea Times') !== -1 ? 'filter-checked' : ''}>
                                    <span onClick={addFilter}>The Korea Times</span>
                                </li>
                            </ul>
                        </div>
                        <div className='filtering-box'>
                            <div  className='filtering-box-title'>TOPIC</div>
                            <ul>
                                <li className={topic.indexOf('National(Korea)') !== -1 ? 'filter-checked' : ''}>
                                    <span onClick={addTopic}>National(Korea)</span>
                                </li>
                                <li className={topic.indexOf('Health') !== -1 ? 'filter-checked' : ''}>
                                    <span onClick={addTopic}>Health</span>
                                </li>
                                <li className={topic.indexOf('World') !== -1 ? 'filter-checked' : ''}>
                                    <span onClick={addTopic}>World</span>
                                </li>
                                <li className={topic.indexOf('Culture') !== -1 ? 'filter-checked' : ''}>
                                    <span onClick={addTopic}>Culture</span>
                                </li>
                                <li className={topic.indexOf('Science&Technology') !== -1 ? 'filter-checked' : ''}>
                                    <span onClick={addTopic}>Science&amp;Technology</span>
                                </li>
                                <li className={topic.indexOf('Economics') !== -1 ? 'filter-checked' : ''}>
                                    <span onClick={addTopic}>Economics</span>
                                </li>
                                <li className={topic.indexOf('Sports') !== -1 ? 'filter-checked' : ''}>
                                    <span onClick={addTopic}>Sports</span>
                                </li>
                                <li className={topic.indexOf('Travel') !== -1 ? 'filter-checked' : ''}>
                                    <span onClick={addTopic}>Travel</span>
                                </li>
                            </ul>
                        </div>
                        <div className='filtering-box'>
                            <div className='filtering-saved-check'>
                                <div className='check-box'>
                                    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 5.66667L9.2 13L20 2" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                                    </svg>
                                </div>
                                <div>내가 저장한 스크립트만 보기</div>
                            </div>
                        </div>
                    </div>
                    {reset ? (
                        <div className='filtering-reset-button' onClick={selectReset}>
                            초기화
                            <svg viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 11C2 9.35 2.67 7.85 3.76 6.76L2.34 5.34C0.9 6.79 0 8.79 0 11C0 15.08 3.05 18.44 7 18.93V16.91C4.17 16.43 2 13.97 2 11ZM16 11C16 6.58 12.42 3 8 3C7.94 3 7.88 3.01 7.82 3.01L8.91 1.92L7.5 0.5L4 4L7.5 7.5L8.91 6.09L7.83 5.01C7.89 5.01 7.95 5 8 5C11.31 5 14 7.69 14 11C14 13.97 11.83 16.43 9 16.91V18.93C12.95 18.44 16 15.08 16 11Z" fill="white"/>
                            </svg>
                        </div>
                    ) : (
                        <div className='filtering-complete-button' onClick={FilterList}>선택완료</div>
                    )}
                </div>
                <div className='filtering-right' ref={scrollRef}>
                    {(filter_list !== 'no' && !done) && (
                        filter_list.map((a,i)=>{
                            return <ScriptItem key={i} {...a}/>
                        })
                    )}
                    {(filter_list === 'no' && !done) && (
                        <>  
                            <div className='filtering-result-none'>필터링 결과가 없습니다.</div>
                            <div className='filtering-result-sentence'>앞으로 더 많은 스크립트가 더 추가될 예정입니다.</div>
                        </>
                    )}
                    {done && (
                        <>
                            <ScriptItemLoading/>
                            <ScriptItemLoading/>
                            <ScriptItemLoading/>
                        </>
                    )}
                </div>
            </FilteringWrapper>
        </>
    );
};

const FilteringWrapper = styled.div`
    width: 1775px;
    height: 745px;
    margin: 26px auto 0;
    display: flex;
    justify-content: space-between;

    .filtering-left{
        flex: 33.1% 0 0;
        background-color: #f0f0f0;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.13);
        border-radius: 46px;
        position: relative;

        .filtering-title{
            position: absolute;
            top: -26.5px;
            left: calc(50% - 235px);
            width: 470px;
            height: 53px;
            background: #000000;
            box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.1);
            border-radius: 30px;          
            color: #FFFFFF;
            display: flex;
            align-items: center;

            >h2{
                margin: 0 0 5px 0;
                flex: 43.8% 0 0;
                display: flex;
                justify-content: center;
                align-items: center;
                width: max-content;
                font-family: 'Paytone One';
                font-size: 30px;
                font-weight: 400;
                letter-spacing: -0.015em;
                position: relative;

                &:before{
                    content: '';
                    display: block;
                    height: 20px;
                    border-right: 1px solid #f1f1f1;
                    position: absolute;
                    right: 0;
                    top: calc(50% - 6px);
                }
            }
            >p{ 
                padding-left: 10px;
                box-sizing: border-box;
                flex: 56.2% 0 0;
                width: max-content;
                font-family: 'Noto Sans KR';
                font-weight: 500;
                font-size: 16px;
                letter-spacing: -0.015em;                        
                color: #F1F1F1;
            }
        }

        .filtering-left-inner{
            display: flex ;
            flex-direction: column;
            padding: 67px 52px 0 ;
            box-sizing: border-box;
            ul{
                list-style: none;
                margin: 6px 0 0 0;
                padding: 0;
                li{
                    font-weight: 500;
                    font-size: 18px;
                    line-height: 25px;
                    letter-spacing: -0.015em;
                    color: #878889;
                    padding: 5.5px 0;
                    &.filter-checked span{
                        color: #FF2E00;
                    }
                    >span{
                        cursor: pointer;
                    }
                }
            }

            .filtering-box{
                width: 100%;
                display: flex;
                margin-bottom: 19px;
                flex-direction: column;
                
                .filtering-box-title{
                    padding-left: 3px;
                    font-weight: 700;
                    font-size: 20px;
                    letter-spacing: -0.015em;
                    color: #242424;
                }

                &:first-of-type{
                    position: relative;
                    flex-direction: row;
                    >div{
                        width: 50%;
                        >div{
                            padding-left: 3px;
                            font-weight: 700;
                            font-size: 20px;
                            letter-spacing: -0.015em;
                            color: #242424;
                        }
                    }
                    &:before{
                        content: '';
                        display: block;
                        width: 488px;
                        height: 2px;
                        background-color: #c4c4c4;
                        border-radius: 1px;
                        position: absolute;
                        bottom: -7px;
                        left: calc(50% - 244px);
                    }
                }
    
                &:nth-of-type(3){
                    position: relative;
                    >div{
                        width: 100%;
                    }
                    >ul{
                        width: 100%;
                        display: flex;
                        flex-wrap: wrap;
                        >li{
                            width: 50%;
                        }
                    }
                    &:before{
                        content: '';
                        display: block;
                        width: 488px;
                        height: 2px;
                        border-radius: 1px;
                        background-color: #c4c4c4;
                        position: absolute;
                        top: -14px;
                        left: calc(50% - 244px);
                    }
                }
                &:last-of-type{
                    margin-top: 36px;
                    .filtering-saved-check{
                        display: flex;
                        align-items: center;
    
                        font-family: 'Noto Sans KR';
                        font-weight: 600;
                        font-size: 20px;
                        line-height: 27px;
                        display: flex;
                        align-items: center;
                        letter-spacing: -0.015em;
                        color: #878889;
    
                        .check-box{
                            width: 38px;
                            height: 38px;
                            background: #D2D2D2;
                            border-radius: 5px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin-right: 12px;
                            cursor: pointer;
                        }
                    }
                }
                
            }
        }
        .filtering-complete-button{
            font-weight: 600;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            letter-spacing: -0.015em;
            color: #878889;

            width: 105px;
            height: 47px;
            border: 2px solid #878889;
            border-radius: 63px;
            position: absolute;
            bottom: 35px;
            right: 35px;
            cursor: pointer;
            transition: 0.3s;

            &:hover{
                border-color: #FF2E00;
                color: #FF2E00;
            }
        }

        .filtering-reset-button{
            font-weight: 600;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            letter-spacing: -0.015em;
            color: #fff;

            width: 105px;
            height: 47px;
            background-color: #636366;
            border-radius: 63px;
            position: absolute;
            bottom: 35px;
            right: 35px;
            cursor: pointer;
            transition: 0.3s;

            >svg{
                width: 16px;
                height: 19px;
            }

            &:hover{
                background-color: #000;
            }
        }
    }

    .filtering-right{
        width: 1158px;
        overflow: auto;

        &::-webkit-scrollbar {
            width: 6px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #000;
            border-radius: 3px;
        }
        &::-webkit-scrollbar-track {
            background-color: transparent;
        }

        .filtering-result-none{
            width: max-content;
            margin: 20px auto;
            font-family: 'Noto Sans KR';
            font-size: 20px;
            font-weight: 600;
        }
        .filtering-result-sentence{
            width: max-content;
            margin: 0 auto;
            font-family: 'Noto Sans KR';
            font-size: 14px;
            font-weight: 300;
        }
    }
`

export default ScriptFiltering;