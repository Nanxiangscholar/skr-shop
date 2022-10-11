
import { Modal } from 'antd';
import React, { useState, useRef, useEffect, memo } from 'react';
import './index.scss';
import Sanji from './Sanji';
//修改地址 //新增地址
import { modifyAddress, addAddress } from '../../Api/address';
import { useDispatch } from 'react-redux';
import { getAddress } from '../../redux/actions/user';
import { getCookie } from 'assets/ts/cookie';


//ids 唯一标识
function Deliveryarea({ bloen, edit = {}, ids ,newfun}: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 是否是编辑信息
    const [addressid, staAddressid] = useState<any>(null)
    // 是否是默认
    const [falss, stafalss] = useState<boolean>()
    // 姓名的value                          
    const namevaule: any = useRef(null);
    // 电话的value
    const phonevaule: any = useRef(null);
    // 详细地址的value
    const delvaule: any = useRef(null);
    const [arrobj, staarrobj] = useState<any>({})
    // 存储三级联动的值
    const [areaData, setAreaData] = useState<any>({})
    // 回调函数接受地区值
    const handleArea = (area: object) => {
        setAreaData(area)
    }

    const dispatch = useDispatch();
    //改变 状态
    useEffect(() => {
        setIsModalOpen(bloen)
        bloen = false
    }, [ids])
    // 通过 两个 时间段 因为获取的是上一次的值 获取不到当下是useEffect 的一个恶心点
    // 且通过 使用 消息订阅 变化 
    useEffect(() => {
        if (edit.customer_id) {
            // console.log(edit.customer_id);
            namevaule.current.value = edit.name
            phonevaule.current.value = edit.tel
            delvaule.current.value = edit.address
            staAddressid(edit.id)
        }
    }, [isModalOpen])
    // 控制遮罩层显示隐藏

    // 点击添加地址 判断你是否是编辑信息 addressid 有值为编辑 为null 则为新增信息
    const handleOk = () => {
        let name = namevaule.current.value
        let phone = phonevaule.current.value
        let del = delvaule.current.value
        let address = areaData.sheng + '-' + areaData.shi + '-' + areaData.qu + '-' + del

        if (addressid) {
            modifyAddress(name, phone, address, addressid, edit.prime, edit.customer_id).then((data) => {
                newfun(phone)
            })
        } else {
            if (falss) {
                addAddress(name, phone, address, edit.customer_id, true).then((data) => {
                    newfun(phone)
                    dispatch<any>(getAddress({customer_id:getCookie('userinfo').userInfo.id}))
                    newfun(phone);
                })
            } else {
                addAddress(name, phone, address, edit.customer_id, false).then((data) => {
                    dispatch<any>(getAddress({customer_id:getCookie('userinfo').userInfo.id}))
                    newfun(phone);
                })
            }
        }

        setIsModalOpen(false);
        // 点击新增地址后清除输入框的值
        namevaule.current.value = '';
        phonevaule.current.value = '';
        delvaule.current.value = '';
    };
    function setDefaults(e: any) {
        let aaa = e.target.checked
        stafalss(aaa)
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal title="收货地址" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} cancelText={'返回'} okText={'保存地址'}>
                <div className='address_detail'>
                    <div className="info">
                        <div > 收货人
                            <span style={{ color: 'red' }}>*</span>
                            <input placeholder="姓名" type="text" className="ant-input" ref={namevaule} />
                        </div>
                        <div > 手机号码
                            <span style={{ color: 'red' }}>*</span>
                            <input placeholder="手机号码" type="text" className="ant-input" ref={phonevaule} />
                        </div>
                    </div>
                    <div className="address_item">
                        <div > 省/直辖市
                            <span style={{ color: 'red' }}>*</span>
                        </div>
                        <div > 市 <span style={{ color: 'red' }}>*</span>
                        </div>
                        <div > 区/县
                            <span style={{ color: 'red' }}>*</span>
                        </div>
                    </div>
                    <div >
                        <Sanji handleArea={handleArea} key={1} />
                    </div>
                    <div className='detail_address'>
                        <div>详细地址
                            <span style={{ color: 'red' }}>*</span>
                        </div>
                        <input placeholder="详细地址" type="text" className="ant-input" ref={delvaule} />
                    </div>
                    <div className="default">
                        <input type="checkbox" id="default" value="1" onChange={(e) => setDefaults(e)} />
                        <label htmlFor="default">设置为默认地址</label>
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default memo(Deliveryarea);
