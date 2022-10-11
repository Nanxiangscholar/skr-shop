import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import './orderDetail.scss'


const { Step } = Steps;


const OrderDetail = () => {

    let navigate = useNavigate()

    const location = useLocation()
    //state为订单数据
    const { state } = location

    console.log(state);


    const goPay = () => {
        navigate('/payTotal', { state: state.skus })
    }


    return (
        <div id='orderDetail'>
            <div id='line'>
                <div id='lineTop'>
                    <h2>订单号:{state.code}</h2>
                    <h2>{state.update_time}</h2>
                </div>
                <div id='steps'>
                    <div id='step'>
                        <Steps>
                            <Step status="finish" title="待支付" icon={<UserOutlined />} />
                            <Step status="finish" title="代发货" icon={<SolutionOutlined />} />
                            <Step status="process" title="正在派送" icon={<LoadingOutlined />} />
                            <Step status="wait" title="以完成" icon={<SmileOutlined />} />
                        </Steps>
                    </div>
                    <div id='btn'>
                        <button id='check' onClick={() => { goPay() }}>立即付款</button><br />
                        <a href="/">取消订单</a>
                    </div>
                </div>
                {
                    state.skus.map((item: any) => {
                        return (
                            <div id='shopText'>
                                <div id='picture'>
                                    <img src={item} />
                                </div>
                                <div id='detail'>
                                    <p>{item.title}</p>
                                    <p>颜色：{item.param}</p>
                                    <p>数量：{item.num}</p>
                                </div>
                                <div id='price'>
                                    <h2>${item.actual_price}</h2>
                                    <h3>${item.detail_price}</h3>
                                </div>
                            </div>
                        )
                    })
                }


                <div id='address'>
                    <div id='preson'>
                        <h1>收件人信息</h1>
                        <ul>
                            <li>姓名：</li>
                            <li>电话：</li>
                            <li>地址：</li>
                        </ul>
                    </div>
                    <div id='kkkk'>
                        <h1>配送信息</h1>
                        <ul>
                            <li>配送方式：</li>
                            <li>运费：</li>
                        </ul>
                    </div>
                    <div id='xinxi2'>
                        <h1>付款信息</h1>
                        <ul>
                            <li>商品数量：</li>
                            <li>商品总额：</li>
                            <li>商品价格：</li>
                        </ul>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default OrderDetail;
