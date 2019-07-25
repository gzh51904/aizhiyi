import React,{Component} from 'react';
import {Route,Switch} from 'react-router-dom';
import './assets/css/common/reset.css';
import Home from './pages/Home';
import Sort from './pages/Sort';
class App extends Component{
  constructor(){
    super();
    this.state = {
      subNav : [
        {
          name:'Home',
          path:'/home',
          title:"首页",
          icon:""
        },{
          name:'Sort',
          path:'/sort',
          title:"分类",
          icon:""
        },
      ]
    }
  }
  render(){
    return (
      <div className="App"> 
      <Sort/>
      </div>
      
    );
  }
}

export default App;