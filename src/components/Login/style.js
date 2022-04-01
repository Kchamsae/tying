import styled, { css } from "styled-components";

const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const ModalBox = styled.div`
  width: 24.9vw;
  background-color: #f9f9f9;
  border-radius: 1.04vw;
  padding: 3.91vw;
  box-sizing: border-box;
  position: relative;
  transition: 0.5s;
`;

const CloseButton = styled.div`
  position: absolute;
  width: 1.25vw;
  height: 1.25vw;
  left: 22.45vw;
  top: 1.09vw;
  z-index: 10001;
  cursor: pointer;

  > svg {
    width: 1.25vw;
    height: 1.25vw;
  }

  svg path {
    transition: 0.3s;
  }

  &:hover {
    svg path {
      fill: #464646;
    }
  }
`;

const TyingLogo = styled.div`
  display: block;
  margin: auto;
  width: 7.5vw;
  height: 2.6vw;
  > svg {
    width: 5.89vw;
    height: 2.19vw;
  }
`;

const InfoTitle = styled.div`
  justify-content: center;
  margin: 1.3vw auto;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 1.04vw;
  line-height: 1.41vw;
  letter-spacing: -0.015em;

  > p {
    margin: 0;
    text-align: center;
  }
`;

const LoginButton = styled.div`
  width: 70%;
  height: 2.6vw;
  justify-content: center;
  margin: 2.34vw auto 0;
  padding: 0.16vw;
`;

const LoginButton2 = styled.div`
  display: block;
  width: 100%;
  height: 2.5vw;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 0.89vw;
  line-height: 1.3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  letter-spacing: -0.015em;

  color: #ffffff;

  background: #ff2e00;
  border: 0.16vw solid #ff2e00;
  box-sizing: border-box;
  border-radius: 1.04vw;
  outline: none;

  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #e6e7e8;
    border: none;
  }
`;

const KakaoButton = styled.div`
  width: 70%;
  height: 2.6vw;
  justify-content: center;
  margin: 0 auto;
  padding-top: 0.21vw;
`;

const KakaoButton2 = styled.div`
  display: block;
  width: 100%;
  height: 2.5vw;
  position: relative;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 0.89vw;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: -0.015em;

  background: #fee500;
  box-sizing: border-box;
  border-radius: 1.04vw;
  border: none;
  outline: none;

  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #e6e7e8;
    border: none;
  }

  > svg {
    width: 0.99vw;
    height: 0.94vw;
    position: absolute;
    top: calc(50% - 0.47vw);
    left: 0.99vw;
  }
`;

const NoSignup = styled.div`
  justify-content: center;
  margin: auto;
  margin-top: 1.3vw;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 0.83vw;
  text-align: center;
  letter-spacing: -0.015em;
  color: #878889;

  span {
    color: #ff2e00;
    cursor: pointer;
  }
`;

const TyingWelcomeLogo = styled.div`
  display: flex;
  > svg {
    width: 19.17vw;
    height: 2.71vw;
  }
`;

const LoginTitle = styled.div`
  width: 11.61vw;
  height: 1.82vw;
  left: 6.61vw;
  top: 5.1vw;
  justify-content: center;
  margin: auto;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 600;
  font-size: 0.99vw;
  line-height: 1.41vw;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.015em;

  color: #878889;
`;

const LoginForm = styled.div`
  margin-top: 2.6vw;
  text-align: right;
  input {
    display: block;
    margin: auto;
    width: 70%;
    height: 2.5vw;
    font-size: 0.83vw;
    margin-top: 0.42vw;

    font-family: "Noto Sans KR";
    font-style: normal;
    color: #212529;

    border: 0.05vw solid rgb(222, 226, 230);
    border-radius: 1.04vw;
    flex: 1 1 0%;
    box-sizing: border-box;
    padding: 0.83vw;
    background: #fff;
    outline: none;

    &:focus {
      border: 0.05vw solid #212529;
    }
  }
`;

const LoginButton3 = styled.div`
  display: block;
  margin: 1.04vw auto 1.25vw;
  width: 70%;
  height: 2.5vw;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 0.89vw;
  line-height: 1.3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  letter-spacing: -0.015em;

  color: #ffffff;

  background: #ff2e00;
  border: 0.16vw solid #ff2e00;
  box-sizing: border-box;
  border-radius: 1.04vw;
  outline: none;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #e6e7e8;
    border: none;
  }
`;

export {
  ModalWrapper,
  ModalBox,
  CloseButton,
  TyingLogo,
  InfoTitle,
  LoginButton,
  LoginButton2,
  KakaoButton,
  KakaoButton2,
  NoSignup,
  TyingWelcomeLogo,
  LoginTitle,
  LoginForm,
  LoginButton3,
};