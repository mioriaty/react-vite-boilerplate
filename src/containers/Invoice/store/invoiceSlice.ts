import { Invoice, ProductLine } from '@app/containers/Invoice/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State extends Invoice {}

export const defaultInvoice: State = {
  // invoice
  logo: '',
  invoiceTitle: '',
  invoiceDate: '',
  invoiceDueDate: '',
  currency: 'USD',

  // Bill From
  yourName: '',
  yourEmail: '',
  yourAddress: '',
  yourCountry: '',
  yourZipCode: '',

  // Bill To
  clientName: '',
  clientEmail: '',
  clientAddress: '',
  clientCountry: '',
  clientZipCode: '',

  // product
  productLines: [],

  // Total
  notes: '',

  tax: 0,
  discount: 0,
  shipping: 0,
  amountPaid: 0,
};

export const invoiceSlice = createSlice({
  name: '@invoice',
  initialState: defaultInvoice,
  reducers: {
    resetInvoice: () => {
      return defaultInvoice;
    },
    setInvoiceSettings: (state, action: PayloadAction<Partial<Invoice>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    editProductLine: (state, action: PayloadAction<AtLeast<ProductLine, 'id'>>) => {
      state.productLines = state.productLines.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            ...action.payload,
          };
        }
        return item;
      });
    },
  },
});

export const invoiceSelector = (state: AppState) => state.invoice;
