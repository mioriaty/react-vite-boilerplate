import { submitInvoiceFailed, submitInvoicePending, submitInvoiceSucceed } from '@app/containers/Invoice/store/actions';
import { invoiceService } from '@app/services/Invoice';
import { notification } from 'antd';
import { put, retry, takeLatest } from 'redux-saga/effects';

function* handleSubmit({ payload: { invoice, type } }: ReturnType<typeof submitInvoicePending>) {
  try {
    yield retry(3, 1000, invoiceService.submitInvoice, type, invoice);
    yield put(submitInvoiceSucceed(type));
  } catch (error) {
    notification.error({ message: (error as Error).message });
    yield put(submitInvoiceFailed(type));
  }
}

export function* watchSubmitInvoice() {
  yield takeLatest(submitInvoicePending.type, handleSubmit);
}
