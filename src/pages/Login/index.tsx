import React,{useState,useRef,useEffect} from 'react'
import './login.scss'
import forget from '../../assets/image/login/forget.png'
import rember from '../../assets/image/login/rember.png'
import { useParams,useNavigate } from 'react-router-dom'
import { message } from 'antd';
import { loginApi } from '../../Api/loginRegister';
import { setCookie,getCookie } from '../../assets/ts/cookie';


 const Login:any =()=> {
  const navigate = useNavigate();
  // 是否记住密码
  const [remember,setRemember] = useState<boolean>(false);
  // 用户名默认值
  const [userdefault,setUserDef]=useState<string>("");
  // 用户名
  const userRef = useRef<HTMLInputElement>(null);
  // 密码
  const passRef = useRef<HTMLInputElement>(null)
  // 登录
  const loginUp=()=>{
    let username = userRef.current?.value;
    let password = passRef.current?.value;
    // console.log(username,password);
    if (username?.trim()===""||password?.trim()==="") {
      message.error('请输入正确的用户名或者密码');
      return
    }
    const hide = message.loading('登陆中...', 0);
    loginApi({
      username,
      password
    }).then((res:any)=>{
      if (res.code === 402) {
        hide()// 取消登陆中msg
        message.error('登陆失败');
      }else if(res.code === 200){
        hide()// 取消登陆中msg
        setCookie(res.data,'userinfo');// 保存用户cookie，默认持续时间15分钟
        // 判断是否是记住密码
        message.success('登陆成功,祝您购物愉快😍');
        if (remember) setCookie(username,'userName');
      } 
    }).then(()=>{
      // navigate('/home')
      setTimeout(()=>{
        window.location.href = '/home'
      },200)
    })
  }

  // 加载提前记住的账号
  useEffect(()=>{
    let user = getCookie('userName')
    if (user) {
      setUserDef(user)
    }
  },[])

  return (
    <div className='Login'>
        <div className='Login-nav'>
            <h2>登录</h2>
        </div>
        <div className='Login-content'>
          <div className='Login-one'>
            <div className='Login-useName'>
             <label htmlFor="">用户名</label>
             <input defaultValue={userdefault} ref={userRef} type="text" name='username' id='username' placeholder='请输入用户名'/>   
            </div>
            <div className='Login-password'>
             <label htmlFor="">密码</label>
             <input ref={passRef} type="password" name='password' id='password ' placeholder='请输入密码' />        
            </div>
            <div className='Login-Account' onClick={()=>{setRemember(!remember)}}>
              <div><img src={remember?rember:forget} alt=""  className='Login-Account-img1'/></div>
              {/* <img src={rember} alt=""  className='Login-Account-img2' /> */}
             <label htmlFor="">记住账号</label>
            </div>
          </div>
          <div className='Login-two'>
              <button className='Login-two-btn' onClick={loginUp}>登录</button>
              <div className='Login-three-btn'>
                <a href="#">找回用户名</a>
                <a href="#">忘记密码</a>
              </div>
          </div>
          <div className='Login-three'>
              <div className='Login-three-center'>
                <p>第三方登录</p>
                <div>
                  <ul>
                    <li>
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADNUlEQVRYR8WXSWgTYRTH/2+SFA9VBMWlSCZxQagXxYOoh1Y9qSh6MEImLj20mRYFPahHozf1oFCpExWsmgSsB1txuajVQ1s8iOKhgkuTCSIuCKIV1DbzJE1T0+k3yTdFSG7he8vvLd+b9xGq/KMq+4c0wMHEm1kj5F1LpDSwhQYQ5gM0vxAAfwLjEyl4wmw98fHoQHtk2XeZ4KQAoolMG5FyDGC/jFGAsszWqXgk0FFJvixArJe9Hz+YtwHaXMmQ+JzvL6hTt8c20KiTviOAnjJDYNyYnmObFmG3EVa7RLaEAHoqsxFMD8s4jxEw6GXPQF5mlHJrGagHEHPUId5khAOP7OdTAHZ1dXnmjKxxTBmDt8a1wD2Ro2gys4VAd50gvvqeem+GQrnS8ykA0YR5mghHHGp60NAC58uVRU9mDgDULpJhxpl4RD3qCFCu7gRcu6Cp+2R6ojVpXmVgr1DW1g8TGdh/JT17Ro3yDMBikWIO1qpLWvCFDEBzMr3SA+W5g+zQrz/W6s6m4Lf8+QRASyq9Q2HlljB1wDce9s+7GKURGYCWOPuoNvuZgNkieYusnRfDwe5JANFU9iwxHxI6YO43IoH1Ms6LMnoi0weidcKAiM7Fw/7DkwD0hNkHglAhf70MTT3hCuB6uhGK0isOCP1GRB0LaKIEetJ8C2CJg5P/CwC8MzR1qQ0g+wPg2imDgui111I2tUcWvXeTgbysnjJ7wNg+VY+GDc0/Uw4ACF3Q1JtunY8BOJZBCCAqAfUYmn/HdJxPNGMq2wvmRpsNQQkETcgl3eoWIh+9sSf4WBcBsKAJRdeQQd1sWW2KQicNTW12A5F3bOWssOJRUvYMlAZWcRAR8IGButEc11/eG3glA9GayISZKFnUtesIB1GlUQzGNiOi3pECSJotDMRdjeLxa+O0hLifA0nzuHA/cPoYFWnFn2PqNDR/kz0iveAEPl9NR3to4ZfS8/GzSQtKxc9x3kCZheQBA0Pjw2MFQMsBnlv4Tz8ZPEjgl8z4zSCVCFvtwFILSaEUFVcymVaYLCO7kv0bIFVcSosQVV3LS/NXtYdJKURVn2buO05eQ+ptKG/OveRf62uDMGKvMa4AAAAASUVORK5CYII=" alt="" />
                      <p>QQ</p>
                    </li>
                    <li>
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADsklEQVRYR8VXXWgcVRT+zqQJNKAFSQRbCrU+lPpQrcvejYJtY2buNOBbqYqlD760WH8eqiCioIK2UGj7ELT0obWUQqH6oCI0e++oy4bQ7GwS0qJIHtRqoBXahxIJ1I07p8xkZ7Od3ZnZSMPO29x7zne+OfOdc+4lrOCxVPZpMrADTE8BtIWIt/juzDQL8CyIr7KHopblmXZhKc3Q1ANbDXhvAXgRwMY0+9r+HIDvPRgjjjXxa5JPIgGpxacA/OAPtxk4ajYPYERZ7odx/rEEpBZFAM//z8BRtzFluTtaYbUkYGlxi4C+BxQ8gGHgtrbc/ihmEwHpiD/A2PQgg9exCNeV6T7eiH0fAdsRl5ixd1WC10CJ8FXedF8KY9QJ1AT3wWoGb8D+LBRmQKBWahMJaq8AOAKi2Sp4uqdCfy9287MGsA2El8HIrJD4vAdjwC/RgIDU4gsAr8eAfAvPOKrsiVJcEOnkDoD59ApJnFKWe4hMnVlnoOtPAOtaAIxV1vTKwmDhbhq4pcReIlxKs1vepxvKKm0gW+X2M/H5JkfCP8ailx0dnpwNsuSISTCXlFV+w3/ffXlgk7eGx4mg8mbptVomPwLwcbskyPByJHX2a4D2RJ0YXNBWeTBct53cl8x8XVnuJ/7acHF7f7XSfQaMKX9N5rMbmbCZiArtEgBwmGwtphnY3kSA6Lg2S++mgdlajDJgAugCcJIM/A4PgkFDAK9P8T9LUom/QM1DhojOhamNFZ8WTIQTedN9J2pjFzOP8b9dB5J/CY2T1GIBQG/zL0BZW66IDa7EzwzvoJaT40lfaWvxJgMjrWyIcDuWAIAFg+i5UbN0Leq866dMX0+1qxy2VemI78A8FwpUBplZzqB0shfB9EoUZ4lAzC9YMqYbMHi/GnJ/bHTe7eS2VT3vGS3L5wJBOrknq1WsVXZpyn/3S5IJ847l5pcqKHsITJ83Z4HGY0XYYLxoEHaOmu6VcE3mxQuVnsp0YXDmTppIQ0IxPeJsbBnWgZlvKVl+1O92xNwDeDc9poeI6Y6y3W/aIZAw5A7HN6JlZL+xvA3gkcZgDFzUlvtqGoGkDhk0opRWnIhPhGN5030vzijQBvMvrfdrrTgQSfIwSiThd0wwn1zs/q8YamL4h8wTl4emfpNaXACwLwZgaRj5m22M47RMh/szYN4Aon4w5mDw+2DySUSf+8dxLQv+CbgzB5KQXkePZPUa7+ShNCTR0WN5PROdvJg0kOjc1Swk0dHLabR4V+N6fg/1caxEzK3PsAAAAABJRU5ErkJggg==" alt="" />
                      <p>微信</p>
                    </li>
                  </ul>
                </div>
              </div>
          </div>
          <div className='Login-four'>
              <ul>
                <li>
                  <div>
                    <p>还不是SKR-SHOP成员？</p>
                    <p>如果您注册成为会员，您将获得10％的折扣券。</p>
                  </div>
                  <button onClick={()=>navigate('/register')}>注册</button>
                </li>
                <li>
                  <div>
                    <p>需要非会员订单/交货查询吗？</p>
                  </div>
                  <button>非会员订单查询</button>
                </li>
              </ul>
          </div>
        </div>



    </div>
  )
}

export default Login