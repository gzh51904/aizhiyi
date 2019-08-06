/**
 * 购物车Reducer
 */
import {ADD_TO_CART,REMOVE_FROM_CART,CHANGE_GOODS_QTY,GET_ALL_CART} from '../actions/cartActions';
import { log } from 'util';

// 初始化state
let initState = {
    navStatus:false,
    cart_list:[]
}

// Reducer: 纯函数，接收state和action，返回一个新的state
let reducer = (state=initState,action)=>{

    switch(action.type){
        // store.dispath({type:'add_to_cart',payload:{id,name,price}})
        case ADD_TO_CART:
            return {
                ...state,
                cart_list:action.payload
            }
        
        // store.dispath({type:'remove_from_cart',payload:id})
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart_list:state.cart_list.filter(item=>item.id!==action.payload)
            }

        // store.dispath({type:'change_goods_qty',payload:{id,qty}})
        case CHANGE_GOODS_QTY:
            // console.log(action.payload);
            
            let cart_list = state.cart_list.map(item=>{
                if(item.sid == action.payload.store_id){
                    item.goods.map(item=>{
                        
                        if(item.goods_id == action.payload.gid){
                            item.goods_num = action.payload.qty
                        } 
                        return item;
                    })
                }
                return item;
            }) 
            return {
                ...state,
                cart_list
            }

        //
        case GET_ALL_CART:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default reducer;