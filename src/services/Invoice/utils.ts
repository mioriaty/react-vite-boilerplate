import { Invoice } from '@app/containers/Invoice/types';
import { InvoiceDTO } from '@app/services/Invoice/@types';

export const objectToFormData = (object: Record<string, any>) => {
  const form_data = new FormData();

  for (const key in object) {
    form_data.append(key, object[key]);
  }

  return form_data;
};

export const transformClientInvoiceToDTO = (invoice: Invoice): InvoiceDTO => {
  return {
    reference: invoice.invoiceTitle,
    color: invoice.color,
    currency: invoice.currency,
    date: invoice.invoiceDate,
    language: invoice.language,
    logo: invoice.logoId,
    badge: invoice.badge,
    type: invoice.type,

    items: invoice.productLines.map(item => ({
      name: item.name,
      quantity: item.quantity,
      regular_price: item.regularPrice,
      sale_price: item.salePrice,
      desc: item.description,
    })),

    receiver_address: invoice.clientAddress,
    receiver_city: invoice.clientCity,
    receiver_country: invoice.clientCountry,
    receiver_email: invoice.clientEmail,
    receiver_name: invoice.clientName,
    receiver_state: invoice.clientState,

    sender_address: invoice.yourAddress,
    sender_city: invoice.yourCity,
    sender_company_name: invoice.yourCompanyName,
    sender_country: invoice.yourCountry,
    sender_email: invoice.yourEmail,
    sender_name: invoice.yourName,
    sender_state: invoice.yourState,

    important_notice: {
      title: invoice.noteTitle,
      desc: invoice.noteDescription,
    },
    shipping_cost: invoice.shipping,
    taxRate: invoice.tax,
  };
};
