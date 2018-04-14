import _                                    from 'lodash';
import axios                                from '../Utility/Axios'

export const TYPES = {
  APP_SETTINGS_LOAD: 'APP_SETTINGS_LOAD',
};

export function setFetch(data, err) {
  if (!data && err) {
    return {
      type: 'APP_SETTINGS_LOAD',
      errorFetch: err,
    }
  }
  return {
    type: 'APP_SETTINGS_LOAD',
    data,
  }
}

export function fetch() {
  return (dispatch) => {
    return axios().get('http://localhost:9000/api/account')
      .then(({ data }) => {
        return dispatch(setFetch(data));
      })
      .catch((err) => {
        return dispatch(setFetch(null, err));
      })
  }
}
