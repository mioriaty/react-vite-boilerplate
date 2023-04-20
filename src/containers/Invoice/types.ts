export interface ProductLine {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  // 1. Invoice info
  logo: string;
  invoiceTitle: string;
  invoiceDate: string;
  invoiceDueDate: string;
  currency: string;

  // 2. Invoice Billing
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

  // 3. Invoice Product
  productLines: ProductLine[];

  // Invoice Tax
  notes: string;

  tax: number;
  discount: number;
  shipping: number;
  amountPaid: number;
}
