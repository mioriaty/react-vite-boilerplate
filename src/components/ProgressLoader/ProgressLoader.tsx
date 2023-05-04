import { createPortal } from '@app/utils/functions/createPortal';
import { isBrowser } from '@app/utils/isBrowser';
import { useTheme } from '@emotion/react';
import { FC, useEffect, useRef, useState } from 'react';

import * as styles from './styles';
import { ProgressLoaderProps } from './types';

let progressWrapperElement: HTMLDivElement | undefined;

if (isBrowser) {
  progressWrapperElement = document.createElement('div');
  progressWrapperElement.id = 'progress-wrapper-element';
  document.body.appendChild(progressWrapperElement);
}

export const ProgressLoader: FC<ProgressLoaderProps> = ({
  status,
  barCss,
  color = 'primary',
  containerCss,
  duration = 300,
  placementTop = false,
  onDone,
}) => {
  const [doneState, setDoneState] = useState(true);
  const intervalRef = useRef(-1);
  const timeoutRef = useRef(-1);
  const { colors } = useTheme();

  useEffect(() => {
    if (status !== 'done') {
      // setCount(0);
      setDoneState(false);
    }
  }, [status]);

  useEffect(() => {
    if (isBrowser) {
      if (status === 'done') {
        clearInterval(intervalRef.current);
        timeoutRef.current = window.setTimeout(() => {
          setDoneState(true);
          clearTimeout(timeoutRef.current);
          onDone?.();
        }, duration);
        return () => {
          clearTimeout(timeoutRef.current);
        };
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, duration]);

  const content = (
    <div css={[styles.container(placementTop), containerCss]} style={doneState || status === 'idle' ? { display: 'none' } : {}}>
      <div
        css={[barCss, styles.bar, status === 'loading' ? styles.animation : {}, { backgroundColor: colors[color] }]}
        style={status === 'done' ? { transform: 'translateX(0)' } : {}}
      />
    </div>
  );

  if (placementTop) {
    return createPortal(content);
  }

  return content;
};
