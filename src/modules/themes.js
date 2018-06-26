export const ADD_PLACEMENT = 'placements/add';
export const CLEAR_PLACEMENTS = 'placements/clear';

const initialState = {
  placements: new Map()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_PLACEMENTS:
      return {
        ...state,
        placements: initialState.placements
      };
    case ADD_PLACEMENT:
      state.placements.set(action.key, action.value);
      return {
        ...state
      };
    default:
      return state;
  }
};

export const addPlacement = (key, value) => {
  return dispatch => {
    dispatch({
      type: ADD_PLACEMENT,
      key,
      value
    });
  };
};

export const clearPlacements = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_PLACEMENTS
    });
  };
};
