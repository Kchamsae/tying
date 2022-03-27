import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import CertificateModal from '../CertificateModal/CertificateModal';
import { ModalBg } from './style';

import { useDispatch, useSelector } from 'react-redux';

import Slider from 'react-slick';

import { actionCreators as recordActions } from '../../redux/modules/record';
import MyCertificateModal from './MyCertificateModal';

// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

const MyCertificate = (props) => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(recordActions.certificateLoadDB());
  // }, []);

  const certificateLoad = useSelector((state) => state.record.record_list);
  console.log(certificateLoad);

  const _certificateLoad = useSelector((state) => state.record.record_list3);
  console.log(_certificateLoad);

  // const openCertificate = () => {
  //   dispatch(
  //     recordActions.certificateLoadDB(
  //       certificateLoad.certificateId,
  //       certificateLoad.scriptId
  //     )
  //   );
  // };

  const record = props.recordLoad;
  // console.log(record);

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
            <div
              onClick={() => {
                dispatch(
                  recordActions.certificateLoadDB(a.certificateId, a.scriptId)
                );
                setModal(true);
              }}
            >
              다운로드
            </div>
          </CertificationBox>
        ))}
      </Slider>
      {modal && (
        <>
          <ModalBg />
          <MyCertificateModal certificateLoad={_certificateLoad} />
        </>
      )}
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
