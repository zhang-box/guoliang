import Request from 'utils/request'
// let api =/* '/zd'+ */'/zdglxt/'
import {meetingManageUrl} from 'api/index'



export function stateList(parentId) {
  return Request({
    url: `${meetingManageUrl}dicNew/selectList?userId=1&loginToken=1&parentId=`+parentId,
    method: 'post',
  })
}
