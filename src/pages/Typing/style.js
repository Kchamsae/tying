import styled, { css, keyframes } from 'styled-components';

const opacityIn = keyframes`
  0%{
      opacity: 0;
  }
  100%{
      opacity: 1;
  }
`;
const opacityOut = keyframes`
  0%{
      opacity: 1;
  }
  100%{
      opacity: 0;
  }
`;

const TypingWrap = styled.div`
  overflow: hidden;
  padding-top: 4.17vw;
  position: relative;
  width: 100%;
`;

const SectionSide = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  width: 18.13vw;
  height: 30.47vw;
  background: #e9e9e9;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.08);
  border-radius: 0.26vw;
  padding-top: 3.65vw;
  transition: 0.5s;

  position: absolute;
  ${(props) =>
    props.side === 'left' && (props.on ? `left: 0;` : `left: -16.3vw;`)}
  ${(props) =>
    props.side === 'right' && (props.on ? `right: 0;` : `right: -16.3vw;`)}
  top: 3.75vw;
  z-index: 5;

  > i {
    width: 0.68vw;
    height: 1.09vw;
    transform: ${(props) =>
      props.side === 'left'
        ? props.on
          ? 'rotate(0deg)'
          : 'rotate(180deg)'
        : props.on
        ? 'rotate(180deg)'
        : 'rotate(0deg)'};
    position: absolute;
    top: calc(50% - 0.55vw);
    ${(props) => props.side === 'left' && `right: 0.52vw;`}
    ${(props) => props.side === 'right' && `left: 0.52vw;`}
    cursor: pointer;
    transition: 0.5s;
    >svg{
      width: 100%;
      height: 100%;
    }
  }
`;

const CategoryWrapper = styled.div`
  margin: -1.25vw 0 0 0.26vw;
  letter-spacing: -0.015em;
  position: relative;
`;

const Category = styled.h2`
  font-family: 'Paytone One';
  text-align: center;
  margin: 0;
  font-size: 3.75vw;
  font-weight: 400;
`;

const SmallCategory = styled.h3`
  width: max-content;
  font-weight: 700;
  font-size: 1.04vw;
  text-align: center;
  letter-spacing: -0.015em;
  color: #878889;
  margin: 0.16vw auto 0;
  position: relative;

  &::before {
    content: '';
    display: block;
    width: 110%;
    position: absolute;
    top: -2px;
    left: -5%;
    height: 0.105vw;
    border-radius: 0.05vw;
    background-color: #bdbdbd;
  }
`;

const SelectCategory = styled.div`
  width: 13.96vw;
  height: 16.3vw;
  margin: 1.41vw auto 0;
  position: relative;
`;

const SelectHeader = styled.div`
  width: 13.91vw;
  height: 1.72vw;
  background: #fff;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.08);
  border-radius: 0.26vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Roboto';
  padding: 0 0.68vw 0 0.68vw;
  box-sizing: border-box;

  font-family: 'Noto Sans KR';
  font-weight: 600;
  font-size: 0.83vw;
  line-height: 1.04vw;
  letter-spacing: 0.01vw;

  cursor: pointer;

  i {
    transform: ${(props) => (props.on ? 'rotate(0deg)' : 'rotate(180deg)')};
    transition: 0.3s;
  }
`;

const SelectList = styled.ul`
  position: absolute;
  left: 0;
  z-index: 2;
  bottom: 0;
  padding: 0;
  margin: 0;
  list-style: none;
  width: 13.91vw;
  height: 14.17vw;
  background: #fff;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.08);
  border-radius: 0.21vw;
  display: block;

  animation: 300ms ease 0ms 1 normal forwards running
    ${(props) => (props.off ? opacityOut : opacityIn)};

  li {
    width: 100%;
    height: 1.72vw;
    border-bottom: 1px solid rgba(33, 33, 33, 0.08);
    padding-left: 0.31vw;
    box-sizing: border-box;

    font-family: 'Roboto';
    font-weight: 400;
    font-size: 0.83vw;
    line-height: 1.04vw;
    color: #878889;

    display: flex;
    align-items: center;

    cursor: pointer;
    transition: 0.3s;

    &:hover {
      color: #ff2e00;
    }
  }
`;
const TranslateHeader = styled.div`
  font-family: 'Paytone One';
  padding-left: 1.3vw;
  margin: -0.26vw 0 0 1.93vw;
  font-size: 2.08vw;
  letter-spacing: -0.015em;
  width: max-content;
  position: relative;
  > span {
    font-family: 'Noto Sans KR';
    font-weight: 600;
    font-size: 0.83vw;
    letter-spacing: -0.015em;
    color: #878889;
    margin-left: 1.2vw;
    vertical-align: 0.26vw;
  }
  &::before {
    content: '';
    display: block;
    width: 0.73vw;
    height: 1.77vw;
    position: absolute;
    left: 0;
    top: calc(50% - 0.73vw);
    background: #ff2e00;
    border-radius: 0.16vw 0px 0px 0.16vw;
  }
  &::after {
    content: '';
    display: block;
    height: 1.04vw;
    position: absolute;
    right: 1.98vw;
    top: calc(50% - 0.26vw);
    border: 0.05vw solid #bdbdbd;
  }
