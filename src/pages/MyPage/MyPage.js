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
        <div>
          <h1>마이페이지 입니다.</h1>
          <div style={{ display: 'flex' }}>
            <h3>{user.nickname}</h3>

            <h3 onClick={editProfile}>이름수정</h3>
            <h3 onClick={logout}>로그아웃</h3>
          </div>
          <div style={{ display: 'flex' }}>
            <TabMenu id='myVoca' onClick={tabHandler}>
              나만의 단어장
            </TabMenu>
            <TabMenu id='verify' onClick={tabHandler}>
              타잉 인증서
            </TabMenu>
            <TabMenu id='statistics' onClick={tabHandler}>
              통계
            </TabMenu>
          </div>
          {tab === 'myVoca' ? <MyDictList /> : ''}
          {tab === 'verify' ? <MyCertificateList /> : ''}
          {tab === 'statistics' ? <Calendar /> : ''}
        </div>
      ) : (
        '로그인이 필요합니다.'
      )}
    </>
  );
};

const TabMenu = styled.div`
  width: 180px;
  height: 50px;
  background-color: grey;
  color: white;
  font-weight: bold;
  margin: 20px;
`;

export default MyPage;
