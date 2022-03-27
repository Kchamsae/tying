import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { actionCreators as wordActions } from '../../redux/modules/word';
import MyDict from './MyDict';

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
        <div onClick={() => history.push('/mypage/all')}>전체 보기</div>
      </MyPageTitleWord>
      <MyDict saveDict={saveDict} />
    </>
  );
}; 

const MyPageTitleWord = styled.div`
  display: flex;
  
`;
export default MyDictList;
