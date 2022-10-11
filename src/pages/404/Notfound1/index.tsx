import React from 'react'

export default function NotFound1() {
    return (
        <div className='notfound'>
            <div className='notfound-body'>
                <img src={require('../../../assets/image/notfound-img/a.jpg')} alt="" />
                <div className='notfound-top'>
                    <div className='notfound-center'>
                        <div className='notfound-content'>404</div>
                        您访问的页面已经迷失
                        <br />
                        在寒冷的黑夜里
                        <br />
                        不过您还可以和腾讯志愿者一起
                        <br />
                        <i>
                            <b>为黑暗中的咖啡师送去一份温暖</b>
                        </i>
                    </div>
                    <div className='notfound-bottom' >
                        <img src="https://volunteer.cdn-go.cn/404/latest/img/coffeeQR.jpg" alt="" />
                        <br />
                        扫码送上一份支持
                    </div>
                </div>
            </div>
        </div>
    )
}
