import { ClearOutlined, DownloadOutlined, PrinterOutlined, SendOutlined } from '@ant-design/icons';
import {
  defaultInvoice,
  invoiceRequestSelector,
  invoiceSettingsSelector,
  setInvoiceSettings,
  submitInvoicePending,
} from '@app/containers/Invoice/store';
import { InvoiceSubmitType } from '@app/services/Invoice/@types';
import { useAppDispatch, useAppSelector } from '@app/store';
import { Button, message } from 'antd';

import * as styles from './styles';

export const GroupButton = () => {
  const invoice = useAppSelector(invoiceSettingsSelector);
  const { submitStatus } = useAppSelector(invoiceRequestSelector);
  const dispatch = useAppDispatch();

  const handleResetInvoice = () => {
    dispatch(setInvoiceSettings(defaultInvoice));
  };

  const handleSubmit = (type: InvoiceSubmitType) => {
    if (
      invoice.clientEmail === '' ||
      invoice.clientName === '' ||
      invoice.yourCompanyName === '' ||
      invoice.yourEmail === '' ||
      invoice.yourName === ''
    ) {
      message.warning('Mandatory fields are marked with an asterisk (*) cannot be empty');
    } else {
      dispatch(submitInvoicePending({ type, invoice }));
    }
  };

  return (
    <div css={styles.buttonContainer}>
      <div className="buttons">
        <Button
          loading={submitStatus['view'] === 'loading'}
          type="primary"
          size="large"
          css={{ borderRadius: '6px' }}
          onClick={() => handleSubmit('view')}
          icon={<DownloadOutlined />}
        >
          Download Invoice
        </Button>
        <Button
          loading={submitStatus['email'] === 'loading'}
          size="large"
          css={{ borderRadius: '6px' }}
          onClick={() => handleSubmit('email')}
          icon={<SendOutlined />}
        >
          Send Email
        </Button>
        <Button
          loading={submitStatus['print'] === 'loading'}
          size="large"
          css={{ borderRadius: '6px' }}
          onClick={() => handleSubmit('print')}
          icon={<PrinterOutlined />}
        >
          Print
        </Button>
        <Button danger size="large" css={{ borderRadius: '6px' }} onClick={handleResetInvoice} icon={<ClearOutlined />}>
          Clear Invoice
        </Button>
      </div>
    </div>
  );
};
