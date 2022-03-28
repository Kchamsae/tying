import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CntChart from './CntChart';
import TimeChart from './TimeChart';
import { actionCreators as recordActions } from '../../redux/modules/record';

const DataList = ({ selectedDate, sDate, eDate }) => {
  const dispatch = useDispatch();
  console.log(sDate);
  console.log(eDate);

  // console.log(selectedDate);

  const aa = selectedDate.getDay();

  console.log(aa);
  const selectDate = selectedDate;
  const _selectDate = new Date(
    selectDate.getTime() - selectDate.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split('T');
  // console.log(_selectDate);
  // const _selectDate_ = _selectDate.split('T');
  console.log(_selectDate[0]);

  const [tab, setTab] = useState('');

  const tabHandler = (e) => {
    // console.log(e);
    const activeTab = e.target.id;
    setTab(activeTab);
  };

  useEffect(() => {
    dispatch(recordActions.recordLoadAllDB(sDate, eDate));
  }, []);

  const recordLoad = useSelector((state) => state.record.record_list2);
  console.log(recordLoad);

  // const bb = recordLoad.data.getrecord;
  // console.log(bb);

  function findIdx(el) {
    if (el._id === _selectDate[0].toString()) return true;
  }

  let _idx = recordLoad.findIndex(findIdx) + 1;

  console.log(_idx);

  const totalBox = () => {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex' }}>
              <h1>111</h1>
              <p>타이핑한 글자 수</p>
              <div id='a' onClick={tabHandler}>
                주간 상세 분석
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <h1>10</h1>
              <p>타이핑한 시간</p>
              <div id='b' onClick={tabHandler}>
                주간 상세 분석
              </div>
            </div>
          </div>
          {tab === 'a' ? <CntChart sDate={sDate} eDate={eDate} /> : ''}
          {tab === 'b' ? <TimeChart /> : ''}
        </div>
      </div>
    );
  };

  return (
    <div>
      {aa === 1 ? (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex' }}>
              <h1>{recordLoad[_idx]?.total_typingCnt}</h1>
              <p>타이핑한 글자 수</p>
              <div id='a' onClick={tabHandler}>
                주간 상세 분석
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <h1>{recordLoad[_idx]?.total_duration}</h1>
              <p>타이핑한 시간</p>
              <div id='b' onClick={tabHandler}>
                주간 상세 분석
              </div>
            </div>
          </div>
          {tab === 'a' ? (
            <CntChart sDate={sDate} eDate={eDate} recordLoad={recordLoad} />
          ) : (
            ''
          )}
          {tab === 'b' ? (
            <TimeChart sDate={sDate} eDate={eDate} recordLoad={recordLoad} />
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default DataList;
