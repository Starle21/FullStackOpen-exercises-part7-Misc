// Redux state management
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import notificationReducer from './reducers/notificationReducer';
import blogsReducer from './reducers/blogsReducer';
import loggedUserReducer from './reducers/loggedUserReducer';
import usersReducer from './reducers/usersReducer';

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  loggedUser: loggedUserReducer,
  users: usersReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
