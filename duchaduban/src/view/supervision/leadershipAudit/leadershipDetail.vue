<template>
  <div class="content-wrapper">
    <div class="content-title">
      <el-button class="title-button" size="mini" @click="returnList"><i class="el-icon-arrow-left"></i> 返回</el-button>
        <span class="title-info">领导审核一</span>
    </div>
    <div class="report-header">
      <div class="report-btn leader-bottom">
        <el-button type="primary" class="search-btn" @click="exportData">导出</el-button>
        <el-button type="primary" class="search-btn" @click="doPrint">打印</el-button>
      </div>
    </div>
      <div id="print">
      <div class="leader-number clearFix report-header">
        <div class="left come-frme"><span class="turn-right-margin">任务来源：</span><div>{{this.$route.params.comeUnit}}</div></div>
        <div class="right number-sizing"><span>督办编号：</span><div>{{this.$route.params.wsNum}}</div></div>
      </div>

      <div class="report-title" ref="title">国家粮食和物资储备局<span>{{year}}年{{month}}月份</span>督办情况统计</div>
      <div class="report-header">
        <div class="report-text-tlt">一、月度报告概述</div>
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="notes" class="report-textarea">
        </el-input>
      </div>

    <div class="list">
      <div class="report-table-tit">二、月度报告统计</div>
      <el-table :data="tableData" class="table1" stripe="" style="width: 100%; padding:0px 20px;">
         <el-table-column type="index" :index="typeIndex" label="序号" width="120"></el-table-column>
         <el-table-column prop="takeDepartment" label="承办单位"></el-table-column>
         <el-table-column prop="title" label="标题"></el-table-column>
         <el-table-column prop="processStatus" label="处理情况"></el-table-column>
         <el-table-column prop="eventType" label="事件类型"></el-table-column>
      </el-table>
      <div class="shenhe-sizing">
        <div class="report-text-tlt">三、审核意见</div>
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="opinionDetail" class="report-textarea">
        </el-input>
      </div>
      </div>
      </div>
      <div class="report-last-btn">
        <el-button type="primary" @click="returnList" style="margin-right:25px;">返回</el-button>
        <!--<el-button type="primary" style="margin-right: 30px;"  @click="dialogVisible = true">审核退回</el-button>-->
        <!--<el-dialog :visible.sync="dialogVisible"  width="30%" :before-close="handleClose">-->
          <!--<div>领导选择</div>-->
          <!--<div class="report-dialog-body">-->
            <!--<el-input placeholder="请输入内容" v-model="input">-->
              <!--<i slot="prefix" class="el-input__icon el-icon-search"></i>-->
            <!--</el-input>-->
            <!--<ul>-->
              <!--<li class="list-style-no clearFix">-->
                <!--<el-checkbox v-model="checked">张务锋</el-checkbox>-->
                <!--<span class="turn-right-report">局长</span>-->
              <!--</li>-->
              <!--<li class="list-style-no clearFix">-->
                <!--<el-checkbox v-model="checked2">曾丽英</el-checkbox>-->
                <!--<span class="turn-right-report">副局长</span>-->
              <!--</li>-->
              <!--<li class="list-style-no clearFix">-->
                <!--<el-checkbox v-model="checked3">张务锋</el-checkbox>-->
                <!--<span class="turn-right-report">局长</span>-->
              <!--</li>-->
              <!--<li class="list-style-no clearFix">-->
                <!--<el-checkbox v-model="checked4">张务锋</el-checkbox>-->
                <!--<span class="turn-right-report">局长</span>-->
              <!--</li>-->
            <!--</ul>-->
          <!--</div>-->
          <!--<span slot="footer" class="dialog-footer">-->
            <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
            <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
          <!--</span>-->
        <!--</el-dialog>-->
        <el-button type="primary" @click="submit">提交</el-button>
      </div>

  </div>
</template>
<script>
  import {approvalById, approvalSumbit, exportDataList} from 'api/supervision/index'
  import { Message } from 'element-ui'
  import {worksheetUrl} from 'api/index'
  export default {
    data() {
      return {
        reportId:'',
        year:'',
        month:'',
        opinionDetail:'',
        notes:'',
        input:'',
        input1:'',
        input2:'',
        input3:'',
        value2:'',
        value3:'',
        textarea3:'',
        textarea4:'',
        showType: false,
        // options2: [],
        // options3: [],
        dialogVisible: false,
        checked:true,
        checked2:"",
        checked3:"",
        checked4:"",
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
      let data = {
        "reportId":this.$route.params.reportId
      }
      approvalById(data).then(response => {
        this.tableData = response.data.wookSheets
        this.opinionDetail = response.data.opinion
        this.notes = response.data.notes
        this.reportNum = response.data.reportNum
        let dataTime = response.data.reportNum
        this.year = dataTime.substr(0,4)
        this.month = dataTime.substr(5,1)
      })

    },
    methods:{
        doPrint() {
        	let subPrint = document.getElementById('print');
            console.log(subPrint);
            let newContent = subPrint.innerHTML;
        	let oldContent = newContent.innerHTML;
        	document.body.innerHTML = newContent;
        	window.print();
            window.location.reload() //解决打印取消  返回页面鼠标失效,不能继续打印
        	document.body.innerHTML = oldContent;
            return false;
        },
      returnList(){
        this.$router.push({name:'leadershipAudit'});  /* 点击返回跳转 */
      },
      submit(){
        let data = {
          'reportId':this.$route.params.reportId,
          // 'nextLevel':parseInt(this.$route.params.reviewLevel) + 1,
          'notes':this.notes,
          'opinion':this.opinionDetail
        }
        approvalSumbit(data).then(response => {
          if(response.code !== -1){
            this.$message.success('提交成功');
            this.$router.push({name:'leadershipDetail-next',params:{reportId:this.$route.params.reportId}});
          }else{
            this.$message.error('提交异常')
          }
        })
      },
      typeIndex(index) {
        return index+1;
      },
      exportData(){
        let data = {
          'reportId': this.$route.params.reportId,
          'rowRD': this.reportNum,
          'rowTitle': this.$refs.title.innerText,
          'num': this.$route.params.wsNum,
          'checkType': 1,
          'auditOpinion': this.opinionDetail,
          'monthlyReport': this.notes,
        }
        exportDataList(data).then(response => {
          window.location.href = worksheetUrl + response.data
        })
      },
      print(){
        window.print();
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
  .left{
    float: left;
  }
  .right{
    float: right;
  }
/*********************/
  .report-header{
    padding:10px 20px 0px;
  }
  .leader-bottom{
    text-align: right;
    margin-bottom: 20px;
  }
  .come-frme{
    text-align: left;
  }
  .come-frme>div{
    display: inline-block;
  }
  .number-sizing{
    padding-right: 20px;
    text-align: right;
  }
  .number-sizing>div{
    display: inline-block;
  }
  .list{
    padding-top:20px;
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
  .shenhe-sizing{
    width:96%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 20px;
  }
</style>
