import Request from 'utils/request'
// let api = /*'/api'+*/ '/djglxt/'
import {partyUrl} from 'api/index'

/*-------预备党员管理列表-------*/
export function prepareList(data) {
  return Request({
    url: `${partyUrl}probationary/queryList`,
    method: 'post',
    data:data
  })
}
/*------预备党员管理删除-------*/
export function prepareDelete(data) {
  return Request({
    url: `${partyUrl}probationary/delete`,
    method: 'post',
    data:data
  })
}
