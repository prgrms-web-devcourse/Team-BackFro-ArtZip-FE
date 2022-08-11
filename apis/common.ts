import axios from 'axios';
import { refresh, refreshErrorHandle } from './refresh';

const baseURL = `${process.env.NEXT_PUBLIC_API_END_POINT}`;

const authRequest = axios.create({
  baseURL,
});

const unAuthRequest = axios.create({
  baseURL,
});

authRequest.interceptors.request.use(refresh, refreshErrorHandle);

export { authRequest, unAuthRequest };
