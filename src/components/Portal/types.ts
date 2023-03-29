import { Interpolation, Theme } from '@emotion/react';
import { ReactNode } from 'react';

export interface PortalProps {
  overlay?: ReactNode;
  visible: boolean;
  containerCss?: Interpolation<Theme>;
  bodyCss?: Interpolation<Theme>;
  onOutsideClick?: () => void;
  children?: ReactNode;
}
