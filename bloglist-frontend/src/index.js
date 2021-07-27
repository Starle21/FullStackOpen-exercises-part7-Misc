// React
import React from 'react';
import ReactDOM from 'react-dom';

// Routing
import { BrowserRouter as Router } from 'react-router-dom';

// Redux state management
import { Provider } from 'react-redux';
import store from './store';

// Components
import App from './App';

// Styles
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.render(
  <ChakraProvider>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </ChakraProvider>,
  document.getElementById('root')
);
