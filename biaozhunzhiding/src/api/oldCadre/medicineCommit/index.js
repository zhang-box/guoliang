import Request from 'utils/request'
// let api = '/api'+ '/yyglxt/'
import {oldCadreUrl} from 'api/index'
export function medicineCommitList(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugAllot/selectList`,
    method: 'post',
    data:data
  })
}
export function medicineCommitQuery(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugAllot/selectList`,
    method: 'post',
    data:data
  })
}
export function medicineCommitAdd(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugAllot/drugAllot/insert`,
    method: 'post',
    data:data
  })
}
export function medicineCommitUpdate(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugAllot/drugAllot/update`,
    method: 'post',
    data:data
  })
}
export function medicineCommitShow(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugAllot/selectDetail`,
    method: 'post',
    data:data
  })
}
export function medicineCommitDelete(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugAllot/delete`,
    method: 'post',
    data:data
  })
}

// 模糊查询
export function medicineCommitBlurry(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugPurManager/selectMedicineNoPagingList`,
    method: 'post',
    data:data
  })
}
// 头部信息
export function HeadInfo(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugAllot/drugAllot/insertPage`,
    method: 'post',
    data:data
  })
}

