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
          <td class="thingsTd">
            <div class="list-width" style="text-align: center;">{{wsNum}}</div>
            <!--<input type="text" name="text" v-model="wsNum" disabled>-->
          </td>
          <th class="th-title th-style">事件类型</th>
          <td class="thingsTd">
            <div class="list-width" style="text-align: center;">{{eventType}}</div>
            <!--<input type="text" name="text" v-model="eventType" disabled>-->
          </td>
          <th class="th-title th-style">事件状态</th>
          <td class="thingsTd">
            <div class="list-width" style="text-align: center;">在办</div>
            <!--<input type="text" name="text" value="办理中" disabled>-->
          </td>
        </tr>
        <tr>
          <td class="th-title">承办司局</td>
          <td class="thingsTd">
            <div class="list-width" style="text-align: center;">{{takeDepartment}}</div>
            <!--<input type="text" name="text" v-model="takeDepartmentName" disabled>-->
          </td>
          <td class="th-title th-style">会办司局</td>
          <td class="thingsTd">
            <div class="list-width" style="text-align: center;">{{doDepartment}}</div>
            <!--<input type="text" name="text" v-model="doDepartmentName" disabled>-->
          </td>
          <td class="th-title th-style">限结日期</td>
          <td class="thingsTd">
            <div class="list-width" style="text-align: center;">{{endDate}}</div>
            <!--<input type="text" name="text" v-model="endDate" disabled>-->
          </td>
        </tr>
        <tr class="things-title">
          <td class="thing-title">事件标题</td>
          <td class="thingsTd" style="position: relative; height: 40px;" colspan="5">
            <div class="list-width" style="text-align: center;">{{title}}</div>
            <!--<input type="text" name="text" style="position: absolute;top: 0px; text-indent: 20px;" placeholder="请输入内容" v-model="title" disabled>-->
          </td>
        </tr>
        <tr>
          <td class="th-title">任务进展</td>
          <td>
            <el-select v-model="processStatus" style="width:169px; height: 40px;">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </td>
          <td class="th-title th-style" style="border-top:1px #ddd solid; border-bottom: none;">报送时间</td>
          <td class="thingsTd" colspan="3" style="position: relative;">
            <div class="list-width" style="text-align: center;">{{reportTime}}</div>
            <!--<input type="text" name="text" style="border-top:1px #ddd solid; position: absolute;top:0px;" v-model="reportTime" disabled>-->
          </td>
        </tr>
        <tr>
          <td class="th-title th-style" style="padding:20px 0px; text-align: center;">办理情况</td>
          <td colspan="5" class="tb-textarea" style="position: relative; height: 96px; border-bottom:1px #ccc solid">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="进展描述" v-model="hadlingStatus" style="position: absolute; top:0px;">
            </el-input>
          </td>
        </tr>
        <tr>
          <td class="th-title th-style" style="padding:20px 0px; text-align: center;">局办上传文件</td>
          <td colspan="5" class="tb-textarea" style="position: relative; height: 96px; border-bottom:1px #ccc solid">
            <div class="list-width" v-for="item in fileUrls" :key="item.resId" style="text-align: left;padding-left:20px;cursor: pointer;" @click="download(item.resId)">{{item.resName}}</div>
            <!--<el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="进展描述" v-model="hadlingResult" style="position: absolute; top:0px;">-->
            <!--</el-input>-->
          </td>
        </tr>
        <tr>
          <td class="th-title th-style">附件</td>
          <td style="padding-top:8px;">
            <!--<input type="file" value="附件上传" :id="id" @change="getFile($event)">-->
            <el-upload class="upload-demo"
                       :action="url"
                       :on-success="handleSuccess"
                       :before-remove="beforeRemove"
                       :on-remove="handleRemove"
                       :file-list="fileListhadlingResultsList"
                       >
              <el-button size="small" type="primary">上传</el-button>
            </el-upload>
            <div class="list-width" v-for="item in hadlingResults" :key="item.resId" style="text-align: left;padding-left:20px;cursor: pointer;" @click="download(item.resId)">{{item.resName}}</div>
          </td>
        </tr>
        <tr>
          <td class="th-title th-style" style="padding:20px 0px; text-align: center;">审批意见</td>
          <td colspan="5" class="tb-textarea" style="position: relative; height: 96px; border-bottom:1px #ccc solid">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="意见描述" v-model="approvalOpinion" style="position: absolute; top:0px;" >
            </el-input>
          </td>
        </tr>
      </table>
    </div>
    <div id="print" style="display:none">
        <div class="detail-title">
          <h1>督查督办进展报送</h1>
          <p>文件密级： <span>{{secretRank}}</span></p>
        </div>
        <div class="tableList">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <th class="th-title th-style">督办编号</th>
              <td class="thingsTd">
                <div class="list-width" style="text-align: center;">{{wsNum}}</div>
                <!--<input type="text" name="text" v-model="wsNum" disabled>-->
              </td>
              <th class="th-title th-style">事件类型</th>
              <td class="thingsTd">
                <div class="list-width" style="text-align: center;">{{eventType}}</div>
                <!--<input type="text" name="text" v-model="eventType" disabled>-->
              </td>
              <th class="th-title th-style">事件状态</th>
              <td class="thingsTd">
                <div class="list-width" style="text-align: center;">办理中</div>
                <!--<input type="text" name="text" value="办理中" disabled>-->
              </td>
            </tr>
            <tr>
              <td class="th-title">承办司局</td>
              <td class="thingsTd">
                <div class="list-width" style="text-align: center;">{{takeDepartment}}</div>
                <!--<input type="text" name="text" v-model="takeDepartmentName" disabled>-->
              </td>
              <td class="th-title th-style">会办司局</td>
              <td class="thingsTd">
                <div class="list-width" style="text-align: center;">{{doDepartment}}</div>
                <!--<input type="text" name="text" v-model="doDepartmentName" disabled>-->
              </td>
              <td class="th-title th-style">限结日期</td>
              <td class="thingsTd">
                <div class="list-width" style="text-align: center;">{{endDate}}</div>
                <!--<input type="text" name="text" v-model="endDate" disabled>-->
              </td>
            </tr>
            <tr class="things-title">
              <td class="thing-title">事件标题</td>
              <td class="thingsTd" style="position: relative; height: 40px;" colspan="5">
                <div class="list-width" style="text-align: center;">{{title}}</div>
                <!--<input type="text" name="text" style="position: absolute;top: 0px; text-indent: 20px;" placeholder="请输入内容" v-model="title" disabled>-->
              </td>
            </tr>
            <tr>
              <td class="th-title">任务进展</td>
              <td>
                <el-select v-model="processStatus" style="width:169px; height: 40px;">
                  <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td class="th-title th-style" style="border-top:1px #ddd solid; border-bottom: none;">报送时间</td>
              <td class="thingsTd" colspan="3" style="position: relative;">
                <div class="list-width" style="text-align: center;">{{reportTime}}</div>
                <!--<input type="text" name="text" style="border-top:1px #ddd solid; position: absolute;top:0px;" v-model="reportTime" disabled>-->
              </td>
            </tr>
            <tr>
              <td class="th-title th-style" style="padding:20px 0px; text-align: center;">办理情况</td>
              <td colspan="5" class="tb-textarea" style="position: relative; height: 96px; border-bottom:1px #ccc solid">
                <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="进展描述" v-model="hadlingStatus" style="position: absolute; top:0px;">
                </el-input>
              </td>
            </tr>
            <tr>
              <td class="th-title th-style" style="padding:20px 0px; text-align: center;">局办上传文件</td>
              <td colspan="5" class="tb-textarea" style="position: relative; height: 96px; border-bottom:1px #ccc solid">
                <div class="list-width" v-for="item in fileUrls" :key="item.resId" style="text-align: left;padding-left:20px;cursor: pointer;" @click="download(item.resId)">{{item.resName}}</div>
                <!--<el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="进展描述" v-model="hadlingResult" style="position: absolute; top:0px;">-->
                <!--</el-input>-->
              </td>
            </tr>
            <tr>
              <td class="th-title th-style">附件</td>
              <td style="padding-top:8px;">
                <!--<input type="file" value="附件上传" :id="id" @change="getFile($event)">-->
                <el-upload class="upload-demo"
                           :action="url"
                           :on-success="handleSuccess"
                           :before-remove="beforeRemove"
                           :on-remove="handleRemove"
                           :file-list="fileListhadlingResultsList">
                  <el-button size="small" type="primary">上传</el-button>
                </el-upload>
                <!-- <div class="list-width" v-for="item in hadlingResults" :key="item.resId" style="text-align: left;padding-left:20px;cursor: pointer;" @click="download(item.resId)">{{item.resName}}</div> -->
              </td>
            </tr>
            <tr>
              <td class="th-title th-style" style="padding:20px 0px; text-align: center;">审批意见</td>
              <td colspan="5" class="tb-textarea" style="position: relative; height: 96px; border-bottom:1px #ccc solid">
                <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="意见描述" v-model="approvalOpinion" style="position: absolute; top:0px;" >
                </el-input>
              </td>
            </tr>
          </table>
        </div>
    </div>
    <div class="button-last">
      <el-button type="primary" @click="approval">审批通过</el-button>
      <el-button type="primary" @click="approvalReject">数据退回</el-button>
      <el-button type="primary" @click="doPrint">打印</el-button>
      <el-button type="primary" @click="returnList">返回</el-button>
    </div>
  </div>
