import Request from 'utils/request'

import {voteUrl,zdUrl} from 'api/index'

// 征求意见列表
export function SolicitOpinionsList(data){
    return Request({
        url: `${voteUrl}project/seek-opinion-tc/queryList`,
        method: 'post',
        data:data
      })
}
// 审核
export function opiniontcReview(data){
  return Request({
      url: `${voteUrl}project/seek-opinion-tc/review`,
      method: 'post',
      data:data
    })
}

// 数据字典
export function dataDictionary(data) {
    return Request({
      url: `${voteUrl}dicNew/selectList`,
      method: 'post',
      data:data
    })
  }

// 详情
export function applicationDetail(data) {
    return Request({
      url: `${voteUrl}project-new/getProjectDetailById`,
      method: 'post',
      data:data
    })
  }

// 相关文件
export function RelatedFile(data) {
  return Request({
    url: `${voteUrl}project/seek-opinion-tc/relatedDoc`,
    method: 'post',
    data:data
  })
}

// 项目进度
export function projectSchedule(data) {
  return Request({
    url: `${voteUrl}project/seek-opinion-tc/flow`,
    method: 'post',
    data:data
  })
}
// 办理业务
// /project/seek-opinion-tc/getById
export function opinionTcGetById(data) {
  return Request({
    url: `${voteUrl}project/seek-opinion-tc/getById?id=` + data,
    method: 'get',
    data:data
  })
}
