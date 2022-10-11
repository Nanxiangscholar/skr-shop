import React,{useEffect,useState} from 'react';
import HotTag from './HotTag';
import Breadcrumb from './Breadcrumb';
import PrimaryItem from './PrimaryItem';
import { useParams } from "react-router-dom";
import './index.scss';
import { getTypeTwoList } from 'Api/api';



const Primary:React.FC = () => {
  let [dataone,setDataOne] = useState<any>([])
  let [datatwe,setDataTwe] = useState<any>([])
  const {title} = useParams();
  // console.log(title);
  useEffect(()=>{
    // 获取商品的分类渲染
    getTypeTwoList(title).then(({res}:any)=>{
      
      setDataOne(res)
      // console.log(res); 
    })
    getTypeTwoList(title).then(({res}:any)=>{
      setDataTwe(res)
      // console.log(res); 
    })
  },[title])
  return (
    <div className='dev-wb-primary'>
      <div className='dev-wb-primary-title'>
        <p>{title}</p>
      </div>
      {/* 搜索 */}
      <HotTag title={title}/>
      {/* 面包屑 */}
      <Breadcrumb />
      {/* 热销 / 今日推荐 */}
      <PrimaryItem dataOne={dataone} datatwe={datatwe}/>
    </div>
  );
};
export default Primary;
