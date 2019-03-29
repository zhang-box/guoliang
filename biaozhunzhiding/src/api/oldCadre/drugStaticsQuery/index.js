import Request from 'utils/request'
// let api = '/api'+ '/yyglxt/'
import {oldCadreUrl} from 'api/index'
export function countOutPutQueryList(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugStaticsQuery/selectOutOfStorageQueryList`,
    method: 'post',
    data:data
  })
}
export function countOutPutDetailList(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugStaticsQuery/selectOutOfStorageQueryDetail`,
    method: 'post',
    data:data
  })
}

export function countPillQueryList(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugStaticsQuery/selectNearEffectQueryList`,
    method: 'post',
    data:data
  })
}

export function countZeroQueryList(data) {
  return Request({
    url: `${oldCadreUrl}lgbDrugStaticsQuery/selectZeroExpenditureQueryList`,
    method: 'post',
    data:data
  })
}
