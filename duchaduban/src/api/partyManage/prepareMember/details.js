import Request from 'utils/request'
// let api =/* '/api'+ */'/djglxt/'
import {partyUrl} from 'api/index'

/*------预备党员管理新增-------*/
export function prepareAdd(data) {
  return Request({
    url: `${partyUrl}probationary/insert`,
    method: 'post',
    data:data
  })
}
/*------预备党员管理修改-------*/
export function prepareUpdate(data) {
  return Request({
    url: `${partyUrl}probationary/update`,
    method: 'post',
    data:data
  })
}
/*------预备党员管理查看-------*/
export function prepareDetail(data) {
  return Request({
    url: `${partyUrl}probationary/viewDetails`,
    method: 'post',
    data:data
  })
}
/*------预备党员管理转为正式党员-------*/
export function prepareTurn(data) {
  return Request({
    url: `${partyUrl}probationary/formalMember`,
    method: 'post',
    data:data
  })
}