`;

const Translate = styled.div`
  width: 16.41vw;
  height: 19.48vw;
  padding: 0.26vw 1.15vw 0 1.35vw;
  box-sizing: border-box;
  background: #ffffff;
  opacity: 0.7;
  border-radius: 0.63vw 0px 0px 0.63vw;
  margin: 1.51vw 0 0 1.93vw;

  > div:first-of-type {
    display: flex;
    align-items: center;
    width: 13.44vw;
    height: 2.6vw;
    /* margin: 0 auto; */
    border-bottom: 0.05vw solid #d2d2d2;
    > span {
      font-family: 'Noto Sans KR';
      font-weight: 700;
      font-size: 0.83vw;
      letter-spacing: -0.015em;
      color: #060606;
      position: relative;

      &::before {
        content: '';
        display: block;
        width: 100%;
        border-bottom: 0.105vw solid #ff2e00;
        position: absolute;
        bottom: -0.105vw;
        left: 0;
      }
    }
  }
  > div:last-of-type {
    height: 14.58vw;
    margin-top: 0.52vw;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 0.78vw;
    line-height: 1.3vw;
    letter-spacing: -0.015em;
    overflow: auto;
    padding-right: 0.31vw;
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #000;
      border-radius: 3px;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
  }
`;

const SectionCenter = styled.div`
  width: 60.47vw;
  margin: 0 auto;
  position: relative;
`;

const TitleProgress = styled.div`
  margin-bottom: 2.5vw;
`;

const Title = styled.hgroup`
  width: 100%;
  margin-bottom: 0.94vw;
  padding: 0 1.35vw;
  box-sizing: border-box;
  position: relative;
  h3 {
    font-weight: 500;
    font-size: 1.3vw;
    letter-spacing: -0.015em;
    color: #bdbdbd;
    margin: 0 0 0.36vw 0;
  }
  h4 {
    font-weight: 500;
    font-size: 1.3vw;
    line-height: 1.77vw;
    letter-spacing: -0.015em;
    margin: 0;
    height: 3.54vw;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.26vw;
  background: #f4f4f4;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 0.05vw;
  box-sizing: border-box;

  > div {
    height: 0.26vw;
    border-radius: 0.05vw;
    background-color: #ff6442;
    transition: 0.3s;
  }
`;

const ProgressNum = styled.div`
  font-family: 'Montserrat';
  font-weight: 500;
  font-size: 0.83vw;
  line-height: 1.25vw;
  letter-spacing: -0.015em;
  width: 100%;
  margin-top: 0.26vw;
  text-align: right;
  color: #959595;
`;
const TypingBox = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 0.83vw;

  textarea {
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: 0;
    resize: none;
    z-index: -999;
    opacity: 0;
    border: none;
    outline: none;
    background: none;
  }
`;

const Source = styled.div`
  font-family: 'Noto Sans KR';
  text-align: right;
  font-weight: 400;
  font-size: 0.78vw;
  letter-spacing: -0.015em;
  color: rgba(135, 136, 137, 0.55);
  > a {
    font-family: noto-sans;
    font-weight: 400;
    font-size: 0.78vw;
    letter-spacing: -0.015em;
    color: rgba(135, 136, 137, 0.55);
    text-decoration: none;
  }
`;

const StateBox = styled.div`
  width: 6.2vw;
  height: 12.5vw;
  position: absolute;
  top: 14.9vw;
  left: -8.18vw;
  z-index: 0;
`;
const Toggle = styled.button`
  position: absolute;
  top: 0.31vw;
  right: 0.26vw;
  border: none;
  padding: 0;
  width: 0.83vw;
  height: 0.83vw;
  border-radius: 50%;
  background-color: ${(props) => (props.on ? '#3a3a3c' : '#ff2e00')};
  cursor: pointer;
  z-index: 1;
  transition: 0.3s;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: calc(50% - 0.05vw);
    left: calc(50% - 0.26vw);
    width: 0.52vw;
    height: 0.105vw;
    border-radius: 0.05vw;
    background-color: #fff;
  }

  ${(props) => {
    if (!props.on) {
      return css`
        &::after {
          content: '';
          display: block;
          position: absolute;
          left: calc(50% - 0.05vw);
          top: calc(50% - 0.26vw);
          width: 0.105vw;
          height: 0.52vw;
          border-radius: 0.05vw;
          background-color: #fff;
        }
      `;
    }
  }}
`;

const State = styled.div`
  width: 6.2vw;
  height: 12.5vw;
  background: #ffffff;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.08);
  border-radius: 0.26vw;
  display: flex;
  flex-direction: column;

  animation: 300ms ease 0ms 1 normal forwards running
    ${(props) => (props.on ? opacityIn : opacityOut)};
`;

const StateItem = styled.div`
  position: relative;
  flex: 1 0 0;
  font-family: 'Digital Numbers';
  font-size: 0.99vw;
  line-height: 1.2vw;
  letter-spacing: -0.015em;
  border-bottom: 0.05vw solid #d2d2d2;
  padding-top: 0.73vw;
  box-sizing: border-box;
  text-align: right;
  display: flex;
  justify-content: center;
  align-items: center;

  &:last-of-type {
    border: 0;
  }

  > div {
    position: absolute;
    top: 0.31vw;
    left: 0.42vw;
    width: max-content;
    font-family: noto-sans;
    font-weight: 700;
    font-size: 0.73vw;
    line-height: 0.99vw;
    color: #272727;
    margin-bottom: 0.36vw;

    &::before {
      content: '';
      width: 100%;
      height: 0.05vw;
      border-radius: 0.025vw;
      background-color: #ff2e00;
      position: absolute;
      bottom: -1px;
      left: 0;
    }
  }
`;

const ModalBg = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.53);
  z-index: 100;
