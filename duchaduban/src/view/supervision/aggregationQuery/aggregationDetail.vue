<template>
  <div class="content-wrapper">
    <div class="content-title">
      <el-button class="title-button" size="mini" @click="returnList"><i class="el-icon-arrow-left"></i> 返回</el-button>
      <span class="title-info">汇总查询详情</span>
    </div>
    <div class="detail-title">
      <h1>督查督办进展详情</h1>
      <p>文件密级： <span>秘密</span></p>
    </div>
    <div class="tableList">
      <table cellpadding="0" cellspacing="0">
        <tr>
          <th class="th-title">督办编号</th>
          <th class="input-bottom">{{wsNum}}</th>
          <th class="th-title th-style">事件类型</th>
          <th class="input-bottom">{{eventType}}</th>
          <th class="th-title th-style">事件状态</th>
          <th class="input-bottom">{{processStatus}}</th>
        </tr>
        <tr>
          <td class="th-title">承办司局</td>
          <td class="input-bottom">{{takeDepartment}}</td>
          <td class="th-title th-style">会办司局</td>
          <td class="input-bottom">{{doDepartment}}</td>
          <td class="th-title th-style">限结日期</td>
          <td class="input-bottom">{{endDate}}</td>
        </tr>
        <tr>
          <td class="thing-title">事件标题</td>
          <td colspan="5" class="input-bottom" style="position: relative; height: 30px;">
            <div style="position: absolute; top:1px; left: 0px;height:53px;line-height: 53px;padding-left: 8px;">{{title}}</div>
          </td>
        </tr>
      </table>
    </div>
    <div class="list">
      <el-table :data="tableData" class="table1" stripe="" style="width: 100%" >
         <el-table-column type="index" :index="typeIndex" label="序号" width="100"></el-table-column>
         <el-table-column prop="detailStatusName" label="任务进展"></el-table-column>
         <el-table-column prop="hadlingStatus" label="办理情况"></el-table-column>
         <el-table-column prop="reportDate" label="上报日期"></el-table-column>
         <el-table-column label="附件">
           <template slot-scope="scope">
             <el-button v-if="scope.row.fileUrl" @click="download(scope.row.fileUrl)" type="text"  size="small">
               下载
             </el-button>
             <el-button v-else type="text" size="small">
               -
             </el-button>
           </template>
         </el-table-column>
         <el-table-column prop="approvalDate" label="审核时间"></el-table-column>
         <el-table-column prop="approvalResult" label="审核结果"></el-table-column>
         <el-table-column prop="approvalOpinion" label="审核意见"></el-table-column>
      </el-table>
      <!--<el-pagination background="" layout="prev, pager, next"  @current-change="handleCurrentChange" :page-size="formPage.limit" :total="formPage.total">-->
      <!--</el-pagination>-->
    </div>
  </div>
