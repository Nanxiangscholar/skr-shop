import React from 'react'
import './index.scss'
function ShopDetailed({objss=[]}:any) {

  return (
    <ul className='shop-detailed-ul'>
        {
            objss.map((item:any)=>{
                return(
                    <li key={item.id}>
                        <div className='ul-imgbox'>
                            <img src={item.img} alt="" />
                        </div>
                        <div className='ul-mind'>
                            <h3>{item.title}</h3>
                            <p>
                                  <span>颜色：{JSON.parse(item.params)[0]}</span>,  
                                  <span>尺寸：{JSON.parse(item.params)[1]}</span>  
                            </p>
                            <p>数量：{item.num}</p>
                        </div>
                        <div className='ul-right'>
                            <p>￥{item.price}</p>
                            <p>￥{item.special_price}</p>
                        </div>
                    </li>
                )
            })
        }
        <p className='footers'>欢迎选购！！！！</p>
    </ul>
  )
}

export default ShopDetailed