import { watchGetLanguages } from '@app/containers/Invoice/store/sagas/watchGetLanguages';
import { watchSubmitInvoice } from '@app/containers/Invoice/store/sagas/watchSubmitInvoice';
import { watchUploadLogo } from '@app/containers/Invoice/store/sagas/watchUploadLogo';

export const sagasInvoice = [watchGetLanguages, watchUploadLogo, watchSubmitInvoice];
