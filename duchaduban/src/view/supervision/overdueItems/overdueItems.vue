<template>
  <div class="content-wrapper">
    <div class="content-title">
        <span class="title-info">逾期事项管理</span>
    </div>
    <div class="tab-toolbar">
      <el-row>
      <div class="cbs-select">
        <span class="mar-l-left">督办编号</span>
        <el-input v-model="input" placeholder="请输入内容" style="width:250px;"></el-input>
      </div>
      <div class="active-time" style="margin-left:65px;">
        <span>限结日期</span>
        <el-date-picker v-model="input2" type="daterange" clearable value-format="yyyy-MM-dd" range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期" style="width:250px;">
        </el-date-picker>
      </div>
    </el-row>
    <el-row>
      <div class="cbs-select">
        <span class="mar-l-left">承办司局</span>
        <el-popover
          placement="right"
          width="500"
          trigger="click"
          v-model="visible">
          <el-tree show-checkbox accordion :data="options1" node-key="label" ref="tree"></el-tree>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="clearCheckedKeys">取消</el-button>
            <el-button type="primary" size="mini" @click="getCheckedKeys">确定</el-button>
          </div>
          <el-button slot="reference" style="width:250px;height:33px;text-align: left;border: 1px solid #dcdfe6;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{takeDepartment}}</el-button>
        </el-popover>
        <!--<el-select v-model="value1" placeholder="请选择" style="width:220px;">-->
          <!--<el-option v-for="item in options1" :key="item.classId" :label="item.classGovCname" :value="item.classGovCname" :disabled="item.disabled"></el-option>-->
        <!--</el-select>-->
      </div>
      <div class="cbs-select" style="margin-left:40px;">
        <span class="mar-l-little">督查件类型</span>
        <el-select v-model="value2" placeholder="请选择" style="width:250px;">
          <el-option v-for="item in options2"  :key="item.id" :label="item.dictValue" :value="item.id" :disabled="item.disabled"></el-option>
        </el-select>
      </div>
      </el-row>
      <el-row>
      <div class="active-time" style="margin-left:29px;">
        <span>申请日期</span>
        <el-date-picker v-model="input3" type="daterange" clearable value-format="yyyy-MM-dd" range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期" style="width:250px;">
        </el-date-picker>
      </div>
      <div class="cbs-select" style="margin-left:40px;">
        <span class="mar-l-little">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;状态</span>
        <el-select v-model="value3" placeholder="请选择" style="width:250px;">
          <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
        </el-select>
      </div>
        <el-button type="primary" icon="el-icon-search" @click="search" class="mar-l-30 search-btn">搜索</el-button>
        <el-button type="primary" icon="el-icon-delete" @click="clear" class="mar-l-30 search-btn search-btns">清空</el-button>
      </el-row>
    </div>
    <div class="list">
      <el-table :data="tableData" class="table1" stripe="" style="width: 100%">
         <el-table-column type="index" :index="typeIndex" label="序号" width="80"></el-table-column>
         <el-table-column prop="wsNum" label="督办编号" width="150"></el-table-column>
         <el-table-column prop="eventType" label="督查件类型"></el-table-column>
         <el-table-column prop="title" label="事件标题"></el-table-column>
         <el-table-column prop="takeDepartment" label="承办司局" width="200"></el-table-column>
         <el-table-column prop="endDate" label="限结日期"></el-table-column>
         <el-table-column prop="comeDate" label="申请日期"></el-table-column>
         <el-table-column prop="delayDays" label="逾期天数"></el-table-column>
         <el-table-column prop="status" label="状态"></el-table-column>
         <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text"  size="small" @click="updata(scope.row.wsId)" v-show="scope.row.approvalUpdatePower">
                <i class="icon iconfont icon-xiugai"></i>修改
              </el-button>
              <el-button type="text" size="small" @click="detail(scope.row.wsId)" v-show="scope.row.approvalDetailPower">
                <i class="icon iconfont icon-xiangqing"></i>详情
              </el-button>
              <el-button type="text" size="small" @click="approval(scope.row.wsId)" v-show="scope.row.approvalPower">
                <i class="icon iconfont icon-shenpi"></i>审批
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
  import  {wooksheetList, getDepartments, getSuperviseType} from  'api/supervision/index'
  import { Message } from 'element-ui'
  export default {
    data() {
      return {
        visible: false,
        input:'',
        input1:'',
        input2:'',
        input3:'',
        takeDepartment:'',
        value2:'',
        value3:'',
        showType: false,
         options1: [],
       options2: [],
        options3: [{
          value: '-1',
          label: '待审批',
        }, {
          value: '0',
          label: '暂存'
        }, {
          value: '1',
          label: '已审批',
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
       getDepartments().then(response => {
         this.options1 = response.data
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
      clearCheckedKeys(){
        this.visible = false;
        this.takeDepartment = '';
      },
      getCheckedKeys(){
        this.visible = false;
        this.takeDepartment = this.$refs.tree.getCheckedKeys().toString();
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
          "wsNum":this.input,
          "endDates":endDates,
          "reportTimes":reportTimes,
          "takeDepartment":this.takeDepartment,
          "eventType":this.value2,
          "status":this.value3,
          "pageNum":val,
          "pageSize":this.formPage.limit
        }
        wooksheetList(data).then(response => {
          this.tableData = response.data.list
        })
      },
      detail(id){
        this.$router.push({name:"overdueItemsDetail",params:{wsId:id}});
      },
      updata(id){
        this.$router.push({name:"overdueItemsUpdate",params:{wsId:id}});
      },
      approval(id){
        this.$router.push({name:"overdueItemsApproval",params:{wsId:id}});
      },
      // overdueDetail(){
      //   this.$router.push({name:"overdueItemsDetail"});
      // },
      typeIndex(index) {
        return index + (this.formPage.page - 1) * this.formPage.limit + 1;
      },
      clear(){
        this.input='';
        this.input1='';
        this.input2='';
        this.input3='';
        this.takeDepartment='';
        this.value2='';
        this.value3='';
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
          "wsNum":this.input,
          "endDates":endDates,
          "reportTimes":reportTimes,
          "takeDepartment":this.takeDepartment,
          "eventType":this.value2,
           "status":this.value3,
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
    margin-left:20px;
    display: inline-block;
  }
  .active-time span{
    margin-right: 20px;
  }
  .mar-l-30{
    margin-right: 20px;
  }
  .mar-l-little{
    margin-left:15px;
    margin-right: 20px;
  }
  .list{
    padding-top:20px;
  }
  .cbs-select{
    display: inline-block;
    margin-bottom: 20px;
  }
  .mar-l-left{
    margin-left:30px;
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
    height:33px;
    width:100px;
    text-align:center;
  }
  .search-btns{
  margin-left: 0px;
  }
  .margin-state{
    margin-left: 60px;
    margin-right:20px;
  }
  .over-btn-sizing{
    width:100%;
    text-align: right;
  }
    .tab-toolbar .el-button{
    top:0 !important;
  }
</style>
