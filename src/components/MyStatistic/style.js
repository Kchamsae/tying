import styled, { css } from 'styled-components';

const WeeklyCalendar = styled.div`
  width: 29.48vw;
  height: 5.99vw;
  margin-top: 0.52vw;
`;

const WeeklyStatics = styled.div`
  width: 29.06vw;
  height: 11.09vw;
`;

const WeeklyNumber = styled.p`
  font-family: 'Montserrat';
  font-size: 4.17vw;
  font-weight: 500;
  margin: 0px;
`;

const WeeklyBox = styled.div`
  display: flex;
  width: 10.57vw;
  height: 1.93vw;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
`;

const WeeklyTyping = styled.p`
  font-family: 'Noto Sans KR';
  font-size: 0.83vw;
  font-weight: 500;
  margin: 0 0 0.78vw 0.52vw;
  color: #bdbdbd;
  width: max-content;
  align-self: flex-end;
`;

const WeeklyButton = styled.p`
  font-family: 'Noto Sans KR';
  font-size: 1.15vw;
  font-weight: 500;
  margin: 0px;
  color: #878889;
`;

const RenderHeaderTop = styled.div`
  display: flex;
  font-size: 1.56vw;
  font-weight: 600;
`;

const RenderHeaderBox = styled.div`
  display: flex;
  width: 29.22vw;
  height: 6.09vw;
  background-color: white;
  font-size: 1.56vw;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  margin: 1.04vw 0px 1.04vw 0px;
  box-shadow: 0.26vw 0.26vw 0.26vw #bdbdbd;
`;

const CompleteBtn = styled.div`
  color: #ff2e00;
  margin-left: 1.04vw;
  cursor: pointer;
`;

const PrevBtn = styled.div`
  margin-left: 1.04vw;
  cursor: pointer;
`;

const NextBtn = styled.div`
  margin-left: 1.04vw;
  cursor: pointer;
`;

const DownBtn = styled.div`
  margin-left: 1.04vw;
  cursor: pointer;
`;

const ChartBox = styled.div`
  margin-left: 5.21vw;
`;

const WeeklyBoxSvg = styled.svg`
  width: 0.63vw;
  height: 1.02vw;
  margin: 0.26vw 0 0 0.52vw;
`;

const DownBtnSvg = styled.svg`
  width: 1.35vw;
  height: 0.83vw;
`;

const PrevBtnSvg = styled.svg`
  width: 0.89vw;
  height: 1.04vw;
`;

const NextBtnSvg = styled.svg`
  width: 0.89vw;
  height: 1.04vw;
`;

const RenderDataTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RenderDataMiddle = styled.div`
  display: flex;
  width: 70%;
`;

/* 해야함 */
const DaySelected = styled.div`
  font-weight: 700;
  color: #000;
`;

const RenderDaysTop = styled.div`
  text-transform: uppercase;
  font-weight: 400;
  color: #878889;
  padding: 0.63vw 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const RenderDaysMiddle = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  max-width: 100%;

  justify-content: center;
  text-align: center;

  font-family: 'Noto Sans KR';
  font-weight: 400;
  font-size: 1.56vw;
  letter-spacing: -0.015em;

  color: #878889;

  transition: 0.25s ease-out;
`;

const RenderCellsRow = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const RenderCellsBodyMain = styled.div`
  flex-grow: 0;
  flex-basis: calc(100% / 7);
  width: calc(100% / 7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RenderCellsBodySub = styled.div`
  position: relative;
  height: 2.5vw;
  color: #878889;
  overflow: hidden;
  cursor: pointer;
  transition: 0.25s ease-out;

  font-size: 1.56vw;
  font-weight: 400;
`;

const ReturnTop = styled.div`
  display: flex;
  margin-left: 4.01vw;
`;

const ReturnLeft = styled.div`
  width: 50%;
`;

const ReturnCalendar = styled.div`
  display: block;
  position: relative;
  width: 100%;
`;

const ReturnBar = styled.div`
  width: 29.43vw;
  border-bottom: 0.26vw solid #d2d2d2;
  margin: 1.04vw 0px;
`;

const ReturnRight = styled.div`
  width: 100%
  height: 100%
  margin-left: 2.6vw
`;

const ChartContainer = styled.div`
  width: 90vw;
  max-width: 46.88vw;
`;

const RenderDataBar = styled.div`
  width: 29.43vw;
  border-bottom: 2px solid #d2d2d2;
  margin: 1.04vw 0px;
`;

export {
  WeeklyCalendar,
  WeeklyStatics,
  WeeklyNumber,
  WeeklyBox,
  WeeklyTyping,
  WeeklyButton,
  RenderHeaderTop,
  RenderHeaderBox,
  CompleteBtn,
  PrevBtn,
  NextBtn,
  DownBtn,
  ChartBox,
  WeeklyBoxSvg,
  DownBtnSvg,
  PrevBtnSvg,
  NextBtnSvg,
  RenderDataTop,
  RenderDataMiddle,
  DaySelected,
  RenderDaysTop,
  RenderDaysMiddle,
  RenderCellsRow,
  RenderCellsBodyMain,
  RenderCellsBodySub,
  ReturnTop,
  ReturnLeft,
  ReturnCalendar,
  ReturnBar,
  ReturnRight,
  ChartContainer,
  RenderDataBar,
};
