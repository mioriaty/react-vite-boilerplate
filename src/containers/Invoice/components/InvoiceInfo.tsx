import { UploadOutlined } from '@ant-design/icons';
import { invoiceRequestSelector, invoiceSettingsSelector, setInvoiceSettings, uploadLogoPending } from '@app/containers/Invoice/store';
import { Invoice } from '@app/containers/Invoice/types';
import { useAppDispatch, useAppSelector } from '@app/store';
import { debounce } from '@app/utils/functions/debounce';
import { currencyData } from '@app/utils/moneyFormat';
import { useTheme } from '@emotion/react';
import { Button, Col, DatePicker, Form, FormItemProps, Input, notification, Row, Select, Upload, UploadProps } from 'antd';

import * as styles from '../styles';

const dateFormat = 'DD/MM/YYYY';

const formItemProps: FormItemProps = {
  labelCol: { flex: '30%', style: { textAlign: 'left' } },
  style: { marginBottom: '10px' },
};

const max_size_upload = 5;

export const InvoiceInfo = () => {
  const { logo, invoiceTitle, currency, language, color, type, badge } = useAppSelector(invoiceSettingsSelector);
  const { uploadLogoStatus, languages } = useAppSelector(invoiceRequestSelector);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const handleUpload: UploadProps['customRequest'] = ({ file, onSuccess, onError }) => {
    const _file = file as File;
    dispatch(
      uploadLogoPending({
        file: _file,
        onFulfilled() {
          onSuccess?.('Upload successfully');
        },
        onFailed() {
          onError?.(new Error('Upload failed'));
        },
      }),
    );
  };

  const handleChangeSettings = (fieldName: keyof Invoice, value: string | number) => {
    dispatch(
      setInvoiceSettings({
        [fieldName]: value,
      }),
    );
  };

  const handleChangeColor = debounce((value: string) => {
    dispatch(
      setInvoiceSettings({
        color: value,
      }),
    );
  }, 300);

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
          <Upload
            accept=".png, .jpeg, .jpg"
            customRequest={handleUpload}
            fileList={[]}
            beforeUpload={file => {
              const sizeMB = file.size / 1024 / 1024;
              if (sizeMB > max_size_upload) {
                notification.error({
                  message: `Image must be smaller ${max_size_upload}MB`,
                });
                return false;
              }
              return true;
            }}
          >
            <Button loading={uploadLogoStatus === 'loading'} size="large" icon={<UploadOutlined />}>
              Click to Upload
            </Button>
          </Upload>

          <p css={{ marginTop: '10px' }}>Add your logo (png/jpg format) to the Invoice. The maximum file size is 5MB.</p>
        </Col>
        <Col className="invoiceInfo-right" xs={{ flex: '100%' }} flex={'50%'}>
          <Form.Item {...formItemProps} label={<strong css={{ fontSize: '14px' }}>Invoice Code</strong>}>
            <Input size="large" value={invoiceTitle} onChange={e => handleChangeSettings('invoiceTitle', e.target.value)} />
          </Form.Item>

          <Form.Item {...formItemProps} label={<strong css={{ fontSize: '14px' }}>Invoice Type</strong>}>
            <Input size="large" placeholder="Sale Invoice" value={type} onChange={e => handleChangeSettings('type', e.target.value)} />
          </Form.Item>

          <Form.Item {...formItemProps} label={<strong css={{ fontSize: '14px' }}>Invoice Badge</strong>}>
            <Input size="large" placeholder="Payment Paid" value={badge} onChange={e => handleChangeSettings('badge', e.target.value)} />
          </Form.Item>

          <Form.Item {...formItemProps} label={<strong css={{ fontSize: '14px' }}>Invoice Date</strong>}>
            <DatePicker
              size="large"
              format={dateFormat}
              css={{ width: '100%' }}
              onChange={(_, dateString) => handleChangeSettings('invoiceDate', dateString)}
            />
          </Form.Item>

          <Form.Item {...formItemProps} label={<strong css={{ fontSize: '14px' }}>Invoice Color</strong>}>
            <div css={styles.invoiceInfo.colorContainer}>
              <div css={{ flex: '1' }}>{color}</div>
              <div css={{ width: '70px' }}>
                <Input size="large" type="color" value={color} onChange={e => handleChangeColor(e.target.value)} />
              </div>
            </div>
          </Form.Item>

          <Form.Item
            {...formItemProps}
            label={<strong css={{ fontSize: '14px', whiteSpace: 'break-spaces', lineHeight: '16px' }}>Language displayed on the invoice</strong>}
          >
            <Select
              size="large"
              filterOption={(input, option) => {
                return (option?.label as unknown as string).toLowerCase().includes(input.toLowerCase());
              }}
              value={language}
              showSearch
              options={languages}
              onChange={val => handleChangeSettings('language', val)}
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
