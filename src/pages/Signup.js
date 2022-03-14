import React from "react";
// import styled from "styled-components";
import { Text, Button, Input } from "../elements/element";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import axios from "axios";
import { idCheck, nicknameCheck, pwdCheck } from "../shared/common";

const Signup = (props) => {
  const dispatch = useDispatch();

  //아이디, 닉네임, 비밀번호, 비밀번호 확인 확인
  const [id, setId] = React.useState("");
  const [nickname, setNickName] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwd_Check, setPwdCheck] = React.useState("");

  //아이디, 이메일 중복검사
  const [id_check, setIdCheck] = React.useState(false);
  const [nickname_check, setNicknameCheck] = React.useState(false);

  const idCheckF = () => {
      console.log("아이디 확인 : ", id);
  
      axios
        .post("http://13.209.69.234/api/signup/idCheck", {
          id: id,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.ok === true) {
            setIdCheck(res.data.ok);
            window.alert("사용 가능한 아이디입니다!");
          } else if (res.data.ok === false){
            window.alert("이미 사용 중인 아이디입니다!");
          }
        })
        .catch((err) => {
          console.log("아이디 중복", err);
          window.alert("아이디 중복확인에 문제가 생겼습니다!");
        });
  };
  
  //닉네임 중복체크
  const nicknameCheckF = () => {
      console.log("닉네임 확인 :", nickname);
  
      axios
        .post("http://13.209.69.234/api/signup/nicknameCheck", {
          nickname: nickname,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.ok === true) {
            setNicknameCheck(res.data.ok);
            window.alert("사용 가능한 닉네임입니다!");
          } else if (res.data.ok === false) {
            window.alert("이미 사용 중인 닉네임입니다!");
          }
        })
        .catch((err) => {
          console.log("닉네임 중복", err);
          window.alert("닉네임 중복확인에 문제가 생겼습니다!");
        });
  };

  //회원가입 시 입력 누락된 내역 있을 시 alert 띄워줌
  const signup = () => {
    if (id === "" || nickname === "" || pwd === "" || pwd_Check === "") {
      window.alert("입력하지 않은 칸이 있습니다!");
      return;
    }

    if (!id_check || !nickname_check) {
      window.alert("아이디나 닉네임의 중복검사가 통과되지 않았습니다!");
      return;
    }

    //회원가입 시 아이디, 닉네임, 비밀번호, 비밀번호 확인 유효성 검사
    if (!idCheck(id)) {
      window.alert("아이디 형식이 맞지 않습니다!");
      return;
    }

    if (!nicknameCheck(nickname)) {
      window.alert("닉네임 형식이 맞지 않습니다!");
      return;
    }

    if (!pwdCheck(pwd)) {
      window.alert("비밀번호 형식이 맞지 않습니다!");
      return;
    }

    if (pwd !== pwd_Check) {
      window.alert("비밀번호와 비밀번호 확인이 일치하지 않습니다!");
      return;
    }

    //signupDB에 회원가입 시 입력한 내역들을 보내주기
    dispatch(userActions.signupDB(id, nickname, pwd, pwd_Check));
  };

  return (
    <div className="Signup">
      <Text size="32px" bold>
        회원가입
      </Text>

      <div>
        <Input
          label="아이디"
          placeholder="아이디를 입력해주세요."
          _onChange={(e) => {
            setId(e.target.value);
            // id_check가 true(중복검사가 true라면) id수정하지 못하게
            if (id_check) {
              setIdCheck(false);
            }
          }}
        />

        {id !== "" && !idCheck(id) && (
          <Text color="red">아이디 형식이 올바르지 않습니다!</Text>
        )}
        {id !== "" && idCheck(id) && (
          <Text color="green">사용할 수 있는 아이디 형식입니다!</Text>
        )}

        <Button _disabled={id_check ? true : false} _onClick={idCheckF}>
          중복확인
        </Button>
      </div>

      <div>
        <Input
          label="닉네임"
          placeholder="닉네임을 입력해주세요."
          _onChange={(e) => {
            setNickName(e.target.value);
            // nickname_check true(중복검사가 true라면) nickname수정하지 못하게
            if (nickname_check) {
              setNicknameCheck(false);
            }
          }}
        ></Input>

        <Button
          _disabled={nickname_check ? true : false}
          _onClick={nicknameCheckF}
        >
          중복확인
        </Button>

        {nickname !== "" && !nicknameCheck(nickname) && (
          <Text color="red">닉네임 형식이 올바르지 않습니다!</Text>
        )}
        {nickname !== "" && nicknameCheck(nickname) && (
          <Text color="green">사용할 수 있는 닉네임 형식입니다!</Text>
        )}
      </div>

      <div>
        <Input
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          type="password"
          _onChange={(e) => {
            setPwd(e.target.value);
          }}
        />
        {pwd !== "" && !pwdCheck(pwd) && (
          <Text color="red">
            비밀번호는 최소 10자 이상으로 최소 하나의 문자, 하나의 숫자 및
            하나의 특수 문자를 포함하여야 합니다.
          </Text>
        )}
        {pwd !== "" && pwdCheck(pwd) && (
          <Text color="green">올바른 비밀번호 형식입니다.</Text>
        )}
      </div>

      <div>
        <Input
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력해주세요."
          type="password"
          _onChange={(e) => {
            setPwdCheck(e.target.value);
          }}
        />
      </div>

      <Button text="회원가입" _onClick={signup}></Button>
    </div>
  );
};

Signup.defaultProps = {};

export default Signup;
