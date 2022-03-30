import styled, { css } from 'styled-components';
import { ModalScriptTitle } from '../CertificateModal/style';

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

const MiniTitle = styled(ModalScriptTitle)`
  -webkit-line-clamp: 1;
  width: 360px;
  margin-top: 7px;
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
  cursor: pointer;

  >svg{
    width: 10px;
    height: 15px;
    margin-left: 7px;
  }
`;

export {
  CertificateMini,
  MiniTop,
  MiniTitle,
  MiniType,
  MiniBody,
  MiniGraphic,
  MiniDownload
};
