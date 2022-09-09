import React, { Component } from 'react';
import CartButton from '../components/CartButton';
// Chamei o cartButton Somente aqui para cumprir o requisito,
// Depois desenvolvo mais junto a um Header.jsx para ser add em todas as pgs
// Ainda criarei componentes. Ass Erick

class ShoppingCart extends Component {
  render() {
    return (
      <main className="shoppingCart">
        <div className="shoppingCart-empty-message">
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        </div>
        <CartButton />
      </main>
    );
  }
}

export default ShoppingCart;
