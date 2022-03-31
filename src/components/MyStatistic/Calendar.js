import React, { useEffect, useState } from 'react';
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
} from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as recordActions } from '../../redux/modules/record';
import './styles.css';
import styled from 'styled-components';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const Calendar = () => {
  const dispatch = useDispatch();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(null);

  const [isShow, setIsShow] = useState(false);

  const [date, setDate] = useState(null);

  const [tab, setTab] = useState('');

  const dateStart = startOfWeek(currentMonth, { weekStartsOn: 0 }); // 27 일 00 : 00 : 00
  const _dateStart = new Date(
    dateStart.getTime() -
      dateStart.getTimezoneOffset() * 60000 +
      parseInt(86400000)
  ).toISOString();

  const dateEnd = lastDayOfWeek(currentMonth, { weekStartsOn: 1 }); // 4월 2일 00 : 00 : 00
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

  const baseDate = startOfWeek(todayTest, { weekStartsOn: 0 });
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

  const _selectedDate = selectedDate !== null ? new Date(
    selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
  ).toISOString().split('T') : '';

  function findIdx(el) {
    if (selectedDate !== null){
      if (el._id === _selectedDate[0].toString()) return true;
    }
  }

  let _idx = recordLoad.findIndex(findIdx);

  const confirmHandler = () => {
    dispatch(recordActions.recordLoadAllDB(_dateStart, _dateEnd));
    setIsShow(false);
  };

  const renderHeader = () => {
    const dateFormat = 'yyyy';
    return (
      <div>
        <div className='renderheader-top'>
          {format(currentMonth, dateFormat) +
            '년' + " " +
            `${baseMonth}월 ${weekOfMonth}주차`}
          <div
            className='down-btn'
            onClick={() => {
              setIsShow(!isShow);
            }}
          >
            <svg
              width='26'
              height='16'
              viewBox='0 0 26 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2 2L13 13L24 2'
                stroke='black'
                stroke-width='3'
                strokeLinecap='round'
              />
            </svg>
          </div>
        </div>

        {isShow && (
          <div className='renderheader-box'>
            <div>
              <div>
                {format(currentMonth, dateFormat) +
                  '년' +
                  ' ' +
                  `${baseMonth}월 ${weekOfMonth}주차`}
              </div>
            </div>
            <div>
              <div
                className='prev-btn'
                onClick={() => changeWeekHandle('prev')}
              >
                <svg
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
                </svg>
              </div>
            </div>
            <div onClick={() => changeWeekHandle('next')}>
              <div className='next-btn'>
                <svg
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
                </svg>
              </div>
            </div>
            <div className='complete-btn' onClick={confirmHandler}>
              완료
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderData = () => {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', width: '70%' }}>
            <p className='weekly-number'>
              {recordLoad[_idx]?.total_typingCnt
                ? recordLoad[_idx]?.total_typingCnt
                : 0}
            </p>
            <p style={{ alignSelf: 'flex-end' }} className='weekly-typing'>
              타이핑한 글자 수
            </p>
          </div>
          <div className='weekly-box' onClick={chartHandler}>
            <p id='b' className='weekly-button'>
              주간 상세 분석
            </p>
            <svg
              width='16'
              height='26'
              viewBox='0 0 16 26'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2 2L13 13L2 24'
                stroke='#878889'
                stroke-width='3'
                stroke-linecap='round'
              />
            </svg>
          </div>
        </div>
        <div
          style={{
            width: '29.43vw',
            borderBottom: '2px solid #D2D2D2',
            margin: '1.04vw 0px',
          }}
        ></div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', width: '70%' }}>
            <p className='weekly-number'>
              {recordLoad[_idx]?.total_duration
                ? Math.round(recordLoad[_idx]?.total_duration / 60)
                : 0}
            </p>
            <p style={{ alignSelf: 'flex-end' }} className='weekly-typing'>
              타이핑한 시간
            </p>
          </div>
          <div className='weekly-box' onClick={chartHandler}>
            <p id='c' className='weekly-button'>
              주간 상세 분석
            </p>
            <svg
              width='16'
              height='26'
              viewBox='0 0 16 26'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2 2L13 13L2 24'
                stroke='#878889'
                stroke-width='3'
                stroke-linecap='round'
              />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  const changeWeekHandle = (btnType) => {
    if (btnType === 'prev') {
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === 'next') {
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

  const onDateClickHandle = (day, dayStr) => {
    setSelectedDate(day);
    showDetailsHandle(dayStr);
  };

  const renderDays = () => {
    const dateFormat = 'EEE';
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className='col col-center' key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className='days row'>{days}</div>;
  };
  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = 'd';
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${selectedDate===null ? '' : (isSameDay(day, selectedDate) ? 'selected' : '')}`}
            key={day}
            onClick={() => {
              const dayStr = format(cloneDay, 'ccc dd MM yy');
              onDateClickHandle(cloneDay, dayStr);
            }}
          >
            <span className='number' id='a' onClick={tabHandler}>
              {formattedDate}
            </span>
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div className='row' key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className='body'>{rows}</div>;
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
            font: function(context) {
              let width = context.chart.width;
              let size = Math.round(width / 75);
              return {
                  size: size
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
            font: function(context) {
              let width = context.chart.width;
              let size = Math.round(width / 75);
              return {
                  size: size
              };
            },
          },
          display: true,
          position: 'right',
          title: {
            display: true,
            color: 'black',
            font: function(context) {
              let width = context.chart.width;
              let size = Math.round(width / 52);

              return {
                  family: "'Noto Sans KR",
                  weight: 300,
                  size: size
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
          backgroundColor: new Array(7).fill('#BDBDBD').map((a,i)=>{
            const day_en = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(date.split(' ')[0]);
            if(i === day_en){
              return '#FF2E00';
            }
            return a;
          }),
        },
      ],
    };

    return (
      <Container>
        <div>
          <Chart type='bar' data={recordTyping} options={options}/>
        </div>
      </Container>
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
            font: function(context) {
              let width = context.chart.width;
              let size = Math.round(width / 75);
              return {
                  size: size
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
            font: function(context) {
              let width = context.chart.width;
              let size = Math.round(width / 75);
              return {
                  size: size
              };
            },
          },
          display: true,
          position: 'right',
          title: {
            display: true,
            color: 'black',
            font: function(context) {
              let width = context.chart.width;
              let size = Math.round(width / 52);

              return {
                  family: "'Noto Sans KR",
                  weight: 300,
                  size: size
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
          backgroundColor: new Array(7).fill('#BDBDBD').map((a,i)=>{
            const day_en = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(date.split(' ')[0]);
            if(i === day_en){
              return '#FF2E00';
            }
            return a;
          }),
        },
      ],
    };

    return (
      <Container>
        <div>
          <Chart type='bar' data={recordTime} options={options} />
        </div>
      </Container>
    );
  };

  return (
    <div style={{ display: 'flex', marginLeft: '4.01vw' }}>
      <div style={{ width: '50%' }}>
        <div className='calendar'>
          {renderHeader()}
          {isShow ? (
            ''
          ) : (
            <div className='weekly-calendar'>
              {renderDays()}
              {renderCells()}
            </div>
          )}
        </div>
        <div
          style={{
            width: '29.43vw',
            borderBottom: '0.26vw solid #D2D2D2',
            margin: '1.04vw 0px',
          }}
        ></div>
        <div className='weekly-statics'>
          {tab === 'a' ? <React.Fragment>{renderData()}</React.Fragment> : ''}
        </div>
      </div>
      <div style={{ width: '100%', height: '100%', marginLeft: '2.6vw' }}>
        <div>
          {chartTab === 'b' ? (
            <div id='b' className='chart-box'>
              {renderCntChart()}
            </div>
          ) : (
            ''
          )}
          {chartTab === 'c' ? (
            <div id='c' className='chart-box'>
              {renderTimeChart()}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

const Container = styled.div`
  width: 90vw;
  max-width: 46.88vw;
`;

export default Calendar;
