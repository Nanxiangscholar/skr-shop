import axios from 'axios';

// 进度条加载
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

let axiosOption = {
    baseURL:"https://stride.fun",
    timeout:3000
}

// 创建一个单例
const instance = axios.create(axiosOption);
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 开启进度条
  NProgress.start();
  // 可以在此注入token
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 关闭进度条
  NProgress.done();
  // 对响应数据做点什么
  return response.data;


}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance;

