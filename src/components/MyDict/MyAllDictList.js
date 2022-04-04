import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../redux/configureStore';
import { actionCreators as wordActions } from '../../redux/modules/word';
import { actionCreators as userActions } from '../../redux/modules/user';
import { getCookie } from '../../shared/Cookie';
import { alertNew, confirmNew } from '../../shared/alert';

import {
  PrevPage,
  AllDictList,
  ListHeader,
  WordSection,
  MeaningSection,
  SentenceSection,
  ListItem,
  ListFooter,
} from './style.js';

const MyAllDictList = () => {
  const dispatch = useDispatch();
  const token = getCookie('token');

  const saveDict = useSelector((state) => state.word.dict_list2);
  const is_login = useSelector((state) => state.user.is_login);

  useEffect(() => {
    if (!token) {
      alertNew('로그인 후에 이용할 수 있습니다.', () => {
        history.replace('/');
        dispatch(userActions.setLoginModal(true));
      });
    }
  }, [is_login]);

  useEffect(() => {
    dispatch(wordActions.loadAllDictDB());
  }, []);

  return (
    <React.Fragment>
      <PrevPage
        onClick={() => {
          history.goBack();
        }}
      >
        <svg
          width='11'
          height='16'
          viewBox='0 0 11 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M2 2L8 8L2 14'
            stroke='#878889'
            strokeWidth='3'
            strokeLinecap='round'
          />
        </svg>
        이전 페이지
      </PrevPage>
      <AllDictList>
        <ListHeader>
          <WordSection header>단어</WordSection>
          <MeaningSection header>뜻</MeaningSection>
          <SentenceSection header>예문</SentenceSection>
        </ListHeader>
        {saveDict?.map((a, i) => {
          return <MyAllDictItem key={i} {...a} />;
        })}
        <ListFooter />
      </AllDictList>
    </React.Fragment>
  );
};

const MyAllDictItem = (props) => {
  const dispatch = useDispatch();

  const deleteDict = (script_id, word) => {
    const check = window.confirm(
      '이 단어를 나만의 단어장에서 삭제하시겠습니까?'
    );
    if (check) {
      dispatch(wordActions.deleteMyDictDB(script_id, word));
      // dispatch(wordActions.loadDictDB());
    }
    confirmNew('이 단어를 나만의 단어장에서 삭제하시겠습니까?', () => {
      dispatch(wordActions.deleteMyDictDB(script_id, word));
    });
  };

  return (
    <ListItem>
      <WordSection>
        {props[2]}
        <div>
          <div
            onClick={() => {
              deleteDict(props[4], props[2]);
            }}
          >
            +
          </div>
        </div>
      </WordSection>
      <MeaningSection>
        <div>{props[0]}</div>
        {props[0] !== props[1] && <div>{props[1]}</div>}
      </MeaningSection>
      <SentenceSection>
        <div
          onClick={() => {
            history.push(`/typing/${props[4]}`);
          }}
        >
          {(props[3].split(props[2]).length >= 2
            ? props[3].split(props[2])
            : props[3].split(props[2].replace(/^./, props[2][0].toUpperCase()))
          ).map((a, i, arr) => {
            if (i + 1 !== arr.length) {
              return (
                <React.Fragment key={i}>
                  {a}
                  <span style={{ color: '#FF2E00' }}>{props[2]}</span>
                </React.Fragment>
              );
            }
            return <React.Fragment key={i}>{a}</React.Fragment>;
          })}
        </div>
      </SentenceSection>
    </ListItem>
  );
};

export default MyAllDictList;
