import Request from 'utils/request'

// let api = '/api'+ '/yyglxt/'
import {oldCadreUrl} from 'api/index'
/*-------药品调拨添加-------*/
export function allotAdd(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugAllot/drugAllot/insert`,
    method: 'post',
    data:data
  })
}
// 疾病目录维护添加
export function insertDiseaseManager(data) {
  return Request({
    url: `${oldCadreUrl}medicineInfoManager/insertDiseaseManager`,
    method: 'post',
    data: data
  })
}
// 疾病目录信息分页列表
export function diseaseManagerSelectList(data) {
  return Request({
    url: `${oldCadreUrl}medicineInfoManager/diseaseManagerSelectList`,
    method: 'post',
    data:data
  })
}
// 疾病信息删除
export function deleteDiseaseManager(data) {
  return Request({
    url: `${oldCadreUrl}medicineInfoManager/deleteDiseaseManager`,
    method: 'post',
    data:data
  })
}
// 疾病详细信息查看
export function diseaseManagerSelectDetail(data) {
  return Request({
    url: `${oldCadreUrl}medicineInfoManager/diseaseManagerSelectDetail`,
    method: 'post',
    data:data
  })
}
// 疾病目录信息修改
export function updateDiseaseManager(data) {
  return Request({
    url: `${oldCadreUrl}medicineInfoManager/updateDiseaseManager`,
    method: 'post',
    data:data
  })
}
// 经销商信息保存
// /medicineInfoManager/insertDistributorInfoManager
export function insertDistributorInfo(data) {
  return Request({
    url: `${oldCadreUrl}medicineInfoManager/insertDistributorInfoManager`,
    method: 'post',
    data:data
  })
}

// 经销商信息分页列表
// /medicineInfoManager/distributorInfoManagerSelectList
export function distributorInfoSelectList(data) {
  return Request({
    url: `${oldCadreUrl}medicineInfoManager/distributorInfoManagerSelectList`,
    method: 'post',
    data:data
  })
}

// 经销商详细信息查看
// /medicineInfoManager/distributorInfoManagerSelectDetail
export function distributorInfoDetail(data) {
  return Request({
    url: `${oldCadreUrl}medicineInfoManager/distributorInfoManagerSelectDetail`,
    method: 'post',
    data:data
  })
}
// 经销商信息删除
// /medicineInfoManager/deleteDistributorInfoManager
export function deleteDistributorInfo(data) {
  return Request({
    url: `${oldCadreUrl}medicineInfoManager/deleteDistributorInfoManager?id=`+data,
    method: 'post',
    data:data
  })
}
// 经销商信息修改
// /medicineInfoManager/updateDistributorInfoManager
export function updateDistributorInfo(data) {
  return Request({
    url: `${oldCadreUrl}medicineInfoManager/updateDistributorInfoManager`,
    method: 'post',
    data:data
  })
}

// 卫材信息保存
// /medicineInfoManager/insertEisaiCatalog
export function insertEisaiCatalog(data) {
  return Request({
    url: `${oldCadreUrl}medicineInfoManager/insertEisaiCatalog`,
    method: 'post',
    data:data
  })
}


// 卫材信息修改
// /medicineInfoManager/updateEisaiCatalog

export function updateEisaiCatalog(data) {
  return Request({
    url: `${oldCadreUrl}medicineInfoManager/updateEisaiCatalog`,
    method: 'post',
    data:data
  })
}

// 卫材信息删除
// /medicineInfoManager/deleteEisaiCatalog
export function deleteEisaiCatalog(data) {
  return Request({
    url: `${oldCadreUrl}medicineInfoManager/deleteEisaiCatalog?id=`+data,
    method: 'post',
    data:data
  })
}

// 卫材详细信息查看
// /medicineInfoManager/eisaiCatalogSelectDetail
export function catalogSelectDetail(data) {
  return Request({
    url: `${oldCadreUrl}medicineInfoManager/eisaiCatalogSelectDetail`,
    method: 'post',
    data:data
  })
}
// 卫材信息分页列表
// /medicineInfoManager/eisaiCatalogSelectList
export function catalogSelectList(data) {
  return Request({
    url: `${oldCadreUrl}medicineInfoManager/eisaiCatalogSelectList`,
    method: 'post',
    data:data
  })
}

// 库存列表分页查询
// POST /lgbDrugStaticsQuery/selectInventoryQueryList
export function inventoryList(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugStaticsQuery/selectInventoryQueryList`,
    method: 'post',
    data:data
  })
}
// 出入库查询


// 零支出查询
// /lgbDrugStaticsQuery/selectZeroExpenditureQueryList
export function zeroList(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugStaticsQuery/selectZeroExpenditureQueryList`,
    method: 'post',
    data:data
  })
}

// 开方保存
// /prescribeManager/insertPrescribeManager
export function insertPrescribe(data) {
  return Request({
    url: `${oldCadreUrl}prescribeManager/insertPrescribeManager`,
    method: 'post',
    data:data
  })
}
// 开方信息分页列表
// POST /prescribeManager/prescribeManagerSelectList
export function prescribeList(data) {
  return Request({
    url: `${oldCadreUrl}prescribeManager/prescribeManagerSelectList`,
    method: 'post',
    data:data
  })
}

// 开方详细信息查询
export function prescribeDetailList(data) {
  return Request({
    url: `${oldCadreUrl}prescribeManager/prescribeManagerSelectDetail`,
    method: 'post',
    data:data
  })
} 

// /prescribeManager/deletePrescribeManager
export function deletePrescribe(data) {
  return Request({
    url: `${oldCadreUrl}prescribeManager/deletePrescribeManager?id=`+data,
    method: 'post',
    data:data
  })
}
