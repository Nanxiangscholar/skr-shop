import React,{useMemo,useState} from 'react'
import Magnifier from './Magnifier'
import DetailCount from './DetailCount'
import { ShopDetails } from '../../Api/details'
import {useParams} from 'react-router-dom'
import './index.scss'


function Details() {
    //数据渲染
    let { spu_id  }:any  = useParams();
    let [data, staData] = useState<any[]>([])
    let [imges, staImges] = useState<any[]>([])
    useMemo(async () => {
        let msg: any = await ShopDetails( spu_id || 982)
        let imges = JSON.parse(msg.data[0].imgs)
        staData(msg.data)
        staImges(imges)
    }, [])

    return (
        <div className='details'>
            <Magnifier data={data} imges={imges} />
            <DetailCount imges={imges}/>
        </div>
    )
}

export default Details