`;

const TitleMore = styled.div`
  position: absolute;
  right: 0;
  bottom: 0.42vw;

  > span {
    display: block;
    width: 0.83vw;
    height: 0.83vw;
    border-radius: 50%;
    background-color: #ff2e00;
    position: relative;
    transition: 0.3s;
    cursor: pointer;

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: calc(50% - 0.05vw);
      left: calc(50% - 0.26vw);
      width: 0.52vw;
      height: 0.1vw;
      border-radius: 0.05vw;
      background-color: #fff;
    }
    &::after {
      content: '';
      display: block;
      position: absolute;
      left: calc(50% - 0.05vw);
      top: calc(50% - 0.26vw);
      width: 0.105vw;
      height: 0.52vw;
      border-radius: 0.05vw;
      background-color: #fff;
    }
  }

  > div {
    display: none;
    right: 2.08vw;
    bottom: 0;
    transform: translateY(35%);
    position: absolute;
    z-index: 10;
    width: 58.49vw;
    padding: 1.35vw 1.82vw;
    box-sizing: border-box;
    background: #dedede;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.08);
    border-radius: 0.63vw;

    font-weight: 500;
    font-size: 1.3vw;
    line-height: 1.98vw;
    letter-spacing: -0.017em;
    color: #616161;

    > svg {
      position: absolute;
      right: -1.04vw;
      top: calc(50% - 1.04vw);
      width: 1.25vw;
      height: 2.08vw;
    }
  }
  > span:hover + div {
    display: block;
  }
`;

const FinishBtn = styled.div`
  position: fixed;
  width: 2.92vw;
  height: 2.92vw;
  right: 11.93vw;
  bottom: 4.22vw;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.08);
  border-radius: 2.6vw;
  cursor: pointer;
  transition: 0.3s;
  animation: 300ms ease 0ms 1 normal forwards running ${opacityIn};

  svg {
    width: 1.25vw;
    height: 1.25vw;
  }

  &:hover {
    background-color: #f0f0f0;
  }

  >div{
    width: 7.5vw;
    border-radius: 0.21vw;
    height: 2.6vw;
    background: #DEDEDE;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);

    position: absolute;
    left: calc(50% - 3.75vw);
    top: -3.91vw;
    z-index: 10;
    
    font-family: 'Noto Sans KR';
    font-weight: 500;
    font-size: 0.63vw;
    line-height: 0.83vw;
    display: ${props => props.on ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    letter-spacing: -0.015em;
    white-space: nowrap;
    animation: 300ms ease 0ms 1 normal forwards running ${props => props.onAni ? opacityIn : opacityOut};

    color: #000000;

    >span{
      width: 0px;
      height: 0px;
      border-bottom: calc( 11px * 1.732 ) solid #DEDEDE;
      border-left: 0.57vw solid transparent;
      border-right: 0.57vw solid transparent;
      /* box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.08); */
      position: absolute;
      bottom: calc( -0.57vw * 1.732 );
      transform: rotate(180deg);

    }
  }
`;

const HelpBtn = styled(FinishBtn)`
  left: unset;
  right: 8.18vw;
  svg {
    margin: 0.105vw 0 0 0.16vw;
    width: 0.89vw;
    height: 1.25vw;
  }
`;

export {
  opacityIn,
  TypingWrap,
  SectionSide,
  CategoryWrapper,
  Category,
  SmallCategory,
  SelectCategory,
  SelectHeader,
  SelectList,
  TranslateHeader,
  Translate,
  SectionCenter,
  TitleProgress,
  Title,
  ProgressBar,
  ProgressNum,
  TypingBox,
  Source,
  StateBox,
  Toggle,
  State,
  StateItem,
  ModalBg,
  TitleMore,
  FinishBtn,
  HelpBtn,
};
