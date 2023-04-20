import { getLanguageFailed, getLanguagePending, getLanguageSucceed } from '@app/containers/Invoice/store/actions';
import { invoiceService } from '@app/services/Invoice';
import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';

function* handleGet() {
  try {
    const response: SagaReturnType<typeof invoiceService.getLanguages> = yield retry(3, 1000, invoiceService.getLanguages);
    yield put(getLanguageSucceed({ data: response }));
  } catch (error) {
    yield put(getLanguageFailed(undefined));
  }
}

export function* watchGetLanguages() {
  yield takeLatest(getLanguagePending.type, handleGet);
}
