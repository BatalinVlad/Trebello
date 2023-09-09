import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { ReactNotifications } from 'react-notifications-component'

import App from './App';

import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';

import Store from './store';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={Store}>
    <ReactNotifications />
      <App />
  </Provider>
);

// serviceWorker.register();

