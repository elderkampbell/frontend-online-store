import React, { Component } from 'react';
import ProductCard from '../components/ProductCard';
// import addProduct from '../services/localStorage';

// Chamei o cartButton Somente aqui para cumprir o requisito,
// Depois desenvolvo mais junto a um Header.jsx para ser add em todas as pgs
// Ainda criarei componentes. Ass Erick

export default class ShoppingCart extends Component {
  state = {
    empty: false,
    // products: [],
    productsFiltered: [],
    isQuantity: false,
  };

  componentDidMount() {
    this.cartControl();
  }

  // handleClickQuantity = (id) => {
  //   // const { products } = this.state;
  //   const getItems = JSON.parse(localStorage.getItem('product_items'));
  //   const countItems = getItems.filter((e) => e.id === id);
  //   return countItems.length;
  // };

  handleRemove = (id) => {
    const { productsFiltered } = this.state;
    // const newArr = productsFiltered.filter((e) => e.id !== id);
    const newArr2 = productsFiltered.filter((e) => (e.id !== id ? e : null));
    localStorage.setItem('product_items', JSON.stringify(newArr2));
    this.cartControl();
  };

  cartControl = () => {
    const getItems = JSON.parse(localStorage.getItem('product_items')) || [];
    console.log(getItems);

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
        // products: [...getItems],
        productsFiltered: [...newArr],
        isQuantity: true,
      });
    }
  };

  // increaseQuatityClick = (product) => {
  //   const { products } = this.state;
  //   this.setState({
  //     products: [...products, product],
  //   });
  //   addProduct(product);
  //   this.cartControl();
  // };

  // decreaseQuatityClick = (id) => {
  //   const { products, productsFiltered } = this.state;
  //   console.log(productsFiltered);
  //   const Arr = products.filter((e) => e.id !== id);
  //   const arrToModify = products.filter((e) => e.id === id);
  //   const modifiedArr = arrToModify.filter((_e, i) => i < arrToModify.length - 1);

  //   const newArr = [...Arr, ...modifiedArr];
  //   localStorage.setItem('product_items', JSON.stringify(newArr));
  //   this.cartControl();
  // };

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
                  // quantity={ this.handleClickQuantity(product.id) }
                  isQuantity={ isQuantity }
                  onClickRemove={ () => this.handleRemove(product.id) }
                  // increaseQuatity={ () => this.increaseQuatityClick(product) }
                  // decreaseQuatity={ this.decreaseQuatityClick }
                />
              ))}

            </div>
          )}
      </div>
    );
  }
}
