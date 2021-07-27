import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { removeUser } from '../reducers/loggedUserReducer';
import styles from './Menu.module.css';

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };

  const dispatch = useDispatch();
  const user = useSelector(state => state.loggedUser);
  const history = useHistory();

  const handleLogout = () => {
    dispatch(removeUser());
    window.localStorage.removeItem('loggedInUser');
    dispatch(setNotification('Stop by soon!'));
    history.push('/');
  };

  return (
    <div className={styles.nav}>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      <span>
        {user.name} logged in{' '}
        <button id="logout-button" onClick={handleLogout}>
          logout
        </button>
      </span>
    </div>
  );
};

export default Menu;
