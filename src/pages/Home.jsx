import React, { Component } from 'react';
import ProductCard from '../components/ProductCard';
import { getProductById, getCategories } from '../services/api';

export default class Home extends Component {
  state = {
    userSearch: '',
    searched: [],
    produtos: [],
    categories: [],
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

  handleChangeCategories = ({ target }) => {
    const { value } = target;
    this.setState({
      produtos: value,
    });
  };

  render() {
    const { produtos, categories, searched } = this.state;
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

        { searched.length !== 0 ? (searched.map((e) => (
          <ProductCard
            title={ e.title }
            thumbnail={ e.thumbnail }
            price={ e.price }
            id={ e.id }
            key={ e.id }
          />))) : <p>Nenhum produto foi encontrado</p>}
      </div>

      <div>
      
        {produtos.length === 0 && (
          <h2 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h2>
        )}
        <input
          type="text"
          onChange={ this.handleChangeCategories }
        />
        <div>
          {categories.map(({ name, id }) => (
            <div key={ id }>
              <label
                htmlFor={ id }
                data-testid="category"
              >
                { name }
                <input
                  type="radio"
                  id={ id }
                  name="categories"
                  value={ name }
                />
              </label>
            </div>
          ))}
        </div>
      </>      
    );
  }
}
