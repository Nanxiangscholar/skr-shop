import React from 'react'

export default function NotFound3() {
  return (
    <div className='notfound'>
            <div className='notfound-body'>
                <img src="https://volunteer.cdn-go.cn/404/latest/img/lamp/dianliangxiangcun1-1600.jpg" alt="404!你要访问的页面走丢了" />
                <div className='notfound-top'>
                    <div className='notfound-center'>
                        <div className='notfound-content'>404</div>
                        您访问的页面在黑夜中走丢了
                        <br />
                        不过您还可以和腾讯志愿者一起
                        <br />
                        <i>
                            <b>用行动点亮一个新的村庄</b>
                        </i>
                    </div>
                    <div className='notfound-bottom-QRcode'>
                        <img src="https://volunteer.cdn-go.cn/404/latest/img/coffeeQR.jpg" alt="image" style={{width:'230px'}}/>
                        <br />
                        扫码点亮一个村庄
                        <div className='notfound-bottom-text'>
                            图中路灯安装于四川省什邡市马井镇万和村
                            <br />
                            安装时间:2020年4月19日
                            <br />
                            拍摄时间:2020年4月25日
                            <br />
                            （感恩基金会供稿）
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
