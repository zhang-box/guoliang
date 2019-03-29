<template>
  <div class="content-wrapper">
    <div class="content-title">
        <span class="title-info">督查督办管理</span>
    </div>
    <div class="tab-toolbar">
      <el-row>
      <div class="cbs-select">
        <span class="mar-l-30">事件编号</span>
         <el-input v-model="input1" placeholder="请输入内容" style="width:250px;"></el-input>
      </div>
      <div class="cbs-select">
        <span class="mar-l-40">办理状态</span>
        <el-select v-model="value3" placeholder="请选择" style="width:250px;">
          <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
        </el-select>
      </div>
      </el-row>
      <el-row>
       <div class="cbs-select" style="margin-left:-14px;">
        <span class="mar-l-30">督查件类型</span>
        <el-select v-model="value1" placeholder="请选择" style="width:250px;">
          <el-option v-for="item in options1" :key="item.id" :label="item.dictValue" :value="item.id" :disabled="item.disabled"></el-option>
        </el-select>
      </div>
      <div class="cbs-select">
        <span class="mar-l-40">上报日期</span>
        <el-date-picker v-model="input2" type="daterange" clearable value-format="yyyy-MM-dd" range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>
      </el-row>
      <el-row>
      <div class="cbs-select">
        <span class="mar-l-30">限结日期</span>
        <el-date-picker v-model="input3" type="daterange" clearable value-format="yyyy-MM-dd" range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <el-button type="primary" icon="el-icon-search" @click="search" class="search-btn">搜索</el-button>
      <el-button type="primary" icon="el-icon-delete" @click="clear" class="search-btn">清空</el-button>
      <el-button type="primary" icon="el-icon-upload" class="search-btn" @click="exportData">导出</el-button>
      </el-row>
    </div>
    <div class="list">
      <el-table :data="tableData" class="table1" stripe="" style="width: 100%">
         <el-table-column type="index" :index="typeIndex" label="序号" width="80"></el-table-column>
         <el-table-column prop="wsNum" label="事件编号" width="150"></el-table-column>
         <el-table-column prop="title" label="事件标题" width="240"></el-table-column>
         <el-table-column prop="doDepartment" label="会办司局"></el-table-column>
         <el-table-column prop="endDate" label="限结日期"></el-table-column>
         <el-table-column prop="processStatusName" label="办理状态"></el-table-column>
         <el-table-column prop="endDate" label="上报日期"></el-table-column>
         <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text"  size="small" @click="updata(scope.row.wsId)">
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
  import {wooksheetList, getSuperviseType, exportData} from  'api/supervision/index'
  import { Message } from 'element-ui'
  import {worksheetUrl} from 'api/index'
  export default {
    data() {
      return {
        input:'',
        input1:'',
        input2:'',
        input3:'',
        value1:'',
        value3:'',
        showType: false,
        options3: [{
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
        options1: [],
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
          "type":4,
          "pageNum":this.formPage.page,
          "pageSize":this.formPage.limit
        }
        wooksheetList(data).then(response => {
          this.tableData = response.data.list
          this.formPage.total = response.data.total
        })
       let data1 = {
         'userId' : 1,
         'loginToken' : '1',
         'parentId' : 804
       }
       getSuperviseType(data1).then(response => {
         this.options1=response.data
       })
      },
    methods:{
      handleCurrentChange(val) {
        let reportTimes;
        let endDates;
        if(this.input2 != ''){
          reportTimes = this.input2.join(',')
        }else{
          reportTimes = this.input2
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
          "type":4,
          "wsNum":this.input1,
          "eventType":this.value1,
          "processStatus":this.value3,
          "endDates":endDates,
          "reportTimes":reportTimes,
          "pageNum":val,
          "pageSize":this.formPage.limit
        }
        wooksheetList(data).then(response => {
          this.tableData = response.data.list
        })
      },
      exportData(){
        let data = {
          "userId":1,
          "loginToken":1,
          "exportType":6,
          "type":4,
        }
        exportData(data).then(response => {
          window.location.href = worksheetUrl + response.data
        })
      },
      updata(id){
        this.$router.push({name:'progressSummaryDetail',params:{wsId:id}});

      },
      typeIndex(index) {
        return index + (this.formPage.page - 1) * this.formPage.limit + 1;
      },
      clear(){
        this.input1='';
        this.input2='';
        this.input3='';
        this.value1='';
        this.value3='';
      },
      search(){
        let reportTimes;
        let endDates;
        if(this.input2 != ''){
          reportTimes = this.input2.join(',')
        }else{
          reportTimes = this.input2
        }
        if(this.input3 != ''){
          endDates = this.input3.join(',')
        }else{
          endDates = this.input3
        }
         let data = {
          "userId":1,
          "loginToken":1,
          "type":4,
          "wsNum":this.input1,
          "eventType":this.value1,
          "processStatus":this.value3,
           "endDates":endDates,
           "reportTimes":reportTimes,
        }
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
    margin-right: 58px;
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
    margin-left: 40px;
    height: 33px;
    width: 100px;
    text-align: center;
  }
    .tab-toolbar .el-button{
    top:0 !important;
  }
</style>
