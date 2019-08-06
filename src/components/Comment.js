import React, { Component } from "react";
import "../assets/scss/Comment.scss";
import { api } from "../utils";
class Comment extends Component {
    constructor() {
        super();
        this.state = {
            goods_eval_list: [],
            count_info: [],
            num: 1,     //请求数据的页数
            height: 1,  //请求回来的数据增加的滚动高度
            send: true, //请求数据的状态
            top: 0      //乘以滚动高度的数


        }
        this.orderScroll = this.orderScroll.bind(this);
    }
    async componentWillMount() {
        let len = window.location.href.split("/").length
        let id = window.location.href.split("/")[len - 1]
        // console.log(id)
        // 头部请求
        let { num } = this.state;
        //https://www.aizhiyi.com/mobile/index.php?act=goods&op=goods_evaluate&goods_id=109251&type=&curpage=1&page=10
        let { data } = await api.get("", {
            params: {
                act: "goods",
                op: "goods_evaluate",
                goods_id: id,
                type: "",
                curpage: num,
                page: 10
            }
        });

        let { goods_eval_list, count_info } = data.datas;
        this.setState({
            goods_eval_list,
            count_info
        })
        // console.log(goods_eval_list, count_info)
        // 无限加载
        let main = document.getElementsByClassName("top")[0]
        if (main) {
            main.addEventListener("scroll", this.orderScroll, true)
        }
        // console.log(main)
    }

    // 滚动事件
    async orderScroll() {
        let main = document.getElementsByClassName("top")[0]

        let { num, height, send, top } = this.state;
        let len = window.location.href.split("/").length
        let id = window.location.href.split("/")[len - 1]
        // console.log(main.scrollTop, main)

        // console.log(main.scrollTop, 2370 + (top * height), top)
        // 判断：当滚动条到达某个地方的时候发起请求数据，height*top是请求一条数据的时候会增加的滚动条长度
        if (main.scrollTop >= 2370 + (height * top) && send) {
            // 讲send设为false，让他下次不能进来继续发请求
            this.setState({ send: false })
            // 请求数据
            // https://www.aizhiyi.com/mobile/index.php?act=goods&op=goods_evaluate&goods_id=109251&type=&curpage=1&page=10
            let res = await api.get("", {
                params: {
                    act: "goods",
                    op: "goods_evaluate",
                    goods_id: id,
                    type: "",
                    curpage: num,
                    page: 10
                }
            })
            // console.log(res)
            // 获取原数组的数据，利用a.concat（b)的方法数组合并，然后跟新新的数据
            // let { goods_list } = this.state;
            // let more = res.data.datas.goods_list;
            // let newGoods = goods_list.concat(more);
            this.setState({
                // goods_list: newGoods,
                height: 1500,
                num: num + 1,
                top: top + 1,
                send: true          //最后把状态改回为true，当滚动条到达一定距离继续发请求
            })
        }
    }

    render() {
        let { goods_eval_list, count_info } = this.state;
        return (
            <div className="top">
                <div className="nctouch-tag-nav">
                    <ul>
                        <li className="selected"><a href="javascript:void(0);" data-state="">全部<p id="allcnt">{count_info.all}</p></a></li>
                        <li><a href="javascript:void(0);" data-state="1">好评<p id="goodcnt">{count_info.good}</p></a></li>
                        <li><a href="javascript:void(0);" data-state="2">中评<p id="normalcnt">{count_info.normal}</p></a></li>
                        <li><a href="javascript:void(0);" data-state="3">差评<p id="badcnt">{count_info.bad}</p></a></li>
                        <li><a href="javascript:void(0);" data-state="4">晒图<p id="piccnt">{count_info.pic}</p></a></li>
                    </ul>
                </div>
                <div id="product_evaluation_html" className="product-eval-list">
                    <ul>
                        {
                            goods_eval_list.map(item => {
                                return (
                                    <li key={item.geval_addtime}>
                                        <div className="eval-user">	<span className="user-name">{item.geval_frommembername}</span>
                                            <time>2017.11.12</time>
                                        </div>		<div className="goods-raty">
                                            <i className="active"></i>
                                            <i className="active"></i>
                                            <i className="active"></i>
                                            <i className="active"></i>
                                            <i className="active"></i>
                                        </div>
                                        <dl className="eval-con">
                                            <dt>{item.geval_content}</dt>
                                        </dl>
                                    </li>
                                )
                            })
                        }

                    </ul>
                </div>
            </div>
        )
    }
}
export default Comment;