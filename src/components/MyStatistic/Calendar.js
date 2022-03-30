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
import DataList from './DataList';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as recordActions } from '../../redux/modules/record';
import './styles.css';
import styled from 'styled-components';
import { Chart } from 'react-chartjs-2';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [isShow, setIsShow] = useState(false);

  const dispatch = useDispatch();
  const [date, setDate] = useState(null);

  // 달력 컨트롤 상태, 핸들러
  const [tab, setTab] = useState('');

  //

  // 월, 일 두자리수 표현
  // let month = new String(date.getMonth() + 1);
  // month = month >= 10 ? month : '0' + month;
  // let day = new String(date.getDate());
  // day = day >= 10 ? day: '0' + day;
  // console.log(month, day)
  //

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
  console.log(aTest);

  //

  // 몇주차인지 구하는 식
  const todayTest = aTest;

  const baseDate = startOfWeek(todayTest, { weekStartsOn: 0 });
  const baseMonth = baseDate.getMonth() + 1;
  const baseDays = baseDate.getDate() + 1;

  const weekOfMonth = Math.ceil(baseDays / 7);

  console.log(
    `${format(
      todayTest,
      'yyyy년 MM월 dd일'
    )}은 ${baseMonth}월 ${weekOfMonth}주차 입니다.`
  );

  const y = format(todayTest, 'yyyy');
  const month = format(todayTest, `${baseMonth}`);
  const d = format(todayTest, `${weekOfMonth}`);
  console.log(y, month, d);

  //

  const tabHandler = (e) => {
    const activeTab = e.target.id;
    setTab(activeTab);
  };

  const showDetailsHandle = (dayStr) => {
    setDate(dayStr);
  };

  // 차트 컨트롤 상태 핸들러
  const [chartTab, setChartTab] = useState('');
  const chartHandler = (e) => {
    console.log(e);
    const activeChartTab = e.target.id;
    setChartTab(activeChartTab);
  };

  console.log(chartTab);

  // record_list2에 저장된 데이터 불러오기
  useEffect(() => {
    dispatch(recordActions.recordLoadAllDB(_dateStart, _dateEnd));
  }, []);

  const recordLoad = useSelector((state) => state.record.record_list2);

  console.log(recordLoad);

  console.log(selectedDate);

  // const selectDate = new Date(
  //   selectedDate.getTime() - selectedDate.getTimezoneOffset() * 6000
  // );

  // const _selectDate = selectDate.toISOString().split('T');
  // console.log(_selectDate);

  // console.log(selectedDate);

  const _selectedDate = new Date(
    selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split('T');

  function findIdx(el) {
    if (el._id === _selectedDate[0].toString()) return true;
  }

  let _idx = recordLoad.findIndex(findIdx);

  console.log(_dateStart);

  console.log(
    `${format(
      todayTest,
      'yyyy년 MM월 dd일'
    )}은 ${baseMonth}월 ${weekOfMonth}주차 입니다.`
  );

  const confirmHandler = () => {
    dispatch(recordActions.recordLoadAllDB(_dateStart, _dateEnd));
  };

  const renderHeader = () => {
    const dateFormat = 'yyyy';
    return (
      <div>
        <div className='renderheader-top'>
          {format(currentMonth, dateFormat) +
            '년' +
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
                  ' ' +
                  '년' +
                  ' ' +
                  `${baseMonth}월 ${weekOfMonth} 주차`}
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
            width: '565px',
            borderBottom: '2px solid #D2D2D2',
            margin: '20px 0px',
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
    console.log('current week', currentWeek);
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
            className={`col cell ${
              isSameDay(day, selectedDate) ? 'selected' : ''
            }`}
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
        },
        y: {
          grid: {
            color: '#E2E2E2',
          },
          afterDataLimits: (scale) => {
            scale.max = scale.max * 1.2;
          },
          axis: 'y',
          display: true,
          position: 'right',
          title: {
            display: true,
            color: 'black',
            font: {
              size: 16,
              family: "'Noto Sans KR",
              weight: 300,
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
          backgroundColor: '#BDBDBD',
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
        },
      ],
    };

    return (
      <Container>
        <div>
          <Chart type='bar' data={recordTyping} options={options} />
        </div>
      </Container>
    );
  };

  const renderTimeChart = () => {
    const labels = ['월', '화', '수', '목', '금', '토', '일'];

    const fakeData = [0, 0, 0, 0, 0, 0, 0];

    const options = {
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
        },
        y: {
          grid: {
            color: '#E2E2E2',
          },
          afterDataLimits: (scale) => {
            scale.max = scale.max * 1.2;
          },
          axis: 'y',
          display: true,
          position: 'right',
          title: {
            display: true,
            color: 'black',
            font: {
              size: 16,
              family: "'Noto Sans KR",
              weight: 300,
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
          backgroundColor: '#BDBDBD',
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
    <div style={{ display: 'flex', marginLeft: '100px' }}>
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
            width: '565px',
            borderBottom: '5px solid #D2D2D2',
            margin: '20px 0px',
          }}
        ></div>
        <div className='weekly-statics'>
          {tab === 'a' ? <React.Fragment>{renderData()}</React.Fragment> : ''}
        </div>
      </div>
      <div style={{ width: '100%', height: '100%', marginLeft: '50px' }}>
        <div>
          {chartTab === 'b' ? <div id='b'>{renderCntChart()}</div> : ''}
          {chartTab === 'c' ? <div id='c'>{renderTimeChart()}</div> : ''}
        </div>
      </div>
    </div>
  );
};

const Container = styled.div`
  width: 90vw;
  max-width: 900px;
`;

const Number = styled.p`
  font-family: Montserrat;
  font-size: 80px;
  margin: 0px;
`;

const Typing = styled.p`
  positon: absolute;
  font-size: 20px;
  margin: 0px;
  bottom: 0;
  color: #bdbdbd;
`;

const WeeklyButton = styled.p`
  font-size: 30px;
  color: #878889;
  cursor: pointer;
  margin: 0px;
`;

export default Calendar;
