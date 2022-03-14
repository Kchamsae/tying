// 카카오 리다이렉트될 화면

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const KakaoRedirect = (props) => {
  const dispatch = useDispatch();

  // const user = useSelector((state) => state.user.user);

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  React.useEffect(() => {
    dispatch(userActions.kakaoLoginDB(code));
  }, []);

  return <div> Hello world! 카카오 코드 : ${code}</div>;
};

export default KakaoRedirect;
