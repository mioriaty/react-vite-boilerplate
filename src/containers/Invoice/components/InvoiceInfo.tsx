import { UploadOutlined } from '@ant-design/icons';
import { invoiceSelector, setInvoiceSettings } from '@app/containers/Invoice/store';
import { Invoice } from '@app/containers/Invoice/types';
import { useAppDispatch, useAppSelector } from '@app/store';
import { currencyData } from '@app/utils/moneyFormat';
import { useTheme } from '@emotion/react';
import { Button, Col, DatePicker, Form, FormItemProps, Input, Row, Select, Upload, UploadProps } from 'antd';

import * as styles from '../styles';

const dateFormat = 'DD/MM/YYYY';

const formItemProps: FormItemProps = {
  labelCol: { flex: '30%', style: { textAlign: 'left' } },
  style: { marginBottom: '10px' },
};

export const InvoiceInfo = () => {
  const { logo, invoiceTitle, currency } = useAppSelector(invoiceSelector);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const handleUpload: UploadProps['customRequest'] = ({ file, onSuccess, onError }) => {
    const reader = new FileReader();
    reader.readAsDataURL(file as File);
    reader.onload = event => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        dispatch(setInvoiceSettings({ logo: result }));
        onSuccess?.('Upload successfully');
      } else {
        onError?.(new Error('Upload failed'));
      }
    };
  };

  const handleChangeSettings = (fieldName: keyof Invoice, value: string | number) => {
    dispatch(
      setInvoiceSettings({
        [fieldName]: value,
      }),
    );
  };

  return (
    <div css={styles.invoiceInfo.container}>
      <h1 css={styles.invoiceInfo.label}>
        <span css={{ color: theme.colors.primary }}>Myshopkit</span> Invoice Generator
      </h1>
      <Row className="invoiceInfo-row" gutter={[60, 20]}>
        <Col className="invoiceInfo-left" xs={{ flex: '100%' }} flex={'50%'}>
          {logo && (
            <div css={styles.invoiceInfo.imageContainer}>
              <img src={logo} alt="Uploaded Image" />
            </div>
          )}
          <Upload accept=".png, .jpeg, .jpg, .svg" customRequest={handleUpload} fileList={[]}>
            <Button size="large" icon={<UploadOutlined />}>
              Click to Upload
            </Button>
            <p>Recommended logo size is 50x50 (px)</p>
          </Upload>
        </Col>
        <Col className="invoiceInfo-right" xs={{ flex: '100%' }} flex={'50%'}>
          <Form.Item {...formItemProps} label={<strong css={{ fontSize: '14px' }}>Invoice No</strong>}>
            <Input size="large" value={invoiceTitle} onChange={e => handleChangeSettings('invoiceTitle', e.target.value)} />
          </Form.Item>

          <Form.Item {...formItemProps} label={<strong css={{ fontSize: '14px' }}>Invoice Date</strong>}>
            <DatePicker
              size="large"
              format={dateFormat}
              css={{ width: '100%' }}
              onChange={(_, dateString) => handleChangeSettings('invoiceDate', dateString)}
            />
          </Form.Item>

          <Form.Item {...formItemProps} label={<strong css={{ fontSize: '14px' }}>Due Date</strong>}>
            <DatePicker
              size="large"
              format={dateFormat}
              css={{ width: '100%' }}
              onChange={(_, dateString) => handleChangeSettings('invoiceDueDate', dateString)}
            />
          </Form.Item>

          <Form.Item {...formItemProps} label={<strong css={{ fontSize: '14px' }}>Currency</strong>}>
            <Select
              size="large"
              filterOption={(input, option) => {
                return (option?.label as unknown as string).toLowerCase().includes(input.toLowerCase());
              }}
              value={currency}
              defaultValue={currency}
              showSearch
              options={currencyData}
              onChange={val => handleChangeSettings('currency', val)}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};
