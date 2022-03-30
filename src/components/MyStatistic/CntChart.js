import React from 'react';
import { Chart } from 'react-chartjs-2';
import styled from 'styled-components';

const CntChart = ({ sDate, eDate, recordLoad }) => {
  const labels = ['월', '화', '수', '목', '금', '토', '일'];

  const fakeData = [0, 0, 0, 0, 0, 0, 0];

  const recordTyping = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: 'Dataset 1',
        backgroundColor: 'rgb(255, 99, 132)',
        data: fakeData.map((a, i) => {
          const target = recordLoad.find((b, j) => {
            const num =
              new Date(b._id).getDay() === 0 ? 6 : new Date(b._id).getDay() - 1;
            if (num === i) {
              return b;
            }
          });
          if (target) {
            return target.total_typingCnt;
          }
          return a;
        }),
        // borderColor: 'white',
        // borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <p>타이핑 수 차트</p>
      <Container>
        <Chart type='bar' data={recordTyping} />
      </Container>
    </div>
  );
};

const Container = styled.div`
  width: 90vw;
  max-width: 900px;
`;

export default CntChart;
