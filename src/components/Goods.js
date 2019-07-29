import React, { Component } from 'react';
import styles from "../assets/scss/goods.module.scss";
import "../assets/scss/ant.css";
import '../assets/css/common/reset.css';
import { Tabs, Badge } from 'antd-mobile';
import Commodity from "./Commodity";
import Details from "./Details";
import Comment from "./Comment";

class Goods extends Component {
    constructor() {
        super();
        this.state = {

        }
        this.goto = this.goto.bind(this)
    }
    goto() {
        let { history } = this.props;
        history.push("/home")
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
                        <a href="javascript:void(0);" className={styles.add_cart}>加入购物车</a>
                    </div>
                </div>
            </div >)

    }
}
export default Goods;