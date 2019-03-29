import Request from 'utils/request'
// let api = /*'/api'+ */'/djglxt/'
import {partyUrl} from 'api/index'
/*------党建活动管理新增-------*/
export function activitiesAdd(data) {
  return Request({
    url: `${partyUrl}manageInfo/insert`,
    method: 'post',
    data:data
  })
}
/*------党建活动管理修改-------*/
export function activitiesUpdate(data) {
  return Request({
    url: `${partyUrl}manageInfo/update`,
    method: 'post',
    data:data
  })
}
/*------党建活动管理查看-------*/
export function activitiesDetail(data) {
  return Request({
    url: `${partyUrl}manageInfo/viewDetails`,
    method: 'post',
    data:data
  })
}
