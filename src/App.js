import React, { Component } from 'react';
import './assets/css/common/reset.css';

import { Route, Redirect, Switch, withRouter, HashRouter } from 'react-router-dom';

import SubNav from './components/SubNav';

import { connect } from 'react-redux';

import Home from './pages/Home';
import Welfare from './pages/Welfare';
import Sort from './pages/Sort';
import Cart from './pages/Cart';
import Mine from './pages/Mine';
import Goods from './components/Goods';

import Register from './pages/Register';
import Login from './pages/Login';
class App extends Component {
  render() {
    console.log(this.props.cart_len);

    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Redirect from="/" to="/home" exact />
            <Route path="/home" component={Home} />
            <Route path="/welfare" component={Welfare} />
            <Route path="/sort" component={Sort} />
            {/* <Route path="/sort/:id" component={Sort} /> */}
            <Route path="/cart" component={Cart} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/mine" component={Mine} />
            <Route path="/goods/:id" component={Goods} />
            <Route path="/404" render={() => <div>oh no 404</div>} />
            <Redirect from="/*" to="/404" />
          </Switch>
          <SubNav />
        </HashRouter>
      </div>

    );
  }
}

let mapStateToProps = (state) => {
  return {
    cart_len: state.cart.cart_list.length
  }
}
App = connect(mapStateToProps)(App);


export default App;