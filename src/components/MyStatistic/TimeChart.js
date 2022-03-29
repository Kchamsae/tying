import React from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import styled from 'styled-components';

const TimeChart = ({ sDate, eDate, recordLoad }) => {
  const labels = ['월', '화', '수', '목', '금', '토', '일'];

  const fakeData = [0, 0, 0, 0, 0, 0, 0];

  const recordTime = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: 'dataset2',
        data: fakeData.map((a, i) => {
          const target = recordLoad.find((b, j) => {
            const num =
              new Date(b._id).getDay() === 0 ? 6 : new Date(b._id).getDay() - 1;
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
    <Container>
      <Chart type='bar' data={recordTime} />
    </Container>
  );
};

const Container = styled.div`
  width: 90vw;
  max-width: 900px;
`;

export default TimeChart;
