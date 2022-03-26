import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actionCreators as wordActions } from '../../redux/modules/word';
import MyDict from './MyDict';

const MyDictList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(wordActions.loadDictDB());
  }, []);

  const saveDict = useSelector((state) => state.word.dict_list2);
  console.log(saveDict);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <h1>최근에 저장한 단어</h1>
        <h3 onClick={() => history.push('/mypage/all')}>전체 보기</h3>
      </div>
      <MyDict saveDict={saveDict} />
    </div>
  );
};

export default MyDictList;
