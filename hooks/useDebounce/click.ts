import { useEffect, useRef } from 'react';

const useDebounceClick = <T extends HTMLElement = HTMLElement>(
  handler: (e?: Event) => void,
  ms: number,
) => {
  const timerId = useRef<ReturnType<typeof setTimeout>>();
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (e: Event) => {
      timerId.current && clearTimeout(timerId.current);
      timerId.current = setTimeout(() => {
        handler(e);
      }, ms);
    };

    const element = ref.current;
    element && element.addEventListener('click', listener);

    return () => {
      element && element.removeEventListener('click', listener);
      timerId.current && clearTimeout(timerId.current);
    };
  }, [handler, ms]);

  return [ref];
};

export default useDebounceClick;
