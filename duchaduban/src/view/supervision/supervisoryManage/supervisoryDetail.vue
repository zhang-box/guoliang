<template>
  <div class="content-wrapper">
    <div class="content-title">
      <el-button class="title-button" size="mini" @click="returnList"><i class="el-icon-arrow-left"></i> 返回</el-button>
      <span class="title-info">督查督办工作单</span>
    </div>
    <div class="detail-title">
      <h1>督查督办工作单</h1>
      <span style="padding-left: 2%">
         督办编码：<span>{{wsNum}}</span>
      </span>
    </div>

    <div class="tableList-super">
      <table cellpadding="0" cellspacing="0">
        <tr class="">
          <th class="th-title">事件类型</th>

          <td class="thingsTd" style="border-bottom: 1px #ccc solid;">
            <div class="list-width" style="text-align: center;">{{eventTypeName}}</div>
            <!--<el-select v-model="eventType" placeholder="请选择" style="width:220px; height: 40px; display: inherit; padding-left: 20px; border-bottom: none;" disabled>-->
              <!--<el-option v-for="item in options1" :key="item.superviseTypeId" :label="item.superviseTypeName" :value="item.superviseTypeCode" :disabled="item.disabled"></el-option>-->
            <!--</el-select>-->
          </td>
          <th class="th-title th-style">文件密级</th>
          <td class="thingsTd" style="border-bottom: 1px #ccc solid;">
            <div class="list-width" style="text-align: center;">{{secretRank}}</div>
            <!--<el-select v-model="secretRank" placeholder="请选择" style="width:220px; height: 40px; display: inherit; padding-left: 20px; border-bottom: none;" disabled>-->
              <!--<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>-->
            <!--</el-select>-->
          </td>
        </tr>
        <tr class="things-title">
          <td class="thing-title">标题</td>
          <td colspan="3" style="position: relative; height: 40px;border-bottom:1px #ccc solid;">
            <div class="list-width" style="text-align: center;">{{title}}</div>
            <!--<input type="text" name="text" v-model="title" style="position: absolute;top: 0px; left:0px; text-indent: 20px; width:786px;" placeholder="请输入内容" disabled>-->
          </td>
        </tr>
        <tr>
          <td class="th-title">来文单位</td>
          <td class="thingsTd" style="border-bottom: 1px #ccc solid;">
            <div class="list-width" style="text-align: center;">{{comeUnit}}</div>
            <!--<input type="text" v-model="comeUnit" name="text" style="padding-left: 20px;" disabled>-->
          </td>
          <td class="th-title th-style">来文编号</td>
          <td class="thingsTd" style="border-bottom: 1px #ccc solid;">
            <div class="list-width" style="text-align: center;">{{comeNum}}</div>
            <!--<input type="text" v-model="comeNum" name="text" style="padding-left: 20px;" disabled>-->
          </td>
        </tr>
        <tr>
          <td class="th-title">承办单位</td>
          <td class="thingsTd" style="border-bottom: 1px #ccc solid;">
            <div class="list-width" style="text-align: center;">{{takeUnit}}</div>
            <!--<input type="text" v-model="takeUnit" name="text" style="padding-left: 20px;" disabled>-->
          </td>
          <td class="th-title th-style">会办单位</td>
          <td class="thingsTd" style="border-bottom: 1px #ccc solid;">
            <div class="list-width" style="text-align: center;">{{doUnit}}</div>
            <!--<input type="text" v-model="doUnit" name="text" style="padding-left: 20px;" disabled>-->
          </td>
        </tr>
        <tr>
          <td class="th-title">来文日期</td>
          <td class="thingsTd" style=" border-bottom: 1px #ccc solid;">
            <div class="list-width" style="text-align: center;">{{comeDate}}</div>
            <!--<el-date-picker v-model="comeDate" type="date" placeholder="选择日期时间" format="yyyy-MM-dd" disabled></el-date-picker>-->
          </td>
          <td class="th-title th-style">局内编号</td>
          <td class="thingsTd" style="border-bottom: 1px #ccc solid;">
            <div class="list-width" style="text-align: center;">{{offNum}}</div>
            <!--<input type="text" v-model="offNum" name="text" style="padding-left: 20px;" disabled>-->
          </td>
        </tr>
        <tr>
          <td class="th-title">承办司局</td>
          <td class="thingsTd" style="width:320px;border-bottom: 1px #ccc solid;">
            <div class="list-width" style="width:320px;text-align: center;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{takeDepartment}}</div>
            <!--<el-select v-model="takeDepartment" placeholder="请选择" style="width:220px; height: 40px; display: inherit; padding-left: 20px; border-bottom: none;" disabled>-->
              <!--<el-option v-for="item in options3" :key="item.departmentId" :label="item.departmentName" :value="item.departmentCode" :disabled="item.disabled"></el-option>-->
            <!--</el-select>-->
          </td>
          <td class="th-title th-style">会办司局</td>
          <td class="thingsTd" style="width:320px;border-bottom: 1px #ccc solid;">
            <div class="list-width" style="width:320px;text-align: center;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{doDepartment}}</div>
            <!--<el-select v-model="doDepartment" placeholder="请选择" style="width:220px; height: 40px; display: inherit; padding-left: 20px; border-bottom: none;" disabled>-->
              <!--<el-option v-for="item in options4" :key="item.departmentId" :label="item.departmentName" :value="item.departmentCode" :disabled="item.disabled"></el-option>-->
            <!--</el-select>-->
          </td>
        </tr>
        <tr>
          <td class="th-title">限结日期</td>
          <td class="thingsTd" style="border-bottom: 1px #ccc solid;">
            <div class="list-width" style="text-align: center;">{{endDate}}</div>
            <!--<el-date-picker v-model="endDate" type="date" placeholder="选择日期时间" format="yyyy-MM-dd" disabled></el-date-picker>-->
          </td>
          <td class="th-title th-style">限结预警日期</td>
          <td class="thingsTd" style="border-bottom: 1px #ccc solid;">
            <div class="list-width" style="text-align: center;">{{errendDate}}</div>
            <!--<el-date-picker v-model="errendDate" type="date" placeholder="选择日期时间" format="yyyy-MM-dd" disabled></el-date-picker>-->
          </td>
        </tr>
        <tr>
          <td class="th-title th-style" style="padding:20px 0px; text-align: center;">领导批示</td>
          <td colspan="3" class="tb-textarea" style="position: relative; height: 100px;border: 1px solid #ccc;">
            <div class="list-width" style="text-align: center;">{{leadIns}}</div>
            <!--<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="进展描述" v-model="leadIns" style="position: absolute; width:786px; top:0px;" disabled>-->
            <!--</el-input>-->
          </td>
        </tr>
        <tr>
          <td class="th-title th-style" style="padding:20px 0px; text-align: center;">办公室主任意见</td>
          <td colspan="3" class="tb-textarea" style="position: relative; height: 100px;border: 1px solid #ccc;">
            <div class="list-width" style="text-align: center;">{{opinion}}</div>
            <!--<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="进展描述" v-model="opinion" style="position: absolute; width:786px; top:0px;" disabled>-->
            <!--</el-input>-->
          </td>
        </tr>
        <tr>
          <td class="th-title th-style" style="padding:20px 0px; text-align: center;">任务内容</td>
          <td colspan="3" class="tb-textarea" style="position: relative; height: 100px;border: 1px solid #ccc;">
            <div class="list-width" style="text-align: center;">{{tasks}}</div>
            <!--<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="进展描述" v-model="tasks" style="position: absolute; width:786px; top:0px;" disabled>-->
            <!--</el-input>-->
          </td>
        </tr>
        <tr>
          <td class="th-title th-style" style="padding:20px 0px; text-align: center;">办理情况</td>
          <td colspan="3" class="tb-textarea" style="position: relative; height: 100px;border: 1px solid #ccc;">
            <div class="list-width" style="text-align: center;">{{hadlingStatus}}</div>
            <!--<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="进展描述" v-model="hadlingStatus" style="position: absolute; width:786px; top:0px;" disabled>-->
            <!--</el-input>-->
          </td>
        </tr>
        <tr>
          <td class="th-title th-style" style="padding:20px 0px; text-align: center;">办结情况</td>
          <td colspan="3" class="tb-textarea" style="position: relative; height: 100px;border: 1px solid #ccc;">
            <div class="list-width" style="text-align: center;">{{textarea5}}</div>
            <!--<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="进展描述" v-model="textarea5" style="position: absolute; width:786px; top:0px;" disabled>-->
            <!--</el-input>-->
          </td>
        </tr>
        <tr>
          <td class="th-title th-style" style="padding:20px 0px; text-align: center;">附注</td>
          <td colspan="3" class="tb-textarea" style="position: relative; height: 100px;border: 1px solid #ccc;">
            <div class="list-width" style="text-align: center;">{{notes}}</div>
            <!--<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="进展描述" v-model="completionStatus" style="position: absolute; width:786px; top:0px;" disabled>-->
            <!--</el-input>-->
          </td>
        </tr>
        <tr>
          <td class="th-title th-style">附件</td>
          <td colspan="3" style="border: 1px solid #ccc;">
            <div class="list-width" v-for="item in fileUrls" :key="item.resId" style="text-align: left;padding-left:20px;cursor: pointer;" @click="download(item.resId)">{{item.resName}}</div>
            <!--{{fileName}}-->
          </td>
        </tr>
        <tr>
          <td class="th-title th-style" style="padding:20px 0px; text-align: center;">办理结果</td>
          <td colspan="3" class="tb-textarea" style="position: relative; height: 100px;border: 1px solid #ccc;">
            <div class="list-width" v-for="item in hadlingResults" :key="item.resId" style="text-align: left;padding-left:20px;cursor: pointer;" @click="download(item.resId)">{{item.resName}}</div>
            <!--<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="进展描述" v-model="hadlingResult" style="position: absolute; width:786px; top:0px;" disabled>-->
            <!--</el-input>-->
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  import {getWookSheetNum, wooksheetUpdate, getWookSheet, getDepartments, getDepartmentsBycode, getSuperviseType, getDepartmentsName, filesDetail} from 'api/supervision/index'
  import {worksheetUrl} from 'api/index'
  import { Message } from 'element-ui'
  export default {
    data() {
      return {
        eventTypeName: "",
        hadlingResults : [],
        fileUrls : [],
        id:"file",
        input:'',
        input1:'',
        input2:'',
        input3:'',
        value1:'',
        value2:'',
        value3:'',
        value4:'',
        value5:'',
        value6:'',
        value7:'',
        value8:'',
        value9:'',
        value10:'',
        value11:'',
        value12:'',
        value13:'',
        textarea1:'',
        textarea2:'',
        textarea3:'',
        textarea4:'',
        textarea5:'',
        textarea6:'',
        textarea7:'',
        wookSheetNum:'',
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
        fileName:"",
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
        dataUrl:"",
        dataStatus:"",
        userName:"",
        options1: [],
        options2: [{
          value: '普通',
          label: '普通'
        }, {
          value: '绝密',
          label: '绝密',
        },{
          value: '机密',
          label: '机密',
        },{
          value: '秘密',
          label: '秘密',
        }],
        options3: [],
        options4: [],
        activityName:null,
        time:null

      }
    },
    created(){
      let data = {
        "id":this.$route.params.wsId,
      }
      getWookSheet(data).then(response => {
        this.approvalOpinion = response.data.approvalOpinion
        this.approvalResult = response.data.approvalResult
        this.color = response.data.color
        this.comeDate = response.data.comeDate
        this.comeNum = response.data.comeNum
        this.comeUnit = response.data.comeUnit
        this.completionStatus = response.data.completionStatus
        this.doDepartment = response.data.doDepartment
        this.takeUnit = response.data.takeUnit
        this.doUnit = response.data.doUnit
        this.endDate = response.data.endDate
        this.errendDate = response.data.errendDate
        this.eventType = response.data.eventType
        this.eventTypeName = response.data.eventTypeName
        this.fileUrl = response.data.fileUrl
        this.fileName = response.data.fileName
        this.hadlingResult = response.data.hadlingResult
        this.hadlingStatus = response.data.hadlingStatus
        this.isReminder = response.data.isReminder
        this.isSendOffice = response.data.isSendOffice
        this.leadIns = response.data.leadIns
        this.notes = response.data.notes
        this.offNum = response.data.offNum
        this.opinion = response.data.opinion
        this.overdueDays = response.data.overdueDays
        this.processStatus = response.data.processStatus
        this.reportId = response.data.reportId
        this.reportStatus = response.data.reportStatus
        this.reportTime = response.data.reportTime
        this.reportUser = response.data.reportUser
        this.secretRank = response.data.secretRank
        this.status = response.data.status
        this.takeDepartment = response.data.takeDepartment
        this.tasks = response.data.tasks
        this.title = response.data.title
        this.wsId = response.data.wsId
        this.wsNum = response.data.wsNum
        if (response.data.fileUrl != null) {
          filesDetail(response.data.fileUrl).then(res=>{
            if (res.code == 1) {
              this.fileUrls = res.data
            }
          }).catch(err=>{

          })
        }
        if (response.data.hadlingResult != null) {
          filesDetail(response.data.hadlingResults).then(res=>{
            if (res.code == 1) {
              this.hadlingResults = res.data
            }
          }).catch(err=>{

          })
        }
      })
        // getWookSheetNum().then(response => {
        //   this.wookSheetNum = response.data;
        // })


    },
    methods:{
        returnList(){
          this.$router.push({name: 'supervisoryManage'});
          /* 点击返回跳转 */
        },
        download(id){
            window.location.href = worksheetUrl + 'common/res/fileDownload?resId=' + id
        }
      }
  }
</script>
<style type="text/css" scoped>
  .tableList-super tr .thingsTd{
    width:320px;
  }
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
  .things-title{
    border-bottom: 1px #ddd solid;
  }
  .tableList-super{
    margin-bottom: 10px;
  }
  .thing-title{
    border-bottom:  1px #ddd solid;
    text-align: center;
    border-right: 1px #ddd solid;
  }
  .tableList-super table{
    margin-left: auto;
    border:1px #ddd solid;
    margin-right: auto;
  }
  .tableList-super table input{
    width:300px;
    border:none;
    border-bottom: 1px #ddd solid;
    outline: none;
    padding:12px 0px;
    /*text-indent: 10px;*/
  }
  .tableList-super table .th-title{
    padding:10px 30px;
    border-right: 1px #ddd solid;
    border-bottom: 1px #ddd solid;
  }
  .tableList-super table .th-style{
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
    width:500px;
    margin-left: auto;
    margin-right: auto;
    padding-top:20px;
    margin-bottom: 20px;
  }
  .button-last button{
    margin-right: 20px;
  }
  .detail-num{
    float:right;
    padding-right:6%;
  }
</style>
