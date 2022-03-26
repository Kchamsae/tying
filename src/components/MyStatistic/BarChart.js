import React, { useState, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as recordActions } from '../../redux/modules/record';

const BarChart = ({ recordTyping, recordTime }) => {
  const [tab, setTab] = useState('');

  const tabHandler = (e) => {
    const activeTab = e.target.id;
    setTab(activeTab);
  };

  const dispatch = useDispatch();

  const dataTyping = recordTyping;
  const dataTime = recordTime;

  return (
    <div className='chart3Container'>
      <Chart type='bar' data={dataTyping} />
    </div>
  );
};

export default BarChart;
