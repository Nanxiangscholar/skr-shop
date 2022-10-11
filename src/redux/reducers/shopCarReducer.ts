import {
    ADD_SHOP_TO_SHOP_CART,
    GET_SHOP_CAR,
    DEL_SHOP_TO_SHOP_CART,
    CHE_SHOP_TO_SHOP_CART,
    CHECK_ALL_SHOP,
    CLE_ALL_SHOP_TO_SHOP_CART
} from "../constants";

import { IAction } from '../type';

export default function shopcarReducer(state = [], action: IAction) {
    switch (action.type) {
        case ADD_SHOP_TO_SHOP_CART: // 添加商品

            return state;
        case DEL_SHOP_TO_SHOP_CART: // 删除商品

            return state;
        case GET_SHOP_CAR: // 获取购物车列表
            if (action.data[0]===undefined) {
                return []
            }
            let arrNew = [...action.data];
            arrNew.forEach((ele:any) => {
                ele.check = false
            });
            return arrNew;
        case CHE_SHOP_TO_SHOP_CART:  // 选择商品
            let newArr = state.map((ele:any)=>{
                if (ele.id === action.data.id) {
                    ele.check = action.data.check
                }
                return ele
            })
            return newArr
        case CHECK_ALL_SHOP: // 选择所有商品
            let newArrTwo = state.map((ele:any)=>{
                ele.check = action.data
                return ele
            })
            return newArrTwo
        case CLE_ALL_SHOP_TO_SHOP_CART: // 清空所有商品
            return []
        default:
            return state;
    }
}





