import React, { Component } from 'react';
import { api } from '../../utils/index.js';
import '../../assets/css/common/reset.css';
import styles from '../../assets/scss/welfare.module.scss'
import '../../assets/scss/welfare.css'
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
// import { BackTop } from 'antd';

const tabs = [
    { title: <Badge >0元抢购</Badge> },
    { title: <Badge >拼团</Badge> },
    { title: <Badge >限时购</Badge> },
  ];
  class Welfare extends Component{
    constructor(){
        super();
        this.state={
            goodsList:[],
            group_list:[],
            hot_goods:'',
            new_goods:'',
            goods_list:[],
            goodsId:'',
        }
    }
    callback(key) {
        console.log(key);
      }
    // group_buy&op=group_buy_hug&key=
    async componentWillMount(){  
        let {data} = await api.get('',{
                params:{
                    act:'free_buy',
                    key:'',
                    curpage:'1',
                    page:'10'
                }
            })
            let {goodsList} = data.datas;
            let {goodsId} =goodsList[0]
        let {data:{datas:{group_list}}} = await api.get('',{
            params:{
                act:'group_buy',
                key:'',
                op:'group_buy_hug',
            }
        })
        let {data:{datas:{hot_goods,new_goods,goods_list}}} = await api.get('',{
            params:{
                act:'promotion',
                key:'',
            }
        })
        console.log("============================",goodsList);
        
        this.setState({
            goodsList,
            group_list,
            hot_goods,
            new_goods,
            goods_list,
            goodsId
        })
        
        // console.log(hot_goods,
        //     new_goods,
        //     goods_list);
        console.log("============================",this.state);
    } 
    goto(id){
        let {history} = this.props;
        // console.log(this.props)
        history.push('/goods/'+id)
    }
    render(){
        //console.log(this.state.goodsList.length);
        if(this.state.goodsList.length>0){
        this.state.goodsList.map(item=>{
            // console.log(item.goodsName.match(/(\S*)(_||"")/));
            return item;
        })
    }
    return(<div className={styles.Welfare}>
                <div className={styles.header}>
                    <span>会员福利</span>
                    <div className={styles.header_right}>
                        <a href="javascript:void(0);">
                            <i className={styles.more}></i>
                        </a>
                    </div>
                </div>
                <div className={styles.main} id="welfare">  
                    <div>
                        <Tabs tabs={tabs}
                            initialPage={0}
                            // onChange={(tab, index) => { console.log('onChange', index, tab); }}
                            // onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                        >
                            <div className={styles.content1} style={{ display: 'flex', justifyContent: 'center', height: '100%', backgroundColor: '#fff',}}>
                                <div className={styles.topPic}>
                                    <img src={[require('../../assets/images/welfare/z200.jpg')]} alt=""/>
                                </div>
                                <ul className={styles.goodsList}>
                                    {
                                        this.state.goodsList.map(item=>{
                                            return <li className={styles.goods} key={item.goodsId} onClick={this.goto.bind(this,item.goodsId)}>
                                            <a href="javascript:void(0)">
                                                <span className={styles.imgBorder}>
                                                    <img src={item.image} alt=""/>
                                                </span>
                                                <div className={styles.goodsRight}>
                                                    {/* <h2>{item.goodsName.match(/(\S*)_/)[1]}</h2> */}
                                                    <h2>{item.goodsName.match(/(\S*)(_||"")/)[1]}</h2>
                                                    <p className={styles.p_1}>邀请{item.freeInviteNum}位好友，立即领取</p>
                                                    <i className={styles.i_1}>{item.goodsFicSalenum}人已领</i>
                                                    <div className={styles.div_1}>
                                                        <i>￥0</i>
                                                        <del>￥{item.goodsPrice}</del>
                                                        <span>活动结束</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        })
                                    }                           
                                </ul>
                            </div>
                            
                            <div className={styles.content1} style={{ display: 'flex',  justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
                                <div className={styles.topPic}>
                                    <img src={[require('../../assets/images/welfare/z202.jpg')]} alt=""/>
                                </div>
                                <ul className={styles.goodsList}>
                                    {
                                        this.state.group_list.map(item=>{
                                            return <li className={styles.goods} key={item.goods_commonid2}>
                                            <a href="javascript:void(0)">
                                                <span className={styles.imgBorder}>
                                                    <img src={item.goods_image} alt=""/>
                                                </span>
                                                <div className={styles.goodsRight}>
                                                    <h2>{item.groupbuy_name2}</h2>
                                                    <p className={styles.p_1}>邀请好友，共享拼团福利</p>
                                                    <i className={styles.i_1}>{item.sale_fic_count}人已团</i>
                                                    <div className={styles.div_1}>
                                                        <i>￥{item.groupbuy_price5}</i>
                                                        <del>￥{item.goods_price}</del>
                                                        <span className={styles.groupColor}>去拼团</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        })
                                    }                           
                                </ul>
                            </div>
                            <div className={styles.content1} style={{ display: 'flex',  justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
                            <div className={styles.topPic}>
                                    <img src={[require('../../assets/images/welfare/bg_limittime.jpg')]} alt=""/>
                            </div>
                            <ul className={styles.goodsList}>
                                {/* hotgoods */}
                                <li className={styles.goods}>
                                    <a href="javascript:void(0)">
                                        <span className={styles.imgBorder}>
                                            <img src={this.state.hot_goods.image_url_240} alt=""/>
                                        </span>
                                        <div className={styles.goodsRight}>
                                            <h2>{this.state.hot_goods.goods_name}</h2>
                                            <p className={styles.p_1}>邀请好友，共享拼团福利</p>
                                            <i className={styles.i_1}>已购买{this.state.hot_goods.goods_fic_salenum}件</i>
                                            <div className={styles.div_1}>
                                                <i>￥{this.state.hot_goods.xianshi_price}</i>
                                                <del>￥{this.state.hot_goods.goods_price}</del>
                                                <span className={styles.groupColor}>去抢购</span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                {/* newgoods */}
                                
                                <li className={styles.goods}>
                                    <a href="">
                                        <span className={styles.imgBorder}>
                                            <img src={this.state.new_goods.image_url_240} alt=""/>
                                        </span>
                                        <div className={styles.goodsRight}>
                                            <h2>{this.state.new_goods.goods_name}</h2>
                                            <p className={styles.p_1}>邀请好友，共享拼团福利</p>
                                            <i className={styles.i_1}>已购买{this.state.new_goods.goods_fic_salenum}件</i>
                                            <div className={styles.div_1}>
                                                <i>￥{this.state.new_goods.xianshi_price}</i>
                                                <del>￥{this.state.new_goods.goods_price}</del>
                                                <span className={styles.groupColor}>去抢购</span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                {
                                    this.state.goods_list.map(item=>{
                                        return <li className={styles.goods} key={item.goods_commonid}>
                                                    <a href="">
                                                        <span className={styles.imgBorder}>
                                                            <img src={item.image_url_240} alt=""/>
                                                        </span>
                                                        <div className={styles.goodsRight}>
                                                            <h2>{item.goods_name}</h2>
                                                            <p className={styles.p_1}>邀请好友，共享拼团福利</p>
                                                            <i className={styles.i_1}>已购买{item.goods_fic_salenum}件</i>
                                                            <div className={styles.div_1}>
                                                                <i>￥{item.xianshi_price}</i>
                                                                <del>￥{item.goods_price}</del>
                                                                <span className={styles.groupColor}>去抢购</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                            })
                                }                   
                            </ul>
                            </div>
                        </Tabs>           
                    </div>
                </div>
          </div>)
}
}

export default Welfare;