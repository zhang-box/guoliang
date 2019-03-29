import Request from 'utils/request'

import {voteUrl,zdUrl} from 'api/index'


// *************************************发起投票****************************************
//发起投票列表
export function voteList(data){
  return Request({
    url: `${voteUrl}vote/queryList`,
    method: 'post',
    data:data
  })
}
//投票详情
export function voteDetail(data){
  return Request({
    url: `${voteUrl}vote/voteDartList`,
    method: 'post',
    data:data
  })
}
//发起投票详情
export function voteDetailById(data){
  return Request({
    url: `${voteUrl}vote/getDetailById`,
    method: 'post',
    data:data
  })
}
// *************************************我的投票****************************************
//我的投票列表
export function myVoteList(data){
  return Request({
    url: `${voteUrl}vote/myQueryList`,
    method: 'post',
    data:data
  })
}
//投票
export function voting(data){
  return Request({
    url: `${voteUrl}voteParty/vote`,
    method: 'post',
    data:data
  })
}
//获取标准
export function getVoteProj(all){
  return Request({
    url: `${voteUrl}vote/getVoteProj?workflow=${all}`,
    method: 'post'
  })
}
//投票专家列表
export function expertLists(data){
  return Request({
    url: `${voteUrl}member/queryList`,
    method: 'post',
    data:data
  })
}
// *************************************委员履职考核****************************************

//委员履职考核列表
export function memberVoteList(data){
  return Request({
    url: `${voteUrl}vote/memberVoteList`,
    method: 'post',
    data:data
  })
}

//发起投票根据选择标准获取参与人
export function getMemberByproId(id){
  return Request({
    url: `${voteUrl}member/getMemberByproId?proId=${id}`,
    method: 'post'
  })
}
