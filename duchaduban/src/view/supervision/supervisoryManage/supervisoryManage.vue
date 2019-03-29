<template>
  <div class="content-wrapper">
    <div class="content-title">
        <span class="title-info">督办登记管理</span>
    </div>
    <div class="tab-toolbar">
      <el-row>
      <div class="add-btn" style="margin-bottom:10px;">
        <el-button type="primary" icon="el-icon-plus" class="add" @click="add">新增</el-button>
      </div>
      </el-row>
      <el-row>
      <div class="cbs-select">
        <span class="mar-l-30">督查件类型</span>
        <el-select v-model="value1" placeholder="请选择" style="width:250px;">
          <el-option v-for="item in options1" :key="item.id" :label="item.dictValue" :value="item.id" :disabled="item.disabled"></el-option>
        </el-select>
      </div>
      <div class="active-time">
        <span>登记时间</span>
        <el-date-picker v-model="input1" type="daterange" clearable value-format="yyyy-MM-dd" range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>
      </el-row>
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
      <div class="active-time" style="margin-left:64px;">
        <span>限结时间</span>
        <el-date-picker v-model="input2" type="daterange" clearable value-format="yyyy-MM-dd" range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>
      </el-row>
      <div class="cbs-select">
        <span class="mar-l-30">办理状态</span>
        <el-select v-model="value3" placeholder="请选择" style="width:250px;">
          <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
        </el-select>
      </div>
      <el-button type="primary" icon="el-icon-search" @click="search" class="mar-l-30 search-btn">搜索</el-button>
      <el-button type="primary" icon="el-icon-delete" @click="clear" class="mar-l-30" >清空</el-button>
      <el-button type="primary" icon="el-icon-edit" class="mar-l-30" @click="report">生成报告</el-button>
      <el-button type="primary" icon="el-icon-upload" class="mar-l-30" @click="exportData">导出</el-button>
    </div>
    <div class="list">
      <el-table :data="tableData" class="table1" stripe="" style="width: 100%">
         <el-table-column type="index" :index="typeIndex" label="序号" width="80"></el-table-column>
         <el-table-column prop="wsNum" label="督办编号" width="150"></el-table-column>
         <el-table-column prop="eventType" label="督查件类型"></el-table-column>
         <el-table-column prop="title" label="事件标题"></el-table-column>
         <el-table-column prop="takeDepartment" label="承办司局" width="200"></el-table-column>
         <el-table-column prop="endDate" label="限结日期" width="150"></el-table-column>
         <el-table-column prop="createTime" label="登记日期" width="150"></el-table-column>
         <el-table-column prop="processStatusName" label="办理状态"></el-table-column>
         <el-table-column label="操作" width="260">
            <template slot-scope="scope">
              <el-button type="text"  size="small" v-show="scope.row.updatePower" @click="updata(scope.row.wsId)">
                <i class="icon iconfont icon-xiugai"></i>修改
              </el-button>
              <el-button type="text" size="small" v-show="scope.row.deletePower" @click="deleteList(scope.row.wsId)">
                <i class="icon iconfont icon-lajitong"></i>删除
              </el-button>
              <el-button type="text" v-show="scope.row.detailPower" size="small" @click="detail(scope.row.wsId)">
                <i class="icon iconfont icon-chakan"></i>详情
              </el-button>
              <el-button type="text" size="small" v-show="scope.row.operationPower" @click="urge(scope.row.wsId)">
                <i class="icon iconfont icon-bianji"></i>催办
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
  import {wooksheetList, getDepartments, getSuperviseType, reminder, deleteData, exportData, getDepartmentsName, getUnReportNums, findWookSheet} from 'api/supervision/index'
  import { Message } from 'element-ui'
  import {worksheetUrl} from 'api/index'
  export default {
    data() {
      return {
        visible: false,
        takeDepartment:'',
        input1:'',
        input2:'',
        value1:'',
        value2:'',
        value3:'',
        wsId:'',
        loading:true,
        options1: [],
        options2: [],
        options3: [{
          value: '-1',
          label: '暂存',
        }, {
          value: '0',
          label: '已提交'
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
      if(!this.$route.params.processStatus && !this.$route.params.eventType){
          let data = {
            "userId":1,
            "loginToken":1,
            "type":1,
            "eventType": this.$route.params.eventType,
            "processStatus": this.$route.params.processStatus,
            "pageNum":this.formPage.page,
            "pageSize":this.formPage.limit
          }
          wooksheetList(data).then(response => {
            this.tableData = response.data.list
            this.formPage.total = response.data.total
            this.loading = false
          })
      }else{
          let data = {
            "userId":1,
            "loginToken":1,
            "eventType": this.$route.params.eventType,
            "processStatus": this.$route.params.processStatus,
            "pageNum":this.formPage.page,
            "pageSize":this.formPage.limit
          }
          findWookSheet(data).then(response => {
          this.tableData = response.data.list
          this.formPage.total = response.data.total
          this.loading = false
        })
      }
       let data1 = {
         'userId' : 1,
         'loginToken' : '1',
         'parentId' : 804
       }
       getSuperviseType(data1).then(response => {
         this.options1 = response.data
       })
       getDepartments().then(response => {
         this.options2 = response.data
       })

      },
    methods:{
      clearCheckedKeys(){
        this.visible = false;
        this.takeDepartment = '';
      },
      getCheckedKeys(){
        this.visible = false;
        this.takeDepartment = this.$refs.tree.getCheckedKeys().toString();
      },
      report(){
        getUnReportNums().then(response => {
          if(response.data != ''){
            this.$router.push({name:'createReport'});  /* 点击新增跳转 */
          }else{
            this.$message.error('暂时没有需要生成的报告')
          }
        });

      },
      handleCurrentChange(val) {
        let createTimes;
        let endDates;
        if(this.input1 != ''){
          createTimes = this.input1.join(',')
        }else{
          createTimes = this.input1
        }
        if(this.input2 != ''){
          endDates = this.input2.join(',')
        }else{
          endDates = this.input2
        }
        this.loading = true;
        this.formPage.page = val;
        if(!this.$route.params.processStatus && !this.$route.params.eventType){
          let data = {
            "userId":1,
            "loginToken":1,
            "type":1,
            'eventType':this.value1,
            'createTimes':createTimes,
            'takeDepartment':this.takeDepartment,
            'endDates':endDates,
            'processStatus':this.value3,
            "pageNum":val,
            "pageSize":this.formPage.limit
          };
        wooksheetList(data).then(response => {
            this.tableData = response.data.list;
            this.loading = false
          })
        }else{
          let data = {
            "userId":1,
            "loginToken":1,
            "eventType": this.$route.params.eventType,
            "processStatus": this.$route.params.processStatus,
            'createTimes':createTimes,
            'takeDepartment':this.takeDepartment,
            'endDates':endDates,
            "pageNum":val,
            "pageSize":this.formPage.limit
          };
          findWookSheet(data).then(response => {
            this.tableData = response.data.list
            this.loading = false
          })
        }
      },
      exportData(){
        let data = {
          "userId":1,
          "loginToken":1,
          "exportType":1,
          "type":1,
        }
        exportData(data).then(response => {
          window.location.href = worksheetUrl + response.data
        })
      },
      updata(id){
        this.$router.push({name:'supervisoryUpdate',params:{wsId:id}});
      },
      add(id){
        this.$router.push({name:'supervisoryAdd',params:{wsId:id}});
      },
      detail(id){
        this.$router.push({name:'supervisoryDetail',params:{wsId:id}});
      },
      deleteList(id){
        let data={
          "wsId":id
        }
        deleteData(data).then(response => {
          if(response.code !== -1){
            this.$message.success('删除成功');
            if(!this.$route.params.processStatus && !this.$route.params.eventType){
              let data = {
                "userId":1,
                "loginToken":1,
                "type":1,
                "pageNum": 1,
                "pageSize":this.formPage.limit
              };
              wooksheetList(data).then(response => {
                this.tableData = response.data.list
                this.loading = false
              })
            }else{
              let data = {
                "userId":1,
                "loginToken":1,
                "eventType": this.$route.params.eventType,
                "processStatus": this.$route.params.processStatus,
                "pageNum": 1,
                "pageSize":this.formPage.limit
              }
              findWookSheet(data).then(response => {
                this.tableData = response.data.list
                this.formPage.total = response.data.total
              })
            }
          }else{
            this.$message.error('删除异常')
          }

        })

      },
      urge(id){
        let data={
          "wsId":id
        }
        reminder(data).then(res => {
          if(res.code !== -1){
            this.$message.success('催办成功');
            let data = {
              "userId":1,
              "loginToken":1,
              "type":1,
              "eventType": this.$route.params.eventType,
              "processStatus": this.$route.params.processStatus,
              "pageNum":this.formPage.page,
              "pageSize":this.formPage.limit
            }
            wooksheetList(data).then(response => {
              this.tableData = response.data.list;
              this.formPage.total = response.data.total;
              this.loading = false
            })
          }else{
            this.$message.error('催办异常')
          }
        })

      },
      typeIndex(index) {
        return index + (parseInt(this.formPage.page) - 1) * parseInt(this.formPage.limit) + 1;
      },
      clear(){
        this.value1='';
        this.takeDepartment='';
        this.value3='';
        this.value4='';
        this.input1='';
        this.input2='';
      },
      search(){
        let createTimes;
        let endDates;
        if(this.input1 != ''){
          createTimes = this.input1.join(',')
        }else{
          createTimes = this.input1
        }
        if(this.input2 != ''){
          endDates = this.input2.join(',')
        }else{
          endDates = this.input2
        }
        let data={
          "userId":1,
          "loginToken":1,
          "type":1,
          'eventType':this.value1,
          'createTimes':createTimes,
          'takeDepartment':this.takeDepartment,
          'endDates':endDates,
          'processStatus':this.value3,
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
  .el-tree{max-height: 300px;overflow: auto;}
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
  }
  .mar-l-30 {
    height: 33px;
    width: 100px;
    text-align: center;
  }
  .tab-toolbar[data-v-0bcdb866]{
    padding-top:0 !important;
  }
  .tab-toolbar .el-button{
    top:0 !important;
  }
</style>
