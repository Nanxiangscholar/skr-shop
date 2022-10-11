import instance from './request';

// 演示 
// export const getTypeOne = (params:any)=>instance.get('/api/getTypeOne',{params});
// 获取二级分类
export const getTypeTwoList = (params: any) => instance.post('/type/getproduct', { parent_name: params });

// 获取二级分类中的相关商品
export const getTypeTwoListGoods = (params: any) => instance.post('/wares/getSpu', { name: params });

// 获取分类热门标签
export const getSecondHotList = (params: any) => instance.post('/wares/getSecond', { parent_name: params });


export const getSwiper = () => instance.post('/type/getSwiper',);

export const getImg = (params: any) => instance.post('/type/getImg', { ...params });

export const register = (params: any) => instance.post('/user/register', { ...params });


export const getUserOrder = (params: any) => instance.post('/order/getUserOrder', { ...params })
