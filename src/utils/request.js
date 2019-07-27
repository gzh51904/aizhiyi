import axios from 'axios';

// 基本配置：
//全局默认路径
axios.defaults.baseURL = 'http://localhost:1906/';

let instance = axios.create({
    baseURL: 'https://www.aizhiyi.com/mobile/index.php',
    //baseURL:'http://localhost:1906/',
});

//请求敌人服务器
export function get(url='',params={}){
    return instance.get(url,params)
}

export function post(url='',data={},params={}){
    return instance.post(url,data,params)
}


//请求自己的node服务器
export function getData(url='',params={}){
    return axios.get(url,params);
}

export function postData(url='',data={},params={}){
    return axios.post(url,data,params);
}



export default {
    get,
    post,
    getData,
    postData
}

