import React,{Component}from 'react';
import styles from '../assets/scss/sort.module.scss'
import {api} from '../utils';
//引入sort的context
import {SortContext} from '../context';

class SortMain extends Component{
    constructor(){
        super();
        this.state = {
            class_list:[]
        }
        this.goList=this.goList.bind(this)
    }
    async componentDidMount(){
        
        let {params:{id}} = this.props.match;
        if(id !== 'activity'){
            if(id === 'feature'){
                let {data:{datas}} = await api.get('',{
                    params:{
                        act:'brand',
                        op:"store_recommend_list",
                        key:""
                    }
                });
                let {new_store,store_list} = datas;
                
                this.setState({
                    new_store,
                    store_list
                });
            } else{
                //?act=goods_class&op=get_child_all&gc_id=1378&key=
                
                let {data:{datas}} = await api.get('',{ 
                 //let data = await api.get('',{ 
                    params:{
                        act:'goods_class',
                        op:"get_child_all",
                        gc_id:id,
                        key:""
                    }
                });
                let {wap_goodsclass_image_info:{image_path},class_list} = datas;
                this.setState({
                    class_list,
                    image_path
                });   
                
            } 
        }
    }
    goList(id) {
        let { history } = this.props;
            history.push({
                pathname: '/list/' + id,
            })
            // console.log(id,this)
        }
    


    render(){
        let {params:{id}} = this.props.match;
        //let {image_path} = this.state.wap_img;   
        // let temp = this.state['wap_img'];
        // console.log("+++++++++++++++",temp);
        
        return (
            <SortContext.Consumer>
                {
                    ({status})=>{
                        return (
                            <>
                            {    
                               id === "feature" || id === "activity" ? 
                               (id === "feature" ? 
                                    (<> 
                                        <div className={styles.nav_main_top}>
                                            <a href="javascript:void(0)">
                                                <img src={[require('../assets/images/sort/nav1.jpg')]} alt=""/>
                                            </a>
                                        </div>
                                        {this.state.new_store ? 
                                            <dl className={`${styles.nav_main_bottom} ${styles.brands} claerfix`}>
                                                <dt>
                                                    <a href="javascript:void(0)">
                                                        <img src={[require('../assets/images/sort/bgwhile.png')]} alt=""/>
                                                        <span>热门专馆</span>
                                                    </a>
                                                </dt>
                                                {
                                                    this.state.new_store.map(item=>{                                       
                                                        return (
                                                                <dd key={item.store_id}>
                                                                    <a href="javascript:void(0)">
                                                                        <img src={item.store_avatar} alt=""/>                                  
                                                                        <p>{item.store_name}</p>
                                                                    </a>
                                                                </dd>
                                                                )
                                                            
                                                        })
                                                    
                                                }                                                
                                            </dl> : ""
                                        }
                                        {this.state.store_list ?
                                            <dl className={`${styles.nav_main_bottom} ${styles.brands} claerfix`}>
                                                <dt>
                                                    <a href="javascript:void(0)">
                                                        <img src={[require('../assets/images/sort/bgwhile.png')]} alt=""/>
                                                        <span>全部专馆</span>
                                                    </a>
                                                </dt>
                                                {
                                                    this.state.store_list.map(item=>{                                                       
                                                        return (item.map(item=>{
                                                                    return (
                                                                        <dd key={item.store_id}>
                                                                            <a href="javascript:void(0)">
                                                                                <img src={item.store_avatar} alt=""/>                                  
                                                                                <p>{item.store_name}</p>
                                                                            </a>
                                                                        </dd>
                                                                    )
                                                                })
                                                        )
                                                    }) 
                                                }                                                
                                            </dl>  : ""
                                        }
                                    </>)
                                   : 
                                   (<>                    
                                   <div className={styles.nav_main_top}>
                                       <a href="javascript:void(0)">
                                       <img src={[require('../assets/images/sort/nav1.jpg')]} alt=""/>
                                       </a>
                                    </div>
                                    <dl className={`${styles.nav_main_bottom} claerfix`}>
                                        <dt>
                                            <a href="javascript:void(0)">
                                                <img src={[require('../assets/images/sort/bgwhile.png')]} alt=""/>
                                                <span>热门专馆</span>
                                            </a>
                                        </dt>
                                        <dd onClick={()=>{let {history}=this.props;history.push("/welfare")}}>
                                            <a href="javascript:void(0)">
                                                <img src={[require('../assets/images/sort/z170.png')]} alt=""/>                     
                                                <p>热门专馆</p>
                                            </a>
                                        </dd>
                                        <dd onClick={()=>{let {history}=this.props;history.push("/welfare")}}>
                                            <a href="javascript:void(0)">
                                                <img src={[require('../assets/images/sort/abt.png')]} alt=""/>
                                                <p>拼团</p>
                                            </a>
                                        </dd>
                                        <dd onClick={()=>{let {history}=this.props;history.push("/welfare")}}>
                                            <a href="javascript:void(0)">
                                                <img src={[require('../assets/images/sort/xsg.png')]} alt=""/>
                                                <p>限时购</p>
                                            </a>
                                        </dd>
                                        <dd onClick={()=>{let {history}=this.props;history.push("/welfare")}}>
                                            <a href="javascript:void(0)">
                                                <img src={[require('../assets/images/sort/newgoods.png')]} alt=""/>
                                                <p>新品上市</p>
                                            </a>
                                        </dd>
                                    </dl>
                                </>)
                                    ): 
                               (<>                    
                                <div className={styles.nav_main_top}>
                                    <a href="#">
                                        <img src={this.state.image_path} alt=""/>
                                    </a>
                                 </div>
                                 {
                                     this.state.class_list.map(item=>{
                                         return (
                                            <dl className={`${styles.nav_main_bottom} claerfix`} key={item.gc_id}>
                                                <dt>
                                                    <a href="javascript:void(0)">
                                                        <img src={[require('../assets/images/sort/bgwhile.png')]} alt=""/>
                                                        <span>{item.gc_name}</span>
                                                    </a>
                                                </dt>
                                                {
                                                    item.child.map(item=>{
                                                        //let temp = item.wap_goodsclass_image_info.wap_advs1.image_path;
                                                        
                                                        return (
                                                            <dd key={item.gc_id} onClick={this.goList.bind(this,item.gc_id)}>
                                                                <a href="javascript:void(0)">
                                                                    { 
                                                                        item.wap_goodsclass_image_info.wap_advs1 ?
                                                                        <img src={item.wap_goodsclass_image_info.wap_advs1.image_path} alt=""/> :
                                                                        ""
                                                                        
                                                                    }
                                                                    <p>{item.gc_name}</p>
                                                                </a>
                                                            </dd>)
                                                    })
                                                }
                                            </dl>)
                                     })
                                 }
                                </>)     
                            }</>)
                        } 
                }
            </SortContext.Consumer>)
        }
}

//这里的props.location.pathname就是router的path属性的值，这样就实现了，router的path属性指向组件的key。
//这样切换路由的时候，即可完成组件的刷新（重构）。
export default (props)=><SortMain {...props} key={props.location.pathname} />
