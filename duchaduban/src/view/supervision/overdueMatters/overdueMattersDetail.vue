<template>
  <div class="content-wrapper">
    <div class="content-title">
      <el-button class="title-button" size="mini" @click="returnList"><i class="el-icon-arrow-left"></i> 返回</el-button>
      <span class="title-info">进展报送</span>
    </div>
    <!--startprint-->
    <div id="print">
      <div class="detail-title">
        <h1>督查督办进展报送</h1>
        <p>文件密级： <span>{{secretRank}}</span></p>
      </div>
      <div class="tableList">
        <table cellpadding="0" cellspacing="0">
          <tr>
            <th class="th-title th-style">督办编号</th>
            <td>{{wsNum}}</td>
            <th class="th-title th-style">事件类型</th>
            <td>{{eventType}}</td>
            <th class="th-title th-style">事件状态</th>
            <td>{{value2}}</td>
          </tr>
          <tr>
            <td class="th-title">承办司局</td>
            <td>{{takeDepartment}}</td>
            <td class="th-title th-style">会办司局</td>
            <td>{{doDepartment}}</td>
            <td class="th-title th-style">限结日期</td>
            <td>{{endDate}}</td>
          </tr>
          <tr class="things-title">
            <td class="thing-title">事件标题</td>
            <td style="position: relative; height: 40px;" colspan="5">{{title}}</td>
          </tr>
          <tr>
            <td class="th-title">任务进展</td>
            <!--<td>-->
            <!--<input v-model="value2" style="width:169px; height: 40px;">-->
            <!--<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" disabled></el-option>-->
            <!--</input>-->
            <!--</td>-->
            <td style="position: relative; height: 40px;">{{value2}}</td>
            <td class="th-title th-style">报送时间</td>
            <td colspan="3" style="position: relative;">{{reportTime}}</td>
          </tr>
          <tr>
            <td class="th-title th-style" style="padding:20px 0px; text-align: center;">办理情况</td>
            <td colspan="5" class="tb-textarea" style="position: relative; height: 100px; border-bottom:1px #ccc solid">
              {{hadlingStatus}}
            </td>
          </tr>
          <tr>
            <td class="th-title th-style" style="padding:20px 0px; text-align: center;">局办下发文件</td>
            <td colspan="5" class="tb-textarea" style="position: relative; height: 100px; border-bottom:1px #ccc solid">
              <div class="list-width" v-for="item in fileUrls" :key="item.resId" style="text-align: left;padding-left:20px;cursor: pointer;" @click="download(item.resId)">{{item.resName}}</div>
            </td>
          </tr>
          <tr>
            <td class="th-title th-style">附件</td>
            <td colspan="5">
              <div class="list-width" v-for="item in hadlingResults" :key="item.resId" style="text-align: left;padding-left:20px;cursor: pointer;" @click="download(item.resId)">{{item.resName}}</div>
              <!--{{fileName}}-->
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!--endprint-->
    <div class="button-last">
      <el-button type="primary" @click="doPrint">打印</el-button>
      <el-button type="primary" @click="returnList">返回</el-button>
    </div>
  </div>
