import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Modal, message, Table } from 'antd';
import { ChangePassword } from '../../Api/changepassword';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import { nanoid } from 'nanoid';
import { getAddress, setAddDefault, delAddressAction } from '../../redux/actions/user';
import { getCookie } from '../../assets/ts/cookie';
import Deliveryarea from '../../components/Deliveryarea/index';
import { getUserOrder } from '../../Api/api'



interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}





const Mypage: React.FC = () => {

  let navgiate = useNavigate()

  let [order, setOrder] = useState([])

  const columns: any = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '订单日期',
      dataIndex: 'update_time',
      key: 'update_time',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: '订单号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '商品信息',
      dataIndex: `title`,
      key: `title`,
    },
    {
      title: '数量',
      dataIndex: 'num',
      key: 'num',
    },
    {
      title: '商品价格',
      dataIndex: 'money',
      key: 'money',
    },
    {
      title: '进度',
      dataIndex: 'goTo',
      key: 'goTo',
    },
  ];

  let Time = (time: any) => {
    if (typeof time !== 'number') {
      time = time * 1
    }
    var date = new Date(time);  // 参数需要毫秒数，所以这里将秒数乘于 1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + '';
    return (Y + M + D)
  }

  let user_id = getCookie('userinfo').userInfo.id;
  let obj = {
    customer_id: user_id,
  }


  useEffect(() => {
    getUserOrder(obj).then((res) => {
      setOrder(res.data)

      res.data.forEach((item: any) => {
        item.update_time = Time(item.update_time)
        item.title = item.skus[0].title
        item.num = item.skus[0].num
        item.goTo = '待支付'
      })
    })
  }, [])





  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const counter = useSelector((state: any) => state.user);

  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  // 控制弹出框显示隐藏
  const [delShow, setDelShow] = useState<boolean>(false);
  const [flage, staFlage] = useState(false)
  const [newadds, stanewAdds] = useState<any>({})
  const [idss, staidss] = useState<any>(1)
  //刷新
  const [refresh, setRefsesh] = useState(0)

  // const [open, setOpen] = useState(false);
  function newref(ssm: any) {
    setRefsesh(ssm)
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    // 获取用户输入的信息
    let uname = username.current?.value;
    let pword = password.current?.value;
    if (uname?.trim() === '' || pword?.trim() === '') {
      message.error('请输入正确的用户名或者密码');
      return;
    }
    // 更改密码操作
    ChangePassword(uname, pword).then((res: any) => {
      console.log(res);
      if (res.code == 200) {
        message.success('更改成功');
      }
      if (res.code == 401) {
        message.error('更改失败');
      }
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    let { userInfo: { id } } = getCookie('userinfo');
    dispatch<any>(getAddress({
      customer_id: id
    }))
  }, [])

  const defaultToo = (Id: number, prime: number) => {
    dispatch<any>(setAddDefault(Id))
  }

  const delAddress = (id: number) => {
    // console.log(id);
    dispatch<any>(delAddressAction({ id }))
  }

  //编辑地址的显隐
  const showDrawer = () => {
    staFlage(true)
    staidss(nanoid())
    dataEditing()
  };

  //数据编辑
  function dataEditing() {
    staFlage(true)
    staidss(nanoid())
    stanewAdds({
      id: null,
      customer_id: 66,
      name: null,
      tel: null,
      prime: null,
      address: null
    })
  }

  return (
    <div className='mypage'>
      <Deliveryarea bloen={flage} edit={newadds} ids={idss} newfun={newref} />
      <div className='mypage-top'>
        <h1>个人中心</h1>
        <p className='titleContent'>
          <span className='content-left'>
            <span>
              <NavLink to='/home'>主页</NavLink>
            </span>
            <em>&gt;</em>
          </span>
          <span className='per-center'>个人中心</span>
        </p>
        <p className='change-password'>
          {/* <span>修改密码</span> */}
          <Button type='text' onClick={showModal}>
            修改密码
          </Button>
          <Modal
            title='修改密码'
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            cancelText={'取消'}
            okText={'确定'}
          >
            <div className='Login-useName'>
              <label htmlFor=''>用户名</label>
              <input type='text' name='username' id='username' placeholder='请输入用户名' ref={username} />
            </div>
            <div className='Login-password'>
              <label htmlFor=''>密码</label>
              <input type='password' name='password' id='password ' placeholder='请输入密码' ref={password} />
            </div>
          </Modal>
        </p>
      </div>
      <div className='mypage-center'>
        <div className='mypagetop'>
          <ul>
            <li>我的❤</li>
            <li>订单管理</li>
            <li>我的活动</li>
            <li>购物优惠</li>
            <li>信息管理</li>
            <li>查询内容</li>
          </ul>
        </div>
        <div className='mypagecontent'>
          <div className='innercontent'>
            <div className='inner'>
              <ul>
                <li>我的❤物品</li>
                <li>我的❤品牌</li>
                <li>我的❤风格</li>
              </ul>
              <ul>
                <li>订购/配送查询</li>
                <li>取消/交换/退货查询</li>
                <li>收到的礼品盒</li>
                <li>签发凭证</li>
              </ul>
              <ul>
                <li>进货通知</li>
                <li>活动参与明细</li>
                <li>WDNA参与明细</li>
              </ul>
              <ul>
                <li>会员等级</li>
                <li>优惠券</li>
                <li>W POINT</li>
                <li>预收款</li>
                <li>购物券</li>
              </ul>
              <ul>
                <li>修改会员信息退款</li>
                <li>管理地址簿</li>
                <li>W.工资管理</li>
                <li>账户管理</li>
                <li>会员退出</li>
              </ul>
              <ul>
                <li>商品Q&A</li>
                <li>商品评价</li>
                <li>1:1查询</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='mypage-bottom'>
        <div className='activeimg'>
          <NavLink to='/home'>
            <img src={require('../../assets/image/mypage/pic.jpg')} alt='' />
          </NavLink>
        </div>
        <div id='Mypage'>
          <div id='text'>
            <h1>个人中心</h1>
          </div>
          <div id='shopOrder'>
            <div id='headerTop'>
              <h2>最近订单</h2>
              <h4>more+</h4>
            </div>
            <div id='content'>
              <Table columns={columns} dataSource={order}
                onRow={(record) => ({
                  onClick: () => {
                    navgiate(`/orderDetail`, { state: record })
                  },
                })} />
            </div>
          </div>
        </div>




        <div className='myShopping-address'>
          <h2>我的地址</h2>
          <div className='addAddress' onClick={showDrawer}>
            <button>+</button>
            <span>新增地址</span>
          </div>
        </div>
        <table className='orders'>
          <thead>
            <tr>
              <th>收货人姓名</th>
              <th>收货人地址</th>
              <th>收货人电话</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {
              counter.map((ele: any) => {
                return (
                  <tr>
                    <td>{ele.name}</td>
                    <td>
                      {ele.address}
                      {ele.prime ? <button className='nodefaultTrue'>默认地址</button> : <button className='nodefault' onClick={() => defaultToo(ele.id, ele.prime)}>设为默认</button>}
                    </td>
                    <td>{ele.tel}</td>
                    <td>
                      {/* 删除地址 */}
                      <button className='delbtn' onClick={() => delAddress(ele.id)}>删除</button>
                      {/* 修改地址 */}
                      <button className='editbtn'>编辑</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Mypage;

