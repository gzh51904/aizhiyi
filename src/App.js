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
import Search from './components/Search';
import List from './components/List';

import Register from './pages/Register';
import Login from './pages/Login';

//
import {api} from './utils/index.js';
//
import {connect} from 'react-redux';
import {addAction,changeQtyAction, getAllAction} from './actions/cartActions';

class App extends Component {
  async componentWillMount(){
    let user_key = localStorage.getItem('user_key');
    if(user_key){
      let {data} = await api.getData('/cartlist',{
        params:{
          user_key
        }        
     });
     
     let {code,datas:{cart_list}}= data;
     console.log(cart_list);
     let {add2cart} = this.props;
     add2cart(cart_list);
    }
  }
  render() {
    //console.log(this.props.cart_len);
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
            <Route path="/search" component={Search} />
            <Route path="/list/:id" component={List} />
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
  let totalLen = 0;
  if(state.cart.cart_list.length !==0){
    state.cart.cart_list.map(item=>{   
        item.goods.map(item=>{
          totalLen = totalLen + item.goods_num*1;
          return item;
        })
      return item;
    })  
  }
  //console.log(totalLen);
  return {
    cart_len: totalLen
  }
}
let mapDispatchToProps = (dispatch,ownprops)=>{
  return {
      add2cart(goods){
          dispatch(addAction(goods))
      },
      changeQty({id,qty}){
          dispatch(changeQtyAction({id,qty}))
      },
      getAll(){
          dispatch(getAllAction({}));
      }
  }
}

App = connect(mapStateToProps,mapDispatchToProps)(App);


export default App;