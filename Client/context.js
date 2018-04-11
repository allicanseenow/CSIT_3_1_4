import React, { createContext } from 'react';
import axiosInstance, { createRedirectAxiosInstance }            from './Utility/Axios';

const defaultContextValue = {
  axios: axiosInstance,
  redirectAxios: createRedirectAxiosInstance,
};
console.log('default context is ', defaultContextValue)

const Context = React.createContext(defaultContextValue);
const { Provider, Consumer } = Context;

export { Provider, Consumer };