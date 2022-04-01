import React from 'react';
import './App.css';
import styled from 'styled-components';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import { getCookie } from './Cookie';
import FeedbackButton from '../components/FeedbackButton';
import ScrollToTop from '../components/ScrollToTop';
import Header from '../components/Header/Header';
import MyAllDictList from '../components/MyDict/MyAllDictList';
import GoogleAnalytics from '../components/GoogleAnalytics';
import KakaoRedirect from '../pages/Kakaoredirect';
import ScriptFiltering from '../pages/ScriptFiltering';
import Search from '../pages/Search';
import NotFound from '../pages/NotFound';
import Main from '../pages/Main';
import Typing from './../pages/Typing/Typing';
import MyPage from '../pages/MyPage/MyPage';

function App() {
  const dispatch = useDispatch();
  const token = getCookie('token');
  const is_login = useSelector((state) => state.user.is_login);
  console.log('is_login : ', is_login);


  React.useEffect(() => {
    if (token && is_login === false) {
      dispatch(userActions.loginCheckDB());
    }
  }, []);

  return (
    <>
      <ConnectedRouter history={history}>
        <AppWrapper>
          <Header />
          <ScrollToTop />
          <GoogleAnalytics />
          <Switch>
            <Route exact path='/' component={Main} />
            <Route exact path='/api/kakao/callback' component={KakaoRedirect} />
            <Route exact path='/typing/:script_id' component={Typing} />
            <Route exact path='/filtering' component={ScriptFiltering} />
            <Route exact path='/search' component={Search} />
            <Route exact path='/mypage' component={MyPage} />
            <Route exact path='/mypage/all' component={MyAllDictList} />
            <Route path='*' component={NotFound} />
          </Switch>
          <FeedbackButton />
        </AppWrapper>
      </ConnectedRouter>
    </>
  );
}

const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f9f9f9;
`;

export default App;
