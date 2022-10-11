import { 
    GET_NAV_ONE
 } from '../constants';


// 获取一级分类
export const getShopCarList = (data: any) => {
    return {
        data,
        type: GET_NAV_ONE
    }
}