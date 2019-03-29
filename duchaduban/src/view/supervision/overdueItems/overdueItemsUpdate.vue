<template>
  <div class="content-wrapper">
    <div class="content-title">
      <el-button class="title-button" size="mini" @click="returnList"><i class="el-icon-arrow-left"></i> 返回</el-button>
      <span class="title-info">逾期事件管理</span>
    </div>
    <div class="overdue-title-header">基础信息</div>
    <div class="overdue-title">
      <el-row>
        <el-col class="clearFix">
          <span class="left margin-le">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标题</span><div class="left">{{title}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="clearFix">
          <span class="left margin-le">来文单位</span><div class="left">{{comeUnit}}</div>
        </el-col>
        <el-col :span="12" class="clearFix text-right">
          <span class="left">来文编号</span><div class="left">{{comeNum}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="clearFix">
          <span class="left margin-le">承办单位</span><div class="left">{{takeUnit}}</div>
        </el-col>
        <el-col :span="12" class="clearFix text-right">
          <span class="left">会办单位</span><div class="left">{{doUnit}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="clearFix">
          <span class="left margin-le">来文日期</span><div class="left">{{comeDate}}</div>
        </el-col>
        <el-col :span="12" class="clearFix text-right">
          <span class="left">局内编号</span><div class="left">{{offNum}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="clearFix">
          <span class="left margin-le">承办司局</span><div class="left">{{takeDepartment}}</div>
        </el-col>
        <el-col :span="12" class="clearFix text-right">
          <span class="left">会办司局</span><div class="left">{{doDepartment}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="clearFix">
          <span class="left margin-le">限结日期</span><div class="left">{{endDate}}</div>
        </el-col>
        <el-col :span="12" class="clearFix text-right">
          <span class="left">限结预警日期</span><div class="left">{{errendDate}}</div>
        </el-col>
      </el-row>
    </div>
    <div class="overdue-title-header">申请信息</div>
    <div class="overdue-title">
      <el-row>
        <el-col>
          <span class="left margin-le">申请单位</span><div class="left">{{takeDepartment}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span class="left margin-le">状态&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><div class="left">{{processStatusName}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span class="left margin-le">备注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><div class="left">{{hadlingStatus}}</div>
        </el-col>
      </el-row>
    </div>
    <div class="overdue-title-header">审批信息</div>
    <div class="overdue-title">
      <el-row style="margin-bottom: 20px;">
        <el-col :span="4"><span>审批结果</span></el-col>
        <el-col :span="20">
          <el-radio v-model="radio" label="同意">同意</el-radio>
          <el-radio v-model="radio" label="不同意">不同意</el-radio>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 20px;">
        <el-col :span="4"> <span>审批意见</span> </el-col>
        <el-col :span="20">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="approvalOpinion" class="report-textarea">
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4"> <span>限结日期</span> </el-col>
        <el-col :span="8">
          <el-date-picker v-model="endDate1" type="date" placeholder="选择日期时间" :picker-options="pickerOptions1" @change="countDelayDays"></el-date-picker>
        </el-col>
        <el-col :span="3"> <span>延期天数</span> </el-col>
        <el-col :span="9">
          <el-input type="text" v-model="delayDays" style="width:220px" disabled></el-input>&nbsp;&nbsp;&nbsp;天
        </el-col>
      </el-row>
    </div>
    <div class="report-last-btn">
      <el-button type="primary" style="margin-right: 30px;" @click="save">暂存</el-button>
      <el-button type="primary" style="margin-right: 30px;" @click="submit">提交</el-button>
      <el-button type="primary" style="margin-right: 30px;" @click="cancel">取消</el-button>
      <el-button type="primary" @click="historyTable">历史记录</el-button>
      <el-dialog :visible.sync="dialogVisible"  width="60%" :before-close="handleClose">
        <div class="over-dialog-title">领导选择</div>
        <div class="overdue-table">
          <el-table :data="tableData" class="table1" stripe="" style="width: 100%">
            <el-table-column type="index" :index="typeIndex" label="序号" width="120"></el-table-column>
            <el-table-column prop="revisionDate" label="修改日期" width="150"></el-table-column>
            <el-table-column prop="revisionUser" label="修改人" width="300"></el-table-column>
            <el-table-column prop="lastEndDate" label="上次限结日期" width="180"></el-table-column>
            <el-table-column prop="revisionEndDate" label="修改后限结日期" width="170"></el-table-column>
            <el-table-column prop="delayDays" label="延期天数/天" width="180"></el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import {getWookSheet, overdueApproval, historyList, overdueApprovalTemporary } from  'api/supervision/index'
  import { Message } from 'element-ui'
  export default {
    data() {
      return {
        delayDays:'',
        pickerOptions1:'',
        endDate1:'',
        radio: '1',
        approvalOpinion:'',
        takeUnit:'',
        title:'',
        comeNum:'',
        eventTypeName:'',
        status:'',
        takeDepartmentName:'',
        doDepartmentName:'',
        endDate:'',
        reportTime:'',
        hadlingStatus:'',
        secretRank:'',
        processStatusName:'',
        fileName:'',
        comeUnit:'',
        doUnit:'',
        errendDate:'',
        comeDate:'',
        offNum:'',
        input:'',
        value1:'',
        value2:'',
        checked:false,
        checked2:false,
        checked3:false,
        checked4:false,
        checked5:false,
        checked6:false,
        dialogVisible: false,
        textarea3:'',
        tableData: [],
      }
    },
    created(){
      let data = {
        "id":this.$route.params.wsId,
      }
      getWookSheet(data).then(response => {
        this.title=response.data.title
        this.comeNum=response.data.comeNum
        this.eventTypeName=response.data.eventTypeName
        this.status=response.data.status
        this.takeDepartment=response.data.takeDepartment
        this.doDepartment=response.data.doDepartment
        this.endDate=response.data.endDate
        this.reportTime=response.data.reportTime
        this.hadlingStatus=response.data.hadlingStatus
        this.secretRank=response.data.secretRank
        this.processStatusName=response.data.processStatusName
        this.fileName=response.data.fileName
        this.comeUnit=response.data.comeUnit
        this.doUnit=response.data.doUnit
        this.errendDate=response.data.errendDate
        this.comeDate=response.data.comeDate
        this.offNum=response.data.offNum
        this.takeUnit=response.data.takeUnit
        this.approvalOpinion=response.data.approvalOpinion
        this.radio=response.data.approvalResult
        this.delayDays=response.data.delayDays
        this.pickerOptions1= {
          disabledDate(time) {
            return time.getTime() <= new Date(Date.parse(response.data.endDate.replace(/-/g,"/")));;
          },
        }
      })
    },
    methods:{
      returnList(){
        this.$router.push({name:'overdueItems'});  /* 点击新增跳转 */
      },
      report(){
        this.$router.push({name:'overdueItems'});  /* 点击新增跳转 */
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      submit(){
        if(this.radio==''){
          this.$message.warning('请选择审批结果')
        }else if(this.endDate1==''){
          this.$message.warning('请选择限结日期')
        }else{
          let data = {
            'id':this.$route.params.wsId,
            'approvalOpinion':this.approvalOpinion,
            'approvalResult':this.radio,
            'newEndDate':this.endDate1,
            'endDate':this.endDate,
            'delayDays':this.delayDays,
            'reportTime':this.reportTime,
            'hadlingStatus':this.hadlingStatus,
            'revisionUser':'1',
            'status':'1'
          }
          overdueApproval(data).then(response => {
            if(response.code !== -1){
              this.$message.success('提交成功');
              this.$router.push({name:'overdueItems'})
            }else{
              this.$message.error('提交异常')
            }
          })
        }
      },
      save(){
        if(this.radio=='' && this.approvalOpinion=='' && this.endDate1==''){
          this.$message.warning('请填写审批信息')
        }else{
          let data = {
            'wsId':this.$route.params.wsId,
            'approvalOpinion':this.approvalOpinion,
            'approvalResult':this.radio,
            'newEndDate':this.endDate1,
          }
          overdueApprovalTemporary(data).then(response => {
            if(response.code !== -1){
              this.$message.success('保存成功');
              this.$router.push({name:'overdueItems'})
            }else{
              this.$message.error('保存异常')
            }
          })
        }
      },
      cancel(){
        var r=confirm("是否确认取消编辑？")
        if(r){
          this.$router.push({name:'overdueItems'});
        }
      },
      countDelayDays(){
        var date2 = this.endDate;
        var date3 = this.endDate1;
        var date1 = new Date(Date.parse(date2.replace(/-/g,"/")));
        var delayDays = parseInt(Math.abs(date3.getTime()- date1.getTime()) /1000/60/60/24);
        this.delayDays = delayDays
      },
      historyTable(){
        let data = {
          "wsId":this.$route.params.wsId,
        }
        historyList(data).then(response => {
          if(response.code !== -1){
            this.dialogVisible = true
            this.tableData = response.data
          }else{
            this.$message.error('没有历史记录')
          }
        })
      },
      typeIndex(index) {
        return index+1;
      },
    }

  }
</script>
<style type="text/css" scoped>
  /*********兼容IE的清除浮动**************/
  .clearFix:after{
    clear: both;
    content:"";
    display: block;
  }
  .clearFix{
    zoom:1;
  }
  .left{
    float: left;
  }
  .right{
    float: right;
  }
  /*********************************/
  .report-last-btn{
    width:100%;
    text-align: center;
    padding-top:20px;
  }
  .over-dialog-title{
    text-align: center;
  }
  .margin-le{
    margin-right: 20px;
  }
  .overdue-title{
    width:900px;
    margin-left: auto;
    margin-right: auto;
  }
  .overdue-title span{
    font-size:14px;
    color:#333;
    text-align: right;
  }
  .overdue-title .el-row{
    line-height: 2;
  }
  .overdue-title-header{
    margin-left: 30px;
    padding:20px 0px;
    font-size:14px;
  }
  .report-textarea textarea{
    width:100%;
    height: 160px !important;
    text-indent: 10px;
    padding-top:10px;
    padding-bottom: 10px;
    outline: none;
    border-left:1px #ccc solid;
  }
  .overdue-title>div{
    font-size:14px;
    color:#999;
  }
  .text-right{
    text-align: right;
  }
  .text-right span{
    margin-right: 20px;
  }
</style>
