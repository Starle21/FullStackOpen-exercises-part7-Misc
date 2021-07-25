import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Togglable from './components/Togglable';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

import { setNotification } from './reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const notification = useSelector(state => state);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    //user from local storage?
    //set user state with user from local storage
    const loggedUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON));
    }
  }, []);

  const handleLogin = async e => {
    e.preventDefault();
    //call the function login with username, password
    //save the returned data
    //clear the inputs
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      showNotification(`Logged in ${user.name}!`);
    } catch (exception) {
      showNotification(exception.response.data.error, 'error');
    }
  };

  const handleLogout = () => {
    //
    setUser(null);
    window.localStorage.removeItem('loggedInUser');
    showNotification('Stop by soon!');
  };

  const createNewBlog = async blogObject => {
    //post with data
    try {
      blogService.setToken(user.token);
      const blog = await blogService.create(blogObject);
      const blogWithUser = {
        ...blog,
        user: { name: user.name, username: user.username, id: blog.user },
      };
      setBlogs(blogs.concat(blogWithUser));
      showNotification(`A new blog ${blog.title} by ${blog.author} created!`);
      showBlogsRef.current.toggleVisibility();
    } catch (exception) {
      showNotification(exception.response.data.error, 'error');
    }
  };

  const showNotification = (message, type = 'success') => {
    dispatch(setNotification(message, type, 5));
  };

  const loginForm = () => (
    <>
      <h2>login</h2>
      <Notification notification={notification} />
      <form onSubmit={handleLogin}>
        <div>
          username{' '}
          <input
            id="username"
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
            id="password"
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </>
  );
  const showBlogsRef = useRef();

  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes);

  const handleGiveLike = async blog => {
    const copyBlog = { ...blog, likes: blog.likes + 1 };
    const blogUpdated = await blogService.update(blog.id, copyBlog);
    setBlogs(blogs.map(e => (e.id !== blogUpdated.id ? e : blogUpdated)));
  };

  const handleDeletePost = async blog => {
    try {
      const confirmed = window.confirm(`Are you sure to delete ${blog.title}?`);
      if (!confirmed) return;
      blogService.setToken(user.token);
      await blogService.remove(blog.id);
      showNotification(`${blog.title} was removed.`);
      setBlogs(blogs.filter(e => (e.id !== blog.id ? e : '')));
    } catch (exception) {
      showNotification(exception.response.data.error, 'error');
    }
  };

  const showBlogs = () => (
    <>
      <h1>Blogs</h1>
      <Notification notification={notification} />
      <p>
        {user.name} logged in{' '}
        <button id="logout-button" onClick={handleLogout}>
          logout
        </button>
      </p>
      <div>
        {sortedBlogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            giveLike={() => handleGiveLike(blog)}
            deletePost={() => handleDeletePost(blog)}
            user={user}
          />
        ))}
      </div>
      <div>
        <Togglable buttonLabel="create new blog" ref={showBlogsRef}>
          <NewBlog createNewBlog={createNewBlog} />
        </Togglable>
      </div>
    </>
  );

  return <div>{user === null ? loginForm() : showBlogs()}</div>;
};

export default App;
