import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import CertificateModal from '../CertificateModal/CertificateModal';
import { ModalBg } from '../../pages/Typing/style';

import { useDispatch, useSelector } from 'react-redux';

import { actionCreators as recordActions } from '../../redux/modules/record';
import { ModalTime } from '../CertificateModal/style'
import { MiniTitle } from './style'

const MyCertificate = (props) => {
  const dispatch = useDispatch();

  const certificateLoad = useSelector((state) => state.record.record_list);
  console.log(certificateLoad);

  const _certificateLoad = useSelector((state) => state.record.record_list3);
  console.log(_certificateLoad);

  const nickname = useSelector(state=>state.user.user.nickname);

  return (
    <>
        <CertificateMini>
            <MiniTop>
              <MiniType>{props?.scriptType}</MiniType>
              <ModalTime>
                <div>
                  <span>Date</span>
                  <span>{props.time?.split(' ')[0]}</span>
                </div>
                <div>
                  <span>Time</span>
                  <span>{props.time?.split(' ')[1] + ' ' + props.time?.split(' ')[2]}</span>
                </div>
              </ModalTime>
            </MiniTop>
            <MiniTitle>{props.scriptTitle}</MiniTitle>
            <MiniBody>
              <p>Proudly presented to</p>
              <h3>{nickname}</h3>
              <MiniGraphic/>
            </MiniBody>
            <MiniDownload
              onClick={() => {
                props._onClick();
                dispatch(
                  recordActions.certificateLoadDB(props?.certificateId, props?.scriptId)
                );
              }}
            >
              Download
              <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 2L8 8L2 14" stroke="#707070" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </MiniDownload>
        </CertificateMini>
    </>
  );
};

const CertificateMini= styled.div`
  width: 579px;
  height: 356px;
  background: #E2E2E2;
  border-radius: 20px;
  padding: 27px 33px;
  box-sizing: border-box;
`;

const MiniTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MiniType = styled.h2`
  margin: -5px 0 0 22px;
  font-weight: 400;
  font-family: 'Paytone One';
  font-size: 60px;
  letter-spacing: -0.015em;
  position: relative;

  &::before{
    content: '';
    display: block;
    position: absolute;
    width: 11px;
    height: 41px;
    left: -22px;
    top: calc(50% - 25px);

    background: #FF2E00;
    border-radius: 2px;
  }
`;

const MiniBody = styled.div`
  margin: 2px 0 0 10px;
  padding-left: 28px;
  box-sizing: border-box;
  width: 409px;
  height: 106px;
  background: #EEEEEE;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  >p{
    margin: 0;
    font-size: 16px;
    letter-spacing: -0.015em;
    color: #878889;
  }
  >h3{
    margin: 0;
    /* font-family: 'Noto Sans KR'; */
    font-weight: 700;
    font-size: 27px;
    letter-spacing: -0.015em;
  }
`;
const MiniGraphic = styled.div`
  width: 149px;
  height: 212px;
  background-image: url('/static/certificate_mini.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: absolute;
  top: -36px;
  right: -63px;
`;

const MiniDownload = styled.p`
  margin: 35px 0 0 0;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: -0.015em;
  color: #707070;
  display: flex;
  align-items: center;

  >svg{
    width: 10px;
    height: 15px;
    margin-left: 7px;
  }
`;

export default MyCertificate;
