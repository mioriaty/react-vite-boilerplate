import { Invoice } from '@app/containers/Invoice/types';
import { http } from '@app/httpHandler';
import { InvoiceSubmitType } from '@app/services/Invoice/@types';
import { objectToFormData, transformClientInvoiceToDTO } from '@app/services/Invoice/utils';
import { AxiosResponse } from 'axios';

const uploadLogo = async (file: File) => {
  console.log(file);

  interface ResponseSuccess {
    success: boolean;
    data: {
      url: string;
      id: number;
    };
  }
  const response: AxiosResponse<ResponseSuccess> = await http.request({
    method: 'post',
    params: {
      action: 'myshopkit_upload_logo',
    },
    data: objectToFormData({ image: file }),
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const getLanguages = async () => {
  interface LanguageOptions {
    en: 'English';
    br: 'Portuguese (Brazil)';
    da: 'Danish';
    de: 'German';
    es: 'Spanish';
    et: 'Estonian';
    fr: 'French';
    it: 'Italian';
    lt: 'Lithuanian';
    nl: 'Dutch';
    pl: 'Polish';
    ro: 'Romanian';
    sv: 'Swedish';
    tr: 'Turkish';
  }

  interface Response {
    success: boolean;
    data: {
      languages: LanguageOptions;
    };
  }

  const response: AxiosResponse<Response> = await http.request({
    method: 'get',
    params: {
      action: 'myshopkit_invoice_language',
    },
  });
  const _data: Array<{ label: string; value: string }> = Object.entries(response.data.data.languages).reduce((acc, [key, val]) => {
    acc.push({ label: val, value: key });
    return acc;
  }, [] as any);

  return _data;
};

const submitInvoice = async (type: InvoiceSubmitType, invoice: Invoice) => {
  const response = await http.request({
    method: 'POST',
    params: {
      action: 'myshopkit_generate_invoice',
    },
    data: {
      type,
      ...transformClientInvoiceToDTO(invoice),
    },
  });

  return response.data;
};

export const invoiceService = { uploadLogo, getLanguages, submitInvoice };
