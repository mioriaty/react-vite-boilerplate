import { Interpolation, Theme } from '@emotion/react';
import { forwardRef } from 'react';

import * as styles from './styles';

export interface SpinnerProps {
  /**
   * The color of the spinner
   */
  color?: keyof Theme['colors'];
  /**
   * The size of the spinner
   * @default 15
   * @example
   * ```jsx
   * <Spinner size={4} />
   * ```
   */
  size?: number;
  /**
   * The speed of the spinner.
   * @default 0.45
   * @example
   * ```jsx
   * <Spinner speed={0.2} />
   * ```
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
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(({ size = 15, speed = 0.45, color = 'primary', label, css }, ref) => {
  return (
    <>
      <div ref={ref} css={[styles.spinnerStyle({ colorName: color, size, speed }), css]} />
      {label && <div>{label}</div>}
    </>
  );
});

Spinner.displayName = 'Spinner';
