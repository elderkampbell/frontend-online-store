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
    email: '',
    rating: '',
    text: '',
    reviews: [],
    validateForm: false,
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.handleProductDetails();
    const savedReviews = JSON.parse(localStorage.getItem(id));
    if (savedReviews !== null) { this.setState({ reviews: savedReviews }); }
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

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleChangeRating = ({ target }) => {
    this.setState({ rating: target.value });
  };

  saveReview = (id) => {
    const { reviews } = this.state;
    localStorage.setItem(id, JSON.stringify(reviews));
  };

  validateForm = ({ id }) => {
    const { email, rating, text, reviews } = this.state;
    const fullForm = [...reviews, { email, rating, text }];
    const cleanForm = { email: '', rating: '', text: '' };

    if (email.length && rating.length <= 0) {
      this.setState({ validateForm: true });
    } else {
      this.setState(
        { validateForm: false, reviews: fullForm },
        () => this.saveReview(id),
        this.setState(cleanForm),
      );
    }
  };

  render() {
    const { title,
      thumbnail,
      price,
      id,
      email,
      text,
      reviews,
      validateForm,
    } = this.state;

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

        <form>
          <h1>Avaliações</h1>
          <input
            name="email"
            value={ email }
            type="email"
            data-testid="product-detail-email"
            placeholder="Email"
            required
            onChange={ this.handleChange }
          />
          <span>
            <label htmlFor="rating-5">
              5
              <input
                name="rating"
                type="radio"
                value="5"
                data-testid="5-rating"
                onChange={ this.handleChangeRating }
              />
            </label>

            <label htmlFor="4-rating">
              4
              <input
                name="rating"
                type="radio"
                value="4"
                data-testid="4-rating"
                onChange={ this.handleChangeRating }
              />
            </label>

            <label htmlFor="3-rating">
              3
              <input
                name="rating"
                type="radio"
                value="3"
                data-testid="3-rating"
                onChange={ this.handleChangeRating }
              />
            </label>

            <label htmlFor="2-rating">
              2
              <input
                name="rating"
                type="radio"
                value="2"
                data-testid="2-rating"
                onChange={ this.handleChangeRating }
              />
            </label>

            <label htmlFor="1-rating">
              1
              <input
                name="rating"
                type="radio"
                value="1"
                data-testid="1-rating"
                onChange={ this.handleChangeRating }
              />
            </label>
          </span>
          <textarea
            name="text"
            value={ text }
            type="text"
            placeholder="conte-nos sobre sua experiência! (Opcional)"
            data-testid="product-detail-evaluation"
            onChange={ this.handleChange }
          />
          <input
            type="submit"
            value="Enviar"
            data-testid="submit-review-btn"
            onClick={ () => this.validateForm(id) }
          />
          {validateForm && <alert data-testid="error-msg">Campos inválidos</alert>}
        </form>

        {reviews ? reviews.map((review) => (
          <div key={ review.email }>
            <p data-testid="review-card-email">{review.email}</p>
            <p data-testid="review-card-rating">{review.rating}</p>
            <p data-testid="review-card-evaluation">{review.text}</p>
          </div>
        )) : null}
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
