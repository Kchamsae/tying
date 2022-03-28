import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actionCreators as wordActions } from '../../redux/modules/word';
import MyDict from './MyDict';
import { MyPageTitleWord } from '../../pages/MyPage/style';

const MyDictList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(wordActions.loadDictDB());
  }, []);

  const saveDict = useSelector((state) => state.word.dict_list2);

  return (
    <>
      <MyPageTitleWord>
        <h3>최근에 저장한 단어</h3>
        <div onClick={() => history.push('/mypage/all')}>
          전체 보기
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
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
        </div>
      </MyPageTitleWord>
      <MyDict saveDict={saveDict} />
    </>
  );
};

export default MyDictList;
