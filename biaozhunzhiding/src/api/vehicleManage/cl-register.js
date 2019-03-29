import Request from 'utils/request'
// let api = /*'/api'+*/ '/clglxt/'
import {vehicleUrl} from 'api/index'

/*-------车辆登记列表-------*/
export function getList(data) {
  return Request({
    url: `${vehicleUrl}vehicleInfo/selectList`,
    method: 'post',
    data:data
  })
}
/*-------车辆登记删除-------*/
export function deleteList(data) {
  return Request({
    url: `${vehicleUrl}vehicleInfo/delelte`,
    method: 'post',
    data:data
  })
}
/*-------车辆查看-------*/
export function getCarItem(data) {
  return Request({
    url: `${vehicleUrl}vehicleInfo/queryDetail`,
    method: 'post',
    data: data
  })
}
/*-------车辆新增列表-------*/
export function addInfo(data) {
  return Request({
    url: `${vehicleUrl}vehicleInfo/insert`,
    method: 'post',
    data:data
  })
}
/*-------车辆修改列表-------*/
export function updateInfo(data) {
  return Request({
    url: `${vehicleUrl}vehicleInfo/update`,
    method: 'post',
    data:data
  })
}
/*-------车辆登记查询-------*/
export function searchList(data) {
  return Request({
    url: `${vehicleUrl}vehicleInfo/selectList`,
    method: 'post',
    data:data
  })
}
/*-------司机登记列表-------*/
export function driverRegList(data) {
  return Request({
    url: `${vehicleUrl}driverInfo/selectList`,
    method: 'post',
    data: data
  })
}
/*-------司机登记新增-------*/
export function driverRegAdd(data) {
  return Request({
    url: `${vehicleUrl}driverInfo/insert`,
    method: 'post',
    data: data
  })
}
/*-------司机登记修改-------*/
export function driverRegUpdate(data) {
  return Request({
    url: `${vehicleUrl}driverInfo/update`,
    method: 'post',
    data: data
  })
}
/*-------司机登记查看-------*/
export function driverRegView(userId,token,id) {
  return Request({
    url: `${vehicleUrl}driverInfo/queryDetail?userId=${userId}&loginToken=${token}&id=${id}`,
    method: 'post',
  })
}
/*-------司机登记删除-------*/
export function driverRegDelete(userId,token,id) {
  return Request({
    url: `${vehicleUrl}driverInfo/delete?userId=${userId}&loginToken=${token}&id=${id}`,
    method: 'post'
  })
}
/*-------车辆申请审核列表-------*/
export function listApplicationList(data) {
  return Request({
    url: `${vehicleUrl}vehicleApplyCheck/selectList`,
    method: 'post',
    data: data
  })
}
/*-------车辆申请审核-审核-------*/
export function listApplicationView(data) {
  return Request({
    url: `${vehicleUrl}vehicleApplyCheck/update`,
    method: 'post',
    data:data
  })
}
/*-------用车申请列表-------*/
export function vehicleApplyList(data) {
  return Request({
    url: `${vehicleUrl}vehicleApply/selectList`,
    method: 'post',
    data:data
  })
}
/*-------用车申请提交-------*/
export function vehicleApplySubmit(data) {
  return Request({
    url: `${vehicleUrl}vehicleApply/submit`,
    method: 'post',
    data:data
  })

}/*-------用车新增并且提交-------*/
export function vehicleApplyAddAndSubmit(data) {
  return Request({
    url: `${vehicleUrl}vehicleApply/insertSubmit`,
    method: 'post',
    data:data
  })
}

/*-------用车申请列表删除-------*/
export function vehicleApplytDelete(data) {
  return Request({
    url: `${vehicleUrl}vehicleApply/delete`,
    method: 'post',
    data:data
  })
}

/*-------用车申请查看-------*/
export function vehicleApplytDetail(data) {
  return Request({
    url: `${vehicleUrl}vehicleApply/selectDetail`,
    method: 'post',
    data:data
  })
}
/*-------用车新增-------*/
export function vehicleApplyAdd(data) {
  return Request({
    url: `${vehicleUrl}vehicleApply/insert`,
    method: 'post',
    data:data
  })
}
/*-------用车修改-------*/
export function vehicleApplyUpdate(data){
  return Request({
    url: `${vehicleUrl}vehicleApply/update`,
    method: 'post',
    data:data
  })
}
/*-------用车管理出车-------*/
export function transportMgtOut(data){
  return Request({
    url: `${vehicleUrl}vehicleManager/insert `,
    method: 'post',
    data:data
  })
}

