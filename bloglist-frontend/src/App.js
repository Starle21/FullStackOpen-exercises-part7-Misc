import React, { useState, useEffect, useRef } from 'react';
// Components
import Togglable from './components/Togglable';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import LoginStatus from './components/LoginStatus';
// State
import { useDispatch, useSelector } from 'react-redux';
import { initBlogs } from './reducers/blogsReducer';
import { initUser } from './reducers/loggedUserReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.loggedUser);
  const blogsSectionRef = useRef();

  useEffect(() => {
    dispatch(initUser());
    dispatch(initBlogs());
  }, []);

  const loginSection = () => (
    <>
      <h1>Login</h1>
      <Notification />
      <LoginForm />
    </>
  );

  const blogsSection = () => (
    <>
      <h1>Blogs</h1>
      <Notification />
      <LoginStatus />
      <BlogList />
      <Togglable buttonLabel="create new blog" ref={blogsSectionRef}>
        <NewBlog forwardedRef={blogsSectionRef} />
      </Togglable>
    </>
  );

  return <div>{user === null ? loginSection() : blogsSection()}</div>;
};

export default App;
