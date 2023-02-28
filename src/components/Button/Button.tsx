import { FC, ReactNode } from 'react';

import * as styles from './styles';

export interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      css={styles.container}
      onClick={() => {
        onClick?.();
      }}
    >
      {children}
    </button>
  );
};
