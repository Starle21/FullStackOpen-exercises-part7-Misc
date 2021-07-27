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

import { Container, Heading } from '@chakra-ui/react';

const Main = () => {
  const blogsSectionRef = useRef();

  return (
    <Container>
      <Heading align="center" size="lg">
        List of blogs
      </Heading>
      <BlogList />
      <Togglable buttonLabel="create new blog" ref={blogsSectionRef}>
        <NewBlog forwardedRef={blogsSectionRef} />
      </Togglable>
    </Container>
  );
};

export default Main;
