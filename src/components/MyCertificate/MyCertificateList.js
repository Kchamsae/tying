import React from 'react';
import MyCertificate from './MyCertificate';

const MyCertificateList = () => {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <h1>인증서 페이지 입니다.</h1>
        <h1>총 15개</h1>
        <h3>전체 보기</h3>
      </div>
      <MyCertificate />
    </div>
  );
};

export default MyCertificateList;
