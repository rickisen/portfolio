import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import App from './containers/app';

import runtimeEnv from '@mars/heroku-js-runtime-env';

import 'sanitize.css/sanitize.css';
import './index.css';

const env = runtimeEnv();
console.log('env', env);

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
);
