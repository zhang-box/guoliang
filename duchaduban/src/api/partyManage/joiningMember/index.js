import Request from 'utils/request'
// let api = /*'/api'+*/ '/djglxt/'
import {partyUrl} from 'api/index'

/*------入党积极分子列表-------*/
export function joiningList(data) {
  return Request({
    url: `${partyUrl}memberInfo/queryList`,
    method: 'post',
    data:data
  })
}
/*------入党积极分子删除-------*/
export function joiningDelete(data) {
  return Request({
    url: `${partyUrl}memberInfo/delete`,
    method: 'post',
    data:data
  })
}
