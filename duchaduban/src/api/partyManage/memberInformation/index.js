import Request from 'utils/request'
// let api = /*'/api'+ */'/djglxt/'
import {partyUrl} from 'api/index'

/*-------党员基本信息列表-------*/
export function informationList(data) {
  return Request({
    url: `${partyUrl}djMemberInfo/queryList`,
    method: 'post',
    data:data
  })
}
/*-------党员基本信息删除-------*/
export function memberDelete(data) {
  return Request({
    url: `${partyUrl}djMemberInfo/delete`,
    method: 'post',
    data:data
  })
}
/*-------党支部下拉框-------*/
export function branchOptionsInfo(data) {
  return Request({
    url: `${partyUrl}branchManage/selectBranchName`,
    method: 'post',
    data:data
  })
}

