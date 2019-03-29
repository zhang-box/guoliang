import Request from 'utils/request'
// let api = /*'/api'+ */'/djglxt/'
import {worksheetUrl} from 'api/index'

/*-------代办已办列表-------*/
export function wooksheetList(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/selectWookSheet`,
    method: 'post',
    data:data
  })
}
/*-------督办编码-------*/
export function getWookSheetNum() {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/getWookSheetNum`,
    method: 'post'
  })
}
/*-------督办督查新增type:1 2 3 4 5-------*/
export function wooksheetUpdate(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/insertWookSheet`,
    method: 'post',
    data:data
  })
}
/*-------督办报告管理-------*/
export function reportList(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/report/getReportList`,
    method: 'post',
    data:data
  })
}
/*-------生成报告列表-------*/
export function reportInfoList(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/getWookSheetByDate`,
    method: 'post',
    data:data
  })
}
/*-------督办统计列表-------*/
export function dbStatisticsList(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/dbStatistics`,
    method: 'post',
    data:data
  })
}
/*-------领导审核列表-------*/
export function getLeadershipList(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/getLeadershipList`,
    method: 'post',
    data:data
  })
}
/*-------报告期下拉框-------*/
export function getReportNums() {
  return Request({
    url: `${worksheetUrl}/dcdb-api/report/getReportNums`,
    method: 'post'
  })
}
/*-------代办已办详情办理-------*/
export function getWookSheet(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/getWookSheet`,
    method: 'post',
    data: data
  })
}


