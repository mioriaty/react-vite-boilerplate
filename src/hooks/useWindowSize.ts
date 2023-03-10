import { isBrowser } from '@app/utils/isBrowser';
import { useEffect, useState } from 'react';

interface State {
  width: number;
  height: number;
}

export const useWindowSize = (defaultHeight = Infinity, defaultWith = Infinity) => {
  const [windowSize, setWindowSize] = useState<State>({
    height: isBrowser ? window.innerHeight : defaultHeight,
    width: isBrowser ? window.innerWidth : defaultWith,
  });

  useEffect(() => {
    if (isBrowser) {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return windowSize;
};
