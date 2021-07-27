import blogService from '../services/blogs';

// state stored through this reducer:
// {
//   blogs: [
//     {
//       id: 'x2x',
//       title: 'xx',
//       author: 'yy',
//       url: 'zz',
//       likes: 5,
//       user: {
//         name: 'xx',
//         username: 'zz',
//         id: '65d',
//       },
//     },
//     {
//       ...
//     },
//   ];
// }

const blogsReducer = (state = [], action) => {
  // console.log('STATE NOW: ', state);
  // console.log('ACTION: ', action);
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.blogs;
    case 'NEW_BLOG':
      return [...state, action.data];
    case 'DELETE_BLOG': {
      const id = action.id;
      return state.filter(blog => (blog.id !== id ? blog : ''));
    }
    case 'UPDATE_BLOG': {
      const id = action.data.id;
      return state.map(blog => (blog.id !== id ? blog : action.data));
    }
    case 'COMMENT': {
      const blogToComment = state.find(blog => blog.id === action.data.blog);
      const commentFormatted = {
        content: action.data.content,
        id: action.data.id,
      };
      const blogWithComment = {
        ...blogToComment,
        comments: blogToComment.comments.concat(commentFormatted),
      };
      return state.map(blog =>
        blog.id !== action.data.blog ? blog : blogWithComment
      );
    }
    default:
      return state;
  }
};

// data: {content, blog:id, id}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      blogs,
    });
  };
};

export const addNewBlog = (newBlog, user) => {
  return async dispatch => {
    blogService.setToken(user.token);
    const blog = await blogService.create(newBlog);
    const blogWithUser = {
      ...blog,
      user: { name: user.name, username: user.username, id: blog.user },
    };
    dispatch({
      type: 'NEW_BLOG',
      data: blogWithUser,
    });
  };
};

export const deleteBlog = id => {
  return async dispatch => {
    // remove on the server
    await blogService.remove(id);
    // remove on the frontend in the redux store
    dispatch({
      type: 'DELETE_BLOG',
      id,
    });
  };
};

export const updateBlog = blog => {
  return async dispatch => {
    const blogUppedLiked = { ...blog, likes: blog.likes + 1 };
    const blogUpdated = await blogService.update(blog.id, blogUppedLiked);
    dispatch({ type: 'UPDATE_BLOG', data: blogUpdated });
  };
};

export const comment = (id, comment) => {
  return async dispatch => {
    const addedComment = await blogService.comment(id, comment);
    dispatch({
      type: 'COMMENT',
      data: addedComment,
    });
  };
};

export default blogsReducer;
