import React, { useEffect, useRef } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import { useSelector } from 'react-redux';

// Components
import Users from './components/Users';
import Main from './components/Main';
import LoginStatus from './components/LoginStatus';
import Notification from './components/Notification';
import User from './components/User';
import Blog from './components/Blog';

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

  const users = useSelector(state => state.users);
  const matchUser = useRouteMatch('/users/:id');
  const user = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null;

  const blogs = useSelector(state => state.blogs);
  const matchBlog = useRouteMatch('/blogs/:id');
  const blog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null;

  return (
    <div>
      <h1>Blogs app</h1>
      <LoginStatus />
      <Notification />

      <Switch>
        <Route path="/users/:id">
          {user ? (
            <User user={user} />
          ) : (
            <div>The user does not exist or you put in a wrong url!</div>
          )}
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={blog} />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
