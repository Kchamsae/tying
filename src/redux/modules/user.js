import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import { apis } from "../../shared/apis";
// import { history } from "../redux/configureStore";

// actions
const SET_USER = "SET_USER";
const OUT_USER = "OUT_USER";

// action creators
const setUser = createAction(SET_USER, (user) => ({ user }));
const outUser = createAction(OUT_USER, () => ({}));

//initial state
const initialState = {
  user: null,
  is_login: false,
};

//middleware actions
//회원가입
const signupDB = (id, nickname, pwd) => {
  return async function (dispatch, getState, { history }) {
    console.log("id : ", id, "nickname : ", nickname, "pwd : ", pwd);

    apis
      .signup({
        id: id,
        nickname: nickname,
        pwd: pwd,
      })
      //회원가입 시 서버로 해당 값들 보냄
      .then((res) => {
        console.log(res);
        if (res.data.ok === true) {
          window.alert("성공적으로 회원가입하셨습니다!");
        } else if (res.data.ok === false) {
          window.alert(res.data.errorMessage);
        }
      })
      .catch((err) => {
        alert("회원가입에 실패했습니다.");
        console.log(err);
      });
  };
};

//로그인
const loginDB = (id, pwd) => {
  console.log(id, pwd);
  return async function (dispatch, getState, { history }) {
    apis
      .login({
        id: id,
        pwd: pwd,
      })
      .then((res) => {
        if (res.data.ok) {
          setCookie("token", res.data.token, 1); // 토큰 쿠키에 저장
          dispatch(
            setUser({
              id: res.data.id,
              nickname: res.data.nickname,
              userId: res.data.userId,
            })
          );
          return "ok";
        } else if (res.data.ok === false) {
          window.alert("아이디와 비밀번호를 다시 확인해주세요.");
        }
      })
      .catch((err) => {
        window.alert("아이디와 비밀번호를 다시 확인해주세요.");
        console.log(err);
      });
  };
};

//로그인 유지
const loginCheckDB = (token) => {
  return async function (dispatch, getState, { history }) {
    apis
      .getLoginUserInfo()
      .then((res) => {
        if (res.data.ok === true) {
          dispatch(
            setUser({
              id: res.data.id,
              nickname: res.data.nickname,
              userId: res.data.userId,
            })
          );
        } else {
          dispatch(outUser());
          //토큰 유효시간 만료 후 자동 로그아웃 처리
        }
      })
      .catch((err) => {
        console.log("에러발생", err);
      });
  };
};

// 카카오 로그인
const kakaoLoginDB = (code) => {
  return async function (dispatch, getState, { history }) {
    apis
      .kakaoLogin(code)
      .then(async (res) => {
        console.log("카카오확인", res);
        await setCookie("token", res.data.user.token, 1); // 토큰 쿠키에 저장
        dispatch(
          setUser({
            nickname: res.data.user.nickname,
          })
        );
      })
      .then(() => {
        window.alert("카카오 로그인이 완료 되었습니다!");
        history.push("/");
        // 로그인 성공 시 메인으로 이동
      })
      .catch((err) => {
        console.log("카카오 로그인실패", err);
      });
  };
};

//reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
        //원본값을 복사한 값을 draft로 받아옴
      }),
    [OUT_USER]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("token");
        //로그아웃 시 쿠키에서 토큰 삭제
        draft.user = null;
        draft.is_login = false;
      }),
  },
  initialState
);

//action creator export
const actionCreators = {
  setUser,
  outUser,
  signupDB,
  loginDB,
  loginCheckDB,
  kakaoLoginDB,
};

export { actionCreators };
