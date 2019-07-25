import React,{Component}from 'react';
import styles from '../../assets/scss/sort.module.scss'
import {Route,Switch} from 'react-router-dom';
// import '../../assets/'
import {api} from '../../utils/index.js';
import '../../assets/css/common/reset.css';
import {Menu,Icon,} from 'antd';
import SortMain from '../../components/SortMain';
import {NavLink} from 'react-router-dom'
import {HashRouter} from 'react-router-dom';
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
      let {data:{datas},data:{goods_class:{class_list}}}=  await api.get('',{
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
      console.log(datas,class_list);
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
        console.log(history);
        
        history.push("sort/"+ gc_id)
        //console.log(history);
        
    }
    render(){
        // console.log(api)
        // let  imgurl = require('../../assets/img/sort/nav1.jpg')
        let {location:{pathname}} = this.props
        console.log("res="+pathname);
        
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
                        <NavLink href="javascript:void(0);" to={'/sort/1905'} data={this.state.datas}>
                            <li>专馆基地</li>
                        </NavLink>
                        <NavLink href="javascript:void(0);" to={'/sort/1905'}>
                            <li>活动专区</li>
                        </NavLink>
                        {
                            this.state.class_list.map(item=>{
                                return(
                                        <NavLink href="javascript:void(0);" key={item.gc_id} to={'/sort/'+item.gc_id} data={this.state.class_list}>
                                            <li>{item.gc_name}</li>
                                        </NavLink>)
                            })
                        }
                        
                    </ul>
                </div>
                <Switch>
                    <Route path="/sort/:id" component={SortMain} />
                </Switch>          
            </div>
            {/* <div className={styles.footer}></div> */}
        </div>
    }
}

export default Sort
