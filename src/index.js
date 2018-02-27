import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import App from './containers/app';

import runtimeEnv from '@mars/heroku-js-runtime-env';
import Butter from 'buttercms';
import 'sanitize.css/sanitize.css';
import './index.css';

const env = runtimeEnv();
const butter = Butter(env.REACT_APP_BUTTER_TOKEN);

const target = document.querySelector('#root');

butter.page
  .list('project', {})
  .then(function(resp) {
    console.log(resp.data);
  })
  .catch(function(resp) {
    console.log(resp);
  });

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
