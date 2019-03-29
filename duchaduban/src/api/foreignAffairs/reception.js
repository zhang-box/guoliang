import Request from 'utils/request'
import {foreignAffairsUrl} from 'api/index'
// let api = '/api'+ '/wsglxt/'
/*-------来访信息管理列表-------*/
export function receptionMgtList(data) {
  return Request({
    url: `${foreignAffairsUrl}receptionInfo/selectList`,
    method: 'post',
    data: data
  })
}
/*-------来访信息管理新增-------*/
export function receptionMgtAdd(data) {
  return Request({
    url: `${foreignAffairsUrl}/receptionInfo/insert`,
    method: 'post',
    data: data
  })
}
/*-------来访信息管理查看-------*/
export function receptionMgtDetail(userId,token,id) {
  return Request({
    url: `${foreignAffairsUrl}/receptionInfo/view?userId=${userId}&loginToken=${token}&id=${id}`,
    method: 'post',
  })
}
/*-------来访信息管理修改-------*/
export function receptionMgtUpdate(data) {
  return Request({
    url: `${foreignAffairsUrl}/receptionInfo/update`,
    method: 'post',
    data: data
  })
}
/*-------来访信息管理删除-------*/
export function receptionMgtDelete(userId,token,id) {
  return Request({
    url: `${foreignAffairsUrl}/receptionInfo/delete?userId=${userId}&loginToken=${token}&id=${id}`,
    method: 'post'
  })
}
/*-------来访信息管理导出-------*/
export function receptionMgtExport(userId,token) {
  return Request({
    url: `${foreignAffairsUrl}/receptionInfo/expSelectList?userId=${userId}&loginToken=${token}`,
    method: 'post'
  })
}
/*-------文件上传-------*/
export function receptionMergeUpload(){
	return Request({
		url:`${foreignAffairsUrl}/resNew/fileUpload`,
		method:'post',
		data:data
	})
}
/*-------来访国家占比-------*/
export function receptionCountryShare(userId,token) {
	return Request({
		url: `${foreignAffairsUrl}/receptionInfo/recCountries?userId=${userId}&loginToken=${token}`,
		method: 'post'
	})
}
/*-------历年各国来访情况趋势-------*/
export function receptionCountryLine(userId,token) {
  return Request({
    url: `${foreignAffairsUrl}/receptionInfo/resCountryYear?userId=${userId}&loginToken=${token}`,
    method: 'post'
  })
}
