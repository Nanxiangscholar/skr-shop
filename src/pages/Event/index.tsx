import React, { useEffect, useRef, useState } from 'react'
import { ShopImg } from 'Api/bestShop'
import './event.scss'
import Swiper from '../../components/Swiper'
import { getSwiper } from 'Api/api'
import E1 from '../../assets/image/event/E1.png'
import E2 from '../../assets/image/event/E2.jpg'
import E3 from '../../assets/image/event/E3.png'
import E4 from '../../assets/image/event/E4.jpg'
import { NavLink,useNavigate } from 'react-router-dom'
import All from './all'
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd'


export default function Event() {

	let [swiperList, setSwiperList] = useState([])

	useEffect(() => {
		getSwiper().then((data: any) => {
			setSwiperList(data.res)
		})
	}, [])

	// 商品分类
	let classify: string[] = ['All', '鞋类', '服饰', '配件', '儿童专区']

	// 切换渲染的数据
	let [allImg, setAllImg]: any = useState()
	let [kind, setKind]: any = useState(null)
	useEffect(() => {
		if (kind !== null) {
			let obj = {
				parent_name: kind,
				end: 100
			}
			ShopImg(obj).then((data: any) => {
				setAllImg(data)
			})
		} else {
			setAllImg(null)
		}
	}, [kind])

	const changeClass = (cla: string) => {
		if (cla === 'All') {
			setKind(null)
		} else {
			setKind(cla)
		}
	}

	// 点击改变样式
	let parent: any = useRef(null)
	const changeStyle = (e: any) => {
		let renth = parent.current.children;
		for (let i = 0; i < renth.length; i++) {
			renth[i].style.border = '1px solid #ccc'
			renth[i].style.borderBottom = '2px solid #000'
		}
		e.target.style.border = '2px solid #000';
		e.target.style.borderBottom = "none"
	}

	// 跳转详情页
	let navigate = useNavigate()
	const goDetail = (id: number) => {
		navigate(`/details/${id}`)
	}

	// 分页
	const [current, setCurrent] = useState(1);
  const onChange: PaginationProps['onChange'] = (page:number) => {
    setCurrent(page);
  };

	return (
		<div id='event'>
			<h1>EVENT</h1>
			<div id='eventSwiper'>
				<Swiper Swidth='1000px' Sheight='385px' loop={true} imgList={swiperList} />
			</div>
			<div id='cet'>
				<div id='section'>
					<div id='sec_lt'>
						<h2 id='sec_lt_top'>MY❤BRAND EVENT</h2>

						<div id='sec_lt_down'>
							<p> 로그인 하시면 MY❤에 등록한 BRAND의 최근 EVENT를 확인할 수 있습니다. </p>
							<button id='btn'>로그인</button>
						</div>
					</div>

					<div id='sec_rt'>
						<h2>BENEFIT</h2>
						<ul>
							<li style={{ border: 'none' }}><img src={E1} /></li>
							<li><img src={E2} /></li>
							<li><img src={E3} /></li>
							<li><img src={E4} /></li>
						</ul>
					</div>
				</div>
			</div>

			<div id='textContainer'>
				<div id='text'>
					<div id='title'>
						<h2>hot keyword</h2>
					</div>
					<div id='main'>
						<NavLink to={'/home'}>21SS도 함께할 베스트 아이템! #The Best, Forever</NavLink>
					</div>
				</div>
			</div>
			<div id='text_search'>
				{/* <input type="text" />
                <button></button> */}
			</div>

			<div className='best'>
				<ul className='best-classify' ref={parent} onClick={(e) => { changeStyle(e) }}>
					{
						classify.map((item: string, index: number) => {
							return (
								<li className='best-classify-list' key={index} onClick={() => { changeClass(item) }}>{item}</li>
							)
						})
					}
				</ul>
				{
					kind?<div className='child'>
						<select>
							<option>日常的</option>
							<option>每周</option>
							<option>每月一次</option>
						</select>
						<ul className='child-list'>
							{
								allImg?allImg.map((shop:any,index:number)=>{
									if(index >= (10*(current-1)) && index <= (10*current-1)){
										return (
											<li key={index} onClick={()=>{goDetail(shop.id)}}>
												<img src={shop.img} alt="" />
												<p>{shop.title}</p>
											</li>
										)
									}
								}):null
							}
						</ul>
						<Pagination current={current} onChange={onChange} total={100} showSizeChanger={false} />
					</div>:<All />
				}
			</div>


		</div>
	)
}
