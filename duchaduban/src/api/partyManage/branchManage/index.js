import Request from 'utils/request'
// let api = /*'/api'+ */'/djglxt/'
import {partyUrl} from 'api/index'

/*-------党支部管理列表-------*/
export function branchList(data) {
  return Request({
    url: `${partyUrl}branchManage/queryList`,
    method: 'post',
    data:data
  })
}
/*-------党支部下拉框列表-------*/
export function branchOptionsInfo(data) {
  return Request({
    url: `${partyUrl}branchManage/selectBranchName`,
    method: 'post',
    data:data
  })
}
