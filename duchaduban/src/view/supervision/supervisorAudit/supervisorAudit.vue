<template>
  <div class="content-wrapper">
    <div class="content-title">
        <span class="title-info">督查督办管理</span>
    </div>
    <div class="tab-toolbar">
      <el-row>
      <div class="cbs-select">
       <span class="mar-l-40">督办编码</span>
        <el-input v-model="input1" placeholder="请输入内容" style="width:250px;"></el-input>
      </div>

      <div class="active-time">
        <span>登记时间</span>
        <el-date-picker v-model="input2" type="daterange" clearable value-format="yyyy-MM-dd" range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>
      </el-row>
      <el-row>
       <div class="cbs-select">
        <span class="mar-l-30">督查件类型</span>
        <el-select v-model="value2" placeholder="请选择" style="width:250px;">
          <el-option v-for="item in options2" :key="item.id" :label="item.dictValue" :value="item.id" :disabled="item.disabled"></el-option>
        </el-select>
      </div>
          <!-- <el-button type="primary" icon="el-icon-delete" class="mar-l-30" @click="resetInfo">清空</el-button> -->

      <div class="active-time">
        <span>限结时间</span>
        <el-date-picker v-model="input3" type="daterange" clearable value-format="yyyy-MM-dd" range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>
      </el-row>
       <div class="cbs-select">
        <span class="mar-l-40">承办单位</span>
        <el-select v-model="value3" placeholder="请选择" style="width:250px;">
          <el-option v-for="item in options3" :key="item" :label="item" :value="item" :disabled="item.disabled"></el-option>
        </el-select>
      </div>
       <div class="cbs-select">
        <span class="mar-l-40" style=margin-left:50px>办理状态</span>
        <el-select v-model="value1" placeholder="请选择" style="width:250px;">
          <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
        </el-select>
      </div>

      <el-button type="primary" icon="el-icon-search" class="mar-l-30 search-btn" @click="search">搜索</el-button>
      <el-button type="primary" icon="el-icon-delete" class="mar-l-30 search-btn" @click="clear">清空</el-button>
    </div>
    <div class="list">
      <el-button type="primary" icon="el-icon-message" class="search-btn send-btn" @click="send">发送局办</el-button>
      <el-table :data="tableData" class="table1" stripe="" style="width: 100%;margin-top:10px" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" label="选择"></el-table-column>
        <el-table-column type="index" :index="typeIndex" label="序号" width="80"></el-table-column>
        <el-table-column prop="wsNum" label="督办编码" width="150"></el-table-column>
         <el-table-column prop="eventType" label="督查件类型"></el-table-column>
         <el-table-column prop="title" label="事件标题"></el-table-column>
         <el-table-column prop="endDate" label="限结日期"></el-table-column>
         <el-table-column prop="processStatusName" label="办理状态"></el-table-column>
         <el-table-column prop="comeDate" label="上报日期"></el-table-column>
         <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button v-if="scope.row.approvalResult == ''" type="text"  size="small" @click="approval(scope.row.wsId)">
                <i class="icon iconfont icon-shenpi"></i>审批
              </el-button>
              <el-button type="text"  size="small" @click="detail(scope.row.wsId)">
                <i class="icon iconfont icon-chakan"></i>详情
              </el-button>
            </template>
          </el-table-column>
      </el-table>
      <!-- <el-pagination background="" layout="prev, pager, next"  @current-change="handleCurrentChange" :page-size="formPage.limit" :total="formPage.total">
      </el-pagination> -->
          <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="formPage.page"
          :page-size="formPage.limit"
          layout="total,prev, pager, next, jumper"
          :total="formPage.total">
        </el-pagination>
    </div>
  </div>
