import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as wordActions } from '../redux/modules/word';

const DictModal = (props) => {
    const dispatch = useDispatch();

    const [type_mean, setTypeMean] = useState(false)
    // const [type_mean, setTypeMean] = useState(false)
    const meaningRef = useRef();

    const is_login = useSelector(state => state.user.is_login);
    const user = useSelector(state => state.user.user)   
    const script_id = useSelector(state => state.script.typing_script.scriptId)

    useEffect(()=>{
        if(is_login){
            dispatch(wordActions.setDictUserDB(script_id,props.word))            
        }
        dispatch(wordActions.setDictDB(script_id,props.word))
    },[])

    const dict_list = useSelector(state=>state.word.dict_list);

    const typeMeaning = () => {
        if(!is_login){
            alert('로그인 후 이용할 수 있습니다!');
            return;
        }
        if(is_login){
            setTypeMean(!type_mean);
        }
    }

    const addMeaning = () => {
        if(!is_login){
            alert('로그인 후 이용할 수 있습니다!')
            setTypeMean(false);
        }
        const second = dict_list?.filter(a=>a.nickname === user.nickname);
        if(second.length > 0){
            alert('이미 뜻을 작성했습니다!');
            setTypeMean(false);
            meaningRef.current.value = '';
            return;
        }
        if(meaningRef.current.value === ''){
            alert('단어 뜻을 입력해주세요!');
            return;
        }
        dispatch(wordActions.addDictDB(script_id,props.word,meaningRef.current.value));
        setTypeMean(false);
        meaningRef.current.value = '';
    }
    

    return (
        <>
            <DictModalWrapper>
                {props.children}
                <div className='dict-modal-inner'>
                    <div className='dict-header'>
                        <div className='dict-word'>{props.word}</div>
                        <div className='dict-sentense'>단어사전 등록 및 수정</div>
                    </div>
                    <div className='dict-body'>
                        <div className='dict-mean-box'>
                            <div className='dict-mean-header'>
                                <div>단어 뜻</div>
                                <div>닉네임</div>
                            </div>
                            <div className='dict-mean-list'>
                                {dict_list?.map((a,i)=>{
                                    return(
                                        <DictItem key={i} {...a}/>
                                    )
                                })}
                                {type_mean&&(
                                    <div className='dict-mean-item dict-mean-add'>
                                        <div>
                                            <input type='text' placeholder='Type the meaning...' ref={meaningRef}/>
                                        </div>
                                        <div>by. {user.nickname}</div>
                                        <div></div>
                                        <div>
                                            <div onClick={addMeaning}>입력 완료</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='dict-buttons'> 
                            <div onClick={typeMeaning}>뜻 추가하기</div>
                            <div>내 단어장에 저장</div>
                        </div>
                    </div>
                    <p>욕설 혹은 올바르지 않은 뜻을 등록하는 경우 건전한 서비스 환경 제공에 어려움이 있으므로 서비스 이용이 제한될 수 있습니다.</p>
                </div>
            </DictModalWrapper>
        </>
    );
};


const DictItem = (props) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const is_login = useSelector(state => state.user.is_login);
    const script_id = useSelector(state => state.script.typing_script.scriptId)
    const [edit, setEdit] = useState(false);
    const editMeaningRef = useRef(); 
    
    const editMeaning = () => {
        if(editMeaningRef.current.value === ''){
            alert('단어 뜻을 입력해주세요!');
            return;
        }
        dispatch(wordActions.editDictDB(script_id,props.word,props.wordId,editMeaningRef.current.value));
        setEdit(false);
    }

    const deleteMeaning = () => {
        const confirm = window.confirm('단어의 뜻을 삭제하시겠습니까?');
        if(confirm){
            dispatch(wordActions.deleteDictDB(script_id,props.wordId))
        }
    }
    const pushLike = (is_like) => {
        if(!is_login){
            alert('로그인 후 이용할 수 있습니다!');
            return;
        }
        if(!is_like){
            dispatch(wordActions.upLikeDB(script_id,props.wordId));
        } else{
            dispatch(wordActions.downLikeDB(script_id,props.wordId))
        }
    }
    const pushDislike = (is_dislike) => {
        if(!is_login){
            alert('로그인 후 이용할 수 있습니다!');
            return;
        }
        if(!is_dislike){
            dispatch(wordActions.upDislikeDB(script_id,props.wordId));
        } else{
            dispatch(wordActions.downDislikeDB(script_id,props.wordId))
        }
    }

    if(edit){
        return(
            <div className='dict-mean-item dict-mean-add'>
                <div>
                    <input type='text' placeholder='Type the meaning...' ref={editMeaningRef} defaultValue={props.meaning}/>
                </div>
                <div>by. {user.nickname}</div>
                <div></div>
                <div>
                    <div onClick={editMeaning}>수정 완료</div>
                </div>
            </div> 
        )
    }
    return (
        <>
            <div className='dict-mean-item'> 
                <div>{props.meaning}</div>
                <div>by. {props.nickname}</div>
                <div className='dict-like'>
                    <div className={props.isLike ? 'dict-is-like' : ''} onClick={()=>pushLike(props.isLike)}>
                        <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 16.6667H3.33333V6.66667H0V16.6667ZM18.3333 7.5C18.3333 6.58333 17.5833 5.83333 16.6667 5.83333H11.4083L12.2 2.025L12.225 1.75833C12.225 1.41667 12.0833 1.1 11.8583 0.875L10.975 0L5.49167 5.49167C5.18333 5.79167 5 6.20833 5 6.66667V15C5 15.9167 5.75 16.6667 6.66667 16.6667H14.1667C14.8583 16.6667 15.45 16.25 15.7 15.65L18.2167 9.775C18.2917 9.58333 18.3333 9.38333 18.3333 9.16667V7.5Z" fill="white"/>
                        </svg>
                        <span>{props.likeCount}</span>
                    </div>
                    <div className={props.isDisLike ? 'dict-is-dislike' : ''} onClick={()=>pushDislike(props.isDisLike)}>
                        <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 16.6667H3.33333V6.66667H0V16.6667ZM18.3333 7.5C18.3333 6.58333 17.5833 5.83333 16.6667 5.83333H11.4083L12.2 2.025L12.225 1.75833C12.225 1.41667 12.0833 1.1 11.8583 0.875L10.975 0L5.49167 5.49167C5.18333 5.79167 5 6.20833 5 6.66667V15C5 15.9167 5.75 16.6667 6.66667 16.6667H14.1667C14.8583 16.6667 15.45 16.25 15.7 15.65L18.2167 9.775C18.2917 9.58333 18.3333 9.38333 18.3333 9.16667V7.5Z" fill="white"/>
                        </svg>
                        <span>{props.dislikeCount}</span>
                    </div>
                </div>
                <div>
                    {props.nickname === user.nickname && (
                        <>
                            <div className='dict-edit' onClick={()=>{setEdit(true)}}>
                                <svg viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 14.2525V18.0025H3.75L14.81 6.9425L11.06 3.1925L0 14.2525ZM17.71 4.0425C18.1 3.6525 18.1 3.0225 17.71 2.6325L15.37 0.2925C14.98 -0.0975 14.35 -0.0975 13.96 0.2925L12.13 2.1225L15.88 5.8725L17.71 4.0425Z" fill="white"/>
                                </svg>
                            </div>
                            <div className='dict-delete' onClick={deleteMeaning}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff">
                                    <path d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                </svg>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

const DictModalWrapper = styled.div`
    position: fixed;
    background: rgba(30, 30, 30, 0.5);
    backdrop-filter: blur(8px);
    left: calc(50% - 955px/2 + 0.5px);
    top: calc(50% - 571px/2 + 12px);
    width: 955px;
    height: 571px;
    border-radius: 20px;
    z-index: 10000;
    display: flex;
    justify-content: center;

    .dict-modal-inner{
        box-sizing: border-box;
        padding-top: 37px;
        flex: 79.48% 0 0;
        position: relative;

        .dict-header{
            display: flex;
            justify-content: space-between;
            align-items: baseline;

            .dict-word{
                font-family: 'Paytone One';
                font-weight: 400;
                font-size: 60px;
                letter-spacing: -0.015em;
                box-sizing: border-box;
                padding-left: 40px;
                position: relative;

                &::before{
                    content: '';
                    display: block;
                    position: absolute;
                    width: 20px;
                    height: 40px;
                    left: 0px;
                    top: calc(50% - 15px);
                    background: #FF2E00;
                    border-radius: 3px;
                }
            }

            .dict-sentense{
                font-family: 'Noto Sans KR';
                font-weight: 700;
                font-size: 18px;
                letter-spacing: -0.015em;
            }
        }

        .dict-body{
            margin-top: 3px;
            width: 759px;
            height: 375px;
            background: #4B4B4B;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 34px 0 27px;

            .dict-mean-box{
                width: 100%;

                .dict-mean-header{
                    display: flex;
                    justify-content: flex-start;
                    font-family: 'Noto Sans KR';
                    font-weight: 500;
                    font-size: 18px;
                    line-height: 25px;
                    letter-spacing: -0.015em;
                    color: #BDBDBD;
                    height: 54px;

                    >div{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    >div:first-of-type{
                        flex: 34.65% 0 0;
                    }
                    >div:last-of-type{
                        flex: 26.61% 0 0;
                    }
                }
                .dict-mean-list{

                    .dict-mean-item{
                        display: flex;
                        height: 45px;
                        background: #3A3A3C;
                        margin-bottom: 2px;
                        
    
                        >div{
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            position: relative;

                            &::before{
                                content: '';
                                display: block;
                                width: 2px;
                                height: 20px;
                                background: rgba(84, 84, 88, 0.65);
                                border-radius: 0.5px;
                                position: absolute;
                                right: 0;
                                top: 12.5px;
                            }
                        }

                        .dict-like{
                            >div.dict-is-like svg path{
                                fill: #FF6442;
                            }
                            >div.dict-is-dislike svg path{
                                fill: #FF6442;
                            }
                            >div{
                                display: flex;
                                align-items: center;
                                transition: 0.3s;
                                svg{
                                    width: 19px;
                                    height: 17px;
                                    cursor: pointer;
                                }
                                span{
                                    margin-left: 5px;
                                    font-weight: 500;
                                    font-size: 18px;
                                    letter-spacing: -0.015em;
                                    color: #BDBDBD;
                                }
                            }
                            >div:last-of-type{
                                margin-left: 14px;
                                svg{
                                    transform: rotate(180deg);
                                    padding-bottom: 6px;
                                }
                            }
                        }
    
                        >div:first-of-type{
                            flex: 34.65% 0 0;
                            font-size: 18px;
                            letter-spacing: -0.015em;
                            color: #FFFFFF;
                            font-family: 'Noto Sans KR';
                        }
    
                        >div:nth-of-type(2){
                            flex: 26.61% 0 0;
                            font-size: 16px;
                            letter-spacing: -0.08px;
                            color: #BDBDBD;
                        }
    
                        >div:nth-of-type(3){
                            flex:21.87% 0 0;
                        }
                        >div:last-of-type{
                            flex:16.87% 0 0;
                            &::before{
                                width: 0;
                            }

                            >div{
                                width: 38px;
                                height: 38px;
                                border-radius: 50%;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                cursor:pointer;
                                transition: 0.3s;

                                &:hover{
                                    background-color: rgba(0,0,0,0.15);
                                }

                                svg{
                                    width: 24px;
                                    height: 24px;
                                }
                            }

                            
                            .dict-edit{
                                margin-right: 10px;
                                svg{
                                    width: 19px;
                                    height: 18px;
                                }
                            }
                        }
                    }

                    .dict-mean-add{
                        transition: 0.3s;
                        >div>input{
                            background-color: transparent;
                            text-align: center;
                            font-size: 18px;
                            font-weight: 500;
                            letter-spacing: -0.015em;
                            color: #BDBDBD; 
                            border: none;
                            appearance: none;
                            outline: none;

                            &::placeholder{
                                color: #BDBDBD;  
                            }
                        }

                        >div:last-of-type{
                            >div{
                                font-weight: 700;
                                font-size: 18px;
                                line-height: 25px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                letter-spacing: -0.015em;
                                color: #FFFFFF;
                                width: 100px;
                                height: 34px;
                                border-radius: 17px;
                                transition: 0.3s;
                                cursor: pointer;

                                &:hover{
                                    background-color: rgba(0,0,0,0.15);
                                }
                            }
                        }
                    }
                }
            }

            .dict-buttons{
                display: flex;
                justify-content: center;
                >div{
                    width: 195px;
                    height: 42px;
                    background: #000000;
                    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.08);
                    border-radius: 10px;

                    font-family: 'Noto Sans KR';
                    font-weight: 700;
                    font-size: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    letter-spacing: -0.015em;
                    color: #FFFFFF;
                    cursor: pointer;

                    &:first-of-type{
                        margin-right: 44px;
                    }
                }
            }
        }

        >p{
            font-family: 'Noto Sans KR';
            font-weight: 500;
            font-size: 12px;
            line-height: 16px;
            text-align: center;
            letter-spacing: -0.015em;
        }

    }

`

export default DictModal;