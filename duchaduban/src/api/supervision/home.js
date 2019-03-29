import Request from 'utils/request'
// let api = /*'/api'+ */'/djglxt/'
import {worksheetUrl} from 'api/index'

/*来文占比*/
export function docCompanyRatios(data) {
  return Request({
    url: `${worksheetUrl}homePage/docCompanyRatios`,
    method: 'post',
    data:data
  })
}

/*司局办理*/
export function privateLocalityWorkingNum(data) {
  return Request({
    url: `${worksheetUrl}homePage/privateLocalityWorkingNum`,
    method: 'post',
    data:data
  })
}

/*任务类型占比*/
export function taskTypeRatios(data) {
  return Request({
    url: `${worksheetUrl}homePage/taskTypeRatios`,
    method: 'post',
    data:data
  })
}

/*各种任务*/
export function taskTypeTotal(data) {
  return Request({
    url: `${worksheetUrl}homePage/taskTypeTotal`,
    method: 'post',
    data:data
  })
}

/*-------------------------办结率排行榜--------------------------*/
export function didTaskRanking(data) {
  return Request({
    url: `${worksheetUrl}homePage/didTaskRanking`,
    method: 'post',
    data:data
  })
}
