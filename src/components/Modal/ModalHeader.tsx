import { ReactNode } from 'react';
import { FC } from 'react';

import * as styles from './styles';

export interface ModalHeaderProps {
  title: ReactNode;
  onClose?: () => void;
}

const ModalHeader: FC<ModalHeaderProps> = ({ title, onClose }) => {
  return (
    <div css={styles.containerHeader}>
      <h5>{title}</h5>
      {!!onClose && (
        <div css={styles.close} onClick={onClose}>
          x
        </div>
      )}
    </div>
  );
};

export default ModalHeader;
