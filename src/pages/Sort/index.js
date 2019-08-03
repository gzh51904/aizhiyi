import React, { Component } from 'react';
import styles from '../../assets/scss/sort.module.scss'
import {Route,Switch,Redirect} from 'react-router-dom';

import {api} from '../../utils/index.js';
import '../../assets/css/common/reset.css';
import {Menu,Icon,} from 'antd';
import SortMain from '../../components/SortMain';
import {NavLink} from 'react-router-dom'

//引入sort的context
import {SortContext} from '../../context';


class Sort extends Component{
    constructor(){
        super();
        this.state={
            datas:[],
            class_list:[]

        }
        this.goto=this.goto.bind(this);
    }
    async componentWillMount(){
        
      let {data:{datas},data:{goods_class:{class_list}}} = await api.get('',{
            params:{
                act:'brand',
                op:"store_recommend_list",
                key:"fa362fbed72e7e24297fa87ff74d84dc"
            }
      })
    //   let class_list1 = class_list.splice(0,9)
    //    class_list.splice(-1)
      this.setState({
          datas,
          class_list
      })
    }

    
    // handleClick = e => {
    //     console.log('click ', e);

    //     console.log(e);
        
    //     this.setState({
    //       current: e.key,
    //     });
    //   };
    goto(gc_id){
        let {history} = this.props
        
        //history.push("/sort/"+ gc_id)
        //console.log(history);
        console.log(gc_id);
        
    }
    render(){
        
        return <div className={styles.cont}>
            <div className={styles.header}>
                <span>分类</span>
                <div className={styles.header_right}>
                    <a href="javascript:void(0);">
                        <i className={styles.more}></i>
                    </a>
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.nav}>
                    <ul>
                        <NavLink href="javascript:void(0);" to={'/sort/feature'} activeClassName={styles.sort_nav_current}>
                            <li>专馆基地</li>
                        </NavLink>
                        <NavLink href="javascript:void(0);" to={'/sort/activity'} activeClassName={styles.sort_nav_current}>
                            <li>活动专区</li>
                        </NavLink>
                        {
                            this.state.class_list.map(item=>{
                                return(
                                        <NavLink href="javascript:void(0);" key={'/sort/'+item.gc_id} to={'/sort/'+item.gc_id} activeClassName={styles.sort_nav_current}>
                                            <li>{item.gc_name}</li>
                                            
                                        </NavLink>)
                            })
                        }
                        
                    </ul>
                </div>
                  
                <SortContext.Provider value={{datas:this.state.datas,class_list:this.state.class_list}}> 
                <div className={styles.nav_main}>                 
                    <Switch>
                        <Redirect from="/sort" to="/sort/feature" exact />   
                        <Route path="/sort/:id" component={SortMain} />
                    </Switch>
                    </div>  
                </SortContext.Provider>          
                
            </div>
            
        </div>
    }
}

export default Sort
