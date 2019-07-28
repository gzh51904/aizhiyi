import React, { Component } from "react";
import { api } from "../utils";
import "../assets/scss/deta.css";
import Recommend from "./Recommend"
class Details extends Component {
    constructor() {
        super();
        this.state = {
            data: ""
        }
    }
    async componentWillMount() {
        let len = window.location.href.split("/").length
        let id = window.location.href.split("/")[len - 1]
        console.log(id)
        // 头部请求
        //https://www.aizhiyi.com/mobile/index.php?act=goods&op=goods_body&goods_id=107781
        let { data } = await api.get("", {
            params: {
                act: "goods",
                op: "goods_body",
                goods_id: id,
            }
        });
        this.setState({
            data
        })
        // console.log(data)
    }
    render() {
        let { data } = this.state
        return (
            <div>
                <div dangerouslySetInnerHTML={{ __html: data }}></div>
                <Recommend></Recommend>
            </div>
        )
    }
}
export default Details;