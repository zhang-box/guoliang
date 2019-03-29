<template>
  <div class="content-wrapper">
    <div class="content-title">
      <el-button class="title-button" size="mini" @click="returnList"><i class="el-icon-arrow-left"></i> 返回</el-button>
      <span class="title-info">发起投票</span>
    </div>
    <div class="content-main">
    <el-row :gutter="20" style="margin-top:20px;">
        <el-col :span="12">
            <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign" border class="formBorder" ref="voteFrom">
              <el-form-item label="投票标准：">
                <!--<el-select v-if="addType" v-model="formLabelAlign.workflow">-->
                <el-select v-if="addType" v-model="formLabelAlign.name" @change="voteInfo(formLabelAlign.name)">
                  <el-option v-for="item in optionsName" :key="item.projNumber" :label="item.name" :value="item.name"></el-option>
                </el-select>
                <div v-else class="list-width">{{formLabelAlign.workflow}}</div>
              </el-form-item>
                <el-form-item label="标题：">
                    <el-input v-model="formLabelAlign.title"></el-input>
                </el-form-item>
                <el-form-item label="描述：">
                    <el-input  type="textarea"  :autosize="{ minRows: 2, maxRows: 4}"  placeholder="请输入内容"  v-model="formLabelAlign.description"></el-input>
                </el-form-item>
                <el-form-item label="截止日期：">
                    <!-- <el-input v-model="formLabelAlign.type"></el-input> -->
                  <el-date-picker
                    v-model="formLabelAlign.startTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions0">
                  </el-date-picker>
                    <el-date-picker
                      v-model="formLabelAlign.endTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="项目编号：">
                    <!--<el-input v-if="addType" v-model="formLabelAlign.projectNumber"></el-input>-->
                    <div class="list-width">{{formLabelAlign.projectNumber}}</div>
                </el-form-item>
                <el-form-item label="项目名称：">
                    <!--<el-input  v-if="addType" v-model="formLabelAlign.projectName"></el-input>-->
                    <div class="list-width">{{formLabelAlign.projectName}}</div>
                </el-form-item>
                <el-form-item label="投票方式：">
                    <el-row :gutter="20">
                        <el-col :span="10">
                            <el-select v-model="formLabelAlign.isAnonymous" placeholder="是否记名">
                                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                    <el-col :span="10">
                            <el-select v-model="formLabelAlign.isAllowModify" placeholder="是否允许修改">
                                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:10px;margin-left:-5px;" :gutter="30">
                        <el-col :span="10">
                            <el-select v-model="formLabelAlign.isOpenResult" placeholder="是否公开结果">
                                <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="10">
                        <el-radio v-model="radio" label="1" @change="getDate">立即开始</el-radio>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <!--<div class="ViteTitle" style="margin-top:20px;">投票选项</div>-->
            <!--<el-radio-group v-model="voteOptions" style="margin:20px 0 0 40px;">-->
                <!--<el-radio label="1">赞成</el-radio>-->
                <!--<el-radio label="2">不赞成</el-radio>-->
                <!--<el-radio label="3">放弃</el-radio>-->
            <!--</el-radio-group>-->
        </el-col>
        <el-col :span="12">
             <div class="ViteTitle">选择参与人</div>
                <el-form ref="form" :model="form" label-width="100px">
                      <el-form-item label="通知方式：">
                        <el-checkbox-group v-model="informArr">
                          <el-checkbox label="1" name="type">邮件</el-checkbox>
                          <!--<el-checkbox v-if="msgType" label="2" name="type">短信</el-checkbox>-->
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
                <div style="max-height: 289px; overflow-y: auto;">
                  <el-table ref="multipleTable" :data="tableData" row-style="height:50px;" style="width: 90%" border class="table1" @selection-change="handleSelectionChange">
                      <el-table-column  type="selection"  width="40"></el-table-column>
                      <el-table-column  type="index" :index="typeIndex" label="序号" width="60"> </el-table-column>
                      <el-table-column  prop="name" label="人员" width="120"></el-table-column>
                      <el-table-column  prop="phone" label="联系方式"></el-table-column>
                      <el-table-column  prop="idCard" label="身份证号" width="200"></el-table-column>
                  </el-table>
                </div>
                <div class="center">
                  <el-button v-if="this.addType" type="primary" @click="submitVote" :disabled="disabledType">提交投票</el-button>
                  <el-button v-else-if="this.updateType" type="primary" @click="updateVote" :disabled="disabledType">提交投票</el-button>
                  <el-button v-else type="primary" @click="addNewVote" :disabled="disabledType">提交投票</el-button>
                </div>

        </el-col>
    </el-row>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {voteUrl} from 'api/index'
  import {voteInsert, voteDetailById, getVoteProj, expertLists,getMemberByproId} from 'api/standardAppliList/voteManage/vote_zj'
  export default {
    data() {
      return {
        startTime: '请选择开始时间',
        endTime : '请选择结束日期',
        informType : '',
        pickerOptions0: {
          disabledDate: (time) => {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            return time.getTime() < Date.parse(this.formLabelAlign.startTime) - 8.64e7;
          }
        },
        disabledType : false,
        msgType : true,
        addType : true,
        addNewType : false,
        updateType : false,
        labelPosition:'right',
        projectIds: '',
        multipleTable : [],
        //*************************************提交投票信息 */
         formLabelAlign: {
           description: '',
           endTime: '',
           informType: '',
           isAllowModify: '',
           isAnonymous: '',
           isOpenResult: '',
           parties: [],
           projectId: '',
           projectName: '',
           projectNumber: '',
           startTime: '',
           times: '',
           title: '',
           userId: 1,
           // workflow: '',
           name : '',
      },

        voteOptions:null,//投票选项
        informArr:[],//通知方式数组
        informType:null,//通知方式

        // *************************************************************
        textarea3:null,
        radio:'',
        value:null,
        resource:null,
        optionsName :[],   //标准
        form:{
            type:[]
        },
        options1: [{
          value: '1',
          label: '记名'
        }, {
          value: '2',
          label: '不记名'
        }],
        options2: [{
          value: '1',
          label: '允许'
        }, {
          value: '2',
          label: '不允许'
        }],
        options3: [{
          value: '1',
          label: '公开'
        }, {
          value: '2',
          label: '不公开'
        }],
        tableData: [],
        formPage: {
          page: 1,
          limit: 10,
          total: undefined,
        },
        userInfo:{
          userId: -1,
          loginToken: -1,
          realName: -1,
          sysgovname: -1,
        },   //登录人信息
      };
    },
    created(){
      const user = JSON.parse(window.sessionStorage.getItem('userInfo'));
      if(user){
        this.userInfo = user;
      }
      if(this.$route.query.type == 'add'){
        this.msgType = true;
        this.addType = true;
        this.updateType = false;
        this.addNewType = false;
      }else if(this.$route.query.type == 'update'){
        this.msgType = true;
        this.addType = false;
        this.updateType = true;
        this.addNewType = false;
        let data = {
         'voteId' : this.$route.query.id
        };
        voteDetailById(data).then(response => {
          this.formLabelAlign = response.data.vote;
          this.formLabelAlign.parties = response.data.votePart;
          if(response.data.vote.informType == '3'){
            this.informArr = ['1','2']
          }else{
            this.informArr.push(this.formLabelAlign.informType)
          }
          this.votePartiesInfo();
        })
      }else if(this.$route.query.type == 'addNew'){
        this.msgType = false;
        this.addType = false;
        this.updateType = false;
        this.addNewType = true;
        if(this.$route.query.row){
          for(var i = 0; i< this.$route.query.row.length; i++){
            if(i == '0'){
              this.formLabelAlign.projectName += this.$route.query.row[i].proCname;
              this.formLabelAlign.projectNumber += this.$route.query.row[i].projNumber;
              this.projectIds += this.$route.query.row[i].projId;
            }else{
              this.formLabelAlign.projectName += ',' + this.$route.query.row[i].proCname;
              this.formLabelAlign.projectNumber += ',' + this.$route.query.row[i].projNumber;
              this.projectIds +=  ',' + this.$route.query.row[i].projId;
            }
          }
        }
      }
      if(this.$route.query.standardType){
        this.formLabelAlign.workflow = this.$route.query.standardType;

      }else{
        this.formLabelAlign.workflow = this.userInfo.userType;
      }
      // if(this.formLabelAlign.workflow != 'TC' && this.formLabelAlign.workflow != 'SC'){
      //   this.formLabelAlign.workflow = 'ALL'
      // }
      // let data1 = {
      //   'workflow' : this.formLabelAlign.workflow
      // };
      let data1 = 'ALL';
      getVoteProj(data1).then(response => {
        this.optionsName = response.data
      });
      this.partiesForm();
    },
    methods: {
      partiesForm(){
        let data = {
          "userId": this.userInfo.userId,
          "loginToken": this.userInfo.loginToken,
          "scTc": this.formLabelAlign.workflow,
      }
        expertLists(data).then(response => {
          this.tableData = response.data;
        })
      },
      //默认选中人员
      votePartiesInfo(){
        let rows = [];
        for(var i = 0;i < this.tableData.length;i++){
          for(var j = 0;j < this.formLabelAlign.parties.length;j++){
            if(this.tableData[i].userId == this.formLabelAlign.parties[j].userId){
              rows.push(this.tableData[i]);
            }
          }
        }
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      },
      voteInfo(val){
          let obj = this.optionsName.find((item)=>{
              return item.name === val;
          });
        getMemberByproId(obj.projId).then(response=>{
             this.formLabelAlign.projectNumber = obj.projNumber;
             this.formLabelAlign.projectName = val;
             this.projectIds = obj.projId;
             this.tableData = response.data;
        })

      },
      returnList(){
        if(this.$route.query.standardType == 'TC'){
          this.$router.push({name: 'TCReviewList'});
        }else if(this.$route.query.standardType == 'SC'){
          this.$router.push({name: 'SCReviewList'});
        }else{
          this.$router.push({name: 'initiateVote'});
        }
      },
      //立即开始
      getDate(val){
        if(val == '1'){
          let date = this.getNowFormatDate();
          this.formLabelAlign.startTime = date
        }
      },
      getNowFormatDate() {
        let date = new Date();
        let seperator1 = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        let currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
      },
      //人员选中
      handleSelectionChange(val) {
        this.formLabelAlign.parties = [];
        for(var i = 0; i < val.length; i++){
          let data = {
            userName : val[i].name,
            userId : val[i].userId
          };
          this.formLabelAlign.parties.push(data)
        }
      },
      //提交投票
      submit(url, data){
        if(this.formLabelAlign.title == '' || this.formLabelAlign.description == '' || this.formLabelAlign.endTime == '' || this.formLabelAlign.startTime == '' || this.formLabelAlign.projectNumber == '' || this.formLabelAlign.projectName == '' || this.formLabelAlign.isOpenResult == '' || this.formLabelAlign.isAnonymous == '' || this.formLabelAlign.isAllowModify == ''){
          this.$message.warning('请填写完整信息');
          this.disabledType = false;
          return;
        }else if(this.informArr.length == '0'){
          this.$message.warning('请选择通知方式');
          this.disabledType = false;
          return;
        }else if(this.formLabelAlign.parties.length == '0'){
          this.$message.warning('请选择需通知的人');
          this.disabledType = false;
          return;
        }else{
          if(this.informArr.length == '2'){
            data.informType = '3';
          }else if(this.informArr.length == '1'){
            data.informType = this.informArr[0];
          }
          axios({
            url: url,
            method: 'post',
            data: data,
            headers:{
              'Content-Type':'application/json;'
            }
          }).then(res=>{
            if (res.data.code != 1) {
              this.$message.error(res.data.msg);
              this.disabledType = false;
            }else{
              this.$message.success('创建投票成功！');
              if(!this.$route.query.standardType){
                this.$router.push({name: 'initiateVote'})
              }else{
                this.$router.push({
                  name: this.$route.query.standardType + 'ReviewList'
                })
              }

            }
          }).catch(err=>{

          })
        };
      },
      submitVote(){
        this.disabledType = true;
        let data = {
          'description': this.formLabelAlign.description,
          'endTime': this.formLabelAlign.endTime,
          'informType': this.formLabelAlign.informType,
          'isAllowModify': this.formLabelAlign.isAllowModify,
          'isAnonymous': this.formLabelAlign.isAnonymous,
          'isOpenResult': this.formLabelAlign.isOpenResult,
          'parties': this.formLabelAlign.parties,
          'projectIds': this.projectIds,
          'startTime': this.formLabelAlign.startTime,
          'times': this.formLabelAlign.times,
          'title': this.formLabelAlign.title,
          'userId': this.userInfo.userId,
          'workflow': this.formLabelAlign.workflow,
          'loginName' : this.userInfo.realName,
        };
        this.submit(voteUrl + 'vote/createMul', data);
      },
      updateVote(){
        this.disabledType = true;
        let data = {
          'description': this.formLabelAlign.description,
          'endTime': this.formLabelAlign.endTime,
          'id' : this.$route.query.id,
          'informType': this.formLabelAlign.informType,
          'isAllowModify': this.formLabelAlign.isAllowModify,
          'isAnonymous': this.formLabelAlign.isAnonymous,
          'isOpenResult': this.formLabelAlign.isOpenResult,
          'parties': this.formLabelAlign.parties,
          'projectId': this.formLabelAlign.projectId,
          'startTime': this.formLabelAlign.startTime,
          'times': this.formLabelAlign.times,
          'title': this.formLabelAlign.title,
          'userId': this.userInfo.userId,
          'workflow': this.formLabelAlign.workflow,
          'loginName' : this.userInfo.realName,
        };
        this.submit(voteUrl + 'vote/update', data);
      },
      addNewVote(){
        this.disabledType = true;
        let data = {
          'description': this.formLabelAlign.description,
          'endTime': this.formLabelAlign.endTime,
          'informType': this.formLabelAlign.informType,
          'isAllowModify': this.formLabelAlign.isAllowModify,
          'isAnonymous': this.formLabelAlign.isAnonymous,
          'isOpenResult': this.formLabelAlign.isOpenResult,
          'parties': this.formLabelAlign.parties,
          'projectIds': this.projectIds,
          'startTime': this.formLabelAlign.startTime,
          'times': this.formLabelAlign.times,
          'title': this.formLabelAlign.title,
          'userId': this.userInfo.userId,
          'workflow': this.formLabelAlign.workflow,
          'loginName' : this.userInfo.realName,
        };
        this.submit(voteUrl + 'vote/createMul', data);
      },
      typeIndex(index) {
        return index + (this.formPage.page - 1) * this.formPage.limit + 1;
      },
    }
  }
</script>

<style scoped>
  .tab-toolbar {
    margin: 25px 0;
  }
  .content-table{
    padding-top: 20px;
    border-top: 1px solid #dcdfe6 ;
  }
  .list-width {
    width: 100%;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .input-width {
    width: 217px;
  }
  .ViteTitle{
      height: 40px;
      line-height: 40px;
      background-color: #ebeef5;
      padding-left: 10px;
      color:#000;
      font-weight: 700;
  }
  .formBorder{
      border: 6px double #eee !important;
      padding:10px;
  }
 .center{
      text-align: center;
      margin-top: 20px;
  }
</style>
