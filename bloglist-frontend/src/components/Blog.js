import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { deleteBlog, updateBlog, comment } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';
import blogService from '../services/blogs';

import { useHistory } from 'react-router-dom';

import { useField } from '../hooks';

import {
  Container,
  Heading,
  Link,
  Center,
  Flex,
  Button,
  Box,
  Input,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';

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
    <Container>
      <Heading align="center" size="lg">
        {blog.title} <i>by</i> {blog.author}
      </Heading>
      <Flex direction="column" align="center" mt={10}>
        <Link href={blog.url}>{blog.url}</Link>
        <Box border="1px" borderColor="teal" p={2} rounded={20} m={2}>
          <span className="blog-likes">{blog.likes} likes</span>
          <Button id="like-button" onClick={giveLike} colorScheme="teal" m={2}>
            like
          </Button>
        </Box>
        <div>added by {blog.user.name}</div>
        {blog.user.username === user.username ? showDeleteButton() : ''}
        <Heading color="teal" w="100%" size="md" align="center" mt={10}>
          comments
        </Heading>
        <form onSubmit={addComment}>
          <Input {...commentInput.input} />
          <Button type="submit" colorScheme="teal" variant="outline" w="100%">
            add comment
          </Button>
        </form>
        {blog.comments.length === 0 ? <div>No comments...</div> : ''}
        <UnorderedList>
          {blog.comments.map(c => {
            return (
              <ListItem key={c.id} m={3}>
                {c.content}
              </ListItem>
            );
          })}
        </UnorderedList>
      </Flex>
    </Container>
  );
};

export default Blog;
