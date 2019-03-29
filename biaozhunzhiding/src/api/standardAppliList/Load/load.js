
import Request from 'utils/request'

import {
  voteUrl,
  zdUrl,
  baseUrl
} from 'api/index'
// *************************************登录****************************************//
//登录
export function userLoad(data) {
  return Request({
    url: `${voteUrl}user/bzUserLogin`,
    method: 'post',
    data: data
  })
}
//登录
/*  return Request({
    url: `${baseUrl}visitor/biaozhun/sysuser/login`,
    method: 'post',
    data: data
  })
}*/

// *************************************忘记密码****************************************//
//验证用户是否存在
export function findUserExists(data) {
  return Request({
    url: `${baseUrl}visitor/findUserExists`,
    method: 'post',
    data: data
  })
}
//获取用户信息
export function selectByIdLimit(data) {
  return Request({
    url: `${baseUrl}visitor/selectByIdLimit`,
    method: 'post',
    data: data
  })
}
//发送邮箱验证码
export function sendEmail(data) {
  return Request({
    url: `${baseUrl}visitor/sendEmail`,
    method: 'post',
    data: data
  })
}
//验证邮箱验证码
export function checkEmail(data) {
  return Request({
    url: `${baseUrl}visitor/checkEmail`,
    method: 'post',
    data: data
  })
}
//提交新密码
export function findPwd(data) {
  return Request({
    url: `${baseUrl}visitor/findPwd`,
    method: 'post',
    data: data
  })
}
