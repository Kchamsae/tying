import React from 'react';
import styled from 'styled-components';

const MyCertificate = () => {
  return (
    <div>
      <CertificationBox>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>TOEFL</h1>
          <div>
            <p>
              Date <span>2022/03/01</span>
            </p>
            <p>
              Time <span>04:43 PM</span>
            </p>
          </div>
        </div>
        <div>
          <p>Proudly presented to</p>
          <h3>yeonqry</h3>
        </div>
        <button>download</button>
      </CertificationBox>
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
