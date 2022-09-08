import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends Component {
  state = {
    userSearch: '',
    searched: [],
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ [userSearch]: value });
  };

  handleClick = async () => {
    const { userSearch } = this.state;
    const ProductdList = await getProductsFromCategoryAndQuery({ userSearch });
    this.setState({ searched: ProductdList.results });
    console.log(this.searched);
  };

  render() {
    const { searched } = this.state;
    return (
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

        { searched.map(() => { searched })}

      </div>
    );
  }
}
