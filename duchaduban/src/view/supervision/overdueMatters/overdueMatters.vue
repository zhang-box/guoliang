<template>
  <div class="content-wrapper">
    <div class="content-title">
        <span class="title-info">督查督办管理</span>
    </div>
    <div class="tab-toolbar">
      <el-row>
      <div class="cbs-select">
        <span class="mar-l-40">督办编号</span>
       <el-input v-model="input1" placeholder="请输入内容" style="width:250px;"></el-input>
      </div>
      <div class="active-time">
        <span>限结时间</span>
        <el-date-picker v-model="input2" type="daterange" clearable value-format="yyyy-MM-dd" range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>
      </el-row>
          <!-- <el-button type="primary" icon="el-icon-delete" class="mar-l-30" @click="resetInfo">清空</el-button> -->
      <el-row>
      <div class="cbs-select">
        <span class="mar-l-40">审批状态</span>
        <el-select v-model="value3" placeholder="请选择" style="width:250px;">
          <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
        </el-select>
      </div>
      <div class="active-time">
        <span>申请日期</span>
        <el-date-picker v-model="input3" type="daterange" clearable value-format="yyyy-MM-dd" range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期">
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
      <el-button type="primary" icon="el-icon-search" class="mar-l-30 search-btn" @click="search">搜索</el-button>
      <el-button type="primary" icon="el-icon-delete" class="mar-l-30 search-btn" @click="clear">清空</el-button>
      <el-button type="primary" icon="el-icon-upload" class="mar-l-30 search-btn" @click="exportData">导出</el-button>
      <el-button type="primary" icon="el-icon-printer" class="mar-l-30 search-btn" @click="doPrint">打印</el-button>
        </el-row>
    </div>

    <div class="list">
        <el-table :data="tableData" class="table1" stripe="" style="width: 100%">
            <el-table-column type="index" :index="typeIndex" label="序号" width="80"></el-table-column>
            <el-table-column prop="wsNum" label="督办编号" width="150"></el-table-column>
            <el-table-column prop="eventType" label="督查件类型"></el-table-column>
            <el-table-column prop="title" label="事件标题" width="240"></el-table-column>
            <el-table-column prop="comeDate" label="申请日期"></el-table-column>
            <el-table-column prop="endDate" label="限结日期"></el-table-column>
            <el-table-column prop="delayDays" label="逾期天数"></el-table-column>
            <el-table-column prop="approvalResult" label="审批状态"></el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="text"  size="small" @click="updata(scope.row.wsId)">
                        <i class="icon iconfont icon-chakan"></i>详情
                    </el-button>
                    <el-button type="text" size="small" @click="progress(scope.row.wsId)">
                        <i class="icon iconfont icon-tianjiashangbao"></i>进展报送
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div id="print" style="display:none">
            <el-table :data="tableData" class="table1" stripe="" style="width: 100%">
                <el-table-column type="index" :index="typeIndex" label="序号" width="80"></el-table-column>
                <el-table-column prop="wsNum" label="督办编号" width="100"></el-table-column>
                <el-table-column prop="eventType" label="督查件类型" width="150"></el-table-column>
                <el-table-column prop="title" label="事件标题" width="240"></el-table-column>
                <el-table-column prop="comeDate" label="申请日期" width="100"></el-table-column>
                <el-table-column prop="endDate" label="限结日期" width="100"></el-table-column>
                <el-table-column prop="overdueDays" label="逾期天数" width="90"></el-table-column>
                <el-table-column prop="approvalResult" label="审批状态" width="90"></el-table-column>
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
        value2:'',
        value3:'',
        showType: false,
        options2: [],
        options3: [{
          value: '通过',
          label: '通过'
        }, {
          value: '不通过',
          label: '不通过',
        }, {
          value: '全部',
          label: '全部',
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
          "userId":1,
          "loginToken":1,
          "type":5,
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
        let reportTimes;
        let endDates;
        if(this.input3 != ''){
          reportTimes = this.input3.join(',')
        }else{
          reportTimes = this.input3
        }
        if(this.input2 != ''){
          endDates = this.input2.join(',')
        }else{
          endDates = this.input2
        }
        this.formPage.page = val;
        let data = {
          "userId":1,
          "loginToken":1,
          "type":5,
          "wsNum": this.input1,
          "eventType": this.value2,
          "approvalResult":this.value3,
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
          "exportType":7,
          "type":5,
        }
        exportData(data).then(response => {
          window.location.href = worksheetUrl + response.data
        })
      },
       updata(id){
        this.$router.push({name:'overdueMattersDetail',params:{wsId:id}});
      },
      progress(id){
        this.$router.push({name:'overdueMattersProgress',params:{wsId:id}});
      },
      typeIndex(index) {
        return index + (this.formPage.page - 1) * this.formPage.limit + 1;
      },
       clear(){
         this.value1='';
         this.value2='';
         this.value3='';
         this.input1='';
         this.input2='';
         this.input3='';
      },
      print(){
        window.print()
      },
      search(){
        let reportTimes;
        let endDates;
        if(this.input3 != ''){
          reportTimes = this.input3.join(',')
        }else{
          reportTimes = this.input3
        }
        if(this.input2 != ''){
          endDates = this.input2.join(',')
        }else{
          endDates = this.input2
        }
         let data = {
          "userId":1,
          "loginToken":1,
          "type":5,
          "wsNum": this.input1,
          "eventType": this.value2,
          "approvalResult":this.value3,
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
    margin-right: 0;
    margin-left: 40px;
    height: 33px;
    width: 100px;
    top: 0;
  }
</style>
