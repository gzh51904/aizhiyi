import React, { Component } from "react";
import { Carousel, BackTop } from 'antd';
import styles from "../../assets/scss/home.module.scss";
import "../../assets/scss/ant.css";
import '../../assets/css/common/reset.css';
import { api } from "../../utils";
import { withRouter, NavLink } from 'react-router-dom';
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
            goods_list: [],
            num: 1,     //请求数据的页数
            height: 1,  //请求回来的数据增加的滚动高度
            send: true, //请求数据的状态
            top: 0      //乘以滚动高度的数

        }
        this.goto = this.goto.bind(this);
        this.orderScroll = this.orderScroll.bind(this);


    }
    async componentWillMount() {
        // 头部请求
        // https://www.aizhiyi.com/mobile/index.php?act=index&url=https://www.aizhiyi.com/wap/index.html?goback=1
        let { data: { datas } } = await api.get("", {
            params: {
                act: "index",
                url: "https://www.aizhiyi.com/wap/index.html",
                goback: 1
            }
        })
        let adv_list = datas[0]["adv_list"]["item"];
        let free_list = datas[2]["free_list"]["item"];
        console.log(datas)
        // 商品请求
        // https://www.aizhiyi.com/mobile/index.php?act=index&op=guess_favorite&key=&curpage=1&page=14
        let res = await api.get("", {
            params: {
                act: "index",
                op: "guess_favorite",
                key: "",
                curpage: 1,
                page: 14
            }
        })
        let goods_list = res.data.datas.goods_list;
        this.setState({
            adv_list,
            free_list,
            goods_list,
            num: 2
        })
        // 无限加载
        let main = document.getElementById("main");
        if (main) {
            main.addEventListener("scroll", this.orderScroll, true)
        }
    }
    goto(id) {
        let { history } = this.props;
        history.push({
            pathname: 'goods/' + id,
        })
    }
    top() {
        let main = document.getElementById("main");
        return main
    }

    // 滚动事件
    async orderScroll() {
        let main = document.getElementById("main");

        let { num, height, send, top } = this.state;

        //console.log(main.scrollTop, 2350 + (top * height), top)
        // 判断：当滚动条到达某个地方的时候发起请求数据，height*top是请求一条数据的时候会增加的滚动条长度
        if (main.scrollTop >= 2350 + (height * top) && send) {
            // 讲send设为false，让他下次不能进来继续发请求
            this.setState({ send: false })
            // 请求数据
            let res = await api.get("", {
                params: {
                    act: "index",
                    op: "guess_favorite",
                    key: "",
                    curpage: num,
                    page: 14
                }
            })
            // 获取原数组的数据，利用a.concat（b)的方法数组合并，然后跟新新的数据
            let { goods_list } = this.state;
            let more = res.data.datas.goods_list;
            let newGoods = goods_list.concat(more);
            this.setState({
                goods_list: newGoods,
                height: 1500,
                num: num + 1,
                top: top + 1,
                send: true          //最后把状态改回为true，当滚动条到达一定距离继续发请求
            })
        }
    }




    render() {
        let { adv_list, list, free_list, goods_list } = this.state;
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
                                        <h3><img src={item.image} alt="" style={{ width: "7.5rem", height: '3.01rem' }} /></h3>
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

                            <li className={styles.one}>
                                <a href="javascript:;">
                                    <img src="https://www.aizhiyi.com/data/upload/shop/store/goods/169/2018/12/27/169_05992215531941748_240.jpg?v=15" alt="" />
                                    <span>7.4折</span>
                                </a>
                            </li>
                            <li className={styles.two}>
                                <span>8.3折</span>
                                <img src="https://www.aizhiyi.com/data/upload/shop/store/goods/215/2018/12/20/215_05986175987711570_240.jpg?v=15?v=15" alt="" />
                                <p>树枝珍珠长款耳线</p>
                                <em><i>¥</i>165.00</em>
                            </li>
                            <li className={styles.two}>
                                <span>6.7折</span>
                                <img src="https://www.aizhiyi.com/data/upload/shop/store/goods/223/2018/12/15/223_05981851196430978_240.jpg?v=15?v=15" alt="" />
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