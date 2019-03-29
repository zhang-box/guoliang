import Request from 'utils/request'
// let api = '/api'+ '/yyglxt/'
import {oldCadreUrl} from 'api/index'
export function medicineBreakageList(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugBreakage/selectList`,
    method: 'post',
    data:data
  })
}
export function medicineBreakageAdd(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugBreakage/drugBreakage/insert`,
    method: 'post',
    data:data
  })
}
export function medicineBreakageUpdate(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugBreakage/drugBreakage/update`,
    method: 'post',
    data:data
  })
}
export function medicineBreakageShow(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugBreakage/selectDetail`,
    method: 'post',
    data:data
  })
}
export function medicineBreakageDelete(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugBreakage/delete`,
    method: 'post',
    data:data
  })
}

// 模糊查询
export function medicineBreakageBlurry(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugCheck/selectInventoryList`,
    method: 'post',
    data:data
  })
}
// 头部信息
export function HeadInfo(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugBreakage/drugBreakage/insertPage`,
    method: 'post',
    data:data
  })
}

