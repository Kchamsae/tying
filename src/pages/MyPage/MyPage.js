import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../../redux/modules/user';
import { history } from '../../redux/configureStore';
import MyDictList from '../../components/MyDict/MyDictList';
import MyCertificateList from '../../components/MyCertificate/MyCertificateList';
import Calendar from '../../components/MyStatistic/Calendar';

import {
  MyPageWrapper,
  MyPageTop,
  MyInfo,
  TabWrapper,
  TabMenu,
  MyPageBody,
} from './style';
import { ModalBg } from '../Typing/style';
import CertificateModal from './../../components/CertificateModal/CertificateModal';

const MyPage = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState('myVoca');
  const [modal, setModal] = useState(false);
  const [script_id, setScriptId] = useState();
  const [certificate_id, setCertificateId] = useState();

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
    <React.Fragment>
      {is_login ? (
        <React.Fragment>
          <MyPageWrapper>
            <MyPageTop>
              <MyInfo>
                <h3>{user.nickname}</h3>
                <div onClick={editProfile}>이름수정</div>
                <div onClick={logout}>로그아웃</div>
              </MyInfo>
              <TabWrapper>
                <TabMenu
                  id='myVoca'
                  onClick={tabHandler}
                  on={tab === 'myVoca' && 'on'}
                >
                  나만의 단어장
                </TabMenu>
                <TabMenu
                  id='verify'
                  onClick={tabHandler}
                  on={tab === 'verify' && 'on'}
                >
                  타잉 인증서
                </TabMenu>
                <TabMenu
                  id='statistics'
                  onClick={tabHandler}
                  on={tab === 'statistics' && 'on'}
                >
                  통계
                </TabMenu>
              </TabWrapper>
            </MyPageTop>
            <MyPageBody>
              {tab === 'myVoca' && <MyDictList />}
              {tab === 'verify' && <MyCertificateList setModal={setModal} setScriptId={setScriptId} setCertificateId={setCertificateId}/>}
              {tab === 'statistics' && <Calendar />}
            </MyPageBody>
          </MyPageWrapper>
          {modal && (
            <>
              <ModalBg/>
              <CertificateModal my script_id={script_id} certificate_id={certificate_id} setModal={setModal}/>
            </>
          )}
        </React.Fragment>
      ) : (
        '로그인이 필요합니다.'
      )}
    </React.Fragment>
  );
};

export default MyPage;
