import instance from './request';

// 演示 
// 传参为用户id
// 获取收货地址
export const getUserAddress = (params:any)=>instance.post('/user/getAddress',{...params});

// 新增收获地址
export const addAddressApi=(params:any)=>instance.post('/user/addAddress',{...params});

// 删除收货地址
export const delAddressApi=(params:any)=>instance.post('/user/deleteAddress',{...params});

// 设置默认收货地址
export const defaultAddress=(params:any)=>instance.post('/user/defaultAddress',{...params});

// 点击支付跳转
export const payGoApi=(params:any)=>instance.post('/order/payOrder',{...params});

// 点击支付跳转
export const addOrder=(params:any)=>instance.post('/order/addOrder',{...params});
