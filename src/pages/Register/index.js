import React, { Component } from 'react';
import styles from '../../assets/scss/register.module.scss'
import '../../assets/css/common/reset.css';
import '../../assets/scss/register.css'
import { api } from '../../utils/index.js';
import ReactDOM from 'react-dom';
// import { register } from '../../serviceWorker';
// import { Form,Input,Button } from 'element-react';
// import 'element-theme-default';


class Register extends Component {
    constructor() {
        super();

        this.state = {
            keyWord: '',
            passWord: '',
            checkPass: '',
            code: '',
            massage: '',
            keyWordSwitch: false,
            passWordSwitch: false,
            codeSwitch: false,
            massageSwitch: false,
        }
        this.telOnBlur = this.telOnBlur.bind(this);
        this.telChange = this.telChange.bind(this);
        this.passWordChange = this.passWordChange.bind(this);
        this.checkPassChange = this.checkPassChange.bind(this);
        this.removeMask = this.removeMask.bind(this);
        this.getCode = this.getCode.bind(this);
    }

    telChange(e) {
        this.setState({
            keyWord: e.target.value,
        })
    }
    passWordChange(e) {
        this.setState({
            passWord: e.target.value
        })
    }
    checkPassChange(e) {
        this.setState({
            checkPass: e.target.value
        })
    }
    getCode(e) {
        let code = this.state.code;
        this.setState({
            code: e.target.value
        })
        if (code) {
            //code按钮颜色问题
            this.refs.code.style.opacity = '1'
        } else {
            this.refs.code.style.opacity = '0.4'
        }
    }
    getMsg(e) {
        let massage = this.state.massage;
        this.setState({
            massage: e.target.value
        })
    }

    //   号码失去焦点验证
    telOnBlur() {
        // let {keyWordSwitch}=this.state
        let regExp4Phone = new RegExp("^[1][3-9]\\d{9}");
        let keyWord = this.state.keyWord;
        if (keyWord) {
            if (regExp4Phone.test(keyWord)) {
                this.setState({
                    keyWordSwitch: true
                })
            } else {
                this.refs.dialogText.innerHTML = '手机号格式错误'
                this.refs.wrapper.style.display = 'block'
                this.setState({
                    keyWordSwitch: false
                })
            }
        } else {
            this.refs.dialogText.innerHTML = '手机号不能为空'
            this.refs.wrapper.style.display = 'block'
        }
    }

    checkPassOnBlur() {
        let passWord = this.state.passWord;
        let checkPass = this.state.checkPass;
        if (passWord == checkPass) {
            this.setState({
                passWordSwitch: true
            })
        } else {
            this.refs.dialogText.innerHTML = '密码不一致，请重新输入'
            this.refs.wrapper.style.display = 'block'
            this.setState({
                passWordSwitch: false
            })
        }
    }

    codeOnBlur() {
        let code = this.state.code;
        if (code) {
            this.setState({
                codeSwitch: true
            })
        } else {
            this.refs.dialogText.innerHTML = '验证码不能为空'
            this.refs.wrapper.style.display = 'block'
            this.setState({
                codeSwitch: false
            })
        }
    }

    massageOnBlur() {
        let massage = this.state.massage;

        if (massage) {
            this.setState({
                massageSwitch: true
            })
        } else {
            this.refs.dialogText.innerHTML = '短信验证码不能为空'
            this.refs.wrapper.style.display = 'block'
            this.setState({
                massageSwitch: false
            })
        }
    }

    allOnBlur() {
        if (this.state.keyWordSwitch
            && this.state.codeSwitch
            && this.state.massageSwitch
            && this.state.passWordSwitch) {
            this.refs.massage.style.opacity = '1'
        } else {
            this.refs.massage.style.opacity = '0.4'
        }
    }
    //确认发送
    async confirm() {
        let username = this.state.keyWord;
        let password = this.state.passWord;
        let {data} = await api.getData('/reg/check',{
            params:{
            username,
            password
            }        
         })
         if (data.code === 1000) {
            console.log(1111);
            
          }else{
            this.refs.wrapper.style.display='block';
            this.refs.dialogText.innerHTML='该号码已被注册';
          }

    }
    componentDidUpdate() {
        this.allOnBlur()
    }
    //   删除遮罩层
    removeMask() {
        this.refs.wrapper.style.display = 'none';
        this.refs.dialogText.innerHTML = ''
    }

    render() {
        console.log(this.state.keyWordSwitch);
        return (<div className={styles.Register}>
            <div className={[`${styles.header}`, `clearfix`].join(' ')}>
                <div className={styles.header_l}>
                    <a href="">
                        <i></i>
                    </a>
                    <span>注册</span>
                </div>
            </div>
            <div className={styles.main}>
                <form action="">
                    <ul className={styles.formBox}>
                        <li className={styles.item}>
                            <input type="text" placeholder='请输入手机号'
                                value={this.state.keyWord}
                                onChange={this.telChange.bind(this)}
                                onBlur={this.telOnBlur.bind(this)} />
                        </li>
                        <li className={styles.item}>
                            <input type="password" placeholder='设置密码 (6-20位英文字母或数字)'
                                value={this.state.passWord}
                                onChange={this.passWordChange.bind(this)}
                            />
                        </li>
                        <li className={styles.item}>
                            <input type="password" placeholder='请再次输入密码'
                                value={this.state.checkPass}
                                onChange={this.checkPassChange.bind(this)}
                                onBlur={this.checkPassOnBlur.bind(this)} />
                        </li>
                        <li className={styles.item}>
                            <input type="text" placeholder='输入4位验证码'
                                value={this.state.code}
                                onChange={this.getCode.bind(this)}
                                onBlur={this.codeOnBlur.bind(this)}
                            />
                            <img src={[require('../../assets/images/register/four.png')]} alt="" />
                        </li>
                        <li className={styles.item}>
                            <input type="text" placeholder='输入短信验证码'
                                value={this.state.massage}
                                onChange={this.getMsg.bind(this)}
                                onBlur={this.massageOnBlur.bind(this)}
                            />
                            <div className={styles.btnGet} ref="code">获取验证码</div>
                        </li>
                    </ul>
                    <div className={styles.btn}>
                        <a href="javascript:void(0)" className={styles.btn_1} ref="massage" onClick={this.confirm.bind(this)}>确认注册</a>
                    </div>
                    <div className={styles.readme}>
                        <input type="checkbox" />
                        <label type="checkbox">阅读并同意</label>
                        <span>《服务协议》《隐私协议》</span>
                    </div>
                </form>
            </div>
            {/* 遮罩层 */}
            <div className={styles.wrapper} ref='wrapper'>
                <div className={styles.mask}></div>
                <div className={styles.dialog}>
                    <span ref='dialogText'></span>
                    <a href="javascript:void(0)" onClick={this.removeMask.bind(this)}>
                        <i>确定</i>
                    </a>
                </div>
            </div>
        </div>
        )
    }

}
export default Register