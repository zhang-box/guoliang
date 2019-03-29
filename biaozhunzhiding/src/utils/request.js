import axios from 'axios'
import Qs from 'qs'
import {
  Message, MessageBox
} from 'element-ui';

// 带cookie请求头
axios.defaults.withCredentials = true;

// 创建axios实例
const service = axios.create({
  // baseURL:'http://192.168.0.175:8080',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  // timeout: 5000, // 请求超时时间
  transformRequest: [
    function (data) {
      data = Qs.stringify(data)
      return data
    }]
});

// request拦截器
service.interceptors.request.use(config => {
    // token
    return config;

  },
  error => {
    console.log(error);
    Promise.reject(error);
  })

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.log('err' + error); // for debug
/*    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });*/
    return Promise.reject(error);
  }
);

export default service;
