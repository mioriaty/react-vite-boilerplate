import { TooltipProps } from '@app/components/Tooltip';
import { Interpolation, Theme } from '@emotion/react';
import { ButtonHTMLAttributes, DOMAttributes, ReactNode } from 'react';

export interface ButtonProps {
  /** React children */
  children: ReactNode;
  /** Các kích thước của button */
  size?: Size;
  /** Bật lên sẽ dài full 100% */
  block?: boolean;
  /** Thuộc tính href của thẻ a */
  href?: string;
  /** Thuộc tính target của thẻ a nhưng bỏ "_" ở trước */
  target?: '_blank' | 'self' | 'parent' | 'top';
  /** Khi bật disabled thì nút mờ đi và không thể thực hiện event */
  disabled?: boolean;
  /** Khi bật lên thì sẽ hiển thị icon loading bên trái */
  loading?: boolean;
  /** Thuộc tính type của thẻ button */
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  /** custom icon */
  Icon?: ReactNode;
  /** custom css */
  css?: Interpolation<Theme>;
  backgroundColor?: keyof Theme['colors'];
  color?: keyof Theme['colors'];
  /** Sự kiện click */
  onClick?: DOMAttributes<HTMLElement>['onClick'];
}
