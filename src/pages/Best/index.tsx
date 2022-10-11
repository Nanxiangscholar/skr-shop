import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import All from './all'
import Shose from './shose'
import Clothes from './clothes'
import Parts from './parts'
import Children from './children'
import './index.scss'
import { ShopImg } from 'Api/bestShop'

function Best() {
	// 商品分类
	let classify: string[] = ['All', '鞋类', '服饰', '配件', '儿童专区']

	// 切换渲染的头部组件
	let [useComponent, setComponent]: any = useState('')
	let component: any[] = ['', <Shose></Shose>, <Clothes></Clothes>, <Parts></Parts>, <Children></Children>]
	const changeClass = (cla: string, index: number) => {
		setComponent(component[index])
		if (cla === 'All') {
			setKind(null)
		} else {
			setKind(cla)
		}
	}

	// 切换渲染的数据
	let [allImg, setAllImg]: any = useState()
	let [kind, setKind]: any = useState(null)
	useEffect(() => {
		if (kind !== null) {
			let obj = {
				parent_name: kind,
				end: 99
			}
			ShopImg(obj).then((data: any) => {
				// console.log(data);
				setAllImg(data)
			})
		} else {
			setAllImg(null)
		}
	}, [kind])

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

	return (
		<div className='best'>
			<div className="best-title">
				<p>最好的</p>
			</div>
			<ul className='best-classify' ref={parent} onClick={(e) => { changeStyle(e) }}>
				{
					classify.map((item: string, index: number) => {
						return (
							<li className='best-classify-list' key={index} onClick={() => { changeClass(item, index) }}>{item}</li>
						)
					})
				}
			</ul>
			{useComponent}
			{
				kind ? <div className='child'>
					<select>
						<option>日常的</option>
						<option>每周</option>
						<option>每月一次</option>
					</select>
					<div className='child-hot'>
						<ul className='child-hot-top'>
							{
								allImg ? allImg.map((shop: any, index: number) => {
									while (index < 3) {
										return (
											<li key={index} onClick={() => { goDetail(shop.id) }}>
												<img src={shop.img} alt="" />
												<div className='child-sort'>
													<strong>{index + 1}</strong>
													<div className='child-sort-best'>BEST</div>
													<div className='child-sort-triangle'></div>
												</div>
												<div className="textMax">
													<div className="text_wrap">
														<div className="brand">LOEUVRE</div>
														<div className="front"> {shop.title} </div>
														<div className="product"> Sac de Trompette Small FA0SB013-10 </div>
													</div>
													<div className="price">
														<span className="discount_price">{shop.price}</span>
														<span className="base_price">42,000</span>
														<span className="discount_rate">10%</span>
													</div>
													<p className="reservation">预定</p>
													<div className="review_box">
														<div className="graph">
															<span className="inner" style={{ width: '98%' }}></span>
														</div>
														<div className="review_count"></div>
													</div>
												</div>
											</li>
										)
									}
								}) : null
							}
						</ul>
						<ul className='child-hot-bottom'>
							{
								allImg ? allImg.map((shop: any, index: number) => {
									while (2 < index && index < 7) {
										return (
											<li key={index} onClick={() => { goDetail(shop.id) }}>
												<img src={shop.img} alt="" />
												<strong>{index + 1}</strong>
												<div className="textMax">
													<div className="text_wrap">
														<div className="brand">vunque</div>
														<div className="front"> {shop.title} </div>
														<div className="product"> Toque tote S (토크 토트 스몰) Light beige </div>
													</div>
													<div className="price">
														<span className="discount_price">{shop.price}</span>
														<span className="base_price">42,000</span>
														<span className="discount_rate">10%</span>
													</div>
													<p className="reservation">预定</p>
												</div>
											</li>
										)
									}
								}) : null
							}
						</ul>
					</div>
					<div className='child-list'>
						{
							allImg ? allImg.map((shop: any, index: number) => {
								while (index > 6) {
									return (
										<li key={index} onClick={() => { goDetail(shop.id) }}>
											<img src={shop.img} alt="" />
											<strong>{index + 1}</strong>
											<div className="textMax">
												<div className="text_wrap">
													<div className="brand">Dunst for WOMEN</div>
													<div className="front"> {shop.title} </div>
													<div className="product">[04/23 예약배송]</div>
												</div>
												<div className="price">
													<span className="discount_price">{shop.price}</span>
													<span className="base_price">42,000</span>
													<span className="discount_rate">10%</span>
												</div>
												<p className="reservation">预定</p>
											</div>
										</li>
									)
								}
							}) : null
						}
					</div>
				</div> : <All />
			}
		</div>
	)
}

export default Best