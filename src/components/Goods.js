import React, { Component } from 'react';
import styles from "../assets/scss/goods.module.scss";
import "../assets/scss/ant.css";
import "../assets/scss/goodsCar.scss";
import '../assets/css/common/reset.css';
import { api } from "../utils";
import { Modal, List, Button, WhiteSpace, WingBlank, Stepper, Badge, Tabs } from 'antd-mobile';
import Commodity from "./Commodity";
import Details from "./Details";
import Comment from "./Comment";

//
import {connect} from 'react-redux';
import {addAction,changeQtyAction, getAllAction} from '../actions/cartActions';


class Goods extends Component {
    constructor() {
        super();
        this.state = {
            modal1: false,
            modal2: false,
            del: 2,
            goods_num: 1,
            goods_price :"",
            goods_name:"",
            goods_image:"",
            store_id:"",
            store_name:"",
            goods_id:"",
            newPrice:"",
            data:{},
            info : {}

        }
        this.goto = this.goto.bind(this);
        this.cart = this.cart.bind(this);
        this.add = this.add.bind(this);
        this.goto = this.goto.bind(this);
        this.tocart = this.tocart.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }
    goto() {
        let { history } = this.props;
        history.goBack();
        
    } 
    tocart(){
        let { history } = this.props;
        history.push("/cart")
    }

    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    onChange = (goods_num,e) => {
        console.log(this.state.goods_num);
        this.setState({ goods_num });
        
        
    }
    onChange1 = (del) => {
        this.setState({ del });
        console.log(this.state.del);
    }
<<<<<<< HEAD
    async cart(id){
        let Authorization = localStorage.getItem('Authorization');
        let user_key = localStorage.getItem('user_key'); 
        
        if(Authorization){          
            this.addToCart();
        }else{
            let {history} = this.props;
            history.replace('/Login');
        }
=======
    cart(id){
        /* let { 
            goods_num,
            goods_name,
            goods_price,
            goods_image,
            store_id,
            store_name,
            goods_id,
            newPrice,
            info
        }= this.state;
        let info ={
            goods_name:goods_name,
            goods_price:goods_price,
            goods_image:goods_image,
            store_id:store_id,
            store_name:store_name,
            goods_id:goods_id,
            newPrice:newPrice,
            goods_num:goods_num
        }]
       this.setState({
        info
       })
       console.log(info); */
       
        // console.log(this.state);
        this.addToCart();
>>>>>>> 21869603e49e789f4b51a60d4e51a71f170496b8
          
 }
    async add(goods_id){
        //点击购物车的时请求拼接数据
        let Authorization = localStorage.getItem('Authorization');
        let user_key = localStorage.getItem('user_key');

        if(!Authorization){
            let {history} = this.props;
            history.push('/login');
        }
        // https://www.aizhiyi.com/mobile/index.php?act=goods&op=goods_detail&key=null&goods_id=109203&num=3
        let { data :{datas}} = await api.get("", {
            params: {
                act: "goods",
                op: "goods_detail",
                key:null,
                goods_id: goods_id,
                num:3
            }
        });
        let img = [];
        let spec = datas.spec_image;
        for (let i in spec) {
            img.push(spec[i])
        }
        let {goods_name,goods_price} = datas.goods_info;
        let {store_id,store_name} = datas.store_info;
        let goods_image = img[0];
        // console.log(store_id,store_name,777)
        this.setState({
            goods_name,
            goods_price,
            goods_image,
            store_id,
            store_name,
            goods_id,
            newPrice:goods_price
        });
        let info ={
            store_id:store_id,
            store_name:store_name,
            goods:[{
                goods_name:goods_name,
                goods_price:goods_price,
                goods_image_url:goods_image,
                store_id:store_id,
                store_name:store_name,
                goods_id:goods_id,
                newPrice:this.state.newPrice,
                goods_num:this.state.goods_num
            }]
        }
        this.setState({
            info
        });
        console.log("info-info！！！！！！！！！！！",info);
           
    }

    //购物车同步服务器数据
    async cart2server(user_key,cart_list){
        console.log(111);
        
        let datas = {
            init_name : "熬夜冠军",
            cart_list
        }
        //datas = JSON.stringify(datas)
        let data = await api.getData("/cartlist/update", {
            params: {
                user_key,
                datas
            }
        });
    }

    //加入购物车
    addToCart(){
        console.log("点击加入购物车");
        let {info} = this.state;

        let {cart_list,add2cart,changeQty,getAll} = this.props;

        let user_key = localStorage.getItem('user_key');

        console.log("==========cart_list==============",cart_list);

        let currentStore = cart_list.filter(item=>item.store_id == info.store_id)[0];

        console.log("==========currentStore==============",currentStore);

        let infoGoods = info.goods[0];

        console.log("infoGoodsinfoGoodsinfoGoods",infoGoods);
        
        let currentGoods = !currentStore ? "" : currentStore.goods.filter(item=>item.goods_id == infoGoods.goods_id)[0];
        
        console.log("currentGoods??????????????????????",currentGoods);
        
        if(!currentGoods){
            /* currentStore.goods.map(item=>{
                if(item.goods_id === )
            }) */
            if(cart_list.length !== 0 && currentStore){
                 cart_list.map(item=>{
                    if(item.store_id == info.store_id){
                        item.goods.push(info.goods[0]);
                    }
                    return item;
                }) 
            }else{
                console.log(11);
                
                cart_list.push(info)
            }
            console.log("whywhywhy",cart_list);
            
            add2cart(cart_list)
            console.log("??????????????????????",cart_list[0]);
            
        }else{
<<<<<<< HEAD
            console.log("store_id",currentGoods);
            console.log("qty",currentGoods.goods_num*1+infoGoods.goods_num*1);
            //console.log({sid:currentGoods.store_id,gid:currentGoods.goods_id,qty:currentGoods.goods_num*1+infoGoods.goods_num*1});
=======
            // console.log("qty",currentGoods.goods_num*1+info.goods_num*1);
>>>>>>> 21869603e49e789f4b51a60d4e51a71f170496b8
            
            changeQty(
                {
                    sid:currentGoods.store_id,
                    gid:currentGoods.goods_id,
                    qty:currentGoods.goods_num*1+infoGoods.goods_num*1
                }
            )
        }
<<<<<<< HEAD
        console.log("已经加入完了",this.props.cart_list);
=======
        //cart_list = this.propss.cart_list;
        
        cart_list = this.props.cart_list.length ? this.props.cart_list : this.state.info;
        // console.log(JSON.stringify(cart_list));
        localStorage.setItem("cart_list",JSON.stringify(cart_list));
        
        
/*         api.getData('cartlist',{
            params:{
                user_key,
                cart_list
            }
        }).then(data => {
            console.log(data.data);}) */
        
>>>>>>> 21869603e49e789f4b51a60d4e51a71f170496b8
        
        this.cart2server(user_key,this.props.cart_list);
        
<<<<<<< HEAD
    } 
    render() {
=======
    }
    //组件更新时被调用 
    componentWillReceiveProps(nextProps) {
        let len = window.location.href.split("/").length
        let key = window.location.href.split("/")[len - 1];
        this.setState({
            goods_id: key
        });
       
    }
    render() {
        // console.log(this.state)
>>>>>>> 21869603e49e789f4b51a60d4e51a71f170496b8
        // console.log(this.state.add)
        let len = window.location.href.split("/").length;
        let id = window.location.href.split("/")[len - 1];
        let {goods_image,goods_price,goods_name} = this.state;
        // console.log(datas)
        const tabs = [
            { title: <Badge >商品</Badge> },
            { title: <Badge >详情</Badge> },
            { title: <Badge >评价</Badge> },
        ];
        return (

            < div className={styles.cont} id="content">
                <div className={styles.header}>
                    <div className={styles.header_wrap}>
                        <div className={styles.header_l}>
                            <a href="javascript:;" onClick={this.goto}> <i className={styles.back}></i> </a>
                        </div>

                        <a href="javascript:;" className={styles.shop_cart} onClick={this.tocart}></a>
                        <div className={styles.header_r}>
                            <a href="javascript:void(0);">
                                <i className={styles.more}></i><sup></sup>
                            </a> </div>
                    </div>
                </div>
                <div className={styles.main}>

                    <div className="goods_main">
                        <Tabs tabs={tabs}
                            initialPage={0}
                            tabBarBackgroundColor="#d33d3c"
                            tabBarActiveTextColor="#fff"
                            tabBarInactiveTextColor="#e2e2e2"
                            tabBarUnderlineStyle={{ borderColor: "#fff", width: "1rem", fontSize: "20px" }}
                        >
                            <div style={{ height: "100%", backgroundColor: '#fff', paddingTop: ".86667rem" }}>
                                <Commodity key={`${this.state.goods_id}`}/>
                            </div>
                            <div style={{ height: '100%', backgroundColor: '#fff', paddingTop: ".86667rem" }}>
                                <Details  key={`${this.state.goods_id}`}/>
                            </div>
                            <div className="top" style={{ height: '100%', backgroundColor: '#fff', paddingTop: ".86667rem" }}>
                                <Comment  key={`${this.state.goods_id}`}/>
                            </div>
                        </Tabs>
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.otreh_handle}>
                        <a href="javascript:void(0);" className={styles.store_ind}><i></i><p>店铺</p></a>
                        <a href="javascript:void(0);" className={styles.kefu}><i></i><p>客服</p></a>
                        <a href="javascript:void(0);" className={styles.pd_collect}><i></i><p>收藏</p></a>
                    </div>
                    <div className={styles.buy_handle}>
                        <a href="javascript:void(0);" className={styles.buy_now}>立即购买</a>
                        <div className={styles.add_cart}>
                            <WingBlank>
                                <Button onClick={this.showModal('modal2')} style={{ backgroundColor: '#FE9402' }}>
                                <div 
                                            onClick={this.add.bind(this,id)} 
                                            style={
                                                {width:"2.2rem",
                                                height:'1rem',
                                                color:"#fff"}
                                                }>加入购物车</div>
                                </Button>
                                <WhiteSpace />
                                <Modal
                                    popup
                                    visible={this.state.modal2}
                                    onClose={this.onClose('modal2')}
                                    animationType="slide-up"
                                    // afterClose={() => { alert('加入成功'); }}

                                >
                                    <List renderHeader={() => <div className="nctouch-bottom-mask-top goods-options-info">
                                        <div className="goods-pic">
                                            <img src={goods_image} alt="" /></div><dl>
                                            <dt style={{
                                                 overflow: "hidden",
                                                 whiteSpace: "nowrap", 
                                                 textOverflow: "ellipsis",
                                            }}>{goods_name}</dt>
                                            <dd className="goods-price">
                                                <em>￥{goods_price}</em>
                                            </dd></dl><div className="store-choose"><span className="one">已选择 默认</span>
                                            <span className="two"></span>
                                        </div>
                                    </div>} className="popup-list">

                                        <List.Item>
                                            <div id="aa">
                                                <dl className="spec">
                                                    <dt >规格：</dt>
                                                    <dd >
                                                        <a href="javascript:void(0)" className="current fl" >默认 </a>
                                                    </dd>
                                                </dl>
                                                <dl className="spec">
                                                    <dt> 工艺：</dt>
                                                    <dd >
                                                        <a href="javascript:void(0)" className="current fl" >纯手工制作</a>
                                                    </dd>
                                                </dl>
                                                <dl>
                                                    <List>
                                                        <List.Item
                                                            wrap
                                                            extra={
                                                                <Stepper
                                                                    style={{ width: '100%', minWidth: '100px' }}
                                                                    showNumber
                                                                    max={10}
                                                                    min={1}
                                                                    value={this.state.goods_num}
                                                                    onChange={this.onChange}
                                                                />}
                                                        >
                                                           购买数量
                                                           
                                                    </List.Item>
                                                    </List>
                                                </dl>
                                            </div>
                                        </List.Item>
                                        <List.Item>
                                            <Button type="warning" onClick={this.onClose('modal2')}>
                                            <div 
                                            onClick={this.cart.bind(this,id)} 
                                            style={
                                                {width:"6.9rem",
                                                height:'0.9rem',
                                                color:"#fff"}
                                                }>确定</div>
                                            </Button>
                                            
                                        </List.Item>
                                    </List>
                                </Modal>
                            </WingBlank>
                        </div>

                    </div>
                </div>
            </div >)

    }


}

let mapStateToProps = (state,ownprops)=>{
    return {
        loginStatue:state.common.loginStatue,
        cart_list:state.cart.cart_list
    }
}

let mapDispatchToProps = (dispatch,ownprops)=>{
    return {
        add2cart(goods){
            dispatch(addAction(goods))
        },
        changeQty({sid,gid,qty}){
            dispatch(changeQtyAction({sid,gid,qty}))
        },
        getAll(){
            dispatch(getAllAction({}));
        }
    }
}

Goods = connect(mapStateToProps,mapDispatchToProps)(Goods);

export default Goods;