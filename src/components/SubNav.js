import React,{Component} from 'react';

import '../assets/scss/subNav.scss';

import {NavLink} from 'react-router-dom'

import { Menu, Icon, Badge} from 'antd';

import { connect } from 'react-redux';

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
                        { 
                          item.name==='Cart'? 
                          <Badge count={this.props.cart_len}>
                            <i className={item.name.toLowerCase()}></i>
                            {item.title}
                          </Badge>
                          :
                          <>
                          <i className={item.name.toLowerCase()}></i>
                          <span>{item.title}</span>
                          </>
                        }
                    </NavLink>
                )
            })
        }
      </div>
    );
  }
}


let mapStateToProps = (state)=>{
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
  // console.log(totalLen);
  return {
    cart_len: totalLen
  }
}
SubNav = connect(mapStateToProps)(SubNav);

export default SubNav;