import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

class CartButton extends Component {
  render() {
    // const { onClick, increaseQuatity, decreaseQuatity } = this.props;
    return (
      <>
        <Link data-testid="shopping-cart-button" to="/shopping-cart/">
          {/* <div className="shopping-cart-button"> */}
          <img
            width="50px"
            src="https://cdn-icons-png.flaticon.com/512/5087/5087847.png"
            alt="cart icon"
            className="shopping-cart-image"
          />
          {/* <span
              className="shopping-cart-length"
            >
              {length}
            </span>
          </div>
            */}
        </Link>
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
        </button>
        <button
          data-testid="remove-product"
          type="button"
          onClick={ onClick }
        >
          Remove
        </button> */}
      </>
    );
  }
}
// depois adicionamos o contador. Ass: Erick

// CartButton.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   decreaseQuatity: PropTypes.func.isRequired,
//   increaseQuatity: PropTypes.func.isRequired,
//   // length: PropTypes.number.isRequired,
// };

// CartButton.defaultProp = {
//   length: 0,
// };

export default CartButton;
