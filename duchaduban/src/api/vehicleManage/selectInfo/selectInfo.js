import Request from 'utils/request'
// let api = /*'/api'+ */'/zdglxt/'
import {zdUrl} from 'api/index'

/*-------用车类型-------*/
export function carType() {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=1`,
    method: 'post',
  })
}

/*-------申请状态-------*/
export function applicationStatus() {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=4`,
    method: 'post',
  })
}
/*-------费用审核状态-------*/
export function feeReviewStatus() {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=9`,
    method: 'post',
  })
}
/*-------补助类型-------*/
export function subsidyType() {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=13`,
    method: 'post',
  })
}
/*-------费用种类-------*/
export function feeType() {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=16`,
    method: 'post',
  })
}
/*-------付款方式-------*/
export function payType() {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=28`,
    method: 'post',
  })
}
/*-------加油品种-------*/
export function refuelingType() {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=31`,
    method: 'post',
  })
}
/*-------项目类别-------*/
export function projectType() {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=35`,
    method: 'post',
  })
}

/*-------车辆类型-------*/
export function vehicleType() {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=38`,
    method: 'post',
  })
}
/*-------车辆品牌-------*/
export function vehicleBrands() {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=42`,
    method: 'post',
  })
}
/*-------车辆审批状态-------*/
export function vehicleReviewStatus() {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=46`,
    method: 'post',
  })
}
/*-------车辆用途-------*/
export function vehicleUse() {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=50`,
    method: 'post',
  })
}
/*-------车辆状态-------*/
export function vehicleStatus() {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=53`,
    method: 'post',
  })
}
/*-------驾照等级-------*/
export function driverLevel() {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=58`,
    method: 'post',
  })
}
/*-------险种名称-------*/
export function saferName() {
  return Request({
    url: `${zdUrl}dicNew/selectList?userId=1&loginToken=1&parentId=69`,
    method: 'post',
  })
}


// /*-------人员显示------*/
// export function viewPersonnel() {
//   return Request({
//     url: `${zdUrl}driverSummary/viewPersonnel?userId=1&loginToken=1`,
//     method: 'post',
//   })
// }
