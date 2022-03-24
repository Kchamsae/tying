import React from 'react';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { apis } from '../shared/apis';
import { idCheck, nicknameCheck, pwdCheck } from '../shared/signupRegex';

const Signup = (props) => {
  const dispatch = useDispatch();

  // modal창 관리 state
  const [modals_state, setModalsState] = React.useState('signup');

  //아이디, 닉네임, 비밀번호, 비밀번호 확인 확인
  const [id, setId] = React.useState('');
  const [nickname, setNickName] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [pwd_Check, setPwdCheck] = React.useState('');

  //아이디, 닉네임 중복검사
  const [id_check, setIdCheck] = React.useState(false);
  const [nickname_check, setNicknameCheck] = React.useState(false);

  //아이디, 닉네임 중복검사 아이콘 조건
  const [id_checker, setIdChecker] = React.useState(3);
  const [nickname_checker, setNicknameChecker] = React.useState(6);

  //아이디 중복체크
  const idCheckF = () => {
    console.log('아이디 확인 : ', id);
    if (!idCheck(id)) {
      alert('아이디 형식이 올바르지 않습니다!');
      return;
    }

    apis
      .idDuplicateCheck({
        id: id,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.ok === true) {
          setIdCheck(res.data.ok);
          //사용 가능한 아이디인 경우 체크 아이콘으로 변경
          setIdChecker(1);
          window.alert('사용 가능한 아이디입니다!');
        } else if (res.data.ok === false) {
          //사용 불가능한 아이디인 경우 엑스 아이콘으로 변경
          setIdChecker(2);
          window.alert('이미 사용 중인 아이디입니다!');
        }
      })
      .catch((err) => {
        console.log('아이디 중복', err);
        window.alert('아이디 중복확인에 문제가 생겼습니다!');
      });
  };

  //닉네임 중복체크
  const nicknameCheckF = () => {
    console.log('닉네임 확인 :', nickname);
    if (!nicknameCheck(nickname)) {
      alert('닉네임 형식이 올바르지 않습니다!');
      return;
    }

    apis
      .nicknameDuplicateCheck({
        nickname: nickname,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.ok === true) {
          setNicknameCheck(res.data.ok);
          //사용 가능한 닉네임인 경우 체크 아이콘으로 변경
          setNicknameChecker(4);
          window.alert('사용 가능한 닉네임입니다!');
        } else if (res.data.ok === false) {
          //사용 불가능한 닉네임인 경우 엑스 아이콘으로 변경
          setNicknameChecker(5);
          window.alert('이미 사용 중인 닉네임입니다!');
        }
      })
      .catch((err) => {
        console.log('닉네임 중복', err);
        window.alert('닉네임 중복확인에 문제가 생겼습니다!');
      });
  };

  //회원가입 시 입력 누락된 내역 있을 시 alert 띄워줌
  const signup = () => {
    if (id === '' || nickname === '' || pwd === '' || pwd_Check === '') {
      window.alert('입력하지 않은 칸이 있습니다!');
      return;
    }

    //아이디, 닉네임 중복검사 통과 실패 시 alert 띄워줌
    if (!id_check || !nickname_check) {
      window.alert('아이디나 닉네임의 중복검사가 통과되지 않았습니다!');
      return;
    }

    //회원가입 시 아이디, 닉네임, 비밀번호, 비밀번호 확인 유효성 검사
    if (!idCheck(id)) {
      window.alert('아이디 형식이 맞지 않습니다!');
      return;
    }

    if (!nicknameCheck(nickname)) {
      window.alert('닉네임 형식이 맞지 않습니다!');
      return;
    }

    if (!pwdCheck(pwd)) {
      window.alert('비밀번호 형식이 맞지 않습니다!');
      return;
    }

    if (pwd !== pwd_Check) {
      window.alert('비밀번호와 비밀번호 확인이 일치하지 않습니다!');
      return;
    }

    //signupDB에 회원가입 시 입력한 내역들을 보내주기
    dispatch(userActions.signupDB(id, nickname, pwd, pwd_Check));
    props.setModalState('login');
  };

  return (
    <React.Fragment>
      {modals_state === 'signup' && (
        <ModalsBox>
          <div className='modal-wrapper'>
            <div className='white_block'>
              <div className='tying-welcome-logo'>
                <svg
                  width='368'
                  height='52'
                  viewBox='0 0 368 52'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M10.9416 14.48H19.9416L22.5416 32.04L25.2216 19.16H34.5416L37.2616 32.04L39.8616 14.48H48.8616L42.6216 42H33.3016L29.9016 27.2L26.5016 42H17.1816L10.9416 14.48ZM59.635 42.32C57.4217 42.32 55.4483 41.88 53.715 41C52.0083 40.0933 50.675 38.8667 49.715 37.32C48.755 35.7467 48.275 33.9733 48.275 32C48.275 29.9733 48.7683 28.1733 49.755 26.6C50.7417 25.0267 52.075 23.8133 53.755 22.96C55.435 22.1067 57.3017 21.68 59.355 21.68C61.3283 21.68 63.0083 22.12 64.395 23C65.8083 23.8533 66.8617 25.0267 67.555 26.52C68.2483 27.9867 68.595 29.64 68.595 31.48C68.595 31.96 68.5683 32.3067 68.515 32.52L56.515 34.08C56.835 35.0133 57.355 35.6933 58.075 36.12C58.795 36.52 59.7417 36.72 60.915 36.72C62.7283 36.72 64.6883 36.2533 66.795 35.32L67.795 40.68C65.315 41.7733 62.595 42.32 59.635 42.32ZM62.395 29.04C61.9683 27.36 60.955 26.52 59.355 26.52C58.395 26.52 57.635 26.88 57.075 27.6C56.515 28.32 56.2217 29.2533 56.195 30.4L62.395 29.04ZM77.9416 42.32C75.6749 42.32 73.9149 41.6133 72.6616 40.2C71.4349 38.76 70.8216 36.8 70.8216 34.32V15.64L79.2616 14.4V33.72C79.2616 34.4667 79.4349 35.0133 79.7816 35.36C80.1549 35.68 80.7949 35.84 81.7016 35.84C82.3682 35.84 83.0216 35.68 83.6616 35.36L83.9416 40.96C82.1549 41.8667 80.1549 42.32 77.9416 42.32ZM95.2987 42.32C93.1654 42.32 91.2721 41.8933 89.6187 41.04C87.9921 40.16 86.7121 38.9333 85.7787 37.36C84.8721 35.7867 84.4187 34 84.4187 32C84.4187 30.08 84.8987 28.3333 85.8587 26.76C86.8187 25.1867 88.1254 23.9467 89.7787 23.04C91.4321 22.1333 93.2721 21.68 95.2987 21.68C97.8854 21.68 99.9254 22.2133 101.419 23.28L100.659 28.6C99.1387 28.1467 97.8854 27.92 96.8987 27.92C95.6187 27.92 94.6054 28.2933 93.8587 29.04C93.1121 29.76 92.7387 30.7467 92.7387 32C92.7387 33.2533 93.1121 34.2533 93.8587 35C94.6054 35.7467 95.5921 36.12 96.8187 36.12C97.8854 36.12 99.1387 35.8933 100.579 35.44L101.339 41.04C100.432 41.4933 99.5121 41.8133 98.5787 42C97.6454 42.2133 96.5521 42.32 95.2987 42.32ZM113.972 42.32C111.732 42.32 109.732 41.88 107.972 41C106.238 40.12 104.878 38.9067 103.892 37.36C102.932 35.7867 102.452 33.9867 102.452 31.96C102.452 29.9333 102.945 28.1467 103.932 26.6C104.918 25.0267 106.278 23.8133 108.012 22.96C109.772 22.1067 111.772 21.68 114.012 21.68C116.278 21.68 118.278 22.12 120.012 23C121.772 23.8533 123.132 25.0533 124.092 26.6C125.052 28.1467 125.532 29.9333 125.532 31.96C125.532 34.0133 125.038 35.8267 124.052 37.4C123.092 38.9467 121.732 40.16 119.972 41.04C118.238 41.8933 116.238 42.32 113.972 42.32ZM114.052 36.32C115.145 36.32 116.038 35.92 116.732 35.12C117.452 34.2933 117.812 33.24 117.812 31.96C117.812 30.68 117.452 29.64 116.732 28.84C116.038 28.0133 115.145 27.6 114.052 27.6C112.958 27.6 112.052 28.0133 111.332 28.84C110.638 29.64 110.292 30.68 110.292 31.96C110.292 33.24 110.638 34.2933 111.332 35.12C112.052 35.92 112.958 36.32 114.052 36.32ZM127.93 22.24H135.97V26.32C136.876 24.7467 137.903 23.5867 139.05 22.84C140.223 22.0667 141.61 21.68 143.21 21.68C144.783 21.68 146.143 22.08 147.29 22.88C148.463 23.6533 149.343 24.7067 149.93 26.04C151.636 23.1333 154.116 21.68 157.37 21.68C158.916 21.68 160.263 22.0933 161.41 22.92C162.583 23.7467 163.49 24.9467 164.13 26.52C164.77 28.0667 165.09 29.8933 165.09 32V42H156.65V32C156.65 30.64 156.41 29.6133 155.93 28.92C155.476 28.2267 154.836 27.88 154.01 27.88C153.103 27.88 152.316 28.2667 151.65 29.04C151.01 29.8133 150.69 30.7467 150.69 31.84V42H142.33V32C142.33 30.64 142.09 29.6133 141.61 28.92C141.156 28.2267 140.503 27.88 139.65 27.88C138.743 27.88 137.97 28.2667 137.33 29.04C136.69 29.8133 136.37 30.7467 136.37 31.84V42H127.93V22.24ZM178.744 42.32C176.531 42.32 174.558 41.88 172.824 41C171.118 40.0933 169.784 38.8667 168.824 37.32C167.864 35.7467 167.384 33.9733 167.384 32C167.384 29.9733 167.878 28.1733 168.864 26.6C169.851 25.0267 171.184 23.8133 172.864 22.96C174.544 22.1067 176.411 21.68 178.464 21.68C180.438 21.68 182.118 22.12 183.504 23C184.918 23.8533 185.971 25.0267 186.664 26.52C187.358 27.9867 187.704 29.64 187.704 31.48C187.704 31.96 187.678 32.3067 187.624 32.52L175.624 34.08C175.944 35.0133 176.464 35.6933 177.184 36.12C177.904 36.52 178.851 36.72 180.024 36.72C181.838 36.72 183.798 36.2533 185.904 35.32L186.904 40.68C184.424 41.7733 181.704 42.32 178.744 42.32ZM181.504 29.04C181.078 27.36 180.064 26.52 178.464 26.52C177.504 26.52 176.744 26.88 176.184 27.6C175.624 28.32 175.331 29.2533 175.304 30.4L181.504 29.04ZM205.632 42.32C203.285 42.32 201.459 41.6533 200.152 40.32C198.845 38.96 198.192 37.0933 198.192 34.72V26.92H195.632V21.96H198.792L202.512 14.4H206.552V21.96H211.192V26.92H206.552V33.72C206.552 34.3867 206.765 34.9067 207.192 35.28C207.619 35.6533 208.219 35.84 208.992 35.84C209.712 35.84 210.365 35.68 210.952 35.36L211.272 40.96C210.605 41.36 209.739 41.6933 208.672 41.96C207.632 42.2 206.619 42.32 205.632 42.32ZM223.784 42.32C221.544 42.32 219.544 41.88 217.784 41C216.051 40.12 214.691 38.9067 213.704 37.36C212.744 35.7867 212.264 33.9867 212.264 31.96C212.264 29.9333 212.757 28.1467 213.744 26.6C214.731 25.0267 216.091 23.8133 217.824 22.96C219.584 22.1067 221.584 21.68 223.824 21.68C226.091 21.68 228.091 22.12 229.824 23C231.584 23.8533 232.944 25.0533 233.904 26.6C234.864 28.1467 235.344 29.9333 235.344 31.96C235.344 34.0133 234.851 35.8267 233.864 37.4C232.904 38.9467 231.544 40.16 229.784 41.04C228.051 41.8933 226.051 42.32 223.784 42.32ZM223.864 36.32C224.957 36.32 225.851 35.92 226.544 35.12C227.264 34.2933 227.624 33.24 227.624 31.96C227.624 30.68 227.264 29.64 226.544 28.84C225.851 28.0133 224.957 27.6 223.864 27.6C222.771 27.6 221.864 28.0133 221.144 28.84C220.451 29.64 220.104 30.68 220.104 31.96C220.104 33.24 220.451 34.2933 221.144 35.12C221.864 35.92 222.771 36.32 223.864 36.32ZM249.483 20.56H243.763V14.48H264.523V20.56H258.803V42H249.483V20.56ZM275.737 51.16C274.27 51.16 272.87 51.0133 271.537 50.72L272.177 44.8C273.217 44.96 274.177 45.04 275.057 45.04C276.63 45.04 277.83 44.56 278.657 43.6C279.484 42.6667 279.91 40.8933 279.937 38.28C278.55 40.9467 276.324 42.28 273.257 42.28C270.67 42.28 268.644 41.3733 267.177 39.56C265.737 37.72 265.017 35.1867 265.017 31.96V21.96H273.417V33.2C273.417 34.1067 273.67 34.8667 274.177 35.48C274.684 36.0667 275.377 36.36 276.257 36.36C277.164 36.36 277.897 35.9733 278.457 35.2C279.044 34.4267 279.337 33.4133 279.337 32.16V21.96H287.777V36.92C287.777 41.56 286.737 45.0933 284.657 47.52C282.577 49.9467 279.604 51.16 275.737 51.16ZM298.256 42.32C296.016 42.32 294.269 41.6 293.016 40.16C291.762 38.72 291.136 36.76 291.136 34.28V21.96H299.616V33.92C299.616 34.5333 299.776 35.0133 300.096 35.36C300.442 35.68 300.882 35.84 301.416 35.84C301.949 35.84 302.496 35.68 303.056 35.36L303.496 40.92C302.909 41.3733 302.136 41.72 301.176 41.96C300.242 42.2 299.269 42.32 298.256 42.32ZM295.376 18.96C294.122 18.96 293.056 18.5733 292.176 17.8C291.322 17 290.896 16.0267 290.896 14.88C290.896 13.7333 291.349 12.7733 292.256 12C293.162 11.2267 294.202 10.84 295.376 10.84C296.602 10.84 297.656 11.24 298.536 12.04C299.442 12.84 299.896 13.7867 299.896 14.88C299.896 16.0533 299.442 17.0267 298.536 17.8C297.629 18.5733 296.576 18.96 295.376 18.96ZM305.225 22.24H313.265V26.32C314.812 23.2267 317.265 21.68 320.625 21.68C323.185 21.68 325.185 22.6 326.625 24.44C328.092 26.2533 328.825 28.7733 328.825 32V42H320.425V31.16C320.425 30.0133 320.172 29.1333 319.665 28.52C319.185 27.9067 318.505 27.6 317.625 27.6C316.985 27.6 316.358 27.8133 315.745 28.24C315.132 28.64 314.625 29.2267 314.225 30C313.852 30.7733 313.665 31.6533 313.665 32.64V42H305.225V22.24ZM343.406 51.16C341.939 51.16 340.539 51.0133 339.206 50.72L339.846 44.8C340.886 44.96 341.846 45.04 342.726 45.04C344.379 45.04 345.633 44.5467 346.486 43.56C347.339 42.6 347.846 40.9733 348.006 38.68C346.433 40.8933 344.033 42 340.806 42C339.046 42 337.419 41.5467 335.926 40.64C334.459 39.7333 333.286 38.5067 332.406 36.96C331.553 35.4133 331.126 33.72 331.126 31.88C331.126 30.0133 331.553 28.3067 332.406 26.76C333.259 25.1867 334.419 23.9467 335.886 23.04C337.379 22.1333 339.006 21.68 340.766 21.68C342.393 21.68 343.806 22.1067 345.006 22.96C346.233 23.7867 347.033 24.9067 347.406 26.32V21.68H355.846V36.92C355.846 41.5867 354.779 45.12 352.646 47.52C350.539 49.9467 347.459 51.16 343.406 51.16ZM343.406 36C344.473 36 345.393 35.6267 346.166 34.88C346.939 34.1067 347.353 33.2 347.406 32.16V31.84C347.353 30.8267 346.926 29.9333 346.126 29.16C345.353 28.3867 344.446 28 343.406 28C342.313 28 341.379 28.4 340.606 29.2C339.833 29.9733 339.446 30.9067 339.446 32C339.446 33.0933 339.833 34.04 340.606 34.84C341.379 35.6133 342.313 36 343.406 36Z'
                    fill='black'
                  />
                  <circle cx='295' cy='15' r='5' fill='#FF2E00' />
                </svg>
              </div>

              <div className='signup-title'>
                <span>회원가입</span>
              </div>

              <div className='signup-form-wrapper'>
                <div className='signup-form'>
                  <input
                    type='id'
                    placeholder='아이디를 입력하세요.'
                    onChange={(e) => {
                      setId(e.target.value);
                      // 중복검사 결과가 성공(1) 혹은 실패(2)여도 다시 수정 가능하도록 중복검사 버튼으로 보여주기
                      if (id_checker === 1 || id_checker === 2) {
                        setIdChecker(3);
                      }
                      // id_check가 true(중복검사가 true라면) id수정하지 못하게
                      if (id_check) {
                        setIdCheck(false);
                      }
                    }}
                  />

                  {id !== '' && !idCheck(id) && (
                    <p className='incorrect-id'>
                      아이디 형식이 올바르지 않습니다.
                    </p>
                  )}

                  {id !== '' && idCheck(id) && (
                    <p className='correct-id'>
                      사용할 수 있는 아이디 형식입니다.
                    </p>
                  )}
                </div>

                <div className='id-checkers'>
                  {id_checker === 1 && (
                    //사용 가능한 아이디인 경우 체크 아이콘으로 변경
                    <svg
                      width='25'
                      height='25'
                      viewBox='0 0 25 25'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle
                        cx='12.5'
                        cy='12.5'
                        r='11.5'
                        stroke='#2190FE'
                        strokeWidth='2'
                      />
                      <path
                        d='M6.54688 11.9317L11.0727 16.6615L19.0469 8.32812'
                        stroke='#2190FE'
                        strokeWidth='2'
                        stroke-linecap='round'
                      />
                    </svg>
                  )}

                  {id_checker === 2 && (
                    //사용 불가능한 아이디인 경우 엑스 아이콘으로 변경
                    <svg
                      className='id-no-icon'
                      width='25'
                      height='25'
                      viewBox='0 0 25 25'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle
                        cx='12.5'
                        cy='12.5'
                        r='11.5'
                        stroke='#FF2E00'
                        strokeWidth='2'
                      />
                      <path
                        d='M8 17L17 8'
                        stroke='#FF2E00'
                        strokeWidth='2'
                        stroke-linecap='round'
                      />
                      <path
                        d='M8 8L17 17'
                        stroke='#FF2E00'
                        strokeWidth='2'
                        stroke-linecap='round'
                      />
                    </svg>
                  )}

                  {id_checker === 3 && (
                    //중복확인 버튼
                    <button
                      disabled={id_check ? true : false}
                      onClick={idCheckF}
                    >
                      중복확인
                    </button>
                  )}
                </div>
              </div>

              <div className='nickname-form-wrapper'>
                <div className='nickname-form'>
                  <input
                    type='nickname'
                    placeholder='닉네임을 입력하세요.'
                    onChange={(e) => {
                      setNickName(e.target.value);
                      // 중복검사 결과가 성공(4) 혹은 실패(5)여도 다시 수정 가능하도록 중복검사 버튼으로 보여주기
                      if (nickname_checker === 4 || nickname_checker === 5) {
                        setNicknameChecker(6);
                      }
                      // nickname_check true(중복검사가 true라면) nickname수정하지 못하게
                      if (nickname_check) {
                        setNicknameCheck(false);
                      }
                    }}
                  />

                  {nickname !== '' && !nicknameCheck(nickname) && (
                    <p className='incorrect-nickname'>
                      닉네임 형식이 올바르지 않습니다.
                    </p>
                  )}
                  {nickname !== '' && nicknameCheck(nickname) && (
                    <p className='correct-nickname'>
                      사용할 수 있는 닉네임 형식입니다.
                    </p>
                  )}
                </div>

                <div className='nickname-checkers'>
                  {nickname_checker === 4 && (
                    //사용 가능한 닉네임인 경우 체크 아이콘으로 변경
                    <svg
                      width='25'
                      height='25'
                      viewBox='0 0 25 25'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle
                        cx='12.5'
                        cy='12.5'
                        r='11.5'
                        stroke='#2190FE'
                        strokeWidth='2'
                      />
                      <path
                        d='M6.54688 11.9317L11.0727 16.6615L19.0469 8.32812'
                        stroke='#2190FE'
                        strokeWidth='2'
                        stroke-linecap='round'
                      />
                    </svg>
                  )}

                  {nickname_checker === 5 && (
                    //사용 불가능한 닉네임인 경우 엑스 아이콘으로 변경
                    <svg
                      width='25'
                      height='25'
                      viewBox='0 0 25 25'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle
                        cx='12.5'
                        cy='12.5'
                        r='11.5'
                        stroke='#FF2E00'
                        strokeWidth='2'
                      />
                      <path
                        d='M8 17L17 8'
                        stroke='#FF2E00'
                        strokeWidth='2'
                        stroke-linecap='round'
                      />
                      <path
                        d='M8 8L17 17'
                        stroke='#FF2E00'
                        strokeWidth='2'
                        stroke-linecap='round'
                      />
                    </svg>
                  )}

                  {nickname_checker === 6 && (
                    //중복확인 버튼
                    <button
                      disabled={nickname_check ? true : false}
                      onClick={nicknameCheckF}
                    >
                      중복확인
                    </button>
                  )}
                </div>
              </div>

              <div className='pwd-form'>
                <input
                  type='password'
                  placeholder='비밀번호를 입력하세요.'
                  onChange={(e) => {
                    setPwd(e.target.value);
                  }}
                />

                {pwd !== '' && !pwdCheck(pwd) && (
                  <p className='incorrect-pwd'>
                    최소 하나의 숫자, 특수문자를 포함한 10자 이상의 비밀번호.
                  </p>
                )}
                {pwd !== '' && pwdCheck(pwd) && (
                  <p className='correct-pwd'>올바른 비밀번호 형식입니다.</p>
                )}
              </div>

              <div className='pwd-check-form'>
                <input
                  type='password'
                  placeholder='비밀번호를 다시 입력하세요.'
                  onChange={(e) => {
                    setPwdCheck(e.target.value);
                  }}
                />

                {pwd !== '' && !pwdCheck(pwd_Check) && (
                  <p className='incorrect-pwd-check'>
                    비밀번호가 일치하지 않습니다.
                  </p>
                )}
                {pwd !== '' && pwdCheck(pwd_Check) && (
                  <p className='correct-pwd-check'>비밀번호가 일치합니다.</p>
                )}
              </div>

              <button className='signup-button' onClick={signup}>
                회원가입
              </button>
            </div>
          </div>
        </ModalsBox>
      )}
    </React.Fragment>
  );
};