</template>
<script>
  import {wooksheetList, getDepartments, getSuperviseType, sendOffice, getAllTakeUnit} from  'api/supervision/index'
  import { Message } from 'element-ui'
  export default {
    data() {
      return {
        multipleSelection:'',
        input:'',
        input1:'',
        input2:'',
        input3:'',
        value1:'',
        value2:'',
        value3:'',
        showType: false,
        options1: [{
          value: '-1',
          label: '暂存',
        }, {
          value: '0',
          label: '待办'
        }, {
          value: '2',
          label: '按期办理',
        },{
          lalue: '3',
          label: '逾期办理'
        }, {
          value: '1',
          label: '已办结',
        }, {
          value: '4',
          label: '无法办结',
        }],
        options2: [],
        options3: [],
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
          "userId":1,
          "loginToken":1,
          "type":7,
          "pageNum":this.formPage.page,
          "pageSize":this.formPage.limit
        }
        wooksheetList(data).then(response => {
          this.tableData = response.data.list
          this.formPage.total = response.data.total
        })
      getAllTakeUnit().then(response => {
        this.options3=response.data
      })
      let data1 = {
        'userId' : 1,
        'loginToken' : '1',
        'parentId' : 804
      }
        getSuperviseType(data1).then(response => {
          this.options2=response.data
        })
      },
    methods:{
      handleCurrentChange(val) {
        let createDates;
        let endDates;
        if(this.input2 != ''){
          createDates = this.input2.join(',')
        }else{
          createDates = this.input2
        }
        if(this.input3 != ''){
          endDates = this.input3.join(',')
        }else{
          endDates = this.input3
        }
        this.formPage.page = val;
        let data = {
          "userId":1,
          "loginToken":1,
          "type":7,
          "wsNum":this.input1,
          "processStatus":this.value1,
          "takeUnit":this.value3,
          "eventType":this.value2,
          "createDates":createDates,
          'endDates':endDates,
          "pageNum":val,
          "pageSize":this.formPage.limit
        }
        wooksheetList(data).then(response => {
          this.tableData = response.data.list
        })
      },
      detail(id){
        this.$router.push({name:'supervisorAuditDetail',params:{wsId:id}});
      },
      approval(id){
        this.$router.push({name:'supervisorAuditApproval',params:{wsId:id}});
      },
      typeIndex(index) {
        return index + (this.formPage.page - 1) * this.formPage.limit + 1;
      },
       clear(){
        this.input1='';
        this.input2='';
        this.input3='';
        this.value1='';
        this.value2='';
        this.value3='';
      },
      search(){
        let createDates;
        let endDates;
        if(this.input2 != ''){
          createDates = this.input2.join(',')
        }else{
          createDates = this.input2
        }
        if(this.input3 != ''){
          endDates = this.input3.join(',')
        }else{
          endDates = this.input3
        }
         let data = {
          "userId":1,
          "loginToken":1,
          "type":7,
          "wsNum":this.input1,
          "processStatus":this.value1,
          "takeUnit":this.value3,
          "eventType":this.value2,
           "createDates":createDates,
           'endDates':endDates
        }
        wooksheetList(data).then(response => {
          this.tableData = response.data.list
          this.formPage.total = response.data.total
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = '';
        for(var i = 0; i< val.length; i++){
          if(i == '0'){
            this.multipleSelection += val[i].wsId;
          }else{
            this.multipleSelection += ','+val[i].wsId;
          }
        }
      },
      send(){
        if(this.multipleSelection == ''){
          this.$message.warning('请选择要发送的数据')
        }else{
          let data ={
            'wsIds':this.multipleSelection
          }
          sendOffice(data).then(response => {
            if(response.code !== -1) {
              this.$message.success('发送成功');
            }else{
              this.$message.error('发送异常')
            }
          })
        }
      }
    }

  }
</script>
<style type="text/css" scoped>
  .newBtn{
    margin-left:30px;
    margin-bottom: 15px;
  }
  .active-time{
    margin-left:50px;
    display: inline-block;
  }
  .active-time span{
    margin-right: 20px;
  }
  .mar-l-30{
    margin-right: 20px;
  }
  .list{
    padding-top:20px;
  }
  .cbs-select{
    display: inline-block;
    margin-bottom: 20px;
  }
  .mar-l-40{
    margin-left:45px;
    margin-right: 20px;
  }
  .add-btn{
    display: inline-block;
  }
  .add{
    padding:8px 15px;
    margin-left: 30px;
  }
  .tab-toolbar{
    display: inline-block;
    padding-top:20px;
  }
  .search-btn{
    margin-left: 25px;
    height:33px;
    width:90px;
    text-align:center;
    padding:0;
    margin-right:0;

  }
    .tab-toolbar .el-button{
    top:0 !important;
  }
</style>
