import { useEffect, useRef } from 'react';

import { useWindowSize } from './useWindowSize';

export const useFullHeight = () => {
  const ref = useRef<HTMLElement | null>(null);
  const { height } = useWindowSize();

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = `${height}px`;
    }
  }, [height]);

  return ref;
};
