import Request from 'utils/request'
// let api = /*'/api'+ */'/djglxt/'
import {partyUrl} from 'api/index'

/*-------阶段维护列表-------*/
export function stageList(data) {
  return Request({
    url: `${partyUrl}stageManage/queryList`,
    method: 'post',
    data:data
  })
}

/*-------阶段维护查询-------*/
export function stageSearch(data) {
  return Request({
    url: `${partyUrl}stageManage/queryList`,
    method: 'post',
    data:data
  })
}

/*-------阶段维护删除-------*/
export function stageDelete(data) {
  return Request({
    url: `${partyUrl}stageManage/delete`,
    method: 'post',
    data:data
  })
}
/*-------阶段维护下拉列表-------*/
export function stageOptionsInfo(data) {
  return Request({
    url: `${partyUrl}stageManage/viewStageManageName`,
    method: 'post',
    data:data
  })
}
