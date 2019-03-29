import Request from 'utils/request'
// let api = /*'/api'+ */'/djglxt/'
import {partyUrl} from 'api/index'

/*-------党费管理列表-------*/
export function costList(data) {
  return Request({
    url: `${partyUrl}shipInfo/queryList`,
    method: 'post',
    data:data
  })
}
