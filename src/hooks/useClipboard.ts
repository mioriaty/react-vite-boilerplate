import { useState } from 'react';

type CopyState = 'READY' | 'SUCCESS' | Error;

export const useClipboard = ({ delay = 2500 } = {}) => {
  const [state, setState] = useState<CopyState>('READY');
  const [copyTimeout, setCopyTimeout] = useState<ReturnType<typeof setTimeout>>();

  const handleCopyResult = (result: CopyState) => {
    setState(result);
    clearTimeout(copyTimeout);
    setCopyTimeout(setTimeout(() => setState('READY'), delay));
  };

  const copy = (valueCopy: string) => {
    if ('clipboard' in navigator) {
      navigator.clipboard
        .writeText(valueCopy)
        .then(() => handleCopyResult('SUCCESS'))
        .catch(error => error instanceof Error && handleCopyResult(error));
    } else {
      handleCopyResult(new Error('`useClipboard`: Navigation Clipboard is not supported'));
    }
  };

  return {
    copy,
    state,
  };
};
