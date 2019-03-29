import Request from 'utils/request'
// let api =/* '/zd'+ */'/zdglxt/'
import {zdUrl} from 'api/index'



export function stateList(parentId) {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=`+parentId,
    method: 'post',
  })
}
