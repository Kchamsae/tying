import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import CertificateModal from '../CertificateModal/CertificateModal';

import { ModalBg } from './style';

const MyCertificate = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const onSetIsVisible = (active) => {
    setIsVisible(active);
  };

  const record = props.recordLoad;
  console.log(record);
  return (
    <div>
      {record.map((a) => (
        <CertificationBox key={a._id}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1>{a.scriptType}</h1>
            <div>
              <p>
                Date <span>{a.time.split(' ')[0]}</span>
              </p>
              <p>
                Time{' '}
                <span>{a.time.split(' ')[1] + ' ' + a.time.split(' ')[2]}</span>
              </p>
            </div>
          </div>
          <div>
            <p>Proudly presented to</p>
            <h3>{a.id}</h3>
          </div>
          <button onClick={() => onSetIsVisible(true)}>다운로드</button>
          <div>
            {isVisible && (
              <CertificateModal
                sec={a.duration}
                cpm={a.speed}
                char_num={a.typingCnt}
                progress={(a.typingCnt / 2000) * 100}
                onSetIsVisible={onSetIsVisible}
              />
            )}
          </div>
        </CertificationBox>
      ))}
    </div>
  );
};

const CertificationBox = styled.div`
  width: 300px;
  height: 300px;
  background-color: grey;
  color: white;
`;

export default MyCertificate;
