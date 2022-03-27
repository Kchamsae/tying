import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import CertificateModal from '../CertificateModal/CertificateModal';
import { ModalBg } from './style';

import Slider from 'react-slick';

// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

const MyCertificate = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const onSetIsVisible = (active) => {
    setIsVisible(active);
  };

  const record = props.recordLoad;
  console.log(record);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', background: 'red' }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', background: 'green' }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    className: 'center',
    infinite: false,
    centerPadding: '60px',
    slidesToShow: 5,
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };

  return (
    <div>
      <Slider {...settings}>
        {record.map((a) => (
          <CertificationBox key={a._id}>
            <div style={{ display: 'flex' }}>
              <h1>{a.scriptType}</h1>
              <div>
                <p>
                  Date <span>{a.time.split(' ')[0]}</span>
                </p>
                <p>
                  Time{' '}
                  <span>
                    {a.time.split(' ')[1] + ' ' + a.time.split(' ')[2]}
                  </span>
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
      </Slider>
    </div>
  );
};

const CertificationBox = styled.div`
  width: 300px;
  height: 300px;
  background-color: grey;
  color: white;
  margin: 20px;
`;

export default MyCertificate;
