import React,{Component}from 'react';
import styles from '../../assets/scss/sort.module.scss'
// import '../../assets/'
import '../../assets/css/common/reset.css';
import {Menu,Icon,} from 'antd';
class Sort extends Component{
    constructor(){
        super();
        this.state={
            data:[]
        }
    }
    handleClick = e => {
        console.log('click ', e);

        console.log(e);
        
        this.setState({
          current: e.key,
        });
      };
    render(){
        // let  imgurl = require('../../assets/img/sort/nav1.jpg')
        return <div className={styles.cont}>
            <div className={styles.header}>
                <span>分类</span>
                <div className={styles.header_right}>
                    <a href="javascript:void(0);">
                        <i className={styles.more}></i>
                    </a>
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.nav}>
                    <ul>
                        <a href="javascript:void(0);">
                            <li>专馆基地</li>
                        </a>
                        <a href="javascript:void(0);">
                            <li>活动专区</li>
                        </a>
                        <a href="javascript:void(0);">
                            <li>民族工艺</li>
                        </a>
                        <a href="javascript:void(0);">
                            <li>民俗文化</li>
                        </a>
                        <a href="javascript:void(0);">
                            <li>茶艺茶道</li>
                        </a>
                        <a href="javascript:void(0);">
                            <li>特产美食</li>
                        </a>
                        <a href="javascript:void(0);">
                            <li>珠宝首饰</li>
                        </a>
                        <a href="javascript:void(0);">
                            <li>文化创意</li>
                        </a>
                        <a href="javascript:void(0);">
                            <li>个性定制</li>
                        </a>
                        <a href="javascript:void(0);">
                            <li>鲜花速递</li>
                        </a>
                        <a href="javascript:void(0);">
                            <li>富硒之家</li>
                        </a>
                        <a href="javascript:void(0);">
                            <li>活动专区</li>
                        </a>
                    </ul>
                </div>
                <div className={styles.nav_main}>
                    <div className={styles.nav_main_top}>
                        <a href="">
                        <img src={[require('../../assets/img/sort/nav1.jpg')]} alt=""/>
                        </a>
                    </div>

                    <dl className={styles.nav_main_bottom}>
                        <dt>
                            <a href="">
                                <img src={[require('../../assets/img/sort/bgwhile.png')]} alt=""/>
                                <span>热门专馆</span>
                            </a>
                        </dt>
                        <dd>
                            <a href="">
                                {/* <img src="" alt=""/> */}
                                <div></div>
                                <p>文创生活馆</p>
                            </a>
                        </dd>
                        <dd>
                            <a href="">
                                {/* <img src="" alt=""/> */}
                                <div></div>
                                <p>文创生活馆</p>
                            </a>
                        </dd>
                        <dd>
                            <a href="">
                                {/* <img src="" alt=""/> */}
                                <div></div>
                                <p>文创生活馆</p>
                            </a>
                        </dd>
                    </dl>
                </div>
            </div>
            <div className={styles.footer}></div>
        </div>
    }
}

export default Sort
