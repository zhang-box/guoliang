import Request from 'utils/request'

import {voteUrl,zdUrl} from 'api/index'


//批量审核
export function BatchAudit(data) {
  return Request({
    url: `${voteUrl}project/standard-proj-grain/batchReview`,
    method: 'post',
    data:data
  })
}

//获取上传文件详情
export function FileUploadDetails(id) {
  return Request({
    url: `${voteUrl}resNew/getDetail?resId=${id}`,
    method: 'get'
  })
}

//获取上传文件详情---多文件上传
export function MultiFileUpload(id) {
  return Request({
    url: `${voteUrl}resNew/getDetails?resIds=${id}`,
    method: 'get'
  })
}
//立项申请列表
export function applicationList(userId,loginToken,data = []) {
  return Request({
    url: `${voteUrl}project/standard-proj-new/queryList?userId=${userId}&loginToken=${loginToken}`,
    method: 'post',
    data:data
  })
}

//数据字典
export function dataDictionary(data) {
  return Request({
    url: `${voteUrl}dicNew/selectList`,
    method: 'post',
    data:data
  })
}
//立项申请-新增
export function insertProject(data) {
  return Request({
    url: `${voteUrl}project/standard-proj-new/apply`,
    method: 'post',
    data:data
  })
}
//基本信息
export function applicationDetail(id) {
  return Request({
    url: `${voteUrl}project-new/getProjectDetailById?projId=${id}`,
    method: 'post'
  })
}
//SC初审列表
export function SCfirstTrialList(userId,loginToken,data = []) {
    console.log(data);
  return Request({
    url: `${voteUrl}project/standard-proj-sc/queryList?userId=${userId}&loginToken=${loginToken}`,
    method: 'post',
    data:data
  })
}
//SC初审--审核
export function SCfirstTrialExamine(data) {
  return Request({
    url: `${voteUrl}project/standard-proj-sc/review`,
    method: 'post',
    data:data
  })
}
//SC初审--详情
export function SCFirstTrialDetail(id) {
  return Request({
    url: `${voteUrl}project/standard-proj-sc/getById?id=${id}`,
    method: 'get'
    // data:data
  })
}
// SC初审-项目进度
export function SCProjectProgress(data){
    return Request({
      url: `${voteUrl}project/standard-proj-sc/flow`,
      method: 'post',
      data:data
    })
}
// SC初审-相关文件
export function SCRelatedDocuments(data){
    return Request({
      url: `${voteUrl}project/standard-proj-sc/relatedDoc`,
      method: 'post',
      data:data
    })
}

// 流程进度
export function ProjectProgress(data) {
  return Request({
    url: `${voteUrl}project-new/flow`,
    method: 'post',
    data:data
  })
}
// 相关文件
export function RelatedDocuments(data) {
  return Request({
    url: `${voteUrl}project-new/relatedDoc`,
    method: 'post',
    data:data
  })
}
// 投票结果
export function VoteResults(data) {
  return Request({
    url: `${voteUrl}project-new/vote`,
    method: 'post',
    data:data
  })
}
//TC复审列表
export function TCRecheckList(userId,loginToken,data = []) {
    console.log(data);
  return Request({
    url: `${voteUrl}project/standard-proj-tc/queryList?userId=${userId}&loginToken=${loginToken}`,
    method: 'post',
    data:data
  })
}
// TC复审详情
export function TCReviewDetail(id) {
  return Request({
    url: `${voteUrl}project/standard-proj-tc/getById?id=${id}`,
    method: 'get'
    // data:data
  })
}
// TC复审--项目进度
export function TCProjectProgress(data){
    return Request({
      url: `${voteUrl}project/standard-proj-tc/flow`,
      method: 'post',
      data:data
    })
}
// TC复审-项目相关文件
export function TCRelatedDocuments(data){
    return Request({
      url: `${voteUrl}project/standard-proj-tc/relatedDoc`,
      method: 'post',
      data:data
    })
}

//TC复审--审核
export function TCReview(data) {
  return Request({
    url: `${voteUrl}project/standard-proj-tc/review`,
    method: 'post',
    data:data
  })
}
//TC复审--审核
export function NationalBureauReview(data) {
  return Request({
    url: `${voteUrl}project/standard-proj-grain/review`,
    method: 'post',
    data:data
  })
}
//国粮局审核列表
export function NationalBureauReviewList(userId,loginToken,data = []) {
  return Request({
    url: `${voteUrl}project/standard-proj-grain/queryList?userId=${userId}&loginToken=${loginToken}`,
    method: 'post',
    data:data
  })
}
//国粮局审核--详情
export function NationalBureauDetail(id) {
  return Request({
    url: `${voteUrl}project/standard-proj-grain/getById?id=${id}`,
    method: 'get'
    // data:data
  })
}
// 国粮局审核相关进度
export function NationalProjectProgress(data) {
    return Request({
      url: `${voteUrl}project/standard-proj-grain/flow`,
      method: 'post',
      data:data
    })
}
// 国粮局审核相关文件
export function NationalDocuments(data) {
    return Request({
      url: `${voteUrl}project/standard-proj-grain/relatedDoc`,
      method: 'post',
      data:data
    })
}
//标准发布列表
export function standardReleaseList(userId,loginToken,data = []) {
  return Request({
    url: `${voteUrl}project/standard-release/queryList?userId=${userId}&loginToken=${loginToken}`,
    method: 'post',
    data:data
  })
}

//标准发布详情
export function standardReleaseDetail(id) {
  return Request({
    url: `${voteUrl}project/standard-release/getById?id=${id}`,
    method: 'get'
  })
}

// 标准发布相关进度/
export function standardReleaseProgress(data) {
    return Request({
      url: `${voteUrl}project/standard-release/flow`,
      method: 'post',
      data:data
    })
}
// 国粮局审核相关文件
export function standardReleaseDocuments(data) {
    return Request({
      url: `${voteUrl}project/standard-release/relatedDoc`,
      method: 'post',
      data:data
    })
}

//标准发布-确认发布
export function ConfirmationRelease(data) {
  return Request({
    url: `${voteUrl}project/standard-release/review`,
    method: 'post',
    data:data
  })
}

//标准批量发布
export function batchConfirmationRelease(data) {
  return Request({
    url: `${voteUrl}project/standard-release/batchReview`,
    method: 'post',
    data:data
  })
}

//标准档案列表
export function standardFileList(userId,loginToken,data = []) {
  return Request({
    url: `${voteUrl}project/standard-record/queryList?userId=${userId}&loginToken=${loginToken}`,
    method: 'post',
    data:data
  })
}
// 标准档案相关文件
export function standardFileProgress(data) {
    return Request({
      url: `${voteUrl}project/standard-record/flow`,
      method: 'post',
      data:data
    })
}
// 国粮局审核相关文件
export function standardFileDocuments(data) {
    return Request({
      url: `${voteUrl}project/standard-record/relatedDoc`,
      method: 'post',
      data:data
    })
}
export function projectDetail(data) {
  return Request({
    url: `${voteUrl}project/detail`,
    method: 'post',
    data : data
  })
}
