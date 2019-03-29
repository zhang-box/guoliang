<template>
  <div class="content-wrapper">
    <div class="content-title">
        <span class="title-info">汇总查询</span>
    </div>
    <div class="tab-toolbar">
      <div class="cbs-select">
        <span style="margin-left: 20px;">事件类型</span>
        <el-select v-model="value2" placeholder="请选择" style="width:250px;">
          <el-option v-for="item in options2" :key="item.id" :label="item.dictValue" :value="item.id" :disabled="item.disabled"></el-option>
        </el-select>
      </div>
      <div class="cbs-select">
        <span class="mar-l-30">批示时间</span>
        <el-date-picker v-model="input2" type="daterange" clearable value-format="yyyy-MM-dd" range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="aggre-btn">
        <el-button type="primary" icon="el-icon-search" @click="search" class="search-btn-aggs">搜索</el-button>
        <el-button type="primary" icon="el-icon-delete" @click="clear" class="search-btn-aggs">清空</el-button>
        <el-button type="primary" icon="el-icon-upload" class="search-btn-aggs" @click="exportData">导出</el-button>
        <el-button type="primary" icon="el-icon-printer" class="search-btn-aggs" @click="doPrint">打印</el-button>
      </div>
    </div>
    <div class="list">
    <div>
      <el-table :data="tableData" class="table1" stripe="" style="width: 100%;margin-bottom:20px" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" label="选择"></el-table-column>
         <el-table-column type="index" :index="typeIndex" label="序号" width="50"></el-table-column>
         <el-table-column prop="comeDate" label="批示日期" width="150"></el-table-column>
          <el-table-column prop="eventType" label="事件类型"></el-table-column>
         <el-table-column prop="comeUnit" label="来文单位"></el-table-column>
         <el-table-column prop="title" label="标题">
           <template slot-scope="scope">
             <div @click="detail(scope.row.wsId)" style="cursor: pointer;">
               {{scope.row.title }}
             </div>
           </template>
         </el-table-column>
         <el-table-column prop="leadIns" label="领导批示">
           <template slot-scope="scope">
             <el-input type="textarea" v-model="scope.row.leadIns" :rows="4" disabled=""></el-input>
             <!--<div style="width: 200px;height: 100px;overflow: auto;text-align: center;vertical-align: middle;">-->
               <!--{{scope.row.leadIns }}-->
             <!--</div>-->
           </template>
         </el-table-column>
         <el-table-column prop="takeDepartment" label="承办单位"></el-table-column>
         <el-table-column prop="hadlingStatus" label="办理情况">
           <template slot-scope="scope">
             <el-input type="textarea" v-model="scope.row.hadlingStatus" :rows="4"></el-input>
           </template>
         </el-table-column>
         <el-table-column prop="processStatus" label="办理状态">
            <template slot-scope="scope">
              <el-select v-model="scope.row.processStatus" style="width:120px;">
                <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
      </el-table>
      </div>
      <div id="print" style="display:none">
        <el-table :data="tableData" class="table1" stripe="" style="width: 100%;margin-bottom:20px" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" label="选择"></el-table-column>
           <el-table-column type="index" :index="typeIndex" label="序号" width="50"></el-table-column>
           <el-table-column prop="comeDate" label="批示日期" width="100"></el-table-column>
            <el-table-column prop="eventType" label="事件类型" width="100"></el-table-column>
           <el-table-column prop="comeUnit" label="来文单位" width="150"></el-table-column>
           <el-table-column prop="title" label="标题" width="150"></el-table-column>
           <el-table-column prop="leadIns" label="领导批示" width="220"></el-table-column>
           <el-table-column prop="takeDepartment" label="承办单位" width="150"></el-table-column>
           <el-table-column v-if="!isprint" prop="hadlingStatus" label="办理情况" width="220"></el-table-column>
           <el-table-column v-else prop="hadlingStatus" label="办理情况" width="130"></el-table-column>
           <el-table-column prop="processStatusName" label="办理状态" width="80"></el-table-column>
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
      <el-button type="primary" icon="el-icon-message" class="save-btn" @click="save">保存</el-button>
      <el-button type="primary" icon="el-icon-close" class="cancel-btn" @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
  // import { } from  'api/partyManage/activitiesManage/index'
  import {wooksheetList, getSuperviseType, exportData, updatecollect} from  'api/supervision/index'
  import {worksheetUrl} from 'api/index'
  import { Message } from 'element-ui'
  export default {
    data() {
      return {
        isprint:false,
        ids: '',
        hadlings: '',
        processStatuss: '',
        input: '',
        input1: '',
        input2: '',
        input3: '',
        value1: '',
        value2: '',
        value3: '',
        textarea: '',
        showType: false,
        options1: [],
        options2: [],
        options3: [{
          value: '3',
          label: '逾期办理'
        }, {
          value: '2',
          label: '按期办理',
        }, {
          value: '1',
          label: '已办结'
        }, {
          value: '0',
          label: '待办',
        }],
        tableData: [],
        formPage: {
          page: 1,
          limit: 10,
          total: 10,
        },
        activityName: null,
        time: null
      }
    },
    created() {
      let data = {
        "userId": 1,
        "loginToken": 1,
        "type": 8,
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
        this.options2 = response.data
      })
    },
    methods: {
        doPrint() {
            this.isprint = true;
            if (this.isprint) {
                this.print2()
            }

        },
        print2(){
            let subPrint = document.getElementById('print');
            console.log(subPrint);
            let newContent = subPrint.innerHTML;
            let oldContent = newContent.innerHTML;
            document.body.innerHTML = newContent;
            window.print();
            window.location.reload(); //解决打印取消  返回页面鼠标失效,不能继续打印
            document.body.innerHTML = oldContent;
            return false;
        },
      handleCurrentChange(val) {
        let comeDates;
        if (this.input2 != '') {
          comeDates = this.input2.join(',')
        } else {
          comeDates = this.input2
        }
        this.formPage.page = val;
        let data = {
          "userId": 1,
          "loginToken": 1,
          "type": 8,
          "eventType": this.value2,
          "comeDates": comeDates,
          "pageNum": val,
          "pageSize": this.formPage.limit
        }
        wooksheetList(data).then(response => {
          this.tableData = response.data.list
        })
      },
      detail(id) {
        this.$router.push({name: "aggregationDetail", params: {wsId: id}});
      },
      typeIndex(index) {
        return index + (this.formPage.page - 1) * this.formPage.limit + 1;
      },
      clear() {
        this.value2 = '';
        this.input2 = '';
      },
      search() {
        let comeDates;
        if (this.input2 != '') {
          comeDates = this.input2.join(',')
        } else {
          comeDates = this.input2
        }
        let data = {
          "userId": 1,
          "loginToken": 1,
          "type": 8,
          "eventType": this.value2,
          "comeDates": comeDates,
        };
        wooksheetList(data).then(response => {
          this.tableData = response.data.list
        })
      },
      exportData() {
        let data = {
          "userId": 1,
          "loginToken": 1,
          "exportType": 5,
          "type": 8,
        };
        exportData(data).then(response => {
          window.location.href = worksheetUrl + response.data;
        })
      },
      print() {
        window.print()
      },
      handleSelectionChange(val) {
        this.ids = '';
        this.hadlings = '';
        this.processStatuss = '';
        for (var i = 0; i < val.length; i++) {
          if (i == '0') {
            this.ids += val[i].wsId;
            this.hadlings = val[i].hadlingStatus;
            this.processStatuss = val[i].processStatus;
          } else {
            this.ids += ',' + val[i].wsId;
            this.hadlings += ',' + val[i].hadlingStatus;
            this.processStatuss += ',' + val[i].processStatus;
          }
        }
      },
      cancel() {
        let data = {
          "userId": 1,
          "loginToken": 1,
          "type": 8,
          "pageNum": this.formPage.page,
          "pageSize": this.formPage.limit
        };
        wooksheetList(data).then(response => {
          this.tableData = response.data.list
        })
      },
      save() {
        if (this.ids == '') {
          this.$message.warning('请选择要保存的数据');
        } else {
          let data = {
            "ids": this.ids,
            "hadlings": this.hadlings,
            "processStatuss": this.processStatuss
          }
          updatecollect(data).then(response => {
            if (response.code !== -1) {
              this.$message.success('保存成功');
              let data = {
                "userId": 1,
                "loginToken": 1,
                "type": 8,
                "pageNum": this.formPage.page,
                "pageSize": this.formPage.limit
              }
              wooksheetList(data).then(response => {
                this.tableData = response.data.list
                this.formPage.total = response.data.total
              })
            }else{
              this.$message.error('保存异常')
            }

          })
        }


      }

    }
  }
</script>
<style type="text/css" scoped>

  .newBtn{
    margin-left:30px;
    margin-bottom: 15px;
  }
  .active-time span{
    margin-right: 20px;
  }
  .mar-l-30{
    margin-right: 20px;
    margin-left: 20px;
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
    display: inline-block;
    padding-top:20px;
  }
  .search-btn-aggs{
    margin-left: 20px;
    width: 100px;
    text-align: center;
    height: 33px;
  }
  .aggre-btn{
    display: inline-block;
    text-align: right;
  }
  .save-btn{
    margin-left:20%;
    margin-right:10%;
    margin-bottom: 20px;
  }
</style>