</template>
<script>
  import {getWookSheet, approvalBtn, approvalReject,filesDetail} from  'api/supervision/index'
  import {worksheetUrl} from 'api/index'
  import { Message } from 'element-ui'
  export default {
    data() {
      return {
          url: worksheetUrl + '/common/res/fileUpload',      //文件上传地址
  		fileUrls:[],
  		fileListhadlingResultsList:[],
          hadlingResults:'',
        newFileIds: [],
        fileIds: [],
        id:"file",
        input:'',
        input1:'',
        input2:'',
        input3:'',
        value2:'',
        textarea3:'',
        value3:'',
        wsNum:'',
        eventType:'',
        fileName:'',
        hadlingStatus:'',
        takeDepartment:'',
        doDepartment:'',
        endDate:'',
        title:'',
        reportTime:'',
        status:'',
        secretRank:'',
        processStatus:'',
        approvalOpinion:'',
        options2: [{
          value: '3',
          label: '逾期办理',
        }, {
          value: '2',
          label: '按期办理',
        }, {
          value: '1',
          label: '已办结'
        }, {
          value: '0',
          label: '未办结',
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
        // this.hadlingResults=response.data.hadlingResult
        this.hadlingStatus=response.data.hadlingStatus
        this.fileUrl=response.data.fileUrl
        this.secretRank=response.data.secretRank
        if(response.data.processStatus == '0'){
          this.processStatus = '2'
        }else{
          this.processStatus=response.data.processStatus
        }
        var data=new Date().toLocaleDateString()
        this.reportTime=data.replace(/[/]/g,'-')
        if (response.data.fileUrl != '') {
          filesDetail(response.data.fileUrl).then(res => {
            if (res.code == 1) {
              this.fileUrls = res.data
            }
          }).catch(err => {

          })
        }
        // const { hadlingResult } = response.data;
		// if (hadlingResult) {
		// 	this.filesDetails(hadlingResult,(info)=>{
		// 	  // this.hadlingResults=info;
		// 	  this.fileListhadlingResultsList=info.map(item=>{
		// 		return {
		// 		  name:item.resName,
		// 		  percentage:100,
		// 		  resId:item.resId,
		// 		}
		// 	  });
		// 	  console.log(this.hadlingResults)
		// 	});
		// }
      })
      this.value2=this.options2[0].value

    },
    methods:{
        filesDetails(ids,cb){
          filesDetail(ids).then((res)=>{
            if(res.data){
              cb(res.data);
            }
          });
        },
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
      print(){
        window.print()
      },
      returnList(){
        this.$router.push({name:'supervisorAudit'});  /* 点击返回跳转 */
      },
      approval(){
        let data={
          "wsId":this.$route.params.wsId,
          "processStatus":this.processStatus,
          "reportTime":this.reportTime,
          "hadlingStatus":this.hadlingStatus,
          "fileUrl":this.hadlingResults,
          "fileUser":this.fileUser,
          "approvalResult":"通过",
          "approvalOpinion": this.approvalOpinion
        }
        approvalBtn(data).then(response => {
          if(response.code !== -1){
            this.$message.success('审批成功');
            this.$router.push({name:'supervisorAudit'})
          }else{
            this.$message.error('审批异常')
          }
      })
  },
      approvalReject(){
        let data={
          "wsId":this.$route.params.wsId,
        }
        approvalReject(data).then(response => {
          if(response.code !== -1){
            this.$message.success('数据退回成功');
            this.$router.push({name:'supervisorAudit'})
          }else{
            this.$message.error('数据退回异常')
          }
        })
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
    width:100%;
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
    width:510px;
    margin: 20px auto;
  }
  .button-last button{
    margin-right: 20px;
  }
</style>
