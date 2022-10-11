import React from 'react'
import './index.scss'
import { Table } from 'antd'

function ServiceCenter() {
	return (
		<div className='ser'>
			<div className='ser-title'>
				<h2>隐私政策</h2>
			</div>
			<div className="ser-main">
				<p> Double U Concept Korea Co.，Ltd.（以下简称``公司''）重视用户信息并遵守相关法律法规。 </p>
				<p> 因此，公司已根据《信息和通信网络使用促进和信息保护法》和《个人信息保护法》等相关法律制定了个人信息处理政策，并在公司网站上进行了披露，以便用户可以随时轻松浏览。 </p>
				<p> 本政策可能会根据公司政策不时更改，如果重要内容发生更改，我们将通过网站通知用户，以便用户可以检查更改。 </p>
			</div>
			<div className="ser-rule">
				<div className="ant-row">
					<div className="ant-col ant-col-8">
						<p>第一条总则</p>
						<p>第二条个人信息的收集和使用</p>
						<p>第三条向第三方提供个人信息</p>
						<p>第四条链接网站</p>
						<p>第5条个人信息的处理委托</p>
					</div>
					<div className="ant-col ant-col-8">
						<p>第一条总则</p>
						<p>第二条个人信息的收集和使用</p>
						<p>第三条向第三方提供个人信息</p>
						<p>第四条链接网站</p>
						<p>第5条个人信息的处理委托</p>
					</div>
					<div className="ant-col ant-col-8">
						<p>第一条总则</p>
						<p>第二条个人信息的收集和使用</p>
						<p>第三条向第三方提供个人信息</p>
						<p>第四条链接网站</p>
						<p>第5条个人信息的处理委托</p>
					</div>
				</div>
			</div>
			<div className="ser-gen">
				<h3>第一条总则</h3>
				<p> 1.“个人信息”是指有关在世个人的信息，包括可用于通过姓名，移动电话号码等来识别个人的信息（包括即使特定个人无法将其与其他信息轻松组合的信息）仅由信息识别）说。 </p>
				<p> 2.公司遵守相关法律法规，安全处理有价值用户的个人信息。通过个人信息处理政策，公司告知使用用户提供的个人信息的目的和方法，以及正在采取哪些措施来保护个人信息。 </p>
				<p> 3.公司在网站的第一个屏幕上披露隐私政策，以便用户可以随时轻松查看它。 </p>
				<p> 4.为了不断改进个人信息处理策略，建立了修改个人信息处理策略的必要步骤，并且在进行修改时，通过版本管理，用户可以轻松地查看修改后的事项。 </p>
			</div>
			<div className="ser-gen">
				<h3>第二条总则</h3>
				<p> 1.“个人信息”是指有关在世个人的信息，包括可用于通过姓名，移动电话号码等来识别个人的信息（包括即使特定个人无法将其与其他信息轻松组合的信息）仅由信息识别）说。 </p>
				<Table
            style={{ marginTop: 8 }}
            columns={[
              {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: '收集目的',
                dataIndex: 'purpose',
                key: 'purpose',
              },
              {
                title: '分配',
                dataIndex: 'distribution',
                key: 'distribution',
              },
              {
                title: '收集物品',
                dataIndex: 'goods',
                key: 'goods',
              },
            ]}
          />
			</div>
		</div>
	)
}

export default ServiceCenter