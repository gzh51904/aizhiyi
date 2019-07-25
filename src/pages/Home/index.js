import React, { Component } from "react";
import { Carousel } from 'antd';
import styles from "../../assets/css/scss/home.module.scss";
import "../../assets/css/scss/ant.css";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            data: [
                { title: 1 },
                { title: 2 },
                { title: 3 },
                { title: 4 }

            ]
        }
    }

    render() {
        let imgUrl = require("../../assets/img/home/z189.png");
        let com1 = require("../../assets/img/home/common1.png");
        let com2 = require("../../assets/img/home/common2.jpg");
        let com3 = require("../../assets/img/home/common3.jpg");
        return (
            <div className={styles.cont}>
                <div className={styles.header}>
                    <a className={styles.nav_logo} href="javascript:0;"></a>
                    <a className={styles.header_inp} href="javascript:0;">
                        <div className={styles.search_cont}>
                            <i className={styles.icon}></i>
                            <span className={styles.search_input}>文化创意，玩转生活</span>
                        </div>
                    </a>
                    <span className={styles.comehere}>  <a href="javascript:0;"><i></i> </a></span>
                </div>
                <div className={styles.main}>
                    <div style={{ position: "relative", marginTop: ".86667rem" }}>
                        <Carousel autoplay>
                            {
                                this.state.data.map(item => {
                                    return <div>
                                        <h3><img src="https://www.aizhiyi.com/data/upload/shop/store/goods/154/2018/08/02/154_05865382951143284_240.jpg?v=15" alt="" /></h3>
                                    </div>
                                })
                            }
                        </Carousel>
                        <div className={styles.slideBox_bj}></div>
                    </div>
                    <div className={styles.menu_list}>
                        <ul className={` ${styles.category_index} clearfix`} >
                            <li >
                                <a className={styles.menu_icon} href="javascript:0;">
                                    <img src={imgUrl} alt="" className={styles.icon_cloth} />
                                    <span>特产美食</span>
                                </a>
                            </li>
                            <li>
                                <a className={styles.menu_icon} href="javascript:0;">
                                    <img src={imgUrl} alt="" className={styles.icon_cloth} />
                                    <span>特产美食</span>
                                </a>
                            </li>
                            <li>
                                <a className={styles.menu_icon} href="javascript:0;">
                                    <img src={imgUrl} alt="" className={styles.icon_cloth} />
                                    <span>特产美食</span>
                                </a>
                            </li>
                            <li>
                                <a className={styles.menu_icon} href="javascript:0;">
                                    <img src={imgUrl} alt="" className={styles.icon_cloth} />
                                    <span>特产美食</span>
                                </a>
                            </li>
                            <li>
                                <a className={styles.menu_icon} href="javascript:0;">
                                    <img src={imgUrl} alt="" className={styles.icon_cloth} />
                                    <span>特产美食</span>
                                </a>
                            </li>
                            <li>
                                <a className={styles.menu_icon} href="javascript:0;">
                                    <img src={imgUrl} alt="" className={styles.icon_cloth} />
                                    <span>特产美食</span>
                                </a>
                            </li>
                            <li>
                                <a className={styles.menu_icon} href="javascript:0;">
                                    <img src={imgUrl} alt="" className={styles.icon_cloth} />
                                    <span>特产美食</span>
                                </a>
                            </li>
                            <li>
                                <a className="menu_icon" href="javascript:0;">
                                    <img src={imgUrl} alt="" className={styles.icon_cloth} />
                                    <span>特产美食</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.mid_recommend}>
                        <img src={com1} />
                    </div>
                    <div className={styles.yuan}>
                        <div className={`${styles.yuan_top} free`}>
                            <i className={styles.one}></i>
                            <span className={styles.one}>0元抢购</span>
                            <span className={styles.three}>免费包邮</span>
                            <i className={styles.two}></i>
                        </div>
                    </div>
                    <div className={styles.active_con}>
                        <div className={styles.wrap}>
                            <div className={styles.frame}>
                                <ul className={styles.clearfix} >
                                    <li>
                                        <a href="javascript:;">
                                            <i><label>211人</label></i>
                                            <img src="https://www.aizhiyi.com/data/upload/shop/store/goods/154/2018/08/02/154_05865382951143284_240.jpg?v=15" />
                                            <p className={styles.name}>金虫草蛹虫草花</p>
                                            <p className={styles.p2}><label>￥0</label><del>原价&nbsp;¥&nbsp;59.00</del></p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i><label>211人</label></i>
                                            <img src="https://www.aizhiyi.com/data/upload/shop/store/goods/154/2018/08/02/154_05865382951143284_240.jpg?v=15" />
                                            <p className={styles.name}>金虫草蛹虫草花</p>
                                            <p className={styles.p2}><label>￥0</label><del>原价&nbsp;¥&nbsp;59.00</del></p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i><label>211人</label></i>
                                            <img src="https://www.aizhiyi.com/data/upload/shop/store/goods/154/2018/08/02/154_05865382951143284_240.jpg?v=15" />
                                            <p className={styles.name}>金虫草蛹虫草花</p>
                                            <p className={styles.p2}><label>￥0</label><del>原价&nbsp;¥&nbsp;59.00</del></p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i><label>211人</label></i>
                                            <img src="https://www.aizhiyi.com/data/upload/shop/store/goods/154/2018/08/02/154_05865382951143284_240.jpg?v=15" />
                                            <p className={styles.name}>金虫草蛹虫草花</p>
                                            <p className={styles.p2}><label>￥0</label><del>原价&nbsp;¥&nbsp;59.00</del></p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i><label>211人</label></i>
                                            <img src="https://www.aizhiyi.com/data/upload/shop/store/goods/154/2018/08/02/154_05865382951143284_240.jpg?v=15" />
                                            <p className={styles.name}>金虫草蛹虫草花</p>
                                            <p className={styles.p2}><label>￥0</label><del>原价&nbsp;¥&nbsp;59.00</del></p>
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={styles.mid_recommend}>
                        <img src={com2} />
                    </div>
                    <div className={styles.love_group}>
                        <div className={styles.love_groupTop}>
                            <i className={styles.one}></i>
                            <i className={styles.two}></i>
                            <a href="javascript:;" className={styles.three}></a>
                            <span className={styles.one}>拼团</span>
                            <span className={styles.two}>享超低折扣</span>
                        </div>
                    </div>
                    <div className={styles.love_groupList}>
                        <ul className={styles.clearfix}>
                            <li className={styles.one}>
                                <a href="javascript:;">
                                    <img src="https://www.aizhiyi.com/data/upload/shop/store/goods/169/2018/12/27/169_05992215531941748_240.jpg?v=15?v=15" />
                                    <span>7.4折</span>
                                </a>
                            </li>
                            <li className={styles.two}>
                                <span>8.3折</span>
                                <img src="https://www.aizhiyi.com/data/upload/shop/store/goods/215/2018/12/20/215_05986175987711570_240.jpg?v=15?v=15" />
                                <p>树枝珍珠长款耳线</p>
                                <em><i>¥</i>165.00</em>

                            </li>
                            <li className={styles.two}>
                                <span>6.7折</span>
                                <img src="https://www.aizhiyi.com/data/upload/shop/store/goods/223/2018/12/15/223_05981851196430978_240.jpg?v=15?v=15" />
                                <p>大果紫檀吉祥梳</p>
                                <em><i>¥</i>66.00</em>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.mid_recommend}>
                        <img src={com3} />
                    </div>
                    <div className={`${styles.culture_con}  guess_contain`}>
                        <header className={styles.goods_type}> <span>精品推荐</span> </header>
                    </div>
                    <ul className={`${styles.perfect_recom} clearfix"`} id="guess_main">
                        <li>
                            <a href="javascript:0;">
                                <img src="https://www.aizhiyi.com/data/upload/shop/store/goods/183/2018/08/11/183_05873227531317585_240.jpg?v=15" alt="" />
                            </a>
                            <h2>北部湾烤海鸭蛋</h2>
                            <div className={`${styles.bottom} clearfix`}>
                                <span><dfn>¥</dfn>69.00</span>
                                <font>销量: 1831</font>
                                <a className={styles.tosimilar} href="javascript:0;">看相似<span></span></a>
                            </div>

                        </li>
                        <li>
                            <a href="javascript:0;"> <img src="https://www.aizhiyi.com/data/upload/shop/store/goods/183/2018/08/11/183_05873227531317585_240.jpg?v=15" /></a>
                            <h2>北部湾烤海鸭蛋</h2>
                            <div className={`${styles.bottom} clearfix`}>
                                <span><dfn>¥</dfn>69.00</span>
                                <font>销量: 1831</font>
                                <a className={styles.tosimilar} href="javascript:0;">看相似<span></span></a>
                            </div>

                        </li>
                        <li>
                            <a href="javascript:0;"> <img src="https://www.aizhiyi.com/data/upload/shop/store/goods/183/2018/08/11/183_05873227531317585_240.jpg?v=15" /></a>
                            <h2>北部湾烤海鸭蛋</h2>
                            <div className={`${styles.bottom} clearfix`}>
                                <span><dfn>¥</dfn>69.00</span>
                                <font>销量: 1831</font>
                                <a className={styles.tosimilar} href="javascript:0;">看相似<span></span></a>
                            </div>
                        </li>
                    </ul >
                </div >
                <div className={styles.footer}></div>
            </div >)
    }
}

export default Home;