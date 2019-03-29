
import Request from 'utils/request'

import {
  voteUrl,
  zdUrl,
  baseUrl
} from 'api/index'

//人员管理列表
export function registrantList(data) {
  return Request({
    url: `${baseUrl}visitor/selectListBySelection`,
    method: 'post',
    data : data
  })
}
//修改用户信息
export function registrantUpdate(data) {
  return Request({
    url: `${baseUrl}visitor/updateSysUserSelective`,
    method: 'post',
    data : data
  })
}
//用户详情
export function registrantDetail(data) {
  return Request({
    url: `${baseUrl}visitor/selectById`,
    method: 'post',
    data : data
  })
}
//用户删除
export function registrantDelete(data) {
  return Request({
    url: `${voteUrl}member/delUser`,
    method: 'post',
    data : data
  })
}




