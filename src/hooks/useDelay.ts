import { useEffect, useRef } from 'react';

export type Delay = (ms?: number) => Promise<number>;
export type Cancel = () => void;

export const useDelay = (): [Delay, Cancel] => {
  const cancelRef = useRef(-1);

  const delay: Delay = (ms = 0) => {
    return new Promise(resolve => {
      cancelRef.current = window.setTimeout(() => {
        resolve(cancelRef.current);
        clearTimeout(cancelRef.current);
      }, ms);
    });
  };

  const cancel = () => {
    clearTimeout(cancelRef.current);
  };

  useEffect(() => {
    return () => {
      clearTimeout(cancelRef.current);
    };
  }, []);

  return [delay, cancel];
};
