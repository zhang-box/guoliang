<template>
  <div class="content-wrapper">
    <div class="content-main">
      <div class="tab-toolbar">
        <div class="search-row">
            <div class="mar-l-30 span-width">标准名称：</div>
            <el-input class="search-width" v-model="proCname"></el-input>
            <div class="mar-l-30 span-width">标准类型：</div>
            <!-- <el-input v-model="proStandardType" class="search-width"></el-input> -->
            <div v-model="standardType" class="search-width" style="display:inline-block;">
              <el-cascader
                :options="options"
                v-model="selectedOptions"
                @change="handleChange">
              </el-cascader>
            </div>
        </div>
        <div class="search-row">
            <div class="mar-l-30 span-width">制/修订：</div>
            <!-- <el-input v-model="value" class="search-width"></el-input> -->
            <el-select v-model="mendType" class="search-width" placeholder="请选择">
              <el-option
                v-for="(item,index) in options2"
                :key="index"
                :label="item"
                :value="index">
              </el-option>
            </el-select>
            <div class="mar-l-30 span-width">标准阶段：</div>
            <el-select v-model="stage" class="search-width" placeholder="请选择">
              <el-option
                v-for="(item,index) in options4"
                :key="index"
                :label="item"
                :value="index">
              </el-option>
            </el-select>
            <!--<div  class="mar-l-30 span-width">状态：</div>-->
            <!--<el-select v-bind:disabled="stage == ''?true:false" v-model="state" class="search-width" placeholder="请选择">-->
            <!--<el-option-->
            <!--v-for="(item,index) in options3"-->
            <!--:key="index"-->
            <!--:label="item"-->
            <!--:value="index">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <!--</div>-->
            <el-button  type="primary" icon="icon iconfont icon-chaxun" @click="findInfo" class="mar-l-30"> 查询</el-button>
            <el-button type="primary" icon="icon iconfont icon-qingkong" @click="clearInfo" class="mar-l-30 button-let"> 清空</el-button>
         </div>


        </div>
      <!--</div>-->

      <div class="content-table">
        <el-table :data="tableData" class="table1" style="width: 100%; margin-top: 10px">
          <el-table-column type="index" :index="typeIndex" label="序号" width="60"></el-table-column>
          <el-table-column prop="standardNumber" label="标准编号" ></el-table-column>
          <el-table-column prop="proCname" label="标准名称" ></el-table-column>
          <el-table-column prop="isImport" label="是否为重要标准" width="80"></el-table-column>
          <el-table-column prop="mendType" label="制/修订" ></el-table-column>
          <el-table-column prop="stageName" label="标准阶段" ></el-table-column>
          <el-table-column prop="stateName" label="状态" ></el-table-column>
          <el-table-column prop="standardType" label="类别" width="180"></el-table-column>
          <el-table-column prop="operateTime" label="发布时间" ></el-table-column>
          <el-table-column prop="operateUserName" label="发布人" ></el-table-column>
          <el-table-column fixed="right" label="操作" >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="showInfo(scope.row)"><i
                class="icon iconfont icon-chakan"></i> 查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="formPage.limit"
        :total="formPage.total">
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
   import {querystatsList} from 'api/standardAppliList/standardApproval/standardApproval'
   import 'api/standardAppliList/standardProject/setData.js'
   import { Message } from 'element-ui'
  export default {
    data(){
      return {
        options: [
          {
            value: '1',
            label: '通用标准',
            children: [
              {
                value: '1',
                label: '术语'
              },
              {
                value: '2',
                label: '技术规范'
              },
              {
                value: '3',
                label: '管理类'
              },
              {
                value: '4',
                label: '标准物质'
              },
              {
                value: '5',
                label: '标准样品'
              },
              {
                value: '6',
                label: '标签'
              },
              {
                value: '7',
                label: '代码'
              },
              {
                value: '8',
                label: '信息管理'
              }
            ]
          },
          {
            value: '3',
            label: '产品标准',
            children: [{
              value: '1',
              label: '原粮、油料'
            }, {
              value: '2',
              label: '成品粮油'
            }, {
              value: '3',
              label: '粮油制品'
            }, {
              value: '4',
              label: '饲料'
            }, {
              value: '5',
              label: '粮油机械',
              children: [{
                value: '1',
                label: '加工机械'
              },{
                value: '2',
                label: '输送机械'
              },{
                value: '3',
                label: '售粮机械'
              },{
                value: '4',
                label: '食品机械'
              }]
            }, {
              value: '7',
              label: '检测仪器'
            }, {
              value: '8',
              label: '包装材料'
            }]
          }, {
            value: '6',
            label: '方法标准',
            children: [
              {
                value: '1',
                label: '粮油检测方法'
              },
              {
                value: '2',
                label: '饲料检测方法'
              },
              {
                value: '3',
                label: '粮油机械测试方法'
              },
              {
                value: '4',
                label: '粮油仪器测试方法'
              }
            ]
          }
        ],
        selectedOptions: [],
        options1:[] ,
        options2:{0:'制定',1:'修订'} ,
        options3:{1:'未审批',2:'已审批',3:'驳回'} ,
        options4:{11:'标准立项-立项申请',12:'标准立项-SC初审',13:'标准立项-TC复审',14:'标准立项-国家局审核',21:'标准起草-标准起草',31:'征求意见-征集意见',41:'标准审查-SC审核',42:'标准审查-TC审核',51:'标准报批-TC复审',52:'标准报批-国家局审核',61:'标准发布-标准发布',71:'标准档案-标准档案' } ,
        mendType:'',
        proCname:'',
        state:'',
        stage:'',
        standardType:'',
        formPage: {
          page: 1,
          limit: 10,
          total: undefined,
        },
        tableData: [],
        userInfo:{
          userId: -1,
          loginToken: -1,
          realName: -1,
          sysgovname: -1,
        },   //登录人信息
      };
    },
    created(){
      const user = JSON.parse(window.sessionStorage.getItem('userInfo'));
      if(user){
        this.userInfo = user;
      }
      this.initInfo()
    },
    methods: {
      handleChange(value) {
        this.standardType = '';
        for (var i = 0; i < value.length; i++) {
          if (i + 1 == value.length) {
            this.standardType += value[i];
          }else{
            this.standardType += value[i] + '-';
          }
        }
        console.log(this.standardType);
      },
      //清空
      clearInfo(){
          this.stage = ''
          this.state = ''
          this.selectedOptions = []
          this.standardType = '';
          this.mendType = '';
          this.proCname = ''
          this.cbName = '';
          this.findInfo();
      },
      findInfo(){
        let data = {
          "userId": this.userInfo.userId,
          "loginToken": this.userInfo.loginToken,
          "pageNum": this.formPage.page,
          "pageSize": this.formPage.limit,
          'proCname' : this.proCname,
          'standardType' : this.standardType,
          'mendType' : this.mendType,
          // 'state' : this.state,
          'stage' : this.stage,
        }
        querystatsList(data).then(response => {
            for (var i = 0; i < response.data.list.length; i++) {
                response.data.list[i].mendType = response.data.list[i].mendType == 0? '制定':'修订';
                response.data.list[i].isImport = response.data.list[i].isImport == 0? '否':'是';
                if (this.options,response.data.list[i].standardType == null) {
                    continue;
                }
                response.data.list[i].standardType = mdata.getData(this.options,response.data.list[i].standardType);
            }
          this.tableData = response.data.list
          this.formPage.total = response.data.total
        })
      },
      initInfo(){
        let data = {
          "userId": this.userInfo.userId,
          "loginToken": this.userInfo.loginToken,
          // "type": this.type,
          "pageNum": this.formPage.page,
          "pageSize": this.formPage.limit,
        };
        querystatsList(data).then(response => {
            for (var i = 0; i < response.data.list.length; i++) {
                response.data.list[i].mendType = response.data.list[i].mendType == 0? '制定':'修订';
                response.data.list[i].isImport = response.data.list[i].isImport == 0? '否':'是';
                if (this.options,response.data.list[i].standardType == null) {
                    continue;
                }
                response.data.list[i].standardType = mdata.getData(this.options,response.data.list[i].standardType);
            }
          this.tableData = response.data.list;
          this.formPage.total = response.data.total
        })
      },
      typeIndex(index) {
        return index + (this.formPage.page - 1) * this.formPage.limit + 1;
      },
      handleCurrentChange(val) {
        this.formPage.page = val;
        let data = {
          "userId": this.userInfo.userId,
          "loginToken": this.userInfo.loginToken,
          'proCname' : this.proCname,
          'standardType' : this.standardType,
          'mendType' : this.mendType,
          // 'state' : this.state,
          'stage' : this.stage,
          // "type": this.type,
          "pageNum": val,
          "pageSize": this.formPage.limit
        };
        querystatsList(data).then(response => {
            for (var i = 0; i < response.data.list.length; i++) {
                response.data.list[i].mendType = response.data.list[i].mendType == 0? '制定':'修订';
                response.data.list[i].isImport = response.data.list[i].isImport == 0? '否':'是';
                if (this.options,response.data.list[i].standardType == null) {
                    continue;
                }
                response.data.list[i].standardType = mdata.getData(this.options,response.data.list[i].standardType);
            }
          this.tableData = response.data.list
          this.formPage.total = response.data.total
        });
      },
      showInfo(row){
        this.$router.push({path: '/statisticsSearchDetail', query:{projId: row.projId}})
      }

    }
  }
</script>

<style scoped>
  .tab-toolbar {
    margin: 25px 0;
  }
  .content-table{
    padding-top: 20px;
    border-top: 1px solid #dcdfe6 ;
  }
  .search-row {
    margin-bottom: 10px;
  }
  .search-row .span-width {
    width: 70px;
    display: inline-block;
    text-align: right;
  }
  .search-width {
   width: 200px;
  }
</style>
