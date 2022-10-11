import React, { useState, useEffect } from 'react';
import { Button, Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { getSecondHotList } from '../../../Api/api';
import { NavLink, useNavigate } from 'react-router-dom';
const { Search } = Input;


const HotTag = ({ title }: any)=> {
  const navigate = useNavigate();
  let [dataHot, setDataHot] = useState([]);
  {/* 搜索 */}
  const onSearch = (value: string) => {
    navigate(`/search/product/${value}`)
  }

  useEffect(() => {
    getSecondHotList(title).then(({ data }: any) => {
      let arr = data.slice(0, 5);
      setDataHot(arr);
    });
  },[title]);
  return (
    <div className='dev-wb-primary-tag'>

      <div className='dev-wb-primary-tagItem'>
        <div className='dev-wb-primary-hotTag'>
          <div>
            <span>热门标签</span>
          </div>
        </div>
        <div className='dev-wb-primary-hotTagItem'>
          {dataHot.map((item, index) => {
            return (
              <Button key={index}>
                <NavLink to={`/search/product/${item}`}><span># {item}</span></NavLink>
              </Button>
            );
          })}

        </div>
      </div>
      <div className='dev-wb-primary-Search'>
        <Search bordered={false} placeholder='标签搜寻' onSearch={onSearch} />
      </div>
    </div>
  );
}


export default HotTag
