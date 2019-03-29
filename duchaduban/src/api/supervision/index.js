import Request from 'utils/request'
// let api = /*'/api'+ */'/djglxt/'
import {worksheetUrl} from 'api/index'


/*-------承办司局获取主管领导-------*/
export function getLeader(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/getPeople`,
    method: 'post',
    data:data
  })
}
/*-------办公室获取主管领导-------*/
export function getReportLeader(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/report/getPeople`,
    method: 'post',
    data:data
  })
}
/*-------办公室获取下一步审核人-------*/
export function getAuditor(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/report/getLeader`,
    method: 'post',
    data:data
  })
}

/*-------代办已办列表-------*/
export function wooksheetList(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/selectWookSheet`,
    method: 'post',
    data:data
  })
}
/*-------督办登记列表-------*/
export function selectLoginWookSheet(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/selectLoginWookSheet`,
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
export function wooksheetAdd(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/insert`,
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
    url: `${worksheetUrl}dcdb-api/report/getLeadershipList`,
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
/*-------承办单位-------*/
export function getDepartments() {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/getDepartment`,
    method: 'post',
  })
}
/*-------通过id获取承办单位名-------*/
export function getDepartmentsName(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/getDepartmentsName`,
    method: 'post',
    data: data
  })
}
/*-------会办单位-------*/
export function getDepartmentsBycode(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/department/getDepartmentsBycode`,
    method: 'post',
    data: data
  })
}
/*-------事件类型-------*/
export function getSuperviseType(data) {
  return Request({
    url: `${worksheetUrl}dicNew/selectList`,
    method: 'post',
    data: data
  })
}
/*-------事件类型-------*/
export function filesDetail(data) {
  return Request({
    url: `${worksheetUrl}resNew/getDetails?resIds=` + data,
    method: 'get',
  })
}

/*-------督办管理登记修改-------*/
export function wooksheetUpdate(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/update`,
    method: 'post',
    data: data
  })
}
/*-------进展报送发送-------*/
export function progressReport(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/progressReport`,
    method: 'post',
    data: data
  })
}
/*-------催办-------*/
export function reminder(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/reminder`,
    method: 'post',
    data: data
  })
}
/*-------删除-------*/
export function deleteData(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/delete`,
    method: 'post',
    data: data
  })
}
/*-------生成报告报告期下拉框-------*/
export function getUnReportNums() {
  return Request({
    url: `${worksheetUrl}dcdb-api/report/getUnReportNums`,
    method: 'post',
  })
}
/*-------生成报告根据时间查询列表------*/
export function getWookSheetByDate(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/getWookSheetByDate`,
    method: 'post',
    data: data
  })
}
/*-------生成报告暂存------*/
export function addReport(data) {
  return Request({
    url: `${worksheetUrl}/dcdb-api/report/addReport`,
    method: 'post',
    data: data
  })
}
/*-------生成报告修改------*/
export function getReportById(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/report/getReportById`,
    method: 'post',
    data: data
  })
}
/*-------生成报告修改暂存------*/
export function reportUpdate(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/report/update`,
    method: 'post',
    data: data
  })
}
/*-------承办司局审批通过------*/
export function approvalBtn(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/approval`,
    method: 'post',
    data: data
  })
}
/*-------办公室领导审核导出------*/
export function exportOffice(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/Educe/exportOffice?userId=`+ data.userId +`&loginToken=`+ data.loginToken +`&exportType=`+ data.exportType ,
    method: 'get',
  })
}
/*-------督办登记（列表）导出------*/
export function exportData(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/Educe/exportTable?userId=`+ data.userId +`&loginToken=`+ data.loginToken +`&type=`+ data.type +`&exportType=`+ data.exportType,
    method: 'get',
  })
}
/*-------生成报告导出------*/
export function exportReport1(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/Educe/report?&rowRD=`+ data.rowRD +`&rowTitle=`+ data.rowTitle +`&type=`+ data.type +`&monthlyReport=`+ data.monthlyReport +'&time=' +data.time,
    method: 'get',
  })
}
/*-------督办报告导出------*/
export function exportReport(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/Educe/report?&reportId=`+data.reportId+`&rowRD=`+ data.rowRD +`&rowTitle=`+ data.rowTitle +`&type=`+ data.type +`&monthlyReport=`+ data.monthlyReport +'&time=' +data.time,
    method: 'get',
  })
}
/*-------办公室领导审核详情列表------*/
export function approvalById(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/report/getReportById`,
    method: 'post',
    data: data
  })
}
/*-------办公室领导审核提交------*/
export function approvalSumbit(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/report/approval`,
    method: 'post',
    data: data
  })
}
/*-------办公室领导审核审批退回------*/
export function approvalReturn(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/report/approvalReturn`,
    method: 'post',
    data: data
  })
}
/*-------办公室逾期-审批-提交------*/
export function overdueApproval(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/overdueApproval`,
    method: 'post',
    data: data
  })
}
/*-------办公室逾期-审批-历史记录------*/
export function historyList(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/history`,
    method: 'post',
    data: data
  })
}
/*-------承办司局-报送统计-发送局办------*/
export function sendOffice(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/sendOffice`,
    method: 'post',
    data: data
  })
}
/*-------办公室逾期-审批-暂存------*/
export function overdueApprovalTemporary(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/overdueApprovalTemporary`,
    method: 'post',
    data: data
  })
}
/*-------进展报送暂存------*/
export function progressReportTemporary(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/progressReportTemporary`,
    method: 'post',
    data: data
  })
}
/*-------领导审核-数据退回------*/
export function approvalReject(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/approvalReject`,
    method: 'post',
    data: data
  })
}
/*-------领导审核-(1 2面）------*/
export function exportDataList(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/Educe/checkOne`,
    method: 'post',
    data: data
  })
}
/*-------承办单位下拉框------*/
export function getAllTakeUnit(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/getAllTakeUnit`,
    method: 'post',
    data: data
  })
}
/*-------汇总查询-保存------*/
export function updatecollect(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/updatecollect`,
    method: 'post',
    data: data
  })
}
/*-------督办统计跳转查询------*/
export function findWookSheet(data) {
  return Request({
    url: `${worksheetUrl}dcdb-api/wooksheet/findWookSheet`,
    method: 'post',
    data: data
  })
}
/*-------汇总查询下载文件包------*/
export function downloads(data) {
  return Request({
    url: `${worksheetUrl}common/res/downloads?ids=` + data,
    method: 'get',
  })
}














