import { getCookie } from '../../assets/ts/cookie';
import {
    ADD_SHOP_TO_SHOP_CART,
    DEL_SHOP_TO_SHOP_CART,
    GET_SHOP_CAR,
    CHE_SHOP_TO_SHOP_CART,
    CHECK_ALL_SHOP,
    CLE_ALL_SHOP_TO_SHOP_CART
} from '../constants';

import {
    getShopCarApi,
    addShopCarApi,
    delShopCarApi
} from 'Api/shopCar';

// 获取购物车列表
export const getShopCarList = (data: any) => {
    return {
        data,
        type: GET_SHOP_CAR
    }
}

// 添加购物车
export const addShopCar = (data: any) => {
    return {
        data,
        type: ADD_SHOP_TO_SHOP_CART,
    }
}
// 选择商品
export const checkShopCar = (data: any) => {
    return {
        data,
        type: CHE_SHOP_TO_SHOP_CART,
    }
}
// 选择所有商品
export const checkAll=(data:any)=>{
    return {
        data,
        type:CHECK_ALL_SHOP
    }
}

// 删除购物车
export const delShopCar = (data: any) => {
    return {
        data,
        type: DEL_SHOP_TO_SHOP_CART,
    }
}

// 清空购物车
export const clearAll = () => {
    return {
        type: CLE_ALL_SHOP_TO_SHOP_CART,
    }
}


// payload代表组件使用这个reducer的时候传入的参数
export const getShopCar = (payload: any) => {
    return async (dispatch: any) => {
        const res:any = await getShopCarApi(payload)
        // 异步请求完后，再触发同步action，更新state到redux 
        if (res.code === 402) {
            dispatch(clearAll())
        }else{
            dispatch(getShopCarList(res.data));
        }    
    };
};

// 添加商品到购物车
export const addShop = (payload: any) => {
    return async (dispatch: any) => {
        const res:any = await addShopCarApi(payload)
        // 异步请求完后，再触发同步action，更新state到redux
        if (res.code!==200) {
            
        }else{
            let {userInfo:{id}} = getCookie('userinfo')            
            dispatch(getShopCar({
                customer_id:id
            }))
        }
    };
};

// 删除购物车
export const delShop = (payload:{id:number})=>{
    return async (dispatch:any)=>{
        const res:any = await delShopCarApi(payload);
        if (res.code!==200) {
            
        }else{
            let {userInfo:{id}} = getCookie('userinfo')            
            dispatch(getShopCar({
                customer_id:id
            }))
        }
    }
}
