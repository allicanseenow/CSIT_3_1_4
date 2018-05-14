import _                                    from 'lodash';
import axios                                from '../Utility/Axios'

export const TYPES = {
  APP_SETTINGS_LOAD: 'APP_SETTINGS_LOAD',
  SEARCH_SETTING: 'SEARCH_SETTING',
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

export function fetchCarListingReturn(data, error) {
  if (error) {
    return {
      type: 'SEARCH_SETTING_ERROR',
      error: error.message,
    }
  }
  else {
    return {
      type: 'SEARCH_SETTING_SUCCESS',
      data,
    }
  }
}

export function fetchCarListing(query) {
  return (dispatch) => {
    return axios().get(`/api/search`, {
      params: query,
    })
      .then(({ data }) => {
        return dispatch(fetchCarListingReturn(data));
      })
      .catch((err) => {
        return dispatch(fetchCarListingReturn(null, err));
      });
  }
}
