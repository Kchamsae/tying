import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as wordActions } from '../../redux/modules/word';
import { actionCreators as userActions } from '../../redux/modules/user';
import { alertNew, alertNewWhite, confirmNewWhite } from '../../shared/alert';
import { 
  DictModalWrapper,
  DictModalInner,
  DictHeader,
  DictWord,
  DictSentense,
  DictBody,
  DictMeanBox,
  DictMeanHeader,
  DictMeanList,
  DictButtons,
 } from './style';

const DictModal = (props) => {
  const dispatch = useDispatch();

  const [type_mean, setTypeMean] = useState(false);
  const meaningRef = useRef();

  const is_login = useSelector((state) => state.user.is_login);
  const user = useSelector((state) => state.user.user);
  const script_id = useSelector((state) => state.script.typing_script.scriptId);

  useEffect(() => {
    if (is_login) {
      dispatch(wordActions.setDictUserDB(script_id, props.word));
    }
    dispatch(wordActions.setDictDB(script_id, props.word));
  }, []);

  const dict_list = useSelector((state) => state.word.dict_list);

  const typeMeaning = () => {
    if (!is_login) {
      alertNewWhite('로그인 후에 이용할 수 있습니다.', ()=>{dispatch(userActions.setLoginModal(true))});
      return;
    }
    if (is_login) {
      setTypeMean(!type_mean);
    }
  };

  const addMeaning = () => {
    if (!is_login) {
      alertNewWhite('로그인 후에 이용할 수 있습니다.', ()=>{dispatch(userActions.setLoginModal(true)); setTypeMean(false);});
      
    }
    const second = dict_list?.filter((a) => a.nickname === user.nickname);
    if (second.length > 0) {
      alertNewWhite('단어 뜻은 한 번만 등록할 수 있습니다', ()=>{
        setTypeMean(false);
        meaningRef.current.value = '';
      });
      return;
    }
    if (meaningRef.current.value === '') {
      alertNewWhite('단어 뜻을 입력해주세요!');
      return;
    }
    dispatch(wordActions.addDictDB(script_id, props.word, meaningRef.current.value)).then((res)=>{
      if(!res){
        confirmNewWhite('이 단어가 아직 나만의 단어장에 등록되어있지 않습니다. 나만의 단어장에 저장하시겠습니까?', saveDict)
      }
    })
    setTypeMean(false);
    meaningRef.current.value = '';
  };

  const saveDict = () => {
    if(!is_login) {
      alertNewWhite('로그인 후 이용할 수 있습니다!',()=>{
        dispatch(userActions.setLoginModal(true));
      });
      return;
    }
    if(dict_list?.length === 0){
      alertNewWhite('작성된 뜻이 없습니다. 먼저 뜻을 작성해주세요.',()=>{
        setTypeMean(true);
      })
    }
    dispatch(wordActions.saveDictDB(script_id, props.word, props.sentence));
  };

  return (
    <>
      <DictModalWrapper>
        {props.children}
        <DictModalInner>
          <DictHeader>
            <DictWord>{props.word}</DictWord>
            <DictSentense>단어사전 등록 및 수정</DictSentense>
          </DictHeader>
          <DictBody>
            <DictMeanBox>
              <DictMeanHeader>
                <div>단어 뜻</div>
                <div>닉네임</div>
              </DictMeanHeader>
              <DictMeanList>
                {dict_list?.map((a, i) => {
                  return <DictItem key={i} {...a} saveDict={saveDict} word={props.word}/>;
                })}
                {type_mean && (
                  <div className='dict-mean-item dict-mean-add'>
                    <div>
                      <input
                        type='text'
                        placeholder='뜻을 입력하세요.'
                        ref={meaningRef}
                        onKeyDown={(e)=>{
                          if(e.key === 'Enter'){
                            addMeaning();
                          }
                        }}
                      />
                    </div>
                    <div>by. {user.nickname}</div>
                    <div></div>
                    <div>
                      <div onClick={addMeaning}>입력 완료</div>
                    </div>
                  </div>
                )}
              </DictMeanList>
            </DictMeanBox>
            <DictButtons>
              <div onClick={typeMeaning}>뜻 추가하기</div>
              <div onClick={saveDict}>내 단어장에 저장</div>
            </DictButtons>
          </DictBody>
          <p>
            욕설 혹은 올바르지 않은 뜻을 등록하는 경우 건전한 서비스 환경 제공에
            어려움이 있으므로 서비스 이용이 제한될 수 있습니다.
          </p>
        </DictModalInner>
      </DictModalWrapper>
    </>
  );
};

