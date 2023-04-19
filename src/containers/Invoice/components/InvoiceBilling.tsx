import { invoiceSelector, setInvoiceSettings } from '@app/containers/Invoice/store';
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

  // Billing From
  const changeYourName = (value: string) => {
    dispatch(setInvoiceSettings({ yourName: value }));
  };

  const changeYourEmailAddress = (value: string) => {
    dispatch(setInvoiceSettings({ yourEmail: value }));
  };

  const changeYourCity = (value: string) => {
    dispatch(setInvoiceSettings({ yourAddress: value }));
  };

  const changeYourCountry = (value: string) => {
    dispatch(setInvoiceSettings({ yourCountry: value }));
  };

  const changeYourZipCode = (value: string) => {
    dispatch(setInvoiceSettings({ yourZipCode: value }));
  };

  // Billing To
  const changeClientName = (value: string) => {
    dispatch(setInvoiceSettings({ clientName: value }));
  };

  const changeClientEmail = (value: string) => {
    dispatch(setInvoiceSettings({ clientEmail: value }));
  };

  const changeClientAddress = (value: string) => {
    dispatch(setInvoiceSettings({ clientAddress: value }));
  };

  const changeClientCountry = (value: string) => {
    dispatch(setInvoiceSettings({ clientCountry: value }));
  };

  const changeClientZipCode = (value: string) => {
    dispatch(setInvoiceSettings({ clientZipCode: value }));
  };

  return (
    <div css={styles.invoiceBilling.container}>
      <Row className="invoiceBilling-row" gutter={[60, 20]}>
        <Col className="invoiceBilling-left" xs={{ flex: '100%' }} flex={'50%'}>
          <h2 css={styles.invoiceBilling.label}>Billing From</h2>

          <Form.Item {...formItemProps} required label={<strong css={{ fontSize: '14px' }}>Your Name</strong>}>
            <Input size="large" value={yourName} onChange={e => changeYourName(e.target.value)} />
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
            <Input size="large" value={yourEmail} onChange={e => changeYourEmailAddress(e.target.value)} />
          </Form.Item>

          <Form.Item {...formItemProps} label={<strong css={{ fontSize: '14px' }}>City</strong>}>
            <Input size="large" value={yourAddress} onChange={e => changeYourCity(e.target.value)} />
          </Form.Item>

          <Form.Item {...formItemProps} label={<strong css={{ fontSize: '14px' }}>Country</strong>}>
            <Select size="large" showSearch options={COUNTRIES} value={yourCountry} onChange={changeYourCountry} />
          </Form.Item>

          <Form.Item {...formItemProps} label={<strong css={{ fontSize: '14px' }}>Zip Code</strong>}>
            <Input size="large" value={yourZipCode} onChange={e => changeYourZipCode(e.target.value)} />
          </Form.Item>
        </Col>

        <Col className="invoiceBilling-right" xs={{ flex: '100%' }} flex={'50%'}>
          <h2 css={styles.invoiceBilling.label}>Billing To</h2>

          <Form.Item {...formItemProps} required label={<strong css={{ fontSize: '14px' }}>Customer&apos;s Name</strong>}>
            <Input size="large" value={clientName} onChange={e => changeClientName(e.target.value)} />
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
            <Input size="large" value={clientEmail} onChange={e => changeClientEmail(e.target.value)} />
          </Form.Item>

          <Form.Item {...formItemProps} label={<strong css={{ fontSize: '14px' }}>City</strong>}>
            <Input size="large" value={clientAddress} onChange={e => changeClientAddress(e.target.value)} />
          </Form.Item>

          <Form.Item {...formItemProps} label={<strong css={{ fontSize: '14px' }}>Country</strong>}>
            <Select size="large" showSearch options={COUNTRIES} value={clientCountry} onChange={changeClientCountry} />
          </Form.Item>

          <Form.Item {...formItemProps} label={<strong css={{ fontSize: '14px' }}>Zip Code</strong>}>
            <Input size="large" value={clientZipCode} onChange={e => changeClientZipCode(e.target.value)} />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};
