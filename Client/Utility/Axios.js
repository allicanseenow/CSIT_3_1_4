import axios      from 'axios';
import cookie     from 'cookie';
import _          from 'lodash';
import createHistory from "history/createBrowserHistory"

export default function createAxiosInstance() {
  let config = {
    baseURL: 'http://localhost:8080/',
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
export function createRedirectAxiosInstance() {
  const axiosInstance = createAxiosInstance();
  axiosInstance.interceptors.response.use((res) => {
    console.log("interceptor response is ", res);
  }, (err) => {
    console.log("interceptor error is ", err);
    createHistory().push("/login");
  });
  return axiosInstance;
}


