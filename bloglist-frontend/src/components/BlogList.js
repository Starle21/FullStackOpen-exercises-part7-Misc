import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBlog, updateBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';

import { Link } from 'react-router-dom';

import blogService from '../services/blogs';

import Blog from './Blog';

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes);

  const user = useSelector(state => state.loggedUser);

  const handleGiveLike = async blog => {
    dispatch(updateBlog(blog));
  };

  const handleDeletePost = async blog => {
    try {
      const confirmed = window.confirm(`Are you sure to delete ${blog.title}?`);
      if (!confirmed) return;
      blogService.setToken(user.token);
      dispatch(deleteBlog(blog.id));
      dispatch(setNotification(`${blog.title} was removed.`, 'success'));
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error'));
    }
  };

  // <Blog
  //   key={blog.id}
  //   blog={blog}
  //   giveLike={() => handleGiveLike(blog)}
  //   deletePost={() => handleDeletePost(blog)}
  //   user={user}
  // />;

  return (
    <div>
      {sortedBlogs.map(blog => (
        <div key={blog.id} className="blog">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
