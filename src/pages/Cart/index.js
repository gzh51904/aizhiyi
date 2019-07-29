import React, { Component } from 'react';

import styles from '../../assets/scss/Cart.module.scss'

import { api } from '../../utils'


class Cart extends Component {
    constructor() {
        super();
        this.state = {
            "ini": "0.00",
            "sum": "",
            "cart_count": 0,
            count_price: 0,
            init_name: "",
            cart_list: [],
        }

        this.handleCheck = this.handleCheck.bind(this);
        this.handleCheckStore = this.handleCheckStore.bind(this);
        this.handleCheckAll = this.handleCheckAll.bind(this);
        this.countNumAdd = this.countNumAdd.bind(this);
        this.countNumCut = this.countNumCut.bind(this);
    }
    async componentWillMount() {
        console.log("cart:", this)
        //?act=member_cart&op=cart_list
        //暂时模拟购物车
        let { data } = await api.getData("/cartlist", {
            params: {
                user_key: '1',
            }
        });
        /* console.log(data); */
        let { datas, datas: { cart_list } } = data;
        //数据添加全选属性
        datas.isAllChecked = false;
        //数据店铺下的全选属性
        //遍历请求的数据添加checkbox属性为false 
        cart_list.map(item => {
            item.isStoreChecked = false;
            return item.goods.map(item => {
                item.isChecked = false;
            })
        });
        this.setState({
            ...datas,
            count_price: 0,
            count_num: 0,
            cart_list
        });



    }
    //checkbox全选操作
    handleCheckAll() {
        let isAllChecked = !this.state.isAllChecked;
        let count_price = 0;
        let count_num = 0;
        let { cart_list } = this.state;
        if (isAllChecked) {
            cart_list = cart_list.map(item => {
                //console.log(!item.isStoreChecked);
                item.isStoreChecked = true;
                item.goods.map(item => {
                    item.isChecked = true;
                    count_price = count_price + item.newPrice * item.goods_num;
                    count_num = count_num + item.goods_num * 1;
                    return item;
                })
                return item
            })
        } else {
            cart_list = cart_list.map(item => {
                //console.log(!item.isStoreChecked);
                item.isStoreChecked = false;
                item.goods.map(item => {
                    item.isChecked = false;
                    return item;
                })
                return item
            })
        }
        //console.log(cart_list);

        this.setState({
            isAllChecked,
            count_price,
            count_num,
            cart_list
        });

    }
    //storecheck操作
    handleCheckStore(idx) {
        let checkStoreCache = new Array(0);
        let { cart_list } = this.state;
        let { count_price } = this.state;
        let { count_num } = this.state;
        /*  if(cart_list[idx].isStoreChecked){
             cart_list[idx].goods.map(item=>{
                 item.isChecked = false;
                 return item;
             });
             cart_list[idx].isStoreChecked = !cart_list[idx].isStoreChecked;
         }else{ */
        cart_list.map((item, index) => {
            if (index === idx) {
                if (item.isStoreChecked) {
                    item.goods.map(item => {
                        count_price = (count_price - item.newPrice * item.goods_num) <= 0 ? 0 : (count_price - item.newPrice * item.goods_num);
                        count_num = (count_num - item.goods_num * 1) <= 0 ? 0 : (count_num - item.goods_num * 1);
                        item.isChecked = false;
                        return item;
                    });
                } else {
                    item.goods.map(item => {
                        item.isChecked = !item.isChecked;
                        count_price = count_price + item.newPrice * item.goods_num;
                        count_num = count_num + item.goods_num * 1;
                        return item;
                    });
                }
                item.isStoreChecked = !item.isStoreChecked;
            }
            checkStoreCache.push(item.isStoreChecked);
            return item;
        })
        /* } */
        //cart_list[idx].isStoreChecked = !cart_list[idx].isStoreChecked;
        console.log(checkStoreCache);

        this.setState({
            isAllChecked: checkStoreCache.every(isStoreChecked => isStoreChecked),
            count_price,
            count_num,
            cart_list
        });
    }

