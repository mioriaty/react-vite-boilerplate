import { invoiceRequestSlice } from '@app/containers/Invoice/store/invoiceRequestSlice';
import { invoiceSlice } from '@app/containers/Invoice/store/invoiceSettingsSlice';

export const { resetInvoice, setInvoiceSettings, editProductLine } = invoiceSlice.actions;
export const {
  getLanguageFailed,
  getLanguagePending,
  getLanguageSucceed,
  uploadLogoFailed,
  uploadLogoPending,
  uploadLogoSucceed,
  submitInvoiceFailed,
  submitInvoicePending,
  submitInvoiceSucceed,
} = invoiceRequestSlice.actions;
