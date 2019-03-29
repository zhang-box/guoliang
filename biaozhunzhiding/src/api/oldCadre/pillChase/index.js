import Request from 'utils/request'
// let api = '/api'+ '/yyglxt/'
import {oldCadreUrl} from 'api/index'
export function pillChaseList(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugPurManager/selectList`,
    method: 'post',
    data:data
  })
}
//审批分页
export function pillChaseReviewList(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugPurManager/selectcheckList`,
    method: 'post',
    data:data
  })
}

export function pillChaseAdd(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugPurManager/drugPurApply/insert`,
    method: 'post',
    data:data
  })
}
export function pillChaseAddSub(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugPurManager/drugPurApply/insertSubmit`,
    method: 'post',
    data:data
  })
}
export function pillChaseUpdateSub(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugPurManager/drugPurApply/updateSubmit`,
    method: 'post',
    data:data
  })
}
export function pillChaseSubmit(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugPurManager/drugPurApply/submit`,
    method: 'post',
    data:data
  })
}
export function pillChaseUpdate(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugPurManager/drugPurApply/update`,
    method: 'post',
  })
}
export function pillChaseShow(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugPurManager/selectDetail`,
    method: 'post',
    data:data
  })
}
export function pillChaseDelete(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugPurManager/delete`,
    method: 'post',
    data:data
  })
}
// 模糊查询
export function pillChaseBlurry(data) {
  return Request({
    url: `${oldCadreUrl}medicineInfoManager/drugCatalogLikeSelectList`,
    method: 'post',
    data:data
  })
}
//头部条件
export function pillChaseHeadInfo(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugPurManager/drugPurApply/insertPage`,
    method: 'post',
    data:data
  })
}
//审批
export function pillChaseCheck(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugPurManager/drugPurApply/check`,
    method: 'post',
    data:data
  })
}

// 采购查询
export function selectList(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugPurManager/selectcheckList`,
    method: 'post',
    data:data
  })
}
// 采购详情查看
export function selectDetail(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugPurManager/selectCheckDetail`,
    method: 'post',
    data:data
  })
}
