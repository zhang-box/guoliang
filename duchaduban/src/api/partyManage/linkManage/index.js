import Request from 'utils/request'
// let api = /*'/api'*/+ '/djglxt/'
import {partyUrl} from 'api/index'

/*-------环节维护列表-------*/
export function linkList(data) {
  return Request({
    url: `${partyUrl}linkManage/queryList`,
    method: 'post',
    data:data
  })
}
/*-------环节阶段维护查询-------*/
export function linkSearch(data) {
  return Request({
    url: `${partyUrl}linkManage/queryList`,
    method: 'post',
    data:data
  })
}
/*-------环节维护删除-------*/
export function linkDelete(data) {
  return Request({
    url: `${partyUrl}linkManage/delete`,
    method: 'post',
    data:data
  })
}
/*-------环节名称下拉框-------*/
export function linkOptionsInfo(data) {
  return Request({
    url: `${partyUrl}linkManage/viewLinkManageName`,
    method: 'post',
    data:data
  })
}
