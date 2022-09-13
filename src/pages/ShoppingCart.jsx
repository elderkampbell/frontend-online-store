import React, { Component } from 'react';
import ProductCard from '../components/ProductCard';
// import addProduct from '../services/localStorage';

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

  handleClickQuantity = (id) => {
    const { products } = this.state;
    const countItems = products.filter((e) => e.id === id);
    return countItems.length;
  };

  test = () => {
    const getItems = JSON.parse(localStorage.getItem('product_items'));
    if (getItems.length === 0) {
      this.setState({ empty: true });
    } else {
      const setItem = new Set();
      const newArr = getItems.filter((person) => {
        const duplicatedItem = setItem.has(person.id);
        setItem.add(person.id);
        return !duplicatedItem;
      });
      this.setState({
        products: [...getItems],
        productsFiltered: [...newArr],
        isQuantity: true,
      });
    }
  };

  increaseQuatityClick = (product) => {
    const { products } = this.state;
    this.setState({
      products: [...products, product],
    });
  };

  decreaseQuatityClick = () => {
    const { products } = this.state;
    const newArr2 = products.filter((e) => e.id !== id);
    this.setState({
      products: [...newArr2],
    });
  };

  handleRemove = (id) => {
    const { productsFiltered, products } = this.state;
    const newArr = productsFiltered.filter((e) => e.id !== id);
    const newArr2 = products.filter((e) => e.id !== id);
    // addProduct(newArr);
    this.setState({
      productsFiltered: [...newArr],
      products: [...newArr2],
    });
  };

  render() {
    const { productsFiltered, isQuantity, empty } = this.state;
    return (
      <div>
        { empty
          ? (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          )
          : (
            <div>
              {productsFiltered.map((product) => (
                <ProductCard
                  key={ product.id }
                  title={ product.title }
                  thumbnail={ product.thumbnail }
                  price={ product.price }
                  id={ product.id }
                  quantity={ this.handleClickQuantity(product.id) }
                  isQuantity={ isQuantity }
                  onClickRemove={ () => this.handleRemove(product.id) }
                  increaseQuatity={ () => this.increaseQuatityClick(product) }
                  decreaseQuatity={ () => this.decreaseQuatityClick(product.id) }
                />
              ))}

            </div>
          )}
      </div>
    );
  }
}
