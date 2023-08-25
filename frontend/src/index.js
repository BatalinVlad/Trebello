import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
// import ReactNotification from 'react-notifications-component';

import App from './App';
import * as serviceWorker from './serviceWorker';

// import 'react-notifications-component/dist/theme.css';

import Store from './store';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={Store}>
    {/* <ReactNotification /> */}
    <App />
  </Provider>
);

serviceWorker.register();

