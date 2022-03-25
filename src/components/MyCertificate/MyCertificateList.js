import React, { useEffect } from 'react';
import MyCertificate from './MyCertificate';
import { actionCreators as recordActions } from '../../redux/modules/record';
import { useDispatch, useSelector } from 'react-redux';

const MyCertificateList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(recordActions.recordLoadDB());
  }, []);

  const recordLoad = useSelector((state) => state.record.record_list);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <h1>인증서 페이지 입니다.</h1>
        <h1>총 {recordLoad.length}개</h1>
        <h3>전체 보기</h3>
      </div>
      <MyCertificate recordLoad={recordLoad} />
    </div>
  );
};

export default MyCertificateList;
