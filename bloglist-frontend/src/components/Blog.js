import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, user, giveLike, deletePost }) => {
  const [visible, setVisible] = useState(false);
  const hiddenDefault = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const showDeleteButton = () => (
    <button id="delete-button" onClick={deletePost}>
      delete blog
    </button>
  );

  return (
    <div className="blog">
      {/* when details hidden */}
      {blog.title} {blog.author}{' '}
      <button id="toggleDetails-button" onClick={toggleVisibility}>
        {visible ? 'hide' : 'view'}
      </button>
      {/*  when details visible*/}
      <div style={hiddenDefault} className="details">
        <div>{blog.url}</div>
        <div>
          <span className="blog-likes">likes {blog.likes} </span>
          <button id="like-button" onClick={giveLike}>
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        <div>
          {blog.user.username === user.username ? showDeleteButton() : ''}
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  giveLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
