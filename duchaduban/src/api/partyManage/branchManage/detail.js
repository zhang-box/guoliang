import Request from 'utils/request'
// let api = /*'/api'+ */'/djglxt/'
import {partyUrl} from 'api/index'

/*-------党支部管理新增-------*/
export function branchAdd(data) {
  return Request({
    url: `${partyUrl}manageInfo/insert`,
    method: 'post',
    data:data
  })
}
/*-------党支部管理修改-------*/
export function branchUpdate(data) {
  return Request({
    url: `${partyUrl}branchManage/update`,
    method: 'post',
    data:data
  })
}
/*-------党支部管理查看-------*/
export function branchDetail(data) {
  return Request({
    url: `${partyUrl}branchManage/viewDetails`,
    method: 'post',
    data:data
  })
}
/*-------党支部管理查看换届-------*/
export function branchChange(data) {
  return Request({
    url: `${partyUrl}branchManage/replaceMent`,
    method: 'post',
    data:data
  })
}

