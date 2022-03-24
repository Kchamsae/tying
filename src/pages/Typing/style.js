import styled, { css, keyframes } from "styled-components";

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
  padding-top: 80px;
  position: relative;
  width: 100%;
`;

const SectionSide = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  
  width: 348px;
  height: 585px;
  background: #E9E9E9;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  padding-top: 70px;
  transition: 0.5s;

  position: absolute;
  ${props => props.side === 'left' && (props.on ? `left: 0;` : `left: -313px;`)}
  ${props => props.side === 'right' && (props.on ? `right: 0;` : `right: -313px;`)}
  top: 72px;
  z-index: 5;

  >i{
    width: 13px;
    height: 21px;
    transform: ${props => props.side === 'left' ? (props.on ? 'rotate(0deg)' : 'rotate(180deg)') : (props.on ? 'rotate(180deg)' : 'rotate(0deg)')};
    position: absolute;
    top: calc(50% - 10.5px);
    ${props => props.side === 'left' && `right: 10px;`}
    ${props => props.side === 'right' && `left: 10px;`}
    cursor: pointer;
    transition: 0.5s;
  }
`;

const CategoryWrapper = styled.div`
  margin: -1.25vw 0 0 0.26vw;
  letter-spacing: -0.015em;
  position: relative;
  `;

const Category = styled.h2`
  font-family: "Paytone One";
  text-align: center;
  margin: 0;
  font-size: 72px;
  font-weight: 400;
`;

const SmallCategory = styled.h3`
  width: max-content;
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  letter-spacing: -0.015em;
  color: #878889;
  margin: 3px auto 0;
  position: relative;

  &::before{
    content: '';
    display: block;
    width: 110%;
    position: absolute;
    top: -2px;
    left: -5%;
    height: 2px;
    border-radius: 1px;
    background-color: #BDBDBD;
  }
`;

const SelectCategory = styled.div`
  width: 13.96vw;
  height: 16.3vw;
  margin: 27px auto 0;
  position: relative;
`;

