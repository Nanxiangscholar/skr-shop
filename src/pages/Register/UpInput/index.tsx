import React from 'react'

function UpInput() {
  return (
    <div className='upInput'>
        <h1>注册</h1>
        <div className="upregister">
                <div className="left">
                    <li><img src={require('../../../assets/image/register/modify.png')} alt="" /></li>
                    <p>1 信息输入</p>
                </div>
                <div className="middle">
                    <li><img src={require('../../../assets/image/register/right.png')} alt="" /></li>
                </div>
                <div className="right">
                    <li><img src={require('../../../assets/image/register/success.png')} alt="" /></li>
                    <p>2 注册完成</p>
                </div>
            </div>
    </div>
  )
}

export default UpInput