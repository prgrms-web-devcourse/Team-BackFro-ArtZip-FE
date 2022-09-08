import { useCallback, useEffect, useRef } from 'react';

const useTimeoutFn = (handler: () => void, ms = 300) => {
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();

  const run = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      handler();
    }, ms);
  }, [ms, handler]);

  const clear = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);
  }, []);

  useEffect(() => clear, [clear]);

  return [run, clear];
};

export default useTimeoutFn;
