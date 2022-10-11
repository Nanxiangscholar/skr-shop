import React, { useEffect, useState } from 'react';
import { Pagination, Select } from 'antd';
import './index.scss';
import Cards from '../Cards/index';
import { NavLink } from 'react-router-dom';
 const Recommend=({ newDate }: any)=> {
  // console.log(newDate);
  let [init, setInit] = useState([]);
  let [anCAr, setAnCar] = useState([]);
  let [count, setCount] = useState(30);
  let [pages, setPages] = useState(1);
  useEffect(() => {
    setInit(newDate);
  }, [newDate]);
  useEffect(() => {
    let arr = init.slice(count * (pages - 1), count * pages);
    setAnCar(arr);
  }, [init, count, pages]);
  const { Option } = Select;

  const handleChange = (value: any) => {
    // console.log(`selected ${value}`);
    setCount(value);
  };
  setTimeout(() => {
    // console.log(anCAr);
  }, 0);
  //  console.log(count);

  //   排序函数
  const onSortChange: (sort: any) => void = (sort) => {
    //排序方式的切换
    let sortType: any = [];
    if (sort === 'down') {
      sortType = [...newDate.sort((a: any, b: any) => b.sale - a.sale)];
    } else if (sort === 'down_piice') {
      sortType = [...newDate.sort((a: any, b: any) => b.price - a.price)];
    } else if (sort === 'up_piice') {
      sortType = [...newDate.sort((a: any, b: any) => a.price - b.price)];
    } else if (sort === 'default') {
      sortType = [...newDate];
    }

    // console.log(sortType);
    setInit(sortType);
  };

  return (
    <div className='dev-wb-primary-PrimaryList'>
      <div className='dev-wb-primary-PrimaryList-header'>
        <div className='dev-wb-primary-PrimaryList-header-lt'>
          <p>今日推荐</p>
        </div>
      </div>
      <div className='dev-wb-primary-PrimaryList-sort'>
        <span>共计{newDate.length}件</span>
        <div>
          <Select
            defaultValue='每页30'
            style={{
              width: 120,
            }}
            onChange={handleChange}
          >
            <Option value={30}>每页30</Option>
            <Option value={60}>每页60</Option>
            <Option value={90}>每页90</Option>
          </Select>
          &nbsp;&nbsp;
          <Select
            defaultValue='默认'
            style={{
              width: 120,
            }}
            onChange={(value: any) => {
              onSortChange(value);
            }}
          >
            <Option value='default'>默认</Option>
            <Option value='down_piice'>价格最高</Option>
            <Option value='up_piice'>价格最低</Option>
            <Option value='down'>销量最高</Option>
          </Select>
        </div>
      </div>

      {/* 数据渲染 */}
      <div className='dev-wb-primary-PrimaryList-AnCArd'>
        {anCAr.map((item: any, index) => {
          return (
            <div key={item.id} className='dev-wb-primary-PrimaryList-AnCArd-c'>
                <NavLink to={`/details/${item.id}`}>
                <Cards
                  imgSrc={item.img}
                  title={item.title}
                  width={''}
                  height={''}
                  description={`COST: ￥${item.price}  销量: ${item.sale}件`}
                />
            </NavLink>
              </div>
          );
        })}
      </div>
      {/*  */}
      <div className='dev-wb-primary-PrimaryList-Pagination'>
        <Pagination
          onChange={(page: any, pageSize: any) => {
            // console.log(page, pageSize);
            setPages(page);
          }}
          current={pages}
          defaultCurrent={1}
          pageSize={count}
          total={newDate.length}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
export default Recommend