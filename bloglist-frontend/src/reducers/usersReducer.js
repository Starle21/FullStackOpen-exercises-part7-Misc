import userService from '../services/users';

const usersReducer = (state = [], action) => {
  // console.log('STATE NOW: ', state);
  // console.log('ACTION: ', action);
  switch (action.type) {
    case 'INIT_USERS':
      return action.users;
    default:
      return state;
  }
};

export const initUsers = () => {
  return async dispatch => {
    const users = await userService.getAll();

    dispatch({
      type: 'INIT_USERS',
      users,
    });
  };
};

export default usersReducer;