/*-------用车管理出车详情-------*/
export function transportMgtOutDetail(id,token,applyId) {
  return Request({
    url: `${vehicleUrl}vehicleManager/insertPage?userId=${id}&loginToken=${token}&applyId=${applyId}`,
    method: 'post'
  })
}
/*-------用车管理归队-------*/
export function transportMgtReturn(data){
  return Request({
    url: `${vehicleUrl}vehicleManager/update `,
    method: 'post',
    data:data
  })
}
/*-------用车管理归队详情-------*/
export function transportMgtReturnDetail(id,token,Zid,applyId) {
  return Request({
    url: `${vehicleUrl}vehicleManager/updatePage?userId=${id}&loginToken=${token}&id=${Zid}&applyId=${applyId}`,
    method: 'post'
  })
}
/*-------用车管理列表-------*/
export function listTransportMgt(data) {
  return Request({
    url: `${vehicleUrl}vehicleManager/selectList`,
    method: 'post',
    data: data
  })
}
/*  加油记录列表*/
export function oilRecordList(data) {
  return Request({
    url: `${vehicleUrl}oilRecord/selectList`,
    method: 'post',
    data:data
  })
}
/*  加油记录删除*/
export function oilRecordDelete(data) {
  return Request({
    url: `${vehicleUrl}oilRecord/delete`,
    method: 'post',
    data:data
  })
}
/*  加油记录查看*/
export function oilRecordShow(data) {
  return Request({
    url: `${vehicleUrl}oilRecord/view`,
    method: 'post',
    data:data
  })
}
/*  加油记录新增*/
export function oilRecordAdd(data) {
  return Request({
    url: `${vehicleUrl}oilRecord/insertOilRecord`,
    method: 'post',
    data: data
  })
}
/*  加油记录修改*/
export function oilRecordUpdate(data) {
  return Request({
    url: `${vehicleUrl}oilRecord/updateOilRecord`,
    method: 'post',
    data: data
  })
}

/*  事故记录列表*/
export function accidentList(data) {
  return Request({
    url: `${vehicleUrl}accidentRecord/selectList`,
    method: 'post',
    data: data
  })
}
/*  事故记录新增*/
export function accidentAdd(data) {
  return Request({
    url: `${vehicleUrl}accidentRecord/insertAccidentRecord`,
    method: 'post',
    data: data
  })
}
/*  事故记录修改*/
export function accidentUpdate(data) {
  return Request({
    url: `${vehicleUrl}accidentRecord/updateAccidentRecord`,
    method: 'post',
    data: data
  })
}
/*  事故记录查看*/
export function accidentShow(data) {
  return Request({
    url: `${vehicleUrl}accidentRecord/view`,
    method: 'post',
    data: data
  })
}
/*  违章记录列表*/
export function violationRecordList(data) {
  return Request({
    url: `${vehicleUrl}breakRuleRecord/selectList`,
    method: 'post',
    data:data
  })
}
/*  违章记录删除*/
export function violationRecordDelete(data) {
  return Request({
    url: `${vehicleUrl}breakRuleRecord/deleteBreakRuleRecord`,
    method: 'post',
    data:data
  })
}
/*  违章记录新增*/
export function violationRecordAdd(data) {
  return Request({
    url: `${vehicleUrl}breakRuleRecord/insertBreakRuleRecord`,
    method: 'post',
    data: data
  })
}
/*  违章记录修改*/
export function violationRecordUpdate(data) {
  return Request({
    url: `${vehicleUrl}breakRuleRecord/updateBreakRuleRecord`,
    method: 'post',
    data: data
  })
}
/*  违章记录查看*/
export function showBreakInfo(data) {
  return Request({
    url: `${vehicleUrl}breakRuleRecord/view`,
    method: 'post',
    data: data
  })
}
/*  违章记录独条信息*/
export function violationRecordShow(data) {
  return Request({
    url: `${vehicleUrl}breakRuleRecord/view`,
    method: 'post',
    data:data
  })
}
/*  保险记录列表*/
export function saferList(data) {
  return Request({
    url: `${vehicleUrl}insurance/selectList`,
    method: 'post',
    data:data
  })
}
/*  保险记录删除*/
export function saferDelete(data) {
  return Request({
    url: `${vehicleUrl}insurance/deleteInsurance`,
    method: 'post',
    data:data
  })
}
/*  保险记录新增*/
export function saferAdd(data) {
  return Request({
    url: `${vehicleUrl}insurance/insert`,
    method: 'post',
    data:data
  })
}
/*  保险记录修改*/
export function saferUpdate(data) {
  return Request({
    url: `${vehicleUrl}insurance/update`,
    method: 'post',
    data:data
  })
}
/*  保险记录查看*/
export function saferShow(data) {
  return Request({
    url: `${vehicleUrl}insurance/view`,
    method: 'post',
    data:data
  })
}
/*  司机工作汇总列表*/
export function driverSummary(data) {
  return Request({
    url: `${vehicleUrl}driverSummary/selectList`,
    method: 'post',
    data:data
  })
}

/*  司机工作汇总导出*/
export function expSelectList(data) {
  return Request({
    url: `${vehicleUrl}driverSummary/expSelectList`,
    method: 'post',
    data:data
  })
}