    //handleCheck操作
    handleCheck(goods_id) {
        let checkStoreCache = new Array(0);
        let checkAllCache = new Array(0);
        let { count_price } = this.state;
        let { count_num } = this.state;
        let cart_list = this.state.cart_list.map(item => {
            item.goods.map(item => {
                if (item.goods_id === goods_id) {
                    item.isChecked = !item.isChecked;
                    if (item.isChecked) {
                        count_price = count_price + item.newPrice * item.goods_num;
                        count_num = count_num + item.goods_num * 1;
                    } else {
                        count_price = count_price - item.newPrice * item.goods_num;
                        count_num = count_num - item.goods_num * 1;
                    }
                }
                checkStoreCache.push(item.isChecked);
                checkAllCache.push(item.isChecked);
                return item;
            })
            console.log(checkStoreCache);

            item.isStoreChecked = checkStoreCache.some(isChecked => isChecked);
            checkStoreCache = [];
            return item;
        });
        //console.log(checkAllCache);

        this.setState({
            isAllChecked: checkAllCache.every(isChecked => isChecked),
            count_price,
            count_num,
            cart_list
        })
    }
    //
    countNumAdd() {
        let { count_num } = this.state;
        let { cart_list } = this.state;
        cart_list.map(item => {
            item.goods.map(item => {
                count_num = count_num + item.goods_num * 1;
            })
        });
        this.setState({
            count_num
        })

    }
    //
    countNumCut() {
        let { count_num } = this.state;
        let { cart_list } = this.state;
        cart_list.map(item => {
            item.goods.map(item => {
                count_num = count_num - item.goods_num;
            })
        });
        this.setState({
            count_num
        })

    }
    //单个物品购物车减少数量
    decrease(num, idf, sid, idx) {
        let goods_num = Number(this.refs[idf].innerHTML);
        let { count_num } = this.state;
        if (goods_num === 1) {
            return
        }
        goods_num--;
        let cart_list = this.state.cart_list;
        let { goods } = cart_list[idx];
        goods = goods.map(item => {
            if (item.goods_id === idf) {
                console.log(idf);
                item.goods_num = goods_num;
                if (item.isChecked) {
                    count_num = count_num - 1;
                }
            }
            return item;
        })

        cart_list[idx].goods = goods;
        this.setState({
            count_num,
            cart_list
        });
        console.log(this.state);



    }
    //单个物品购物车增加数量
    increase(num, idf, sid, idx) {
        let { count_num } = this.state;
        let goods_num = Number(this.refs[idf].innerHTML);
        if (goods_num === 20) {
            return
        }
        goods_num++;
        let cart_list = this.state.cart_list;
        let { goods } = cart_list[idx];
        goods = goods.map(item => {
            if (item.goods_id === idf) {
                console.log(idf);
                item.goods_num = goods_num;
                if (item.isChecked) {
                    count_num = count_num + 1;
                }
            }
            return item;
        })

        cart_list[idx].goods = goods;
        this.setState({
            count_num,
            cart_list
        })

    }
    render() {
        console.log(this.state);

        let { cart_list } = this.state;

        return (
            <div className={`cont ${styles.cont}`}>
                <div className={`header ${styles.header}`}>
                    <div className={styles.header_wrap}>
                        <div className={styles.header_l}>
                            <a href="javascript:;">
                                <i className={styles.back}></i>
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
                    <div className={styles.cart_list}>
                        {
                            cart_list.map((item, index) => {
                                return (
                                    <div className={styles.goods_layer} key={item.store_id}>
                                        <div className={styles.goods_store}>
                                            <div className={styles.chose}>
                                                <input type="checkbox" checked={item.isStoreChecked} onChange={this.handleCheckStore.bind(this, index)} />
                                            </div>
                                            <span className={styles.goods_store_name}>{item.store_name}</span>
                                            <div className={styles.goods_store_tips}>
                                                <i></i>
                                                <span>满{item.free_freight_price}元免运费 !</span>
                                            </div>
                                        </div>
                                        {
                                            item.goods.map(item => {
                                                return (
                                                    <div className={styles.goods_info} key={item.goods_id}>
                                                        <div className={styles.chose}>
                                                            <input type="checkbox" checked={item.isChecked} onChange={this.handleCheck.bind(this, item.goods_id)} />
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
                                                                    <button onClick={this.decrease.bind(this, item.goods_num, item.goods_id, item.store_id, index)} className={styles.control}>-</button>
                                                                    <p ref={item.goods_id} className={styles.show_num}>{item.goods_num}</p>
                                                                    <button onClick={this.increase.bind(this, item.goods_num, item.goods_id, item.store_id, index)} className={styles.control}>+</button>
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
                    </div>
                    <div className={styles.goods_cart_bottom}>
                        <div className={styles.chose}>
                            <input type="checkbox" checked={this.state.isAllChecked || false} onChange={this.handleCheckAll} />
                            <span>全选</span>
                        </div>
                        <div className={styles.count}>
                            合计：
                            <span>¥{this.state.count_price.toFixed(2)}</span>
                        </div>
                        <button className={`${styles.check_out} ${this.state.count_num ? styles.active_pay : null}`}>结算({this.state.count_num})</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart;