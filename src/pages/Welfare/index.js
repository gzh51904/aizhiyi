import React, { Component } from 'react';
import { api } from '../../utils/index.js';
import '../../assets/css/common/reset.css';
import styles from '../../assets/scss/welfare.module.scss'
import '../../assets/scss/welfare.css'
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';

const tabs = [
    { title: <Badge >0元抢购</Badge> },
    { title: <Badge >拼团</Badge> },
    { title: <Badge >限时购</Badge> },
];

const TabExample = () => (
    <div>
        <Tabs tabs={tabs}
            initialPage={0}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
            <div className={styles.content1} style={{ display: 'flex', justifyContent: 'center', height: '100%', backgroundColor: '#fff', }}>
                <div className={styles.topPic}>
                    <img src={[require('../../assets/images/welfare/z200.jpg')]} alt="" />
                </div>
                <ul className={styles.goodsList}>
                    <li className={styles.goods}>
                        <a href="">
                            <span className={styles.imgBorder}>
                                <img src={[require('../../assets/images/welfare/154_05779100685899708_240.jpg')]} alt="" />
                            </span>
                            <div className={styles.goodsRight}>
                                <h2>东北有机秋木耳</h2>
                                <p className={styles.p_1}>邀请199位好友，立即领取</p>
                                <i className={styles.i_1}>787人已领</i>
                                <div className={styles.div_1}>
                                    <i>￥0</i>
                                    <del>￥59.90</del>
                                    <span>活动结束</span>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li className={styles.goods}>
                        <a href="">
                            <span className={styles.imgBorder}>
                                <img src={[require('../../assets/images/welfare/154_05779100685899708_240.jpg')]} alt="" />
                            </span>
                            <div className={styles.goodsRight}>
                                <h2>东北有机秋木耳</h2>
                                <p className={styles.p_1}>邀请199位好友，立即领取</p>
                                <i className={styles.i_1}>787人已领</i>
                                <div className={styles.div_1}>
                                    <i>￥0</i>
                                    <del>￥59.90</del>
                                    <span>活动结束</span>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                Content of second tab
        </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                Content of third tab
        </div>
        </Tabs>
    </div>
);

class Welfare extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    callback(key) {
        console.log(key);
    }

    render() {
        return (<div className={styles.Welfare}>
            <div className={styles.header}>
                <span>会员福利</span>
                <div className={styles.header_right}>
                    <a href="javascript:void(0);">
                        <i className={styles.more}></i>
                    </a>
                </div>
            </div>
            <div className={styles.main} >
                <TabExample />
            </div>
        </div>)
    }
}

export default Welfare;