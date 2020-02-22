import { IProduct, IStock } from "../interfaces";
import { observable, computed, action } from "mobx";
import { formatPrice } from "../utils/format";
import api from "../services/api";
import { toast } from "react-toastify";

export default class CartStore {
  @observable cart: IProduct[] = [];
  @observable products: IProduct[] = [];

  public addProduct = async (product: IProduct) => {
    const find = this.cart.find(i => i.id === product.id);

    if (find) {
      await this.increment(find);
    } else {
      this.cart.push({
        ...product,
        amount: 1,
        subtotal: formatPrice(product.price * 1)
      });
    }
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

  @action
  public increment = async (product: IProduct) => {
    const { data } = await api.get<IStock>(`stock/${product.id}`);

    if (product.amount >= data.amount) {
      toast.error("Quantidade maior que o stock");
      return;
    }

    product.amount += 1;
  };

  public decrement = (product: IProduct) => {
    product.amount = product.amount > 1 ? (product.amount -= 1) : 1;
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
