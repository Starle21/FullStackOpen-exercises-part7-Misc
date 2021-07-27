import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { deleteBlog, updateBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';
import blogService from '../services/blogs';

import { useHistory } from 'react-router-dom';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.loggedUser);
  const history = useHistory();

  const giveLike = async () => {
    dispatch(updateBlog(blog));
  };

  const deletePost = async () => {
    const confirmed = window.confirm(`Are you sure to delete ${blog.title}?`);
    if (!confirmed) return;
    try {
      blogService.setToken(user.token);
      await dispatch(deleteBlog(blog.id));
      history.push('/');
      dispatch(setNotification(`${blog.title} was removed.`, 'success'));
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error'));
    }
  };

  const showDeleteButton = () => (
    <div>
      <button id="delete-button" onClick={deletePost}>
        delete blog
      </button>
    </div>
  );

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <span className="blog-likes">{blog.likes} likes</span>
        <button id="like-button" onClick={giveLike}>
          like
        </button>
      </div>
      <div>added by {blog.user.name}</div>
      {blog.user.username === user.username ? showDeleteButton() : ''}
    </div>
  );
};

export default Blog;
