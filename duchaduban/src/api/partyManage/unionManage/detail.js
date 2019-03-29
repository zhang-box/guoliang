import Request from 'utils/request'
// let api =/* '/api'+ */'/djglxt/'
import {partyUrl} from 'api/index'

/*-------工会会员新增-------*/
export function unionAdd(data) {
  return Request({
    url: `${partyUrl}union/update`,
    method: 'post',
    data:data
  })
}
/*-------工会会员会员编号-------*/
export function memberNo(data) {
  return Request({
    url: `${partyUrl}union/memberNo`,
    method: 'post',
    data:data
  })
}
/*-------工会会员删除-------*/
export function unionDelete(data) {
  return Request({
    url: `${partyUrl}union/delete`,
    method: 'post',
    data:data
  })
}
/*-------工会会员修改-------*/
export function unionUpdate(data) {
  return Request({
    url: `${partyUrl}union/update`,
    method: 'post',
    data:data
  })
}
/*-------工会会员查看-------*/
export function unionDetail(data) {
  return Request({
    url: `${partyUrl}union/viewDetails`,
    method: 'post',
    data:data
  })
}




