import React,{Component} from 'react';
import styles from '../../assets/scss/mine.module.scss'
function Mine(props){
    let Authorization = localStorage.getItem("Authorization") ? localStorage.getItem("Authorization") : ""; 
    return <div className={styles.Mine}>
        <div className={styles.header}>
            <a href="" className={styles.header_a1}>
                {/* <img src={[require('../../assets/images/mine/tx.png')]} alt=""/> */}
            </a>
            {
                !Authorization ? <a href="javascript::void(0)" className={styles.header_a2} onClick={()=>{
                    let {history} = props;
                    history.push('/Login');
                }}>
                    点击登录
                </a> : 
                <a href="" className={styles.header_a2}>
                    {Authorization.slice(0,6)}
                </a>
            }
        </div>
        <div className={styles.main}>
            <div className={styles.main_t}>
                <div className={styles.main_t_1}>
                    <a href="">
                        <span>我的订单</span>
                        <i>查看全部订单</i>
                    </a>
                </div>
                <div className={styles.main_t_2}>
                    <ul className={styles.main_t_ul}>
                        <a href="">
                            <li>
                                <i className={styles.i_1}></i>
                                <p>代付款</p>
                            </li>
                        </a>
                        <a href="">
                            <li><i className={styles.i_2}></i>
                                <p>待发货</p></li>
                        </a>
                        <a href="">
                            <li><i className={styles.i_3}></i>
                                <p>待收货</p></li>
                        </a>
                        <a href="">
                            <li><i className={styles.i_4}></i>
                                <p>待评价</p></li>
                        </a>
                        <a href="">
                            <li><i className={styles.i_5}></i>
                                <p>退款/退货</p></li>
                        </a>
                    </ul>
                </div>
            </div>
            <div className={styles.main_b}>
                <div className={styles.main_b_1}>
                    <a href="">
                        <span>我的服务</span>
                    </a>
                </div>
                <div className={styles.main_b_2}>
                    <ul className={styles.main_b_ul}>
                        <a href="">
                            <li>
                                <i className={styles.ii_1}></i>
                                <p>拼团订单</p>
                            </li>
                        </a>
                        <a href="">
                            <li>
                                <i className={styles.ii_2}></i>
                                <p>代金券</p>
                            </li>
                        </a>
                        <a href="">
                            <li>
                                <i className={styles.ii_3}></i>
                                <p>礼品卡</p>
                            </li>
                        </a>
                        <a href="">
                            <li>
                                <i className={styles.ii_4}></i>
                                <p>易瓷币</p>
                            </li>
                        </a>
                        <a href="">
                            <li>
                                <i className={styles.ii_5}></i>
                                <p>我的收藏</p>
                            </li>
                        </a>
                        <a href="">
                            <li>
                                <i className={styles.ii_6}></i>
                                <p>我的足迹</p>
                            </li>
                        </a>
                        <a href="">
                            <li>
                                <i className={styles.ii_7}></i>
                                <p>地址管理</p>
                            </li>
                        </a>
                        <a href="">
                            <li>
                                <i className={styles.ii_8}></i>
                                <p>我的消息</p>
                            </li>
                        </a>
                        <a href="">
                            <li>
                                <i className={styles.ii_9}></i>
                                <p>客服与帮助</p>
                            </li>
                        </a>
                        <a href="">
                            <li>
                                <i className={styles.ii_10}></i>
                                <p>设置</p>
                            </li>
                        </a>
                    </ul>
                </div>
            </div>
        </div>
        
    </div>
}

export default Mine;