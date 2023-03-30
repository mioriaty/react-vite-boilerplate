import { Theme } from '@emotion/react';
import { forwardRef, ForwardRefRenderFunction } from 'react';

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
   * className
   */
  className?: string;
  /**
   * size of the spinner
   * @default size="small"
   */
  size?: Size;
}

const SpinnerInternal: ForwardRefRenderFunction<HTMLDivElement, SpinnerProps> = (
  { thickness, speed = 0.45, color = 'primary', label, className, size = 'small' },
  ref,
) => {
  return (
    <>
      <div className={className} ref={ref} css={styles.spinnerStyle({ colorName: color, thickness, speed, size })} />
      {label && <div>{label}</div>}
    </>
  );
};
export const Spinner = forwardRef(SpinnerInternal);
