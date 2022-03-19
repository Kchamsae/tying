import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as scriptActions } from '../redux/modules/script';
import ScriptItem from '../components/ScriptItem';
import ScriptItemLoading from '../components/ScriptItemLoading';

const Search = () => {

    const searchRef = useRef();
    const [done, setDone] = useState(false);

    const dispatch = useDispatch();
    const search_list = useSelector(state => state.script.search_list);

    useEffect(()=>{
        if(search_list !== []){
            dispatch(scriptActions.setSearchList([]));
        }
    },[]);

    const searchScript = () => {
        setDone(true);
        const v = searchRef.current.value;
        let reg = /^[A-z]{2,}$/;
        const ok = reg.test(v);
        if(ok){
            dispatch(scriptActions.setSearchListDB(v))
        }
        setDone(false)
    }

    return (
        <>
            <SearchWrapper>
                <div className='search-bar'>
                    <input type='text' placeholder='Search keywords...' ref={searchRef}/>
                    <div className='search-button' onClick={searchScript}>
                        <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" fill="#fff"/>
                        </svg>
                    </div>
                </div>
                <div className='search-result'>
                    {(search_list !== 'no' && !done) && (
                        search_list?.map((a,i)=>{
                            return <ScriptItem key={i} {...a}/>
                        })
                    )}
                    {(search_list === 'no' && !done) && (
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
            </SearchWrapper>
        </>
    );
};

const SearchWrapper = styled.div`
    .search-bar{
        width: 836px;
        height: 66px;
        margin: 0 auto;
        background: #FFFFFF;
        border: 3px solid #000000;
        box-sizing: border-box;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
        border-radius: 63px;
        position: relative;

        >input{
            height: 60px;
            border: 0;
            appearance: none;
            outline: none;
            padding: 0 0 0 73px;
            background-color: transparent;
            font-size: 30px;
            line-height: 60px;
            font-family: 'Noto Sans KR';

            &::placeholder{
                color: #bdbdbd;
            }
        }

        .search-button{
            position: absolute;
            top: calc(50% - 33px);
            right: -1px;
            width: 66px;
            height: 66px;
            border-radius: 50%;
            background-color: #000000;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            >svg{
                width: 26.18px;
                height: 26.18px;
            }
        }
    }

    .search-result{
        width: 1144px;
        margin: 72px auto;

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

export default Search;