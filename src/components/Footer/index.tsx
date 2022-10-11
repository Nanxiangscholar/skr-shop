import React from 'react'
import '../../themes/Footer/index.scss'
import beian from '../../assets/image/beian/beian.png'
import { NavLink } from 'react-router-dom'


const Footer = () => {

  return (
    <div className="footer">
     <div className="footerNav">
     <li><NavLink to='/about'>关于我们</NavLink></li>
     <li><NavLink to="/">咨询服务</NavLink></li>
     <li><NavLink to="/partner">合租伙伴查询</NavLink></li>
     <li><NavLink to="/terms">服务条款</NavLink></li>
     <li><NavLink to="/serviceCenter">隐私政策</NavLink></li>
     <li><NavLink to="/privacy">服务中心</NavLink></li>
     <li><NavLink to="/offers">招聘信息</NavLink></li>
     <li><NavLink to="/global">全球的</NavLink></li>
     </div>
     <div className="footerMsg">
      <div className='footMsg_left'>
        <p>网站名称</p>
        <p> © 2009-2021 Stride.fun 版权所有 ICP主体备案号: 苏ICP备2021007111号 </p>
        <div>
          <a href="#">
            <img src={beian} alt="" />
            <span style={{display:"inline-block",color:'#939393'}}>苏公网安备 32011402010859号</span>
          </a>
        </div>
      </div>
      <div className='footMsg_right'>
        <p>消费者损害赔偿保险</p>
        <p> 客户在以现金支付安全交易时可以使用Wconcept订阅的  消费者损害赔偿保险服务。 </p>
        <p>赔偿对象：不送/退货，拒绝退款/商场破产</p>
        <p>检查服务订阅事实</p>
      </div>
     </div>
    </div>
  )
}

export default Footer
