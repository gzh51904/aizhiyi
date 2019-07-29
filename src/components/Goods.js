import React, { Component } from 'react';
import styles from "../assets/scss/goods.module.scss";
import "../assets/scss/ant.css";
import '../assets/css/common/reset.css';
import { Tabs, Badge } from 'antd-mobile';
import Commodity from "./Commodity";
import Details from "./Details";
import Comment from "./Comment";

//
import {connect} from 'react-redux';
import {addAction,changeQtyAction} from '../actions/cartActions';


class Goods extends Component {
    constructor() {
        super();
        this.state = {
            info : [{
                    "store_id" : "175",
                    "store_name" : "特产美食馆",
                    "goods_id" : "107782",
                    "goods_name" : "北部湾烤海鸭蛋_ 尝尝得享 70*30枚",
                    "goods_price" : "76.00",
                    "goods_num" : "4",
                    "goods_image" : "2018/08/11/183_05873227531317585.jpg",
                    "goods_spec" : "品牌：尝尝得享, 规格：70*30枚",
                    "goods_image_url" : "https://www.aizhiyi.com/data/upload/shop/store/goods/183/2018/08/11/183_05873227531317585_360.jpg",
                    "newPrice" : 76,
                    }]
            }
        
        this.goto = this.goto.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }
    goto() {
        let { history } = this.props;
        history.push("/home")
    }
    //加入购物车
    addToCart(){
        console.log("点击加入购物车");
        console.log(this.props);
        let {info} = this.state;
        let {cart_list,add2cart,changeQty} = this.props;
        let currentGoods = cart_list.filter(item=>item.goods_id === info.goods_id)[0];
        if(!currentGoods){
            add2cart({
                "store_id" : "175",
                "store_name" : "特产美食馆",
                "goods_id" : "107782",
                "goods_name" : "北部湾烤海鸭蛋_ 尝尝得享 70*30枚",
                "goods_price" : "76.00",
                "goods_num" : 1,
                "goods_image" : "2018/08/11/183_05873227531317585.jpg",
                "goods_spec" : "品牌：尝尝得享, 规格：70*30枚",
                "goods_image_url" : "https://www.aizhiyi.com/data/upload/shop/store/goods/183/2018/08/11/183_05873227531317585_360.jpg",
                "newPrice" : 76,
                })
        }else{
            changeQty({id:currentGoods.goods_id,qty:currentGoods.goods_num*1+1})
        }
    }
    render() {

        const tabs = [
            { title: <Badge >商品</Badge> },
            { title: <Badge >详情</Badge> },
            { title: <Badge >评价</Badge> },
        ];
        console.log("goods", this.props)
        return (

            < div className={styles.cont} id="content">
                <div className={styles.header}>
                    <div className={styles.header_wrap}>
                        <div className={styles.header_l}>
                            <a href="javascript:;" onClick={this.goto}> <i className={styles.back}></i> </a>
                        </div>

                        <a href="javascript:;" className={styles.shop_cart}></a>
                        <div className={styles.header_r}>
                            <a href="javascript:void(0);">
                                <i className={styles.more}></i><sup></sup>
                            </a> </div>
                    </div>
                </div>
                <div className={styles.main}>
                    <Tabs tabs={tabs}
                        initialPage={0}
                        tabBarBackgroundColor="#d33d3c"
                        tabBarActiveTextColor="#fff"
                        tabBarInactiveTextColor="#e2e2e2"
                        tabBarUnderlineStyle={{ borderColor: "#fff", width: "1rem", fontSize: "20px" }}
                    >
                        <div style={{ height: "100%", backgroundColor: '#fff', marginTop: ".86667rem" }}>
                            <Commodity />
                        </div>
                        <div style={{ height: '100%', backgroundColor: '#fff', marginTop: ".86667rem" }}>
                            <Details />
                        </div>
                        <div className="top" style={{ height: '100%', backgroundColor: '#fff', marginTop: ".86667rem" }}>
                            <Comment />
                        </div>
                    </Tabs>

                </div>
                <div className={styles.footer}>
                    <div className={styles.otreh_handle}>
                        <a href="javascript:void(0);" className={styles.store_ind}><i></i><p>店铺</p></a>
                        <a href="javascript:void(0);" className={styles.kefu}><i></i><p>客服</p></a>
                        <a href="javascript:void(0);" className={styles.pd_collect}><i></i><p>收藏</p></a>
                    </div>
                    <div className={styles.buy_handle}>
                        <a href="javascript:void(0);" className={styles.buy_now}>立即购买</a>
                        <a href="javascript:void(0);" className={styles.add_cart} onClick={this.addToCart}>加入购物车</a>
                    </div>
                </div>
            </div >)

    }
}



let mapStateToProps = (state,ownprops)=>{
    return {
        cart_list:state.cart.cart_list
    }
}

let mapDispatchToProps = (dispatch,ownprops)=>{
    return {
        add2cart(goods){
            dispatch(addAction(goods))
        },
        changeQty({id,qty}){
            dispatch(changeQtyAction({id,qty}))
        }
    }
}

Goods = connect(mapStateToProps,mapDispatchToProps)(Goods);

export default Goods;