import { invoiceSelector, setInvoiceSettings } from '@app/containers/Invoice/store';
import { Invoice } from '@app/containers/Invoice/types';
import { useAppDispatch, useAppSelector } from '@app/store';
import { COUNTRIES } from '@app/utils/listCountries';
import { Col, Form, FormItemProps, Input, Row, Select } from 'antd';

import * as styles from '../styles';

const formItemProps: FormItemProps = {
  labelCol: { flex: '30%', style: { textAlign: 'left' } },
  style: { marginBottom: '10px' },
};

export const InvoiceBilling = () => {
  const { yourAddress, yourCountry, yourEmail, yourName, yourZipCode, clientAddress, clientCountry, clientEmail, clientName, clientZipCode } =
    useAppSelector(invoiceSelector);
  const dispatch = useAppDispatch();

  const handleUpdateSetting = (fieldName: keyof Invoice, value: string | number) => {
    dispatch(setInvoiceSettings({ [fieldName]: value }));
  };

  return (
    <div css={styles.invoiceBilling.container}>
      <Row className="invoiceBilling-row" gutter={[60, 20]}>
        <Col className="invoiceBilling-left" xs={{ flex: '100%' }} flex={'50%'}>
          <h2 css={styles.invoiceBilling.label}>Billing From</h2>

          <Form.Item {...formItemProps} required label={<strong css={{ fontSize: '14px' }}>Your Name</strong>}>
            <Input size="large" value={yourName} onChange={e => handleUpdateSetting('yourName', e.target.value)} />
          </Form.Item>

          <Form.Item
            {...formItemProps}
            required
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
            label={<strong css={{ fontSize: '14px' }}>Email Address</strong>}
          >
            <Input size="large" value={yourEmail} onChange={e => handleUpdateSetting('yourEmail', e.target.value)} />
          </Form.Item>

          <Form.Item {...formItemProps} label={<strong css={{ fontSize: '14px' }}>City</strong>}>
            <Input size="large" value={yourAddress} onChange={e => handleUpdateSetting('yourAddress', e.target.value)} />
          </Form.Item>

          <Form.Item {...formItemProps} label={<strong css={{ fontSize: '14px' }}>Country</strong>}>
            <Select
              placeholder="Select country"
              size="large"
              showSearch
              options={COUNTRIES}
              value={yourCountry === '' ? undefined : yourCountry}
              onChange={val => handleUpdateSetting('yourCountry', val)}
            />
          </Form.Item>

          <Form.Item {...formItemProps} label={<strong css={{ fontSize: '14px' }}>Zip Code</strong>}>
            <Input size="large" value={yourZipCode} onChange={e => handleUpdateSetting('yourZipCode', e.target.value)} />
          </Form.Item>
        </Col>

        <Col className="invoiceBilling-right" xs={{ flex: '100%' }} flex={'50%'}>
          <h2 css={styles.invoiceBilling.label}>Billing To</h2>

          <Form.Item {...formItemProps} required label={<strong css={{ fontSize: '14px' }}>Customer&apos;s Name</strong>}>
            <Input size="large" value={clientName} onChange={e => handleUpdateSetting('clientName', e.target.value)} />
          </Form.Item>

          <Form.Item
            {...formItemProps}
            required
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
            label={<strong css={{ fontSize: '14px' }}>Email Address</strong>}
          >
            <Input size="large" value={clientEmail} onChange={e => handleUpdateSetting('clientEmail', e.target.value)} />
          </Form.Item>

          <Form.Item {...formItemProps} label={<strong css={{ fontSize: '14px' }}>City</strong>}>
            <Input size="large" value={clientAddress} onChange={e => handleUpdateSetting('clientAddress', e.target.value)} />
          </Form.Item>

          <Form.Item {...formItemProps} label={<strong css={{ fontSize: '14px' }}>Country</strong>}>
            <Select
              placeholder="Select country"
              size="large"
              showSearch
              options={COUNTRIES}
              value={clientCountry === '' ? undefined : clientCountry}
              onChange={val => handleUpdateSetting('clientCountry', val)}
            />
          </Form.Item>

          <Form.Item {...formItemProps} label={<strong css={{ fontSize: '14px' }}>Zip Code</strong>}>
            <Input size="large" value={clientZipCode} onChange={e => handleUpdateSetting('clientZipCode', e.target.value)} />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};
