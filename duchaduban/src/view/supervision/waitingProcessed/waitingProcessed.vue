<template>
  <div class="content-wrapper">
    <div class="content-title">
        <span class="title-info">待办已办管理</span>
    </div>
    <div class="tab-toolbar">
      <el-row>
      <div class="cbs-select cbs-selects">
        <span class="mar-l-30">事件编号</span>
        <el-input v-model="input1" placeholder="请输入内容" style="width:250px;"></el-input>
      </div>
      <div class="cbs-select">
        <span class="mar-l-40">承办单位</span>
        <el-select v-model="value1" placeholder="请选择" style="width:250px;">
          <el-option v-for="item in options1" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      </el-row>
      <el-row>
      <div class="cbs-select cbs-selects">
        <span class="mar-l-30" style="margin-left:16px;">督查件类型</span>
        <el-select v-model="value2" placeholder="请选择" style="width:250px;">
          <el-option v-for="item in options2" :key="item.id" :label="item.dictValue" :value="item.id" :disabled="item.disabled"></el-option>
        </el-select>
      </div>
        <div class="cbs-select">
          <span class="mar-l-30 mar-l-30s">限结日期</span>
          <el-date-picker v-model="value3" type="daterange" clearable value-format="yyyy-MM-dd" range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-row>
      <div class="cbs-select">
        <span style="margin-left: 35px; margin-right:15px;">事件标题</span>
        <el-input v-model="input2" placeholder="请输入内容" style="width:350px;"></el-input>
      </div>
      <el-button type="primary" icon="el-icon-search" @click="search" class="search-btn">搜索</el-button>
      <el-button type="primary" icon="el-icon-delete" @click="clear" class="search-btn">清空</el-button>
    </div>
    <div class="list">
      <el-table :data="tableData" class="table1" style="width: 100%" :row-class-name="tableRowClassName" :cell-class-name="tableCellClassName">
         <el-table-column type="index" :index="typeIndex" label="序号" width="80"></el-table-column>
         <el-table-column prop="wsNum" label="事件编号" width="150"></el-table-column>
         <el-table-column prop="eventType" label="督查件类型"></el-table-column>
         <el-table-column prop="title" label="事件标题" width="240"></el-table-column>
         <el-table-column prop="takeUnit" label="承办单位" width="100"></el-table-column>
         <el-table-column prop="dataStatus" label="事件状态"></el-table-column>
         <el-table-column prop="processStatusName" label="办理状态"></el-table-column>
         <el-table-column prop="endDate" label="限结日期"></el-table-column>
         <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button prop="wsId" type="text" size="small" @click="WPdetail(scope.row.wsId)" v-show="scope.row.processPower"><i class="icon iconfont icon-bianji"></i>办理
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
  import {wooksheetList, getDepartments, getSuperviseType, getAllTakeUnit} from 'api/supervision/index'
  import { Message } from 'element-ui'
  export default {
    data() {
      return {
        input1:'',
        input2:'',
        value1:'',
        value2:'',
        value3:'',
        wsId:'',
        options1: [],
        options2: [],
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
          "type":10,
          "pageNum":this.formPage.page,
          "pageSize":this.formPage.limit
        }
        wooksheetList(data).then(response => {
         this.tableData = response.data.list
         this.formPage.total = response.data.total
        })
       getAllTakeUnit().then(response => {
         this.options1=response.data
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
      tableRowClassName({row, rowIndex}) {
        if (row.color == "yellow") {
          return 'warning-row';
        } else if (row.color == "red") {
          return 'success-row';
        }
        return '';
      },
      tableCellClassName({row, column, rowIndex, columnIndex}) {
        if (row.isReminder === 1 && columnIndex === 0) {
          return 'waring-icon-style';
        }
        return '';
      },
      handleCurrentChange(val) {
        let endDates;
        if(this.value3 != ''){
          endDates = this.input3.join(',')
        }else{
          endDates = this.value3
        }
        this.formPage.page = val;
        let data = {
          "userId":1,
          "loginToken":1,
          "type":10,
          "wsNum": this.input1,
          "takeUnit": this.value1,
          "eventType": this.value2,
          "endDates": endDates,
          "title": this.input2,
          "pageNum":val,
          "pageSize":this.formPage.limit
        }
        wooksheetList(data).then(response => {
          this.tableData = response.data.list
        })
      },
      WPdetail(id){
        this.$router.push({name:'waitingProcessedDetail',params:{wsId:id}});  /* 点击办理跳转 */
      },
      typeIndex(index) {
        return index + (this.formPage.page - 1) * this.formPage.limit + 1;
      },
      clear(){
         this.value1='';
         this.value2='';
         this.value3='';
         this.value4='';
         this.input='';
         this.input1='';
         this.input2='';
      },
      search(){
        let endDates;
        if(this.value3 != ''){
          endDates = this.input3.join(',')
        }else{
          endDates = this.value3
        }
        let data={
          "userId":1,
          "loginToken":1,
          "type":10,
          "wsNum": this.input1,
          "takeUnit": this.value1,
          "eventType": this.value2,
          "endDates": endDates,
          "title": this.input2
        };
         wooksheetList(data).then(response => {
          this.tableData = response.data.list
          this.formPage.total = response.data.total
        })
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
  .mar-l-30s{
    margin-right: 20px;
    margin-left: 0;
  }
  .list{
    padding-top:20px;
  }
  .cbs-select{
    display: inline-block;
    margin-bottom: 20px;
  }
  .mar-l-40{
    /* margin-left:150px; */
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
    display: inline-block;
    text-align: center;
    margin-left: 50px;
    width: 100px;
    height: 33px;
  }
  .tab-toolbar .el-button{
    top:0 !important;
  }
  .tab-toolbar .cbs-selects{
    margin-right: 150px;
  }
</style>
