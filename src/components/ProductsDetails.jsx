import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import { getProductDetailsById } from '../services/api';
import addProduct from '../services/localStorage';
import CartButton from './CartButton';

export default class ProductsDetails extends Component {
  state = {
    title: '',
    thumbnail: '',
    price: '',
    id: '',
    // redirected: false,
    product: [],
  };

  componentDidMount() {
    this.handleProductDetails();
  }

  handleProductDetails = async () => {
    const { match: { params: { id } } } = this.props;
    const infoProduct = await getProductDetailsById(id);
    console.log(infoProduct);
    this.setState((prevState) => ({
      title: infoProduct.title,
      thumbnail: infoProduct.thumbnail,
      price: infoProduct.price,
      id: infoProduct.id,
      product: [...prevState.product, infoProduct],
    }));
  };

  handleClick = () => {
    const { product } = this.state;
    addProduct(product[0]);
    // console.log(product[0]);
  };

  render() {
    const { title, thumbnail, price, id } = this.state;
    return (

      <div>
        <CartButton />
        <p>{ id }</p>
        <h2 data-testid="product-detail-name">{ title }</h2>
        <h3 data-testid="product-detail-price">{ price }</h3>
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt={ title }
        />
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ this.handleClick }
        >
          Add Carrinho
        </button>
      </div>

    );
  }
}

ProductsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string }),
  }).isRequired,
};
