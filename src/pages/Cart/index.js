import React, { Component } from 'react';

import styles from '../../assets/scss/Cart.module.scss'

import { api } from '../../utils';

import ReactDOM from 'react-dom';

import {connect} from 'react-redux';

import { PullToRefresh,SwipeAction, List } from 'antd-mobile';

import {addAction,changeQtyAction, getAllAction} from '../../actions/cartActions';

function genData() {
  const dataArr = [];
  for (let i = 0; i < 20; i++) {
    dataArr.push(i);
  }
  return dataArr;
}

let timeout;

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "ini": "0.00",
            "sum": "",
            "cart_count": 0,
            count_price: 0,
            init_name: "",
            cart_list: [],
            requireAuth:false,
            ////////////////////
            refreshing: false,
            down: true,
            height: document.documentElement.clientHeight,
            data: [],
            noLogImg: require("../../assets/images/cart/noLogin.png")
        }

        this.handleCheck = this.handleCheck.bind(this);
        this.handleCheckStore = this.handleCheckStore.bind(this);
        this.handleCheckAll = this.handleCheckAll.bind(this);
        this.countNumAdd = this.countNumAdd.bind(this);
        this.countNumCut = this.countNumCut.bind(this);
        this.pay = this.pay.bind(this);
        //this.debounce = this.debounce.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    /* componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
        setTimeout(() => this.setState({
          height: hei,
          data: genData(),
        }), 0);
      } */
    
    async componentDidMount() {
        
        let Authorization = localStorage.getItem('Authorization');
        
        if(Authorization){
            //console.log("cart:", this)
            //?act=member_cart&op=cart_list
            //console.log("cart props",this.props);

            if(this.props.cart_list.length === 0){
                let user_key = localStorage.getItem("user_key");

                //暂时模拟购物车
                let { data } = await api.getData("/cartlist", {
                    params: {
                        user_key,
                    }
                });
                //console.log("data--data",data); 
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
                //console.log("cart_list--cart_list",cart_list);
                    this.setState({
                        ...datas,
                        count_price: 0,
                        count_num: 0,
                        cart_list,
                        requireAuth : true,
                    });
                //console.log("cart-state",this.state);
            }else{
                let {cart_list} = this.props;
                this.setState({
                    "init_name" : "熬夜冠军",
                    count_price: 0,
                    count_num: 0,
                    cart_list,
                    requireAuth : true,
                });
                // if(cart_list.length !== 0 ){
                    const hei = this.state.height - (ReactDOM.findDOMNode(this.ptr) ? ReactDOM.findDOMNode(this.ptr).offsetTop : 0 );
                    setTimeout(() => this.setState({
                        height: hei,
                        data: genData(),
                    }), 0);

                // }
                
            }
            
            
            
        }

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
        //console.log(checkStoreCache);

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
            //console.log(checkStoreCache);

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
        let {count_price} = this.state;
        let {add2cart} = this.props;
        let user_key = localStorage.getItem('user_key');
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
                    count_price = count_price - item.newPrice;
                    count_num = count_num - 1;
                }
            }
            return item;
        })

        cart_list[idx].goods = goods;
        this.setState({
            count_num,
            cart_list,
            count_price
        });
        
        add2cart(cart_list);
        console.log(this.state);
        //防抖
            
        clearTimeout(timeout);
                
                
        timeout = setTimeout(() => {
            console.log(user_key);
            
            this.cart2server(user_key,cart_list);
            
        }, 3000);
        
    


    }
    //单个物品购物车增加数量
    increase(num, idf, sid, idx) {
        let { count_num } = this.state;
        let {count_price} = this.state;
        let goods_num = Number(this.refs[idf].innerHTML);
        let {add2cart} = this.props;
        let user_key = localStorage.getItem('user_key');
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
                    count_price = count_price + item.newPrice*1;
                    count_num = count_num + 1;
                   
                }
            }
            return item;
        })

        cart_list[idx].goods = goods;
        this.setState({
            count_num,
            cart_list,
            count_price
        });
        add2cart(cart_list);
        
        /* this.debounce(this.cart2server,3000)(3,cart_list); */

        //防抖
            
            clearTimeout(timeout);
                
                
            timeout = setTimeout(() => {
            
                this.cart2server(user_key,cart_list);
                
                }, 3000);
            
        }

    
    /* //防抖
    debounce(func, wait) {
        let timeout;
        return function () {
            let context = this;
            let args = arguments;
            if (timeout) {
                clearTimeout(timeout);
            };
            
            timeout = setTimeout(() => {
            
                func.apply(context, args)
                
            }, wait);
        }
    } */

    //删除
    deleteItem(gid){
        let {cart_list} = this.state;

        let user_key = localStorage.getItem("user_key");

        let {add2cart} = this.props;

        let {count_num} = this.state;

        cart_list = cart_list.filter(item=>{

           item.goods = item.goods.filter(item=>{
                if(item.isChecked){
                    count_num = count_num - item.goods_num;
                }
                return item.goods_id != gid;

           })
           /* item.isStoreChecked = false; */

            return item.goods.length != 0 ;
        })
        cart_list.map(item=>{

            item.isStoreChecked = item.goods.some(item=>{

                return item.isChecked;

           })
           
           return item

        })
        this.setState({
            ...this.state,
            count_num,
            cart_list
        });
        add2cart(cart_list);

        this.cart2server(user_key,cart_list);

    }
    //支付
    pay(){
        let {cart_list} = this.state;

        let user_key = localStorage.getItem("user_key");

        let {add2cart} = this.props;

        cart_list = cart_list.filter(item => {
            
            item.goods = item.goods.filter(item => {

                return item.isChecked != true;

            });

            item.isStoreChecked = false;

            return item.goods.length != 0 ;
        });
        
        //console.log(user_key,cart_list);

        this.setState({
            ...this.state,
            count_num : 0,
            cart_list
        })

        add2cart(cart_list);

        this.cart2server(user_key,cart_list);

        
        
    }
    //同步服务器
    async cart2server(user_key,cart_list){

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
        //console.log(data);
        
    }

    componentWillUnmount(){
        let user_key = localStorage.getItem('user_key');
        
        let {cart_list} = this.state;

        //console.log("我准备卸载了哦========",cart_list);

        this.cart2server(user_key,cart_list);
    }
    render() {
        //console.log("now",this.state);

        let { cart_list } = this.state;
        //console.log("重新渲染---",cart_list);
        
        //console.log("判断显示",this.state.requireAuth,cart_list.length,);
        

        return (
            <div className={`cont ${styles.cont}`}>
                <div className={`header ${styles.header}`}>
                    {
                        this.state.requireAuth ? (
                        <div className={styles.header_wrap}>
                            {/* <div className={styles.header_l}>
                                <a href="javascript:;">
                                    <i className={styles.back}></i>
                                </a>
                            </div> */}
                            <div className={styles.header_title}>
                                <h1>购物车 <i id="cart_mum"></i></h1>
                            </div>
                            {/* <div className={styles.header_edit}>
                                <span className={styles.edit_cart} id="edit_btn">编辑</span>
                            </div> */}
                            {/* <div className={styles.header_r}>
                                <a id="header-nav" href="javascript:void(0);">
                                    <i className={styles.more}></i>
                                    <sup></sup>
                                </a>
                            </div> */}
                        </div>) : (<div className={styles.header_wrap}>
                            <div className={styles.header_title}>
                                <h1>购物车 <i id="cart_mum"></i></h1>
                            </div>
                        </div>)
                    }                  
                </div>
                <div className={`main ${styles.main}`}>
                {
                    this.state.requireAuth ? 
                    (cart_list.length === 0 ? 
                        (<div>
                            <div className={styles.noLog}>
                                <img src={this.state.noLogImg} alt=""/>
                                <p>愿望满满，但车还是空的！</p>
                                <a href="javascript::void(0)" className="styles.btn" onClick={()=>{
                                    let {history} = this.props;
                                    history.replace('/home')
                                }}>去抢购</a>
                            </div>
                        </div>) 
                        : (<PullToRefresh
                        damping={60}
                        ref={el => this.ptr = el}
                        style={{
                        height: this.state.height,
                        overflow: 'auto',
                        }}
                        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                        direction={this.state.down ? 'down' : 'up'}
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                        this.setState({ refreshing: true });
                        setTimeout(() => {
                            this.setState({ refreshing: false });
                        }, 1000);
                        }}>
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
                                                    {/* <span>满{item.free_freight_price}元免运费 !</span> */}
                                                    <span>满88元免运费 !</span>
                                                </div>
                                            </div>
                                            {
                                                item.goods.map(item => {
                                                    return (
                                                        <List key={item.goods_id}>
                                                        <SwipeAction
                                                        style={{ backgroundColor: 'white' }}
                                                        autoClose
                                                        right={[
                                                            {
                                                            text: '删除',
                                                            onPress: () => this.deleteItem(item.goods_id),
                                                            style: { backgroundColor: '#F4333C', color: 'white' },
                                                            },
                                                        ]}
                                                        /* onOpen={() => console.log('global open')}
                                                        onClose={() => console.log('global close')} */
                                                        >
                                                        <List.Item>
                                                        <div className={styles.goods_info} key={item.goods_id}>
                                                            <div className={styles.chose}>
                                                                <input type="checkbox" checked={item.isChecked} onChange={this.handleCheck.bind(this, item.goods_id)} />
                                                            </div>
                                                            <div className={styles.goods_img} >
                                                                <a href="#">
                                                                    <img style={{width:"100%",height:"100%"}} src={item.goods_image_url} alt="" />
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
                                                        </List.Item>
                                                        </SwipeAction>
                                                        </List>
                                                    )
                                                })
                                            }
                                        </div>
                                        
                                    )
                                })
                            }
                        </div>
                        </PullToRefresh>)   
                    )
                    :(<div>
                        <div className={styles.noLog}>
                            <img src={this.state.noLogImg} alt=""/>
                            <p>愿望满满，登录后好货才能送到手中！</p>
                            <a href="javascript::void(0)" className="styles.btn" onClick={()=>{
                                let {history} = this.props;
                                history.replace('/login')
                            }}>去登录</a>
                        </div>
                    </div>)                   
                }
                
                    {
                        (this.state.requireAuth && cart_list.length !== 0 ) ? <div className={styles.goods_cart_bottom}>
                        <div className={styles.chose}>
                            <input type="checkbox" checked={this.state.isAllChecked || false} onChange={this.handleCheckAll} />
                            <span>全选</span>
                        </div>
                        <div className={styles.count}>
                            合计：
                            <span>¥{this.state.count_price.toFixed(2)}</span>
                        </div>
                        <button onClick={this.pay} className={`${styles.check_out} ${this.state.count_num ? styles.active_pay : null}`}>结算({this.state.count_num})</button>
                    </div> : ""
                    }
                    
                </div>
            </div>
        )
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
        changeQty({sid,gid,qty}){
            dispatch(changeQtyAction({sid,gid,qty}))
        },
        getAll(){
            dispatch(getAllAction({}));
        }
    }
}

Cart = connect(mapStateToProps,mapDispatchToProps)(Cart);

export default Cart;