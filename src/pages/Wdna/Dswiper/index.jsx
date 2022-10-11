import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import './index.scss'
import { EffectCube, Pagination } from "swiper";

import { getTypeTwoListGoods } from '../../../Api/api';
import { NavLink } from 'react-router-dom';

const Dswiper = () => {
  let [shop, setShop] = useState([]);
  useEffect(() => {
    getTypeTwoListGoods(
      '篮球鞋'
    ).then((data) => {
      let shopObj = data.data
      setShop(shopObj)
    })
  }, [])

  // swiper的html结构
  return (
    <Swiper
      effect={"cube"}
      grabCursor={true}
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
      pagination={true}
      modules={[EffectCube, Pagination]}
      className="mySwiper"
    >
      {
        shop.slice(5, 10).map((item, index) => (
          <SwiperSlide key={item.id} className={`swiper-slide swiper-slide${index + 1}`}>
            <NavLink to={`/details/${item.id}`}>
              <img src={item.img} alt="错误" />
            </NavLink>
            <p>{item.title}</p>
            <span className='tip'>右划查看下一款</span>

          </SwiperSlide>
        ))
      }
    </Swiper >
  )
}

export default Dswiper

