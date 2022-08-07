import { AxiosError, AxiosResponse } from 'axios';
import { DependencyList, useCallback, useRef, useState } from 'react';

export type AxiosState = {
  response?: AxiosResponse;
  isLoading: boolean;
  error?: AxiosError;
};

export type AxiosFunction = () => Promise<AxiosResponse>;

const useAxiosFn = (axiosFn: AxiosFunction, deps: DependencyList): [AxiosState, AxiosFunction] => {
  const lastCallId = useRef(0);
  const [state, setState] = useState<AxiosState>({
    isLoading: false,
  });

  const callback = useCallback(async () => {
    const callId = ++lastCallId.current;

    if (!state.isLoading) {
      setState({ ...state, isLoading: true });
    }

    return axiosFn()
      .then((response) => {
        if (callId === lastCallId.current) {
          setState({ response, isLoading: false });
          return response;
        }
      })
      .catch((error) => {
        if (callId === lastCallId.current) {
          setState({ error, isLoading: false });
          return error;
        }
      });
  }, deps);

  return [state, callback];
};

export default useAxiosFn;
