export interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
  formatedPrice?: string;
  subtotal?: string;
}

export interface IStock {
  id: number;
  amount: number;
}
