import { InvoiceInfo } from '@app/containers/Invoice/components/InvoiceInfo';

import * as styles from './styles';

export const InvoiceForm: React.FC = () => {
  return (
    <div css={styles.container}>
      <InvoiceInfo />
    </div>
  );
};
