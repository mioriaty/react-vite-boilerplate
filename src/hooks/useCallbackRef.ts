import { useCallback, useEffect, useRef } from 'react';

export function useCallbackRef<T>(callback: T): [T, React.MutableRefObject<T>] {
  const callbackRef = useRef<T>(callback);

  const memoizedCallback = useCallback((...args: any[]) => {
    if (callbackRef.current) {
      (callbackRef.current as any)(...args);
    }
  }, []);

  // Update the callback reference when the callback prop changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return [memoizedCallback as T, callbackRef];
}
