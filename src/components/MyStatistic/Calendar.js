import { useEffect, useState } from 'react';
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

const Calendar = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(null);
  const [tab, setTab] = useState('');

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date(startOfWeek));

  const tabHandler = (e) => {
    const activeTab = e.target.id;
    setTab(activeTab);
  };

  const showDetailsHandle = (dayStr) => {
    setDate(dayStr);
  };

  const dateStart = startOfWeek(currentMonth, { weekStartsOn: 0 }); // 27 일 00 : 00 : 00
  const _dateStart = new Date(
    dateStart.getTime() - dateStart.getTimezoneOffset() * 60000
  ).toISOString();

  const dateEnd = lastDayOfWeek(currentMonth, { weekStartsOn: 1 }); // 4월 2일 00 : 00 : 00
  const _dateEnd = new Date(
    dateEnd.getTime() - dateEnd.getTimezoneOffset() * 60000
  ).toISOString();

  // useEffect(() => {
  //   dispatch(
  //     recordActions.recordLoadAllDB(
  //       '2022-03-21T00:00:00.000Z',
  //       '2022-03-27T00:00:00.000Z'
  //     )
  //   );
  // }, []);

  // const recordLoad = useSelector((state) => state.record.record_list2);
  // console.log(recordLoad);

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
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
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
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 0 });
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

  return (
    <>
      <div className='calendar'>
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
      <div>
        {tab === 'a' ? (
          <DataList
            sDate={_dateStart}
            eDate={_dateEnd}
            selectedDate={selectedDate}
          />
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default Calendar;
