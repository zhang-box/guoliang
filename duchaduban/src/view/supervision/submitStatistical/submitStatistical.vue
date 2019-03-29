<template>
  <div class="content-wrapper">
    <div class="content-title">
        <span class="title-info">督查督办管理</span>
    </div>
    <div class="tab-toolbar">
      <div class="cbs-select">
        <span class="mar-l-30">事件类型</span>
        <el-select v-model="value2" placeholder="请选择" style="width:250px;">
          <el-option v-for="item in options2" :key="item.id" :label="item.dictValue" :value="item.id" :disabled="item.disabled"></el-option>
        </el-select>
      </div>

      <el-button type="primary" icon="el-icon-search" class="mar-l-30 search-btn" @click="search">搜索</el-button>
      <el-button type="primary" icon="el-icon-delete" class="mar-l-30 search-btn" @click="clear">清空</el-button>

    </div>
    <div class="list">
      <el-button type="primary" icon="el-icon-message" class="search-btn send-btn" @click="send">发送局办</el-button>
      <el-button type="primary" icon="el-icon-upload" class="search-btn export-btn" @click="exportData">导出</el-button>
      <el-button type="primary" icon="el-icon-printer" class="search-btn print-btn" @click="doPrint">打印</el-button>
      <div id="print">
          <el-table :data="tableData" ref="multipleTable" class="table1" style="width: 100%;margin-top:10px;" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" label="选择"></el-table-column>
              <el-table-column type="index" :index="typeIndex" label="序号" width="80"></el-table-column>
              <el-table-column prop="comeDate" label="批示日期"></el-table-column>
              <el-table-column prop="comeUnit" label="来文单位"></el-table-column>
              <el-table-column prop="title" label="标题"></el-table-column>
              <el-table-column prop="leadIns" label="领导批示"></el-table-column>
              <el-table-column prop="hadlingStatus" label="办理情况"></el-table-column>
              <el-table-column prop="processStatusName" label="办理状态"></el-table-column>
          </el-table>
      </div>
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
  import {wooksheetList, getSuperviseType, sendOffice, exportReport, exportData} from 'api/supervision/index'
  import { Message } from 'element-ui'
  import {worksheetUrl} from 'api/index'
  export default {
    data() {
      return {
        wsId:'',
        input:'',
        input1:'',
        input2:'',
        input3:'',
        value2:'',
        value3:'',
        showType: false,
        options2: [],
        tableData: [],
        formPage: {
          page: 1,
          limit: 10,
          total: undefined,
        },
        multipleSelection:'',
        activityName:null,
        time:null
      }
    },
    created(){
        let data = {
          "userId": 1,
          "loginToken": 1,
          "type": 6,
          "pageNum": this.formPage.page,
          "pageSize": this.formPage.limit
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
        this.options2=response.data
      })
      },
    methods:{
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
      handleCurrentChange(val) {
        this.formPage.page = val
        let data = {
          "userId":1,
          "loginToken":1,
          "type": 6,
          "eventType":this.value2,
          "pageNum":val,
          "pageSize":this.formPage.limit
        }
        wooksheetList(data).then(response => {
          this.tableData = response.data.list
        })
      },
      typeIndex(index) {
        return index + (this.formPage.page - 1) * this.formPage.limit + 1;
      },
       clear(){
        this.value2='';
      },
      search(){
        let data = {
          "userId":1,
          "loginToken":1,
          "type":6,
          "eventType":this.value2,
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
      },
      exportData(){
        let data = {
          "userId":1,
          "loginToken":1,
          "exportType":8,
          "type":6,
        }
        exportData(data).then(response => {
          window.location.href = worksheetUrl + response.data
        })
      },
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
    margin-left: 50px;
    height: 33px;
    width: 100px;
    text-align: center;
    padding: 0;
  }
  .send-btn{
    margin-left: 25px;
  }
</style>
