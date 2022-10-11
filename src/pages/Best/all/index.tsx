import React,{useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { ShopImg } from 'Api/bestShop'

function All() {
	// 获取数据
	let [allImg,setAllImg]:any = useState()
	let shoes = {
		parent_name:'鞋类',
		end:46
	}
	let clothes = {
		parent_name:'服饰',
		end:42
	}
	let parts = {
		parent_name:'配件',
		end:5
	}
	let children = {
		parent_name:'儿童专区',
		end:10
	}
	useEffect(()=>{
		let shoplist:any[] = []
		let sho = ShopImg(shoes).then((data:any)=>{
			shoplist.push(...data)
		})
		let clo = ShopImg(clothes).then((data:any)=>{
			shoplist.push(...data)
		})
		let par = ShopImg(parts).then((data:any)=>{
			shoplist.push(...data)
		})
		let chi = ShopImg(children).then((data:any)=>{
			shoplist.push(...data)
		})
		Promise.all([sho,clo,par,chi]).then(()=>{
			shoplist.sort(function (small:any, big:any) {
				return (big.sale - small.sale)
			});
			setAllImg([...shoplist])
		})
	},[])

	// 跳转详情页
	let navigate = useNavigate()
	const goDetail = (id:number)=>{
		navigate(`/details/${id}`)
	}
	
	return (
		<div className='child'>
			<ul className='child-classify'></ul>
			<select>
			<option>日常的</option>
			<option>每周</option>
			<option>每月一次</option>
		</select>
			<div className='child-hot'>
				<ul className='child-hot-top'>
					{
						allImg?allImg.map((shop:any,index:number)=>{
							while(index<3){
								return (
									<li key={index} onClick={()=>{goDetail(shop.id)}}>
										<img src={shop.img} alt="" />
										<div className='child-sort'>
											<strong>{index+1}</strong>
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
													<span className="inner" style={{width: '98%'}}></span>
												</div>
												<div className="review_count"></div>
											</div>
										</div>
									</li>
								)
							}
						}):null
					}
				</ul>
				<ul className='child-hot-bottom'>
					{
						allImg?allImg.map((shop:any,index:number)=>{
							while(2<index && index<7){
								return (
									<li key={index} onClick={()=>{goDetail(shop.id)}}>
										<img src={shop.img} alt="" />
										<strong>{index+1}</strong>
										<div className="textMax">
											<div className="text_wrap">
												<div className="brand">vunque</div>
												<div className="product"> {shop.title} </div>
												<div className="front"> Toque tote S (토크 토트 스몰) Light beige </div>
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
						}):null
					}
				</ul>
			</div>
			<div className='child-list'>
				{
					allImg?allImg.map((shop:any,index:number)=>{
						while(index>6){
							return (
								<li key={index} onClick={()=>{goDetail(shop.id)}}>
									<img src={shop.img} alt="" />
									<strong>{index+1}</strong>
									<div className="textMax">
										<div className="text_wrap">
											<div className="brand">Dunst for WOMEN</div>
											<div className="product"> {shop.title} </div>
											<div className="front">[04/23 예약배송]</div>
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
					}):null
				}
			</div>
		</div>
	)
}

export default All