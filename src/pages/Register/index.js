import React, { Component } from 'react';
import styles from '../../assets/scss/register.module.scss'
import '../../assets/css/common/reset.css';
import '../../assets/scss/register.css'
import {api} from '../../utils/index.js';
import ReactDOM from 'react-dom';
import { Form,Input,Button } from 'element-react';
import 'element-theme-default';


class Register extends Component{
    constructor(props) {
        super(props);
      
        this.state = {
          form: {
            pass: '',
            checkPass: '',
            age: ''
          }
        //   rules: {
        //     pass: [
        //       { required: true, message: '', trigger: 'blur' },
        //       { validator: (rule, value, callback) => {
        //         if (value === '') {
        //           callback(new Error(''));
        //         } else {
        //           if (this.state.form.checkPass !== '') {
        //             this.refs.form.validateField('checkPass');
        //           }
        //           callback();
        //         }
        //       } }
        //     ],
        //     checkPass: [
        //       { required: true, message: '', trigger: 'blur' },
        //       { validator: (rule, value, callback) => {
        //         if (value === '') {
        //           callback(new Error(''));
        //         } else if (value !== this.state.form.pass) {
        //           callback(new Error(''));
        //         } else {
        //           callback();
        //         }
        //       } }
        //     ],
        //     age: [
        //       { required: true, message: '请填写年龄', trigger: 'blur' },
        //       { validator: (rule, value, callback) => {
        //         var age = parseInt(value, 10);
      
        //         setTimeout(() => {
        //           if (!Number.isInteger(age)) {
        //             callback(new Error(''));
        //           } else{
        //             if (age < 18) {
        //               callback(new Error(''));
        //             } else {
        //               callback();
        //             }
        //           }
        //         }, 1000);
        //       }, trigger: 'change' }
        //     ]
        //   }
        // };
      }
    }
      
    //   handleSubmit(e) {
    //     e.preventDefault();
      
    //     this.refs.form.validate((valid) => {
    //       if (valid) {
    //         alert('submit!');
    //       } else {
    //         console.log('error submit!!');
    //         return false;
    //       }
    //     });
    //   }
      
    //   handleReset(e) {
    //     e.preventDefault();
      
    //     this.refs.form.resetFields();
    //   }
      
    //   onChange(key, value) {
    //     this.setState({
    //       form: Object.assign({}, this.state.form, { [key]: value })
    //     });
    //   }
      
      render() {
        return (<div className={styles.Register}>
                    <div className={styles.header}>
                    </div>
                    <div className={styles.main}>
                        <form action="">
                            <ul className={styles.formbox}>
                                <li className={styles.item}>
                                    <input type="text" placeholder='请输入手机号'/>                                
                                </li>
                                <li className={styles.item}>
                                    <input type="text" placeholder='设置密码 (6-20位英文字母或数字)'/>                                
                                </li>
                                <li className={styles.item}>
                                    <input type="text" placeholder='请再次输入密码'/>                                
                                </li>
                                <li className={styles.item}>
                                    <input type="text" placeholder='输入4位验证码'/>                                
                                </li>
                                <li className={styles.item}>
                                    <input type="text" placeholder='输入短信验证码'/>                                
                                </li>
                            </ul>
                            <div className={styles.btn}>
                                <a href="" className={styles.btn_1}>确认注册</a>
                            </div>
                            <div className={styles.readme}>
                                <input type="checkbox" checked/>
                                <label for="checkbox">阅读并同意</label>
                                <span>《服务协议》《隐私协议》</span>
                            </div>
                        </form>
                    </div>
                </div>



                
        // <div className={styles.Register}>
        //     <div className={styles.header}>
        //     </div>
        //     <div className={styles.main}>
        //         <Form ref="form"
        //          model={this.state.form} 
        //          rules={this.state.rules} 
        //          labelWidth="100" 
        //          className="demo-ruleForm"
        //           inline='ture'
                  
        //          >
        //             <Form.Item  prop="pass" className='input1'>
        //                 <Input  value={this.state.form.pass} onChange={this.onChange.bind(this, 'pass')} autoComplete="off" />
        //             </Form.Item>
        //             <Form.Item  prop="checkPass">
        //                 <Input type="password" value={this.state.form.Pass} onChange={this.onChange.bind(this, 'checkPass')} autoComplete="off" />
        //             </Form.Item>
        //             <Form.Item  prop="checkPass">
        //                 <Input type="password" value={this.state.form.checkPass} onChange={this.onChange.bind(this, 'checkPass')} autoComplete="off" />
        //             </Form.Item>
        //             <Form.Item  prop="age">
        //                 <Input value={this.state.form.age} onChange={this.onChange.bind(this, 'age')}></Input>
        //             </Form.Item>
        //             <Form.Item>
        //                 <Button className='regsure' type="primary" onClick={this.handleSubmit.bind(this)}>提交</Button>
        //                 {/* <Button onClick={this.handleReset.bind(this)}>重置</Button> */}
        //             </Form.Item>
        //         </Form>
        //     </div>
        // </div>
                )
      }
    
}
export default Register