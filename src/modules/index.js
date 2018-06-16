import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import projects from './projects';
import contactForm from './contactForm';
import siteSettings from './siteSettings';
import themes from './themes';

export default combineReducers({
  router: routerReducer,
  projects,
  contactForm,
  siteSettings,
  themes
});
