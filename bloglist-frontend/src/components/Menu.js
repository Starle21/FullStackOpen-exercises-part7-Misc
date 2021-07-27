import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { removeUser } from '../reducers/loggedUserReducer';
import styles from './Menu.module.css';

import { Flex, Spacer, Button, Text } from '@chakra-ui/react';

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
    <Flex bg="gray.400" p={2} align="baseline">
      <Link style={padding} to="/">
        <Button colorScheme="teal">blogs</Button>
      </Link>
      <Link style={padding} to="/users">
        <Button colorScheme="teal"> users</Button>
      </Link>
      <Spacer />

      <Text color="white" pr={5}>
        <b> {user.name} </b>logged in
      </Text>
      <Button id="logout-button" onClick={handleLogout} colorScheme="blue">
        logout
      </Button>
    </Flex>
  );
};

export default Menu;
