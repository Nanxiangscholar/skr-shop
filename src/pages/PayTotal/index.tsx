import { Button, Drawer, Radio, message } from 'antd';
import React, { useState, useRef, memo, useEffect, Fragment } from 'react';
import { getDefaultAddress, getAddress, defaultAddress } from '../../Api/address'
import {useLocation} from 'react-router-dom'
import ShopDetailed from './ShopDetailed/index';
import CommNodes from './CommNodes/index';
import Deliveryarea from 'components/Deliveryarea';
import {nanoid} from 'nanoid'
import './index.scss'
import { getCookie } from 'assets/ts/cookie';
let count: number = 0;


const PayTotal: React.FC = () => {
    let id = getCookie('userinfo').userInfo.id
    const {state} =useLocation()
    //新增收获地址
    const [flage,staFlage] = useState(false)
    const [newadds,stanewAdds] =useState<any>({})
    const [idss,staidss] = useState<any>(1)
    //单选
    const [open, setOpen] = useState(false);
    const hidebox: any = useRef(null)
    //默认地址
    const [defaultadds, satdefaultadds] = useState<any[]>([])
    //所有地址
    const [allAddresses, setallAddresses] = useState<any[]>([])
    //商品明细
    const [shoppay, staShoppay] = useState<any[]>([])
    //刷新
    const [refresh, setRefsesh] = useState(0)
    function newref(ssm:any){
        setRefsesh(ssm)
    }

    //编辑地址的显隐
    const showDrawer = () => {
        hidebox.current.style.display = 'block'
        setOpen(true);
    };

    const onClose = () => {
        hidebox.current.style.display = 'none'
        setOpen(false);
    };
    //初始数据（默认地址/所有地址） 
    useEffect(() => {
       
        console.log(id);
        
        //默认
        getDefaultAddress(id).then((infor: any) => {
            satdefaultadds(infor.data || [])
        })
        //所有
        getAddress(id).then((infor: any) => {
            setallAddresses(infor.data || [])
            
        })
        //商品明细
        staShoppay(state)
    }, [refresh])
    //单选框获取数据
    function valueradio(value: any) {
        let nums = value.target.value - 1
        count = nums
    }
    
    //切换地址
    function determine() {
        let arr = allAddresses[count]
        // console.log(arr);
        satdefaultadds([arr])
        message.success('切换地址成功')
        onClose()
    }
    //设置默认地址
    function setDefault(e: any) {
        let num = parseInt(e.target.title)
        let arr = allAddresses[num]
        defaultAddress(arr.id, 1, arr.customer_id).then((data) => {
            setRefsesh(num)
            message.success('设置默认地址成功')
        })
    }
    //数据编辑
    function dataEditing(obj:any){
        staFlage(true)
        stanewAdds(obj)
        staidss(nanoid())
    }
    function addNewress(){
        staFlage(true)
        stanewAdds({
        id: null,
        customer_id: id,
        name: null,
        tel: null,
        prime: null,
        address: null
        })
        staidss(nanoid())
    }
    return (
        <div className='paytotal'>
            <Deliveryarea bloen={flage} edit={newadds} ids={idss} newfun={newref}/>
            <div className='left'>
                <h1>结算</h1>
                <div className="address">
                    <div className='left-box'>
                        <span>收货地址</span>
                        <Button type="primary"
                            onClick={showDrawer}
                            style={{ background: 'black', border: '1px solid #000' }}
                        >
                            新增收获地址
                        </Button>
                    </div>
                    <div className='addressCount'>
                        <section>
                            {
                                defaultadds.map((item) => {
                                    return (
                                        <Fragment key={'好人'}>
                                            <p>收获人:&nbsp; <span>{item.name + '-' + item.tel}</span> </p>
                                            <p>地&nbsp;&nbsp;&nbsp;址：<span>{item.address}</span> </p>
                                        </Fragment>
                                    )
                                })
                            }
                        </section>
                        <div>
                            <p>默认地址</p>
                            <p>
                                <span onClick={showDrawer}>编辑</span>
                                /
                                <span onClick={showDrawer}>更多</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='obviousShop'>
                    <div className='left-box'>
                        <span>商品明细（共{shoppay.length}件）</span>
                    </div>
                    <div className='shop'>
                        <ShopDetailed objss={shoppay} />
                    </div>
                </div>
                <div className='address-hidebox' ref={hidebox}>
                    <Drawer
                        title="选择你的收货地址"
                        placement="right"
                        closable={false}
                        open={open}
                        getContainer={false}
                        size='large'
                        mask={false}
                        style={{ position: 'absolute', height: '-10px' }}
                        footer={<footer><span onClick={addNewress}>➕新增收获地址</span><p onClick={determine}>确认</p></footer>}
                    >
                        <span onClick={onClose} className='signOut'>❌</span>
                        <section>
                            <Radio.Group name="radiogroup" defaultValue={1} onChange={valueradio}>
                                <main>
                                    {
                                        allAddresses.map((item, i) => {
                                            return (
                                                <div className='boxli' key={i}>
                                                    <Radio value={i + 1}></Radio>
                                                    <div className='boxli-count1'>
                                                        <ul>
                                                            <li>收货人：{item.name + '-' + item.tel}
                                                                {
                                                                    (item.prime === 1) ? <span className='alone'>默认地址</span> : ''
                                                                }
                                                            </li>
                                                            <li>地址：{item.address}</li>
                                                        </ul>
                                                        <div className='li-edit'>
                                                            <p onClick={()=>dataEditing(item)}>编辑</p>
                                                            {
                                                                (item.prime === 1) ? '' : <p title={i + ''} onClick={(e) => setDefault(e)}>设置为默认地址</p>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </main>
                            </Radio.Group>
                        </section>
                    </Drawer>
                </div>
            </div>
            <div className='right'>
                <h1>请选择支付方式</h1>
                <div className='imgbox'>
                    <img src={require('../../assets/image/order/wecart.jpeg')} />
                    <img src={require('../../assets/image/order/alipay.jpeg')} />
                </div>
                <CommNodes objss={shoppay}/>
            </div>
        </div>
    );
};

export default memo(PayTotal)
