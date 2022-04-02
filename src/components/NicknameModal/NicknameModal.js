import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";
import { apis } from "../../shared/apis";
import { nicknameCheck } from "../../shared/signupRegex";
import { alertNew } from "../../shared/alert";
import { 
  ModalWrapper,
  ModalBox,
  CloseButton,
  TyingLogo,
  NicknameEditTitle,
  NicknameFormWrapper,
  NicknameForm,
  NicknameCheckers,
  NicknameCheckButton,
  EditNicknameButton,
} from './style';

const NicknameModal = (props) => {
  const dispatch = useDispatch();

  // modal창 관리 state
  const [nickname_modal, setNicknameModal] = React.useState(false);
  const [fade_out, setFadeOut] = React.useState(false);

  // input창에 기존 닉네임 불러오기
  const user_nickname = useSelector((state) => state.user.user.nickname);

  //닉네임 수정 구현부
  const editNickname = () => {
    dispatch(userActions.editUserDB(nickname)).then((res) => {
      if (res === "ok") {
        dispatch(userActions.setNicknameModal(false));
      }
    });
    console.log("nickname : ", nickname);
  };

  //닉네임 확인
  const [nickname, setNickName] = React.useState("");

  //닉네임 중복검사
  const [nickname_check, setNicknameCheck] = React.useState(false);

  //닉네임 중복검사 아이콘 조건
  const [nickname_checker, setNicknameChecker] = React.useState(6);

  //닉네임 중복체크
  const nicknameCheckF = () => {
    console.log("닉네임 확인 :", nickname);
    if (!nicknameCheck(nickname)) {
      alertNew("닉네임 형식이 올바르지 않습니다!");
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
          alertNew("사용 가능한 닉네임입니다!");
        } else if (res.data.ok === false) {
          //사용 불가능한 닉네임인 경우 엑스 아이콘으로 변경
          setNicknameChecker(5);
          alertNew("이미 사용 중인 닉네임입니다!");
        }
      })
      .catch((err) => {
        console.log("닉네임 중복", err);
        alertNew("닉네임 중복확인에 문제가 생겼습니다!");
      });
  };

  const openModal = () => {
    setFadeOut(false);
    setNicknameModal(true);
  };

  const closeModal = () => {
    setFadeOut(true);
    setTimeout(() => {
      setNicknameModal(false);
    }, 400);
  };

  return (
    <>
      <ModalWrapper>
        <ModalBox>
          <CloseButton
            onClick={() => {
              dispatch(userActions.setNicknameModal(false));
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 24C18.6274 24 24 18.6273 24 12C24 5.3727 18.6274 0 12 0C5.37257 0 0 5.3727 0 12C0 18.6273 5.37257 24 12 24ZM17.3163 6.68382C17.7574 7.12466 17.7574 7.83984 17.3163 8.28102L13.5972 12L17.3163 15.719C17.7573 16.1602 17.7573 16.8753 17.3163 17.3162C16.8752 17.7574 16.1601 17.7574 15.719 17.3162L12 13.5972L8.28098 17.3162C7.83993 17.7574 7.12483 17.7574 6.68374 17.3162C6.24269 16.8753 6.24269 16.1602 6.68374 15.719L10.4028 12L6.68374 8.28102C6.24269 7.83984 6.24269 7.12466 6.68374 6.68382C7.12478 6.24265 7.83989 6.24265 8.28098 6.68382L12 10.4028L15.719 6.68382C16.1601 6.24265 16.8752 6.24265 17.3163 6.68382Z"
                fill="#D2D2D2"
              />
            </svg>
          </CloseButton>

          <div className="modal-wrap">
            <div className="white_block">
              <TyingLogo>
                <svg width="113" height="42" viewBox="0 0 113 42" fill="none">
                  <path
                    d="M6.2327 10.5598H0.512695V4.47985H21.2727V10.5598H15.5527V31.9998H6.2327V10.5598Z"
                    fill="black"
                  />
                  <path
                    d="M32.4864 41.1598C31.0198 41.1598 29.6198 41.0132 28.2864 40.7198L28.9264 34.7998C29.9664 34.9598 30.9264 35.0398 31.8064 35.0398C33.3798 35.0398 34.5798 34.5598 35.4064 33.5998C36.2331 32.6665 36.6598 30.8932 36.6864 28.2798C35.2998 30.9465 33.0731 32.2798 30.0064 32.2798C27.4198 32.2798 25.3931 31.3732 23.9264 29.5598C22.4864 27.7198 21.7664 25.1865 21.7664 21.9598V11.9598H30.1664V23.1998C30.1664 24.1065 30.4198 24.8665 30.9264 25.4798C31.4331 26.0665 32.1264 26.3598 33.0064 26.3598C33.9131 26.3598 34.6464 25.9732 35.2064 25.1998C35.7931 24.4265 36.0864 23.4132 36.0864 22.1598V11.9598H44.5264V26.9198C44.5264 31.5598 43.4864 35.0932 41.4064 37.5198C39.3264 39.9465 36.3531 41.1598 32.4864 41.1598Z"
                    fill="black"
                  />
                  <path
                    d="M55.0052 32.3198C52.7652 32.3198 51.0185 31.5998 49.7652 30.1598C48.5119 28.7198 47.8852 26.7598 47.8852 24.2798V11.9598H56.3652V23.9198C56.3652 24.5332 56.5252 25.0132 56.8452 25.3598C57.1919 25.6798 57.6319 25.8398 58.1652 25.8398C58.6985 25.8398 59.2452 25.6798 59.8052 25.3598L60.2452 30.9198C59.6585 31.3732 58.8852 31.7198 57.9252 31.9598C56.9919 32.1998 56.0185 32.3198 55.0052 32.3198ZM52.1252 8.95984C50.8719 8.95984 49.8052 8.57318 48.9252 7.79984C48.0719 6.99984 47.6452 6.02651 47.6452 4.87984C47.6452 3.73318 48.0985 2.77318 49.0052 1.99984C49.9119 1.22651 50.9519 0.839844 52.1252 0.839844C53.3519 0.839844 54.4052 1.23984 55.2852 2.03984C56.1919 2.83984 56.6452 3.78651 56.6452 4.87984C56.6452 6.05318 56.1919 7.02651 55.2852 7.79984C54.3785 8.57318 53.3252 8.95984 52.1252 8.95984Z"
                    fill="black"
                  />
                  <path
                    d="M61.9746 12.2398H70.0146V16.3198C71.5612 13.2265 74.0146 11.6798 77.3746 11.6798C79.9346 11.6798 81.9346 12.5998 83.3746 14.4398C84.8412 16.2532 85.5746 18.7732 85.5746 21.9998V31.9998H77.1746V21.1598C77.1746 20.0132 76.9212 19.1332 76.4146 18.5198C75.9346 17.9065 75.2546 17.5998 74.3746 17.5998C73.7346 17.5998 73.1079 17.8132 72.4946 18.2398C71.8812 18.6398 71.3746 19.2265 70.9746 19.9998C70.6012 20.7732 70.4146 21.6532 70.4146 22.6398V31.9998H61.9746V12.2398Z"
                    fill="black"
                  />
                  <path
                    d="M100.156 41.1598C98.6888 41.1598 97.2888 41.0132 95.9555 40.7198L96.5955 34.7998C97.6355 34.9598 98.5955 35.0398 99.4755 35.0398C101.129 35.0398 102.382 34.5465 103.236 33.5598C104.089 32.5998 104.596 30.9732 104.756 28.6798C103.182 30.8932 100.782 31.9998 97.5555 31.9998C95.7955 31.9998 94.1688 31.5465 92.6755 30.6398C91.2088 29.7332 90.0355 28.5065 89.1555 26.9598C88.3022 25.4132 87.8755 23.7198 87.8755 21.8798C87.8755 20.0132 88.3022 18.3065 89.1555 16.7598C90.0088 15.1865 91.1688 13.9465 92.6355 13.0398C94.1288 12.1332 95.7555 11.6798 97.5155 11.6798C99.1422 11.6798 100.556 12.1065 101.756 12.9598C102.982 13.7865 103.782 14.9065 104.156 16.3198V11.6798H112.596V26.9198C112.596 31.5865 111.529 35.1198 109.396 37.5198C107.289 39.9465 104.209 41.1598 100.156 41.1598ZM100.156 25.9998C101.222 25.9998 102.142 25.6265 102.916 24.8798C103.689 24.1065 104.102 23.1998 104.156 22.1598V21.8398C104.102 20.8265 103.676 19.9332 102.876 19.1598C102.102 18.3865 101.196 17.9998 100.156 17.9998C99.0622 17.9998 98.1288 18.3998 97.3555 19.1998C96.5822 19.9732 96.1955 20.9065 96.1955 21.9998C96.1955 23.0932 96.5822 24.0398 97.3555 24.8398C98.1288 25.6132 99.0622 25.9998 100.156 25.9998Z"
                    fill="black"
                  />
                  <circle cx="52" cy="5" r="5" fill="#FF2E00" />
                </svg>
              </TyingLogo>

              <NicknameEditTitle>
                <span>닉네임</span>
              </NicknameEditTitle>

              <NicknameFormWrapper>
                <NicknameForm>
                  <input
                    type="nickname"
                    placeholder="닉네임을 입력하세요."
                    defaultValue={new RegExp(/\d+.\d/).test(user_nickname)? '' : user_nickname }
                    // 닉네임 숫자로 되어 있는 경우(카카오 로그인)에는 input창에 기존 닉네임 띄우지 않기 / 한글 or 영문으로 설정된 경우 띄우기
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

                  {nickname !== "" &&
                    !nicknameCheck(nickname) &&
                    !nickname_check && (
                      <p className="incorrect-nickname">
                        공백없이 한글 또는 영문으로 구성된 2자 이상의 닉네임.
                      </p>
                    )}
                  {nickname !== "" &&
                    nicknameCheck(nickname) &&
                    !nickname_check && (
                      <p className="correct-nickname">
                        사용할 수 있는 닉네임 형식입니다.
                      </p>
                    )}
                  {nickname !== "" &&
                    nicknameCheck(nickname) &&
                    nickname_check && (
                      <p className="correct-nickname">
                        사용할 수 있는 닉네임입니다.
                      </p>
                    )}
                </NicknameForm>

                <NicknameCheckers>
                  {nickname_checker === 4 && (
                    //사용 가능한 닉네임인 경우 체크 아이콘으로 변경
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12.5"
                        cy="12.5"
                        r="11.5"
                        stroke="#2190FE"
                        strokeWidth="2"
                      />
                      <path
                        d="M6.54688 11.9317L11.0727 16.6615L19.0469 8.32812"
                        stroke="#2190FE"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}

                  {nickname_checker === 5 && (
                    //사용 불가능한 닉네임인 경우 엑스 아이콘으로 변경
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12.5"
                        cy="12.5"
                        r="11.5"
                        stroke="#FF2E00"
                        strokeWidth="2"
                      />
                      <path
                        d="M8 17L17 8"
                        stroke="#FF2E00"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M8 8L17 17"
                        stroke="#FF2E00"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}

                  {nickname_checker === 6 && (
                    //중복확인 버튼
                    <NicknameCheckButton
                      disabled={nickname_check ? true : false}
                      onClick={nicknameCheckF}
                    >
                      중복확인
                    </NicknameCheckButton>
                  )}
                </NicknameCheckers>
              </NicknameFormWrapper>
              <EditNicknameButton onClick={editNickname}>
              완료
              </EditNicknameButton>
            </div>
          </div>
        </ModalBox>
      </ModalWrapper>
    </>
  );
};

export default NicknameModal;
