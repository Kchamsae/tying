import React from 'react';

import { useSelector } from 'react-redux';

import { ModalTime } from '../CertificateModal/style'
import { 
  CertificateMini,
  MiniTop,
  MiniTitle,
  MiniType,
  MiniBody,
  MiniGraphic,
  MiniDownload
 } from './style'

const MyCertificate = (props) => {

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
            <MiniDownload onClick={() => {props._onClick()}}>
              Download
              <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 2L8 8L2 14" stroke="#707070" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </MiniDownload>
        </CertificateMini>
    </>
  );
};

export default MyCertificate;
