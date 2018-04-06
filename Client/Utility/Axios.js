import axios      from 'axios';
import cookie     from 'cookie';
import _          from 'lodash';

function createAxiosInstance() {
  let config = {
    baseURL: 'http://localhost:8080/',
    timeout: 3000,
    headers: {
      accept: 'application/json',
    },
  };
  const cookieList = cookie.parse(document.cookie);
  if (cookieList) {
    // request.set('cookie', req.get('cookie'))
    _.extend(config.headers, { cookie: cookieList })
  }

  return axios.create(config);
}

console.log('cookie is ', cookie.parse(document.cookie))

export default createAxiosInstance;