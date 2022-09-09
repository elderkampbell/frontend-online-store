import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  render() {
    const { title, thumbnail, price, id } = this.props;
    return (
      <Link
        key={ id }
        to={ `/product/details/${id}` }
        data-testid="product-detail-link"
      >
        <div data-testid="product" id={ id }>
          <img src={ thumbnail } alt={ title } />
          <h5>{ title }</h5>
          <h4>{ price }</h4>
        </div>
      </Link>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};
