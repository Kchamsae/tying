// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { actionCreators as userActions } from "../redux/modules/user";
// import { history } from "../redux/configureStore";

// const NicknameModal = (props) => {
//   const dispatch = useDispatch();

//   const is_login = useSelector((state) => state.user.is_login);

//   const [nickname_modal, setNicknameModal] = React.useState(false);
//   const [fade_out, setFadeOut] = React.useState(false);

//   const modal_on = useSelector((state) => state.user.nickname_modal);

//   const editNickname = () => {
//     dispatch(userActions.editUserDB(nickname));
//   };

//   const openModal = () => {
//     setFadeOut(false);
//     document.body.style.overflow = "hidden";
//     setNicknameModal(true);
//   };

//   const closeModal = () => {
//     setFadeOut(true);
//     document.body.style.overflow = "unset";
//     setTimeout(() => {
//         setNicknameModal(false);
//     }, 400);
//   };
// };

// export default NicknameModal;
