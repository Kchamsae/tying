import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as wordActions } from '../../redux/modules/word';
import MyAllDict from './MyAllDict';

const MyAllDictList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wordActions.loadAllDictDB());
  }, []);

  const _saveDict = useSelector((state) => state.word.dict_list2);

  const saveDict = [..._saveDict, ['', '', '', '', '']];
  return (
    <div>
      <MyAllDict saveDict={saveDict} />
    </div>
  );
};

export default MyAllDictList;
