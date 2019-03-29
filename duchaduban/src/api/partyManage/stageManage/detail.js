import Request from 'utils/request'
// let api = /*'/api'+ */'/djglxt/'
import {partyUrl} from 'api/index'

/*-------阶段维护新增---------*/
export function stageAdd(data) {
  return Request({
    url: `${partyUrl}stageManage/insert`,
    method: 'post',
    data:data
  })
}
/*-------阶段维护修改-------*/
export function stageUpdate(data) {
  return Request({
    url: `${partyUrl}stageManage/update`,
    method: 'post',
    data:data
  })
}
/*-------阶段维护详情-------*/
export function stageDetail(data) {
  return Request({
    url: `${partyUrl}stageManage/viewStageManage`,
    method: 'post',
    data:data
  })
}


