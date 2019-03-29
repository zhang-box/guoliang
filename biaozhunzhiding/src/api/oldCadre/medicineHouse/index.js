import Request from 'utils/request'
// let api = '/api'+ '/yyglxt/'
import {oldCadreUrl} from 'api/index'
export function drugStorageList(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugStorage/selectList`,
    method: 'post',
    data:data
  })
}
export function drugStorageQuery(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugStorage/selectList`,
    method: 'post',
    data:data
  })
}
export function medicineHouseAdd(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugStorage/drugStorage/insert`,
    method: 'post',
    data:data
  })
}
export function medicineHouseUpdate(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugStorage/drugStorage/update`,
    method: 'post',
    data:data
  })
}
export function medicineHouseShow(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugStorage/selectDetail`,
    method: 'post',
    data:data
  })
}
export function medicineHouseDelete(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugStorage/delete`,
    method: 'post',
    data:data
  })
}

// 模糊查询
export function medicineHouseBlurry(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugPurManager/selectMedicineNoPagingList`,
    method: 'post',
    data:data
  })
}
// 头部信息
export function HeadInfo(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugStorage/drugStorage/insertPage`,
    method: 'post',
    data:data
  })
}