const SelectHeader = styled.div`
  width: 13.91vw;
  height: 1.72vw;
  background: #fff;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Roboto";
  padding: 0 0.68vw 0 0.68vw;
  box-sizing: border-box;

  font-family: "Noto Sans KR";
  font-weight: 600;
  font-size: 0.83vw;
  line-height: 1.04vw;
  letter-spacing: 0.01vw;

  cursor: pointer;

  i {
    transform: ${props => props.on ? 'rotate(0deg)' : 'rotate(180deg)'};
    transition: 0.3s;
  }
`

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
  border-radius: 4px;
  display: block;

  animation: 300ms ease 0ms 1 normal forwards running ${props => props.off ? opacityOut : opacityIn};

  li {
    width: 100%;
    height: 1.72vw;
    border-bottom: 1px solid rgba(33, 33, 33, 0.08);
    padding-left: 0.31vw;
    box-sizing: border-box;

    font-family: "Roboto";
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
  padding-left: 25px;
  margin: -5px 0 0 37px;
  font-size: 40px;
  letter-spacing: -0.015em;
  width: max-content;
  position: relative;
  >span{
    font-family: 'Noto Sans KR';
    font-weight: 600;
    font-size: 16px;
    letter-spacing: -0.015em;
    color: #878889;
    margin-left: 23px;
    vertical-align: 5px;
  }
  &::before{
    content: '';
    display: block;
    width: 14px;
    height: 34px;
    position: absolute;
    left: 0;
    top: calc(50% - 14px);
    background: #FF2E00;
    border-radius: 3px 0px 0px 3px;
  }
  &::after{
    content: '';
    display: block;
    height: 20px;
    position: absolute;
    right: 38px;
    top: calc(50% - 5px);
    border: 1px solid #BDBDBD;
  }
`;

const Translate = styled.div`
  width: 315px;
  height: 374px;
  padding: 5px 22px 0 26px;
  box-sizing: border-box;
  background: #FFFFFF;
  opacity: 0.7;
  border-radius: 12px 0px 0px 12px;
  margin: 29px 0 0 37px;

  >div:first-of-type{
    display: flex;
    align-items: center;
    width: 258px;
    height: 50px;
    /* margin: 0 auto; */
    border-bottom: 1px solid #D2D2D2;
      >span{
        font-family: 'Noto Sans KR';
        font-weight: 700;
        font-size: 16px;
        letter-spacing: -0.015em;
        color: #060606;
        position: relative;

        &::before{
          content: '';
          display: block;
          width: 100%;
          border-bottom: 2px solid #FF2E00;
          position: absolute;
          bottom: -2px;
          left: 0;
        }
      }
  }
  >div:last-of-type{
    height: 280px;
    margin-top: 10px;
    font-family: 'Noto Sans KR';
    font-style: normal; 
    font-weight: 400;
    font-size: 15px;
    line-height: 25px;
    letter-spacing: -0.015em;
    overflow: auto;
    padding-right: 6px;
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
`

const SectionCenter = styled.div`
  width: 1161px;
  margin: 0 auto;
  position: relative;
`;

const TitleProgress = styled.div`
  margin-bottom: 2.5vw;
`;

const Title = styled.hgroup`
  width: 100%;
  margin-bottom: 0.94vw;
  padding: 0 26px;
  box-sizing: border-box;
  position: relative;
  h3{
    font-weight: 500;
    font-size: 25px;
    letter-spacing: -0.015em;
    color: #BDBDBD;
    margin: 0 0 7px 0;
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
  height: 5px;
  background: #f4f4f4;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 1px;
  box-sizing: border-box;

  >div {
    height: 5px;
    border-radius: 1px;
    background-color: #ff6442;
    transition: 0.3s;
  }
`;

const ProgressNum = styled.div`
  font-family: "Montserrat";
  font-weight: 500;
  font-size: 16px;
  line-height: 1.25vw;
  letter-spacing: -0.015em;
  width: 100%;
  margin-top: 5px;
  text-align: right;
  color: #959595;
`
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
    ime-mode: disabled;
  }
`;

const Source = styled.div`
    font-family: 'Noto Sans KR';
    text-align: right;
    font-weight: 400;
    font-size: 0.78vw;
    letter-spacing: -0.015em;
    color: rgba(135, 136, 137, 0.55);
    >a{
      font-family: noto-sans;
      font-weight: 400;
      font-size: 0.78vw;
      letter-spacing: -0.015em;
      color: rgba(135, 136, 137, 0.55);
      text-decoration: none;
    }
`

const StateBox = styled.div`
  width: 119px;
  height: 240px;
  position: absolute;
  top: 286px;
  left: -157px;
  z-index: 0;
`
const Toggle = styled.button`
  position: absolute;
  top: 6px;
  right: 5px;
  border: none;
  padding: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props => props.on ? '#3a3a3c' : '#ff2e00'};
  cursor: pointer;
  z-index: 1;
  transition: 0.3s;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: calc(50% - 1px);
    left: calc(50% - 5px);
    width: 10px;
    height: 2px;
    border-radius: 1px;
    background-color: #fff;
  }

  ${props => {
    if(!props.on){
      return css`
        &::after {
        content: "";
        display: block;
        position: absolute;
        left: calc(50% - 1px);
        top: calc(50% - 5px);
        width: 2px;
        height: 10px;
        border-radius: 1px;
        background-color: #fff;
      }
      `
    }
  }}
`

const State = styled.div`
  width: 119px;
  height: 240px;
  background: #ffffff;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  display: flex;
  flex-direction: column;

  animation: 300ms ease 0ms 1 normal forwards running ${props => props.on ? opacityIn : opacityOut};
`

const StateItem = styled.div`
  position: relative;
  flex: 1 0 0;
  font-family: "Digital Numbers";
  font-size: 19px;
  line-height: 23px;
  letter-spacing: -0.015em;
  border-bottom: 1px solid #d2d2d2;
  padding-top: 14px;
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
    top: 6px;
    left: 8px;
    width: max-content;
    font-family: noto-sans;
    font-weight: 700;
    font-size: 14px;
    line-height: 19px;
    color: #272727;
    margin-bottom: 7px;

    &::before {
      content: "";
      width: 100%;
      height: 1px;
      border-radius: 0.5px;
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

export {
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
}