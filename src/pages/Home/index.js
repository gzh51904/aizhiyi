import React, { Component } from "react";
import { Carousel, BackTop } from 'antd';
import styles from "../../assets/scss/home.module.scss";
import "../../assets/scss/ant.css";
import '../../assets/css/common/reset.css';
import { api } from "../../utils";
import { withRouter } from 'react-router-dom';
class Home extends Component {
    constructor() {
        super();
        this.state = {
            adv_list: [],
            list: [
                {
                    id: 1,
                    url: require("../../assets/images/home/z182.png"),
                    name: "传统工艺"
                },
                {
                    id: 2,
                    url: require("../../assets/images/home/z183.png"),
                    name: "民俗文化"
                },
                {
                    id: 3,
                    url: require("../../assets/images/home/z184.png"),
                    name: "茶艺茶道"
                },
                {
                    id: 4,
                    url: require("../../assets/images/home/z185.png"),
                    name: "特产美食"
                },
                {
                    id: 5,
                    url: require("../../assets/images/home/z186.png"),
                    name: "文化创意"
                },
                {
                    id: 6,
                    url: require("../../assets/images/home/z187.png"),
                    name: "个性定制"
                },
                {
                    id: 7,
                    url: require("../../assets/images/home/z188.png"),
                    name: "专馆基地"
                },
                {
                    id: 8,
                    url: require("../../assets/images/home/z189.png"),
                    name: "珠宝首饰"
                },
            ],
            free_list: [],
            hug_list: [],
            goods_list: [],
            test: () => { }

        }
        this.goto = this.goto.bind(this);

    }
    async componentWillMount() {
        // 头部请求
        // https://www.aizhiyi.com/mobile/index.php?act=index&url=https://www.aizhiyi.com/wap/index.html
        let { data: { datas } } = await api.get("", {
            params: {
                act: "index",
                url: "https://www.aizhiyi.com/wap/index.html"
            }
        })
        let adv_list = datas[0]["adv_list"]["item"];
        let free_list = datas[2]["free_list"]["item"];
        let hug_list = datas[4]["groupbuy_hug_list"]["item"];
        // 商品请求
        // https://www.aizhiyi.com/mobile/index.php?act=index&op=guess_favorite&key=&curpage=1&page=28
        let res = await api.get("", {
            params: {
                act: "index",
                op: "guess_favorite",
                key: "",
                curpage: 1,
                page: 28
            }
        })
        // console.log(res.data.datas.goods_list)
        let goods_list = res.data.datas.goods_list;
        this.setState({
            adv_list,
            free_list,
            hug_list,
            goods_list
        })
    }
    goto(id) {
        let { history } = this.props;
        history.push({
            pathname: 'goods/' + id,
            search: "?id=" + id
        })
    }
    top() {
        let main = document.getElementById("main");
        return main
    }




    render() {
        let { adv_list, list, free_list, hug_list, goods_list } = this.state;
        let one = hug_list.splice(0, 1);
        let two = hug_list.splice(-2)
        let com1 = require("../../assets/images/home/common1.png");
        let com2 = require("../../assets/images/home/common2.jpg");
        let com3 = require("../../assets/images/home/common3.jpg");
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
                <div className={styles.main} id="main">
                    <BackTop target={this.top} visibilityHeight='1200'>
                        <div className="ant-back-top-inner">
                            <div className={styles.top}>
                                <a href="javascript:;" className={styles.scroll_top}> <i></i></a>
                            </div>
                        </div>
                    </BackTop>
                    <div style={{ position: "relative", marginTop: ".86667rem" }}>
                        <Carousel autoplay>
                            {
                                adv_list.map(item => {
                                    return <div key={item.data}>
                                        <h3><img src={item.image} alt="" /></h3>
                                    </div>
                                })
                            }
                        </Carousel>
                        <div className={styles.slideBox_bj}></div>
                    </div>
                    <div className={styles.menu_list}>
                        <ul className={` ${styles.category_index} clearfix`} >
                            {
                                list.map(item => {
                                    return (
                                        <li key={item.id}>
                                            <a className={styles.menu_icon} href="javascript:0;">
                                                <img src={item.url} alt="" className={styles.icon_cloth} />
                                                <span>{item.name}</span>
                                            </a>
                                        </li>
                                    )
                                })

                            }

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
                                    {
                                        free_list.map(item => {
                                            return (
                                                <li key={item.goodsId} onClick={this.goto.bind(this, item.goodsId)}>
                                                    <a href="javascript:;">
                                                        <i><label>{item.freeInviteNum}</label></i>
                                                        <img src={item.image} alt="" />
                                                        <p className={styles.name}>{item.goodsName}</p>
                                                        <p className={styles.p2}><label>￥0</label><del>原价&nbsp;¥&nbsp;{item.goodsPrice}</del></p>
                                                    </a>
                                                </li>
                                            )
                                        })
                                    }

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
                            {
                                one.map(item => {
                                    return (
                                        <li className={styles.one} key={item.goods_id2}>
                                            <a href="javascript:;">
                                                <img src={item.goods_image} alt="" />
                                                <span>{item.groupbuy_rebate5}</span>
                                            </a>
                                        </li>
                                    )
                                })
                            }
                            {
                                two.map(item => {
                                    return (
                                        <li className={styles.two} key={item.goods_id2}>
                                            <span>{item.groupbuy_rebate5}折</span>
                                            <img src={item.goods_image} alt="" />
                                            <p>{item.goods_name}</p>
                                            <em><i>¥</i>{item.groupbuy_price5}</em>

                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className={styles.mid_recommend}>
                        <img src={com3} />
                    </div>
                    <div className={`${styles.culture_con}  guess_contain`}>
                        <header className={styles.goods_type}> <span>精品推荐</span> </header>
                    </div>
                    <ul className={`${styles.perfect_recom} clearfix"`} id="guess_main">
                        {
                            goods_list.map(item => {
                                return (
                                    <li key={item.goods_id} onClick={this.goto.bind(this, item.goods_id)}>
                                        <a href="javascript:0;">
                                            <img src={item.goods_image} alt="" />
                                        </a>
                                        <h2>{item.goods_name}</h2>
                                        <div className={`${styles.bottom} clearfix`}>
                                            <span><dfn>¥</dfn>{item.goods_promotion_price}</span>
                                            <font>销量: {item.goods_salenum}</font>
                                            <a className={styles.tosimilar} href="javascript:0;">看相似<span></span></a>
                                        </div>

                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>)
    }
}
Home = withRouter(Home)
export default Home;