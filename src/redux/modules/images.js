import axios from 'axios';
/**
 * Action Types
 */

export const LOAD = 'blank/LOAD';
export const LOAD_SUCCESS = 'blank/LOAD_SUCCESS';
export const LOAD_FAIL = 'blank/LOAD_FAIL';

/**
 * Initial State
 */
export const initialState = {
  loaded: false,
  loading: false,
  items: []
};

/**
 * Reducer
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        error: null,
        items: action.items
      };
    case LOAD_FAIL:
      return {
        ...state,
        loaded: false,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

/**
 * Action
 */
export const load = (value) => {
  const apiKey = '6f1a90e4dd2f038285b466372e0befd8';
  const url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
  return (dispatch) => {
    dispatch({ type: LOAD });
    return axios.get(`${url}&tags=${value}&tagmode=all&api_key=${apiKey}&per_page=24&page=1&format=json&nojsoncallback=true`)
      .then(response => {
        dispatch({
          type: LOAD_SUCCESS,
          items: response.data.photos.photo
        });
      })
      .catch(error => {
        dispatch({
          type: LOAD_FAIL,
          error
        });
      });
  };
};
