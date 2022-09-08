import { DependencyList, useEffect, useRef } from 'react';

const useDebounce = (handler: () => void, ms = 300, deps: DependencyList, eventType?: string) => {
  const timerId = useRef<ReturnType<typeof setTimeout>>();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const listener = () => {
      timerId.current && clearTimeout(timerId.current);
      timerId.current = setTimeout(() => {
        handler();
      }, ms);
    };

    if (ref.current && eventType) {
      ref.current.addEventListener(eventType, listener);
    } else {
      listener();
    }

    return () => {
      if (ref.current && eventType) {
        ref.current.removeEventListener(eventType, listener);
      }
      timerId.current && clearTimeout(timerId.current);
    };
  }, [ms, handler, eventType, ...deps]);

  return [ref];
};

export default useDebounce;
