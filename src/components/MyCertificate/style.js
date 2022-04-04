import styled, { css } from 'styled-components';
import { ModalScriptTitle } from '../CertificateModal/style';

// MyCertificate
const CertificateMini = styled.div`
  width: 30.16vw;
  height: 18.54vw;
  background: #e2e2e2;
  border-radius: 1.04vw;
  padding: 1.41vw 1.72vw;
  box-sizing: border-box;
`;

const MiniTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MiniTitle = styled(ModalScriptTitle)`
  -webkit-line-clamp: 1;
  width: 18.75vw;
  margin-top: 0.36vw;
`;

const MiniType = styled.h2`
  margin: -0.26vw 0 0 1.15vw;
  font-weight: 400;
  font-family: 'Paytone One';
  font-size: 3.13vw;
  letter-spacing: -0.015em;
  position: relative;

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 0.57vw;
    height: 2.14vw;
    left: -1.15vw;
    top: calc(50% - 1.3vw);

    background: #ff2e00;
    border-radius: 0.1vw;
  }
`;

const MiniBody = styled.div`
  margin: 2px 0 0 0.52vw;
  padding-left: 1.46vw;
  box-sizing: border-box;
  width: 21.3vw;
  height: 5.52vw;
  background: #eeeeee;
  border-radius: 1.04vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  > p {
    margin: 0;
    font-size: 0.83vw;
    letter-spacing: -0.015em;
    color: #878889;
  }
  > h3 {
    margin: 0;
    /* font-family: 'Noto Sans KR'; */
    font-weight: 700;
    font-size: 1.41vw;
    letter-spacing: -0.015em;
  }
`;
const MiniGraphic = styled.div`
  width: 7.76vw;
  height: 11.04vw;
  background-image: url('/static/certificate_mini.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: absolute;
  top: -1.88vw;
  right: -3.28vw;
`;

const MiniDownload = styled.p`
  margin: 1.82vw 0 0 0;
  font-weight: 700;
  font-size: 1.04vw;
  letter-spacing: -0.015em;
  color: #707070;
  display: flex;
  align-items: center;
  cursor: pointer;

  > svg {
    width: 10px;
    height: 0.78vw;
    margin-left: 0.36vw;
  }
`;

// MyCertificateList
const MyCertificateSlider = styled.div`
  margin-top: 1.46vw;
  .slick-list {
    padding-left: 3.13vw;
  }
  .slick-slide {
    margin-right: 1.35vw;
  }
`;
const EmptySlide = styled.div`
  width: 30.16vw;
  height: 18.54vw;
`;

export {
  CertificateMini,
  MiniTop,
  MiniTitle,
  MiniType,
  MiniBody,
  MiniGraphic,
  MiniDownload,
  MyCertificateSlider,
  EmptySlide,
};
