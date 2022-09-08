import React, { Component } from 'react';
import { getCategories } from '../services/api';

export default class Home extends Component {
  state = {
    produtos: [],
    categories: [],
  };

  componentDidMount() {
    this.handleGetCategories();
  }

  handleGetCategories = async () => {
    const getCategs = await getCategories();
    await this.setState({ categories: getCategs });
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      produtos: value,
    });
  };

  render() {
    const { produtos, categories } = this.state;
    return (
      <div>
        {produtos.length === 0 && (
          <h2 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h2>
        )}
        <input
          type="text"
          onChange={ this.handleChange }
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
      </div>
    );
  }
}
