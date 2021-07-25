import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewBlog = ({ createNewBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addNewBlog = e => {
    e.preventDefault();

    createNewBlog({ title, author, url });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h3>create new blog</h3>
      <form onSubmit={addNewBlog} className="submitNewBlog">
        <div>
          title:{' '}
          <input
            id="title"
            type="text"
            name="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{' '}
          <input
            id="author"
            type="text"
            name="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{' '}
          <input
            id="url"
            type="text"
            name="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="createBlog-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

NewBlog.propTypes = {
  createNewBlog: PropTypes.func.isRequired,
};

export default NewBlog;
