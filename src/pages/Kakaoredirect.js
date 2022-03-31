// 카카오 리다이렉트될 화면
import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import Image from '../elements/Image';

const KakaoRedirect = (props) => {
  const dispatch = useDispatch();

  // const user = useSelector((state) => state.user.user);

  // 인가코드
  let code = new URL(window.location.href).searchParams.get('code');

  React.useEffect(() => {
    dispatch(userActions.kakaoLoginDB(code));
  }, []);

  return (
    <>
      <LoadingWrap>
        <Image src={'/static/Spinner.gif'} size='10vw' margin='auto' />
      </LoadingWrap>
    </>
  );
};

const LoadingWrap = styled.div`
  position: fixed;
  top: calc(50% - 5vw);
  left: calc(50% - 5vw);
`;

export default KakaoRedirect;