import React from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const CntChart = ({ sDate, eDate }) => {
  console.log(sDate, eDate);

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

  return (
    <div>
      <h1>타이핑 수 차트</h1>
      <div className='chart3Container'>
        <Chart type='bar' data={recordTyping} />
      </div>
    </div>
  );
};

export default CntChart;
