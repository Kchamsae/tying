import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { history } from '../redux/configureStore';

const NicknameModal = (props) => {
    const dispatch = useDispatch();

    //modal창 관리 state
    const [modal_state, setModalState] = React.useState('welcome');
}

export default NicknameModal;