</template>
<script>
  import {getWookSheet,progressReport, filesDetail } from  'api/supervision/index'
  import { Message } from 'element-ui'
  import {worksheetUrl} from 'api/index'
  export default {
    data() {
      return {
        url: worksheetUrl + '/resNew/fileUpload',      //文件上传地址
        fileUrls:[],
        hadlingResults:[],
        hadlingResult:'',
        takeDepartmentName:'',
        doDepartmentName:'',
        fileName:'',
        input:'',
        input1:'',
        input2:'',
        input3:'',
        value2:'',
        textarea3:'',
        value3:'',
        wsNum:'',
        eventType:'',
        hadlingStatus:'',
        takeDepartment:'',
        doDepartment:'',
        endDate:'',
        title:'',
        reportTime:'',
        status:'',
        secretRank:'',
        processStatus:'',
        options2: [{
          value: '3',
          label: '逾期办理'
        }, {
          value: '2',
          label: '按期办理',
        }, {
          value: '1',
          label: '已办结'
        }, {
          value: '0',
          label: '待办',
        }],
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
        "id":this.$route.params.wsId,
      }
      getWookSheet(data).then(response => {
        this.wsNum=response.data.wsNum
        this.eventType=response.data.eventTypeName
        this.status=response.data.status
        this.takeDepartment=response.data.takeDepartment
        this.doDepartment=response.data.doDepartment
        this.endDate=response.data.endDate
        this.title=response.data.title
        this.reportTime=response.data.reportTime
        this.hadlingStatus=response.data.hadlingStatus
        this.fileUrl=response.data.fileUrl
        this.secretRank=response.data.secretRank
        this.value2=response.data.processStatusName
        this.hadlingResult=response.data.hadlingResult
        if(response.data.reportTime==''){
          var data=new Date().toLocaleDateString()
          this.reportTime=data.replace(/[/]/g,'-')
        }else{
          this.reportTime=response.data.reportTime
        }
        if (response.data.hadlingResult != '') {
          filesDetail(response.data.hadlingResult).then(res => {
            if (res.code == 1) {
              this.hadlingResults = res.data
            }
          }).catch(err => {

          })
        }
        if (response.data.fileUrl != '') {
          filesDetail(response.data.fileUrl).then(res => {
            if (res.code == 1) {
              this.fileUrls = res.data
            }
          }).catch(err => {

          })
        }
      })
    },
    beforeCreate(){
      let data = {
        "id":this.$route.params.wsId,
      }
      getWookSheet(data).then(response => {
        this.wsNum=response.data.wsNum
        this.eventType=response.data.eventTypeName
        this.status=response.data.status
        this.takeDepartment=response.data.takeDepartment
        this.doDepartment=response.data.doDepartment
        this.endDate=response.data.endDate
        this.title=response.data.title
        this.reportTime=response.data.reportTime
        this.hadlingStatus=response.data.hadlingStatus
        this.secretRank=response.data.secretRank
        this.value2=response.data.processStatusName
        this.hadlingResult=response.data.hadlingResult
        if(response.data.reportTime==''){
          var data=new Date().toLocaleDateString()
          this.reportTime=data.replace(/[/]/g,'-')
        }else{
          this.reportTime=response.data.reportTime
        }
      })
    },
    methods:{
      download(id){
        window.location.href = worksheetUrl + 'common/res/fileDownload?resId=' + id
      },
      doPrint() {
        let subPrint = document.getElementById('print');
        console.log(subPrint);
        let newContent = subPrint.innerHTML;
        let oldContent = newContent.innerHTML;
        document.body.innerHTML = newContent;
        window.print();
        window.location.reload(); //解决打印取消  返回页面鼠标失效,不能继续打印
        document.body.innerHTML = oldContent;
        return false;
      },
      returnList(){
        this.$router.push({name:'overdueMatters'});  /* 点击返回跳转 */
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
  .things-title{
    border-bottom: 1px #ddd solid;
  }
  .tableList table{
    margin-left: auto;
    border:1px #ddd solid;
    margin-right: auto;
  }
  .tableList table input{
    border:none;
    border-bottom: 1px #ddd solid;
    outline: none;
    padding:12px 0px;
    /*text-indent: 10px;*/
  }
  .tableList table .th-title{
    padding:10px 30px;
    border-right: 1px #ddd solid;
    border-bottom: 1px #ddd solid;
  }
  .tableList table .th-style{
    border-left: 1px #ddd solid;
  }
  .tableList table td{
    border: 1px solid #ddd;
    text-align: center;
    width: 150px;
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
  }
  .el-button--primary{
    padding:8px 20px;
    margin-left: 20px;
  }
  .button-last{
    width:225px;
    margin-left: auto;
    margin-right: auto;
    padding-top:20px;
    margin-bottom: 20px;
  }
  .button-last button{
    margin-right: 20px;
  }
  th input,td input{
    width:100%;
  }
</style>
