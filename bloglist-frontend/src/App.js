import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Users from './components/Users';
import Main from './components/Main';
import LoginStatus from './components/LoginStatus';
import Notification from './components/Notification';

import { useDispatch } from 'react-redux';
import { initBlogs } from './reducers/blogsReducer';
import { initUser } from './reducers/loggedUserReducer';
import { initUsers } from './reducers/usersReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUser());
    dispatch(initBlogs());
    dispatch(initUsers());
  }, []);

  return (
    <Router>
      <h1>Blogs app</h1>
      <LoginStatus />
      <Notification />

      <Switch>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
