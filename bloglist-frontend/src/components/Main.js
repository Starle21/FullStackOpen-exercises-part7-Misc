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
  const blogsSectionRef = useRef();

  return (
    <div>
      <h2>List of blogs</h2>
      <BlogList />
      <Togglable buttonLabel="create new blog" ref={blogsSectionRef}>
        <NewBlog forwardedRef={blogsSectionRef} />
      </Togglable>
    </div>
  );
};

export default Main;
