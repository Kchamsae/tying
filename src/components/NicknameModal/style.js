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
  height: 18.18vw;
  position: fixed;
  display: flex;
  justify-content: center;
  top: calc(50% - 12.45vw);
  left: calc(50% - 12.45vw);
  z-index: 10000;
  background-color: #f9f9f9;
  border-radius: 1.04vw;
  /* display: flex; */
  justify-content: center;
  padding: 3.91vw;
  box-sizing: border-box;
`;

const CloseButton = styled.div`
    position: absolute;
    width: 1.25vw;
    height: 1.25vw;
    left: 22.45vw;
    top: 1.09vw;
    z-index: 10001;
    cursor: pointer;

    >svg{
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
  svg {
    display: block;
    margin: auto;
    width: 5.89vw;
    height: 2.19vw;
  }
`;

const NicknameEditTitle = styled.div`
    margin-top: 0.52vw;
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
    color: #878889;
`;

const NicknameFormWrapper = styled.div`
    position: relative;
    width: min-content;
    margin: auto;
`;

const NicknameForm = styled.div`
      text-align: center;
      margin-top: 0.78vw;

      input {
        display: block;
        margin: auto;
        width: 14.48vw;
        height: 2.5vw;
        font-size: 0.83vw;
        margin-top: 1.41vw;

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
      > p {
        position: absolute;
        width: max-content;
        padding-left: 0.52vw;
        font-family: "Noto Sans KR";
        font-style: normal;
        font-size: 0.63vw;
        &.incorrect-nickname {
          margin-top: 0.26vw;
          color: #000;
        }
        &.correct-nickname {
          margin-top: 0.26vw;
          color: #2190fe;
        }
      }
`;

const NicknameCheckers = styled.div`
      position: absolute;
      top: 20%;
      right: -24.5%;
      text-align: left;
      width: 3.13vw;
      height: 1.67vw;
`;

const NicknameCheckButton = styled.div`
        width: 3.13vw;
        min-width: 42px;
        height: 1.67vw;
        left: 1.56vw;
        display: flex;
        justify-content: center;
        align-items: center;
        
        font-family: "Noto Sans KR";
        font-style: normal;
        font-weight: 600;
        font-size: 0.63vw;
        text-align: center;
        letter-spacing: -0.015em;

        color: #ffffff;

        background: #bdbdbd;
        border: none #bdbdbd;
        box-sizing: border-box;
        border-radius: 0.26vw;
        outline: none;
        padding: 0;

        cursor: pointer;
        transition: 0.3s;

        &:hover {
          background-color: #e6e7e8;
          border: none;
    }
`;

const EditNicknameButton = styled.div`
  display: block;
  margin: auto;
  width: 13.96vw;
  height: 2.5vw;
  margin-top: 1.56vw;

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

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(190, 190, 190, 0.91);
  z-index: 1000;
  opacity: 0;
  transition: all 0.125s ease-in 0s;
  animation: 250ms ease 0ms 1 normal forwards running opacityIn;
  @keyframes opacityIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  &.fade_out {
    animation: 250ms ease 0ms 1 normal forwards running opacityOut;
  }
  @keyframes opacityOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export {
    ModalWrapper,
    ModalBox,
    CloseButton,
    TyingLogo,
    NicknameEditTitle,
    NicknameFormWrapper,
    NicknameForm,
    NicknameCheckers,
    NicknameCheckButton,
    EditNicknameButton,
    ModalBg,
  };
  