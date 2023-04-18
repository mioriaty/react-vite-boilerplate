import { UploadOutlined } from '@ant-design/icons';
import { invoiceSelector, setInvoiceSettings } from '@app/containers/Invoice/store';
import { withDebounce } from '@app/hocs/withDebounce';
import { useAppDispatch, useAppSelector } from '@app/store';
import { debounce } from '@app/utils/functions/debounce';
import { Button, Col, DatePicker, Form, Input, Row, Upload, UploadProps } from 'antd';
import { ChangeEvent } from 'react';

import * as styles from '../styles';

const dateFormat = 'DD/MM/YYYY';

export const InvoiceInfo = () => {
  const { logo, invoiceTitle, invoiceDate } = useAppSelector(invoiceSelector);
  const dispatch = useAppDispatch();

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

  const changeInvoiceNo = debounce((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setInvoiceSettings({
        invoiceTitle: event.target.value,
      }),
    );
  }, 300);

  const changeInvoiceDate = (date: string) => {
    dispatch(
      setInvoiceSettings({
        invoiceDate: date,
      }),
    );
  };

  return (
    <div css={{ paddingTop: '50px' }}>
      <h1 css={styles.invoiceInfo.label}>INVOICE</h1>
      <Row gutter={[10, 10]}>
        <Col xs={{ flex: '100%' }} flex={'50%'}>
          {logo && (
            <div css={styles.invoiceInfo.imageContainer}>
              <img src={logo} alt="Uploaded Image" />
            </div>
          )}
          <Upload accept=".png, .jpeg, .jpg, .webp, .svg" customRequest={handleUpload} fileList={[]}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
            <p>Recommended logo size is 50x50 (px)</p>
          </Upload>
        </Col>
        <Col xs={{ flex: '100%' }} flex={'50%'}>
          <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} name="invoice-info-form">
            <Form.Item name={'invoiceTitle'} label={<strong>Invoice No</strong>}>
              <Input value={invoiceTitle} onChange={changeInvoiceNo} />
            </Form.Item>

            <Form.Item name={'invoiceDate'} label={<strong>Invoice Date</strong>}>
              <DatePicker format={dateFormat} css={{ width: '100%' }} onChange={(_, dateString) => changeInvoiceDate(dateString)} />
            </Form.Item>

            <Form.Item name={'invoiceDueDate'} label={<strong>Due Date</strong>}>
              <DatePicker css={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name={'currency'} label={<strong>Currency</strong>}>
              <Input />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
