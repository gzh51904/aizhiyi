import React, { Component } from "react";
import "../assets/scss/Search.scss";
import { Input, Icon } from 'antd';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            data1: [
                {
                    id: 1,
                    title: 0 - 100
                },
                {
                    id: 2,
                    title: 100 - 300
                },
                {
                    id: 3,
                    title: 300 - 500
                },
                {
                    id: 4,
                    title: 1000 - 5000
                },
                {
                    id: 5,
                    title: 5000 - 10000
                },
                {
                    id: 6,
                    title: '10000以上'
                },

            ],
            data2: [
                {
                    id: 1,
                    title: "文创"
                },
                {
                    id: 2,
                    title: "围巾"
                },
                {
                    id: 3,
                    title: "巢蜜"
                },
                {
                    id: 4,
                    title: "蛋黄酥"
                },
                {
                    id: 5,
                    title: "汝窑瓷器"
                },
                {
                    id: 6,
                    title: "茶叶"
                },
                {
                    id: 7,
                    title: "质造"
                },
                {
                    id: 8,
                    title: "移动电源"
                },
                {
                    id: 9,
                    title: "五谷杂粮"
                },
                {
                    id: 10,
                    title: "宜兴紫砂"
                },
                {
                    id: 11,
                    title: "首饰"
                },
            ]
        }
        this.goto = this.goto.bind(this);
    }
    goto() {
        let { history } = this.props;
        history.push("/home")
    }
    render() {

        return (
            <div id="box">
                <div id="header">
                    <div className="header-wrap">
                        <div className="header-l">
                            <a href="javascript:;" onClick={this.goto}>
                                <i className="back"></i>
                            </a>
                        </div>
                        <div className="search">
                            <Icon type="search" />
                            <Input placeholder="建盏之美，在物亦在心" allowClear />

                        </div>
                        <div className="header-r search-header-r">
                            <a href="javascript:void(0);" className="search-btn">搜索</a>
                        </div>
                    </div>
                </div>
                <div id="main">
                    <div className="search-price">
                        <h3>价格区间(单位/元)</h3>
                        <ul className="clearfix">
                            <li className="active"><a href="javascript:;" lowprice="0" highprice="">全部</a></li>
                            {
                                this.state.data1.map(item => {
                                    return <li key={item.id}><a href="javascript:;" lowprice="0" highprice="">{item.title}</a></li>
                                })
                            }
                        </ul>
                        <div className="search-priceinp">
                            <input type="tel" placeholder="最低价" className="search-priceinp-low" />
                            <span></span>
                            <input type="tel" placeholder="最高价" className="search-priceinp-high" />

                        </div>
                    </div>
                    <div className="nctouch-search-layout">
                        <dl className="hot-keyword">
                            <dt>热门搜索</dt>
                            <dd id="hot_list_container"><ul>
                                {
                                    this.state.data2.map(item => {
                                        return <li key={item.id}><a href="javascript:;">{item.title}</a></li>

                                    })
                                }

                            </ul></dd>
                        </dl>
                    </div>
                </div>
            </div>
        )
    }
}
export default Search;