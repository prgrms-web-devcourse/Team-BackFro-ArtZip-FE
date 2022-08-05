import axios from 'axios';
import { storage } from 'utils';

const baseURL = `${process.env.NEXT_PUBLIC_API_END_POINT}`;

const authRequest = axios.create({
  baseURL,
});

const unAuthRequest = axios.create({
  baseURL,
});

authRequest.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.authorization = 'Bearer ' + storage.getItem('TOKEN', '');
    return config;
  }
});

export { authRequest, unAuthRequest };
