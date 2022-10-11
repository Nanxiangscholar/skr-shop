import React, { useState,useEffect } from 'react';
import { Divider } from 'antd';
import './index.scss';
import { message } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { delShop, addShop, checkShopCar, checkAll } from '../../redux/actions/shopCar';
import { getCookie } from 'assets/ts/cookie';
import { useNavigate } from 'react-router-dom';

// {
//   customer_id  int
//   sku_id	      int
//   num	      int
//   params	      varchar
// }


// 每行商品组件
const ProductList:React.FC<any> = ({data,reduce,add})=>{
  const dispatch = useDispatch();
  let colorSize = JSON.parse(data.params);
  // 添加商品
  const addSh=(uid:number,num:number)=>{
    let {userInfo:{id}} = getCookie('userinfo');
    dispatch<any>(addShop({
      customer_id:id,
      sku_id:uid,	      
      num:num,
      params:colorSize
    }))

  }
  // 选择商品
  const checkList=(id:number,e:any)=>{
    // console.log(e.target.checked);
    
    dispatch(checkShopCar({id,check:e.target.checked}))
  }

  return (
    <li className='car-shop-item'>
    <div className='checkbox-item'>
      <input type='checkbox' name='' id='input' checked={data.check} onChange={(e)=>checkList(data.id,e)}/>
    </div>
    <div className='car-shop-img'>
      <img src={data.img} alt='' />
    </div>
    <div className='car-shop-title'>
      <div className='shop-title-top'>
        <div className='rt'>
          <h5 className='shop-name'>{data.title}</h5>
          <p>
            <span>颜色: {colorSize[0]} ; 尺码: {colorSize[1]}</span>
          </p>
        </div>
        <div className='gt'>
            {/* 现价 */}
          <div className='shop-price'>￥ {data.price}</div>
            {/* 折扣价 */}
          <div className='discounted-price'>￥ {data.special_price}</div>
        </div>
      </div>
      <div className='shop-title-bottom'>
        <p className='left'>
          <span>数量：</span>
          <span className='price-reduce' >
            -
          </span>
          <input type='text' disabled value={data.num}/>
          <span className='price-add' onClick={()=>addSh(data.sku_id,data.num)}>
            +
          </span>
        </p>
        <p className='right'>
          {/* 从redux状态中删除 */}
          <span className='shop-delete' onClick={()=>dispatch<any>(delShop({id:data.id}))}>
            删除
          </span>
        </p>
      </div>
    </div>
    </li>
  )
}


const ShopCar: React.FC = () => {
  const shopList = useSelector((state:any) => state.shopCar);
  const [totalPrice,setTotalPrice] = useState<number>(0);
  const [checkA,setCheckA] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 全选
  const SelectAll = (e: any) => {
    dispatch(checkAll(e.target.checked))
  };
  let [num, setNum] = useState(1);
  // 商品数量减少
  const reduce = () => {
    if (num <= 1) {
      num = 1;
      setNum(num);
    } else {
      num = num - 1;
      setNum(num);
    }
  };
  // 商品数量增加
  const add = () => {
    num = num + 1;
    setNum(num);
  };

  useEffect(()=>{
    let price = 0;
    shopList.forEach((ele:any) => {
        if (ele.check) {
          price+=ele.price
        }
    });
    setTotalPrice(price)

    if(shopList.every((ele:any)=>ele.check === true)){
      setCheckA(true)
    }else{
      setCheckA(false)
    }

    if (shopList[0]===undefined) {
      setCheckA(false)
    }


  },[shopList])

  const settlement=()=>{
    // 筛选出所有被选中的商品并且携带着跳转至支付页面
    let arr = shopList.filter((ele:any)=>{
      return ele.check === true
    })
    if (arr[0]===undefined) {
      message.error('请选择商品');
      return
    }
    // console.log(arr);
    navigate('/PayTotal',{
      replace:false, //跳转模式
      state:arr
    })

  }

  // 组件挂在之后获取用户商品列表
  return (
    <div>
      <div className='shopcar'>
        <h3 className='shopcar-title'>
          <span>我的购物车</span>
          {/* 根据购物车里的数据渲染件数 */}
          <i className='total-num'>共{shopList.length}件</i>
        </h3>
        <div className='shopcar-top'>
          <input type='checkbox' name='' id='' checked={checkA} onChange={(e) => SelectAll(e)} />
          全选
          <Divider />
        </div>
        <ul className='shopcar-list'>
          {
            shopList.map((ele:any,index:number)=>{
              return <ProductList data={ele} reduce={reduce} add={add} key={index}></ProductList>
            })
          }
        </ul>
      </div>
      <div className='shop-footer'>
        <span className='total-price'>总价:￥{totalPrice}</span>
        <button className='settlement' onClick={()=>settlement()}>结算</button>
      </div>
    </div>
  );
};
export default ShopCar;