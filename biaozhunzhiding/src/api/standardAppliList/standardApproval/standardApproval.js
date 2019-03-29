import Request from 'utils/request'

import {
  voteUrl,
  zdUrl,
  baseUrl
} from 'api/index'

// *************************************审批详情****************************************//
export function projectDetail(data) {
  return Request({
    url: `${voteUrl}project/detail`,
    method: 'post',
    data : data
  })
}

// *************************************标准审批****************************************//
//TC审批列表
export function standardApprovalTCList(data) {
  return Request({
    url: `${voteUrl}project/standard-approval-tc/queryList`,
    method: 'post',
    data: data
  })
}
//TC审批列表详情--业务办理
export function approvalTCById(data) {
  return Request({
    url: `${voteUrl}project/standard-approval-tc/getById?id=` + data,
    method: 'get',
  })
}
//TC审批--审核提交
export function approvalTCReview(data) {
  return Request({
    url: `${voteUrl}project/standard-approval-tc/review`,
    method: 'post',
    data: data
  })
}
//国粮局审批列表
export function standardApprovalNBRList(data) {
  return Request({
    url: `${voteUrl}project/standard-approval-grain/queryList`,
    method: 'post',
    data: data
  })
}
//国粮局审批列表详情--业务办理
export function approvalGrainById(data) {
  return Request({
    url: `${voteUrl}project/standard-approval-grain/getById?id=` + data,
    method: 'get',
  })
}
//国粮局审批--审核提交
export function approvalGrainReview(data) {
  return Request({
    url: `${voteUrl}project/standard-approval-grain/review`,
    method: 'post',
    data: data
  })
}
//国粮局批量审批
export function getProjectDetailById(data) {
  return Request({
    url: `${voteUrl}project-new/getProjectDetailById`,
    method: 'post',
    data: data
  })
}
//获取基本信息
export function batchReview(data) {
  return Request({
    url: `${voteUrl}project/standard-approval-grain/batchReview`,
    method: 'post',
    data: data
  })
}
//获取相关文件
export function relatedDoc(data) {
  return Request({
    url: `${voteUrl}project-new/relatedDoc`,
    method: 'post',
    data: data
  })
}
//获取项目进度
export function getFlow(data) {
  return Request({
    url: `${voteUrl}project-new/flow`,
    method: 'post',
    data: data
  })
}
//获取基本信息文件详情
export function fileDetail(data) {
  return Request({
    url: `${voteUrl}resNew/getDetail?resId=` + data,
    method: 'get',
  })
}
//获取上传文件详情---多文件上传
export function MultiFileDetail(id) {
  return Request({
    url: `${voteUrl}resNew/getDetails?resIds=${id}`,
    method: 'get'
  })
}
//审核--基本信息提交（保存）
export function applySend(data) {
  return Request({
    url: `${voteUrl}project/standard-proj-new/apply`,
    method: 'post',
    data: data
  })
}
// *************************************统计查询****************************************//
//统计查询列表
export function querystatsList(data) {
  return Request({
    url: `${voteUrl}project/querystats/queryList`,
    method: 'post',
    data: data
  })
}
//获取投票结果
export function voteResult(data) {
  return Request({
    url: `${voteUrl}project-new/vote`,
    method: 'post',
    data: data
  })
}
// *************************************专家管理****************************************//
//专家管理列表
export function expertList(data) {
  return Request({
    url: `${voteUrl}member/queryLists`,
    method: 'post',
    data: data
  })
}
//专家管理详情
export function expertById(data) {
  return Request({
    url: `${voteUrl}member/getById`,
    method: 'post',
    data: data
  })
}
//修改
export function expertUpdate(data) {
  return Request({
    url: `${voteUrl}member/update`,
    method: 'post',
    data: data
  })
}
//删除
export function expertDel(data) {
  return Request({
    url: `${voteUrl}member/delById`,
    method: 'post',
    data: data
  })
}
//新增
export function expertAdd(data) {
  return Request({
    url: `${voteUrl}member/insert`,
    method: 'post',
    data: data
  })
}
// *************************************文件共享****************************************//
//文件夹列表
export function getFolder() {
  return Request({
    url: `${voteUrl}file/getFolder`,
    method: 'post',
  })
}
//文件路径
export function getFolderList() {
  return Request({
    url: `${voteUrl}file/folder`,
    method: 'post',
  })
}
//文件列表
export function getFileList(data) {
  return Request({
    url: `${voteUrl}file/queryList`,
    method: 'post',
    data: data
  })
}
//批量文件下载
export function fileDownloads(data) {
  return Request({
    url: `${voteUrl}file/downloads?ids=`+ data,
    method: 'get'
  })
}
//删除文件
export function fileDelete(data) {
  return Request({
    url: `${voteUrl}file/delete`,
    method: 'post',
    data: data
  })
}
//创建文件夹
export function fileFloder(data) {
  return Request({
    url: `${voteUrl}file/mkdir`,
    method: 'post',
    data: data
  })
}
//创建文件
export function fileUpload(data) {
  return Request({
    url: `${voteUrl}file/uploadOne`,
    method: 'post',
    data: data,
  })
}
//文件预览
export function fileLook(data) {
  return Request({
    url: `${voteUrl}file/look?id=`+data,
    method: 'get',
  })
}

// *************************************注册****************************************//
//地区接口
/**
 * @param array data
 */
export function region(data = []) {
  return Request({
    url: `${baseUrl}visitor/area`,
    method: 'post',
    data: data,
  })
}
//用户注册
export function register(data) {
    // var url = `${baseUrl}visitor/registerUser?`;
    // for (var key in data) {
    //     if (data.hasOwnProperty(key)) {
    //         url += key+'='+data[key]+'&'
    //     }
    // }
  return Request({
      // url: url,
    url: `${baseUrl}visitor/registerUser`,
    method: 'post',
    data: data,
  })
}
//验证码
export function VerificationCode() {
  return Request({
    url: `${voteUrl}visitor/code`,
    method: 'get'
  })
}
//邮箱校验
export function checkEmail() {
  return Request({
    url: `${voteUrl}visitor/checkEmail`,
    method: 'get'
  })
}
//人员管理列表
export function PersonManageList(data) {
  return Request({
    url: `${baseUrl}sysUser/selectListBySelection`,
    method: 'post',
    data: data
  })
}
//用户类型
export function userType(type) {
  return Request({
    url: `${baseUrl}visitor/dict?dictType=${type}`,
    method: 'get'
  })
}
