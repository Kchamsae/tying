import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as recordActions } from '../../redux/modules/record';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import dayjs from 'dayjs';

import {
  ChartBox,
  ChartContainer,
  CompleteBtn,
  DownBtn,
  DownBtnSvg,
  NextBtn,
  NextBtnSvg,
  PrevBtn,
  PrevBtnSvg,
  RenderCellsMiddle,
  RenderCellsRow,
  RenderDataBar,
  RenderDataTop,
  RenderDataMiddle,
  RenderDaysTop,
  RenderDaysMiddle,
  RenderHeaderTop,
  RenderHeaderBox,
  ReturnBar,
  ReturnTop,
  ReturnLeft,
  ReturnRight,
  WeeklyBox,
  WeeklyBoxSvg,
  WeeklyButton,
  WeeklyCalendar,
  WeeklyNumber,
  WeeklyStatics,
  WeeklyTyping,
} from './style';

var isoWeek = require('dayjs/plugin/isoWeek');
dayjs.extend(isoWeek);

const Calendar = () => {
  const dispatch = useDispatch();

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [currentWeek, setCurrentWeek] = useState(
    dayjs(currentMonth).isoWeek() + 1
  );
  const [selectedDate, setSelectedDate] = useState(null);

  const [isShow, setIsShow] = useState(false);

  const [date, setDate] = useState(null);

  const [tab, setTab] = useState('');

  const dateStart = dayjs(currentMonth).isoWeekday(1).$d; // startOfWeek 수정 27 일 00 : 00 : 00
  const _dateStart = new Date(
    dateStart.getTime() -
      dateStart.getTimezoneOffset() * 60000 +
      parseInt(86400000)
  ).toISOString();

  const dateEnd = dayjs(currentMonth).isoWeekday(7).$d; // 수정 4월 2일 00 : 00 : 00
  const _dateEnd = new Date(
    dateEnd.getTime() - dateEnd.getTimezoneOffset() * 60000 + parseInt(86400000)
  ).toISOString();

  const aTest = new Date(
    dateStart.getTime() -
      dateStart.getTimezoneOffset() * 60000 +
      parseInt(86400000)
  );

  //

  const todayTest = aTest;

  // const baseDate = startOfWeek(todayTest, { weekStartsOn: 0 });
  const baseDate = dayjs(todayTest).isoWeekday(1).$d;
  const baseMonth = baseDate.getMonth() + 1;
  const baseDays = baseDate.getDate() + 1;

  const weekOfMonth = Math.ceil(baseDays / 7);

  const tabHandler = (e) => {
    const activeTab = e.target.id;
    setTab(activeTab);
  };

  const showDetailsHandle = (dayStr) => {
    setDate(dayStr);
  };

  const [chartTab, setChartTab] = useState('');
  const chartHandler = (e) => {
    console.log(e);
    const activeChartTab = e.target.id;
    setChartTab(activeChartTab);
  };

  useEffect(() => {
    dispatch(recordActions.recordLoadAllDB(_dateStart, _dateEnd));
  }, []);

  const recordLoad = useSelector((state) => state.record.record_list2);

  const _selectedDate =
    selectedDate !== null
      ? new Date(
          selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
        )
          .toISOString()
          .split('T')
      : '';

  function findIdx(el) {
    if (selectedDate !== null) {
      if (el._id === _selectedDate[0].toString()) return true;
    }
  }

  let _idx = recordLoad.findIndex(findIdx);

  const confirmHandler = () => {
    dispatch(recordActions.recordLoadAllDB(_dateStart, _dateEnd));
    setIsShow(false);
  };

  const renderHeader = () => {
    const dateFormat = 'YYYY';
    return (
      <div>
        <RenderHeaderTop>
          {dayjs(currentMonth).format(dateFormat) +
            '년' +
            ' ' +
            `${baseMonth}월 ${weekOfMonth}주차`}
          <DownBtn
            onClick={() => {
              setIsShow(!isShow);
            }}
          >
            <DownBtnSvg
              width='26'
              height='16'
              viewBox='0 0 26 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2 2L13 13L24 2'
                stroke='black'
                strokeWidth='3'
                strokeLinecap='round'
              />
            </DownBtnSvg>
          </DownBtn>
        </RenderHeaderTop>

        {isShow && (
          <RenderHeaderBox>
            <div>
              <div>
                {dayjs(currentMonth).format(dateFormat) +
                  '년' +
                  ' ' +
                  `${baseMonth}월 ${weekOfMonth}주차`}
              </div>
            </div>
            <div>
              <PrevBtn onClick={() => changeWeekHandle('prev')}>
                <PrevBtnSvg
                  width='17'
                  height='20'
                  viewBox='0 0 17 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M15.6508 19.1195C15.2011 19.1195 14.8188 18.9478 14.369 18.701L1.25926 11.4688C0.326058 10.943 1.02532e-06 10.5997 1.07732e-06 10.0309C1.12932e-06 9.46224 0.326059 9.11887 1.25926 8.60382L14.369 1.36088C14.8188 1.11408 15.2011 0.953125 15.6508 0.953125C16.4828 0.953125 17 1.55402 17 2.48756L17 17.5743C17 18.5079 16.4828 19.1195 15.6508 19.1195Z'
                    fill='#D2D2D2'
                  />
                </PrevBtnSvg>
              </PrevBtn>
            </div>
            <div onClick={() => changeWeekHandle('next')}>
              <NextBtn>
                <NextBtnSvg
                  width='17'
                  height='20'
                  viewBox='0 0 17 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M1.34921 19.1195C1.79894 19.1195 2.18122 18.9478 2.63095 18.701L15.7407 11.4688C16.6739 10.943 17 10.5997 17 10.031C17 9.46224 16.6739 9.11888 15.7407 8.60382L2.63095 1.36088C2.18122 1.11408 1.79894 0.953125 1.34921 0.953125C0.517196 0.953125 0 1.55402 0 2.48756L0 17.5743C0 18.5079 0.517196 19.1195 1.34921 19.1195Z'
                    fill='#D2D2D2'
                  />
                </NextBtnSvg>
              </NextBtn>
            </div>
            <CompleteBtn onClick={confirmHandler}>완료</CompleteBtn>
          </RenderHeaderBox>
        )}
      </div>
    );
  };

  const renderData = () => {
    return (
      <div>
        <RenderDataTop>
          <RenderDataMiddle>
            <WeeklyNumber>
              {recordLoad[_idx]?.total_typingCnt
                ? recordLoad[_idx]?.total_typingCnt
                : 0}
            </WeeklyNumber>
            <WeeklyTyping>타이핑한 글자 수</WeeklyTyping>
          </RenderDataMiddle>
          <WeeklyBox onClick={chartHandler}>
            <WeeklyButton id='b'>주간 상세 분석</WeeklyButton>
            <WeeklyBoxSvg
              width='16'
              height='26'
              viewBox='0 0 16 26'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2 2L13 13L2 24'
                stroke='#878889'
                strokeWidth='3'
                strokeLinecap='round'
              />
            </WeeklyBoxSvg>
          </WeeklyBox>
        </RenderDataTop>
        <RenderDataBar />
        <RenderDataTop>
          <RenderDataMiddle>
            <WeeklyNumber>
              {recordLoad[_idx]?.total_duration
                ? Math.round(recordLoad[_idx]?.total_duration / 60)
                : 0}
            </WeeklyNumber>
            <WeeklyTyping>타이핑한 시간</WeeklyTyping>
          </RenderDataMiddle>
          <WeeklyBox onClick={chartHandler}>
            <WeeklyButton id='c'>주간 상세 분석</WeeklyButton>
            <WeeklyBoxSvg
              width='16'
              height='26'
              viewBox='0 0 16 26'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2 2L13 13L2 24'
                stroke='#878889'
                strokeWidth='3'
                strokeLinecap='round'
              />
            </WeeklyBoxSvg>
          </WeeklyBox>
        </RenderDataTop>
      </div>
    );
  };

  const changeWeekHandle = (btnType) => {
    if (btnType === 'prev') {
      setCurrentMonth(dayjs(currentMonth).subtract(1, 'week').$d);
      setCurrentWeek(
        dayjs(dayjs(currentMonth).subtract(1, 'week').$d).isoWeek() + 1
      );
    }
    if (btnType === 'next') {
      setCurrentMonth(dayjs(currentMonth).add(1, 'week').$d);
      setCurrentWeek(
        dayjs(dayjs(currentMonth).add(1, 'week').$d).isoWeek() + 1
      );
    }
  };

  const onDateClickHandle = (day, dayStr) => {
    setSelectedDate(day);
    showDetailsHandle(dayStr);
  };

  const renderDays = () => {
    const days = ['월', '화', '수', '목', '금', '토', '일'];
    const days_en = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
      <RenderDaysTop>
        {days.map((a, i) => {
          return (
            <RenderDaysMiddle
              clicked={
                selectedDate !== null &&
                days_en.indexOf(date.split(' ')[0]) === i
              }
            >
              {a}
            </RenderDaysMiddle>
          );
        })}
      </RenderDaysTop>
    );
  };

  const renderCells = () => {
    const startDate = dayjs(currentMonth).isoWeekday(1).$d;
    const endDate = dayjs(currentMonth).isoWeekday(7).$d;
    const dateFormat = 'DD';
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dayjs(day).format(dateFormat);
        const cloneDay = day;
        days.push(
          <RenderCellsMiddle
            clicked={
              selectedDate !== null && dayjs(day).isSame(selectedDate, 'd')
            }
            key={day}
            onClick={() => {
              const dayStr = dayjs(cloneDay).format('ddd DD MM YY');
              onDateClickHandle(cloneDay, dayStr);
            }}
          >
            <span id='a' onClick={tabHandler}>
              {formattedDate}
            </span>
          </RenderCellsMiddle>
        );
        day = dayjs(day).add(1, 'd').$d;
      }

      rows.push(<RenderCellsRow key={day}>{days}</RenderCellsRow>);
      days = [];
    }
    return <div>{rows}</div>;
  };

  const renderCntChart = () => {
    const labels = ['월', '화', '수', '목', '금', '토', '일'];

    const fakeData = [0, 0, 0, 0, 0, 0, 0];

    const options = {
      backgroundColor: 'black',
      barPercentage: '0.2',
      plugins: {
        legend: {
          display: false,
          labels: {
            padding: 0,
            font: {
              family: "'Noto Sans KR",
              lineHeight: 1,
            },
          },
        },
        tooltip: {
          backgroundColor: 'black',
          padding: 30,
          bodySpacing: 10,
          bodyFont: {
            font: {
              family: "'Noto Sans KR'",
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawTicks: true,
            tickLength: 4,
          },
          axis: 'x',
          ticks: {
            font: function (context) {
              let width = context.chart.width;
              let size = Math.round(width / 75);
              return {
                size: size,
              };
            },
          },
        },
        y: {
          grid: {
            color: '#E2E2E2',
          },
          afterDataLimits: (scale) => {
            scale.max = scale.max * 1.2;
          },
          axis: 'y',
          ticks: {
            font: function (context) {
              let width = context.chart.width;
              let size = Math.round(width / 75);
              return {
                size: size,
              };
            },
          },
          display: true,
          position: 'right',
          title: {
            display: true,
            color: 'black',
            font: function (context) {
              let width = context.chart.width;
              let size = Math.round(width / 52);

              return {
                family: "'Noto Sans KR",
                weight: 300,
                size: size,
              };
            },
            text: '글자 수(백)',
          },
        },
      },
    };

    const plugin = {
      id: 'custom_canvas_background_color',
      beforeDraw: (chart) => {
        const ctx = chart.canvas.getContext('2d');
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
    };

    const recordTyping = {
      labels,
      datasets: [
        {
          type: 'bar',
          label: '주간 타이핑 수',
          plugins: [plugin],
          data: fakeData.map((a, i) => {
            const target = recordLoad.find((b, j) => {
              const num =
                new Date(b._id).getDay() === 0
                  ? 6
                  : new Date(b._id).getDay() - 1;
              if (num === i) {
                return b;
              }
            });
            if (target) {
              return target.total_typingCnt / 100;
            }
            return a;
          }),
          backgroundColor: new Array(7).fill('#BDBDBD').map((a, i) => {
            const day_en = [
              'Mon',
              'Tue',
              'Wed',
              'Thu',
              'Fri',
              'Sat',
              'Sun',
            ].indexOf(date.split(' ')[0]);
            if (i === day_en) {
              return '#FF2E00';
            }
            return a;
          }),
        },
      ],
    };

    return (
      <ChartContainer>
        <div>
          <Chart type='bar' data={recordTyping} options={options} />
        </div>
      </ChartContainer>
    );
  };

  const renderTimeChart = () => {
    const labels = ['월', '화', '수', '목', '금', '토', '일'];

    const fakeData = [0, 0, 0, 0, 0, 0, 0];

    const options = {
      barPercentage: '0.2',
      backgroundColor: 'black',
      maxBarThickness: 20,
      plugins: {
        legend: {
          display: false,
          labels: {
            padding: 0,
            font: {
              family: "'Noto Sans KR",
              lineHeight: 1,
            },
          },
        },
        tooltip: {
          backgroundColor: 'black',
          padding: 30,
          bodySpacing: 10,
          bodyFont: {
            font: {
              family: "'Noto Sans KR'",
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawTicks: true,
            tickLength: 4,
          },
          axis: 'x',
          ticks: {
            font: function (context) {
              let width = context.chart.width;
              let size = Math.round(width / 75);
              return {
                size: size,
              };
            },
          },
        },
        y: {
          grid: {
            color: '#E2E2E2',
          },
          afterDataLimits: (scale) => {
            scale.max = scale.max * 1.2;
          },
          axis: 'y',
          ticks: {
            font: function (context) {
              let width = context.chart.width;
              let size = Math.round(width / 75);
              return {
                size: size,
              };
            },
          },
          display: true,
          position: 'right',
          title: {
            display: true,
            color: 'black',
            font: function (context) {
              let width = context.chart.width;
              let size = Math.round(width / 52);

              return {
                family: "'Noto Sans KR",
                weight: 300,
                size: size,
              };
            },
            text: '시간(분)',
          },
        },
      },
    };

    const recordTime = {
      labels,
      datasets: [
        {
          type: 'bar',
          label: '주간 타이핑 시간',
          data: fakeData.map((a, i) => {
            const target = recordLoad.find((b, j) => {
              const num =
                new Date(b._id).getDay() === 0
                  ? 6
                  : new Date(b._id).getDay() - 1;
              if (num === i) {
                return b;
              }
            });
            if (target) {
              return (target.total_duration / 60).toFixed(1);
            }
            return a;
          }),
          backgroundColor: new Array(7).fill('#BDBDBD').map((a, i) => {
            const day_en = [
              'Mon',
              'Tue',
              'Wed',
              'Thu',
              'Fri',
              'Sat',
              'Sun',
            ].indexOf(date.split(' ')[0]);
            if (i === day_en) {
              return '#FF2E00';
            }
            return a;
          }),
        },
      ],
    };

    return (
      <ChartContainer>
        <div>
          <Chart type='bar' data={recordTime} options={options} />
        </div>
      </ChartContainer>
    );
  };

  return (
    <ReturnTop>
      <ReturnLeft>
        <div>
          {renderHeader()}
          {isShow ? (
            ''
          ) : (
            <WeeklyCalendar>
              {renderDays()}
              {renderCells()}
            </WeeklyCalendar>
          )}
        </div>
        <ReturnBar />
        <WeeklyStatics>
          {tab === 'a' ? <React.Fragment>{renderData()}</React.Fragment> : ''}
        </WeeklyStatics>
      </ReturnLeft>
      <ReturnRight>
        <div>
          {chartTab === 'b' ? (
            <ChartBox id='b'>{renderCntChart()}</ChartBox>
          ) : (
            ''
          )}
          {chartTab === 'c' ? (
            <ChartBox id='c'>{renderTimeChart()}</ChartBox>
          ) : (
            ''
          )}
        </div>
      </ReturnRight>
    </ReturnTop>
  );
};

export default Calendar;
