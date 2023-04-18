import { UploadOutlined } from '@ant-design/icons';
import { invoiceSelector, setInvoiceSettings } from '@app/containers/Invoice/store';
import { useAppDispatch, useAppSelector } from '@app/store';
import { Button, Col, Form, Input, Row, Upload, UploadProps } from 'antd';

import * as styles from '../styles';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const InvoiceInfo = () => {
  const { logo } = useAppSelector(invoiceSelector);
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
          <Form {...layout} name="nest-messages">
            <Form.Item name={['user', 'name']} label={<strong>Invoice No</strong>}>
              <Input />
            </Form.Item>
            <Form.Item name={['user', 'email']} label={<strong>Invoice Date</strong>}>
              <Input />
            </Form.Item>
            <Form.Item name={['user', 'age']} label={<strong>Due Date</strong>}>
              <Input />
            </Form.Item>
            <Form.Item name={['user', 'website']} label={<strong>Currency</strong>}>
              <Input />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
