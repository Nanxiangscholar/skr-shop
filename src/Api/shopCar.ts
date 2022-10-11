import instance from './request';

// 演示 

// {
//   customer_id  int
//   sku_id	      int
//   num	      int
//   params	      varchar
// }

// 添加购物车
export const addShopCarApi = (params:any)=>instance.post('/shopCar/addShopCar',{...params});

// 删除购物车
// 传入用户id 
// {
//   customer_id:25 （测试账号id）
// }
export const delShopCarApi = (params:any)=>instance.post('/shopCar/deleteShopCar',{...params});

// 获取购物车列表
// 传入用户id
// {
//   customer_id:25 （测试账号id）
// }
export const getShopCarApi = (params:any)=>instance.post('/shopCar/getShopCar',{...params});