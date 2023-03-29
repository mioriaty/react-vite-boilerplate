import { Interpolation, Theme } from '@emotion/react';
import { ReactNode } from 'react';

export interface TooltipProps {
  /** Vị trí hiển thị tooltip */
  placement?: 'top' | 'right' | 'bottom' | 'left';
  /** Text hiển thị khi hover vào tooltip */
  text: string;
  /** Bật chức năng portal */
  portal?: boolean;
  className?: string;
  css?: Interpolation<Theme>;
  children: ReactNode;
  onClick?: () => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
