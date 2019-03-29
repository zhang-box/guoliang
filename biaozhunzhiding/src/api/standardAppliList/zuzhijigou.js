import Request from 'utils/request'
// let buildUrl = 'http://59.255.100.71:20020/'
let buildUrl = 'http://106.3.145.81:49143/'
import {voteUrl} from 'api/index'
// let buildUrl = '/'


// let buildUrl = '/'

/*-------动态菜单------*/
export function getMenu(data) {
  return Request({
    url: `${buildUrl}sysPower/queryPowerByUserId`,
    method: 'post',
    data: data
  })
}

/*-------ids------*/
export function idsLogin() {
  return Request({
    url: `${buildUrl}sysUser/idsLogin`,
    method: 'post',
  })
}
/*-------登录------*/
export function userLogin(data) {
  return Request({
    url: `${buildUrl}sysUser/userLogin`,
    method: 'post',
    data:data
  })
}

/*-------组织机构树------*/
export function findGovUser(data) {
  return Request({
    url: `${buildUrl}sysClassGov/findGovUser`,
    method: 'post',
    data:data
  })
}


/*-------测试用户信息------*/
export function getUserMsg(data) {
  return Request({
    url: `${buildUrl}sysUser/selectList`,
    method: 'post',
    data:data
  })
}


/*-------获取多个用户信息------*/
export function getManyUserMsg(data) {
  return Request({
    url: `${buildUrl}sysUser/queryManyByUserId`,
    method: 'post',
    data:data
  })
}

/*用户信息*/
export function getUserData(data) {
  return Request({
    url: `${buildUrl}sysUser/getSessionData`,
    method: 'post',
    data:data
  })
}

/*-------部门下拉数据----*/
export function getSelected() {
  return Request({
    url: `${buildUrl}sysClassGov/findMenuAll`,
    method: 'post'
  })
}

/*用户信息*/
export function getSessionData(data) {
  return Request({
    url: `${voteUrl}common/session/getSessionData`,
    method: 'post',
    data:data
  })
}
