import React from "react";
import { Container, ProductTable, Total } from "./styles";
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete
} from "react-icons/md";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";

const Cart = observer(() => {
  const { cart } = useStore();
  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.cart.map(i => (
            <tr key={i.id}>
              <td>
                <img src={i.image} alt={i.title} />
              </td>
              <td>
                <strong>{i.title}</strong>
                <span>{i.formatedPrice}</span>
              </td>
              <td>
                <div>
                  <button onClick={() => cart.decrement(i)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={i.amount} />
                  <button onClick={() => cart.increment(i)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{i.subtotal}</strong>
              </td>
              <td>
                <button onClick={() => cart.removeFromCart(i.id)}>
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button>Finalizar Pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{cart.total}</strong>
        </Total>
      </footer>
    </Container>
  );
});

export default Cart;
