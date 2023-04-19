import { invoiceSelector, setInvoiceSettings } from '@app/containers/Invoice/store';
import { useAppDispatch, useAppSelector } from '@app/store';
import { calculateTotalPrice } from '@app/utils/calculateTotalPrice';
import { getSymbolAmount, moneyFormats } from '@app/utils/moneyFormat';
import { Col, Input, InputNumber, Row } from 'antd';

import * as styles from '../styles';

export const InvoiceTax = () => {
  const { shipping, amountPaid, tax, discount, notes, productLines, currency } = useAppSelector(invoiceSelector);
  const dispatch = useAppDispatch();
  const calSubPrice = productLines.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const subTotalPrice = getSymbolAmount(moneyFormats, currency, calSubPrice.toFixed(2));
  const calTotalPrice = calculateTotalPrice(calSubPrice, tax, discount, shipping, amountPaid);
  const totalPrice = getSymbolAmount(moneyFormats, currency, calTotalPrice);

  const changeNote = (value: string) => {
    dispatch(setInvoiceSettings({ notes: value }));
  };

  const changeTax = (value: number) => {
    dispatch(setInvoiceSettings({ tax: value }));
  };

  const changeDiscount = (value: number) => {
    dispatch(setInvoiceSettings({ discount: value }));
  };

  const changeShipping = (value: number) => {
    dispatch(setInvoiceSettings({ shipping: value }));
  };

  const changeAmountPaid = (value: number) => {
    dispatch(setInvoiceSettings({ amountPaid: value }));
  };

  return (
    <div css={styles.invoiceTax.container}>
      <Row>
        <Col className="invoiceTax-left" flex={'50%'}>
          <strong css={{ lineHeight: '30px' }}>Note: </strong>
          <Input.TextArea size="large" rows={5} value={notes} onChange={e => changeNote(e.target.value)} />
        </Col>
        <Col className="invoiceTax-right" flex={'50%'}>
          <div css={styles.invoiceTax.totalContainer}>
            <Row style={{ marginBottom: '10px' }}>
              <Col flex={'50%'}>
                <label>Sub Total:</label>
              </Col>
              <Col flex={'50%'}>
                <p css={{ marginBottom: '10px' }}>{subTotalPrice}</p>
              </Col>
            </Row>

            <Row style={{ marginBottom: '10px' }}>
              <Col flex={'50%'}>
                <label>Tax (%):</label>
              </Col>
              <Col flex={'50%'}>
                <InputNumber style={{ width: '100%' }} value={tax} onChange={val => changeTax(val ?? 0)} />
              </Col>
            </Row>

            <Row style={{ marginBottom: '10px' }}>
              <Col flex={'50%'}>
                <label>Discount (%):</label>
              </Col>
              <Col flex={'50%'}>
                <InputNumber style={{ width: '100%' }} value={discount} onChange={val => changeDiscount(val ?? 0)} />
              </Col>
            </Row>

            <Row style={{ marginBottom: '10px' }}>
              <Col flex={'50%'}>
                <label>Shipping:</label>
              </Col>
              <Col flex={'50%'}>
                <InputNumber style={{ width: '100%' }} value={shipping} onChange={val => changeShipping(val ?? 0)} />
              </Col>
            </Row>

            <Row style={{ marginBottom: '10px' }}>
              <Col flex={'50%'}>
                <label>Amount Paid:</label>
              </Col>
              <Col flex={'50%'}>
                <InputNumber style={{ width: '100%' }} value={amountPaid} onChange={val => changeAmountPaid(val ?? 0)} />
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
