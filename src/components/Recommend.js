import React, { Component } from "react";
import styles from "../assets/scss/recommend.module.scss";
import { api } from "../utils";
import { withRouter } from 'react-router-dom';
class Recommend extends Component {
    constructor() {
        super();
        this.state = {
            goods: [],
            news: []
        }
    }
    async componentWillMount() {
        let id = this.props.match.params.id
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
        console.log(datas)
        let goods = datas.guessFavoriteGoods;
        let news = datas.goodsCommendNew;
        this.setState({
            goods,
            news
        })

    }
    render() {
        let { goods, news } = this.state
        return (
            <div>
                <div className={`${styles.goods_detail_recom} culture_con`}>
                    <div className={`${styles.goods_detail_head} title goods_type`}>
                        <span>为您推荐</span>
                    </div>
                    <ul className={`${styles.perfect_recom} clearfix`}>
                        {
                            goods.map(item => {
                                return (
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
                                )
                            })
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
                                )
                            })
                        }

                    </ul>
                    <a href="javascript:;" className={styles.guessLike_btn}>换一批</a>
                </div>
            </div>
        )
    }
}
Recommend = withRouter(Recommend)
export default Recommend;