import React, { Component } from 'react';
import CartButton from '../components/CartButton';

export default class Home extends Component {
  render() {
    return (
      <div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <CartButton />
      </div>
    );
  }
}
