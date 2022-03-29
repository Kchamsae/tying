import React from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const TimeChart = () => {
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
      <h1>시간 차트</h1>
      <div className='chart3Container'>
        <Chart type='bar' data={recordTime} />
      </div>
    </div>
  );
};

export default TimeChart;
