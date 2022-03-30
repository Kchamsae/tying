import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CntChart from './CntChart';
import TimeChart from './TimeChart';
import { actionCreators as recordActions } from '../../redux/modules/record';
import styled from 'styled-components';

const DataList = ({ selectedDate, sDate, eDate }) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState('');

  const recordLoad = useSelector((state) => state.record.record_list2);

  useEffect(() => {
    dispatch(recordActions.recordLoadAllDB(sDate, eDate));
  }, []);

  const tabHandler = (e) => {
    const activeTab = e.target.id;
    setTab(activeTab);
  };

  const aa = selectedDate.getDay();

  const selectDate = selectedDate;
  const _selectDate = new Date(
    selectDate.getTime() - selectDate.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split('T');

  console.log(typeof _selectDate);

  function findIdx(el) {
    if (el._id === _selectDate[0].toString()) return true;
  }

  let _idx = recordLoad.findIndex(findIdx);

  return (
    <div>
      {_idx === -1 ? (
        ''
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex' }}>
                <Number>{recordLoad[_idx]?.total_typingCnt}</Number>
                <Typing>타이핑한 글자 수</Typing>
              </div>
              <div id='a' onClick={tabHandler} style={{ float: 'right' }}>
                <WeeklyButton>주간 상세 분석 &#62;</WeeklyButton>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex' }}>
                <Number>{recordLoad[_idx]?.total_duration}</Number>
                <Typing>타이핑한 시간</Typing>
              </div>
              <div id='b' onClick={tabHandler}>
                <WeeklyButton>주간 상세 분석 &#62;</WeeklyButton>
              </div>
            </div>
          </div>
          {tab === 'a' ? (
            <div style={{ width: '60%', marginRight: '100px' }}>
              <CntChart sDate={sDate} eDate={eDate} recordLoad={recordLoad} />
            </div>
          ) : (
            ''
          )}
          {tab === 'b' ? (
            <div style={{ width: '60%', marginRight: '100px' }}>
              <TimeChart sDate={sDate} eDate={eDate} recordLoad={recordLoad} />
            </div>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  );
};

const Number = styled.p`
  font-size: 80px;
  margin: 0px;
`;

const Typing = styled.p`
  positon: absolute;
  font-size: 20px;
  margin: 0px;
  bottom: 0;
  color: #bdbdbd;
`;

const WeeklyButton = styled.p`
  font-size: 30px;
  color: #878889;
  cursor: pointer;
  margin: 0px;
`;

export default DataList;
