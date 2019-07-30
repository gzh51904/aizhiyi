import React, { Component } from "react";
import { Carousel, WingBlank } from 'antd-mobile';
import styles from "../assets/scss/commodity.module.scss";
import "../assets/scss/dity.css";
import Recommend from "./Recommend";
import { api } from "../utils";
import { withRouter } from 'react-router-dom';
class Commodity extends Component {
    constructor() {
        super();
        this.state = {
            banner: [],
            goods_info: {},
            arr: [],
            eval_list: [],
            store: [],
            id: 109243

        }
    }
    async componentWillMount() {
        let id = this.props.match.params.id
        this.setState({
            id
        })
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
        // console.log(datas)
        let arr = [];
        let spec = datas.goods_info.goods_spec;
        for (let i in spec) {
            arr.push(spec[i])
        }
        let banner = datas.goods_image.split(",");
        let goods_info = datas.goods_info;
        let eval_list = datas.goods_eval_list;
        let store = datas.store_info;
        this.setState({
            banner,
            goods_info,
            arr,
            eval_list,
            store
        })
        console.log("刷新", this.props)
    }
    async componentDidUpdate(nextProps, nextState) {
        let len = window.location.href.split("/").length
        let id2 = window.location.href.split("/")[len - 1]
        let id = nextProps.match.params.id;
        if (id2 != id) {
            this.setState({
                id
            })
            let id3 = this.props.match.params.id
            let { data: { datas } } = await api.get("", {
                params: {
                    act: "goods",
                    op: "goods_detail",
                    key: null,
                    goods_id: id3,
                    num: 3

                }
            })
            // console.log(datas)
            let arr = [];
            let spec = datas.goods_info.goods_spec;
            for (let i in spec) {
                arr.push(spec[i])
            }
            let banner = datas.goods_image.split(",");
            let goods_info = datas.goods_info;
            let eval_list = datas.goods_eval_list;
            let store = datas.store_info;
            this.setState({
                banner,
                goods_info,
                arr,
                eval_list,
                store
            })
            console.log('切换成功', this.props)
        }
    }




    render() {

        let { banner, goods_info, arr, eval_list, store } = this.state;
        return (
            <div>
                <div className={styles.open_app}>打开APP</div>
                <WingBlank>
                    <Carousel autoplay={true} infinite swipeSpeed='2000' style={{ width: '7.5rem', height: '7.5rem' }}>
                        {banner.map(val => (
                            <img
                                key={val}
                                src={val}
                                alt=""
                                style={{ width: '7.5rem', verticalAlign: 'top', height: '7.5rem' }}
                            />
                        ))}
                    </Carousel>
                </WingBlank>
                <div className={styles.goods_detail_cnt}>
                    <div className={styles.goods_detail_name}>
                        <dl>
                            <dt>
                                <i className={styles.baoyou_icon}>包邮</i>
                                {goods_info.goods_name}
                            </dt>
                            <dd>{goods_info.goods_jingle}</dd>
                        </dl>
                    </div>
                    <div className={styles.goods_detail_price}>
                        <dt>
                            <div className="fl">￥<em>{goods_info.goods_price}</em></div>
                            <div className={`${styles.discount_test} fl`} ></div>
                        </dt>
                    </div>
                    <div className={styles.shipp}>
                        <div className={`${styles.goods_detail_item} active candi`}>
                            <span className="fl">包邮</span>
                            <span className="fr">{goods_info.area_name}</span>
                            <span className={styles.sold}>销量&nbsp;:&nbsp;&nbsp;{goods_info.goods_salenum}</span>
                        </div>
                    </div>
                    <div className={`${styles.goods_detail_item} notop`} id={styles.goods_spec_selected}>
                        <div className={styles.itme_name}>已选</div>
                        <div className={styles.item_con}>
                            <dl className={styles.goods_detail_sel}><dt><span>
                                <em>{arr[0]}</em></span>
                                <span><em>{arr[1]}</em></span>
                            </dt>
                            </dl>
                        </div>
                        <div className={`${styles.item_more} item_more_m`}></div>
                    </div>
                    <div className={styles.fuwu}>
                        <span>服务</span>
                        <i className={styles.fuwu_icon1}></i>
                        <label>正品保证</label>
                        <i className={styles.fuwu_icon1}></i>
                        <label>原产地直选</label>
                        <i className={styles.fuwu_icon1}></i>
                        <label>7天无理由退货</label>
                    </div>
                    <div className={styles.goods_detail_comment}>
                        <div className={styles.title}>
                            <a id={styles.goodsEvaluation1} href="javascript:void(0);">商品评价
                            <span className={styles.rate_num}>（{goods_info.evaluation_count}）</span>
                                <span className={styles.rate}>好评
                            <em>100%</em>
                                </span>
                                <div className={styles.item_more}></div></a></div>
                        <div className={styles.comment_info}>
                            {
                                eval_list.map(item => {
                                    return (
                                        <dl key={item.geval_addtime}>
                                            <dt>
                                                <div className={styles.goods_raty}>
                                                    <i className={styles.active}></i>
                                                    <i className={styles.active}></i>
                                                    <i className={styles.active}></i>
                                                    <i className={styles.active}></i>
                                                    <i className={styles.active}></i>
                                                </div>
                                                <time></time>
                                                <span className={styles.user_name}>{item.geval_frommembername}</span>
                                            </dt>
                                            <dt>{item.geval_content}</dt>
                                        </dl>
                                    )
                                })
                            }

                        </div>
                    </div>
                    <div className={styles.goods_detail_store}>
                        <div className={styles.store_name}>
                            <img src={store.store_avatar} className={styles.storeImg} alt="" />
                            <div className={styles.store_name_p}>{store.store_name}<p>{store.store_brief_intro}</p></div>
                        </div>
                        <div className={styles.store_rate}>
                            <span><em>208</em>全部商品
                        </span>
                            <span><em>185</em>新上商品
                        </span>
                            <span><em>5280</em>店铺收藏
                        </span>
                        </div>
                        <div className={`${styles.connect_we} clearfix`}>
                            <a href="javascript:;"> <i></i> <span>收藏店铺</span></a>
                            <a href="javascript:;" className={styles.go_store}> <i></i> <span>进入店铺</span></a>
                        </div>
                    </div>
                    <Recommend />
                    <div className={styles.goods_detail_bottom}><a href="javascript:void(0);">点击查看详情</a></div>
                </div>
            </div>
        )
    }
}
Commodity = withRouter(Commodity)
export default Commodity;

// export default (props) => <Commodity {...props} key={props.match.params.id}/>