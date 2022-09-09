import React, { Component } from 'react';
import ProductCard from '../components/ProductCard';
import { getProductById, getCategories } from '../services/api';

export default class Home extends Component {
  state = {
    userSearch: '',
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
    const ProductdList = await getProductById(userSearch);
    this.setState({ searched: ProductdList.results });
  };

  handleGetCategories = async () => {
    const getCategs = await getCategories();
    await this.setState({ categories: getCategs });
  };

  handleChangeCategories = async ({ target }) => {
    const { value } = target;
    const ProductdList = await getProductById(value);
    this.setState({
      radioCategories: value,
      searched: ProductdList.results,
    });
  };

  render() {
    const { categories, searched, radioCategories } = this.state;
    console.log(radioCategories, searched);
    return (
      <>
        <div>
          <label htmlFor="query-input">
            Buscar produtos, marcas e muito mais...
            <input
              type="text"
              data-testid="query-input"
              onChange={ this.handleChange }
            />

            <button
              type="button"
              data-testid="query-button"
              onClick={ this.handleClick }
            >
              Buscar
            </button>
          </label>

          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>

          {searched.length !== 0 ? (searched.map((e) => (
            <ProductCard
              title={ e.title }
              thumbnail={ e.thumbnail }
              price={ e.price }
              id={ e.id }
              radioCategories={ radioCategories }
              key={ e.id }
            />))) : <p>Nenhum produto foi encontrado</p>}
        </div>
        <div>
          {/* <input
            type="text"
            onChange={ this.handleChangeCategories }
          /> */}
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
                  name="categories"
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
