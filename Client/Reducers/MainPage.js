import { TYPES } from '../Actions/MainPage';
import _ from 'lodash';

const defaultState = {};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case `${TYPES.APP_SETTINGS_LOAD}`: {
      const newState = Object.assign({}, state, { profile: action.data });
      return newState;
    }

    case `${TYPES.SEARCH_SETTING}_SUCCESS`: {
      // const newState = Object.assign({}, state, { listing: action.data, error: null });
      const newState = { ...state, listing: action.data, error: null };
      return newState;
    }

    case `${TYPES.SEARCH_SETTING}_ERROR`: {
      const newState = Object.assign({}, state, { listing: null, error: action.error });
      return newState;
    }

    default:
      return state;
  }
}