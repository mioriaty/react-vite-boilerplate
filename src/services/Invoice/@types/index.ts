interface Item {
  name: string;
  desc?: string;
  quantity: number;
  regular_price: number;
  sale_price: number; // Số tiền giảm giá
}

interface ImportantNotice {
  title: string;
  desc: string;
}

export type InvoiceSubmitType = 'view' | 'email' | 'print';

export interface InvoiceDTO {
  // invoice info
  logo?: number; // la id tra ve luc upload logo
  reference: string; // invoice title
  date: string;
  color: string;
  // Chính là cái chữ Sale Invoice góc phải https://capture.dropbox.com/izwYx1CWmVESegtG
  type?: string;
  // Chính là chữ Payment paid https://capture.dropbox.com/HCSB3WHs9HElc2Nm
  badge?: string;
  currency: string;
  language: string;

  // Billing from
  sender_name: string;
  sender_email: string;
  sender_address: string;
  sender_city: string;
  sender_country: string;
  sender_state?: string;

  // Billing to
  receiver_name: string;
  receiver_email: string;
  receiver_address: string;
  receiver_city: string;
  receiver_country: string;
  receiver_state?: string;

  // products
  items: Item[];

  // total
  important_notice: ImportantNotice;
  taxRate?: number;
  shipping_cost?: number;
}
