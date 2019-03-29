import Request from 'utils/request'
// let api = '/zd'+ '/zdglxt/'
import {zdUrl} from 'api/index'
//药品分类
export function drugSort(data) {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=126`,
    method: 'post',
  })
}
//状态
export function applyStatus(data) {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=109`,
    method: 'post',
  })
}
//审批状态
export function reviewStatus(data) {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=149`,
    method: 'post',
  })
}
//结算方式
export function unitStatus(data) {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=154`,
    method: 'post',
  })
}
//   预警管理
export function nearTermType(data) {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=130`,
    method: 'post',
  })
}

export function nearTerm(data) {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=${data}`,
    method: 'post',
  })
}
//摘要
export function abstractList() {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=184`,
    method: 'post',
  })
}
