import React, { Component } from 'react';
import styles from '../../assets/scss/login.module.scss'
import '../../assets/css/common/reset.css';
import {api} from '../../utils/index.js';
import ReactDOM from 'react-dom';

class Login extends Component{
    constructor() {
        super();
        this.state = {
            tel:'',
            pass:'',
            telSwitch:false,
            passSwitch:false,
        }
        this.telChange=this.telChange.bind(this)
        this.telOnblur=this.telOnblur.bind(this)
    }
    telChange(e){
        this.setState({
            tel:e.target.value
        })

    }
    passChange(e){
        this.setState({
            pass:e.target.value
        })
    }
    passOnblur(){
        let pass = this.state.pass;
        if(pass){
            this.setState({
                passSwitch:true
            })
            this.allOnBlur()
        }else{
            this.refs.dialogText.innerHTML='密码不能为空'
            this.refs.wrapper.style.display='block'
            this.setState({
                passSwitch:false
            })
        }
    }
    telOnblur(){
        let regExp4Phone = new RegExp("^[1][3-9]\\d{9}");
        let tel = this.state.tel;
        if(tel){
            if(regExp4Phone.test(tel)){
                this.setState({
                    telSwitch:true
                })
                this.allOnBlur()
            }else{
                this.refs.dialogText.innerHTML='手机号格式错误'
                this.refs.wrapper.style.display='block'
                this.setState({
                    telSwitch:false
                })
            }
        }else{
            this.refs.dialogText.innerHTML='手机号不能为空'
            this.refs.wrapper.style.display='block'
        }
    }

    allOnBlur(){
        if(this.state.telSwitch
            && this.state.passSwitch)
            {
                this.refs.massage.style.opacity='1'
            }else{
            this.refs.massage.style.opacity='0.4'
            }
    }

    eyeOpen(){
        this.refs.eyeOpen.style.display='none'
        this.refs.eyeClose.style.display='block'
        this.refs.password.type='text'
    }
    eyeClose(){
        this.refs.eyeClose.style.display='none'
        this.refs.eyeOpen.style.display='block'
        this.refs.password.type='password'
    }
    removeMask(){
        this.refs.wrapper.style.display='none';
        this.refs.dialogText.innerHTML=''
    }
    async confirm(){
        let username = this.state.tel;
        let password = this.state.pass;
        await api.get('',{
            params:{
            username,
            password
            }        
         })

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
                                    <input type="text" placeholder='请输入手机号'
                                    value={this.state.tel}
                                    onChange={this.telChange.bind(this)}
                                    onBlur={this.telOnblur.bind(this)}
                                    />
                                </li>
                                <li className={styles.item}>
                                    <i className={styles.passIcon}></i>
                                    <input type="password" placeholder='请输入密码'
                                    value={this.state.pass}
                                    onChange={this.passChange.bind(this)}
                                    onBlur={this.passOnblur.bind(this)}
                                    ref='password'
                                    />
                                    <i className={styles.eyeOpen} ref='eyeOpen' onClick={this.eyeOpen.bind(this)}></i>
                                    <i className={styles.eyeClose} ref='eyeClose' onClick={this.eyeClose.bind(this)}></i>
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
                                <a href="javascript:void(0)" className={styles.btn_1} ref="massage" onClick={this.confirm.bind(this)}>登录</a>
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
                                <a href="javascript:void(0)" onClick={this.removeMask.bind(this)}>
                                    <i>确定</i>
                                </a>
                        </div>
                    </div>
                </div>)
    }
}
export default Login