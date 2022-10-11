import instance from './request';

export let ShopDetails =async (spu_id:number) => {
    return instance({
        url: '/store/getSku',
        method: 'post',
        data: {
            spu_id
        }
    })
}

// export const ShopDetails = (params:any)=>instance.get('/store/getSku',{...params});
