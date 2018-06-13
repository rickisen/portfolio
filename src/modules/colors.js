export const ADD_COLOR = 'colors/add';
export const CLEAR_COLORS = 'colors/clear';

const initialState = {
  colors: new Map()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_COLORS:
      return {
        ...state,
        colors: initialState.colors
      };
    case ADD_COLOR:
      state.colors.set(action.key, action.value);
      return {
        ...state
      };
    default:
      return state;
  }
};

export const addColor = (key, value) => {
  return dispatch => {
    dispatch({
      type: ADD_COLOR,
      key,
      value
    });
  };
};

export const clearColors = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_COLORS
    });
  };
};
