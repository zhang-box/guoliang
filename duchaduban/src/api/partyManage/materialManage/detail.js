import Request from 'utils/request'
// let api =/* '/api'+ */'/djglxt/'
import {partyUrl} from 'api/index'

/*-------材料维护详情-------*/
export function materialDetail(data) {
  return Request({
    url: `${partyUrl}metaialAdd/viewDetails`,
    method: 'post',
    data:data
  })
}
/*-------材料维护新增-------*/
export function materialAdd(data) {
  return Request({
    url: `${partyUrl}metaialAdd/insert`,
    method: 'post',
    data:data
  })
}
/*-------材料维护新增-------*/
export function materialUpdate(data) {
  return Request({
    url: `${partyUrl}metaialAdd/update`,
    method: 'post',
    data:data
  })
}
