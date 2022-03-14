import React from "react";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Main from "../pages/Main";
import './App.css';

import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators as userActions} from '../redux/modules/user'
import { getCookie } from './Cookie';
import KakaoRedirect from "../pages/Kakaoredirect";


function App() {
  const dispatch = useDispatch();
  const token = getCookie('token');
  const is_login = useSelector(state => state.user.is_login);
  console.log("is_login : ", is_login);

  React.useEffect(()=>{
    // if (!token) {
    //   return;
    // }
    if (token && is_login === false){
      dispatch(userActions.loginCheckDB());
    }
  },[]);

  return (
    <>
      {/* <Header></Header> */}
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Main} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/api/kakao/callback" component={KakaoRedirect}></Route>
        </ConnectedRouter>
    </>
  );
}

export default App;
