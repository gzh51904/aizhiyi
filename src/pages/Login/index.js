import React, { Component } from 'react';
import styles from '../../assets/scss/login.module.scss'
import '../../assets/css/common/reset.css';
import {api} from '../../utils/index.js';
import ReactDOM from 'react-dom';

class Login extends Component{
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (<div className={styles.Login}>
                    <div className={[`${styles.header}`,`clearfix`].join(' ')}>
                        <div className={styles.header_l}>
                            <a href="">
                                <i></i>
                            </a>
                            <span>账号登录</span>
                        </div>
                    </div>
                    <div className={styles.horn}>
                        <div className={styles.horn_img}></div>
                        <h3>新用户注册立送160元大礼包</h3>
                    </div>
                    <div className={styles.main}>
                        <div className={styles.portrait}>
                            <span></span>
                        </div>
                        <form action="">
                            <ul className={styles.formBox}>
                                <li className={styles.item}>
                                    <i className={styles.telIcon}></i>
                                    <input type="text" placeholder='请输入手机号'/>
                                </li>
                                <li className={styles.item}>
                                    <i className={styles.passIcon}></i>
                                    <input type="password" placeholder='请输入密码'/>
                                    <i className={styles.eyeIcon}></i>
                                </li>
                            </ul>
                            <div className={styles.forgetPass}>
                                <a href="">
                                    手机快速注册
                                </a>
                                <a href="">
                                    忘记密码
                                </a>
                            </div>
                            <div className={styles.btn}>
                                <a href="javascript:void(0)" className={styles.btn_1} ref="massage" >登录</a>
                            </div>
                        </form>
                        <div className={styles.company}>
                            <div className={styles.company_line}>
                                <h2>
                                    <span>合作账号登录</span>
                                </h2>
                            </div>
                            <div className={styles.company_item}>
                                <a href="" className={styles.company_qq}></a>
                                <a href="" className={styles.company_weibo}></a>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.wrapper} ref='wrapper'>
                        <div className={styles.mask}>
                        </div>
                        <div className={styles.dialog}>
                            <span ref='dialogText'></span>
                        {/* <a href="javascript:void(0)" onClick={this.removeMask.bind(this)}> */}
                                <a href="javascript:void(0)">
                                    <i>确定</i>
                                </a>
                        </div>
                    </div>
                </div>)
    }
}
export default Login