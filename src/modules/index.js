import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import counter from './counter';
import projects from './projects';
import contactForm from './contactForm';
import siteSettings from './siteSettings';

export default combineReducers({
  router: routerReducer,
  projects,
  contactForm,
  siteSettings,
  counter
});
