import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  state = {
    quantity: 1,
  };

  componentDidMount() {
    const { id } = this.props;
    this.setState({ quantity: Number((localStorage.getItem(id))) || 1 });
  }

  increaseQuatity = () => {
    const { id } = this.props;
    const { quantity } = this.state;
    this.setState({ quantity: quantity + 1 });
    localStorage.setItem(id, quantity + 1);
  };

  decreaseQuatity = () => {
    const { id } = this.props;
    const { quantity } = this.state;
    if (quantity >= 2) {
      this.setState({ quantity: quantity - 1 });
      localStorage.setItem(id, quantity - 1);
    }
  };

  render() {
    const { isQuantity, onClickRemove } = this.props;
    const { title, thumbnail,
      price, id, onClick,
    } = this.props;
    const { quantity } = this.state;
    return (
      <div>
        {isQuantity
          ? (
            <div data-testid="product">
              <img src={ thumbnail } alt={ title } />
              <h5 data-testid="shopping-cart-product-name">{ title }</h5>
              <p data-testid="shopping-cart-product-quantity">
                {quantity}
              </p>
              <h4>{ price }</h4>
              <button
                data-testid="remove-product"
                type="button"
                onClick={ onClickRemove }
              >
                Remover
              </button>
              <button
                data-testid="product-increase-quantity"
                type="button"
                onClick={ this.increaseQuatity }
              >
                +
              </button>
              <button
                data-testid="product-decrease-quantity"
                type="button"
                onClick={ this.decreaseQuatity }
              >
                -
              </button>

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
  // quantity: PropTypes.number.isRequired,
  isQuantity: PropTypes.bool.isRequired,
  onClickRemove: PropTypes.func.isRequired,
  // decreaseQuatity: PropTypes.func.isRequired,
  // increaseQuatity: PropTypes.func.isRequired,
};
