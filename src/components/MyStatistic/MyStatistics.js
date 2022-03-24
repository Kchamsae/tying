import React, { useState } from 'react';
import './styles.css';
import BarChart from './BarChart';
import Calendar from './Calendar';

const MyStatistics = () => {
  const [data, setData] = useState(null);

  const showDetailsHandle = (dayStr) => {
    setData(dayStr);
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Calendar showDetailsHandle={showDetailsHandle} />
        <BarChart />
      </div>
      <div>타이핑한 글자 수</div>
      <div>타이핑 시간</div>
    </div>
  );
};

export default MyStatistics;
