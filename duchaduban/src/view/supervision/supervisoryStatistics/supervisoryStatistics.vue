<template>
  <div class="content-wrapper">
    <div class="content-title">
        <span class="title-info">督查督办管理</span>
    </div>
    <div class="tab-toolbar">
      <!--<div class="add-btn">-->
      <!--</div>-->
      <el-row>
        <div class="cbs-select">
          <span class="mar-l-30">承办司局</span>
          <el-popover
            placement="right"
            width="500"
            trigger="click"
            v-model="visible">
            <el-tree show-checkbox accordion :data="options2" node-key="label" ref="tree"></el-tree>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="clearCheckedKeys">取消</el-button>
              <el-button type="primary" size="mini" @click="getCheckedKeys">确定</el-button>
            </div>
            <el-button slot="reference" style="width:250px;height:33px;text-align: left;border: 1px solid #dcdfe6;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{takeDepartment}}</el-button>
          </el-popover>
          <!--<el-select v-model="value2" placeholder="请选择" style="width:250px;">-->
            <!--<el-option v-for="item in options2" :key="item.classId" :label="item.classGovCname" :value="item.classGovCname" :disabled="item.disabled"></el-option>-->
          <!--</el-select>-->
        </div>
        <div class="active-time">
          <span>统计时间</span>
          <el-date-picker v-model="input2" type="daterange" clearable value-format="yyyy-MM-dd" range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="cbs-select">
          <span class="mar-l-30" style="margin-left:35px;">事件类型</span>
          <el-select v-model="value3" placeholder="请选择" style="width:250px;">
            <el-option v-for="item in options3"  :key="item.id" :label="item.dictValue" :value="item.id" :disabled="item.disabled"></el-option>
          </el-select>
        </div>
        <el-button type="primary" icon="el-icon-search" @click="search" class="mar-l-30 search-btn" style="margin-left: 20px;">搜索</el-button>
        <el-button type="primary" icon="el-icon-delete" @click="clear" class="mar-l-30 search-btn">清空</el-button>
         <el-button type="primary" icon="el-icon-upload" class="mar-l-30 search-btn" @click="exportData">导出</el-button>
      </el-row>
    </div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="事件类型" name="first">
        <div class="list">
          <el-table :data="tableData" class="table1" stripe="" style="width: 100%">

             <el-table-column type="index" :index="typeIndex" label="序号" width="80"></el-table-column>
             <el-table-column prop="eventType" label="事件类型" width="200"></el-table-column>
             <el-table-column prop="unsubmitted" label="暂存">
               <template slot-scope="scope">
                 <el-button type="text" v-if="scope.row.unsubmitted != '0'"style="color:#333;" size="small" @click="detailInfo(scope.row.eventType,'暂存')">{{scope.row.unsubmitted}}</el-button>
                 <div v-else style="color:#333;">{{scope.row.unsubmitted}}</div>
               </template>
             </el-table-column>
             <el-table-column prop="needDeal" label="待办">
               <template slot-scope="scope">
                 <el-button type="text" v-if="scope.row.needDeal != '0'" style="color:#333;" size="small" @click="detailInfo(scope.row.eventType,'待办')">{{scope.row.needDeal}}</el-button>
                 <div v-else style="color:#333;">{{scope.row.needDeal}}</div>
               </template>
             </el-table-column>
             <el-table-column prop="onSchedule" label="按期办理">
               <template slot-scope="scope">
                 <el-button type="text" v-if="scope.row.onSchedule != '0'" style="color:#333;" size="small" @click="detailInfo(scope.row.eventType,'按期办理')">{{scope.row.onSchedule}}</el-button>
                 <div v-else style="color:#333;">{{scope.row.onSchedule}}</div>
               </template>
             </el-table-column>
             <el-table-column prop="overSchedule" label="逾期办理">
               <template slot-scope="scope">
                 <el-button type="text" v-if="scope.row.overSchedule != '0'" style="color:#333;" size="small" @click="detailInfo(scope.row.eventType,'逾期办理')">{{scope.row.overSchedule}}</el-button>
                 <div v-else style="color:#333;">{{scope.row.overSchedule}}</div>
               </template>
             </el-table-column>
             <el-table-column prop="doneKnot" label="已办结">
               <template slot-scope="scope">
                 <el-button type="text" v-if="scope.row.doneKnot != '0'" style="color:#333;" size="small" @click="detailInfo(scope.row.eventType,'已办结')">{{scope.row.doneKnot}}</el-button>
                 <div v-else style="color:#333;">{{scope.row.doneKnot}}</div>
               </template>
             </el-table-column>
              <el-table-column prop="unableKnot" label="无法办结">
                <template slot-scope="scope">
                  <el-button type="text" v-if="scope.row.unableKnot != '0'" style="color:#333;" size="small" @click="detailInfo(scope.row.eventType,'无法办结')">{{scope.row.unableKnot}}</el-button>
                  <div v-else style="color:#333;">{{scope.row.unableKnot}}</div>
                </template>
              </el-table-column>
             <el-table-column prop="eventToatl" label="合计">
               <template slot-scope="scope">
                 <el-button type="text" v-if="scope.row.eventToatl != '0'" style="color:#333;" size="small" @click="detailInfo(scope.row.eventType,'合计')">{{scope.row.eventToatl}}</el-button>
                 <div v-else style="color:#333;">{{scope.row.eventToatl}}</div>
               </template>
             </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="办理状态" name="second">
        <div class="list">
          <el-table :data="tableData2" class="table1" stripe="" style="width: 100%">
             <el-table-column type="index" :index="typeIndex" label="序号" width="80"></el-table-column>
             <el-table-column prop="takeDepartment" label="承办司局"></el-table-column>
             <el-table-column prop="wsNum" label="督办编号"></el-table-column>
             <el-table-column prop="title" label="标题" width="240"></el-table-column>
             <el-table-column prop="eventType" label="事件类型"></el-table-column>
             <el-table-column prop="comeDate" label="接收时间"></el-table-column>
             <el-table-column prop="endDate" label="限结时间"></el-table-column>
             <el-table-column prop="dataStatus" label="处理情况"></el-table-column>
          </el-table>
        </div>
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="formPage.page"
          :page-size="formPage.limit"
          layout="total,prev, pager, next, jumper"
          :total="formPage.total">
        </el-pagination>
      </el-tab-pane>
      <!-- <el-pagination background="" layout="prev, pager, next"  @current-change="handleCurrentChange" :page-size="formPage.limit" :total="formPage.total">
      </el-pagination> -->
    </el-tabs>



  </div>
