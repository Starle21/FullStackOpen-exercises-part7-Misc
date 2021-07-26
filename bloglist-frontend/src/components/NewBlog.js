import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { addNewBlog } from '../reducers/blogsReducer';

import { useField } from '../hooks';

const NewBlog = ({ forwardedRef }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.loggedUser);

  const title = useField('text', 'title');
  const author = useField('text', 'author');
  const url = useField('text', 'url');

  const handleCreateNewBlog = async e => {
    e.preventDefault();
    const blogToCreate = {
      title: title.input.value,
      author: author.input.value,
      url: url.input.value,
    };

    try {
      dispatch(addNewBlog(blogToCreate, user));
      dispatch(
        setNotification(
          `A new blog ${title.input.value} by ${author.input.value} created!`
        )
      );
      forwardedRef.current.toggleVisibility();
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error'));
    }

    title.reset();
    author.reset();
    url.reset();
  };

  return (
    <div>
      <h3>create new blog</h3>
      <form onSubmit={handleCreateNewBlog} className="submitNewBlog">
        <div>
          title: <input {...title.input} />
        </div>
        <div>
          author: <input {...author.input} />
        </div>
        <div>
          url: <input {...url.input} />
        </div>
        <button id="createBlog-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
