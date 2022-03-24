import { useState } from 'react';
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

const Calendar = ({ showDetailsHandle }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());

  const changeWeekHandle = (btnType) => {
    console.log('current week', currentWeek);
    if (btnType === 'prev') {
      //console.log(subWeeks(currentMonth, 1));
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === 'next') {
      //console.log(addWeeks(currentMonth, 1));
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
        <div className='col col-start'>
          <div className='icon' onClick={() => changeWeekHandle('prev')}>
            &#60;
          </div>
        </div>
        <div className='col col-center'>
          <span>{format(currentMonth, dateFormat)}</span>
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
              isSameDay(day, new Date())
                ? 'today'
                : isSameDay(day, selectedDate)
                ? 'selected'
                : ''
            }`}
            key={day}
            onClick={() => {
              const dayStr = format(cloneDay, 'ccc dd MM yy');
              onDateClickHandle(cloneDay, dayStr);
            }}
          >
            <span className='number'>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }

      let a = selectedDate.getMonth() + 1;

      console.log('0' + a, selectedDate.getDate());

      rows.push(
        <div className='row' key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className='body'>{rows}</div>;
  };

  return (
    <>
      <div className='calendar'>
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
      <div>타이핑한 글자 수</div>
      <div>타이핑 시간</div>
    </>
  );
};

export default Calendar;
