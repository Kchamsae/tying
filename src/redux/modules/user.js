import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { setCookie, getCookie, deleteCookie } from '../../shared/Cookie';
import { apis } from '../../shared/apis';
// import { history } from "../redux/configureStore";

// actions
const SET_USER = 'SET_USER';
const OUT_USER = 'OUT_USER';
const SET_LOGIN_MODAL = 'SET_LOGIN_MODAL'

// action creators
const setUser = createAction(SET_USER, (user) => ({ user }));
const outUser = createAction(OUT_USER, () => ({}));
const setLoginModal = createAction(SET_LOGIN_MODAL,(set)=>({set}));

//initial state
const initialState = {
  user: null,
  is_login: false,
  login_modal: false,
};

//middleware actions
//회원가입
const signupDB = (id, nickname, pwd) => {
  return async function (dispatch, getState, { history }) {
    try{
      const doc = {id, nickname, pwd};
      const signup = await apis.signup(doc);
      if(signup.data.ok){
        return 'ok';
      }else if (signup.data.ok === false) {
        window.alert(signup.data.errorMessage);
      }
    }catch(err){
      console.log(err);
    }
  };
};

//로그인
const loginDB = (id, pwd) => {
  return async function (dispatch, getState, { history }) {
    try{
      const doc = {id, pwd}
      const login = await apis.login(doc)
      if(login.data.ok){
        setCookie('token', login.data.token, 1); // 토큰 쿠키에 저장
        dispatch(
          setUser({
            id: login.data.id,
            nickname: login.data.nickname,
            userId: login.data.userId,
          })
        );
        return 'ok'
      } else if (login.data.ok === false) {
        window.alert('아이디와 비밀번호를 다시 확인해주세요.');
      }
    }catch(err){
      console.log(err);
    }
  };
};

//로그인 유지
const loginCheckDB = (token) => {
  return async function (dispatch, getState, { history }) {
    apis
      .getLoginUserInfo()
      .then((res) => {
        console.log(res.data);
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
        console.log('에러발생', err);
      });
  };
};

// 카카오 로그인
const kakaoLoginDB = (code) => {
  return async function (dispatch, getState, { history }) {
    apis
      .kakaoLogin(code)
      .then(async (res) => {
        console.log('카카오 로그인 완료 : ', res);
        await setCookie('token', res.data.user.token, 1); // 토큰 쿠키에 저장
        dispatch(
          setUser({
            nickname: res.data.user.nickname,
          })
        );
      })
      .then(() => {
        window.alert('카카오 로그인이 완료 되었습니다!');
        history.push('/');
        // 로그인 성공 시 메인으로 이동
      })
      .catch((err) => {
        console.log('카카오 로그인실패', err);
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
        deleteCookie('token');
        //로그아웃 시 쿠키에서 토큰 삭제
        draft.user = null;
        draft.is_login = false;
    }),
    [SET_LOGIN_MODAL]:(state, action) =>
      produce(state, (draft) => {
        draft.login_modal = action.payload.set;
    }),
  },
  initialState
);

//action creator export
const actionCreators = {
  setUser,
  outUser,
  setLoginModal,
  signupDB,
  loginDB,
  loginCheckDB,
  kakaoLoginDB,
};

export { actionCreators };
