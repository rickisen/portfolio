import * as api from '../helpers/fixtureApi';

export const SITE_SETTINGS_LOADING = 'siteSettings/loading';
export const SITE_SETTINGS_SUCCESS = 'siteSettings/success';
export const SITE_SETTINGS_FAILURE = 'siteSettings/failure';

const initialState = {
  loading: false,
  error: false,
  siteSettings: {
    name: '',
    url: '',
    hero: {
      image: '',
      title: '',
      subTitle: '',
      paragraph: ''
    }
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SITE_SETTINGS_LOADING:
      return {
        ...state,
        loading: true
      };
    case SITE_SETTINGS_FAILURE:
      return {
        ...initialState,
        loading: false,
        error: true
      };
    case SITE_SETTINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        siteSettings: action.payload
      };
    default:
      return state;
  }
};

export const loadSiteSettings = () => {
  return dispatch => {
    dispatch({
      type: SITE_SETTINGS_LOADING
    });

    return dispatch({
      type: SITE_SETTINGS_SUCCESS,
      payload: api.getSiteSettings()
    });
  };
};
