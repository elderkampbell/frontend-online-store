import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CartButton extends Component {
  render() {
    const { length } = this.props;
    return (
      <Link to="/Shoppingcart" data-testid="shopping-cart-button">
        <div className="shopping-cart-button">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5087/5087847.png"
            alt="cart icon"
            className="shopping-cart-image"
          />
          <span
            className="shopping-cart-length"
          >
            {length}
          </span>
        </div>
      </Link>
    );
  }
}
// depois adicionamos o contador. Ass: Erick

CartButton.propTypes = {
  length: PropTypes.number.isRequired,
};

CartButton.defaultProp = {
  length: 0,
};

export default CartButton;
