import * as api from '../helpers/fixtureApi';

export const PROJECT_SECTION_LOADING = 'projects/section/loading';
export const PROJECT_SECTION_SUCCESS = 'projects/section/success';
export const PROJECT_SECTION_FAILURE = 'projects/section/failure';

export const PROJECTS_LOADING = 'projects/loading';
export const PROJECTS_SUCCESS = 'projects/success';
export const PROJECTS_FAILURE = 'projects/failure';

const initialState = {
  loadingProjects: false,
  loadingSection: false,
  error: false,
  projectSection: {
    title: '',
    endClientTitle: '',
    technologiesTitle: '',
    roleTitle: '',
    loadText: ''
  },
  projects: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROJECT_SECTION_LOADING:
      return {
        ...state,
        loadingSection: true
      };
    case PROJECT_SECTION_FAILURE:
      return {
        ...initialState,
        loadingSection: false,
        error: true
      };
    case PROJECT_SECTION_SUCCESS:
      return {
        ...state,
        loadingSection: false,
        error: false,
        projectSection: action.payload
      };
    case PROJECTS_LOADING:
      return {
        ...state,
        loadingProjects: true
      };
    case PROJECTS_FAILURE:
      return {
        ...initialState,
        loadingProjects: false,
        error: true
      };
    case PROJECTS_SUCCESS:
      return {
        ...state,
        loadingProjects: false,
        error: false,
        projects: action.payload
      };
    default:
      return state;
  }
};

export const loadProjects = () => {
  return dispatch => {
    dispatch({
      type: PROJECTS_LOADING
    });

    return dispatch({
      type: PROJECTS_SUCCESS,
      payload: api.getProjects()
    });
  };
};

export const loadProjectSection = () => {
  return dispatch => {
    dispatch({
      type: PROJECT_SECTION_LOADING
    });

    return dispatch({
      type: PROJECT_SECTION_SUCCESS,
      payload: api.getSection('projects')
    });
  };
};
