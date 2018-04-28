import { TYPES } from '../Actions/MainPage';
import _ from 'lodash';

const defaultState = {};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case `${TYPES.APP_SETTINGS_LOAD}`: {
      console.log("action in reducer", action);
      console.log("state is ", state);
      const newState = _.merge(state, {profile: action.data});
      console.log("new state is ", newState)
      return newState;
    }
    default:
      return state;
  }
}