import Request from 'utils/request'
// let api = /*'/api'+ */'/djglxt/'
import {partyUrl} from 'api/index'

/*-------环节维护详情-------*/
export function linkDetail(data) {
  return Request({
    url: `${partyUrl}linkManage/viewLinkManage`,
    method: 'post',
    data:data
  })
}
/*-------环节维护新增-------*/
export function linkAdd(data) {
  return Request({
    url: `${partyUrl}linkManage/insert`,
    method: 'post',
    data:data
  })
}
/*-------环节维护修改-------*/
export function linkUpdate(data) {
  return Request({
    url: `${partyUrl}linkManage/update`,
    method: 'post',
    data:data
  })
}

/*-------阶段名称下拉框-------*/
export function linkDelete(data) {
  return Request({
    url: `${partyUrl}linkManage/delete`,
    method: 'post',
    data:data
  })
}
