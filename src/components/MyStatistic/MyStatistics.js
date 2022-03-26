import React, { useState, useEffect } from 'react';
import './styles.css';
import BarChart from './BarChart';
import Calendar from './Calendar';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as recordActions } from '../../redux/modules/record';
import DataList from './DataList';

const MyStatistics = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  const showDetailsHandle = (dayStr) => {
    setData(dayStr);
  };

  // console.log(data);

  useEffect(() => {
    dispatch(
      recordActions.recordLoadAllDB(
        '2022-03-21T00:00:00.000Z',
        '2022-03-27T00:00:00.000Z'
      )
    );
  }, []);

  const recordLoad = useSelector((state) => state.record.record_list2);
  console.log(recordLoad);

  const recordTyping = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
      {
        type: 'bar',
        // label: '릴리즈되는 한국 컨텐츠 수',
        borderColor: 'white',
        borderWidth: 5,
        backgroundColor: '#BDBDBD',
        data: [700, 600, 807, 432, 234, 453, 2],
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

  // const date = new Date(+new Date() + 3240 * 10000).toISOString();
  // // console.log(date);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Calendar showDetailsHandle={showDetailsHandle} />
        <BarChart recordTyping={recordTyping} recordTime={recordTime} />
      </div>
      <DataList recordLoad={recordLoad} />
    </div>
  );
};

export default MyStatistics;
