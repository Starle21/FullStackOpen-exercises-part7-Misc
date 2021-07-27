// React
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

// Redux state management
import { Provider } from 'react-redux';
import store from './store';

// Components
import App from './App';

// Styles
import './index.css';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
