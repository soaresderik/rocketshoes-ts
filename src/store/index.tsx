import { createContext, useContext } from "react";
import CartStore from "./cart.store";

export const store = {
  cartStore: new CartStore()
};

export const storeContext = createContext(store);

export const StoreProvider = storeContext.Provider;

export const useStore = () => useContext(storeContext);
