import { useState, useEffect } from 'react';

const isSSR = typeof window === 'undefined';

const useWindowSize = () => {
  const [windowWidthSize, setWindowWidthSize] = useState(0);
  const [windowHeightSize, setWindowHieghtSize] = useState(0);
  useEffect(() => {
    // window resize를 위한 핸들러
    function handleResize() {
      // 윈도우의 넓이/높이(width/height)를 set을 해준다
      if (!isSSR) {
        setWindowWidthSize(window.innerWidth);
        setWindowHieghtSize(window.innerHeight);
      }
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { windowWidthSize, windowHeightSize };
};
export default useWindowSize;
