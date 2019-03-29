import Request from 'utils/request'
import {oldCadreUrl} from 'api/index'
// let api = '/api'+ '/yyglxt/'

export function warningList(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugNearEffect/selectList`,
    method: 'post',
    data:data
  })
}

export function warningDelete(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugNearEffect/selectList`,
    method: 'post',
    data:data
  })
}

export function warningUpdate(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugNearEffect/drugNearEffect/update`,
    method: 'post',
    data:data
  })
}
export function warningAdd(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugNearEffect/drugNearEffect/insert`,
    method: 'post',
    data:data
  })
}
