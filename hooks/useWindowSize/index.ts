import { useState, useEffect } from 'react';

const isSSR = typeof window === 'undefined';

const useWindowSize = () => {
  const [windowWidthSize, setWindowWidthSize] = useState(0);
  const [windowHeightSize, setWindowHeightSize] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      if (!isSSR) {
        setWindowWidthSize(window.innerWidth);
        setWindowHeightSize(window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { windowWidthSize, windowHeightSize };
};
export default useWindowSize;
