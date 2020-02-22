import React, { useEffect } from "react";
import { ProductList } from "./styles";
import { MdAddShoppingCart } from "react-icons/md";

import { useStore } from "../../store";
import { observer } from "mobx-react-lite";

const Home = observer(() => {
  const { fetchProducts, products, addProduct, amount } = useStore().cart;

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, amount]);

  return (
    <ProductList>
      {products.map(i => (
        <li key={i.id}>
          <img src={i.image} alt={i.title} />
          <strong>{i.title}</strong>
          <span>{i?.formatedPrice}</span>

          <button type="button" onClick={() => addProduct(i)}>
            <div>
              <MdAddShoppingCart size={16} color="#FFF" /> {amount?.[i.id] || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
});

export default Home;
