import { useEffect, DependencyList } from 'react';
import useAxiosFn, { AxiosFunction } from './useAxiosFn';

const useAxios = (axiosFn: AxiosFunction, deps: DependencyList) => {
  const [state, callback] = useAxiosFn(axiosFn, deps);

  useEffect(() => {
    callback();
  }, [callback]);

  return state;
};

export default useAxios;
