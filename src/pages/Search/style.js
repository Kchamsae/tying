import styled, { css } from "styled-components";

const SearchWrapper = styled.div`
  background-color: #f9f9f9;
`;

const SearchBar = styled.div`
  width: 43.54vw;
  height: 3.44vw;
  margin: 0 auto;
  background: #ffffff;
  border: 0.16vw solid #000000;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 3.28vw;
  position: relative;

  > input {
    height: 3.13vw;
    border: 0;
    appearance: none;
    outline: none;
    padding: 0 0 0 3.8vw;
    background-color: transparent;
    font-size: 1.56vw;
    line-height: 3.13vw;
    font-family: "Noto Sans KR";

    &::placeholder {
      color: #bdbdbd;
    }
  }
`;

const SearchButton = styled.div`
  position: absolute;
  top: calc(50% - 1.72vw);
  right: -0.05vw;
  width: 3.44vw;
  height: 3.44vw;
  border-radius: 50%;
  background-color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  > svg {
    width: 1.36vw;
    height: 1.36vw;
  }
`;

const SearchResult = styled.div`
  width: 59.58vw;
  margin: 3.75vw auto;
  padding-bottom: 2.6vw;
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
  SearchWrapper,
  SearchBar,
  SearchButton,
  SearchResult,
  FilteringResultNone,
  FilteringResultSentence,
};