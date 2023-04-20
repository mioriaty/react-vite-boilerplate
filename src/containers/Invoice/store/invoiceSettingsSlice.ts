import { Invoice, ProductLine } from '@app/containers/Invoice/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State extends Invoice {}

export const defaultInvoice: State = {
  // invoice
  logo: '',
  invoiceTitle: '',
  invoiceDate: '',
  currency: 'USD',
  language: '',
  color: '#007fff',
  logoId: undefined,
  badge: '',
  type: '',

  // Bill From
  yourName: '',
  yourCompanyName: '',
  yourEmail: '',
  yourAddress: '',
  yourCountry: '',
  yourZipCode: '',
  yourCity: '',
  yourState: '',

  // Bill To
  clientName: '',
  clientEmail: '',
  clientAddress: '',
  clientCountry: '',
  clientZipCode: '',
  clientCity: '',
  clientState: '',

  // product
  productLines: [],

  // Total
  noteTitle: '',
  noteDescription: '',
  tax: 0,
  shipping: 0,
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

export const invoiceSettingsSelector = (state: AppState) => state.invoice.settings;
