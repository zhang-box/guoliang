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
          <td style="border-bottom: 1px #ccc solid;">
            <el-select v-model="eventType" placeholder="请选择" style="width:100%; height: 40px; border-bottom: none;">
              <el-option v-for="item in options1" :key="item.id" :label="item.dictValue" :value="item.id" :disabled="item.disabled"></el-option>
            </el-select>
          </td>
          <th class="th-title th-style">文件密级</th>
          <td style="border-bottom: 1px #ccc solid;">
            <el-select v-model="secretRank" placeholder="请选择" style="width:100%; height: 40px; border-bottom: none;">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </td>
        </tr>
        <tr class="things-title">
          <td class="thing-title">标题</td>
          <td colspan="3" style="position: relative; height: 40px;">
            <input type="text" v-model="title" name="text" style="position: absolute;top: 0px; left:0px; text-indent: 20px; width:100%;" placeholder="请输入内容">
          </td>
        </tr>
        <tr>
          <td class="th-title">来文单位</td>
          <td><input type="text" v-model="comeUnit" name="text" style="padding-left: 20px;"></td>
          <td class="th-title th-style">来文编号</td>
          <td><input type="text" v-model="comeNum" name="text" style="padding-left: 20px;"></td>
        </tr>
        <tr>
          <td class="th-title">承办单位</td>
          <td><input type="text" v-model="takeUnit" name="text" style="padding-left: 20px;"></td>
          <td class="th-title th-style">会办单位</td>
          <td><input type="text" v-model="doUnit" name="text" style="padding-left: 20px;"></td>
        </tr>
        <tr>
          <td class="th-title">来文日期</td>
          <td style="border-bottom: 1px #ccc solid;">
            <el-date-picker v-model="comeDate" type="date" placeholder="选择日期时间" format="yyyy-MM-dd":picker-options="pickerOptions0"></el-date-picker>
          </td>
          <td class="th-title th-style">局内编号</td>
          <td><input type="text" v-model="offNum" name="text" style="padding-left: 20px;"></td>
        </tr>
        <tr>
          <td class="th-title">承办司局</td>
          <td style="border-bottom: 1px #ccc solid;width:320px;">
            <!--<el-cascader-->
            <!--:options="options3"-->
            <!--v-model="takeDepartment">-->
            <!--</el-cascader>-->
            <!--<el-select v-model="takeDepartment" placeholder="请选择" style="width:100%; min-height: 40px; border: none;" multiple>-->
            <el-popover
              placement="right"
              width="500"
              trigger="click"
              v-model="visible1">
              <el-tree show-checkbox accordion :data="options3" node-key="label" ref="tree1"></el-tree>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="clearCheckedKeys1">取消</el-button>
                <el-button type="primary" size="mini" @click="getCheckedKeys1">确定</el-button>
              </div>
              <el-button slot="reference" style="width:320px;text-align: left;border: none;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{takeDepartment}}</el-button>
            </el-popover>

            <!--<el-option v-for="item in options3" :key="item.classId" :label="item.classGovCname" :value="item.classGovCname" :disabled="item.disabled"></el-option>-->
            <!--</el-select>-->
          </td>
          <td class="th-title th-style">会办司局</td>
          <td style="border-bottom: 1px #ccc solid;width:320px;" >
            <el-popover
              placement="right"
              width="500"
              trigger="click"
              v-model="visible2">
              <el-tree show-checkbox accordion :data="options4" node-key="label" ref="tree2"></el-tree>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="clearCheckedKeys2">取消</el-button>
                <el-button type="primary" size="mini" @click="getCheckedKeys2">确定</el-button>
              </div>
              <el-button slot="reference" style="width:320px;text-align: left;border: none;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{doDepartment}}</el-button>
            </el-popover>
            <!--<el-cascader-->
            <!--:options="options4"-->
            <!--:show-all-levels="false"-->
            <!--style="width: 100%;"-->
            <!--&gt;</el-cascader>-->
            <!--<el-select v-model="doDepartment" placeholder="请选择" style="width:100%; min-height: 40px; border: none;" multiple>-->
            <!--<el-option v-for="item in options4" :key="item.classId" :label="item.classGovCname" :value="item.classGovCname" :disabled="item.disabled"></el-option>-->
            <!--</el-select>-->
          </td>
        </tr>
        <tr>
          <td class="th-title">限结日期</td>
          <td style="">
            <el-date-picker v-model="endDate" type="date" placeholder="选择日期时间" format="yyyy-MM-dd" :picker-options="pickerOptions1"></el-date-picker>
          </td>
          <td class="th-title th-style">限结预警日期</td>
          <td style="">
            <el-date-picker v-model="errendDate" type="date" placeholder="选择日期时间" format="yyyy-MM-dd" :picker-options="pickerOptions2"></el-date-picker>
          </td>
        </tr>
        <tr>
          <td class="th-title th-style" style="padding:20px 0px; text-align: center;">领导批示</td>
          <td colspan="3" class="tb-textarea" style="position: relative; height: 96px;">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="批示描述" v-model="leadIns" style="position: absolute; top:0px;">
            </el-input>
          </td>
        </tr>
        <tr>
          <td class="th-title th-style" style="padding:20px 0px; text-align: center;">办公室主任意见</td>
          <td colspan="3" class="tb-textarea" style="position: relative; height: 96px;">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="意见描述" v-model="opinion" style="position: absolute; top:0px;">
            </el-input>
          </td>
        </tr>
        <tr>
          <td class="th-title th-style" style="padding:20px 0px; text-align: center;">任务内容</td>
          <td colspan="3" class="tb-textarea" style="position: relative; height: 96px;">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="内容描述" v-model="tasks" style="position: absolute; top:0px;">
            </el-input>
          </td>
        </tr>
        <tr>
          <td class="th-title th-style" style="padding:20px 0px; text-align: center;">办理情况</td>
          <td colspan="3" class="tb-textarea" style="position: relative; height: 96px;">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="办理情况描述" v-model="hadlingStatus" style="position: absolute;top:0px;" disabled>
            </el-input>
          </td>
        </tr>
        <tr>
          <td class="th-title th-style" style="padding:20px 0px; text-align: center;">办结情况</td>
          <td colspan="3" class="tb-textarea" style="position: relative; height: 96px;">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="办结情况描述" v-model="textarea5" style="position: absolute;top:0px;" disabled>
            </el-input>
          </td>
        </tr>
        <tr>
          <td class="th-title th-style" style="padding:20px 0px; text-align: center;">附注</td>
          <td colspan="3" class="tb-textarea" style="position: relative; height: 96px;">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="进展描述" v-model="notes" style="position: absolute; top:0px;">
            </el-input>
          </td>
        </tr>
        <!--<tr>-->
        <!--<td class="th-title th-style">附件</td>-->
        <!--<td><input type="file" value="附件上传" :id="id" @change="getFile($event)"></td>-->
        <!--</tr>-->
        <tr>
          <td class="th-title th-style">附件</td>
          <td colspan="3">
            <el-upload class="upload-demo"
                       :action="url"
                       :on-success="handleSuccess"
                       :before-remove="beforeRemove"
                       :on-remove="handleRemove"
					   :file-list="fileListfileUrlList">
              <el-button size="small" type="primary">上传</el-button>
            </el-upload>
            <!-- <div v-else class="list-width" v-for="item in fileUrls" :key="item" style="text-align: left;padding-left:20px;cursor: pointer;">{{item.resName}}</div> -->
			<!-- <div v-if="showType" class="list-width">
			  <li v-for="item in fileUrls" :key="item.resId">
				<a target="_blank">{{item.resName}}</a>
				</li>
			</div>
			<el-upload v-else class="upload-demo" :action="url" :on-success="handleSuccess" :before-remove="beforeRemove"
			  :on-remove="handleRemove" :multiple="true" :file-list="fileListfileUrlList">
			  <el-button size="small" type="primary">上传</el-button>
			</el-upload> -->
          </td>
        </tr>
        <tr>
          <td class="th-title th-style" style="padding:20px 0px; text-align: center;">办理结果</td>
          <td colspan="3" class="tb-textarea" style="position: relative; height: 96px;">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="结果描述" v-model="hadlingResult" style="position: absolute; width:100%; top:0px;" disabled>
            </el-input>
          </td>
        </tr>
      </table>
    </div>
    <div class="button-last">
      <!--<el-button type="primary" @click="infoSave">暂存</el-button>-->
      <el-button type="primary" @click="infoSubmit">提交</el-button>
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
        fileUrls : [{
		  resName: '',
		  resId: ''
		}],
		fileListfileUrlList:[],
        visible1: false,
        visible2: false,
        pickerOptions0: {
          disabledDate: (time) => {
            return time.getTime() > Date.now() - 8.64e7;
          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            return time.getTime() < Date.parse(this.comeDate) - 8.64e7;
          }
        },
        pickerOptions2: {
          disabledDate: (time) => {
            return time.getTime() > Date.parse(this.endDate) - 8.64e7;
          }
        },
        url: worksheetUrl + '/common/res/fileUpload',      //文件上传地址
        eventTypeCode:"",
        doDepartmentName:"",
        takeDepartmentName:"",
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
        eventTypeName:"",
        fileUrl:"",
        // fileName:"",
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
         },{
           value: '秘密',
           label: '秘密',
         },{
           value: '机密',
           label: '机密',
         }, {
           value: '绝密',
           label: '绝密',
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
            this.approvalOpinion=response.data.approvalOpinion
            this.approvalResult=response.data.approvalResult
            this.color=response.data.color
            this.comeDate=response.data.comeDate
            this.comeNum=response.data.comeNum
            this.comeUnit=response.data.comeUnit
            this.completionStatus=response.data.completionStatus
            this.eventType=parseInt(response.data.eventType)
            this.eventTypeName=response.data.eventTypeName
            this.doDepartment=response.data.doDepartment
            this.doDepartmentName=response.data.doDepartmentName
            this.takeDepartment=response.data.takeDepartment
            this.takeDepartmentName=response.data.takeDepartmentName
            this.takeUnit=response.data.takeUnit
            this.doUnit=response.data.doUnit
            this.endDate=response.data.endDate
            this.errendDate=response.data.errendDate
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
            this.processStatus=response.data.processStatus
            this.reportId=response.data.reportId
            this.reportStatus=response.data.reportStatus
            this.reportTime=response.data.reportTime
            this.reportUser=response.data.reportUser
            this.secretRank=response.data.secretRank
            this.status=response.data.status
            this.tasks=response.data.tasks
            this.title=response.data.title
            this.wsId=response.data.wsId
            this.wsNum=response.data.wsNum
			const { fileUrl } = response.data;
          if (fileUrl) {
			  this.filesDetails(fileUrl,(info)=>{
				this.fileUrls=info;
				this.fileListfileUrlList=info.map(item=>{
				  return {
					name:item.resName,
					percentage:100,
					resId:item.resId,
				  }
				});
			  });
		  }
            // filesDetail(response.data.fileUrl).then(res=>{
            //   if (res.code == 1) {
            //     this.fileUrls = res.data
            //   }
            // }).catch(err=>{
			//
            // })
          // let data1 = {
          //   'ids' : this.takeDepartment
          // }
          // getDepartmentsName(data1).then(response => {
          //   this.takeDepartment = response.data.data
          // })
          // let data2 = {
          //   'ids' : this.doDepartment
          // }
          // getDepartmentsName(data2).then(response => {
          //   this.doDepartment = response.data.data
          // })
        }),
        // getWookSheetNum().then(response => {
        //   this.wookSheetNum=response.data;
        // });

          getDepartments().then(response => {
            this.options3 = response.data;
            this.options4 = response.data;
          })
      let data1 = {
        'userId' : 1,
        'loginToken' : '1',
        'parentId' : 804
      }
      getSuperviseType(data1).then(response => {
        this.options1 = response.data
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
      clearCheckedKeys1(){
        this.visible1 = false;
        this.takeDepartment = '';
      },
      clearCheckedKeys2(){
        this.visible2 = false;
        this.doDepartment = '';
      },
      getCheckedKeys1(){
        this.visible1 = false;
        this.takeDepartment = this.$refs.tree1.getCheckedKeys().toString();
      },
      getCheckedKeys2(){
        this.visible2 = false;
        this.doDepartment = this.$refs.tree2.getCheckedKeys().toString();
      },

	  beforeRemove(file, fileList) {
		return this.$confirm(`确定移除 ${ file.name }？`);
	  },
	  handleRemove(file, fileList) {
		const repla = this.fileUrl.indexOf(`,${file.resId}`) >= 0
		? `,${file.resId}`
		: this.fileUrl.indexOf(',') >= 0 ? `${file.resId},` : file.resId;
		this.fileUrl = this.fileUrl.replace(repla, '')
	  },
	  handleSuccess(response, file, fileList){
		file.resId = response.data[0].resId
		if (this.fileUrl) {
		  this.fileUrl += `,${response.data[0].resId}`
		} else {
		  this.fileUrl = response.data[0].resId + ''
		}
	  },
      // handleSuccess(response, file, fileList){
      //   debugger;
      //   this.fileUrl.push(response.data[0].resId);
      //   // this.fileName.push(response.data[0].resName);
      // },
      // handleRemove(file, fileList) {
      //   for(var i = 0; i < this.fileUrl.length; i++){
      //     if(this.fileUrl[i] == file.response.data[0].resId){
      //       this.fileUrl.splice(i, 1);
      //     }
      //   }
      // },
      // beforeRemove(file, fileList) {
      //   return this.$confirm(`确定移除 ${ file.name }？`);
      // },

      infoSubmit(){
       let data={
           "dataStatus":0,
           "processStatus":"0",
           "userId":1,
           "loginToken":1,
           "wsId":this.$route.params.wsId,
           "wsNum":this.wookSheetNum,
           "secretRank":this.secretRank,
           "title":this.title,
           "comeUnit":this.comeUnit,
           "userName":this.userName,
           "comeNum":this.comeNum,
           "takeUnit":this.takeUnit,
           "doUnit":this.doUnit,
           "comeDate":this.comeDate,
           "offNum":this.offNum,
           "takeDepartment":this.takeDepartment,
           "doDepartment":this.doDepartment,
           "endDate":this.endDate,
           "errendDate":this.errendDate,
           "leadIns":this.leadIns,
           "opinion":this.opinion,
           "tasks":this.tasks,
           "hadlingStatus":this.hadlingStatus,
           "completionStatus":this.completionStatus,
           "notes":this.notes,
           "hadlingResult":this.hadlingResult,
           "fileUrl":this.fileUrl,
           // "fileName":this.fileName,
           "eventType":this.eventType,
       }
       wooksheetUpdate(data).then(response => {
         if(response.code !== -1){
           this.$message.success('提交成功');
           this.$router.push({name:'supervisoryManage'})
         }else{
           this.$message.error('提交异常')
         }
       })
      },
      handleTakeDepartment(){
          let data={
              code: this.takeDepartment
          }
          getDepartmentsBycode(data).then(response => {
            this.options4=response.data
          })
        this.takeDepartment=this.takeDepartmentName
      },
      handleDoDepartment(){
        let data={
          code: this.doDepartment
        }
        getDepartmentsBycode(data).then(response => {
          this.options3=response.data
        })
        this.doDepartment=this.doDepartmentName
      },
      handleEventType(){
        this.eventType=this.eventTypeName
      },
       infoSave(){
         let data1={
           "dataStatus ":"-1",
           "processStatus":"5",
           "userName":this.userName,
           "wsNum":this.wookSheetNum,
           "secretRank":this.secretRank,
           "title":this.title,
           "comeUnit":this.comeUnit,
           "comeNum":this.comeNum,
           "takeUnit":this.takeUnit,
           "doUnit":this.doUnit,
           "comeDate":this.comeDate,
           "offNum":this.offNum,
           "takeDepartment":this.takeDepartment,
           "doDepartment":this.doDepartment,
           "endDate":this.endDate,
           "errendDate":this.errendDate,
           "leadIns":this.leadIns,
           "opinion":this.opinion,
           "tasks":this.tasks,
           "hadlingStatus":this.hadlingStatus,
           "completionStatus":this.completionStatus,
           "notes":this.notes,
           "hadlingResult":this.hadlingResult,
           "fileUrl":this.fileUrl,
           // "fileName":this.fileName,
           "eventType":this.eventType,
         }
         wooksheetUpdate(data1).then(response => {
           if(response.code !== -1){
             this.$message.success('保存成功');
             this.$router.push({name:'supervisoryManage'})
           }else{
             this.$message.error('保存异常')
           }
         })
      },
      returnList(){
        this.$router.push({name:'supervisoryManage'});  /* 点击返回跳转 */
      },
      download(id){
        window.location.href = worksheetUrl + 'common/res/fileDownload?resId=' + id
      }
    }
  }
</script>
<style type="text/css" scoped>
  .el-date-editor.el-input, .el-date-editor.el-input__inner{width: 100% !important;}
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