</template>
<script>
  import {dbStatisticsList,wooksheetList, getDepartments, getSuperviseType, exportData} from  'api/supervision/index'
  import { Message } from 'element-ui'
  import {worksheetUrl} from 'api/index'
  export default {
    data() {
      return {
        handleCode:'first',
        input:'',
        input1:'',
        input2:'',
        input3:'',
        visible: false,
        takeDepartment:'',
        value3:'',
        showType: false,
        activeName2: 'first',
        options2: [],
        options3: [],
        tableData: [],
        tableData2: [],
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
          "pageNum":this.formPage.page,
          "pageSize":this.formPage.limit
        }
        dbStatisticsList(data).then(response => {
          this.tableData = response.data
        })
        let data2={
          "userId":1,
          "loginToken":1,
          "type":9,
          "pageNum":this.formPage.page,
          "pageSize":this.formPage.limit
        }
        wooksheetList(data2).then(response => {
          this.tableData2 = response.data.list
          this.formPage.total = response.data.total
        })
        getDepartments().then(response => {
          this.options2=response.data
        })
      let data1 = {
        'userId' : 1,
        'loginToken' : '1',
        'parentId' : 804
      }
      getSuperviseType(data1).then(response => {
        this.options3=response.data
      })
      },
    methods: {
      clearCheckedKeys(){
        this.visible = false;
        this.takeDepartment = '';
      },
      getCheckedKeys(){
        this.visible = false;
        this.takeDepartment = this.$refs.tree.getCheckedKeys().toString();
      },
      handleCurrentChange(val) {
        let createTimes;
        if(this.input2 != ''){
          createTimes = this.input2.join(',')
        }else{
          createTimes = this.input2
        }
        this.formPage.page = val;
        let data = {
          "userId":1,
          "loginToken":1,
          "type":9,
          'eventType':this.value3,
          'takeDepartment':this.takeDepartment,
          'createTimes': createTimes,
          "pageNum":val,
          "pageSize":this.formPage.limit
        }
        wooksheetList(data).then(response => {
          this.tableData = response.data.list
        })
      },
      handleClick(tab, event) {
        this.handleCode = this.activeName2;
      },
      typeIndex(index) {
        return index + (this.formPage.page - 1) * this.formPage.limit + 1;
      },
      clear(){
        this.input='';
        this.input1='';
        this.input2='';
        this.input3='';
        this.takeDepartment='';
        this.value3='';
      },
      search(){
        let createTimes;
        if(this.input2 != ''){
          createTimes = this.input2.join(',')
        }else{
          createTimes = this.input2
        }
         let data2={
          "userId":1,
          "loginToken":1,
          "type":9,
          'eventType':this.value3,
          'takeDepartment':this.takeDepartment,
          'createTimes':createTimes,
        }
        wooksheetList(data2).then(response => {
          this.tableData2 = response.data.list
          this.formPage.total = response.data.total
        })
      },
      exportData(){
        let exType;
         if(this.handleCode == 'first'){
           exType = 4
         }else{
           exType = 3
         }
        let data = {
          "userId":1,
          "loginToken":1,
          "exportType":exType,
          "type":1,
        }
        exportData(data).then(response => {
          window.location.href = worksheetUrl + response.data
        })
      },
      detailInfo(eventType, processStatus){
        let event,status;
        if(eventType == '总计'){
          event = ''
        }else{
          event = eventType
        }
        if(processStatus == '合计'){
          status = ''
        }else{
          status = processStatus
        }
        this.$router.push({name:'supervisoryManage',params:{eventType: event,processStatus: status}});
      },
    }

  }
</script>
<style type="text/css" scoped>
  .el-tree{max-height: 300px;overflow: auto;}
  .tab-toolbar .el-button{
    top: 0;
  }
  .search-btn[data-v-d543193c]{
    margin-left: 0;
  }
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
    margin-left:150px;
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
    margin-left: 50px;
    height: 33px;
    width: 100px;
  }
</style>
