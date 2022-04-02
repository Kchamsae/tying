import styled, { css } from "styled-components";

const FilteringWrapper = styled.div`
  width: 92.45vw;
  height: 38.8vw;
  margin: 1.35vw auto 0;
  display: flex;
  justify-content: space-between;
`;

const FilteringLeft = styled.div`
  flex: 33.1% 0 0;
  background-color: #f0f0f0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.13);
  border-radius: 2.4vw;
  position: relative;
`;

const FilteringTitle = styled.div`
  position: absolute;
  top: -1.38vw;
  left: calc(50% - 12.24vw);
  width: 24.48vw;
  height: 2.76vw;
  background: #000000;
  box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.1);
  border-radius: 1.56vw;
  color: #ffffff;
  display: flex;
  align-items: center;

  > h2 {
    margin: 0 0 0.26vw 0;
    flex: 43.8% 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: max-content;
    font-family: "Paytone One";
    font-size: 1.56vw;
    font-weight: 400;
    letter-spacing: -0.015em;
    position: relative;

    &:before {
      content: "";
      display: block;
      height: 1.04vw;
      border-right: 0.05vw solid #f1f1f1;
      position: absolute;
      right: 0;
      top: calc(50% - 0.31vw);
    }
  }
  > p {
    padding-left: 0.52vw;
    box-sizing: border-box;
    flex: 56.2% 0 0;
    width: max-content;
    font-family: "Noto Sans KR";
    font-weight: 500;
    font-size: 0.83vw;
    letter-spacing: -0.015em;
    color: #f1f1f1;
  }
`;

const FilteringLeftInner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.49vw 2.71vw 0;
  box-sizing: border-box;
  ul {
    list-style: none;
    margin: 0.31vw 0 0 0;
    padding: 0;
    li {
      font-weight: 500;
      font-size: 0.94vw;
      line-height: 1.3vw;
      letter-spacing: -0.015em;
      color: #878889;
      padding: 0.29vw 0;
      &.filter-checked span {
        color: #ff2e00;
      }
      > span {
        cursor: pointer;
      }
    }
  }
`;

const FilteringBox = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 0.99vw;
  flex-direction: column;
  ${(props) => props.last && "margin-top: 1.88vw"};
  &:first-of-type {
    position: relative;
    flex-direction: row;
    > div {
      width: 50%;
      > div {
        padding-left: 0.16vw;
        font-weight: 700;
        font-size: 1.04vw;
        letter-spacing: -0.015em;
        color: #242424;
      }
    }
    &:before {
      content: "";
      display: block;
      width: 25.42vw;
      height: 0.1vw;
      background-color: #c4c4c4;
      border-radius: 0.05vw;
      position: absolute;
      bottom: -0.36vw;
      left: calc(50% - 12.71vw);
    }
  }

  &:nth-of-type(3) {
    position: relative;
    > div {
      width: 100%;
    }
    > ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      > li {
        width: 50%;
      }
    }
    &:before {
      content: "";
      display: block;
      width: 25.42vw;
      height: 0.105vw;
      border-radius: 0.05vw;
      background-color: #c4c4c4;
      position: absolute;
      top: -0.73vw;
      left: calc(50% - 12.71vw);
    }
  }
  &:last-of-type {
    margin-top: 1.88vw;
  }
`;

const SavedCheck = styled.div`
  display: flex;
  align-items: center;
  font-family: "Noto Sans KR";
  font-weight: 600;
  font-size: 1.04vw;
  line-height: 1.41vw;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #878889;
`;

const CheckBox = styled.div`
  width: 1.98vw;
  height: 1.98vw;
  background: #d2d2d2;
  border-radius: 0.26vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.63vw;
  cursor: pointer;
  > svg {
    width: 1.15vw;
    height: 0.83vw;
  }
  > svg path {
    transition: 0.3s;
    stroke: ${(props) => (props.on ? "#000" : "#fff")};
  }
`;

const FilteringBoxTitle = styled.div`
  padding-left: 0.16vw;
  font-weight: 700;
  font-size: 1.04vw;
  letter-spacing: -0.015em;
  color: #242424;
`;

const FilteringCompleteButton = styled.div`
  font-weight: 600;
  font-size: 1.04vw;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.015em;
  color: #878889;

  width: 5.47vw;
  height: 2.45vw;
  border: 0.105vw solid #878889;
  border-radius: 3.28vw;
  position: absolute;
  bottom: 1.82vw;
  right: 1.82vw;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    border-color: #ff2e00;
    color: #ff2e00;
  }
`;

const FilteringResetButton = styled.div`
  font-weight: 600;
  font-size: 1.04vw;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.015em;
  color: #fff;

  width: 5.47vw;
  height: 2.45vw;
  background-color: #636366;
  border-radius: 3.28vw;
  position: absolute;
  bottom: 1.82vw;
  right: 1.82vw;
  cursor: pointer;
  transition: 0.3s;

  > svg {
    width: 0.83vw;
    height: 0.99vw;
  }

  &:hover {
    background-color: #000;
  }
`;

const FilteringRight = styled.div`
  width: 60.31vw;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0.31vw;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #000;
    border-radius: 0.16vw;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const FilteringResultNone = styled.div`
  width: max-content;
  margin: 1.04vw auto;
  font-family: "Noto Sans KR";
  font-size: 1.04vw;
  font-weight: 600;
`;

const FilteringResultSentence = styled.div`
  width: max-content;
  margin: 0 auto;
  font-family: "Noto Sans KR";
  font-size: 0.73vw;
  font-weight: 300;
`;

export {
  FilteringWrapper,
  FilteringLeft,
  FilteringTitle,
  FilteringLeftInner,
  FilteringBox,
  FilteringBoxTitle,
  SavedCheck,
  CheckBox,
  FilteringCompleteButton,
  FilteringResetButton,
  FilteringRight,
  FilteringResultNone,
  FilteringResultSentence,
};
