import React from 'react'
import {Rate} from 'antd'
import './index.scss'
function Two() {
  let number = Math.floor(Math.random()*40 + 10)/10
  return (
    <>
      <ul className="nav">
        <li value={0}>DETAIL</li>
        <li value={1} className="on">REVIEW( 98 )</li>
        <li value={2}>Q&amp;A( 65 )</li>
        <li value={3}>RETURN &amp; DELIVERY</li>
      </ul>
      <div className='review'>
        <h4>产品满意度</h4>
        <p>这是购物者对产品的评价</p>
        <Rate disabled defaultValue={number} />
      </div>
    </>
  )
}

export default Two