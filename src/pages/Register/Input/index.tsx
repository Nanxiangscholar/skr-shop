import { Button, Checkbox, Form, Input } from 'antd';
import React, { useRef,useState } from 'react';
import { register } from '../../../Api/api'
import { registerApi, registApi } from '../../../Api/loginRegister';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

interface Prop { }
export interface Shop {
  id: string;
  name: string;
  price: number;
  count: number;
}

var VerificationCode = Math.round(Math.random() * 1000000)


const Input1: React.FC<Prop> = (props: Prop) => {

  let vertify: any = useRef(null)
  const [verification,setVerification] = useState<boolean>(false);
  // 验证码
  const [verNum,setVaeNum] = useState<number>(0);
  const navigate = useNavigate();


  const onFinish = (values: any) => {
    // 点击确认触发
    console.log('Success:', values);
    if (verNum!==values.codeShow) {
      message.error('验证码错误');
      return
    }
    let obj = {
      username: values.username,
      password: values.password,
      email: values.email,
      VerificationCode:verNum
    }

    registApi(obj).then((res:any)=>{
      if (res.code===200) {
        navigate('/login')
      }else{
        message.error('失败');
      }
      
    })

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('错误触发',errorInfo);
    
  };

  const phoneInp = useRef<any>(null);

  const [text,setText]=useState<string>('发送验证码');

  // 验证码函数
  const countDown=()=>{
    let num = 10;
    let textTime = setInterval(()=>{
      num--
      setText(`${num}秒后重新发送`)
    },1000)

    setTimeout(() => {
      setVerification(false);
      clearInterval(textTime)
      setText('发送验证码')
    }, 10000);

  }
  // 点击发送验证码   
  let vertifyClick = () => {
 
    if (phoneInp.current.input.value.trim()==='') {
      message.error('请填写手机号');
      return
    }
    registerApi({
      phoneNum:phoneInp.current.input.value.trim()
    }).then((res:any)=>{
      if (res.code==='200') {
        message.success('发送成功');
        setVerification(true);
        countDown();// 执行倒计时
        console.log('测试验证码',res.data.Code);
        setVaeNum(res.data.Code)
      }else if(res.code==='501'){
        message.error('用户名重复');
      }
    })
    
  }


  return (
    <div className='Inputs'>
      <div className="register-tips">
        <h2>如果您注册成为会员，您将获得10％的折扣券,可以立即使用。
          <span>（每个完成自我认证的帐户只能使用一次）</span>
        </h2>
      </div>
      <div className="Input">
        <Form
          name="basic"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 10 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            labelAlign='left'
            rules={[
              { required: true },
              { max: 6, message: '用户名长度不能超过6' },
              { pattern: /[a-zA-Z\u4e00-\u9fa5]/g, message: '用户名必须是中文' }
            ]}
          >
            <Input size='large' placeholder="请输入用户名！" />
          </Form.Item>

          <Form.Item
            label="密码"
            labelAlign='left'
            name="password"
            rules={[{ required: true },
            { pattern: /^\d{0,6}$/g, message: '用户密码只能是数字且在0-6位' }
            ]}
          >
            <Input size='large' placeholder="请填写用户密码!" />
          </Form.Item>
          <Form.Item
            label="邮箱"
            labelAlign='left'
            name="emailShow"
            rules={[
              {
                required: true,
              }, {
                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '请正确填写邮箱'
              }
            ]}
          >
            <Input size='large' placeholder="请填写邮箱!" />
          </Form.Item>
          <Form.Item
            label="手机号"
            labelAlign='left'
            name="phoneShow"
            rules={[
              {
                required: true
              }, {
                pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '请正确填写手机号'
              }
            ]}
          >
            <Input ref={phoneInp} size='large' placeholder="请填写手机号!" />


          </Form.Item>
          <div className="Verification-Code">
            <Button type="primary" htmlType="submit" onClick={()=>vertifyClick()} disabled={verification}>
              {text}
            </Button>
          </div>
          <Form.Item
            label="验证码"
            labelAlign='left'
            name="codeShow"
            rules={[
              {
                required: true,
              }, {
                pattern: /^\d{6}$/g, message: '验证码是数字且6位'
              }
            ]}
          >
            <Input size='large' ref={vertify} placeholder="请填写6位数字验证码!" />
          </Form.Item>

          <div className="submit">
            <Button type="primary" htmlType="submit" size='large'>
              取消
            </Button>
            <Button type="primary" htmlType="submit" size='large' >
              确认
            </Button>
          </div>

        </Form>
      </div>
    </div>
  );
}
export default Input1