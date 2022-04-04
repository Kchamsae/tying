import styled, { css } from 'styled-components';

// MyDict
const DictListWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 1.3vw 3.13vw 0;
  > div:last-of-type {
    margin-right: 0;
  }
`;

const BoxDict = styled.div`
  width: 22.81vw;
  height: 21.41vw;
  background: #e2e2e2;
  border-radius: 0.52vw;
  color: black;
  margin-right: 0.89vw;
  padding: 1.04vw 0;
  box-sizing: border-box;
  position: relative;
`;

const DeleteDict = styled.div`
  cursor: pointer;
  width: 1.09vw;
  height: 1.09vw;
  position: absolute;
  z-index: 2;
  top: 0.83vw;
  right: 0.83vw;
  > svg {
    width: 1.09vw;
    height: 1.09vw;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const DictTitle = styled.div`
  flex: 12.9%;
  margin-bottom: 1.09vw;
  display: flex;
  align-items: center;
  padding: 0 2.86vw;

  font-weight: 600;
  font-size: 2.08vw;
  letter-spacing: -0.015em;
  position: relative;

  &::before {
    content: '';
    display: block;
    width: 0.57vw;
    height: 2.14vw;
    background: #ff2e00;
    border-radius: 0.1vw;
    position: absolute;
    left: 1.67vw;
    top: calc(50% - 0.94vw);
  }
`;
const DictMeaning = styled.div`
  flex: 27% 0 0;
  padding: 0 1.67vw;
  height: 5.78vw;

  > div {
    width: 19.48vw;
    height: 2.6vw;
    background: #3a3a3c;
    border-radius: 0.52vw;
    display: flex;
    align-items: center;
    padding-left: 1.56vw;
    box-sizing: border-box;

    font-family: 'Noto Sans KR';
    font-weight: 500;
    font-size: 1.25vw;
    letter-spacing: -0.015em;
    color: #ffffff;
  }

  > div:first-of-type {
    margin-bottom: 0.57vw;
  }
`;
const DictSentence = styled.div`
  display: flex;
  padding: 0.78vw 1.3vw 0 1.56vw;
  justify-content: space-between;
  cursor: pointer;

  > svg {
    width: 0.99vw;
    height: 0.94vw;
    margin-top: 0.26vw;
  }
  > div {
    width: 18.49vw;
    font-weight: 400;
    font-size: 1.04vw;
    line-height: 1.41vw;
    letter-spacing: -0.015em;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
  }
`;

// MyAllDictList
const PrevPage = styled.div`
  font-family: 'Noto Sans KR';
  font-weight: 400;
  font-size: 1.15vw;
  color: #878889;
  margin-left: 3.65vw;
  width: 6.61vw;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;

  > svg {
    transform: rotate(180deg);
    width: 0.57vw;
    height: 0.83vw;
    margin-left: 0.26vw;
  }
`;

const AllDictList = styled.div`
  width: 86.41vw;
  margin: 2.08vw auto;
  position: relative;
  padding-bottom: 2.08vw;

  &:before {
    content: '';
    display: block;
    height: calc(100% - 2.08vw);
    border-right: 0.105vw solid #d2d2d2;
    position: absolute;
    left: calc(11.93% - 0.105vw);
    top: 0;
  }

  &:after {
    content: '';
    display: block;

    height: calc(100% - 2.08vw);
    border-right: 0.105vw solid #d2d2d2;
    position: absolute;
    left: calc(11.93% + 15.61% - 0.1vw);
    top: 0;
  }
`;

const ListHeader = styled.div`
  display: flex;
  height: 2.92vw;
  border-bottom: 0.105vw solid #d2d2d2;
`;
const WordSection = styled.div`
  flex: 11.93% 0 1;
  display: flex;
  padding-left: 1.15vw;
  box-sizing: border-box;

  padding-top: 1.15vw;
  font-weight: 700;
  font-size: 1.04vw;
  letter-spacing: -0.015em;

  ${(props) => {
    if (props.header) {
      return css`
        & {
          padding-top: 0;
          align-items: center;
          font-family: 'Noto Sans KR';
          font-weight: 500;
          font-size: 1.04vw;
          color: #878889;
        }
      `;
    }
  }}

  > div {
    margin-left: 0.26vw;
  }

  > div > div {
    color: #878889;
    font-weight: 300;
    transform: rotate(45deg);
    cursor: pointer;
  }
`;
const MeaningSection = styled(WordSection)`
  flex: 15.61% 0 1;
  font-family: 'Noto Sans KR';
  font-weight: 500;
  font-size: 0.94vw;
  flex-direction: ${(props) => (props.header ? 'row' : 'column')};
`;
const SentenceSection = styled(WordSection)`
  flex: 72.46% 0 1;
  font-weight: 400;
  font-size: 1.04vw;
  line-height: 1.41vw;

  ${(props) =>
    !props.header &&
    'padding-right: 30px; padding-bottom: 22px; display: block;'};
  > div {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    cursor: pointer;
  }
`;

const ListItem = styled(ListHeader)`
  height: 5.16vw;
`;
const ListFooter = styled(ListHeader)`
  height: 2.66vw;
  border: 0;
`;

export {
  DictListWrapper,
  BoxDict,
  DeleteDict,
  DictTitle,
  DictMeaning,
  DictSentence,
  PrevPage,
  AllDictList,
  ListHeader,
  WordSection,
  MeaningSection,
  SentenceSection,
  ListItem,
  ListFooter,
};
