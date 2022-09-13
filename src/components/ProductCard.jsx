import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  // increaseQuatityClick = () => {
  //   this.setState((prevState) => ({
  //     quantity: Number(prevState.quantity) + 1,
  //   }));
  // };

  // decreaseQuatityClick = () => {
  //   this.setState((prevState) => ({
  //     quantity: Number(prevState.quantity) - 1,
  //   }));
  // };

  render() {
    const { isQuantity, quantity, onClickRemove } = this.props;
    const { title, thumbnail,
      price, id, onClick,
      // decreaseQuatity, increaseQuatity,
    } = this.props;
    return (
      <div>
        {isQuantity
          ? (
            <div data-testid="product">
              <img src={ thumbnail } alt={ title } />
              <h5 data-testid="shopping-cart-product-name">{ title }</h5>
              <p data-testid="shopping-cart-product-quantity">
                {`quantidade: ${quantity}`}
              </p>
              <h4>{ price }</h4>
              <button
                data-testid="remove-product"
                type="button"
                onClick={ onClickRemove }
              >
                Remover
              </button>
              {/* <button
                data-testid="product-increase-quantity"
                type="button"
                onClick={ increaseQuatity }
              >
                +
              </button>
              <button
                data-testid="product-decrease-quantity"
                type="button"
                onClick={ decreaseQuatity }
              >
                -
              </button> */}

            </div>
          )
          : (
            <div data-testid="product">
              <Link
                key={ id }
                data-testid="product-detail-link"
                to={ `/product-details/${id}` }
              >
                <img src={ thumbnail } alt={ title } />
                <h5>{ title }</h5>
                <h4>{ price }</h4>
              </Link>
              <button
                data-testid="product-add-to-cart"
                type="button"
                onClick={ onClick }
              >
                Adicionar ao Carrinho
              </button>
            </div>
          )}
      </div>
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
  onClickRemove: PropTypes.func.isRequired,
  // decreaseQuatity: PropTypes.func.isRequired,
  // increaseQuatity: PropTypes.func.isRequired,
};
