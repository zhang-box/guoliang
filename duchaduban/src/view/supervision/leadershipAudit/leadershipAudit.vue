<template>
  <div class="content-wrapper">
    <div class="content-title">
        <span class="title-info">领导审核</span>
    </div>
    <div class="tab-toolbar">
      <el-row>
      <div class="cbs-select">
        <span class="mar-l-30" style="text-align: right;">汇报人</span>
        <el-input v-model="input1" placeholder="请输入内容" style="width:250px;"></el-input>
      </div>
        <div class="cbs-select">
          <span class="mar-l-30" style="margin-left: 30px;">上报日期</span>
          <el-date-picker
            v-model="input2"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
          <!--<el-date-picker v-model="input2" type="daterange" clearable value-format="yyyy-MM-dd" range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期">-->
          <!--</el-date-picker>-->
        </div>
        <div class="cbs-select">
          <span class="mar-l-30" style="text-align: right;">状态</span>
          <el-select v-model="value2" placeholder="请选择" style="width:250px;">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
          </el-select>
        </div>
      <!--<div class="cbs-select">-->
        <!--<span class="mar-l-30">承办司局</span>-->
        <!--<el-popover-->
          <!--placement="right"-->
          <!--width="500"-->
          <!--trigger="click"-->
          <!--v-model="visible">-->
          <!--<el-tree show-checkbox accordion :data="options1" node-key="label" ref="tree"></el-tree>-->
          <!--<div style="text-align: right; margin: 0">-->
            <!--<el-button size="mini" type="text" @click="clearCheckedKeys">取消</el-button>-->
            <!--<el-button type="primary" size="mini" @click="getCheckedKeys">确定</el-button>-->
          <!--</div>-->
          <!--<el-button slot="reference" style="width:250px;height:33px;text-align: left;border: 1px solid #dcdfe6;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{takeDepartment}}</el-button>-->
        <!--</el-popover>-->
        <!--<el-select v-model="value1" placeholder="请选择" style="width:250px;">-->
          <!--<el-option v-for="item in options1" :key="item.classId" :label="item.classGovCname" :value="item.classGovCname" :disabled="item.disabled"></el-option>-->
        <!--</el-select>-->
      <!--</div>-->
      <!--</el-row>-->
      <!--<el-row>-->
      <!--<div class="cbs-select">-->
        <!--<span class="mar-l-30" style="text-align: right;">状态</span>-->
        <!--<el-select v-model="value2" placeholder="请选择" style="width:250px;">-->
          <!--<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>-->
        <!--</el-select>-->
      <!--</div>-->
      <!--<div class="cbs-select">-->
        <!--<span class="mar-l-30" style="margin-left: 15px;">督查件类型</span>-->
        <!--<el-select v-model="value3" placeholder="请选择" style="width:250px;">-->
          <!--<el-option v-for="item in options3" :key="item.id" :label="item.dictValue" :value="item.id" :disabled="item.disabled"></el-option>-->
        <!--</el-select>-->
      <!--</div>-->
      <!--</el-row>-->
      <!--<el-row>-->
      <!--<div class="cbs-select">-->
        <!--<span class="mar-l-30" style="margin-left: 30px;">上报日期</span>-->
        <!--<el-date-picker-->
          <!--v-model="input2"-->
          <!--type="date"-->
          <!--value-format="yyyy-MM-dd"-->
          <!--placeholder="选择日期">-->
        <!--</el-date-picker>-->
        <!--&lt;!&ndash;<el-date-picker v-model="input2" type="daterange" clearable value-format="yyyy-MM-dd" range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期">&ndash;&gt;-->
        <!--&lt;!&ndash;</el-date-picker>&ndash;&gt;-->
      <!--</div>-->
      <el-button type="primary" size="mini" icon="el-icon-search" @click="search" class="search-btn" style="margin-left:15px;">搜索</el-button>
      <el-button type="primary" size="mini" icon="el-icon-delete" @click="clear" class="search-btn">清空</el-button>
       <el-button type="primary" size="mini" icon="el-icon-upload" class="search-btn" @click="exportData" >导出</el-button>
        </el-row>
    </div>

    <div class="list">
      <el-table :data="tableData" class="table1" stripe="" style="width: 100%">
         <el-table-column type="index" :index="typeIndex" label="序号" width="120"></el-table-column>
         <el-table-column prop="reportDate" label="汇报日期"></el-table-column>
         <el-table-column prop="userName" label="汇报人"></el-table-column>
         <el-table-column prop="notes" label="汇报事项" width="280"></el-table-column>
         <el-table-column prop="status" label="状态"></el-table-column>
         <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <!--<template>-->
                <!--<el-button v-if="scope.row.reviewLevel != scope.row.nextLevel" type="text"  size="small">-->
                  <!--<i class="icon iconfont icon-shenpi"></i>详情-->
                <!--</el-button>-->
                <el-button type="text"  size="small" @click="detail(scope.row.reviewLevel,scope.row.nextLevel,scope.row.reportId,scope.row.wsNum,scope.row.comeUnit)">
                  <i class="icon iconfont icon-shenpi"></i>审批
                </el-button>
              <!--</template>-->
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
  import {getLeadershipList, getDepartments, getSuperviseType, approvalByWsNum, exportData, exportOffice} from  'api/supervision/index'
  import { Message } from 'element-ui'
  import {worksheetUrl} from 'api/index'
  export default {
    data() {
      return {
        visible: false,
        input1:'',
        input2:'',
        takeDepartment:'',
        value2:'',
        value3:'',
        showType: false,
        options1: [],
        options2: [{
          value: '2',
          label: '已审批'
        }, {
          value: '1',
          label: '未审批',
        }],
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
        getLeadershipList(data).then(response => {
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
        this.options3=response.data
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
        this.formPage.page = val;
        let data = {
          "userId":1,
          "loginToken":1,
          "status":this.value2,
          "userName":this.input1,
          "reportDate":this.input2,
          "pageNum":val,
          "pageSize":this.formPage.limit
        }
        getLeadershipList(data).then(response => {
          this.tableData = response.data.list
        })
      },
      detail(reviewLevel, nextLevel, reportId, wsNum, comeUnit){
          // if(reviewLevel != nextLevel) {
          //   alert("审批已结束")
          // }else{
          //   if(nextLevel >= '2'){
          //     this.$router.push({name:"leadershipDetail-next",params:{reviewLevel:reviewLevel,nextLevel:nextLevel,reportId:reportId,wsNum:wsNum,comeUnit:comeUnit}});
          //   }else{
              this.$router.push({name:"leadershipDetail",params:{reviewLevel:reviewLevel,nextLevel:nextLevel,reportId:reportId,wsNum:wsNum,comeUnit:comeUnit}})
            // }
          // }
      },
      typeIndex(index) {
        return index + (this.formPage.page - 1) * this.formPage.limit + 1;
      },
      clear(){
        this.input1='';
        this.input2='';
        this.takeDepartment='';
        this.value2='';
        this.value3='';
      },
      search(){
        let data = {
          "userId":1,
          "loginToken":1,
          "status":this.value2,
          "userName":this.input1,
          "reportDate":this.input2,
        }
        getLeadershipList(data).then(response => {
          this.tableData = response.data.list
        })
      },
      exportData(){
        let data = {
          "userId":1,
          "loginToken":1,
          "exportType":2,
        }
        exportOffice(data).then(response => {
          window.location.href = worksheetUrl + response.data
        })
      },
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
    /*margin-left: 50px;*/
    height: 33px;
    /*width: 100px;*/
    text-align: center;
  }
    .tab-toolbar .el-button{
    top:0 !important;
  }
</style>