const ModalsBox = styled.div`
  width: 478px;
  height: 616px;
  position: fixed;
  top: calc(50% - 239px);
  left: calc(50% - 239px);
  z-index: 10000;
  background-color: #f9f9f9;
  border-radius: 20px;
  /* display: flex; */
  justify-content: center;
  padding: 75px;
  box-sizing: border-box;

  .tying-welcome-logo {
    display: flex;
  }

  .signup-title {
    width: 223px;
    height: 35px;
    left: 127px;
    top: 98px;
    justify-content: center;
    margin: auto;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 600;
    font-size: 19px;
    line-height: 27px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: -0.015em;

    color: #878889;
  }

  .signup-form-wrapper {
    position: relative;
    width: min-content;
    margin: auto;

    .signup-form {
      text-align: center;
      margin-top: 40px;

      input {
        display: block;
        margin: auto;
        width: 278px;
        height: 48px;
        font-size: 16px;
        margin-top: 8px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        color: #212529;

        border: 1px solid rgb(222, 226, 230);
        border-radius: 20px;
        flex: 1 1 0%;
        box-sizing: border-box;
        padding: 1rem;
        background: #fff;
        outline: none;

        &:focus {
          border: 1px solid #212529;
        }
      }
      > p {
        position: absolute;
        width: max-content;
        padding-left: 10px;
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-size: 12px;
        &.incorrect-id {
          margin-top: 5px;
          color: #ff2e00;
        }
        &.correct-id {
          margin-top: 5px;
          color: #2190fe;
        }
      }
    }
    .id-checkers {
      position: absolute;
      top: 20%;
      right: -24.5%;
      text-align: left;
      width: 60px;
      height: 32px;
      button {
        width: 60px;
        height: 32px;
        left: 30px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        text-align: center;
        letter-spacing: -0.015em;

        color: #ffffff;

        background: #bdbdbd;
        border: none #bdbdbd;
        box-sizing: border-box;
        border-radius: 5px;
        outline: none;

        &:hover {
          background-color: #e6e7e8;
          border: none;
        }
      }
    }
  }

  .nickname-form-wrapper {
    position: relative;
    width: min-content;
    margin: auto;

    .nickname-form {
      text-align: center;
      margin-top: 15px;

      input {
        display: block;
        margin: auto;
        width: 278px;
        height: 48px;
        font-size: 16px;
        margin-top: 27px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        color: #212529;

        border: 1px solid rgb(222, 226, 230);
        border-radius: 20px;
        flex: 1 1 0%;
        box-sizing: border-box;
        padding: 1rem;
        background: #fff;
        outline: none;

        &:focus {
          border: 1px solid #212529;
        }
      }
      > p {
        position: absolute;
        width: max-content;
        padding-left: 10px;
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-size: 12px;
        &.incorrect-nickname {
          margin-top: 5px;
          color: #ff2e00;
        }
        &.correct-nickname {
          margin-top: 5px;
          color: #2190fe;
        }
      }
    }
    .nickname-checkers {
      position: absolute;
      top: 20%;
      right: -24.5%;
      text-align: left;
      width: 60px;
      height: 32px;
      button {
        width: 60px;
        height: 32px;
        left: 30px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        text-align: center;
        letter-spacing: -0.015em;

        color: #ffffff;

        background: #bdbdbd;
        border: none #bdbdbd;
        box-sizing: border-box;
        border-radius: 5px;
        outline: none;

        &:hover {
          background-color: #e6e7e8;
          border: none;
        }
      }
    }
  }
  .pwd-form {
    text-align: center;
    margin-top: 15px;

    input {
      display: block;
      margin: auto;
      width: 278px;
      height: 48px;
      font-size: 16px;
      margin-top: 27px;

      font-family: 'Noto Sans KR';
      font-style: normal;
      color: #212529;

      border: 1px solid rgb(222, 226, 230);
      border-radius: 20px;
      flex: 1 1 0%;
      box-sizing: border-box;
      padding: 1rem;
      background: #fff;
      outline: none;

      &:focus {
        border: 1px solid #212529;
      }
    }
    > p {
      position: absolute;
      margin-left: 26px;
      width: max-content;
      padding-left: 10px;
      font-family: 'Noto Sans KR';
      font-style: normal;
      font-size: 12px;
      &.incorrect-pwd {
        margin-top: 5px;
        color: #ff2e00;
      }
      &.correct-pwd {
        margin-top: 5px;
        color: #2190fe;
      }
    }
  }

  .pwd-check-form {
    text-align: center;
    margin-top: 15px;

    input {
      display: block;
      margin: auto;
      width: 278px;
      height: 48px;
      font-size: 16px;
      margin-top: 27px;

      font-family: 'Noto Sans KR';
      font-style: normal;
      color: #212529;

      border: 1px solid rgb(222, 226, 230);
      border-radius: 20px;
      flex: 1 1 0%;
      box-sizing: border-box;
      padding: 1rem;
      background: #fff;
      outline: none;

      &:focus {
        border: 1px solid #212529;
      }
    }
    > p {
      position: absolute;
      margin-left: 26px;
      width: max-content;
      padding-left: 10px;
      font-family: 'Noto Sans KR';
      font-style: normal;
      font-size: 12px;
      &.incorrect-pwd-check {
        margin-top: 5px;
        color: #ff2e00;
      }
      &.correct-pwd-check {
        margin-top: 5px;
        color: #2190fe;
      }
    }
  }
  .signup-button {
    display: block;
    margin: auto;
    width: 268px;
    height: 48px;
    margin-top: 27px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    letter-spacing: -0.015em;

    color: #ffffff;

    background: #ff2e00;
    border: 3px solid #ff2e00;
    box-sizing: border-box;
    border-radius: 20px;
    outline: none;

    &:hover {
      background-color: #e6e7e8;
      border: none;
    }
  }
`;

Signup.defaultProps = {};

export default Signup;
