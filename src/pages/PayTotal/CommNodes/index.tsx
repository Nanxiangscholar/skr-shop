import React,{useEffect,useState} from 'react'
import { payGoApi,addOrder } from 'Api/userAddress';
import { getCookie } from 'assets/ts/cookie';
import { useNavigate } from 'react-router-dom'
import { message } from 'antd';


function CommNodes({objss=[]}:any) {
    const [money,staMoney] = useState<any[]>([0,0,0])
    const navigate = useNavigate();
    useEffect(()=>{
        if(objss.length){
            // console.log(objss,'dsadsad');
            let allpice= objss.reduce((prev:any,cur:any)=>{
                return prev  + cur.price
            },0)
            let discount= objss.reduce((prev:any,cur:any)=>{
                return prev  + cur.special_price
            },0)
           let total = allpice-discount
           staMoney([allpice,discount,total])
        }
    },[objss])

    const payGo=()=>{
        // 分店铺提交订单
        let store_id_list:any = [];
        objss.forEach((item:any) => {
            store_id_list.push(item.id)
        })
        let arr = new Set(store_id_list)
        Array.from(arr)
        store_id_list = [...Array.from(arr)];
        let order:any = [];
        store_id_list.forEach((el:any) => {
            let type:any = {};
            type.id = el;
            type.skus = [];
            type.money = 0
            objss.forEach((item:any) => {
                if (item.id == el) {
                    let obj:any = {}
                    type.money += item.special_price - 0
                    obj.sku_id = item.id;
                    obj.price = item.price;
                    obj.actual_price = item.special_price;
                    obj.num = item.num
                    type.skus.push(obj)
                }
            })
            order.push(type)
        })
        let idLocal:any = [];
        let userId = getCookie('userinfo').userInfo.id;
        order.forEach((item:any, index:number) => {
            //设置code订单编号(不能重复)        
            let code = index + userId + Date.now();
            addOrder({
                code,
                store_id:1,
                customer_id: userId,
                money: money[1],
                skus: JSON.stringify(item.skus)
            }).then((res:any) => {
                if (res.code === 200) {
                    console.log(res);
                }
            })
        })
        payGoApi({
            // 订单号
            outTradeNo:getCookie('userinfo').userInfo.username+getCookie('userinfo').userInfo.id + Date.now(),
            // 价格
            totalAmount:money[1],
            // 扫码页面显示的内容
            subject:getCookie('userinfo').userInfo.username+"Shop To",
            // 描述性信息
            body:'is paying for'+objss[0].title
        }).then((res:any)=>{
            if (res.code===200) {
                message.loading('跳转中...',200);
                setTimeout(() => {
                    // navigate(res.data,{replace:true})
                    window.location.replace(res.data)
                }, 100);
            }
        })
    }

    return (
        <div className='placeOrder'>
            <nav>商品小记</nav>
            <div>商品总价：{money[0]}￥</div>
            <div>优惠：{money[2]}￥</div>
            <div>其他：- 0￥</div>
            <footer>
                <section>
                    <p>总计</p>
                    <p>￥{money[1]}</p>
                </section>
                <button onClick={()=>payGo()}>
                    提交订单
                </button>
            </footer>
        </div>
    )
}

export default CommNodes