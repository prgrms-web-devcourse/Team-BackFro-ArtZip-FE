// ref : https://velog.io/@rkd028/React-Infinite-Scroll-%EA%B5%AC%ED%98%84-IntersectionObserver

import { useEffect, useState, useMemo, MutableRefObject } from 'react';

interface InfiniteScrollProps {
  root?: Element | null;
  rootMargin?: string;
  target: MutableRefObject<HTMLDivElement | null>;
  threshold?: number;
  targetArray: Array<unknown>;
  pageSize: number;
  endPoint?: number;
}

const useInfiniteScroll = ({
  root = null,
  target,
  threshold = 1,
  rootMargin = '0px',
  targetArray,
  pageSize,
  endPoint = 1,
}: InfiniteScrollProps) => {
  const [count, setCount] = useState<number>(0);

  const observer = useMemo(() => {
    if (typeof window !== 'undefined') {
      return new IntersectionObserver(
        (entries, observer) => {
          if (target?.current === null) {
            return;
          }
          if (entries[0].isIntersecting) {
            setCount((v) => v + 1);
            observer.disconnect();
          }
        },
        {
          root,
          rootMargin,
          threshold,
        },
      );
    }
  }, [target, root, rootMargin, threshold]);

  useEffect(() => {
    if (target?.current === null) {
      return;
    }

    if (pageSize * (count + 1) <= targetArray.length) {
      observer &&
        observer.observe(target.current.children[target.current.children.length - endPoint]);
    }

    return () => {
      if (target.current !== null && observer) {
        observer.unobserve(target.current);
      }
    };
  }, [count, targetArray, target, pageSize]);

  return {
    count,
    setCount,
  };
};

export default useInfiniteScroll;
