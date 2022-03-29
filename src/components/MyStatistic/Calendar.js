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

  const dispatch = useDispatch();
  const [date, setDate] = useState(null);

  // 달력 컨트롤 상태, 핸들러
  const [tab, setTab] = useState('');

  // 몇주차인지 구하는 식
  const todayTest = new Date();

  const baseDate = startOfWeek(todayTest, { weekStartsOn: 3 });
  const baseMonth = baseDate.getMonth() + 1;
  const baseDays = baseDate.getDate() + 1;

  const weekOfMonth = Math.ceil(baseDays / 7);

  console.log(todayTest);
  console.log(
    `${format(
      todayTest,
      'yyyy년 MM월 dd일'
    )}은 ${baseMonth}월 ${weekOfMonth}주차 입니다.`
  );

  const y = format(todayTest, 'yyyy');
  const m = '0' + format(todayTest, `${baseMonth}`);
  const d = format(todayTest, `${weekOfMonth}`);
  console.log(y, m, d);

  //
  const tabHandler = (e) => {
    const activeTab = e.target.id;
    setTab(activeTab);
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

  const renderData = () => {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', width: '50%' }}>
            <p className='weekly-number'>{recordLoad[_idx]?.total_typingCnt}</p>
            <p className='weekly-typing'>타이핑한 글자 수</p>
          </div>
          <div id='b' onClick={chartHandler} style={{ float: 'right' }}>
            <p className='weekly-button'>주간 상세 분석 &#62;</p>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', width: '50%' }}>
            <p className='weekly-number'>{recordLoad[_idx]?.total_duration}</p>
            <p className='weekly-typing'>타이핑한 시간</p>
          </div>
          <div id='c' onClick={chartHandler}>
            <p className='weekly-button'>주간 상세 분석 &#62;</p>
          </div>
        </div>
      </div>
    );
  };

  const showDetailsHandle = (dayStr) => {
    setDate(dayStr);
  };

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

  const renderHeader = () => {
    const dateFormat = 'yyyy MMM';
    return (
      <div className='header row flex-middle'>
        <div className='yyyy-mm-ww'>
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className='col col-start'>
          <div className='icon' onClick={() => changeWeekHandle('prev')}>
            &#60;
          </div>
        </div>
        <div className='col col-end' onClick={() => changeWeekHandle('next')}>
          <div className='icon'>&#62;</div>
        </div>
      </div>
    );
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

    const recordTyping = {
      labels,
      datasets: [
        {
          type: 'bar',
          // label: '릴리즈되는 한국 컨텐츠 수',
          borderColor: 'white',
          borderWidth: 2,
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
              return target.total_typingCnt;
            }
            return a;
          }),
        },
      ],
    };

    return (
      <div>
        <p>타이핑 수 차트</p>
        <div className='chart3Container'>
          <Chart type='bar' data={recordTyping} />
        </div>
      </div>
    );
  };

  const renderTimeChart = () => {
    const labels = ['월', '화', '수', '목', '금', '토', '일'];

    const fakeData = [0, 0, 0, 0, 0, 0, 0];

    const recordTime = {
      labels,
      datasets: [
        {
          type: 'bar',
          // label: '릴리즈되는 한국 컨텐츠 수',
          borderColor: 'white',
          borderWidth: 1,
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
              return target.total_duration;
            }
            return a;
          }),
        },
      ],
    };

    return (
      <div>
        <p>시간 차트</p>
        <div className='chart3Container'>
          <Chart type='bar' data={recordTime} />
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', marginLeft: '100px' }}>
      <div style={{ width: '50%' }}>
        <div className='calendar'>
          {renderHeader()}
          <div className='weekly-calendar'>
            {renderDays()}
            {renderCells()}
          </div>
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
