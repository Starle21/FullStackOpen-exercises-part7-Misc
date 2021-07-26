// {
//   user: {
//     name, username, token;
//   }
// }

const loggedUserReducer = (state = null, action) => {
  // console.log('user STATE NOW: ', state);
  // console.log('user ACTION: ', action);
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    case 'REMOVE_USER':
      return null;
    default:
      return state;
  }
};

export const initUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedUserJSON) {
      dispatch(setUser(JSON.parse(loggedUserJSON)));
    }
  };
};

export const setUser = user => {
  return {
    type: 'SET_USER',
    data: user,
  };
};

export const removeUser = () => {
  return {
    type: 'REMOVE_USER',
  };
};

export default loggedUserReducer;
