import { Interpolation, Theme } from '@emotion/react';

type ProgressStatus = 'idle' | 'loading' | 'done';

export interface ProgressLoaderProps {
  status: ProgressStatus;
  color?: keyof Theme['colors'];
  duration?: number;
  containerCss?: Interpolation<Theme>;
  barCss?: Interpolation<Theme>;
  /** Xuất hiện phía trên cùng của trang */
  placementTop?: boolean;
  onDone?: () => void;
}
