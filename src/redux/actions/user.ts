import { getCookie } from '../../assets/ts/cookie';
import { message } from 'antd';
import { 
    getUserAddress,
    addAddressApi,
    delAddressApi,
    defaultAddress
} from 'Api/userAddress';

import {
    GET_Address,
    ADD_ADDRESS,
    DEL_ADDRESS,
    SET_DEFAULT
} from '../constants';

// 获取收货地址
export const getAddressList = (data: any) => {
    return {
        data,
        type: GET_Address
    }
}

// 新增收货地址
export const addAddressList = (data: any) => {
    return {
        data,
        type: ADD_ADDRESS
    }
}

// 删除收货地址
export const delAddressList = (data:any)=>{
    return {
        data,
        type: DEL_ADDRESS
    }
}

// 设置默认地址
export const setAddressdefault = (data:any)=>{
    return {
        data,
        type: SET_DEFAULT
    }
}


// payload代表组件使用这个reducer的时候传入的参数
export const getAddress = (payload: any) => {
    return async (dispatch: any) => {
        const res = await getUserAddress(payload)
        // 异步请求完后，再触发同步action，更新state到redux
        dispatch(getAddressList(res.data));
    };
};

// 新增收获地址
export const addAddress =(payload: any)=>{
    return async (dispatch:any)=>{
        const res:any = await addAddressApi(payload);
        if (res.code === 200){
            console.log(getCookie('userinfo').userInfo.id);
            getAddress({id:getCookie('userinfo').userInfo.id})
        }
    }
}

// 删除收货地址
export const delAddressAction = (payload:any)=>{
    return async (dispatch:any)=>{
        const res:any = await delAddressApi(payload);
        if (res.code===200) {    
            message.success('删除地址成功');       
            dispatch(delAddressList(payload))
        }
    }
}

// 设置默认地址
export const setAddDefault = (payload:any)=>{
    return async (dispatch:any)=>{
        const res:any = await defaultAddress({
            id:payload,
            prime:1,
            customer_id:getCookie('userinfo').userInfo.id
        });
        if (res.code===200) {
            message.success('设置默认地址成功');
            dispatch(setAddressdefault(payload))
        }else{
            message.warning('设置默认地址失败');
        }
    }
}