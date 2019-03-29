import Request from 'utils/request'
// let api = /*'/api'+ */'/djglxt/'
import {partyUrl} from 'api/index'

/*-------工会会员列表-------*/
export function unionList(data) {
  return Request({
    url: `${partyUrl}union/queryList`,
    method: 'post',
    data:data
  })
}