</template>
<script>
  import {getWookSheet, downloads} from  'api/supervision/index'
  import {worksheetUrl} from 'api/index'
  import { Message } from 'element-ui'
  export default {
    data() {
      return {
        showBtn: false,
        approvalOpinion:'',
        approvalResult:"",
        color:"",
        comeDate:"",
        comeNum:"",
        comeUnit:"",
        completionStatus:"",
        doDepartment:"",
        doUnit:"",
        endDate:"",
        errendDate:"",
        eventType:"",
        fileUrl:'',
        hadlingResult:"",
        hadlingStatus:"",
        isReminder:"",
        isReport:"",
        isSendOffice:"",
        leadIns:"",
        notes:"",
        offNum:"",
        opinion:"",
        overdueDays:'',
        processStatus:"",
        reportId:"",
        reportStatus:"",
        reportTime:"",
        reportUser:"",
        secretRank:"",
        status:"",
        takeDepartment:"",
        takeUnit:"",
        tasks:"",
        title:"",
        wsId:'',
        wsNum:"",
        tableData: [],
        formPage: {
          page: 1,
          limit: 10,
          total: undefined,
        },
        activityName:null,
        time:null
      }
    },
    created(){
     this.getInfo();
    },
    methods:{
      getInfo(){
        let data = {
          "id":this.$route.params.wsId,
        };
        getWookSheet(data).then(response => {
          this.approvalOpinion=response.data.approvalOpinion
          this.approvalResult=response.data.approvalResult
          this.color=response.data.color
          this.comeDate=response.data.comeDate
          this.comeNum=response.data.comeNum
          this.comeUnit=response.data.comeUnit
          this.completionStatus=response.data.completionStatus
          this.doDepartment=response.data.doDepartment
          this.doUnit=response.data.doUnit
          this.endDate=response.data.endDate
          this.errendDate=response.data.errendDate
          this.eventType=response.data.eventTypeName
          this.fileUrl=response.data.fileUrl
          this.hadlingResult=response.data.hadlingResult
          this.hadlingStatus=response.data.hadlingStatus
          this.isReminder=response.data.isReminder
          this.isSendOffice=response.data.isSendOffice
          this.leadIns=response.data.leadIns
          this.notes=response.data.notes
          this.offNum=response.data.offNum
          this.opinion=response.data.opinion
          this.overdueDays=response.data.overdueDays
          this.processStatus=response.data.processStatusName
          this.reportId=response.data.reportId
          this.reportStatus=response.data.reportStatus
          this.reportTime=response.data.reportTime
          this.reportUser=response.data.reportUser
          this.secretRank=response.data.secretRank
          this.status=response.data.status
          this.takeDepartment=response.data.takeDepartment
          this.takeUnit=response.data.takeUnit
          this.tasks=response.data.tasks
          this.title=response.data.title
          this.wsId=response.data.wsId
          this.wsNum=response.data.wsNum
          this.tableData = response.data.progressDetails
        })
      },
      returnList(){
        this.$router.push({name:'aggregationQuery'});  /* 点击返回跳转 */
      },
      typeIndex(index) {
        return index+1;
      },
      download(code){
        downloads(code).then(response => {
          window.location.href = response.data;
        })

      }
    }

  }
</script>
<style type="text/css" scoped>
  .detail-title{
    padding-top:30px;
    margin-bottom: 10px;
  }
  .detail-title h1{
    text-align: center;
    font-size:16px;
    font-weight: 600;
    color:#333;
  }
  .detail-title p{
    text-align: left;
    text-indent: 30px;
  }
  .tableList{
    margin-bottom: 10px;
  }
  .thing-title{
    border-bottom:  1px #ddd solid;
    text-align: center;
    border-right: 1px #ddd solid;
  }
  .list{
    padding:20px 10px 0px;
  }
  .tableList table{
    margin-left: auto;
    border:1px #ddd solid;
    margin-right: auto;
  }
  .tableList table .input-bottom{
    width:200px;
    border:none;
    border-bottom: 1px #ddd solid;
    outline: none;
    padding:12px 0px;
    text-align: center;
  }
  .tableList table .th-title{
    padding:10px 30px;
    border-right: 1px #ddd solid;
    border-bottom: 1px #ddd solid;
  }
  .tableList table .th-style{
    border-left: 1px #ddd solid;
  }
  .el-input--suffix .el-input__inner{
    border-radius: inherit;
  }
  .el-input__inner{
    height: 41px;
  }
  .el-textarea textarea{
    height: 100px !important;
    border:none;
    border-radius: inherit;
    border-bottom:1px #ccc solid;
    border-right: 1px #ccc solid;
    border-top: 1px #ccc solid;
  }
  .el-button--primary{
    padding:8px 20px;
    margin-left: 20px;
  }
  .button-last{
    width:800px;
    margin-left: auto;
    margin-right: auto;
    padding-top:20px;
    margin-bottom: 20px;
  }
  .button-last button{
    margin-right: 20px;
  }
</style>
