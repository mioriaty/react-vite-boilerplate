import { Interpolation, Theme } from '@emotion/react';
import { forwardRef } from 'react';

import * as styles from './styles';

export interface SpinnerProps {
  /**
   * The color of the spinner
   */
  color?: keyof Theme['colors'];
  /**
   * Custom size of the spinner. If use thickness, props size will be removed
   * @default 15
   */
  thickness?: number;
  /**
   * The speed of the spinner.
   * @default 0.45
   */
  speed?: number;
  /**
   * For accessibility, it is important to add a fallback loading text.
   * This text will be visible to screen readers.
   * @default "Loading..."
   */
  label?: string;
  /**
   * custom css Spinner
   */
  css?: Interpolation<Theme>;
  /**
   * size of the spinner
   * @default size="small"
   */
  size?: Size;
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(({ thickness, speed = 0.45, color = 'primary', label, css, size = 'small' }, ref) => {
  return (
    <>
      <div ref={ref} css={[styles.spinnerStyle({ colorName: color, thickness, speed, size }), css]} />
      {label && <div>{label}</div>}
    </>
  );
});

Spinner.displayName = 'Spinner';
