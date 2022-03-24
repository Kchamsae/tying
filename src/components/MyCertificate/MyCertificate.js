import React from 'react';
import styled from 'styled-components';
import CertificateModal from '../CertificateModal/CertificateModal';

const MyCertificate = (props) => {
  const record = props.recordLoad;
  console.log(record);
  return (
    <div>
      {record.map((a) => (
        <CertificationBox key={a._id}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1>TOEFL</h1>
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
          <button onClick={() => <CertificateModal />}>download</button>
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
