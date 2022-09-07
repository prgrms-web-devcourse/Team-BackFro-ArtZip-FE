import { DependencyList, useEffect } from 'react';
import useTimeoutFn from './timeoutFn';

const useDebounce = (fn: () => void, ms = 300, deps: DependencyList) => {
  const [run, clear] = useTimeoutFn(fn, ms);

  useEffect(run, deps);

  return clear;
};

export default useDebounce;
