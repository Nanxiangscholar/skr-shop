import React,{Fragment,useState,useEffect}from 'react'
import NotFound1 from './Notfound1'
import NotFound2 from './Notfound2'
import NotFound3 from './Notfound3'
import './index.scss';

export default function NotFount() {
    
    // 随机生成1-3的数渲染对应的页面
    let [num,setNum]:any=useState() 
    let count=Math.floor(Math.random()*3 + 1)
    useEffect(()=>{
        setNum(count)
    },[])
    
    return (
        
        <Fragment>
            {/* 判断渲染哪个页面 */}
            {
                num==1?<NotFound1/>:num==2?<NotFound2/>:<NotFound3/>
            } 
        </Fragment>
        
        
    )
}
