import React, { useState, useEffect } from 'react';
import './styles.css';
import BarChart from './BarChart';
import Calendar from './Calendar';
import { useDispatch, useSelector } from 'react-redux';
import record, {
  actionCreators as recordActions,
} from '../../redux/modules/record';
import DataList from './DataList';

const MyStatisticList = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(null);

  const showDetailsHandle = (dayStr) => {
    setDate(dayStr);
  };

  // console.log(date);

  useEffect(() => {
    dispatch(recordActions.recordLoadAllDB());
  }, []);

  const recordLoad = useSelector((state) => state.record.record_list2);
  console.log(recordLoad);
  // const recordList = [];
  // recordLoad.forEach((doc) => {
  //   recordList.push({ ...doc });
  // });
  // console.log(recordList);

  const recordTyping = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
      {
        type: 'bar',
        // label: '릴리즈되는 한국 컨텐츠 수',
        borderColor: 'white',
        borderWidth: 5,
        backgroundColor: '#BDBDBD',
        data: [700, 600, 807, 432, 234, 453, 200],
      },
    ],
  };

  const recordTime = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
      {
        type: 'bar',
        // label: '릴리즈되는 한국 컨텐츠 수',
        borderColor: 'white',
        borderWidth: 5,
        backgroundColor: '#BDBDBD',
        data: [1, 5, 3, 2, 3, 1, 1],
      },
    ],
  };

  return (
    <div>
      <h1>통계페이지입니다.</h1>
      <div style={{ display: 'flex' }}>
        <Calendar showDetailsHandle={showDetailsHandle} />
        <BarChart recordTyping={recordTyping} recordTime={recordTime} />
      </div>
      <DataList recordLoad={recordLoad} />
    </div>
  );
};

export default MyStatisticList;
