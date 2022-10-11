import React, { useState, useEffect, useRef, memo } from 'react'
import '../../themes/Aside/index.scss'
import { Drawer, Space } from 'antd';
import type { DrawerProps } from 'antd/es/drawer';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { getShopCar } from '../../redux/actions/shopCar';
import { getCookie } from '../../assets/ts/cookie';
import { useNavigate } from 'react-router-dom';

const Aside = () => {
    const [size, setSize] = useState<DrawerProps['size']>();
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    // 获取购物车列表
    const shopCar = useSelector((state: any) => state.shopCar) || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const showDrawer = () => {
        setOpen(true);
    };
    const showDrawer1 = () => {
        setOpen1(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onClose1 = () => {
        setOpen1(false);
    };

    let Top = useRef<HTMLLIElement>(null);
    let Buttom = useRef<HTMLLIElement>(null);

    const handleScroll = (event: any) => {
        //滚动条高度
        let clientHeight = document.documentElement.clientHeight; //可视区域高度
        let scrollTop = document.documentElement.scrollTop;  //滚动条滚动高度
        let scrollHeight = document.documentElement.scrollHeight; //滚动内容高度

        let liT: any = Top.current;
        if (scrollTop == 0) {
            liT.style.display = 'none';
        } else {
            liT.style.display = 'block';
        }


        let liB: any = Buttom.current;
        if (scrollTop >= scrollHeight - clientHeight - 1) {
            liB.style.display = 'none';
        } else {
            liB.style.display = 'block';
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        if (getCookie('userinfo')) {
            let { id } = getCookie('userinfo').userInfo
            // customer_id:25
            dispatch<any>(getShopCar({ customer_id: id }));
        }
    }, [])


    let scrollToptimer:any;
    function ScrollTo(newT: any) {
         scrollToptimer = setInterval(function () {
            // 拿到导航条的高度
            let newtarget: any = document.body.scrollTop || document.documentElement.scrollTop;
            var speed = newtarget / 50;
            newT.scrollTop -= speed;
            if (newtarget == 0) {
                clearInterval(scrollToptimer);
            }
        }, 5);
    }
    function ScrollDown(newT: any) {
        let scrollToptimer = setInterval(function () {
            // 拿到导航条的高度
            let newtarget: any = document.body.scrollTop || document.documentElement.scrollTop;
            
        }, 5);
    }


    
    let newT: any = document.documentElement //滚动条
    let backTop = () => {
        ScrollTo(newT)
    }

    let backDown = () => {
        ScrollDown(newT)
    }

    return (
        <div id='aside'>
            <ul>
                <li onClick={showDrawer}><svg viewBox="0 0 1024 1024" data-icon="shopping-cart" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true" focusable="false"><path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path></svg></li>
                <li onClick={showDrawer1}>SKR</li>
                <li onClick={() => { backTop() }} ref={Top}><svg viewBox="64 64 896 896" data-icon="arrow-up" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path d="M868 545.5L536.1 163a31.96 31.96 0 0 0-48.3 0L156 545.5a7.97 7.97 0 0 0 6 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z"></path></svg></li>
                <li onClick={() => { backDown() }} ref={Buttom}><svg viewBox="64 64 896 896" data-icon="arrow-down" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path></svg></li>
            </ul>

            <Drawer
                headerStyle={{ backgroundColor: '#dfdfdf' }}
                title="购物车" placement="right" onClose={onClose} open={open}>
                <div className='navShopCar'>
                    <p>共有{shopCar.length}件宝贝</p>
                    <Button onClick={() => navigate('/shopcar')} type="primary" size="small" style={{ backgroundColor: "#afafaf", borderColor: "#afafaf" }}>管理</Button>
                </div>
                <ul className='navShopCar-ul'>
                    {
                        shopCar.map((ele: any, index: number) => {
                            return <li key={index}>
                                <div className="nav-left">
                                    <img src={ele.img} alt="" />
                                </div>
                                <div className="nav-right">
                                    <p>{ele.title}</p>
                                    <p>数量:{ele.num}</p>
                                    <div>
                                        <span>￥{ele.special_price}</span>
                                        <span>￥{ele.price}</span>
                                    </div>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </Drawer>

            <div style={{ height: '300px', width: '500px' }}>
                <Drawer
                    headerStyle={{ backgroundColor: '#dfdfdf' }}
                    title={'聊天栏'}
                    placement="right"
                    size={size}
                    onClose={onClose1}
                    open={open1}
                >
                    <p>来啦老弟</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
            </div>

        </div >
    )
}
export default memo(Aside);
