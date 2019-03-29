<template>
  <div class="content-wrapper">
    <div class="content-title">
      <el-button class="title-button" size="mini" @click="returnList"><i class="el-icon-arrow-left"></i> 返回</el-button>
      <span class="title-info">进展报送</span>
    </div>
    <div class="detail-title">
      <h1>督查督办进展报送</h1>
      <p>文件密级： <span>{{secretRank}}</span></p>
    </div>
    <div class="tableList">
      <table cellpadding="0" cellspacing="0">
        <tr>
          <th class="th-title th-style">督办编号</th>
          <th><input type="text" name="text" v-model="wsNum" disabled></th>
          <th class="th-title th-style">事件类型</th>
          <th><input type="text" name="text" v-model="eventType" disabled></th>
          <th class="th-title th-style">事件状态</th>
          <th><input type="text" name="text" value="在办" disabled></th>
        </tr>
        <tr>
          <td class="th-title">承办司局</td>
          <td><input type="text" name="text" v-model="takeDepartment" disabled></td>
          <td class="th-title th-style">会办司局</td>
          <td><input type="text" name="text" v-model="doDepartment" disabled></td>
          <td class="th-title th-style">限结日期</td>
          <td><input type="text" name="text" v-model="endDate" disabled></td>
        </tr>
        <tr class="things-title">
          <td class="thing-title">事件标题</td>
          <td style="position: relative; height: 40px;" colspan="5"><input type="text" name="text" style="position: absolute;top: 0px; text-indent: 20px;" placeholder="请输入内容" v-model="title" disabled></td>
        </tr>
        <tr>
          <td class="th-title">任务进展</td>
          <td>
            <el-select v-model="value2" style="width:169px; height: 40px;">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </td>
          <td class="th-title th-style" style="border-top:1px #ddd solid; border-bottom: none;">报送时间</td>
          <td style="position: relative;"><input type="text" name="text" disabled style="border-top:1px #ddd solid; position: absolute; width:441px;top:0px;" v-model="reportTime" disabled></td>
        </tr>
        <tr>
          <td class="th-title th-style" style="padding:20px 0px; text-align: center;">办理情况</td>
          <td class="tb-textarea" style="position: relative; height: 100px; border-bottom:1px #ccc solid">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="进展描述" v-model="hadlingStatus" style="position: absolute; width:730px; top:0px;">
            </el-input>
          </td>
        </tr>
        <tr>
          <td class="th-title th-style" style="padding:20px 0px; text-align: center;">局办上传文件</td>
          <td colspan="5" class="tb-textarea" style="position: relative; height: 96px; border-bottom:1px #ccc solid">
            <div class="list-width" v-for="item in fileUrls" :key="item" style="text-align: left;padding-left:20px;cursor: pointer;" @click="download(item.resId)">{{item.resName}}</div>
            <!--<el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="进展描述" v-model="hadlingResult" style="position: absolute; top:0px;">-->
            <!--</el-input>-->
          </td>
        </tr>
        <tr>
          <td class="th-title th-style">附件</td>
          <td style="padding-top: 8px;">
            <!--<input type="file" value="附件上传" :id="id" @change="getFile($event)">-->
            <el-upload class="upload-demo"
                       :action="url"
                       :on-success="handleSuccess"
                       :before-remove="beforeRemove"
                       :on-remove="handleRemove"
                       :file-list="fileListhadlingResultsList">
              <el-button size="small" type="primary">上传</el-button>
            </el-upload>
            <!-- <div class="list-width" v-for="item in hadlingResults" :key="item" style="text-align: left;padding-left:20px;cursor: pointer;" @click="download(item.resId)">{{item.resName}}</div> -->
          </td>
        </tr>
      </table>
    </div>
    <div class="button-last">
      <el-button type="primary" @click="save">暂存</el-button>
      <el-button type="primary" @click="print">打印</el-button>
      <el-button type="primary" @click="returnList">返回</el-button>
      <el-button type="primary" @click="sendOffice">发送局办公室</el-button>
      <el-button type="primary" @click="close">发送主管领导</el-button>
      <div id="selectLeader" v-show="showType">
        <h3>主管领导选择</h3>
        <span class="close"  @click="close">X</span>
        <div class="leaderName">
          <div v-for="(item, index) in leaderOptions" style="margin-top: 10px;"><input type="radio" name="leaderName" v-model="reportUser" :value="item.userId" :key="index" style="margin-right: 10px;">{{item.realname}}</div>
        </div>
        <div class="btn_learder">
          <input type="button" value="确认" class="btn_input confirm"  @click="sendleader">
          <input type="button" value="取消" class="btn_input cancel"  @click="close">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {getWookSheet,progressReport,progressReportTemporary, filesDetail, getLeader } from  'api/supervision/index'
  import {worksheetUrl} from 'api/index'
  import { Message } from 'element-ui'
  export default {
    data() {
      return {
          url: worksheetUrl + '/common/res/fileUpload',      //文件上传地址
  		fileUrls:[],
  		fileListhadlingResultsList:[],
          hadlingResults:'',
          fileIds:[],
        processStatusName:'',
        id:"file",
        showType:false,
        reportUser:'',
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
        fileName:'',
        fileUrl:'',
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
        time:null,
        leaderOptions: [],    //主管领导
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
        this.hadlingStatus=response.data.hadlingStatus
        this.secretRank=response.data.secretRank
        this.value2=response.data.processStatus
        this.processStatusName=response.data.processStatusName
        this.hadlingResults=response.data.hadlingResult
        this.fileUrl=response.data.fileUrl
        if(!response.data.reportTime){
          var data=new Date().toLocaleDateString();
          this.reportTime=data.replace(/[/]/g,'-')
        }else{
          this.reportTime=response.data.reportTime
        }
        const { hadlingResult } = response.data;
		if (hadlingResult) {
			this.filesDetails(hadlingResult,(info)=>{
			  // this.hadlingResults=info;
			  this.fileListhadlingResultsList=info.map(item=>{
				return {
				  name:item.resName,
				  percentage:100,
				  resId:item.resId,
				}
			  });
			  console.log(this.hadlingResults)
			});
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
      getLeader().then(response =>{
        this.leaderOptions = response.data;
      })
    },
    methods:{
        filesDetails(ids,cb){
          filesDetail(ids).then((res)=>{
            if(res.data){
              cb(res.data);
            }
          });
        },
      download(id){
        window.location.href = worksheetUrl + 'common/res/fileDownload?resId=' + id
      },
      beforeRemove(file, fileList) {
 	   return this.$confirm(`确定移除 ${ file.name }？`);
 	 },
 	 handleRemove(file, fileList) {
 	   const repla = this.hadlingResults.indexOf(`,${file.resId}`) >= 0
 	   ? `,${file.resId}`
 	   : this.hadlingResults.indexOf(',') >= 0 ? `${file.resId},` : file.resId;
	   console.log(repla);
       console.log(this.hadlingResults);
	   debugger;
 	   this.hadlingResults = this.hadlingResults.replace(repla, '')
 	 },
 	 handleSuccess(response, file, fileList){
 	   file.resId = response.data[0].resId
 	   if (this.hadlingResults) {
 		 this.hadlingResults += `,${response.data[0].resId}`
 	   } else {
 		 this.hadlingResults = response.data[0].resId + ''
 	   }
 	 },
      returnList(){
        this.$router.push({name:'overseeEvents'});  /* 点击返回跳转 */
      },
      save(){
        // alert(this.fileIds.toString())
          let data = {
            "wsId":this.$route.params.wsId,
            "hadlingStatus":this.hadlingStatus,
            "processStatus":this.processStatus,
            "reportTime":this.reportTime,
            // "fileName":this.fileName,
            "fileUrl":this.hadlingResults,
          }
          progressReportTemporary(data).then(response => {
            // alert(response.msg)
            if(response.code !== -1){
              this.$message.success('保存成功');
              this.$router.push({name:'overseeEvents'})
            }else{
              this.$message.error('保存异常')
            }
          })
      },
      sendOffice(){
        // alert(this.fileIds)
        if(this.value2==''){
          this.$message.warning('请选择“任务进展”')
          return
        }if(this.value2=='逾期办理'){
          this.value2='3'
        }if(this.value2=='按期办理'){
          this.value2='2'
        }if(this.value2=='已办结'){
          this.value2='1'
        }if(this.value2=='待办'){
          this.value2='0'
        }else if(this.hadlingStatus==''){
          this.$message.warning('请填写“办理情况”')
          return
        }else{
          let data = {
            "id":this.$route.params.wsId,
            "reportStatus":1,
            "dataStatus":0,
            "isSendOffice":1,
            "reportTime":this.reportTime,
            "hadlingStatus":this.hadlingStatus,
            "processStatus":this.value2,
            // "fileName":this.fileName,
            "fileUrl":this.hadlingResults,
          }
          progressReport(data).then(response => {
            if(response.code !== -1){
              this.$message.success('发送成功');
              this.$router.push({name:'overseeEvents'})
            }else{
              this.$message.error('发送异常')
            }
          })
        }

      },
      sendleader(){
        // alert(this.fileIds.toString())
        if(this.value2==''){
          this.$message.warning('请选择“任务进展”')
          return
        }if(this.value2=='逾期办理'){
          this.value2='3'
        }if(this.value2=='按期办理'){
          this.value2='2'
        }if(this.value2=='已办结'){
          this.value2='1'
        }if(this.value2=='待办'){
          this.value2='0'
        }else if(this.hadlingStatus==''){
          this.$message.warning('请填写“办理情况”')
          return
        }else if(this.reportUser==''){
          this.$message.warning('请选择“主管领导”')
          return
        }else{
          let data = {
            "id":this.$route.params.wsId,
            "reportStatus":2,
            "dataStatus":0,
            "isSendOffice":0,
            "reportTime":this.reportTime,
            "hadlingStatus":this.hadlingStatus,
            "processStatus":this.value2,
            // "fileName":this.fileName,
            "fileUrl":this.hadlingResults,
            "reportUser":this.reportUser,
          }
          progressReport(data).then(response => {
            if(response.code !== -1){
              this.$message.success('发送成功');
              this.$router.push({name:'overseeEvents'})
            }else{
              this.$message.error('发送异常')
            }

          })
        }
      },
      close(){
        this.showType=!this.showType
      },
      print(){
        window.print()
      }
  }
    }
</script>
<style type="text/css" scoped>
  .tableList tr .thingsTd{
    max-width: 100px;
    border-bottom: 1px solid #ccc;
    padding: 10px;
  }
  .tableList tr .thingsTd div{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    width:680px;
    margin: 20px auto;
  }
  .button-last button{
    margin-right: 20px;
  }
  #selectLeader{
    width: 380px;
    height: 350px;
    border:1px solid #ddd;
    background: #fff;
    z-index: 999999;
    position: absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    margin: auto auto;
  }
  #selectLeader h3{
    text-align: center;
    line-height: 30px;
  }
  #selectLeader .close{
    width: 20px;
    height:20px;
    position: absolute;
    right: 0px;
    top: 20px;
    cursor: pointer;
  }
  .leaderName{
    border-top: 1px solid #eee;
    height: 200px;
    padding-left: 30px;
    overflow-y: auto;
  }
  .leaderName div{
    line-height: 40px;
  }
  .btn_learder{
    width:380px;
    height:48px;
    position: absolute;
    bottom: 10px;
  }
  .btn_input{
    width: 65px;
    height:30px;
    background:#0079cf;
    border: 1px solid #0079cf;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
  }
  .confirm{
    margin-left: 110px;
    margin-right: 30px;
  }
  .btn_input:hover{
    background:#3a8ee6;
    border: 1px solid #3a8ee6;
  }
  th input,td input{
    width:100%;
  }
</style>
