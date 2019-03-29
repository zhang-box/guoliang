import Request from 'utils/request'
// let api =/* '/api'+ */'/djglxt/'
import {partyUrl} from 'api/index'

/*------入党积极分子新增-------*/
export function joiningAdd(data) {
  return Request({
    url: `${partyUrl}/memberInfo/insert`,
    method: 'post',
    data:data
  })
}
/*------入党积极分子修改-------*/
export function joiningUpdate(data) {
  return Request({
    url: `${partyUrl}memberInfo/update`,
    method: 'post',
    data:data
  })
}
/*------入党积极分子详情-------*/
export function joiningDetail(data) {
  return Request({
    url: `${partyUrl}memberInfo/viewDetails`,
    method: 'post',
    data:data
  })
}
/*------入党积极分子转预备-------*/
export function changePreare(data) {
  return Request({
    url: `${partyUrl}memberInfo/probationary`,
    method: 'post',
    data:data
  })
}
