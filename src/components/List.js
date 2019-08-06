import React, { Component } from "react";
import "../assets/scss/list.scss";
import { api } from "../utils";
import { BackTop } from 'antd';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            current1: true,
            current2: false,
            current3: false,
            goods_list: [],
            show: true,
            num: 1,     //请求数据的页数
            height: 1,  //请求回来的数据增加的滚动高度
            send: true, //请求数据的状态
            top: 0      //乘以滚动高度的数

        }
        this.goto = this.goto.bind(this);
        this.search = this.search.bind(this);
        this.lei = this.lei.bind(this);
        this.orderScroll = this.orderScroll.bind(this);
        this.goods = this.goods.bind(this);

    }
    goods(id) {
        let { history } = this.props;
        history.push("/goods/" + id)
    }
    goto() {
        let { history } = this.props;
        history.goBack()
    }
    search() {
        let { history } = this.props;
        history.push("/search")
    }
    top() {
        let main = document.getElementById("main");
        return main
    }
    async componentWillMount() {
        let id = this.props.match.params.id;
        // act=goods&op=goods_list&gc_id=1378&inSimilar=yes&page=10&curpage=1&gc_id=1378&key=
        let { data: { datas } } = await api.get("", {
            params: {
                act: "goods",
                op: "goods_list",
                gc_id: id,
                inSimilar: 'yes',
                page: 10,
                curpage: 1,
                key: ""
            }

        });

        let { goods_list } = datas
        // console.log(goods_list)
        this.setState({
            goods_list,
            num: 2
        })
        // console.log("生命周期", goods_list)
        let main = document.getElementById("main")
        main.addEventListener("scroll", this.orderScroll, true)

    }
    // 滚动事件
    async orderScroll() {
        let main = document.getElementById("main");
        let { num, height, send, top } = this.state;
        let id = this.props.match.params.id;
        // console.log(main.scrollTop, 650 + (top * height), top)
        // 判断：当滚动条到达某个地方的时候发起请求数据，height*top是请求一条数据的时候会增加的滚动条长度
        if (main.scrollTop >= 650 + (height * top) && send) {
            // 讲send设为false，让他下次不能进来继续发请求
            this.setState({ send: false })
            // 请求数据
            let res = await api.get("", {
                params: {
                    act: "goods",
                    op: "goods_list",
                    gc_id: id,
                    inSimilar: 'yes',
                    page: 10,
                    curpage: num,
                    key: ""
                }
            })
            // 获取原数组的数据，利用a.concat（b)的方法数组合并，然后跟新新的数据
            let { goods_list } = this.state;
            let more = res.data.datas.goods_list;
            let newGoods = goods_list.concat(more);
            this.setState({
                goods_list: newGoods,
                height: 1100,
                num: num + 1,
                top: top + 1,
                send: true          //最后把状态改回为true，当滚动条到达一定距离继续发请求
            })
            // console.log("滚动事件", goods_list, "新数据", newGoods)

        }
    }

    async lei(idx) {
        // console.log(idx)
        let main = document.getElementById("main");
        let id = this.props.match.params.id;
        let { num } = this.state;
        if (idx === 1) {
            //act=goods&op=goods_list&gc_id=1378&inSimilar=yes&page=10&curpage=1&gc_id=1378
            let { data: { datas } } = await api.get("", {
                params: {
                    act: "goods",
                    op: "goods_list",
                    gc_id: id,
                    inSimilar: 'yes',
                    page: 10 * (num - 1),       //看它下拉几次请几条
                    curpage: 1,

                }
            });
            let { goods_list } = datas;
            main.scrollTop = 0
            this.setState({
                current1: true,
                current2: false,
                current3: false,
                goods_list
            })
            // console.log("综合", goods_list)
        } else if (idx === 2) {

            //act=goods&op=goods_list&gc_id=1378&inSimilar=yes&page=10&curpage=1&gc_id=1378&key=1&order=2

            let { data: { datas } } = await api.get("", {
                params: {
                    act: "goods",
                    op: "goods_list",
                    gc_id: id,
                    inSimilar: 'yes',
                    page: 10 * (num - 1),       //看它下拉几次请几条
                    curpage: 1,
                    key: 1,
                    order: 2

                }

            });
            main.scrollTop = 0

            let { goods_list } = datas;
            // console.log(goods_list, this.state.num)
            this.setState({
                current1: false,
                current2: true,
                current3: false,
                goods_list
            })
            // console.log("销售", goods_list)
            // console.log(goods_list, this.state.num)
        } else if (idx === 3) {
            if (this.state.show) {
                // console.log("sheng")
                let { data: { datas } } = await api.get("", {
                    params: {
                        act: "goods",
                        op: "goods_list",
                        gc_id: id,
                        inSimilar: 'yes',
                        page: 10 * (num - 1),       //看它下拉几次请几条
                        curpage: 1,
                        key: 3,
                        order: 1

                    }

                });
                main.scrollTop = 0

                let { goods_list } = datas;
                // console.log(goods_list)
                this.setState({
                    goods_list,
                })
                // console.log("升序", goods_list)
            } else {
                // console.log("jiang")
                let { data: { datas } } = await api.get("", {
                    params: {
                        act: "goods",
                        op: "goods_list",
                        gc_id: id,
                        inSimilar: 'yes',
                        page: 10 * (num - 1),       //看它下拉几次请几条
                        curpage: 1,
                        key: 3,
                        order: 2

                    }

                });
                main.scrollTop = 0

                let { goods_list } = datas;
                // console.log(goods_list)
                this.setState({
                    goods_list,

                })
                // console.log("降序", goods_list)
            }
            this.setState({
                current1: false,
                current2: false,
                current3: true,
                show: !this.state.show
            })


        }
    }

    render() {
        let { goods_list } = this.state;
        return (

            <div id="box">
                {/* 放回顶部 */}
                <BackTop target={this.top} visibilityHeight='1200'>
                    <div className="ant-back-top-inner">
                        <div className='top'>
                            <a href="javascript:void(0)" className='scroll_top'> <i></i></a>
                        </div>
                    </div>
                </BackTop>
                <div id="header">
                    <div className="header">
                        <a className="nav_logo" href="javascript:void(0)" onClick={this.goto}></a>
                        <a className="header_inp" href="javascript:void(0)" onClick={this.search}>
                            <div className="search_cont">
                                <i className="icon"></i>
                                <span className="search_input">文化创意，玩转生活</span>
                            </div>
                        </a>
                        <span className="comehere">  <span><i></i> </span></span>
                    </div>
                </div>
                <div id="main" className="clearfix">
                    <div className="goods-search-list-nav">
                        <ul id="nav_ul">
                            <li onClick={this.lei.bind(this, 1)}><span className={this.state.current1 ? "current" : ""} id="sort_default">综合</span></li>
                            <li onClick={this.lei.bind(this, 2)}><span className={this.state.current2 ? "current" : ""} >销量</span></li>
                            <li onClick={this.lei.bind(this, 3)}><span className={this.state.current3 ? "current" : ""} id="sort_saleprice">价格</span></li>
                        </ul>

                        <span className="shop-cart"></span>
                        <div className="browse-mode"><span id="show_style"><span className="browse-list"></span></span></div>
                    </div>
                    <ul className="goods-secrch-list clearfix">
                        {
                            goods_list.map((item,idx) => {
                                return <li className="goods-item" key={item.goods_id+idx+"y"} onClick={this.goods.bind(this, item.goods_id)}>
                                    <span className="goods-pic">
                                        <span>
                                            <img src={item.goods_image_url} alt="" className="img-lazyload" />
                                        </span>
                                    </span>
                                    <dl className="goods-info">
                                        <dt className="goods-name">
                                            <span>
                                                <h4>{item.goods_name}</h4>
                                            </span>
                                        </dt>
                                        <dd className="goods-sale">
                                            <span>
                                                <span className="goods-price"><i>￥</i><em>{item.goods_price}</em>
                                                </span>
                                                <span>
                                                </span>
                                            </span>
                                        </dd>
                                        <p className="por-fk"><span>{item.goods_salenum}</span>人已付款</p>
                                        <div className="join-cart"></div>
                                    </dl>
                                </li>
                            })
                        }


                    </ul>
                </div>
            </div>
        )
    }
}
export default Search;