import styled, { css } from "styled-components";

const SignupWrapper = styled.div`
  .tying-welcome-logo {
    display: flex;
    > svg {
      width: 19.17vw;
      height: 2.71vw;
    }
  }
`;

const SignupTitle = styled.div`
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

const SignupFormWrapper = styled.div`
  position: relative;
  width: min-content;
  margin: auto;
`;

const SignupForm = styled.div`
  text-align: center;
  margin-top: 2.08vw;

  input {
    display: block;
    margin: auto;
    width: 14.48vw;
    height: 2.5vw;
    font-size: 0.83vw;
    margin-top: 0.42vw;

    font-family: "Noto Sans KR";
    font-style: normal;
    color: #212529;

    border: 1px solid rgb(222, 226, 230);
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
    &.incorrect-id {
      margin-top: 0.26vw;
      color: #ff2e00;
    }
    &.correct-id {
      margin-top: 0.26vw;
      color: #2190fe;
    }
  }
`;

const IdCheckers = styled.div`
  position: absolute;
  top: 20%;
  right: -24.5%;
  text-align: left;
  width: 3.13vw;
  height: 1.67vw;

  > svg {
    width: 1.3vw;
    height: 1.3vw;
  }
`;

const IdCheckersButton = styled.div`
    width: 3.13vw;
    min-width: 42px;
    padding: 0;
    height: 1.67vw;
    left: 1.56vw;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 500;
    font-size: 0.63vw;
    text-align: center;
    letter-spacing: -0.015em;

    color: #ffffff;

    background: #bdbdbd;
    border: none #bdbdbd;
    box-sizing: border-box;
    border-radius: 0.26vw;
    outline: none;

    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background-color: #e6e7e8;
      border: none;
    }
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
      color: #ff2e00;
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

  > svg {
    width: 1.3vw;
    height: 1.3vw;
  }
`;

const NicknameCheckersButton = styled.div`
    width: 3.13vw;
    min-width: 42px;
    padding: 0;
    height: 1.67vw;
    left: 1.56vw;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 500;
    font-size: 0.63vw;
    text-align: center;
    letter-spacing: -0.015em;

    color: #ffffff;

    background: #bdbdbd;
    border: none #bdbdbd;
    box-sizing: border-box;
    border-radius: 0.26vw;
    outline: none;

    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background-color: #e6e7e8;
      border: none;
    }
`;

const PwdForm = styled.div`
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
    margin-left: 1.35vw;
    width: max-content;
    padding-left: 0.52vw;
    font-family: "Noto Sans KR";
    font-style: normal;
    font-size: 0.63vw;
    &.incorrect-pwd {
      margin-top: 0.26vw;
      color: #ff2e00;
    }
    &.correct-pwd {
      margin-top: 0.26vw;
      color: #2190fe;
    }
  }
`;

const PwdCheckForm = styled.div`
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
    margin-left: 1.35vw;
    width: max-content;
    padding-left: 0.52vw;
    font-family: "Noto Sans KR";
    font-style: normal;
    font-size: 0.63vw;
    &.incorrect-pwd-check {
      margin-top: 0.26vw;
      color: #ff2e00;
    }
    &.correct-pwd-check {
      margin-top: 0.26vw;
      color: #2190fe;
    }
  }
`;

const SignupButton = styled.div`
  display: block;
  margin: auto;
  width: 13.96vw;
  height: 2.5vw;
  margin-top: 1.41vw;

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

export {
  SignupWrapper,
  SignupTitle,
  SignupFormWrapper,
  SignupForm,
  IdCheckers,
  IdCheckersButton,
  NicknameFormWrapper,
  NicknameForm,
  NicknameCheckers,
  NicknameCheckersButton,
  PwdForm,
  PwdCheckForm,
  SignupButton,
};
