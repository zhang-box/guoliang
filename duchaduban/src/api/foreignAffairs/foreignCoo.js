import Request from 'utils/request'
import {foreignAffairsUrl} from 'api/index'
// let api = '/api'+ '/wsglxt/'
/*-------对外合作交往信息管理列表-------*/
export function foreignCooMgtList(data) {
  return Request({
    url: `${foreignAffairsUrl}coperationInfo/selectList`,
    method: 'post',
    data: data
  })
}
/*-------对外合作交往信息管理新增-------*/
export function foreignCooMgtAdd(data) {
  return Request({
    url: `${foreignAffairsUrl}/coperationInfo/insertCooperationInfo`,
    method: 'post',
    data: data
  })
}
/*-------对外合作交往信息管理详情-------*/
export function foreignListDetails(userId,token,id){
  return Request({
    url:`${foreignAffairsUrl}coperationInfo/cooperationInfoDetail?userId=${userId}&loginToken=${token}&id=${id}`,
    method:'post'
  })
}
/*-------对外合作交往信息管理修改-------*/
export function foreignCooMgtUpdate(data) {
  return Request({
    url: `${foreignAffairsUrl}/coperationInfo/updateCooperationInfo`,
    method: 'post',
    data: data
  })
}
/*-------对外合作交往信息管理删除-------*/
export function foreignCooMgtDelete(userId,token,id) {
  return Request({
    url: `${foreignAffairsUrl}/coperationInfo/deleteCooperationInfo?userId=${userId}&loginToken=${token}&id=${id}`,
    method: 'post'
  })
}
/*-------对外合作交往信息管理导出-------*/
export function foreignCooMgtExport(userId,token) {
  return Request({
    url: `${foreignAffairsUrl}/coperationInfo/expSelectList?userId=${userId}&loginToken=${token}`,
    method: 'post'
  })
}
/*-------对外合作交往信息占比-------*/
export function foreignCooMgtCountryShare(userId,token) {
  return Request({
    url: `${foreignAffairsUrl}/coperationInfo/cooperCountries?userId=${userId}&loginToken=${token}`,
    method: 'post'
  })
}
/*-------历年对外合作信息情况趋势-------*/
export function foreignCooMgtCountryLine(userId,token) {
  return Request({
    url: `${foreignAffairsUrl}/coperationInfo/cooperCountryYear?userId=${userId}&loginToken=${token}`,
    method: 'post'
  })
}
