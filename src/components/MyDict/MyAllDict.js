import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as wordActions } from '../../redux/modules/word';
import MyDict from './MyDict';

const MyAllDict = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wordActions.loadAllDictDB());
  }, []);

  const saveDict = useSelector((state) => state.word.dict_list2);

  return (
    <div>
      <h1>전체 단어장</h1>
      <MyDict saveDict={saveDict} />
    </div>
  );
};

export default MyAllDict;
