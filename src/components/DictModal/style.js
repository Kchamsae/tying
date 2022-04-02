import styled, { css } from "styled-components";

const DictModalWrapper = styled.div`
  position: fixed;
  background: rgba(30, 30, 30, 0.5);
  backdrop-filter: blur(8px);
  left: calc(50% - 49.74vw / 2 + 0.03vw);
  top: calc(50% - 29.74vw / 2 + 0.63vw);
  width: 49.74vw;
  height: 29.74vw;
  border-radius: 1.04vw;
  z-index: 900;
  display: flex;
  justify-content: center;
`;

const DictModalInner = styled.div`
  box-sizing: border-box;
  padding-top: 1.93vw;
  flex: 79.48% 0 0;
  position: relative;
`;

const DictHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const DictWord = styled.div`
  font-family: "Paytone One";
  font-weight: 400;
  font-size: 3.13vw;
  letter-spacing: -0.015em;
  box-sizing: border-box;
  padding-left: 2.08vw;
  position: relative;

  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 1.04vw;
    height: 2.08vw;
    left: 0px;
    top: calc(50% - 0.78vw);
    background: #ff2e00;
    border-radius: 0.16vw;
  }
`;

const DictSentense = styled.div`
  font-family: "Noto Sans KR";
  font-weight: 700;
  font-size: 0.94vw;
  letter-spacing: -0.015em;
`;

const DictBody = styled.div`
  margin-top: 3px;
  width: 39.53vw;
  height: 19.53vw;
  background: #4b4b4b;
  border-radius: 0.78vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 1.77vw 0 1.41vw;
`;

const DictMeanBox = styled.div`
  width: 100%;
`;

const DictMeanHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  font-family: "Noto Sans KR";
  font-weight: 500;
  font-size: 0.94vw;
  line-height: 1.3vw;
  letter-spacing: -0.015em;
  color: #bdbdbd;
  height: 2.81vw;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > div:first-of-type {
    flex: 34.65% 0 0;
  }
  > div:last-of-type {
    flex: 26.61% 0 0;
  }
`;

const DictMeanList = styled.div`
  .dict-mean-item {
    display: flex;
    height: 2.34vw;
    background: #3a3a3c;
    margin-bottom: 0.1vw;

    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      &::before {
        content: "";
        display: block;
        width: 0.1vw;
        height: 1.04vw;
        background: rgba(84, 84, 88, 0.65);
        border-radius: 0.03vw;
        position: absolute;
        right: 0;
        top: 0.65vw;
      }
    }

    .dict-like {
      > div.dict-is-like svg path {
        fill: #ff6442;
      }
      > div.dict-is-dislike svg path {
        fill: #ff6442;
      }
      > div {
        display: flex;
        align-items: center;
        transition: 0.3s;
        svg {
          width: 0.99vw;
          height: 0.89vw;
          cursor: pointer;
        }
        span {
          margin-left: 0.26vw;
          font-weight: 500;
          font-size: 0.94vw;
          letter-spacing: -0.015em;
          color: #bdbdbd;
        }
      }
      > div:last-of-type {
        margin-left: 0.73vw;
        svg {
          transform: rotate(180deg);
          padding-bottom: 0.31vw;
        }
      }
    }

    > div:first-of-type {
      flex: 34.65% 0 0;
      font-size: 0.94vw;
      letter-spacing: -0.015em;
      color: #ffffff;
      font-family: "Noto Sans KR";
    }

    > div:nth-of-type(2) {
      font-family: "Noto Sans KR";
      flex: 26.61% 0 0;
      font-weight: 500;
      font-size: 0.83vw;
      letter-spacing: -0.08px;
      color: #bdbdbd;
    }

    > div:nth-of-type(3) {
      flex: 21.87% 0 0;
    }
    > div:last-of-type {
      flex: 16.87% 0 0;
      &::before {
        width: 0;
      }

      > div {
        width: 1.98vw;
        height: 1.98vw;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: 0.3s;

        &:hover {
          background-color: rgba(0, 0, 0, 0.15);
        }

        svg {
          width: 1.25vw;
          height: 1.25vw;
        }
      }

      .dict-edit {
        margin-right: 0.52vw;
        svg {
          width: 0.99vw;
          height: 0.94vw;
        }
      }
    }
  }

  .dict-mean-add {
    transition: 0.3s;
    > div > input {
      background-color: transparent;
      text-align: center;
      font-size: 0.94vw;
      font-weight: 500;
      letter-spacing: -0.015em;
      color: #bdbdbd;
      border: none;
      appearance: none;
      outline: none;

      &::placeholder {
        font-family: "Noto Sans KR";
        color: #bdbdbd;
      }
    }

    > div:last-of-type {
      > div {
        font-weight: 700;
        font-size: 0.94vw;
        line-height: 1.3vw;
        display: flex;
        justify-content: center;
        align-items: center;
        letter-spacing: -0.015em;
        color: #ffffff;
        width: 5.21vw;
        height: 1.77vw;
        border-radius: 0.89vw;
        transition: 0.3s;
        cursor: pointer;

        &:hover {
          background-color: rgba(0, 0, 0, 0.15);
        }
      }
    }
  }
`;

const DictButtons = styled.div`
  display: flex;
  justify-content: center;
  > div {
    width: 10.16vw;
    height: 2.19vw;
    background: #000000;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.08);
    border-radius: 0.52vw;

    font-family: "Noto Sans KR";
    font-weight: 500;
    font-size: 0.94vw;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: -0.015em;
    color: #ffffff;
    cursor: pointer;

    &:first-of-type {
      margin-right: 2.29vw;
    }
  }

  > p {
    font-family: "Noto Sans KR";
    font-weight: 300;
    font-size: 0.63vw;
    line-height: 0.83vw;
    text-align: center;
    letter-spacing: -0.015em;
  }
`;

export {
  DictModalWrapper,
  DictModalInner,
  DictHeader,
  DictWord,
  DictSentense,
  DictBody,
  DictMeanBox,
  DictMeanHeader,
  DictMeanList,
  DictButtons,
};
