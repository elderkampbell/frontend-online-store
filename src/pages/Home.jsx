import React, { Component } from 'react';
import ProductCard from '../components/ProductCard';
import { getProductById } from '../services/api';

export default class Home extends Component {
  state = {
    userSearch: '',
    searched: [],
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ userSearch: value });
  };

  handleClick = async () => {
    const { userSearch } = this.state;
    const ProductdList = await getProductById(userSearch);
    this.setState({ searched: ProductdList.results });
  };

  render() {
    const { searched } = this.state;
    console.log(searched);
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

        { searched.length !== 0 ? (searched.map((e) => (
          <ProductCard
            title={ e.title }
            thumbnail={ e.thumbnail }
            price={ e.price }
            id={ e.id }
            key={ e.id }
          />))) : <p>Nenhum produto foi encontrado</p>}

      </div>
    );
  }
}
