<template>
  <div class="content-wrapper">
    <div class="content-title">
      <el-button class="title-button" size="mini" @click="returnList"><i class="el-icon-arrow-left"></i> 返回</el-button>
        <span class="title-info">生成报告</span>
    </div>
    <div class="report-header">
      <div class="clearFix" style="height: 60px;">
        <div class="report-date">
          <span class="turn-right-margin">报告期</span>
          <el-select v-model="value1" style="width:200px;" @change="handleTime">
            <el-option v-for="item in options1" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="report-btn">
          <el-button type="primary" icon="el-icon-upload" class="search-btn" @click="exportReport">导出</el-button>
          <el-button type="primary" icon="el-icon-printer" class="search-btn" @click="print">打印</el-button>
        </div>
      </div>
      <div class="report-title" ref="title">国家粮食和物资储备局<span>{{year}}年{{month}}月份</span>督办情况统计</div>
      <div>
        <div class="report-text-tlt">一、月度报告概述</div>
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="notes" class="report-textarea">
        </el-input>
      </div>
    </div>
    <div class="list">
      <div class="report-table-tit">二、月度报告统计</div>
      <el-table :data="tableData" class="table1" stripe="" style="width: 100%">
         <el-table-column type="index" :index="typeIndex" label="序号" width="100"></el-table-column>
         <el-table-column prop="takeUnit" label="承办单位"></el-table-column>
         <el-table-column prop="title" label="事件标题"></el-table-column>
         <el-table-column prop="createTime" label="登记时间"></el-table-column>
         <el-table-column prop="processStatus" label="处理情况"></el-table-column>
         <el-table-column prop="eventType" label="事件类型"></el-table-column>
      </el-table>
      <div class="report-last-btn">
        <el-button type="primary" style="margin-right: 30px;"  @click="infoSave">暂存</el-button>
        <el-button type="primary" @click="dialogVisible = true">提交下一步审核人</el-button>
        <el-dialog :visible.sync="dialogVisible"  width="30%" :before-close="handleClose">
          <div>领导选择</div>
          <div class="report-dialog-body">
            <el-input placeholder="请输入内容" v-model="input" style="margin-bottom: 10px;">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-table ref="multipleTable" :data="auditorOptions" style="width: 100%" @selection-change="handleSelectionChange" :header-cell-class-name="headerStyle">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="realname" label="姓名" width="120"></el-table-column>
              <el-table-column prop="levelName" label="职务" width="120"></el-table-column>
            </el-table>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary"  @click="sumbitApproval">确 定</el-button>
          </span>
        </el-dialog>
        <el-button type="primary" style="margin-left: 30px;" @click="returnList">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {reportInfoList, getUnReportNums, getWookSheetByDate, addReport, exportReport1, reportUpdate, getAuditor} from 'api/supervision/index'
  import { Message } from 'element-ui'
  import {worksheetUrl} from 'api/index'
  export default {
    data() {
      return {
        year:'',
        month:'',
        input:'',
        input1:'',
        input2:'',
        input3:'',
        value1:'',
        value2:'',
        value3:'',
        notes:'',
        textarea3:'',
        checked:'',
        checked2:"",
        checked3:"",
        checked4:"",
        dialogVisible: false,
        showType: false,
        options1: [],
        tableData: [],
        formPage: {
          page: 1,
          limit: 10,
          total: undefined,
        },
        activityName:null,
        time:null,
        auditorOptions: [],   //审核人
        multipleSelection: [],
      }
    },
    created(){
      getUnReportNums().then(response => {
         this.options1 = response.data
         this.value1=response.data[0].value
         this.year = this.value1.substr(0,4)
         this.month = this.value1.substr(4)
          let data = {
            "time":  this.value1
          }
          getWookSheetByDate(data).then(response => {
            this.tableData = response.data
            this.notes= response.data.notes
          })
      })
      getAuditor().then(response => {
        this.auditorOptions = response.data;
      })
    },
    methods:{
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      headerStyle({row, rowIndex}){
        return 'table-header'
      },
      handleTime(){
        this.year = this.value1.substr(0,4)
        this.month = this.value1.substr(4)
        let data = {
          "time":  this.value1
        }
        getWookSheetByDate(data).then(response => {
          this.tableData = response.data
          this.notes= response.data.notes
        })
      },
      print(){
        window.print()
      },
      returnList(){
        this.$router.push({name:'supervisoryManage'});  /* 点击返回跳转 */
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
       typeIndex(index) {
         return index+1;
      },
      infoSave(){
        let data={
          "reportNum": this.value1,
          "notes": this.notes,
          "status": "0"
        };
        addReport(data).then(response => {
          if(response.code !== -1){
            this.$message.success('保存成功！');
            this.$router.push({name:'supervisoryManage'})
          }else{
            this.$message.error('保存异常')
          }
        })

      },
      //提交下一步领导审核
      sumbitApproval(){
        let data={
          // 'reportId': this.$route.params.reportId,
          // "reviewUserId":1,
          "leaders": JSON.stringify(this.multipleSelection),
          // "reviewLevel":"1",
          "reportNum": this.value1,
          "notes": this.notes,
          "status": "1"
        };
        addReport(data).then(response => {
          this.dialogVisible = !this.dialogVisible;
          if(response.code !== -1){
            this.$message.success('提交成功');
            this.$router.push({name:'supervisoryManage'})
          }else{
            this.$message.error('提交异常')
          }
        })
      },
      exportReport: function () {
        let data = {
          'rowRD': this.value1,
          'rowTitle': this.$refs.title.innerText,
          'type': 1,
          'monthlyReport': this.notes,
          'time' : this.value1
        }
        exportReport1(data).then(response => {
          window.location.href = worksheetUrl + response.data
        })
      }
    }
  }
</script>
<style type="text/css" scoped>
/*兼容IE9的清除浮动*/
  .clearFix{
    zoom:1;
  }
  .clearFix:after{
    content:"";
    display: block;
    clear: both;
  }


/*********************/
  .el-table    /deep/   .table-header{
    display: none;
  }
  .report-dialog-body .el-table:before{
    height: 0;
  }
  .report-dialog-body    /deep/   .el-table td, .report-dialog-body    /deep/   .el-table th.is-leaf{
    border-bottom: none;
  }
  .report-dialog-body    /deep/    .el-dialog__body{
    height: 225px;
    overflow-y: auto;
  }
  .report-header{
    padding:10px 20px 0px;
  }
  .report-date{
    float: left;
  }
  .report-btn{
    float: right;
    text-align: right;
  }
  .list{
    padding-top:20px;
    padding:20px;
  }
  .turn-right-margin{
    margin-right: 20px;
  }
  .report-title{
    width:100%;
    padding-top:20px;
    text-align: center;
    font-size:16px;
    font-family: "微软雅黑";
  }
  .report-table-tit{
    font-size: 14px;
    margin-bottom: 10px;
    padding-left: 20px;
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
  .report-text-tlt{
    margin-bottom: 10px;
  }
  .report-last-btn{
    width:100%;
    text-align: center;
    padding-top:20px;
  }
  .list-style-no{
    list-style: none;
    text-align: left;
  }
  .turn-right-report{
    margin-left: 30px;
  }
</style>












