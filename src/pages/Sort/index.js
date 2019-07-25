import React,{Component}from 'react';
import styles from '../../assets/scss/sort.module.scss'
import {Route,Switch} from 'react-router-dom';
// import '../../assets/'
import {api} from '../../utils/index.js';
import '../../assets/css/common/reset.css';
import {Menu,Icon,} from 'antd';
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

    }
    render(){
        // console.log(api)
        // let  imgurl = require('../../assets/img/sort/nav1.jpg')
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
                        <a href="javascript:void(0);">
                            <li>专馆基地</li>
                        </a>
                        <a href="javascript:void(0);">
                            <li>活动专区</li>
                        </a>
                        {
                            this.state.class_list.map(item=>{
                                return<a href="javascript:void(0);" key={item.gc_id} onClick={this.goto.bind(this,item.gc_id)}>
                                        <li>{item.gc_name}</li>
                                      </a>
                            })
                        }
                        
                    </ul>
                </div>
                <Switch>

                    {/* <Route path="/sort/SMain/:id" component={Sort} /> */}
                </Switch>
                <div className={styles.nav_main}>
                    <div className={styles.nav_main_top}>
                        <a href="">
                        <img src={[require('../../assets/images/sort/nav1.jpg')]} alt=""/>
                        </a>
                    </div>

                    <dl className={styles.nav_main_bottom}>
                        <dt>
                            <a href="">
                                <img src={[require('../../assets/images/sort/bgwhile.png')]} alt=""/>
                                <span>热门专馆</span>
                            </a>
                        </dt>
                        <dd>
                            <a href="">
                                {/* <img src="" alt=""/> */}
                                <div></div>
                                <p>文创生活馆</p>
                            </a>
                        </dd>
                        <dd>
                            <a href="">
                                {/* <img src="" alt=""/> */}
                                <div></div>
                                <p>文创生活馆</p>
                            </a>
                        </dd>
                        <dd>
                            <a href="">
                                {/* <img src="" alt=""/> */}
                                <div></div>
                                <p>文创生活馆</p>
                            </a>
                        </dd>
                    </dl>
                </div>
            </div>
            {/* <div className={styles.footer}></div> */}
        </div>
    }
}

export default Sort
