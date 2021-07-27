import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { deleteBlog, updateBlog, comment } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';
import blogService from '../services/blogs';

import { useHistory } from 'react-router-dom';

import { useField } from '../hooks';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.loggedUser);
  const history = useHistory();
  const commentInput = useField('text', 'comment');

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

  const addComment = async e => {
    e.preventDefault();
    if (commentInput.input.value.length === 0)
      return dispatch(setNotification('Empty comments not allowed', 'error'));
    const newComment = {
      content: commentInput.input.value,
    };
    try {
      await dispatch(comment(blog.id, newComment));
      dispatch(
        setNotification(`${commentInput.input.value} was added.`, 'success')
      );
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error'));
    }
    commentInput.reset();
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
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input {...commentInput.input} />
        <button type="submit">add comment</button>
      </form>
      {blog.comments.length === 0 ? <div>No comments...</div> : ''}
      <ul>
        {blog.comments.map(c => {
          return <li key={c.id}>{c.content}</li>;
        })}
      </ul>
    </div>
  );
};

export default Blog;
