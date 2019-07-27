import React, { Component } from 'react';
import './assets/css/common/reset.css';

import { Route, Redirect, Switch, withRouter, HashRouter } from 'react-router-dom';

import SubNav from './components/SubNav';

import Home from './pages/Home';
import Welfare from './pages/Welfare';
import Sort from './pages/Sort';
import Cart from './pages/Cart';
import Mine from './pages/Mine';
import Goods from './components/Goods';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Redirect from="/" to="/home" component={Home} exact />
            <Route path="/home" component={Home} />
            <Route path="/welfare" component={Welfare} />
            <Route path="/sort" component={Sort} />
            <Route path="/cart" component={Cart} />
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

export default App;