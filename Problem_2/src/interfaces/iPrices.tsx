export interface IpropToken {
  date: string;
  price: number;
  currency: string;
}

export interface FormData {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  receive: any;
}