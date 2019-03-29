import Request from 'utils/request'
// let api = '/api'+ '/yyglxt/'
import {oldCadreUrl} from 'api/index'
export function medicineCheckList(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugCheck/selectList`,
    method: 'post',
    data:data
  })
}
export function medicineCheckInventoryList(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugCheck/selectInventoryList`,
    method: 'post',
    data:data
  })
}
export function medicineCheckAdd(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugCheck/drugCheck/insert`,
    method: 'post',
    data:data
  })
}
export function medicineCheckUpdate(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugCheck/drugCheck/update`,
    method: 'post',
    data:data
  })
}
export function medicineCheckShow(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugCheck/selectDetail`,
    method: 'post',
    data:data
  })
}
export function medicineCheckDelete(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugCheck/delete`,
    method: 'post',
    data:data
  })
}

// 模糊查询
export function medicineCheckBlurry(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugPurManager/selectMedicineNoPagingList`,
    method: 'post',
    data:data
  })
}
// 头部信息
export function HeadInfo(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugCheck/drugCheck/insertPage`,
    method: 'post',
    data:data
  })
}

