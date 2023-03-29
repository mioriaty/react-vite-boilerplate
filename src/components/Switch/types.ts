import { Interpolation, Theme } from '@emotion/react';
import { ReactNode } from 'react';

export interface SwitchProps {
  /** status active của component */
  checked?: boolean;
  /** default status active cuả component */
  defaultChecked?: boolean;
  /** children của khi active */
  CheckedChildren?: ReactNode;
  /** children của khi unactive */
  UnCheckedChildren?: ReactNode;
  /** Khi bật disabled thì nút mờ đi và không thể thực hiện event */
  disabled?: boolean;
  /** Khi bật loading thì nút sẽ ở trạng thái loading và không thể thực hiện event */
  loading?: boolean;
  /** Kích thước component */
  size?: Size;
  /** Background color khi active */
  activeColor?: keyof Theme['colors'];
  /** Background color khi chưa active */
  inactiveColor?: keyof Theme['colors'];
  containerCss?: Interpolation<Theme>;
  /** sự kiện onChange click vào component và nhận được event */
  onChange?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  /** sự kiện onChange click vào component và nhận được value */
  onValueChange?: (value: boolean) => void;
  ExtraNode?: (value: boolean) => ReactNode;
  radius?: number;
  className?: string;
}
