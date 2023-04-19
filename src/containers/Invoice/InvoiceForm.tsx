import { InvoiceBilling } from '@app/containers/Invoice/components/InvoiceBilling';
import { InvoiceInfo } from '@app/containers/Invoice/components/InvoiceInfo';
import { InvoiceProducts } from '@app/containers/Invoice/components/InvoiceProducts';
import { InvoiceTax } from '@app/containers/Invoice/components/InvoiceTax';
import { Divider } from 'antd';

import * as styles from './styles';

export const InvoiceForm: React.FC = () => {
  return (
    <div css={styles.container}>
      <InvoiceInfo />
      <Divider />
      <InvoiceBilling />
      <Divider />
      <InvoiceProducts />
      <InvoiceTax />
    </div>
  );
};
