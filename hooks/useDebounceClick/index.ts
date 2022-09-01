import { useEffect, useRef } from 'react';

const useDebounceClick = <T extends HTMLElement = HTMLElement>(
  handler: (e?: Event) => void,
  ms: number,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timerId = useRef<any>();
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (e: Event) => {
      timerId.current && clearTimeout(timerId.current);
      timerId.current = setTimeout(() => {
        handler(e);
      }, ms);
    };
    ref.current && ref.current.addEventListener('click', listener);

    return () => {
      ref.current && ref.current.removeEventListener('click', listener);
      timerId.current && clearTimeout(timerId.current);
    };
  }, [handler, ms]);

  return [ref];
};

export default useDebounceClick;
