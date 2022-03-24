import React from 'react';
import { useSelector } from 'react-redux';
import { getCookie } from './Cookie';

const Permit = (props) => {
  const token = getCookie('token');
  const is_login = useSelector((state) => state.user.is_login);

  if (token && is_login) {
    return <>{props.children}</>;
  }
  return null;
};

export default Permit;
