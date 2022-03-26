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
  width: 478px;
  height: 616px;
  position: fixed;
  top: calc(50% - 239px);
  left: calc(50% - 239px);
  z-index: 10000;
  background-color: #f9f9f9;
  border-radius: 20px;
  /* display: flex; */
  justify-content: center;
  padding: 75px;
  box-sizing: border-box;

  .close-button {
    position: absolute;
    width: 24px;
    height: 24px;
    left: 431px;
    top: 21px;
    z-index: 10001;
    cursor: pointer;

    svg path {
      transition: 0.3s;
    }

    &:hover {
      svg path {
        fill: #464646;
      }
    }
  }

  .nicknameEdit-title {
    font-family: 'Noto Sans KR';
      font-style: normal;
      font-weight: 700;
      font-size: 17px;
      line-height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      letter-spacing: -0.015em;
  }

  .nickname-form-wrapper {
    position: relative;
    width: min-content;
    margin: auto;

    .nickname-form {
      text-align: center;
      margin-top: 15px;

      input {
        display: block;
        margin: auto;
        width: 278px;
        height: 48px;
        font-size: 16px;
        margin-top: 27px;

        font-family: "Noto Sans KR";
        font-style: normal;
        color: #212529;

        border: 1px solid rgb(222, 226, 230);
        border-radius: 20px;
        flex: 1 1 0%;
        box-sizing: border-box;
        padding: 1rem;
        background: #fff;
        outline: none;

        &:focus {
          border: 1px solid #212529;
        }
      }
      > p {
        position: absolute;
        width: max-content;
        padding-left: 10px;
        font-family: "Noto Sans KR";
        font-style: normal;
        font-size: 12px;
        &.incorrect-nickname {
          margin-top: 5px;
          color: #ff2e00;
        }
        &.correct-nickname {
          margin-top: 5px;
          color: #2190fe;
        }
      }
    }
    .nickname-checkers {
      position: absolute;
      top: 20%;
      right: -24.5%;
      text-align: left;
      width: 60px;
      height: 32px;
      button {
        width: 60px;
        height: 32px;
        left: 30px;

        font-family: "Noto Sans KR";
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        text-align: center;
        letter-spacing: -0.015em;

        color: #ffffff;

        background: #bdbdbd;
        border: none #bdbdbd;
        box-sizing: border-box;
        border-radius: 5px;
        outline: none;

        cursor: pointer;
        transition: 0.3s;

        &:hover {
          background-color: #e6e7e8;
          border: none;
        }
      }
    }
    .editNickname-button {
      display: block;
      margin: auto;
      width: 268px;
      height: 48px;
      margin-top: 27px;

      font-family: "Noto Sans KR";
      font-style: normal;
      font-weight: 700;
      font-size: 17px;
      line-height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      letter-spacing: -0.015em;

      color: #ffffff;

      background: #ff2e00;
      border: 3px solid #ff2e00;
      box-sizing: border-box;
      border-radius: 20px;
      outline: none;

      cursor: pointer;
      transition: 0.3s;

      &:hover {
        background-color: #e6e7e8;
        border: none;
      }
    }
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