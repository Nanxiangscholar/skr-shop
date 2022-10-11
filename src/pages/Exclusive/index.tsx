import React, { useEffect, useState, useRef } from 'react'
import { getSwiper, getImg } from '../../Api/api'
import './exclusive.scss'
import Swiper from '../../components/Swiper'
import { NavLink } from 'react-router-dom'
import { log } from 'console'



const Exclusive = (props: any) => {

    let [swiper, setSwiper] = useState([])

    let [imgList, setimgList] = useState([])
    let [asideMsg, setasideMsg] = useState([])
    let [showBoxList, setSBList] = useState([])
    let [bigShow, setbigShow] = useState([])
    let [bigShow2, setbigShow2] = useState([])


    useEffect(() => {
        getImg({ parent_name: "服饰", start: 6, end: 9 }).then((data: any) => {
            setSwiper(data)
            // console.log(data);
        })

        getImg({ parent_name: "服饰", start: 10, end: 15 }).then((data: any) => {

            setimgList(data.res)
            // console.log(data);

        })

        getImg({ parent_name: "服饰", start: 10, end: 15 }).then((data: any) => {
            setasideMsg(data)
        })


        getImg({ parent_name: "服饰", start: 19, end: 26 }).then((res: any) => {
            setSBList(res)
        })

        getImg({ parent_name: "配件", start: 16, end: 18 }).then((res: any) => {
            setbigShow(res)
        })

        getImg({ parent_name: "服饰", start: 6, end: 9 }).then((res: any) => {
            setbigShow2(res)
        })

    }, [])



    return (
        <div id='exclusive'>
            <h1>EXCULSIVE</h1>
            <div id='showBox'>
                <div id='showSwiper'>
                    <Swiper Swidth='987px' Sheight='987px' imgList={swiper} />
                </div >
                <div id='showDetail'>
                    <ul>
                        {
                            asideMsg.map((item: any) => {
                                return (
                                    <li>
                                        <NavLink to={`/details/${item.id}`} key={item.id} >
                                            <img src={item.img} />
                                            <div>
                                                <p>{item.title}</p>
                                                <h3>{item.price}</h3>
                                            </div>
                                        </NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

            </div >
            <h1>WANT.NEED</h1>
            <div id='showBoxList'>
                <p id='btnContainer'><button id='allNum'>+All(10943)</button></p>
                <ul>

                    {
                        showBoxList.map((item1: any) => {
                            return (
                                <li>
                                    <NavLink to={`/details/${item1.id}`} key={item1.id}>
                                        <img src={item1.img} />
                                        <p>{item1.title}</p>
                                        <div>{item1.sale}</div>
                                        <div id='prices'>
                                            <span id='downPrice'>{item1.price}</span>
                                            <span id='originPrice'>{item1.price - 40}</span>
                                            <span id='percentage'>40%</span>
                                        </div>
                                    </NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <h1>EDITION</h1>
            <div id='bigShow'>
                <ul>
                    {
                        bigShow.map((item1: any) => {
                            return (
                                <li>
                                    <NavLink to={`/details/${item1.id}`}>
                                        <div id='drop' ></div>
                                        <img src={item1.img} />
                                        <div id='title'>
                                            <h4>{item1.title}</h4>
                                        </div>
                                    </NavLink>
                                </li>
                            )
                        })
                    }


                </ul>
            </div>
            <div id='bigShowTwo'>
                <ul>
                    {
                        bigShow2.map((item1: any) => {
                            return (
                                <img src={item1.img} />
                            )
                        })
                    }

                </ul>
            </div>
            <h1>EDITION</h1>
            <div id='bigShow'>
                <ul>
                    {
                        bigShow.map((item1: any) => {
                            return (
                                <li>
                                    <NavLink to={`/details/${item1.id}`}>
                                        <div id='drop' ></div>
                                        <img src={item1.img} />
                                        <div id='title'>
                                            <h4>{item1.title}</h4>
                                        </div>
                                    </NavLink>
                                </li>
                            )
                        })
                    }


                </ul>
            </div>
            <h1>WANT.NEED</h1>
            <div id='showBoxList'>
                <p id='btnContainer'><button id='allNum'>+All(10943)</button></p>
                <ul>

                    {
                        showBoxList.map((item1: any) => {
                            return (
                                <li>
                                    <NavLink to={`/details/${item1.id}`} key={item1.id} >
                                        <img src={item1.img} />
                                        <p>{item1.title}</p>
                                        <div>{item1.sale}</div>
                                        <div id='prices'>
                                            <span id='downPrice'>{item1.price}</span>
                                            <span id='originPrice'>{item1.price - 40}</span>
                                            <span id='percentage'>40%</span>
                                        </div>
                                    </NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div >
    )
}

export default Exclusive;