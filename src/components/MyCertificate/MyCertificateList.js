import React, { useEffect } from 'react';
import MyCertificate from './MyCertificate';
import { actionCreators as recordActions } from '../../redux/modules/record';
import { useDispatch, useSelector } from 'react-redux';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { MyPageTitleCertificate } from '../../pages/MyPage/style';

import { MyCertificateSlider, EmptySlide } from './style.js';

const MyCertificateList = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(recordActions.recordLoadDB());
  }, []);

  const recordLoad = useSelector((state) => state.record.record_list);

  const settings = {
    className: 'slider variable-width',
    dots: false,
    infinite: false,
    centerMode: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    variableWidth: true,
  };

  return (
    <React.Fragment>
      <MyPageTitleCertificate>
        <h3>타잉 인증서</h3>
        <div>총 {recordLoad.length}개</div>
      </MyPageTitleCertificate>
      <MyCertificateSlider>
        <Slider {...settings}>
          {recordLoad.map((a, i) => {
            return (
              <MyCertificate
                key={i}
                {...a}
                _onClick={() => {
                  props.setModal(true);
                  props.setScriptId(a.scriptId);
                  props.setCertificateId(a.certificateId);
                }}
              />
            );
          })}
          {(recordLoad.length === 1 || recordLoad.length === 2) && (
            <EmptySlide />
          )}
          {recordLoad.length === 1 && <EmptySlide />}
        </Slider>
      </MyCertificateSlider>
    </React.Fragment>
  );
};

export default MyCertificateList;
