import React from "react";
import { observer } from "mobx-react-lite";
import { Container, Cart } from "./styles";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.svg";
import { MdShoppingBasket } from "react-icons/md";
import { useStore } from "../../store";

const Header = observer(() => {
  const { cart } = useStore();
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocketshoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{cart.cart.length} itens</span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
});

export default Header;
