import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, Row, Upload, UploadProps } from 'antd';
import { useState } from 'react';

export const InvoiceInfo = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleUpload: UploadProps['customRequest'] = ({ file }) => {
    const reader = new FileReader();
    reader.readAsText(file as File);
    console.log(file);
    reader.onload = event => {
      const result = event.target?.result;
      console.log(result);
    };
  };

  return (
    <Row gutter={[10, 10]} css={{ paddingTop: '50px' }}>
      <Col xs={{ flex: '100%' }} flex={'50%'}>
        <Upload accept=".png, .jpeg, .jpg, .webp, .svg" customRequest={handleUpload}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        {imageUrl && (
          <div>
            <img src={imageUrl} alt="Uploaded Image" style={{ maxWidth: '100%' }} />
          </div>
        )}
      </Col>
      <Col xs={{ flex: '100%' }} flex={'50%'}>
        <h1>INVOICE</h1>
      </Col>
    </Row>
  );
};
