import { IProduct } from "../interfaces";
import { observable, computed } from "mobx";
import { formatPrice } from "../utils/format";
import api from "../services/api";

export default class CartStore {
  @observable cart: IProduct[] = [];
  @observable products: IProduct[] = [];

  public addProduct = (product: IProduct) => {
    const finded = this.cart.findIndex(i => i.id === product.id);

    if (finded >= 0) this.cart[finded].amount += 1;
    else
      this.cart.push({
        ...product,
        amount: 1,
        subtotal: formatPrice(product.price * 1)
      });
  };

  public fetchProducts = async () => {
    const { data } = await api.get<IProduct[]>("products");
    this.products = data.map(i => ({
      ...i,
      formatedPrice: formatPrice(i.price)
    }));
  };

  public removeFromCart = (id: number) => {
    this.cart = this.cart.filter(i => i.id !== id);
  };

  public increment = (product: IProduct) => {
    product.amount += 1;
    this.updatePrices(product);
  };

  public decrement = (product: IProduct) => {
    product.amount = product.amount > 1 ? (product.amount -= 1) : 1;
    this.updatePrices(product);
  };

  public updatePrices = (product: IProduct) => {
    product.subtotal = formatPrice(product.price * product.amount);
  };

  @computed
  get total() {
    return formatPrice(
      this.cart.reduce((total, product) => {
        return total + product.amount * product.price;
      }, 0)
    );
  }

  @computed
  get amount() {
    return this.cart.reduce((amount, product) => {
      amount[product.id] = product.amount;
      return amount;
    }, {} as any);
  }
}
