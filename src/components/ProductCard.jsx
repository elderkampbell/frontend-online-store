import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  render() {
    const { isQuantity, quantity } = this.props;
    const { title, thumbnail,
      price, id, onClick,
      // decreaseQuatity, increaseQuatity
    } = this.props;
    // const { quantity } = this.state;
    return (
      <>
        {isQuantity
          ? (
            <div data-testid="product">
              <img src={ thumbnail } alt={ title } />
              <h5 data-testid="shopping-cart-product-name">{ title }</h5>
              <p data-testid="shopping-cart-product-quantity">
                {`quantidade: ${quantity}`}
              </p>
              <h4>{ price }</h4>
            </div>
          )
          : (

            <div data-testid="product">
              <Link
                key={ id }
                data-testid="product-detail-link"
                to={ `/product/details/${id}` }
              >
                <img src={ thumbnail } alt={ title } />
                <h5>{ title }</h5>
              </Link>
              <h4>{ price }</h4>
              <button
                data-testid="product-add-to-cart"
                type="button"
                onClick={ onClick }
              >
                Adicionar ao Carrinho
              </button>
            </div>

          )}
        {/* <button
          data-testid="product-increase-quantity"
          type="button"
        >
          +
        </button>
        <button
          data-testid="product-decrease-quantity"
          type="button"
        >
          -
        </button>
        <button
          data-testid="remove-product"
          type="button"
        >
          Remover
        </button> */}
      </>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  isQuantity: PropTypes.bool.isRequired,
  // products: PropTypes.arrayOf.isRequired,
  // decreaseQuatity: PropTypes.func.isRequired,
  // increaseQuatity: PropTypes.func.isRequired,
};
