// {
//   notification: {
//     type: 'error' / 'success',
//     message: 'the message to be shown'
//   }
// }

const notificationReducer = (state = null, action) => {
  // console.log('STATE NOW: ', state);
  // console.log('ACTION: ', action);
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;
    case 'REMOVE_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

let timer = null;
export const setNotification = (message, style = 'success') => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        style,
        message,
      },
    });
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      dispatch(removeNotification());
    }, 5 * 1000);
  };
};

const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
  };
};

export default notificationReducer;
