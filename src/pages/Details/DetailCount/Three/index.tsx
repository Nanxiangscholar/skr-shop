import React from 'react'
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './index.scss'
interface DataType {
  key: string;
  name: string;
  address: string;
  tags: number;
}

const columns: ColumnsType<DataType> = [

  {
    key: 'tags',
    width: '60%',
    render: (_, { tags }) => (
      <>
        {
          <>
            <Tag color={'black'} key={'loser'}>
              完整回答
            </Tag>
            {tags}
          </>
        }
      </>
    ),
  },
  {
    dataIndex: 'name',
    key: 'name',
    align: 'right',
    width: '12%',
    render: text => <a>{text}</a>,
  },
  {
    dataIndex: 'address',
    key: 'address',
    align: 'right',
    render: text => <span>{text}</span>,
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    address: '2022.10.01',
    tags: 0,
  },
  {
    key: '2',
    name: 'Jim Green',
    address: '2022.08.01',
    tags: 0,
  },
  {
    key: '3',
    name: 'Joe Black',
    address: '2022.10.12',
    tags: 1,
  },
];


function Three() {
  return (
    <>
      <ul className="nav">
        <li value={0}>DETAIL</li>
        <li value={1}>REVIEW( 98 )</li>
        <li value={2} className="on">Q&amp;A( 65 )</li>
        <li value={3}>RETURN &amp; DELIVERY</li>
      </ul>
      <div className='shopevaluate'>
        <button type="button" className="mybtn">
          <span>商品咨询</span>
        </button>
        <Table columns={columns} dataSource={data} />
      </div>

    </>
  )
}

export default Three