/*  车辆使用汇总*/
export function vehicleUse(data) {
  return Request({
    url: `${vehicleUrl}vehicleUse/selectList`,
    method: 'post',
    data:data
  })
}

/*-------年检列表-------*/
export function annualList(data) {
  return Request({
    url: `${vehicleUrl}annual/selectList`,
    method: 'post',
    data:data
  })
}

/*-------年检查看-----*/
export function annualView(data) {
  return Request({
    url: `${vehicleUrl}annual/view`,
    method: 'post',
    data:data
  })
}

/*-------年检删除-----*/
export function annualDelete(data) {
  return Request({
    url: `${vehicleUrl}annual/deleteAnnual`,
    method: 'post',
    data:data
  })
}

/*-------年检修改----*/
export function annualUpdate(data) {
  return Request({
    url: `${vehicleUrl}annual/update`,
    method: 'post',
    data:data
  })
}
/*-------年检新增----*/
export function annualInsert(data) {
  return Request({
    url: `${vehicleUrl}annual/insert`,
    method: 'post',
    data:data
  })
}


/*-------维修保养列表----*/
export function maintainList(data) {
  return Request({
    url: `${vehicleUrl}repariMaintainRecord/selectList`,
    method: 'post',
    data:data
  })
}

/*-------维修保养查看----*/
export function maintainView(data) {
  return Request({
    url: `${vehicleUrl}repariMaintainRecord/view?`,
    method: 'post',
    data:data
  })
}
/*-------维修保养新增----*/
export function maintainAdd(data) {
  return Request({
    url: `${vehicleUrl}repariMaintainRecord/insertRepairMaintainRecord`,
    method: 'post',
    data:data
  })
}
/*-------维修保养修改----*/
export function maintainUpdate(data) {
  return Request({
    url: `${vehicleUrl}repariMaintainRecord/updateRepairMaintainRecord`,
    method: 'post',
    data:data
  })
}

/*-------维修保养删除列----*/
export function maintainDelete(data) {
  return Request({
    url: `${vehicleUrl}repariMaintainRecord/deleteRepairMaintainRecord`,
    method: 'post',
    data:data
  })
}

/*-------维修保养项目明细新增---*/
export function insertRecordDetail(data) {
  return Request({
    url: `${vehicleUrl}repariMaintainRecord/insertRecordDetail`,
    method: 'post',
    data:data
  })
}

/*-------维修保养项目明细删除明细某条---*/
export function deleteRecordDetail(data) {
  return Request({
    url: `${vehicleUrl}repariMaintainRecord/deleteRecordDetail`,
    method: 'post',
    data:data
  })
}

/*-------费用管理----*/
export function feeCheck(data) {
  return Request({
    url: `${vehicleUrl}feeManager/check`,
    method: 'post',
    data:data
  })
}

/*  车辆使用导出*/
export function vehicleExp(data) {
  return Request({
    url: `${vehicleUrl}vehicleUse/expSelectList`,
    method: 'post',
    data:data
  })
}

/*  车辆费用汇总*/
export function carFeeSummary(data) {
  return Request({
    url: `${vehicleUrl}feeManager/selectTotalList`,
    method: 'post',
    data:data
  })
}
/* 费用汇总导出 */
export function getOut(data) {
  return Request({
    url: `${vehicleUrl}feeManager/expSelectList`,
    method: 'post',
    data:data
  })
}

/*  其他费用*/
export function otherFeeListInfo(data) {
  return Request({
    url: `${vehicleUrl}otherCost/selectList`,
    method: 'post',
    data:data
  })
}
/*  其他费用删除*/
export function otherFeeDelete(data) {
  return Request({
    url: `${vehicleUrl}otherCost/deleteOtherCost`,
    method: 'post',
    data:data
  })
}
/*  其他费用新增*/
export function otherFeeAdd(data) {
  return Request({
    url: `${vehicleUrl}otherCost/insert`,
    method: 'post',
    data:data
  })
}
/*  其他费用修改*/
export function otherFeeUpdate(data) {
  return Request({
    url: `${vehicleUrl}otherCost/update`,
    method: 'post',
    data:data
  })
}
/*  其他费用查看*/
export function otherFeeItemInfo(data) {
  return Request({
    url: `${vehicleUrl}otherCost/view`,
    method: 'post',
    data:data
  })
}

/*  记录页面统一审核接口*/
export function reviewInfo(data) {
  return Request({
    url: `${vehicleUrl}feeManager/check`,
    method: 'post',
    data:data
  })
}
/*-------牌照------*/
export function license() {
  return Request({
    url: `${vehicleUrl}vehicleInfo/queryVehiclePlate?userId=1&loginToken=1`,
    method: 'post',
  })
}

/*-------人员显示------*/
export function viewPersonnel() {
  return Request({
    url: `${vehicleUrl}driverSummary/viewPersonnel?userId=1&loginToken=1`,
    method: 'post',
  })
}
