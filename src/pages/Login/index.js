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
                    <div className={styles.header}>
                    </div>
                    <div className={styles.horn}>

                    </div>
                    <div className={styles.main}>
                        
                    </div>
                    <div className={styles.wrapper} ref='wrapper'>
                    <div className={styles.mask}></div>
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