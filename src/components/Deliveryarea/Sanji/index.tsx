
import React, { useState,useEffect } from 'react'
import { Select } from 'antd';
import {data} from './data/index';

interface Prop{
    handleArea?:any
}

const Option = Select.Option;
export default function Sanji({handleArea}:Prop){
    // 省份
    const [capitals,setCapitals]=useState([]);
    // 市
    const [city,setCity]=useState([]);
    // 区
    const [areaList,setAreaList]=useState([]);


    const [sheng,setSheng]=useState('');
    const [shi,setShi]=useState('');
    const [qu,setQu]=useState('');

    const handleAddressData = () => {
        const da: any = data;
        if (da && da.length > 0) {
            setCapitals(da)
        }
    }
    useEffect(()=>{
        handleAddressData()
    },[])


    const getCity = (value: any) => {
        let da: any = []
        capitals.map((item: any) => {
            if (item.name === value) {
                da = item.cityList
            }
        })
        setCity(da)
        setSheng(value);
    }
    const getSreaList = (value: any) => {
        let ci: any = [];
        city.map((item: any) => {
            if (item.name === value) {
                ci = item.areaList
            }
        })
        setAreaList(ci) 
        setShi(value);
    }
   const getData = (value: any) => {
        setQu(value)
        handleArea({sheng:sheng,shi:shi,qu:value})
    }

    return (
        <div>
            <Select
                showSearch
                style={{ width: 128, marginRight: '5px' }}
                placeholder="省份"
                optionFilterProp="children"
                onChange={getCity}
                filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {capitals.map((item: any) => {
                    return (
                        <Option value={item.name} >{item.name}</Option>
                    )
                })}
            </Select>
            <Select
                showSearch
                style={{ width: 128, marginRight: '5px' }}
                placeholder="市"
                optionFilterProp="children"
                onChange={getSreaList}
                filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {city.map((item: any) => {
                    return (
                        <Option value={item.name}  >{item.name}</Option>
                    )
                })}
            </Select>
            <Select
                showSearch
                style={{ width: 128 }}
                placeholder="区"
                optionFilterProp="children"
                onChange={getData}
                filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {areaList.map(item => {
                    return (
                        <Option value={item} >{item}</Option>
                    )
                })}
            </Select>
        </div>
    )


}
