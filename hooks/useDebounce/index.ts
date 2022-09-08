import { useEffect, useRef } from 'react';

const useDebounce = <T>(
  handler: (e?: Event) => void,
  ms = 300,
  dependentValue: T,
  eventType?: string,
) => {
  const timerId = useRef<ReturnType<typeof setTimeout>>();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const listener = (e?: Event) => {
      timerId.current && clearTimeout(timerId.current);
      timerId.current = setTimeout(() => {
        handler(e);
      }, ms);
    };

    const element = ref.current;
    if (element && eventType) {
      console.log('걸기');
      element.addEventListener(eventType, listener);
    } else {
      listener();
    }

    return () => {
      if (element && eventType) {
        console.log('삭제');
        element.removeEventListener(eventType, listener);
      }
      timerId.current && clearTimeout(timerId.current);
    };
  }, [ms, handler, dependentValue, eventType]);

  return [ref];
};

export default useDebounce;
