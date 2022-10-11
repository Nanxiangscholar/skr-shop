import React from 'react'
import { Breadcrumb} from 'antd'
import './index.scss'

function PrivacyPolicy() {
	return (
		<div className='pri'>
			<h2 className='pri-title'>服务中心</h2>
			<ul className='pri-classify'>
				<li>常见问题</li>
				<li>消息</li>
				<li>会员福利</li>
				<li>查询</li>
				<li>客户反馈</li>
			</ul>
			<div className="pri-table">
				<div className="pri-table-left">
					<div className="pri-table-left-search">
						<h3><span>常见问题</span><span>搜索</span></h3>
						<span className='pri-search'>
							<input placeholder="검색 후 문의가 해결되지 않으면 1:1 상담을 이용하세요." type="text" className="left_inp ant-input" />
							<i aria-label="icon: search" className="anticon anticon-search"><svg viewBox="64 64 896 896" data-icon="search" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" className=""><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg></i>
						</span>
					</div>
					<div className="pri-table-left-hot">
						<span className="pri-hot">最爱的搜寻字词</span>
						<Breadcrumb>
							<Breadcrumb.Item><a href=''>First-level Menu</a></Breadcrumb.Item>
							<Breadcrumb.Item><a href="">Second-level Menu</a></Breadcrumb.Item>
							<Breadcrumb.Item><a href=''>Third-level Menu</a></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>
				<div className="pri-table-right">
					<p className="kehu">客户中心用户指南</p>
					<p className="tel">1566-1475</p>
					<p className="timer">营业时间:平日0900〜1800午餐时间：1230〜1330）</p>
				</div>
			</div>
			<ul className='pri-flow'>
				<li className='pri-flow-classify'>
					<h3>订单/付款/运输</h3>
					<ul>
						<li>订单/付款</li>
						<li>交货</li>
						<li>签发证明文件</li>
					</ul>
				</li>
				<li className='pri-flow-classify'>
					<h3>订单/付款/运输</h3>
					<ul>
						<li>订单/付款</li>
						<li>交货</li>
						<li>签发证明文件</li>
					</ul>
				</li>
				<li className='pri-flow-classify'>
					<h3>订单/付款/运输</h3>
					<ul>
						<li>订单/付款</li>
						<li>交货</li>
						<li>签发证明文件</li>
					</ul>
				</li>
				<li className='pri-flow-classify'>
					<h3>订单/付款/运输</h3>
					<ul>
						<li>订单/付款</li>
						<li>交货</li>
						<li>签发证明文件</li>
					</ul>
				</li>
				<li className='pri-flow-classify'>
					<h3>订单/付款/运输</h3>
					<ul>
						<li>订单/付款</li>
						<li>交货</li>
						<li>签发证明文件</li>
					</ul>
				</li>
			</ul>
			<div className='pri-link'>
				<h3>快速链接</h3>
				<ul>
					<li><span>订单历史/交货查询</span></li>
					<li><span>订单历史/交货查询</span></li>
					<li><span>订单历史/交货查询</span></li>
					<li><span>订单历史/交货查询</span></li>
					<li><span>订单历史/交货查询</span></li>
				</ul>
			</div>
			<div className="pri-problem">
				<div className="pri-problem-div">
					<div className="pri-problem-div-title">
						<h3>十大常见问题</h3>
						<span>+</span>
					</div>
					<div className="pri-problem-div-main">
						<p><span>Q1</span> <span>[开具证明文件]如何申请开具现金收据？</span></p>
						<p><span>Q1</span> <span>[开具证明文件]如何申请开具现金收据？</span></p>
						<p><span>Q1</span> <span>[开具证明文件]如何申请开具现金收据？</span></p>
						<p><span>Q1</span> <span>[开具证明文件]如何申请开具现金收据？</span></p>
						<p><span>Q1</span> <span>[开具证明文件]如何申请开具现金收据？</span></p>
						<p><span>Q1</span> <span>[开具证明文件]如何申请开具现金收据？</span></p>
						<p><span>Q1</span> <span>[开具证明文件]如何申请开具现金收据？</span></p>
						<p><span>Q1</span> <span>[开具证明文件]如何申请开具现金收据？</span></p>
					</div>
				</div>
				<div className="pri-problem-div">
					<div className="pri-problem-div-title">
						<h3>活动获奖者公告</h3>
						<span>+</span>
					</div>
					<div className="pri-problem-div-main">
						<p><span>Q1</span> <span>[开具证明文件]如何申请开具现金收据？</span></p>
						<p><span>Q1</span> <span>[开具证明文件]如何申请开具现金收据？</span></p>
						<p><span>Q1</span> <span>[开具证明文件]如何申请开具现金收据？</span></p>
						<p><span>Q1</span> <span>[开具证明文件]如何申请开具现金收据？</span></p>
					</div>
					<div className="pri-problem-div-title">
						<h3>消息</h3>
						<span>+</span>
					</div>
					<div className="pri-problem-div-main">
						<p><span>Q1</span> <span>[开具证明文件]如何申请开具现金收据？</span></p>
						<p><span>Q1</span> <span>[开具证明文件]如何申请开具现金收据？</span></p>
						<p><span>Q1</span> <span>[开具证明文件]如何申请开具现金收据？</span></p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PrivacyPolicy