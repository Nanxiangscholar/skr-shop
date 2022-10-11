import instance from './request';

// 登录请求
export const loginApi = (params:any)=>instance.post('/user/login',{...params});

// 注册请求
// 发送验证码
export const registerApi = (params:any)=>instance.post('/user/getMessage',{...params});

// 注册申请
export const registApi=(params:any)=>instance.post('/user/register',{...params});
