import { ClearOutlined, DownloadOutlined, PrinterOutlined, SendOutlined } from '@ant-design/icons';
import { defaultInvoice, setInvoiceSettings } from '@app/containers/Invoice/store';
import { useAppDispatch } from '@app/store';
import { Button } from 'antd';

import * as styles from './styles';

export const GroupButton = () => {
  const dispatch = useAppDispatch();

  const handleResetInvoice = () => {
    dispatch(setInvoiceSettings(defaultInvoice));
  };

  return (
    <div css={styles.buttonContainer}>
      <div className="buttons">
        <Button type="primary" size="large" css={{ borderRadius: '6px' }}>
          Download Invoice <DownloadOutlined />
        </Button>
        <Button size="large" css={{ borderRadius: '6px' }}>
          Send Email <SendOutlined />
        </Button>
        <Button size="large" css={{ borderRadius: '6px' }}>
          Print <PrinterOutlined />
        </Button>
        <Button danger size="large" css={{ borderRadius: '6px' }} onClick={handleResetInvoice}>
          Clear Invoice <ClearOutlined />
        </Button>
      </div>
    </div>
  );
};
