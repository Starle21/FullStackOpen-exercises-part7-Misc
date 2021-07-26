import React, { useEffect, useRef } from 'react';

// Components
import Togglable from './Togglable';
import NewBlog from './NewBlog';
import Notification from './Notification';
import BlogList from './BlogList';
import LoginForm from './LoginForm';
import LoginStatus from './LoginStatus';

// State
import { useSelector } from 'react-redux';

const Main = () => {
  const user = useSelector(state => state.loggedUser);
  const blogsSectionRef = useRef();

  const loginSection = () => (
    <>
      <h2>Login</h2>
      <LoginForm />
    </>
  );

  const blogsSection = () => (
    <>
      <h2>Blogs list</h2>
      <BlogList />
      <Togglable buttonLabel="create new blog" ref={blogsSectionRef}>
        <NewBlog forwardedRef={blogsSectionRef} />
      </Togglable>
    </>
  );

  return <div>{user === null ? loginSection() : blogsSection()}</div>;
};

export default Main;
