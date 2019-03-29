import Request from 'utils/request'

import {voteUrl} from 'api/index'


/* 各阶段占比*/
export function queryAllDate(){
  return Request({
    url: `${voteUrl}visitInfo/queryAllDate`,
    method: 'post',
  })
}
/*头部标准数*/
export function queryCount(){
  return Request({
    url: `${voteUrl}visitInfo/queryCount`,
    method: 'post',
  })
}

/*在研标准数*/
export function queryDepartmentCount(){
  return Request({
    url: `${voteUrl}visitInfo/queryDepartmentCount`,
    method: 'post',
  })
}
/*标准类型子占比*/
export function queryDw(data){
  return Request({
    url: `${voteUrl}visitInfo/queryDw`,
    method: 'post',
    data:data
  })
}
/*标准类型占比*/
export function queryClassfy(){
  return Request({
    url: `${voteUrl}visitInfo/queryClassfy`,
    method: 'post',
  })
}
/*年度标准发布数量*/
export function queryDwfz(){
  return Request({
    url: `${voteUrl}visitInfo/queryDwfz`,
    method: 'post',
  })
}
// 数据更新时间
export function updateTime(data){
  return Request({
    url: `${voteUrl}visitInfo/querySj`,
    method: 'post',
    data:data
  })
}
// 数据更新时间
export function ExpertCount(data){
  return Request({
    url: `${voteUrl}visitInfo/queryExpertCount`,
    method: 'post',
    data:data
  })
}
