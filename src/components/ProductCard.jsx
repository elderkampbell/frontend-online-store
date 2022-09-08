import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  render() {
    const { productName, image, price } = this.props;
    return (
      <div data-testid="product">
        <img src={ image } alt={ productName } />
        <h5>{ productName }</h5>
        <h4>{ price }</h4>
      </div>
    );
  }
}

ProductCard.propTypes = {
  productName: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};
