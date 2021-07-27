import React, { useEffect, useRef } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import { useSelector } from 'react-redux';

// Components
import Users from './components/Users';
import Main from './components/Main';
import Menu from './components/Menu';
import Notification from './components/Notification';
import User from './components/User';
import Blog from './components/Blog';

import { useDispatch } from 'react-redux';
import { initBlogs } from './reducers/blogsReducer';
import { initUser } from './reducers/loggedUserReducer';
import { initUsers } from './reducers/usersReducer';
import LoginForm from './components/LoginForm';

import { Flex, Heading, Container, Center } from '@chakra-ui/react';

const App = () => {
  const dispatch = useDispatch();

  // select logged in user, if any
  const userAuth = useSelector(state => state.loggedUser);

  useEffect(() => {
    dispatch(initUser());
    dispatch(initBlogs());
    dispatch(initUsers());
  }, []);

  // User route - find matching user
  const users = useSelector(state => state.users);
  const matchUser = useRouteMatch('/users/:id');
  const user = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null;

  // Blog route - find matching blog
  const blogs = useSelector(state => state.blogs);
  const matchBlog = useRouteMatch('/blogs/:id');
  const blog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null;

  // if user=null (not signed in)

  const loginSection = () => (
    <>
      <Notification />

      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex direction="column" background="gray.200" p={12} rounded={20}>
          <Heading mb={6} align="center">
            Blogs app
          </Heading>
          <LoginForm />
        </Flex>
      </Flex>
    </>
  );

  // if user signed in
  const landingSection = () => (
    <>
      <Menu />
      <Container maxW="container.xl">
        <Heading align="center" m={10}>
          Blogs app
        </Heading>
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
            {blog ? (
              <Blog blog={blog} />
            ) : (
              <div>The blog does not exist or you put in a wrong url!</div>
            )}
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Container>
    </>
  );

  return <>{userAuth === null ? loginSection() : landingSection()}</>;
};

export default App;
