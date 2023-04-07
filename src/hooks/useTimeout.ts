import { useCallback, useRef } from 'react';

export const useTimeout = <T extends (...args: any[]) => any>(callback: T, delay = 500) => {
  const callbackRef = useRef<T | null>(null);
  const timeoutIdRef = useRef<number | null>(null);

  // only execute during initialization
  if (!callbackRef.current) {
    callbackRef.current = callback;
  }

  const call = useCallback(() => {
    if (!timeoutIdRef.current) {
      timeoutIdRef.current = window.setTimeout(() => {
        callbackRef.current && callbackRef.current();
        timeoutIdRef.current = null;
      }, delay);
    }
  }, [delay]);

  const cancel = useCallback(() => {
    if (timeoutIdRef.current) {
      window.clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  }, []);

  return {
    call,
    cancel,
  };
};
