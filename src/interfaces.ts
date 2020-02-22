export interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
  formatedPrice?: string;
  subtotal?: string;
}
