import React, { Component } from 'react';
import ProductCard from '../components/ProductCard';

// Chamei o cartButton Somente aqui para cumprir o requisito,
// Depois desenvolvo mais junto a um Header.jsx para ser add em todas as pgs
// Ainda criarei componentes. Ass Erick

export default class ShoppingCart extends Component {
  state = {
    empty: false,
    products: [],
    productsFiltered: [],
    isQuantity: false,
  };

  componentDidMount() {
    this.test();
  }

  test = () => {
    const getItems = JSON.parse(localStorage.getItem('product_items'));
    if (getItems.length === 0) {
      this.setState({ empty: true });
    } else {
      const setPerson = new Set();
      const novaArr = getItems.filter((person) => {
        const duplicatedPerson = setPerson.has(person.id);
        setPerson.add(person.id);
        return !duplicatedPerson;
      });
      this.setState({
        products: [...getItems],
        productsFiltered: [...novaArr],
        isQuantity: true,
      });
    }
  };

  handleClickQuantity = (id) => {
    const { products } = this.state;
    const countItems = products.filter((e) => e.id === id);
    return countItems.length;
  };

  // increaseQuatity = () => {
  //   this.setState((prevState) => ({
  //     quantity: prevState.quantity + 1,
  //   }));
  // };

  // decreaseQuatity = () => {
  //   this.setState((prevState) => ({
  //     quantity: prevState.quantity - 1,
  //   }));
  // };

  render() {
    const { productsFiltered, isQuantity, empty } = this.state;
    return (
      <div>
        { empty
          ? (
            // <div className="shoppingCart-empty-message">
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
            // </div>
          )
          : productsFiltered.map((product) => (
            <ProductCard
              key={ product.id }
              title={ product.title }
              thumbnail={ product.thumbnail }
              price={ product.price }
              id={ product.id }
              quantity={ this.handleClickQuantity(product.id) }
              isQuantity={ isQuantity }
            // onClick={ this.handleClickQuantity }
            // increaseQuatity={ this.increaseQuatity }
            // decreaseQuatity={ this.decreaseQuatity }
            />
          ))}
      </div>
    );
  }
}
