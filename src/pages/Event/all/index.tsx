import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopImg } from 'Api/bestShop'
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd'

function All() {
	// 获取数据
	let [allImg, setAllImg]: any = useState()
	let shoes = {
		parent_name: '鞋类',
		end: 46
	}
	let clothes = {
		parent_name: '服饰',
		end: 44
	}
	let parts = {
		parent_name: '配件',
		end: 5
	}
	let children = {
		parent_name: '儿童专区',
		end: 10
	}
	useEffect(() => {
		let shoplist: any[] = []
		let sho = ShopImg(shoes).then((data: any) => {
			shoplist.push(...data)
		})
		let clo = ShopImg(clothes).then((data: any) => {
			shoplist.push(...data)
		})
		let par = ShopImg(parts).then((data: any) => {
			shoplist.push(...data)
		})
		let chi = ShopImg(children).then((data: any) => {
			shoplist.push(...data)
		})
		Promise.all([sho, clo, par, chi]).then(() => {
			shoplist.sort(function (small: any, big: any) {
				return (big.sale - small.sale)
			});
			setAllImg([...shoplist])
		})
		
	}, [])

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
		<div className='child'>
			<select>
				<option>日常的</option>
				<option>每周</option>
				<option>每月一次</option>
			</select>
			<ul className='child-list'>
				{
					allImg ? allImg.map((shop: any, index: number) => {
						if(index >= (10*(current-1)) && index <= (10*current-1)){
							return (
								<li key={index} onClick={()=>{goDetail(shop.id)}}>
									<img src={shop.img} alt="" />
									<p>{shop.title}</p>
								</li>
							)
						}
					}) : null
				}
			</ul>
				<Pagination current={current} onChange={onChange} total={100} showSizeChanger={false} />
		</div>
	)
}

export default All