const DictItem = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const is_login = useSelector((state) => state.user.is_login);
  const script_id = useSelector((state) => state.script.typing_script.scriptId);
  const [edit, setEdit] = useState(false);
  const editMeaningRef = useRef();

  const editMeaning = () => {
    if (editMeaningRef.current.value === '') {
      alertNewWhite('단어 뜻을 입력해주세요!');
      return;
    }
    dispatch(wordActions.editDictDB(script_id, props.word, props.wordId, editMeaningRef.current.value)).then((res)=>{
      if(!res){
        confirmNewWhite('이 단어가 아직 나만의 단어장에 등록되어있지 않습니다. 나만의 단어장에 저장하시겠습니까?', props.saveDict);
      }
    })
    setEdit(false);
  };

  const deleteMeaning = () => {
    confirmNewWhite('단어의 뜻을 삭제하시겠습니까?',()=>{
      dispatch(wordActions.deleteDictDB(script_id, props.wordId)); 
    });
  };
  const pushLike = (is_like) => {
    if (!is_login) {
      alertNewWhite('로그인 후 이용할 수 있습니다!',()=>{
        dispatch(userActions.setLoginModal(true));
      });
      return;
    }
    if (props.nickname === user.nickname) {
      alertNewWhite('본인이 추가한 뜻에는 좋아요를 누를 수 없습니다!');
      return;
    }

    if (!is_like) {
      dispatch(wordActions.upLikeDB(script_id, props.wordId));
    } else {
      dispatch(wordActions.downLikeDB(script_id, props.wordId));
    }
  };
  const pushDislike = (is_dislike) => {
    if (!is_login) {
      alertNewWhite('로그인 후 이용할 수 있습니다!',()=>{
        dispatch(userActions.setLoginModal(true));
      });
      return;
    }
    if (props.nickname === user.nickname) {
      alertNewWhite('본인이 추가한 뜻에는 싫어요를 누를 수 없습니다!');
      return;
    }
    if (!is_dislike) {
      dispatch(wordActions.upDislikeDB(script_id, props.wordId));
    } else {
      dispatch(wordActions.downDislikeDB(script_id, props.wordId));
    }
  };

  if (edit) {
    return (
      <div className='dict-mean-item dict-mean-add'>
        <div>
          <input
            type='text'
            placeholder='뜻을 입력하세요.'
            ref={editMeaningRef}
            defaultValue={props.meaning}
            onKeyDown={(e)=>{
              if(e.key === 'Enter'){
                editMeaning();
              }
            }}
          />
        </div>
        <div>by. {user.nickname}</div>
        <div></div>
        <div>
          <div onClick={editMeaning}>수정 완료</div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className='dict-mean-item'>
        <div>{props.meaning}</div>
        <div>by. {props.nickname}</div>
        <div className='dict-like'>
          <div
            className={props.isLike ? 'dict-is-like' : ''}
            onClick={() => pushLike(props.isLike)}
          >
            <svg
              width='19'
              height='17'
              viewBox='0 0 19 17'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0 16.6667H3.33333V6.66667H0V16.6667ZM18.3333 7.5C18.3333 6.58333 17.5833 5.83333 16.6667 5.83333H11.4083L12.2 2.025L12.225 1.75833C12.225 1.41667 12.0833 1.1 11.8583 0.875L10.975 0L5.49167 5.49167C5.18333 5.79167 5 6.20833 5 6.66667V15C5 15.9167 5.75 16.6667 6.66667 16.6667H14.1667C14.8583 16.6667 15.45 16.25 15.7 15.65L18.2167 9.775C18.2917 9.58333 18.3333 9.38333 18.3333 9.16667V7.5Z'
                fill='white'
              />
            </svg>
            <span>{props.likeCount}</span>
          </div>
          <div
            className={props.isDisLike ? 'dict-is-dislike' : ''}
            onClick={() => pushDislike(props.isDisLike)}
          >
            <svg
              width='19'
              height='17'
              viewBox='0 0 19 17'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0 16.6667H3.33333V6.66667H0V16.6667ZM18.3333 7.5C18.3333 6.58333 17.5833 5.83333 16.6667 5.83333H11.4083L12.2 2.025L12.225 1.75833C12.225 1.41667 12.0833 1.1 11.8583 0.875L10.975 0L5.49167 5.49167C5.18333 5.79167 5 6.20833 5 6.66667V15C5 15.9167 5.75 16.6667 6.66667 16.6667H14.1667C14.8583 16.6667 15.45 16.25 15.7 15.65L18.2167 9.775C18.2917 9.58333 18.3333 9.38333 18.3333 9.16667V7.5Z'
                fill='white'
              />
            </svg>
            <span>{props.dislikeCount}</span>
          </div>
        </div>
        <div>
          {props.nickname === user?.nickname && (
            <>
              <div
                className='dict-edit'
                onClick={() => {
                  setEdit(true);
                }}
              >
                <svg
                  viewBox='0 0 19 18'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M0 14.2525V18.0025H3.75L14.81 6.9425L11.06 3.1925L0 14.2525ZM17.71 4.0425C18.1 3.6525 18.1 3.0225 17.71 2.6325L15.37 0.2925C14.98 -0.0975 14.35 -0.0975 13.96 0.2925L12.13 2.1225L15.88 5.8725L17.71 4.0425Z'
                    fill='white'
                  />
                </svg>
              </div>
              <div className='dict-delete' onClick={deleteMeaning}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='#fff'
                >
                  <path d='M0 0h24v24H0z' fill='none' />
                  <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' />
                </svg>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DictModal;
