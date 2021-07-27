import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { setUser } from '../reducers/loggedUserReducer';

import loginService from '../services/login';
import blogService from '../services/blogs';

import {
  Button,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
} from '@chakra-ui/react';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let { isOpen } = useDisclosure();
  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setNotification(`Logged in ${user.name}!`));
      setUsername('');
      setPassword('');
      dispatch(setUser(user));
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error'));
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <FormLabel>username</FormLabel>
        <Input
          id="username"
          type="text"
          name="Username"
          value={username}
          placeholder="jondoe"
          onChange={({ target }) => setUsername(target.value)}
          background="gray.50"
        />
        <FormLabel mt={5}>password</FormLabel>
        <Input
          id="password"
          type="password"
          name="Password"
          value={password}
          placeholder="*******"
          onChange={({ target }) => setPassword(target.value)}
          background="gray.50"
        />
        <Button
          id="login-button"
          type="submit"
          colorScheme="teal"
          w="100%"
          mt={8}
        >
          login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
