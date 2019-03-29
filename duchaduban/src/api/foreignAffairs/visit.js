import Request from 'utils/request'
import {foreignAffairsUrl} from 'api/index'

// let api = '/api'+ '/wsglxt/'
/*-------出访信息管理列表-------*/
export function visitMgtList(data) {
  return Request({
    url: `${foreignAffairsUrl}visitInfo/selectList`,
    method: 'post',
    data: data
  })
}
/*-------出访信息管理新增-------*/
export function visitMgtAdd(data) {
  return Request({
    url: `${foreignAffairsUrl}visitInfo/insert`,
    method: 'post',
    data: data
  })
}
/*-------出访信息管理查看-------*/
export function visitMgtDetail(userId,token,id) {
  return Request({
    url: `${foreignAffairsUrl}/visitInfo/viewVisitInfo?userId=${userId}&loginToken=${token}&id=${id}`,
    method: 'post',
  })
}
/*-------出访信息管理修改-------*/
export function visitMgtUpdate(data) {
  return Request({
    url: `${foreignAffairsUrl}/visitInfo/update`,
    method: 'post',
    data: data
  })
}
/*-------出访信息管理删除-------*/
export function visitMgtDelete(userId,token,id) {
  return Request({
    url: `${foreignAffairsUrl}/visitInfo/delete?userId=${userId}&loginToken=${token}&id=${id}`,
    method: 'post'
  })
}
/*-------出访信息管理导出-------*/
export function visitMgtExport(userId,token) {
  return Request({
    url: `${foreignAffairsUrl}/visitInfo/expSelectList?userId=${userId}&loginToken=${token}`,
    method: 'post'
  })
}
/*-------出访国家占比-------*/
export function visitMgtCountryShare(userId,token) {
  return Request({
    url: `${foreignAffairsUrl}/visitInfo/visitCountries?userId=${userId}&loginToken=${token}`,
    method: 'post'
  })
}
/*-------历年各国出访情况趋势-------*/
export function visitMgtCountryLine(userId,token) {
  return Request({
    url: `${foreignAffairsUrl}/visitInfo/visitCountryYear?userId=${userId}&loginToken=${token}`,
    method: 'post'
  })
}
