import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import {NavLink} from 'react-router-dom'
import SwiperHreader from '../../components/Swiper';
import SwiperList from '../../components/SwiperCard';
import instance from '../../Api/request'
import Cards from '../../components/Cards';
import '../../themes/Home/index.scss'
import { getTypeTwoList, getTypeTwoListGoods } from '../../Api/api'
import Deliveryarea from 'components/Deliveryarea';


const Home = () => {
  // 一级分类鞋类
  const [dataXie, setDataXie] = useState<any>([]);
  // 一级分类服饰
  const [dataFu, setDataFu] = useState<any[]>([]);
  // 一级分类配件
  const [dataPei, setDataPei] = useState<any[]>([]);
  // 一级分类儿童专区
  const [dataTong, setDataTong] = useState<any[]>([]);
  useEffect(() => {
    (async function () {
      let dataX: any = await getTypeTwoList('鞋类')
      setDataXie(dataX.res);
      let dataF: any = await getTypeTwoList('服饰')
      setDataFu(dataF.res);
      let dataP: any = await getTypeTwoList('配件')
      setDataPei(dataP.res);
      let dataT: any = await getTypeTwoList('儿童专区')
      setDataTong(dataT.res);
    })()

  }, [])

  // 存储首页HeaderSwiper图片
  const [imgList, setImgList] = useState([])
  // 存储二级分类数据篮球鞋
  const [secondLan, setSecondLan] = useState<any[]>([]);
  // 存储二级分类数据板鞋
  const [secondBan, setSecondBan] = useState<any[]>([]);
  // 存储二级分类数据跑鞋
  const [secondPao, setSecondPao] = useState<any[]>([]);

  useEffect(() => {
    // HeaderSwiper图片
    (async function () {
      let imgList: any = await instance({
        method: 'post',
        url: '/type/getSwiper',
      })
      let a: any = imgList.res;
      setImgList(a)
      // 获取二级分类商品相关篮球鞋
      setSecondLan((await getTypeTwoListGoods('篮球鞋')).data)
      // 获取二级分类商品相关板鞋
      setSecondBan((await getTypeTwoListGoods('板鞋')).data)
      // 获取二级分类商品相关跑鞋
      setSecondPao((await getTypeTwoListGoods('跑鞋')).data)
    })()
  }, [])

  var arr = ['连帽卫衣', '休闲上衣', '单风衣', '针织短裤', '运动背心']
  // 控制底部Tab栏全部商品状态
  const [tabGoodsAll, setTabGoodsAll] = useState<any>([]);
  // 获取底部Tab单个商品
  const [tabGoods, setTabGoods] = useState<any>([]);
  useEffect(() => {
    (async function () {
      setTabGoods(((await getTypeTwoListGoods('连帽卫衣')).data))
      let list: any = [];
      arr.map(async (item: any) => {
        let newArr = (await getTypeTwoListGoods(item)).data;
        return (
          list.push({ type: item, data: newArr }),
          setTabGoodsAll([...list])
        )
      })

    })()
  }, [])

  // and tab栏处理函数
  const onChange = async (key: string) => {
    tabGoodsAll.forEach((item: any) => {
      if (item.type === key) {
        setTabGoods([...item.data]);
      }
    })
  };
  // 底部Tab商品组件
  function Tabgoods(): any {
    return (tabGoods.map((item: any, index: number) => {
      if (index < 5) {
        return (
          <li key={item.id}><Cards title={item.title} imgSrc={item.img} width={234} height={388}></Cards></li>
        )
      }
    })
    )
  }
  return (
    <div style={{ minWidth: "1400px" }}>
      <Deliveryarea/>
      <div className='SwiperHreader' >
        <SwiperHreader imgList={imgList} loop={true} />
      </div>
      <div className='title'>
        <p>Basketball shoes</p>
      </div>
      <ul className="AnCard">
        {
          secondLan.map((item, index) => {
            if (index < 4) {
              return (
                <li key={index}>
                  <NavLink to={`/details/${item.id}`}>
                    <Cards title={item.title} imgSrc={item.img} width={356} height={460} description={`COST:￥${item.price}`}></Cards>
                  </NavLink>
                </li>
              )
            }
          })
        }
      </ul>
      <div className='title'>
        <p>Skate shoes</p>
      </div>
      <div className='SwiperList'>
        <SwiperList imgList={secondBan} count={4} />
      </div>
      <div className='title'>
        <p>Running shoes</p>
      </div>
      <div className='SwiperList'>
        <SwiperList imgList={secondPao} count={5} />
      </div>
      <div className='title'>
        <p>Casual shoes</p>
      </div>
      <div className='SwiperList'>
        <SwiperList imgList={secondLan} Sheight={670} count={2} />
      </div>
      <ul className="AnCard">
        { 
          secondLan.map((item, index) => {
            if (index < 8) {
              return (
                <li key={index}><NavLink to={`/details/${item.id}`}><Cards title={item.title} imgSrc={item.img} width={172} height={278} description={`COST:￥${item.price}`}></Cards></NavLink></li>
              )
            }

          })
        }
      </ul>
      <div className='title'>
        <p>Recommend+</p>
      </div>
      <div className="SwiperAndList">
        <div className="swiper">
          <SwiperHreader imgList={secondLan} Sheight={583} Swidth={583} />
        </div>
        <div className="list">
          <ul className="AnCard">
            {
              secondLan.map((item, index) => {
                if (index < 8) {
                  return (
                    <li key={index}><NavLink to={`/detail/${item.id}`}><Cards title={item.title} imgSrc={item.img} width={172} height={278} description={`COST:￥${item.price}`}></Cards></NavLink></li>
                  )
                }

              })
            }
          </ul>
        </div>
      </div>
      <div className='SwiperHreader'>
        <SwiperHreader imgList={imgList} />
      </div>
      <div className="TypeList">
        <div className="type">
          <p>鞋类</p>
          <p>MORE<span>
            <svg viewBox="0 0 1024 1024" data-icon="caret-right" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" ><path d="M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z"></path></svg>
          </span></p>
        </div>
        <ul className="list">
          {
            dataXie.map((item: any, index: number) => {
              if (index < 7) {
                return (
                  <li key={index}><NavLink to={`/details/${item.id}`}><Cards title={item.title} imgSrc={item.img} width={179} height={280} description={`COST:￥${item.price}`}></Cards></NavLink></li>
                )
              }
            })
          }
        </ul>
      </div>
      <div className="TypeList">
        <div className="type">
          <p>服饰</p>
          <p>MORE<span>
            <svg viewBox="0 0 1024 1024" data-icon="caret-right" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" ><path d="M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z"></path></svg>
          </span></p>
        </div>
        <ul className="list">
          {
            dataFu.map((item: any, index: number) => {
              if (index < 7) {
                return (
                  <li key={index}><NavLink to={`/details/${item.id}`}><Cards title={item.title} imgSrc={item.img} width={179} height={280} description={`COST:￥${item.price}`}></Cards></NavLink></li>
                )
              }
            })
          }
        </ul>
      </div>
      <div className="TypeList">
        <div className="type">
          <p>配件</p>
          <p>MORE<span>
            <svg viewBox="0 0 1024 1024" data-icon="caret-right" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" ><path d="M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z"></path></svg>
          </span></p>
        </div>
        <ul className="list">
          {
            dataPei.map((item: any, index: number) => {
              if (index < 7) {
                return (
                  <li key={index}><NavLink to={`/details/${item.id}`}><Cards title={item.title} imgSrc={item.img} width={179} height={280} description={`COST:￥${item.price}`}></Cards></NavLink></li>
                )
              }
            })
          }
        </ul>
      </div>
      <div className="TypeList">
        <div className="type">
          <p>儿童专区</p>
          <p>MORE<span>
            <svg viewBox="0 0 1024 1024" data-icon="caret-right" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" ><path d="M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z"></path></svg>
          </span></p>
        </div>
        <ul className="list">
          {
            dataTong.map((item: any, index: number) => {
              if (index < 7) {
                return (
                  <li key={index}><NavLink to={`/details/${item.id}`}><Cards title={item.title} imgSrc={item.img} width={179} height={280} description={`COST:￥${item.price}`}></Cards></NavLink></li>
                )
              }
            })
          }
        </ul>
      </div>
      <div className='title'>
        <p>Knapsack</p>
      </div>
      <div className='SwiperList'>
        <SwiperList imgList={secondLan} Sheight={500} count={3} />
      </div>
      <div className='title'>
        <p>WDNA STYLE</p>
      </div>
      <div className="ShopListTab">
        <Tabs
          defaultActiveKey="1"
          onChange={onChange}
          size={'large'}
          tabBarGutter={100}
          centered={true}
          animated={true}
          items={[
            {
              label: `连帽卫衣`,
              key: '连帽卫衣',
              children: <Tabgoods />,
            },
            {
              label: `休闲上衣`,
              key: '休闲上衣',
              children: <Tabgoods />,
            },
            {
              label: `单风衣`,
              key: '单风衣',
              children: <Tabgoods />,
            }, {
              label: `针织短裤`,
              key: '针织短裤',
              children: <Tabgoods />,
            }, {
              label: `运动背心`,
              key: '运动背心',
              children: <Tabgoods />,
            }
          ]}
        />
      </div>
      <div className="footer_bar">
        <div className="footer">
          <div className="inner">
            <a href="#">
              <img src={require('../../assets/image/footerbar/left.png')} alt="" />
            </a>
            <a href="#">
              <img src={require('../../assets/image/footerbar/center.png')} alt="" />
            </a>
            <a href="#">
              <img src={require('../../assets/image/footerbar/right.png')} alt="" />
            </a>
          </div>
          <div className="footer_content">
            <div className="notice">
              <Tabs
                defaultActiveKey="1"
                size={'large'}
                tabBarGutter={40}

                animated={true}
                items={[
                  {
                    label: `消息`,
                    key: '1',
                    children: `双十一，千万大补贴!`,
                  },
                  {
                    label: `活动公告`,
                    key: '2',
                    children: '周末福利一直送，打折不停-购',
                  }
                ]}
              />
            </div>
            <div className="contact">
              <p>
                <span className="fuwu">服务中心</span>
                <span className="phone_">1566-5027</span>
              </p>
              <p className="timer_">营业时间</p>
              <p className="adress_">2801810010@qq.com</p>
              <p className="button_icon">
                <span data-v-3bd5e4b0="">
                  <button type="button" className="footer_btn ant-btn">
                    <span>常见问题</span>
                  </button>
                  <button type="button" className="footer_btn ant-btn">
                    <span>1：1查询</span>
                  </button>
                </span>
                <span >
                  <i aria-label="icon: facebook" className="anticon anticon-facebook"  >
                    <svg viewBox="64 64 896 896" data-icon="facebook" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" ><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-92.4 233.5h-63.9c-50.1 0-59.8 23.8-59.8 58.8v77.1h119.6l-15.6 120.7h-104V912H539.2V602.2H434.9V481.4h104.3v-89c0-103.3 63.1-159.6 155.3-159.6 44.2 0 82.1 3.3 93.2 4.8v107.9z"></path></svg></i>
                  <i aria-label="icon: instagram" className="anticon anticon-instagram" ><svg viewBox="64 64 896 896" data-icon="instagram" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" ><path d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9z"></path></svg></i>
                  <i aria-label="icon: qq-circle" className="anticon anticon-qq-circle" ><svg viewBox="64 64 896 896" data-icon="qq-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" ><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm210.5 612.4c-11.5 1.4-44.9-52.7-44.9-52.7 0 31.3-16.2 72.2-51.1 101.8 16.9 5.2 54.9 19.2 45.9 34.4-7.3 12.3-125.6 7.9-159.8 4-34.2 3.8-152.5 8.3-159.8-4-9.1-15.2 28.9-29.2 45.8-34.4-35-29.5-51.1-70.4-51.1-101.8 0 0-33.4 54.1-44.9 52.7-5.4-.7-12.4-29.6 9.4-99.7 10.3-33 22-60.5 40.2-105.8-3.1-116.9 45.3-215 160.4-215 113.9 0 163.3 96.1 160.4 215 18.1 45.2 29.9 72.8 40.2 105.8 21.7 70.1 14.6 99.1 9.3 99.7z"></path></svg></i>
                  <i aria-label="icon: dingtalk-circle" className="anticon anticon-dingtalk-circle" ><svg viewBox="64 64 896 896" data-icon="dingtalk-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm227 385.3c-1 4.2-3.5 10.4-7 17.8h.1l-.4.7c-20.3 43.1-73.1 127.7-73.1 127.7s-.1-.2-.3-.5l-15.5 26.8h74.5L575.1 810l32.3-128h-58.6l20.4-84.7c-16.5 3.9-35.9 9.4-59 16.8 0 0-31.2 18.2-89.9-35 0 0-39.6-34.7-16.6-43.4 9.8-3.7 47.4-8.4 77-12.3 40-5.4 64.6-8.2 64.6-8.2S422 517 392.7 512.5c-29.3-4.6-66.4-53.1-74.3-95.8 0 0-12.2-23.4 26.3-12.3 38.5 11.1 197.9 43.2 197.9 43.2s-207.4-63.3-221.2-78.7c-13.8-15.4-40.6-84.2-37.1-126.5 0 0 1.5-10.5 12.4-7.7 0 0 153.3 69.7 258.1 107.9 104.8 37.9 195.9 57.3 184.2 106.7z"></path></svg></i></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Home
