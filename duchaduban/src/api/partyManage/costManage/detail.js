import Request from 'utils/request'
// let api = /*'/api'*/+ '/djglxt/'
import {partyUrl} from 'api/index'

/*-------党费管理详情-------*/
export function memberDetail(data) {
  return Request({
    url: `${partyUrl}djMemberInfo/viewDetails?id=`+data,
    method: 'post',
    data:data
  })
}
/*-------党费管理缴费-------*/
export function costAdd(data) {
  return Request({
    url: `${partyUrl}shipInfo/insert`,
    method: 'post',
    data:data
  })
}
/*-------党费管理查询-------*/
export function costSearch(data) {
  return Request({
    url: `${partyUrl}shipInfo/queryCost`,
    method: 'post',
    data:data
  })
}
