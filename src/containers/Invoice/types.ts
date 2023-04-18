export interface ProductLine {
  name: string;
  description: string;
  quantity: string;
  price: number;
}

export interface Invoice {
  // invoice
  logo: string;
  invoiceTitle: string;
  invoiceDate: string;
  invoiceDueDate: string;
  currency: string;

  // Bill From
  yourName: string;
  yourEmail: string;
  yourAddress: string;
  yourCountry: string;
  yourZipCode: string;

  // Bill To
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  clientCountry: string;
  clientZipCode: string;

  // product
  productLines: ProductLine[];

  // Total
  notes: string;

  tax: number;
  discount: number;
  shipping: number;
  amountPaid: number;
}
