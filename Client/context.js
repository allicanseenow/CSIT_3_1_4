import React, { createContext } from 'react';
import axiosInstance            from './Utility/Axios';

const defaultContextValue = {
  axios: axiosInstance,
};
console.log('default context is ', defaultContextValue)

const Context = React.createContext(defaultContextValue);
const { Provider, Consumer } = Context;

export { Provider, Consumer };