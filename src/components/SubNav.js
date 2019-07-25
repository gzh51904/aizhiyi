import React,{Component} from 'react';

import '../assets/scss/subNav.scss';

import {NavLink} from 'react-router-dom'
class SubNav extends Component{
  constructor(){
    super();
    this.state = {
      subNav : [
        {
            name:'Home',
            path:'/home',
            title:"首页",
            icon:""
        },
        {
            name:'Welfare',
            path:'/welfare',
            title:"福利",
            icon:""
          },
          {
            name:'Sort',
            path:'/sort',
            title:"分类",
            icon:""
          },
          {
            name:'Cart',
            path:'/cart',
            title:"购物车",
            icon:""
          },
          {
            name:'Mine',
            path:'/mine',
            title:"我的",
            icon:""
          }
      ]
    }
  }
  render(){
    let {subNav} = this.state;
    return (
      <div className="sub-nav">
        {
            subNav.map(item=>{
                return (
                    <NavLink className="nav-item" to={item.path} key={item.name} activeClassName="nav-current">
                        <i className={item.name.toLowerCase()}></i>
                        <span>{item.title}</span>
                    </NavLink>
                )
            })
        }
      </div>
    );
  }
}

export default SubNav;