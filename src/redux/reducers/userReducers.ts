import {
    GET_USER,
    GET_Address,
    ADD_ADDRESS,
    SET_DEFAULT,
    DEL_ADDRESS
} from "../constants";

import { IAction } from '../type';

export default function userReducer(state = [], action: IAction) {
    switch (action.type) {
        case GET_Address: // 获取收货地址
        
            return action.data;
        case ADD_ADDRESS: // 新增收货地址
        
            return state;
        case DEL_ADDRESS: // 删除指定收货地址
            let newArr = state.filter((ele:any)=>{
                return ele.id !== action.data.id // 过滤掉要删除的收货地址
            })
            return newArr
        case SET_DEFAULT:
            let arrNew = state.map((tit:any)=>{
                if (tit.id === action.data) {
                    tit.prime = 1
                }else{
                    tit.prime = 0
                }
                return tit
            })
            return arrNew
        default:
            return state;
    }
}
