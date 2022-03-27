import React, { useState } from 'react';

import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../../redux/modules/user';
import { history } from '../../redux/configureStore';
import MyDictList from '../../components/MyDict/MyDictList';
import MyCertificateList from '../../components/MyCertificate/MyCertificateList';
import MyStatisticList from '../../components/MyStatistic/MyStatisticList';
import Calendar from '../../components/MyStatistic/Calendar';
import NicknameModal from '../../components/NicknameModal/NicknameModal';

const MyPage = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState('myVoca');

  const is_login = useSelector((state) => state.user.is_login);
  const user = useSelector((state) => state.user.user);

  const logout = () => {
    dispatch(userActions.outUser());
    window.alert('로그아웃 되었습니다.');
    history.replace('/');
  };

  // 닉네임 모달 열기
  const editProfile = () => {
    dispatch(userActions.setNicknameModal(true));
  };

  const tabHandler = (e) => {
    const activeTab = e.target.id;
    setTab(activeTab);
  };

  return (
    <>
      {is_login ? (
        <MyPageWrapper>
          <MyPageTop>
            <MyInfo>
              <h3>{user.nickname}</h3>
              <div>이름수정</div>
              <div onClick={logout}>로그아웃</div>
            </MyInfo>
            <TabWrapper>
              <TabMenu id='myVoca' onClick={tabHandler} on={tab==='myVoca' && 'on'}>
                나만의 단어장
              </TabMenu>
              <TabMenu id='verify' onClick={tabHandler} on={tab==='verify' && 'on'}>
                타잉 인증서
              </TabMenu>
              <TabMenu id='statistics' onClick={tabHandler} on={tab==='statistics' && 'on'}>
                통계
              </TabMenu>
            </TabWrapper>
          </MyPageTop>
          <MyPageBody>
            {tab === 'myVoca' ? <MyDictList /> : ''}
            {tab === 'verify' ? <MyCertificateList /> : ''}
            {tab === 'statistics' ? <Calendar /> : ''}
          </MyPageBody>
        </MyPageWrapper>
      ) : (
        '로그인이 필요합니다.'
      )}
    </>
  );
};


const MyPageWrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 105px);
  display: flex;
  flex-direction: column;
  `;

const MyPageTop = styled.div`
  padding-left: 80px;
  box-sizing: border-box;
  flex: 22.47% 0 0;
  display: flex;
  flex-direction: column;
  `;

const MyInfo = styled.div`
  flex: 55.6% 0 0;
  display: flex;
  align-items: center;
  
  >h3{
    padding-left: 34px;
    font-family: 'Noto Sans KR';
    font-weight: 500;
    font-size: 35px;
    letter-spacing: -0.015em;
    margin: 0;
    position: relative;

    &::before{
      content: '';
      display: block;
      position: absolute;
      width: 11px;
      height: 50px;
      left: 0;
      top: calc(50% - 23px);

      background: #FF2E00;
      border-radius: 2px;
    }
  }

  >div{
    margin-left: 38px;

    font-family: 'Noto Sans KR';
    font-size: 20px;
    letter-spacing: -0.015em;
    color: #878889;
    position: relative;
    cursor: pointer;
    transition: 0.3s;

    &:hover{
      color: #000;
    }

    &::before{
      content: '';
      display: block;
      position: absolute;
      width: 0;
      height: 20px;
      left: -20px;
      top: calc(50% - 9px);

      border-right: 2px solid #636366;
    }
  }

`;

const TabWrapper = styled.div`
  flex: 44.4% 0 0;
  display: flex;
  align-items: center;
`;

const TabMenu = styled.div`
  height: 55px;
  padding: 0 16px;
  border: 2px solid ${props => props.on ? '#000' : '#878889'};
  border-radius: 63px;
  display: flex;
  align-items: center;
  transition: 0.3s;

  font-family: 'Noto Sans KR';
  font-weight: ${props => props.on ? '600' : '500'};
  font-size: 26px;
  letter-spacing: -0.015em;

  color: ${props => props.on ? '#000' : '#878889'};
  margin-right: 9px;
  cursor: pointer;
`;

const MyPageBody = styled.div`
  padding: 49px;
  box-sizing: border-box;
  flex: 77.53% 0 0;
`;
export default MyPage;
