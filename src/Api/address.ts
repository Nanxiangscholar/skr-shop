import instance from './request'


//测试 customer_id = 25

// 获取默认地址
export const getDefaultAddress = (customer_id:number)=>{
    return instance({
        method:'post',
        url:'/user/getDefaultAddress',
        data:{
            customer_id
        }
    })
}

//获取地址
export const getAddress = (customer_id:number)=>{
    return instance({
        method:'post',
        url:'user/getAddress',
        data:{
            customer_id
        }
    })
}

//设置默认收货地址
export const defaultAddress = (id:number,prime:number,customer_id:number)=>{
    return instance({
        method:'post',
        url:'user/defaultAddress',
        data:{
            id,
            prime,
            customer_id
        }
    })
}

// 修改收货地址

export const modifyAddress = (name:string,tel:string,address:string,id:number,prime:number,customer_id:number)=>{
    return instance({
        method:'post',
        url:'user/updateAddress',
        data:{
            id,
            name,
            tel,
            address,
            prime,
            customer_id
        }
    })
}

// 新增收货地址

export const addAddress = (name:string,tel:string,address:string,customer_id:number,prime:boolean)=>{
    return instance({
        method:'post',
        url:'user/addAddress',
        data:{
            name,
            tel,
            address,
            customer_id,
            prime
        }
    })
}

//删除地址

export const deleteAddress =(id:number)=>{
    return instance({
        method:'post',
        url:'/user/deleteAddress',
        data:{
            id
        }
    })
}