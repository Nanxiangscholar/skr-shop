import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import {
  Form,
  Input,
  Button,
  Radio,
  DatePicker,
  Select,
  Upload,
  Divider,
} from 'antd';
import './index.scss'
const { Step } = Steps;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const Offers: React.FC = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentDisabled(disabled);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className='offers'>
      <div className='offers-text'>
        <h2>招聘信息</h2>
      </div>
      <div className='offers-pic'>
        <img src={require('../../assets/image/following/img-recruit.jpg')} alt="" />
      </div>
      <div className='off-text'>
        <h3>招聘程序</h3>
        <p>每次筛选的成功申请者公告均单独进行。</p>
        <p>如果申请表中有任何虚假信息，入场可能会被取消。</p>
      </div>
      <div className='offers-step'>
        <Steps size="small" current={1}>
          <Step title="收到文件" />
          <Step title="面试" />
          <Step title="第二次面试" />
          <Step title="加入" />
        </Steps>
        <div className='step-head'>
          <div className="step-row">
            <div className='ant-col'>
              <p>薪资条件</p>
              <p>根据公司章程-最终面试后的决定</p>
            </div>
            <div className='ant-col'>
              <p>工作地点</p>
              <p>首尔特别市江南区德黑兰路14街16号5楼（线馆驿三洞）</p>
            </div>
          </div>
        </div>
      </div>
      <div className="claim">
        <h3>应用</h3>
        <div>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onValuesChange={onFormLayoutChange}
          >
            <Form.Item label="支持区域：">
              <Radio.Group>
                <Radio value="apple">  产品计划(w概念频道MD)  </Radio>
                <Radio value="pear1">  营销  </Radio>
                <Radio value="pear2">  手术  </Radio>
                <Radio value="pear3">  设计  </Radio>
                <Radio value="pear4">   产品开发(前排)   </Radio>
                <Radio value="pear5">  其他  </Radio>
              </Radio.Group>
            </Form.Item>
            <Divider />
            <Form.Item label="申请人姓名：">
              <Input />
            </Form.Item>
            <Divider />
            <Form.Item label="出生日期：">
              <Input placeholder="2000/12/12" />
            </Form.Item>
            <Divider />
            <Form.Item label="性别：">
              <Radio.Group>
                <Radio value="man">  男  </Radio>
                <Radio value="woman">  女  </Radio>
              </Radio.Group>
            </Form.Item>
            <Divider />
            <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
              <Input />
            </Form.Item>
            <Divider />
            <Form.Item
              name="phone"
              label="手机号码"
              rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>
            <Divider />
            <Form.Item label="期末教育：">
              <Radio.Group>
                <Radio value="1">  已毕业  </Radio>
                <Radio value="2">  参加  </Radio>
                <Radio value="3">  休假  </Radio>
                <Radio value="4">  辍学  </Radio>
              </Radio.Group>
            </Form.Item>
            <Divider />
            <Form.Item label="学校名：">
              <Input />
            </Form.Item>
            <Divider />
            <Form.Item label="附上简历" valuePropName="fileList">
              <Input />
              <Upload action="/upload.do" listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>文件选择</div>
                </div>
              </Upload>
            </Form.Item>
            <Divider />
          </Form>
        </div>
      </div>
    </div>
  )
}
export default Offers
