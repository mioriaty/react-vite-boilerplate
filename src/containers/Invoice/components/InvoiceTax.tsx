import { invoiceSettingsSelector, setInvoiceSettings } from '@app/containers/Invoice/store';
import { Invoice } from '@app/containers/Invoice/types';
import { useAppDispatch, useAppSelector } from '@app/store';
import { calculateTotalPrice } from '@app/utils/calculateTotalPrice';
import { getSymbolAmount, moneyFormats } from '@app/utils/moneyFormat';
import { Col, Input, InputNumber, Row } from 'antd';

import * as styles from '../styles';

type FieldName = keyof Invoice;

export const InvoiceTax = () => {
  const { shipping, tax, noteDescription, noteTitle, productLines, currency } = useAppSelector(invoiceSettingsSelector);
  const dispatch = useAppDispatch();
  const calSubPrice = productLines.reduce((acc, curr) => acc + curr.salePrice * curr.quantity, 0);
  const subTotalPrice = getSymbolAmount(moneyFormats, currency, calSubPrice.toFixed(2));
  const calTotalPrice = calculateTotalPrice(calSubPrice, tax, shipping);
  const totalPrice = getSymbolAmount(moneyFormats, currency, calTotalPrice);

  const handleUpdateSetting = (fieldName: FieldName, value: string | number) => {
    dispatch(setInvoiceSettings({ [fieldName]: value }));
  };

  return (
    <div css={styles.invoiceTax.container}>
      <Row>
        <Col className="invoiceTax-left" flex={'50%'}>
          <strong css={{ lineHeight: '30px' }}>Note: </strong>
          <Input size="large" placeholder="Title..." value={noteTitle} onChange={e => handleUpdateSetting('noteTitle', e.target.value)} />
          <div css={{ height: '10px' }} />
          <Input.TextArea
            placeholder="Description..."
            size="large"
            rows={5}
            value={noteDescription}
            onChange={e => handleUpdateSetting('noteDescription', e.target.value)}
          />
        </Col>
        <Col className="invoiceTax-right" flex={'50%'}>
          <div css={styles.invoiceTax.totalContainer}>
            <Row style={{ marginBottom: '10px' }}>
              <Col flex={'50%'}>
                <label>Sub Total:</label>
              </Col>
              <Col flex={'50%'}>{subTotalPrice}</Col>
            </Row>

            <Row style={{ marginBottom: '10px' }}>
              <Col flex={'50%'}>
                <label>Tax (%):</label>
              </Col>
              <Col flex={'50%'}>
                <InputNumber style={{ width: '100%' }} value={tax} onChange={val => handleUpdateSetting('tax', val ?? 0)} />
              </Col>
            </Row>

            <Row style={{ marginBottom: '10px' }}>
              <Col flex={'50%'}>
                <label>Shipping:</label>
              </Col>
              <Col flex={'50%'}>
                <InputNumber style={{ width: '100%' }} value={shipping} onChange={val => handleUpdateSetting('shipping', val ?? 0)} />
              </Col>
            </Row>

            <Row style={{ marginBottom: '10px' }}>
              <Col flex={'50%'}>
                <label>Total:</label>
              </Col>
              <Col flex={'50%'}>
                <p css={{ marginBottom: '10px' }}>{totalPrice}</p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};
