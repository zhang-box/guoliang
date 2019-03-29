import Request from 'utils/request'

import {
  voteUrl,
  zdUrl
} from 'api/index'

// 数据字典
export function dataDictionary(data) {
  return Request({
    url: `${voteUrl}dicNew/selectList`,
    method: 'post',
    data: data
  })
}
// 投票结果
//
export function voteDartList(data) {
  return Request({
    url: `${voteUrl}vote/voteDartList`,
    method: 'post',
    data: data
  })
}
// 相关文件sc
//
export function relatedDocSc(data) {
  return Request({
    url: `${voteUrl}project/standard-review-sc/relatedDoc`,
    method: 'post',
    data: data
  })
}
// 相关文件TC
export function relatedDocTc(data) {
  return Request({
    url: `${voteUrl}project/standard-review-tc/relatedDoc`,
    method: 'post',
    data: data
  })
}
// 项目进度sc
export function getFlowSc(data) {
  return Request({
    url: `${voteUrl}project/standard-review-sc/flow`,
    method: 'post',
    data: data
  })
}
// 项目进度tc
export function getFlowTc(data) {
  return Request({
    url: `${voteUrl}project/standard-review-tc/flow`,
    method: 'post',
    data: data
  })
}
// 标准审查阶段
//
export function getProjectDetailById(data) {
  return Request({
    url: `${voteUrl}project-new/getProjectDetailById`,
    method: 'post',
    data: data
  })
}
// 根据id获取详情sc

export function scReviewListDetail(data) {
  return Request({
    url: `${voteUrl}project/standard-review-sc/getById?id=` + data,
    method: 'get',
  })
}
// sc审查列表
export function scReviewList(data) {
  return Request({
    url: `${voteUrl}project/standard-review-sc/queryList`,
    method: 'post',
    data: data
  })
}
// sc审核
export function scReview(data) {
  return Request({
    url: `${voteUrl}project/standard-review-sc/review`,
    method: 'post',
    data: data
  })
}

// 根据id获取详情tc
export function tcReviewListDetail(data) {
  return Request({
    url: `${voteUrl}project/standard-review-tc/getById?id=` + data,
    method: 'get',
    data: data
  })
}

//   tc审查列表
export function tcReviewList(data) {
  return Request({
    url: `${voteUrl}project/standard-review-tc/queryList`,
    method: 'post',
    data: data
  })
}

//   tc审核
export function tcReview(data) {
  return Request({
    url: `${voteUrl}project/standard-review-tc/review`,
    method: 'post',
    data: data
  })
}
