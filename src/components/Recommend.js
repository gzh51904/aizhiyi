import React, { Component } from "react";
import styles from "../assets/scss/recommend.module.scss";
import { api } from "../utils";
import { withRouter, NavLink } from 'react-router-dom';
class Recommend extends Component {
    constructor() {
        super();
        this.state = {
            goods: [],
            news: [],
            id: 109243
        }

        this.huan = this.huan.bind(this);
    }
    async componentWillMount() {
        let goodsid = this.props.match.params.id
        this.setState({
            id: goodsid
        })
        let { id } = this.state;
        // 头部请求
        // https://www.aizhiyi.com/mobile/index.php?act=goods&op=goods_detail&key=null&goods_id=107781&num=3
        let { data: { datas } } = await api.get("", {
            params: {
                act: "goods",
                op: "goods_detail",
                key: null,
                goods_id: id,
                num: 3

            }
        })
        let goods = datas.guessFavoriteGoods;
        let news = datas.goodsCommendNew;
        // console.log("goods:", goods)
        this.setState({
            goods,
            news
        });

    }
    async componentDidUpdate(nextProps, nextState) {
        let len = window.location.href.split("/").length
        let id2 = window.location.href.split("/")[len - 1]
        let id = nextProps.match.params.id;
        // console.log(nextState.id, "id", id, "id2", id2)
        if (id2 != id) {
            let { data: { datas } } = await api.get("", {
                params: {
                    act: "goods",
                    op: "goods_detail",
                    key: null,
                    goods_id: id,
                    num: 3

                }
            })
            // console.log(datas)
            let goods = datas.guessFavoriteGoods;
            let news = datas.goodsCommendNew;
            console.log("goods2:", goods)
            this.setState({
                goods,
                news,
                id
            });
            // console.log("id", id, "id2", id2)
        }
    }
    // shouldComponentUpdate(nextProps, nextState) {
    // console.log(nextProps, nextState, this.state.id)
    //     if (this.state.id) {
    //         return false
    //     }
    // }
    // 详情页

    // 换一批
    async huan(id) {
        // https://www.aizhiyi.com/mobile/index.php?act=goods&op=guessFavorite&key=&storeId=200&goodsId=109243
        let { data: { datas } } = await api.get("", {
            params: {
                act: "goods",
                op: "guessFavorite",
                key: "",
                storeId: 200,
                goods_Id: id,
            }
        })
        // console.log(datas)
        let news = datas.guessFavoriteGoods;
        this.setState({
            news: news
        })
    }




    render() {
        let { goods, news } = this.state;
        let id = this.props.match.params.id;
        // console.log("goods", goods)

        return (
            <div>
                <div className={`${styles.goods_detail_recom} culture_con`}>
                    <div className={`${styles.goods_detail_head} title goods_type`}>
                        <span>为您推荐</span>
                    </div>
                    <ul className={`${styles.perfect_recom} clearfix`}>
                        {
                            goods ? goods.map(item => {
                                return (
                                    <NavLink key={'/goods/' + item.goods_id} to={'/goods/' + item.goods_id}>
                                        <li key={item.goods_id}>
                                            <div>
                                                <div className={styles.pic}><img src={item.goods_image} alt="" /></div>
                                                <dl className={styles.dl}>
                                                    <dt>{item.goods_name}</dt>
                                                    <dd className={styles.goods_intro}>{item.goods_jingle}</dd>
                                                    <dd className={styles.goods_pri}>￥<em>{item.goods_promotion_price}</em></dd>
                                                </dl>
                                            </div>
                                            <div className={styles.join_cart}></div>
                                        </li>
                                    </NavLink>
                                )
                            })
                                : ""
                        }

                    </ul>
                </div>
                <div className={`${styles.goods_detail_recom} culture_con`}>
                    <div className={`${styles.goods_detail_head} title goods_type`}>
                        <span>猜您喜欢</span>
                    </div>
                    <ul className={`${styles.perfect_recom} clearfix`}>
                        {
                            news.map(item => {
                                return (
                                    <NavLink href="javascript:void(0);" key={'/goods/' + item.goods_id} to={'/goods/' + item.goods_id}>
                                        <li key={item.goods_id}>
                                            <div>
                                                <div className={styles.pic}><img src={item.goods_image} alt="" /></div>
                                                <dl className={styles.dl}>
                                                    <dt>{item.goods_name}</dt>
                                                    <dd className={styles.goods_intro}>{item.goods_jingle}</dd>
                                                    <dd className={styles.goods_pri}>￥<em>{item.goods_promotion_price}</em></dd>
                                                </dl>
                                            </div>
                                            <div className={styles.join_cart}></div>
                                        </li>
                                    </NavLink>
                                )
                            })
                        }

                    </ul>
                    <a href="javascript:;" className={styles.guessLike_btn} onClick={this.huan.bind(this, id)}>换一批</a>
                </div>
            </div>
        )
    }
}
Recommend = withRouter(Recommend)
export default Recommend;