import { AxiosError } from 'axios';

export const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    return error.response?.data.message;
  }
  return String(error);
};
