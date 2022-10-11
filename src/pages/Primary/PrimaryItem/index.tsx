import React, { useState, useEffect } from 'react';
// list
import {  List } from 'antd';
import { NavLink } from 'react-router-dom';
import Recommend from '../../../components/Recommend/index';

export default function PrimaryItem({dataOne,datatwe}: any) {
//   console.log(props);
  // let dates = props.dataOne;
  // 存储排序方式
  let [newDates, setNewDatas] = useState<any>([]);
  //   存储热销数据
  let [dataHot, setDataHot] = useState<any>([]);
//   console.log(newDates);
  let [data,setData] = useState<any>([]);

  useEffect(() => {
    let initDates = dataOne.sort((a: any, b: any) => b.sale - a.sale);
    setNewDatas(initDates);
  }, [dataOne]);
  useEffect(() => {
    let a = newDates.slice(0, 10);
    setDataHot(a);
  }, [newDates]);
//   console.log(dataHot);
  useEffect(()=>{
    let arr:any = []
    dataHot.forEach((element:any) => {
        arr.push(<div className='ant-list-item-meta'>
        <div className='ant-list-item-meta-content'>
          <h4>
            <NavLink to={`/details/${element.id }`}>{element.title}</NavLink>
          </h4>
          <div>{element.sale}件</div>
        </div>
      </div>)
    });
    setData(arr)
  },[dataHot])
 
  return (
    <div className='dev-wb-primary-PrimaryItem'>
      
      <div className='dev-wb-primary-Aslide'>
        <div className='dev-wb-primary-Aslide-mask'>
          <p>鞋类</p>
          <span>stride.fun</span>
        </div>
        <div>
          <div className='dev-wb-primary-Aslide-header'>
            <p>热销</p>
          </div>
          <List size='small' bordered={false} dataSource={data} renderItem={(item:any) => <List.Item>{item}</List.Item>} />
        </div>
      </div>
      <Recommend newDate={datatwe}/>
    </div>
  );
}
