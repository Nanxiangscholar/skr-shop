import React, { useRef, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import '../../themes/Nav/index.scss'
// logo图片
import logo1 from '../../assets/image/logo/log.png';
import logo2 from '../../assets/image/logo/log1.png';
import instance from 'Api/request';
import { getTypeTwoListGoods } from '../../Api/api';
import Cards from 'components/Cards';
import { getCookie, clearCookie } from 'assets/ts/cookie';
// 全局消息提示
import { message } from 'antd';
// 引入第三方hooks

import { useRequest } from 'ahooks';
import { useSelector } from 'react-redux';

// 头部组件-动态导航
const NavDynamic = (): React.ReactNode => {
    const shopLists = useSelector((state: any) => state.shopCar);

    let info = () => {
        message.info('退出中...', 1)
            .then(() => {
                clearCookie("userinfo")
            })
        return new Promise((resolve) => { })
    }
    // 退出 然后使用ahooks的防抖
    const { run } = useRequest(
        info, {
        throttleWait: 5000,
        manual: true
    });

    if (getCookie("userinfo")) {
        // 已登陆状态
        return (
            <>
                <div className="navicons">
                    <div onClick={() => run()}> <svg viewBox="64 64 896 896" data-icon="user-add" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true" focusable="false" ><path d="M678.3 642.4c24.2-13 51.9-20.4 81.4-20.4h.1c3 0 4.4-3.6 2.2-5.6a371.67 371.67 0 0 0-103.7-65.8c-.4-.2-.8-.3-1.2-.5C719.2 505 759.6 431.7 759.6 349c0-137-110.8-248-247.5-248S264.7 212 264.7 349c0 82.7 40.4 156 102.6 201.1-.4.2-.8.3-1.2.5-44.7 18.9-84.8 46-119.3 80.6a373.42 373.42 0 0 0-80.4 119.5A373.6 373.6 0 0 0 137 888.8a8 8 0 0 0 8 8.2h59.9c4.3 0 7.9-3.5 8-7.8 2-77.2 32.9-149.5 87.6-204.3C357 628.2 432.2 597 512.2 597c56.7 0 111.1 15.7 158 45.1a8.1 8.1 0 0 0 8.1.3zM512.2 521c-45.8 0-88.9-17.9-121.4-50.4A171.2 171.2 0 0 1 340.5 349c0-45.9 17.9-89.1 50.3-121.6S466.3 177 512.2 177s88.9 17.9 121.4 50.4A171.2 171.2 0 0 1 683.9 349c0 45.9-17.9 89.1-50.3 121.6C601.1 503.1 558 521 512.2 521zM880 759h-84v-84c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v84h-84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h84v84c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-84h84c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"></path></svg>
                        <p>退出</p>
                    </div>
                </div>
                <div className="navicons">
                    <NavLink to={'/mypage'}><svg viewBox="64 64 896 896" data-icon="login" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true" focusable="false" ><path d="M521.7 82c-152.5-.4-286.7 78.5-363.4 197.7-3.4 5.3.4 12.3 6.7 12.3h70.3c4.8 0 9.3-2.1 12.3-5.8 7-8.5 14.5-16.7 22.4-24.5 32.6-32.5 70.5-58.1 112.7-75.9 43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 32.6 32.5 58.1 70.4 76 112.5C865.7 417.8 875 464.1 875 512c0 47.9-9.4 94.2-27.8 137.8-17.8 42.1-43.4 80-76 112.5s-70.5 58.1-112.7 75.9A352.8 352.8 0 0 1 520.6 866c-47.9 0-94.3-9.4-137.9-27.8A353.84 353.84 0 0 1 270 762.3c-7.9-7.9-15.3-16.1-22.4-24.5-3-3.7-7.6-5.8-12.3-5.8H165c-6.3 0-10.2 7-6.7 12.3C234.9 863.2 368.5 942 520.6 942c236.2 0 428-190.1 430.4-425.6C953.4 277.1 761.3 82.6 521.7 82zM395.02 624v-76h-314c-4.4 0-8-3.6-8-8v-56c0-4.4 3.6-8 8-8h314v-76c0-6.7 7.8-10.5 13-6.3l141.9 112a8 8 0 0 1 0 12.6l-141.9 112c-5.2 4.1-13 .4-13-6.3z"></path></svg>
                        <p>个人</p>
                    </NavLink>

                </div>
                <div className="navicons">
                    <NavLink to={'/shopcar'}><svg viewBox="0 0 1024 1024" data-icon="shopping-cart" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true" focusable="false" ><path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path></svg>
                        <p>{shopLists.length}</p>
                    </NavLink>
                </div>
            </>
        )
    } else {
        // 未登录状态
        return (
            <>
                <div className="navicons">
                    <NavLink to={'/register'}> <svg viewBox="64 64 896 896" data-icon="user-add" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true" focusable="false" ><path d="M678.3 642.4c24.2-13 51.9-20.4 81.4-20.4h.1c3 0 4.4-3.6 2.2-5.6a371.67 371.67 0 0 0-103.7-65.8c-.4-.2-.8-.3-1.2-.5C719.2 505 759.6 431.7 759.6 349c0-137-110.8-248-247.5-248S264.7 212 264.7 349c0 82.7 40.4 156 102.6 201.1-.4.2-.8.3-1.2.5-44.7 18.9-84.8 46-119.3 80.6a373.42 373.42 0 0 0-80.4 119.5A373.6 373.6 0 0 0 137 888.8a8 8 0 0 0 8 8.2h59.9c4.3 0 7.9-3.5 8-7.8 2-77.2 32.9-149.5 87.6-204.3C357 628.2 432.2 597 512.2 597c56.7 0 111.1 15.7 158 45.1a8.1 8.1 0 0 0 8.1.3zM512.2 521c-45.8 0-88.9-17.9-121.4-50.4A171.2 171.2 0 0 1 340.5 349c0-45.9 17.9-89.1 50.3-121.6S466.3 177 512.2 177s88.9 17.9 121.4 50.4A171.2 171.2 0 0 1 683.9 349c0 45.9-17.9 89.1-50.3 121.6C601.1 503.1 558 521 512.2 521zM880 759h-84v-84c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v84h-84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h84v84c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-84h84c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"></path></svg>
                        <p>加入</p>
                    </NavLink>
                </div>
                <div className="navicons">
                    <NavLink to={'/login'}><svg viewBox="64 64 896 896" data-icon="login" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true" focusable="false" ><path d="M521.7 82c-152.5-.4-286.7 78.5-363.4 197.7-3.4 5.3.4 12.3 6.7 12.3h70.3c4.8 0 9.3-2.1 12.3-5.8 7-8.5 14.5-16.7 22.4-24.5 32.6-32.5 70.5-58.1 112.7-75.9 43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 32.6 32.5 58.1 70.4 76 112.5C865.7 417.8 875 464.1 875 512c0 47.9-9.4 94.2-27.8 137.8-17.8 42.1-43.4 80-76 112.5s-70.5 58.1-112.7 75.9A352.8 352.8 0 0 1 520.6 866c-47.9 0-94.3-9.4-137.9-27.8A353.84 353.84 0 0 1 270 762.3c-7.9-7.9-15.3-16.1-22.4-24.5-3-3.7-7.6-5.8-12.3-5.8H165c-6.3 0-10.2 7-6.7 12.3C234.9 863.2 368.5 942 520.6 942c236.2 0 428-190.1 430.4-425.6C953.4 277.1 761.3 82.6 521.7 82zM395.02 624v-76h-314c-4.4 0-8-3.6-8-8v-56c0-4.4 3.6-8 8-8h314v-76c0-6.7 7.8-10.5 13-6.3l141.9 112a8 8 0 0 1 0 12.6l-141.9 112c-5.2 4.1-13 .4-13-6.3z"></path></svg>
                        <p>登录</p>
                    </NavLink>

                </div>
                <div className="navicons">
                    <NavLink to={'/shopcar'}><svg viewBox="0 0 1024 1024" data-icon="shopping-cart" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true" focusable="false" ><path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path></svg>
                        <p>0</p>
                    </NavLink>
                </div>
            </>
        )
    }
}

export default function Nav() {
    // 声明状态控制输入框清除功能的显示隐藏
    const [bone, setBone] = useState(false);

    // 获取input元素
    const iptDom: any = useRef<HTMLInputElement>(null);

    // 监听input的value值变化的函数
    const handleValue = () => {
        if (iptDom.current.value !== '') {
            setBone(true);
        } else {
            setBone(false)
        }
        // 限制输入的值不能为空,空格键
        if (iptDom.current.value.trim() == '') {
            iptDom.current.value = '';
            return;
        }
    }

    const shopLists = useSelector((state: any) => state.shopCar);
    // 点击清除input的value
    const clickClose = () => {
        setBone(false)
        iptDom.current.value = '';
    }

    // 跳转Search路由
    const navigate: any = useNavigate();
    // 点击搜索
    const cilkSearch = (e: any) => {
        if (iptDom.current.value.length < 0) {
            return;
        }
        console.log(iptDom.current.value);
        
        navigate(`search/product/${iptDom.current.value}`)
    }
    // enter搜索
    const keyUpClose = (e: any) => {
        // 结构赋值，获取键盘键值，元素值
        let { keyCode } = e;
        // 限制键盘只能enter键有效
        if (keyCode !== 13) return;
        if (iptDom.current.value.length < 0) {
            return;
        }
        navigate(`search/product/${iptDom.current.value}`)
        iptDom.current.value = '';
        setBone(false)
    }

    // 获取Header中输入框的value
    const iptDom2: any = useRef<HTMLInputElement>(null);
    // enter搜索
    const keyUpClose2 = (e: any) => {
        // 结构赋值，获取键盘键值，元素值
        let { keyCode } = e;
        // 限制键盘只能enter键有效
        if (keyCode !== 13) return;
        if (iptDom.current.value.length < 0) {
            return;
        }
        navigate(`search/product/${iptDom2.current.value}`)
        iptDom2.current.value = '';
    }


    // 状态控制header中搜索框显示隐藏
    const [boneI, setBoneI] = useState<any>(false)
    const [boneH, setBoneH] = useState<any>(false)
    // 控制header中搜索框显示隐藏函数
    const clickBoneH: any = () => {
        let boneH = true
        setBoneH(boneH)


    }
    const Header: any = useRef<HTMLInputElement>(null)
    const utilitylogo: any = useRef<HTMLInputElement>(null)
    const utility: any = useRef<HTMLInputElement>(null)
    // 处理滚动条上导航Header定位变化
    useEffect(() => {
        // 监听滚动条的函数
        const scroll = () => {
            // 滚动条滚动高度
            let t = document.documentElement.scrollTop || document.body.scrollTop
            if (t > 65) {
                Header.current.style.position = 'fixed';
                Header.current.style.top = 0;
                utilitylogo.current.style.display = 'block';
                if (boneH == false) {
                    utility.current.style.display = 'block';
                }
            } else if (t <= 65) {
                Header.current.style.position = ''
                utilitylogo.current.style.display = 'none';
                utility.current.style.display = 'none';
                setBoneH(false)
            }
        }
        window.addEventListener('scroll', scroll);
    }, [])


    // 存储一级分类
    const [stair, setStair] = useState([]);
    useEffect(() => {
        (async function () {
            // 一级分类
            let datas: any = await instance({
                method: 'post',
                url: '/type/getParentName',
            })
            setStair(datas.data)
        })()
    }, [])



    // 一级商品名称
    let listArr: any = ['鞋类', '服饰', '配件', '儿童专区']
    // 存储二级分类所有商品
    const [secondAll, setSecondAll] = useState<any[]>([]);
    // 存储二级分类
    const [second, setSecond] = useState<any[]>([]);
    // 控制Header隐藏块的状态
    const [mouse, setMouse] = useState<any>(false);
    useEffect(() => {
        (async function () {
            let list: any = [];
            listArr.map(async (item: any) => {
                let secdata = await instance({
                    method: 'post',
                    url: '/wares/getSecond',
                    data: {
                        parent_name: item
                    }
                })
                return (
                    list.push({ type: item, data: secdata }),
                    setSecondAll([...list])
                )
            })
        })()
    }, [])


    // 存储二级分类相关商品
    const [HeaGoodsAll, setHeaGoodsAll] = useState<any>([]);
    // 存储二级分类相关商品，用于放置隐藏块图片
    const [HeaGoods, setHeaGoods] = useState<any>([]);
    var arr = ['跑鞋', '女短袖针织衫', '太阳帽', '羽绒服']
    useEffect(() => {
        (async function () {
            let list: any = [];
            arr.map(async (item: any, index: number) => {
                let newArr = (await getTypeTwoListGoods(item)).data;
                return (
                    list.push({ type: listArr[index], data: newArr }),
                    setHeaGoodsAll([...list])
                )
            })
        })()
    }, [])


    // 移入显示隐藏块
    const mouseValue = async (e: any) => {
        setMouse(true)
        let value = e.currentTarget.children[0].innerHTML
        secondAll.forEach((item: any) => {
            if (item.type === value) {
                setSecond([...item.data.data]);
            }
        })
        HeaGoodsAll.forEach((item: any) => {
            if (item.type === value) {
                setHeaGoods([...item.data]);
            }
        })
    }
    // 移入函数
    const mouseNone = (e: any) => {
        setMouse(false)
    }

    return (
        <div style={{ minWidth: "1400px" }}>
            <div className='Nav'>
                <div className="nav-logo">
                    <NavLink to={'/home'}><img src={logo1} alt="logo" /></NavLink>
                </div>
                <div className='nav-ipt'>
                    <span className='span-ipt'>
                        <input className='ant-input' type="text" placeholder='潮流，从搜索开始' ref={iptDom} onInput={handleValue} onKeyUp={(e) => { keyUpClose(e) }} />
                    </span>
                    <span className='icon-eject' style={bone ? { display: 'block' } : { display: 'none' }} onClick={clickClose}>
                        <svg viewBox="64 64 896 896" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" ><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
                    </span>
                    <span className='icon-ipt' onClick={(e) => cilkSearch(e)}>
                        <svg viewBox="64 64 896 896" data-icon="search" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" ><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg>
                    </span>
                </div>
                <div className='nav-icons'>
                    {
                        NavDynamic()
                    }
                </div>
            </div>
            <div className="Header" ref={Header}>
                <div className="Had-conent">
                    <ul className='left'>
                        {
                            stair.map((item, index) => {
                                return (
                                    <li key={index} onMouseEnter={(e) => mouseValue(e)} onMouseLeave={(e) => mouseNone(e)}>
                                        <NavLink to={`/primary/${item}`}>{item}</NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <ul className='right'>
                        <li><NavLink to={'/wdna'}>POP</NavLink></li>
                        <li><NavLink to={'/exclusive'}>EXCLUSIVE</NavLink></li>
                        <li><NavLink to={'/event'}>EVENT</NavLink></li>
                        <li><NavLink to={'/best'}>BEST</NavLink></li>
                    </ul>
                </div>
                <div className="utility-logo" ref={utilitylogo}>
                    <NavLink to={'/home'}><img src={logo2} alt="logo" /></NavLink>
                </div>
                <div className='utility' ref={utility} style={{ display: boneI ? 'block' : 'none' }}>
                    <div className="navicons" onClick={clickBoneH}>
                        <li><svg viewBox="64 64 896 896" data-icon="search" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true" focusable="false" ><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg>
                            <p>SEARCH</p>
                        </li>
                    </div>
                    <div className="navicons">
                        <NavLink to={'/mypage'}><svg viewBox="64 64 896 896" data-icon="user" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true" focusable="false" ><path d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path></svg>
                            <p>MY</p>
                        </NavLink>
                    </div>
                    <div className="navicons">
                        <NavLink to={"/shopcar"}><svg viewBox="0 0 1024 1024" data-icon="shopping-cart" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true" focusable="false"><path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path></svg>
                            <p>{shopLists.length}</p>
                        </NavLink>
                    </div>
                </div>
                <div className='utility' tabIndex={99} onBlur={() => setBoneH(false)} style={{ display: boneH ? 'block' : 'none' }}>
                    <span className='span-ipt'>
                        <input autoFocus={true} className='ant-input' type="text" placeholder='潮流，从搜索开始' ref={iptDom2} onKeyUp={(e) => { keyUpClose2(e) }} />
                    </span>
                </div>
                <div className="Had-eject" style={{ display: mouse ? 'block' : 'none' }} onMouseEnter={() => setMouse(true)} onMouseLeave={() => setMouse(false)}>
                    <div className="eng">
                        <div className="content">
                            <ul className="left">
                                {
                                    second.map((item, index) => {
                                        return (
                                            <li key={index}><NavLink to={`/secondary/${item}`}>{item}</NavLink></li>
                                        )
                                    })
                                }
                            </ul>
                            <div className="right">
                                <ul>
                                    {
                                        HeaGoods.map((item: any, index: number) => {
                                            return (
                                                <li key={index}><NavLink to={`/details/${item.id}`}><Cards title={item.title} imgSrc={item.img} width={140} height={250}></Cards></NavLink></li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
