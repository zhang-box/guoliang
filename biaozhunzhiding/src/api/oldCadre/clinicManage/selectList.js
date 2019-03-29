import Request from 'utils/request'
// let api = '/zd'+ '/zdglxt/';
import {zdUrl} from 'api/index'

// 下拉列表数据
export function selectList(data) {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=`+data,
    method: 'post',
    data:data
  })
}

//用药天数
export function medicationDays() {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=201`,
    method: 'post',
  })
}
