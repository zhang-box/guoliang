import Request from 'utils/request'
// let api =/* '/api'+ */'/djglxt/'
import {partyUrl} from 'api/index'

/*-------党员基本信息新增-------*/
export function memberAdd(data) {
  return Request({
    url: `${partyUrl}djMemberInfo/insert`,
    method: 'post',
    data:data
  })
}
/*-------党员基本信息修改-------*/
export function memberUpdate(data) {
  return Request({
    url: `${partyUrl}djMemberInfo/update`,
    method: 'post',
    data:data
  })
}
/*-------党员基本信息查看-------*/
export function memberDetail(data) {
  return Request({
    url: `${partyUrl}djMemberInfo/viewDetails`,
    method: 'post',
    data:data
  })
}

