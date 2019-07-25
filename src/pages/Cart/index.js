import React,{Component} from 'react';

import styles from '../../assets/scss/Cart.module.scss'

import {api} from '../../utils'


class Cart extends Component{
    constructor(){
        super();
        this.state = {
            cartList:[]
        }
    }
    async componentWillMount(){
        //?act=member_cart&op=cart_list
        //暂时模拟购物车
        let data = await api.get("/cartlist",{});
        //console.log(data);
        
        let {data:{obj}} = data;
        let cartList = obj;
        this.setState({
            cartList
        });
        
    }
    render(){
        let {cartList} = this.state;
        console.log(cartList);
        
        let a = this.state.cartList[0];
        
        return (
            <div className={`cont ${styles.cont}`}>
                <div className={`header ${styles.header}`}>
                    <div className={styles.header_wrap}>
                        <div className={styles.header_l}>
                            <a href="javascript:;">
                                <i class={styles.back}></i>
                            </a>
                        </div>
                        <div className={styles.header_title}>
                            <h1>购物车 <i id="cart_mum"></i></h1>
                        </div>
                        <div className={styles.header_edit}>
                            <span className={styles.edit_cart} id="edit_btn">编辑</span>
                        </div>
                        <div className={styles.header_r}>
                            <a id="header-nav" href="javascript:void(0);">
                                <i className={styles.more}></i>
                                <sup></sup>
                            </a>
                        </div>
                    </div>
                </div>
                <div className={`main ${styles.main}`}>
                    {
                        cartList.map(item=>{
                            return (
                                <div className={styles.goods_layer} key={item.store_id}>
                                    <div className={styles.goods_store}>
                                        <div className={styles.chose}>
                                            <input type="checkbox" />
                                        </div>
                                        <span className={styles.goods_store_name}>{item.store_name}</span>
                                        <div className={styles.goods_store_tips}>
                                            <i></i>
                                            <span>满{item.free_freight_price}元免运费 !</span>
                                        </div>
                                    </div>
                                    {
                                        item.goods.map(item=>{
                                            return (
                                                <div className={styles.goods_info} key="item.goods_id">
                                                    <div className={styles.chose}>
                                                        <input type="checkbox" />
                                                    </div>
                                                    <div className={styles.goods_img} >
                                                        <a href="#">
                                                            <img src={item.goods_image_url} alt="" />
                                                        </a>
                                                    </div>
                                                    <div className={styles.goods_text}>
                                                        <dl>
                                                            <dt className={styles.goods_name}>
                                                                <a href="#">{item.goods_name}</a>
                                                            </dt>
                                                            <dd className={styles.goods_type}>{item.goods_spec}</dd>
                                                        </dl>
                                                        <div className={styles.price_num}>
                                                            <div className={styles.goods_price}>¥<span>{item.goods_price}</span></div>
                                                            <div className={styles.goods_control}>
                                                                <button className={styles.control}>-</button>
                                                                <p className={styles.show_num}>{item.goods_num}</p>
                                                                <button className={styles.control}>+</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                    
                    <div className={styles.goods_cart_bottom}>
                        <div className={styles.chose}>
                            <input type="checkbox" />
                            <span>全选</span>
                        </div>
                        <div className={styles.count}>
                            合计：
                            <span>¥100.00</span>
                        </div>
                        <button className={styles.check_out}>结算(10)</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart;