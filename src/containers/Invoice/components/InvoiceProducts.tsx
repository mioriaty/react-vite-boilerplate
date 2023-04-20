import { editProductLine, invoiceSettingsSelector, setInvoiceSettings } from '@app/containers/Invoice/store';
import { ProductLine } from '@app/containers/Invoice/types';
import { useAppDispatch, useAppSelector } from '@app/store';
import { debounce } from '@app/utils/functions/debounce';
import { getSymbolAmount, moneyFormats } from '@app/utils/moneyFormat';
import { Button, Input, InputNumber } from 'antd';
import { v4 } from 'uuid';

import * as styles from '../styles';

export const InvoiceProducts = () => {
  const { productLines, currency } = useAppSelector(invoiceSettingsSelector);
  const dispatch = useAppDispatch();

  const updateProductLines = (data: ProductLine[]) => {
    dispatch(setInvoiceSettings({ productLines: data }));
  };

  const handleDelete = (id: string) => {
    const newData = productLines.filter(item => item.id !== id);
    updateProductLines(newData);
  };

  const handleAdd = () => {
    const newData: ProductLine = {
      id: v4(),
      description: '',
      name: '',
      regularPrice: 0,
      quantity: 0,
      salePrice: 0,
    };
    updateProductLines([...productLines, newData]);
  };

  const handleChangeName = debounce((value: string, id: string) => {
    dispatch(editProductLine({ id, name: value }));
  }, 300);

  const handleChangeDescription = (value: string, id: string) => {
    dispatch(editProductLine({ id, description: value }));
  };

  const handleChangeQuantity = (value: number, id: string) => {
    dispatch(editProductLine({ id, quantity: value }));
  };

  const handleChangeRegularPrice = (value: number, id: string) => {
    dispatch(editProductLine({ id, regularPrice: value }));
  };

  const handleChangeSalePrice = (value: number, id: string) => {
    dispatch(editProductLine({ id, salePrice: value }));
  };

  return (
    <div css={styles.invoiceProducts.container}>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add Item
      </Button>
      <table css={styles.invoiceProducts.table}>
        <thead>
          <tr>
            <th css={{ minWidth: '617px' }}>Item</th>
            <th css={{ minWidth: '100px' }}>Quantity</th>
            <th css={{ minWidth: '100px' }}>Regular price</th>
            <th css={{ minWidth: '100px' }}>Sale price</th>
            <th css={{ minWidth: '50px' }}>Amount</th>
            <th css={{ minWidth: '50px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {productLines.map(item => {
            const _price = ((item.salePrice ? item.salePrice : item.regularPrice) * item.quantity).toFixed(2);
            const _totalPrice = getSymbolAmount(moneyFormats, currency, _price);
            return (
              <tr key={item.id}>
                <td className="invoiceProducts-first-col" css={{ width: '100%' }}>
                  <Input placeholder="Enter Item Name" css={{ marginBottom: '10px' }} onChange={e => handleChangeName(e.target.value, item.id)} />
                  <Input.TextArea
                    value={item.description}
                    placeholder="Enter Item Description"
                    onChange={e => handleChangeDescription(e.target.value, item.id)}
                  />
                </td>
                <td css={{ minWidth: '70px' }}>
                  <InputNumber value={item.quantity} onChange={val => handleChangeQuantity(val ?? 0, item.id)} />
                </td>
                <td css={{ minWidth: '100px' }}>
                  <InputNumber value={item.regularPrice} onChange={val => handleChangeRegularPrice(val ?? 0, item.id)} />
                </td>
                <td css={{ minWidth: '100px' }}>
                  <InputNumber value={item.salePrice} onChange={val => handleChangeSalePrice(val ?? 0, item.id)} />
                </td>
                <td css={{ minWidth: '100px' }}>{_totalPrice}</td>
                <td css={{ minWidth: '50px' }}>
                  <div css={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDelete(item.id)}>
                    Delete
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
