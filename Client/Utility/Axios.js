import axios                          from 'axios';
import { history as createHistory }   from '../app';

export default function createAxiosInstance() {
  let config = {
    baseURL: 'http://localhost:9000/',
    // timeout: 5000,
    headers: {
      accept: 'application/json'
    },
    withCredentials: true,
  };
  if (localStorage.localToken) config.headers['x-access-token'] = window.localStorage.getItem('localToken');
  // if (cookieList) {
  //   // request.set('cookie', req.get('cookie'))
  //   _.extend(config.headers, { Cookie: cookieList })
  // }
  return axios.create(config);
}

// Use this axios instance for request that requires authentication. If not authenticated, user will be ridrected to "/login"
export function createRedirectAxiosInstance(currentURL) {
  const axiosInstance = createAxiosInstance();
  axiosInstance.interceptors.response.use(null, (err) => {
    console.log("interceptor error is ", err);
    createHistory.push("/login", { from: { pathname: currentURL } });
  });
  return axiosInstance;
}


