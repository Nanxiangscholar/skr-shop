// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavLink } from 'react-router-dom';
import Cards from 'components/Cards';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export default (props: any) => {
    let { Swidth, Sheight, loop, card, imgList, count } = props;

    return (
        <div style={{ width: Swidth, height: Sheight }}>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                navigation
                // pagination={{ clickable: true }}
                // scrollbar={{ draggable: false }}

                // 设置一个窗口中图的个数
                slidesPerView={count}
                //两个图之间的距离
                spaceBetween={20}
                centeredSlides= {true}
                //设置卡片式轮播
                loop={loop}
                pagination={
                    {
                        el: '.swiper-pagination',
                        clickable: true,
                    }
                }
            >
                {
                    imgList.map((item: any) => {
                        return (
                            <SwiperSlide style={{ width: 400 + 'px' }}>
                                <NavLink to={`/details/${item.id}`}>
                                    <Cards title={item.title} imgSrc={item.img} height={Sheight} width={Sheight} />
                                </NavLink>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div >
    );
};