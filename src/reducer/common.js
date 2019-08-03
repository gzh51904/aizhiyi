/**
 * 购物车Reducer
 */
import {LOGIN_APP} from '../actions/commonActions';

// 初始化state
let initState = {
    loginStatus:false,
}

// Reducer: 纯函数，接收state和action，返回一个新的state
let reducer = (state=initState,action)=>{

    switch(action.type){
        // store.dispath({type:'add_to_cart',payload:{id,name,price}})
        case LOGIN_APP:
            return {
                ...state,
                loginStatus:[action.payload.loginStatus]
            }
        default:
            return state;
    }
}

export default reducer;