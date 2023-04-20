import { setInvoiceSettings, uploadLogoFailed, uploadLogoPending, uploadLogoSucceed } from '@app/containers/Invoice/store/actions';
import { invoiceService } from '@app/services/Invoice';
import { notification } from 'antd';
import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';

function* handleUpload({ payload: { file, onFailed, onFulfilled } }: ReturnType<typeof uploadLogoPending>) {
  try {
    const response: SagaReturnType<typeof invoiceService.uploadLogo> = yield retry(3, 1000, invoiceService.uploadLogo, file);
    yield put(uploadLogoSucceed(undefined));
    onFulfilled?.();
    yield put(
      setInvoiceSettings({
        logo: response.data.url,
        logoId: response.data.id,
      }),
    );
    if (response.success) {
      notification.success({ message: 'Upload successfully' });
    }
  } catch (error) {
    onFailed?.();
    notification.error({ message: (error as Error).message });
    yield put(uploadLogoFailed(undefined));
  }
}

export function* watchUploadLogo() {
  yield takeLatest(uploadLogoPending.type, handleUpload);
}
