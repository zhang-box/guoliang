import Request from 'utils/request'
// let api = '/api'+ '/yyglxt/'
import {oldCadreUrl} from 'api/index'
/*-------人员信息添加-------*/
export function personInfoAdd(data) {
  return Request({
    url: `${oldCadreUrl}personnelRecord/insertPersonnelInfo`,
    method: 'post',
    data:data
  })
}
// 人员信息修改
export function personInfoUpdate(data) {
  return Request({
    url: `${oldCadreUrl}personnelRecord/updatePersonnel`,
    method: 'post',
    data:data
  })
}
// 人员信息分页列表
export function personnelSelectList(data) {
  return Request({
    url: `${oldCadreUrl}personnelRecord/personnelSelectList`,
    method: 'post',
    data:data
  })
}

// 人员信息详情 通过id查询
export function personnelDetails(data) {
  return Request({
    url: `${oldCadreUrl}personnelRecord/personnelSelectDetail`,
    method: 'post',
    data:data
  })
}
//人员信息模糊查询
export function indistinctPersonnelList() {
  return Request({
    url: `${oldCadreUrl}personnelRecord/indistinctPersonnelList`,
    method: 'post'
  })
}
// 药品模糊
export function indistinctPersonnelquery(data) {
  return Request({
    url: `${oldCadreUrl}prescribeManager/selectPayLikeDetail`,
    method: 'post',
    data:data
  })
}
//药品库存校验
export function drugStockCheck(data) {
  return Request({
    url: `${oldCadreUrl}prescribeManager/checkInventory`,
    method: 'post',
    data:data
  })
}
// 人员信息归档
export function deletePersonnel(data) {
  return Request({
    url: `${oldCadreUrl}personnelRecord/deletePersonnel?id=`+data,
    method: 'post',
    data:data
  })
}
// 健康档案信息保存
export function healthRecordAdd(data) {
  return Request({
    url: `${oldCadreUrl}personnelRecord/insertHealthRecord`,
    method: 'post',
    data:data
  })
}
// 健康档案列表页信息查询
export function healthRecordList(data) {
  return Request({
    url: `${oldCadreUrl}personnelRecord/healthRecordSelectList`,
    method: 'post',
    data:data
  })
}
//健康档案信息详情
export function healthRecordDetails(data) {
  return Request({
    url: `${oldCadreUrl}personnelRecord/healthRecordSelectDetail`,
    method: 'post',
    data:data
  })
}

//健康档案信息修改
export function updateHealthRecord(data) {
  return Request({
    url: `${oldCadreUrl}personnelRecord/updateHealthRecord`,
    method: 'post',
    data:data
  })
}

// 健康档案归档
export function deleteHealthRecord(data) {
  return Request({
    url: `${oldCadreUrl}personnelRecord/deleteHealthRecord?id=`+id,
    method: 'post',
    data:data
  })
}
// 添加归档人员信息
export function deletePersonAdd(data) {
  return Request({
    url: `${oldCadreUrl}personnelRecord/insertDeletePersonnel`,
    method: 'post',
    data:data
  })
}
// 归档人员信息列表
export function deletePersonList(data) {
  return Request({
    url: `${oldCadreUrl}personnelRecord/deletePersonnelSelectList`,
    method: 'post',
    data:data
  })
}
// 归档人员信息详情查看
export function deletePersonDetail(data) {
return Request({
  url: `${oldCadreUrl}personnelRecord/deletePersonnelSelectDetail`,
  method: 'post',
  data:data
})
}



