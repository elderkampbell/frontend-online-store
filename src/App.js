import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import ProductsDetails from './components/ProductsDetails';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/shoppingcart" component={ ShoppingCart } />
        <Route
          path="/product/details/:id"
          render={ (props) => <ProductsDetails { ...props } /> }
        />
        <Route
          path="/shopping/cart"
          render={ (props) => <ShoppingCart { ...props } /> }
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
