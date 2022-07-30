import { useState, useEffect } from 'react';
import { throttleOnRendering } from 'utils';

const useInfiniteScroll = (fetchCallback: () => void) => {
  const [fetching, setFetching] = useState(false);

  const handleScrollThrottle = throttleOnRendering(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
      setFetching(true);
    }
  });

  useEffect(() => {
    window.addEventListener('scroll', handleScrollThrottle);
    return () => {
      window.removeEventListener('scroll', handleScrollThrottle);
    };
  }, []);

  useEffect(() => {
    if (!fetching) {
      return;
    } else {
      fetchCallback();
      setFetching(false);
    }
  }, [fetching]);

  return [fetching, setFetching];
};

export default useInfiniteScroll;
