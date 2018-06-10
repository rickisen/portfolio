import * as api from '../helpers/fixtureApi';

export const FORM_SETTINGS_LOADING = 'formSettings/loading';
export const FORM_SETTINGS_SUCCESS = 'formSettings/success';
export const FORM_SETTINGS_FAILURE = 'formSettings/failure';

const initialState = {
  loading: false,
  error: false,
  formSettings: {
    title: '',
    namePlaceholder: '',
    emailPlaceholder: '',
    subjectPlaceholder: '',
    bodyPlaceholder: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FORM_SETTINGS_LOADING:
      return {
        ...state,
        loading: true
      };
    case FORM_SETTINGS_FAILURE:
      return {
        ...initialState,
        loading: false,
        error: true
      };
    case FORM_SETTINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        formSettings: action.payload
      };
    default:
      return state;
  }
};

export const loadFormSettings = () => {
  return dispatch => {
    dispatch({
      type: FORM_SETTINGS_LOADING
    });

    return dispatch({
      type: FORM_SETTINGS_SUCCESS,
      payload: api.getSection('contactForm')
    });
  };
};
