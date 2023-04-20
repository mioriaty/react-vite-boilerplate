export interface ProductLine {
  id: string;
  name: string;
  description: string;
  quantity: number;
  regularPrice: number;
  salePrice: number;
}

export interface Invoice {
  // 1. Invoice info
  logo: string;
  logoId?: number;
  invoiceTitle: string;
  invoiceDate: string;
  currency: string;
  language: string;
  color: string;
  type: string;
  badge: string;

  // 2. Invoice Billing
  // Bill From
  yourName: string;
  yourEmail: string;
  yourCompanyName: string;
  yourAddress: string;
  yourCity: string;
  yourCountry: string;
  yourZipCode: string;
  yourState: string;

  // Bill To
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  clientCity: string;
  clientCountry: string;
  clientZipCode: string;
  clientState: string;

  // 3. Invoice Product
  productLines: ProductLine[];

  // Invoice Tax
  noteTitle: string;
  noteDescription: string;
  tax: number;
  shipping: number;
}

type FieldName = keyof Invoice;

export type RequiredField = Extract<FieldName, 'yourName' | 'yourEmail' | 'yourCompanyName' | 'clientName' | 'clientEmail'>;
