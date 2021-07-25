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
//   ];
// }

const blogsReducer = (state = [], action) => {
  console.log('STATE NOW: ', state);
  console.log('ACTION: ', action);
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;
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
    default:
      return state;
  }
};

export const initBlogs = data => {
  return {
    type: 'INIT_BLOGS',
    data,
  };
};

export const addNewBlog = newBlog => {
  return {
    type: 'NEW_BLOG',
    data: newBlog,
  };
};

export const deleteBlog = id => {
  return {
    type: 'DELETE_BLOG',
    id,
  };
};

export const updateBlog = blog => {
  return {
    type: 'UPDATE_BLOG',
    data: blog,
  };
};

export default blogsReducer;
