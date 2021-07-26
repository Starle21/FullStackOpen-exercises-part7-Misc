import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { removeUser } from '../reducers/loggedUserReducer';

const LoginStatus = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.loggedUser);

  const handleLogout = () => {
    dispatch(removeUser());
    window.localStorage.removeItem('loggedInUser');
    dispatch(setNotification('Stop by soon!'));
  };

  if (!user) return null;
  return (
    <p>
      {user.name} logged in{' '}
      <button id="logout-button" onClick={handleLogout}>
        logout
      </button>
    </p>
  );
};

export default LoginStatus;
