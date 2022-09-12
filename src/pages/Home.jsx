import React, { Component } from 'react';
import ProductCard from '../components/ProductCard';
import CartButton from '../components/CartButton';
import * as api from '../services/api';
// import { getProductById, getCategories } from '../services/api';
import addProduct from '../services/localStorage';

export default class Home extends Component {
  state = {
    userSearch: '',
    wasSearched: false,
    searched: [],
    categories: [],
    radioCategories: '',
  };

  componentDidMount() {
    this.handleGetCategories();
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ userSearch: value });
  };

  handleClick = async () => {
    const { userSearch } = this.state;
    const ProductdList = await api.getProductById(userSearch);
    this.setState({
      searched: ProductdList.results,
      wasSearched: true,
    });
  };

  handleGetCategories = async () => {
    const getCategs = await api.getCategories();
    this.setState({ categories: getCategs });
  };

  handleChangeCategories = async ({ target }) => {
    const { value } = target;
    const ProductdList = await api.getProductsFromCategoryAndQuery(value);
    this.setState({
      radioCategories: value,
      searched: ProductdList.results,
    });
  };

  handleClickAddToCart = (product) => {
    this.setState({
      isQuantity: false,
    });
    addProduct(product);
  };

  render() {
    const { categories, searched, radioCategories, isQuantity, wasSearched } = this.state;
    return (
      <>
        <div>
          <label htmlFor="query-input">
            Buscar produtos, marcas e muito mais...
            <input
              id="query-input"
              type="text"
              data-testid="query-input"
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="button"
            data-testid="query-button"
            onClick={ this.handleClick }
          >
            Buscar
          </button>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <CartButton />

          { wasSearched
          && searched.length === 0
            ? <p>Nenhum produto foi encontrado</p>
            : (
              searched.map((e) => (
                <ProductCard
                  title={ e.title }
                  thumbnail={ e.thumbnail }
                  price={ e.price }
                  id={ e.id }
                  radioCategories={ radioCategories }
                  key={ e.id }
                  isQuantity={ isQuantity }
                  onClick={ () => this.handleClickAddToCart(e) }
                />))
            ) }
        </div>
        <div>
          {categories.map(({ name, id }) => (
            <div key={ id }>
              <label
                htmlFor={ id }
                data-testid="category"
              >
                {name}
                <input
                  type="radio"
                  id={ id }
                  name={ id }
                  value={ name }
                  onChange={ this.handleChangeCategories }
                />
              </label>
            </div>
          ))}
        </div>

      </>
    );
  }
}
