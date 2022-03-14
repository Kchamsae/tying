import React from "react";
// import styled from "styled-components";
import { Text, Input, Button } from "../elements/element";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import { KAKAO_AUTH_URL } from "../shared/social/Kakao";
import kakaoBtn from "../static/kakaoBtn.png"

const Login = (props) => {
  const dispatch = useDispatch();

  // useState를 이용하여 아이디와 비밀번호의 값을 redux로 보내줄 준비
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const changeId = (e) => {
    setId(e.target.value);
  };

  const changePwd = (e) => {
    setPwd(e.target.value);
  };

  const login = () => {
    if (id === "" || pwd === "") {
      window.alert("아이디와 비밀번호를 입력해주세요.");
      // 아이디와 비밀번호를 입력하지 않을 경우 alert 띄움
      return;
    } else {
      dispatch(userActions.loginDB(id, pwd));
    }
    // redux의 loginDB에 id, pwd를 보내줌
  };

  return (
    <React.Fragment>
      <Text>로그인</Text>

      <div>
        <Input
          label="아이디"
          value={id}
          placeholder="아이디를 입력해주세요"
          _onChange={changeId}
        />
      </div>

      <div>
        <Input
          label="비밀번호"
          value={pwd}
          type="password"
          placeholder="비밀번호를 입력해주세요"
          _onChange={changePwd}
        />
      </div>

      <Button text="로그인" _onClick={login} />

      <div>
        <button
        className="login_btn login_kakao"
          onClick={() => {
            window.location.href = KAKAO_AUTH_URL;
          }}
        >
          <img src={kakaoBtn} alt="카카오 로고" />
          <span className="">카카오 로그인</span>
        </button>
      </div>
    </React.Fragment>
  );
};

export default Login;
