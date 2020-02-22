import { createContext, useContext } from "react";
import CartStore from "./cart.store";

export const storeContext = createContext({
  cart: new CartStore()
});

export const useStore = () => useContext(storeContext);
