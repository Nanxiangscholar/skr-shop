import instance from './request';

// 搜索请求

export const SearchShow = (name:string) => {
    return instance({
        url: '/type/selectProduct',
        method: 'post',
        data: {
            name
        }
    })
}
 