import Request from 'utils/request'
// let api = '/api'+ '/yyglxt/'
import {oldCadreUrl} from 'api/index'
export function infoPillList(data) {
  return Request({
    url: `${oldCadreUrl}medicineInfoManager/drugCatalogSelectList`,
    method: 'post',
    data:data
  })
}

export function infoPillAdd(data) {
  return Request({
    url: `${oldCadreUrl}medicineInfoManager/insertDrugCatalog`,
    method: 'post',
    data:data
  })
}
export function infoPillUpdate(data) {
  return Request({
    url: `${oldCadreUrl}medicineInfoManager/updateDrugCatalog`,
    method: 'post',
    data:data
  })
}
export function infoPillShow(data) {
  return Request({
    url: `${oldCadreUrl}medicineInfoManager/drugCatalogSelectDetail`,
    method: 'post',
    data:data
  })
}
export function infoPillDelete(data) {
  return Request({
    url: `${oldCadreUrl}medicineInfoManager/drugCatalogSubmit`,
    method: 'post',
    data:data
  })
}
