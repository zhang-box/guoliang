import Request from 'utils/request'
// let api =/* '/api'+ */'/djglxt/'
import {partyUrl} from 'api/index'

/*-------材料维护列表-------*/
export function materialList(data) {
  return Request({
    url: `${partyUrl}metaialAdd/queryList`,
    method: 'post',
    data:data
  })
}
/*-------材料维护删除-------*/
export function materialDelete(data) {
  return Request({
    url: `${partyUrl}metaialAdd/delete`,
    method: 'post',
    data:data
  })
}
/*-------材料维护查询-------*/
export function materialSearch(data) {
  return Request({
    url: `${partyUrl}metaialAdd/queryList`,
    method: 'post',
    data:data
  })
}
