<template>
	<div class="content-wrapper">
		<div class="content-title">
	      <span class="title-info">待办已办管理</span>
		</div>
		<div class="tab-toolbar">
      <el-row>
			<div class="cbs-select">
        <span class="to-mar-l">督办编号</span>
        <el-input v-model="input1" placeholder="请输入内容" style="width:250px;"></el-input>
      </div>
      <div class="cbs-select">
        <span class="mar-l-30">限结日期</span>
        <el-date-picker v-model="input3" type="daterange" clearable value-format="yyyy-MM-dd" range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>
      </el-row>
      <el-row>
      <div class="cbs-select">
        <span class="mar-l-30">督查件类型</span>
        <el-select v-model="value3" placeholder="请选择" style="width:250px;">
          <el-option v-for="item in options3" :key="item.id" :label="item.dictValue" :value="item.id" :disabled="item.disabled"></el-option>
        </el-select>
      </div>
      <div class="cbs-select">
        <span class="mar-l-30">办理状态</span>
        <el-select v-model="value2" placeholder="请选择" style="width:250px;">
          <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" class="mar-l-30 search-btn" @click="search">搜索</el-button>
      <el-button type="primary" icon="el-icon-delete" class="mar-l-30 search-btn" @click="clear">清空</el-button>
      </div>
      </el-row>

    </div>
    <div class="list">
      <el-table :data="tableData" class="table1" style="width: 100%" :row-class-name="tableRowClassName" :cell-class-name="tableCellClassName">
         <el-table-column type="index" :index="typeIndex" label="序号" width="80">
           <!--<template slot-scope="scope">-->
             <!--<div class="waring-icon-style"></div>-->
           <!--</template>-->
         </el-table-column>
         <el-table-column prop="wsNum" label="督查编号" width="130"></el-table-column>
         <el-table-column prop="eventType" label="督查件类型" width="150"></el-table-column>
         <el-table-column prop="title" label="标题" width="240"></el-table-column>
         <el-table-column prop="doUnit" label="会办单位" width="100"></el-table-column>
         <el-table-column prop="endDate" label="限结日期" width="150"></el-table-column>
         <el-table-column prop="dataStatus" label="事件状态"></el-table-column>
         <el-table-column prop="processStatusName" label="办理状态"></el-table-column>
         <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="toDetail(scope.row.wsId)" v-show="scope.row.processPower">
                <i class="icon iconfont icon-bianji"></i>办理
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
  import {wooksheetList, getSuperviseType} from  'api/supervision/index'
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
        options3: [],
         options4: [{
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
          "type":2,
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
         this.options3=response.data
       })
      },
    methods:{
      tableRowClassName({row, column, rowIndex, columnIndex}) {
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
        if(this.input3 != ''){
          endDates = this.input3.join(',')
        }else{
          endDates = this.input3
        }
        this.formPage.page = val;
        let data = {
          "userId":1,
          "loginToken":1,
          "type":2,
          "wsNum":this.input1,
          "endDates":endDates,
          "eventType":this.value3,
          "processStatus":this.value2,
          "pageNum":val,
          "pageSize":this.formPage.limit
        }
        wooksheetList(data).then(response => {
          this.tableData = response.data.list
        })
      },
      toDetail(id){
        this.$router.push({name:'toDoManagedDetail',params:{wsId:id}});  /* 点击办理跳转 */
      },
      typeIndex(index) {
        return index + (this.formPage.page - 1) * this.formPage.limit + 1;
      },
      clear(){
        this.input1='';
        this.input3='';
        this.value2='';
        this.value3='';
      },
      search(){
        let endDates;
        if(this.input3 != ''){
          endDates = this.input3.join(',')
        }else{
          endDates = this.input3
        }
         let data = {
          "userId":1,
          "loginToken":1,
          "type":2,
          "wsNum":this.input1,
          "endDates":endDates,
          "eventType":this.value3,
          "processStatus":this.value2,
        }
        wooksheetList(data).then(response => {
          this.tableData = response.data.list
        })
      }
  }
}
</script>
<style type="text/css" scoped>
  /*.el-table_1_column_1 .el-table .cell, .el-table th div{*/
    /*padding-right: 0;*/
  /*}*/
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
    margin-left: 20px;
    top:0;
    height: 33px;
    width: 100px;
    margin-right: 0;
  }
  .to-mar-l{
    margin-left: 45px;
    margin-right: 20px;
  }
</style>
