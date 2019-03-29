import Request from 'utils/request'

import {voteUrl,zdUrl} from 'api/index'

// *************************************字典****************************************
export function getSelectInfo(data){
  return Request({
    url: `${zdUrl}dicNew/selectList`,
    method: 'post',
    data:data
  })
}

// *****************************************************************************

//根据id获取立项详情
export function getProject(data) {
  return Request({
    url: `${voteUrl}project/getProject`,
    method: 'post',
    data:data
  })
}
//立项申请-新增
export function insertProject(data) {
  return Request({
    url: `${voteUrl}project/insertProject`,
    method: 'post',
    data:data
  })
}
//立项申请-修改
export function updateProject(data) {
  return Request({
    url: `${voteUrl}project/updateProject`,
    method: 'post',
    data:data
  })
}
//立项申请-删除
export function deleteProject(data) {
  return Request({
    url: `${voteUrl}project/deleteProject`,
    method: 'post',
    data:data
  })
}


//审核信息
export function getRecordList(data) {
  return Request({
    url: `${voteUrl}project/getRecordList`,
    method: 'post',
    data:data
  })
}
//项目分页列表
export function selectList(data) {
  return Request({
    url: `${voteUrl}project/selectList`,
    method: 'post',
    data:data
  })
}

//发起投票分页列表
export function queryList(data) {
    return Request({
      url: `${voteUrl}vote/queryList`,
      method: 'post',
      data:data
    })
  }

//创建投票
export function insert(data) {
  return Request({
    url: `${voteUrl}vote/insert`,
    method: 'post',
    data:data
  })
}



  //我的投票分页列表
export function participateQueryList(data) {
  // debugger
  // console.log(data)

    return Request({
      url: `${voteUrl}vote/participate/queryList`,
      method: 'post',
      data:data
    })
  }



    //参与结果统计
export function participateCount(data) {
    return Request({
      url: `${voteUrl}vote/participate/participateCount`,
      method: 'post',
      data:data
    })
  }
  