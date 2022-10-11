// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavLink } from 'react-router-dom';
import SwiperCore, { Autoplay } from 'swiper/core';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; 
import 'swiper/css/scrollbar';


export default(props) => {
  SwiperCore.use([Autoplay]);
  let { Swidth, Sheight, loop, imgList } = props;
  return (
    <div style={{ width: Swidth, height: Sheight }}>
      <Swiper
        // install Swiper modules
        loop={loop}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        navigation
        pagination={{ clickable: true }}
      >
        {
          imgList.map((item) => {
            // 处理图片文件不同
            let imgs;
            if (item.img) {
              imgs = item.img;
            } else if (item.swiperImg) {
              imgs = item.swiperImg;
            }
            return (
              <SwiperSlide >
                <NavLink to={`/detail/${item.id}`}>
                <img src={imgs} style={{ width: 100 + '%', height: Sheight }} />
                </NavLink>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div >
  );
};