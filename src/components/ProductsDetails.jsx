import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getProductDetailsById } from '../services/api';

export default class ProductsDetails extends Component {
  state = {
    title: '',
    thumbnail: '',
    price: '',
    id: '',
    redirected: false,
  };

  componentDidMount() {
    this.handleProductDetails();
  }

  handleProductDetails = async () => {
    const { match: { params: { id } } } = this.props;
    const product = await getProductDetailsById(id);
    this.setState({
      title: product.title,
      thumbnail: product.thumbnail,
      price: product.price,
      id: product.id,
    });
  };

  handleClick = () => [
    this.setState({
      redirected: true,
    }),
  ];

  render() {
    const { title, thumbnail, price, id, redirected } = this.state;
    return (
      <>
        <div>
          <p>{ id }</p>
          <h2 data-testid="product-detail-name">{ title }</h2>
          <h3 data-testid="product-detail-price">{ price }</h3>
          <img
            data-testid="product-detail-image"
            src={ thumbnail }
            alt={ title }
          />
          <button
            data-testid="shopping-cart-button"
            type="button"
            onClick={ this.handleClick }
          >
            carrinho de compras
          </button>
        </div>
        { redirected && <Redirect to="/shopping/cart" /> }
      </>
    );
  }
}

ProductsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string }),
  }).isRequired,
};
