import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { addNewBlog } from '../reducers/blogsReducer';

import { useField } from '../hooks';

import { Heading, Button, Input } from '@chakra-ui/react';

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
      await dispatch(addNewBlog(blogToCreate, user));
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
      <Heading color="teal" w="100%" size="md" align="center" mt={5}>
        create new blog
      </Heading>
      <form onSubmit={handleCreateNewBlog} className="submitNewBlog">
        <div>
          <Input placeholder="title" {...title.input} />
        </div>
        <div>
          <Input placeholder="author" {...author.input} />
        </div>
        <div>
          <Input placeholder="url" {...url.input} />
        </div>
        <Button
          id="createBlog-button"
          type="submit"
          colorScheme="teal"
          w="100%"
        >
          create
        </Button>
      </form>
    </div>
  );
};

export default NewBlog;
