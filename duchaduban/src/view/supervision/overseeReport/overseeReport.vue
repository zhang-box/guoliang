<template>
  <div class="content-wrapper">
    <div class="content-title">
        <span class="title-info">督办报告管理</span>
    </div>
    <div class="tab-toolbar clearFix">
      <div class="report-date">
        <span class="turn-right-margin">报告期</span>
        <el-select v-model="value3" placeholder="请选择" style="width:200px;">
          <el-option v-for="item in options3" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="report-btns">
        <el-button type="primary" icon="el-icon-search" @click="search" class="mar-l-30 search-btn">搜索</el-button>
        <el-button type="primary" icon="el-icon-delete" @click="clear" class="mar-l-30 search-btn">清空</el-button>
      </div>
    </div>
    <div class="list">
      <el-table :data="tableData" class="table1" stripe="" style="width: 100%">
         <el-table-column type="index" :index="typeIndex" label="序号" width="120"></el-table-column>
         <el-table-column prop="reportNum" label="报告期"></el-table-column>
         <el-table-column prop="reportDate" label="报告生成时间"></el-table-column>
         <el-table-column prop="upDate" label="最后一次修改时间"></el-table-column>
         <el-table-column prop="userName" label="最后一次编辑人员"></el-table-column>
         <el-table-column prop="status" label="状态"></el-table-column>
         <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="updata(scope.row.reportId)" v-show="scope.row.updatePower">
                <i class="icon iconfont icon-xiugai"></i>修改
              </el-button>
              <el-button type="text" size="small" @click="detail(scope.row.reportId)" v-show="scope.row.detailPower">
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
  import {reportList,getReportNums} from  'api/supervision/index'
  import { Message } from 'element-ui'
  export default {
    data() {
      return {
        input:'',
        input1:'',
        input2:'',
        input3:'',
        value2:'',
        value3:'',
        showType: true,
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
          "pageNum":this.formPage.page,
          "pageSize":this.formPage.limit
        }
        reportList(data).then(response => {
          this.tableData = response.data.list
          this.formPage.total = response.data.total
        })
        getReportNums(data).then(response => {
          this.options3 = response.data
        })

      },
    methods:{
      handleCurrentChange(val) {
        this.formPage.page = val
        let data = {
          "userId":1,
          "loginToken":1,
          "reportNum":this.value3,
          "pageNum":val,
          "pageSize":this.formPage.limit
        }
        reportList(data).then(response => {
          this.tableData = response.data.list
        })
      },
      updata(id){
        this.$router.push({name:"overseeReportUpdata",params:{reportId:id}});
      },
      detail(id){
        this.$router.push({name:"overseeReportDetail",params:{reportId:id}});
      },
      typeIndex(index) {
        return index + (this.formPage.page - 1) * this.formPage.limit + 1;
      },
      clear(){
        this.value3=''
      },
      search(){
        let data = {
          "userId":1,
          "loginToken":1,
          "reportNum":this.value3
        }
        reportList(data).then(response => {
          this.tableData = response.data.list
          this.formPage.total = response.data.total
        })
      }
    }

  }
</script>
<style type="text/css" scoped>
/*兼容IE9的清除浮动*/
  .clearFix{
    zoom:1;
  }
  .clearFix:after{
    content:"";
    display: block;
    clear: both;
  }


/*********************/
  .report-date{
    float: left;
  }
  .turn-right-margin{
    margin-right: 20px;
  }
  /* .report-btns{
    float: right;
  } */
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
  .list{
    padding-top:20px;
  }
  .cbs-select{
    display: inline-block;
    margin-bottom: 20px;
  }
  .add-btn{
    display: inline-block;
  }
  .add{
    padding:8px 15px;
    margin-left: 30px;
  }
  .tab-toolbar{
    padding:20px 20px 0px;
  }
  .search-btn{
    margin-left: 50px;
    height: 33px;
    width: 100px;
    text-align: center;
  }
    .tab-toolbar .el-button{
    top:0 !important;
  }
</style>
