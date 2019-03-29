import Request from 'utils/request'

import {voteUrl,zdUrl} from 'api/index'

// 标准起草列表
export function standardDraftQueryList(data) {
    return Request({
      url: `${voteUrl}project/standard-draft/queryList`,
      method: 'post',
      data:data
    })
  }
//标准起草审核
  export function standardDraftReview(data) {
    return Request({
      url: `${voteUrl}project/standard-draft/review`,
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

//根据id获取立项-详情
  export function applicationDetail(data) {
    return Request({
      url: `${voteUrl}project-new/getProjectDetailById`,
      method: 'post',
      data:data
    })
  }

  // 项目进度
  export function projectSchedule(data) {
    return Request({
      url: `${voteUrl}project/standard-draft/flow`,
      method: 'post',
      data:data
    })
  }

  // 相关文件
  export function RelatedFile(data) {
    return Request({
      url: `${voteUrl}project/standard-draft/relatedDoc`,
      method: 'post',
      data:data
    })
  }
  // 办理业务
  export function standardDraftGetById(data) {
    return Request({
      url: `${voteUrl}project/standard-draft/getById?id=` + data,
      method: 'get',
      data:data
    })
  }
