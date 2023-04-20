import { Invoice } from '@app/containers/Invoice/types';
import { InvoiceSubmitType } from '@app/services/Invoice/@types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  getLanguageStatus: Status;
  languages: Array<{ label: string; value: string }>;

  uploadLogoStatus: Status;
  submitStatus: Record<InvoiceSubmitType, Status>;
}

const initialState: State = {
  getLanguageStatus: 'idle',
  languages: [],

  uploadLogoStatus: 'idle',
  submitStatus: {
    email: 'idle',
    print: 'idle',
    view: 'idle',
  },
};

export const invoiceRequestSlice = createSlice({
  name: '@language',
  initialState,
  reducers: {
    getLanguagePending: state => {
      state.getLanguageStatus = 'loading';
    },
    getLanguageSucceed: (state, action: PayloadAction<{ data: Array<{ label: string; value: string }> }>) => {
      state.getLanguageStatus = 'succeeded';
      state.languages = action.payload.data;
    },
    getLanguageFailed: state => {
      state.getLanguageStatus = 'failed';
    },
    uploadLogoPending: (state, _action: PayloadAction<{ file: File; onFulfilled?: () => void; onFailed?: () => void }>) => {
      state.uploadLogoStatus = 'loading';
    },
    uploadLogoSucceed: state => {
      state.uploadLogoStatus = 'succeeded';
    },
    uploadLogoFailed: state => {
      state.uploadLogoStatus = 'failed';
    },
    submitInvoicePending: (state, action: PayloadAction<{ type: InvoiceSubmitType; invoice: Invoice }>) => {
      state.submitStatus[action.payload.type] = 'loading';
    },
    submitInvoiceSucceed: (state, action: PayloadAction<InvoiceSubmitType>) => {
      state.submitStatus[action.payload] = 'succeeded';
    },
    submitInvoiceFailed: (state, action: PayloadAction<InvoiceSubmitType>) => {
      state.submitStatus[action.payload] = 'failed';
    },
  },
});

export const invoiceRequestSelector = (state: AppState) => state.invoice.request;
