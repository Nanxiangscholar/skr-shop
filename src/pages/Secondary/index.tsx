import React,{useEffect,useState} from 'react'
import { useParams } from "react-router-dom";
import '../../themes/Secondary/index.scss';
import Recommend from '../../components/Recommend/index';
import { getTypeTwoListGoods } from '../../Api/api';

export default function Secondary() {
    const {Secondname} = useParams<string>(); 
    let [initData,setInitData] = useState<never[]>([])
    
    useEffect(()=>{
        getTypeTwoListGoods(Secondname).then(({data})=>{
            setInitData(data)
        })
    },[Secondname])
    return (
        <div className='SeconDary'>
            <div className="title">
                <p className='p_SeconDary'>{Secondname}</p>
            </div>
            <div>
                <div className="ant-breadcrumb">
                    <span>
                        <span className="ant-breadcrumb-link"><a data-v-a3914b40="" href="#/home" className=""> Home </a></span>
                        <span className="ant-breadcrumb-separator">/</span>
                    </span>
                    <span>
                        <span className="ant-breadcrumb-link">
                            <span > Secondary </span>
                        </span>
                        <span className="ant-breadcrumb-separator"></span>
                    </span>
                </div>
            </div>
            <div>
                <div className='dev-wb-brand'>
                    <p>沙滩凉鞋专区</p>
                </div>
            </div>
            <Recommend newDate={initData}/>
           
        </div>
    )
}
