<template>
  <div class="content-wrapper">
    <div class="content-main">
      <div class="tab-toolbar">
        <div class="search-row">
          <div class="mar-l-30 span-width">项目名称：</div>
          <el-input v-model="proCname" class="search-width"></el-input>
          <div class="mar-l-30 span-width">标准类别：</div>
          <div v-model="standardType" class="search-width" style="display:inline-block;">
            <el-cascader
              :options="options"
              v-model="selectedOptions"
              @change="handleChange">
            </el-cascader>
          </div>
          <!-- <el-select v-model="standardType" class="search-width" placeholder="请选择">
            <el-option
              v-for="item in options1"
              :key="item.id"
              :label="item.dictValue"
              :value="item.dictValue">
            </el-option>
          </el-select> -->
        </div>
        <div class="search-row">
          <div class="mar-l-30 span-width">制/修订：</div>
          <el-select v-model="mendType" class="search-width" placeholder="请选择">
            <el-option
              v-for="(item,index) in options2"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
          <div class="mar-l-30 span-width">状态：</div>
          <el-select v-model="state" class="search-width" placeholder="请选择">
            <el-option
              v-for="(item,index) in options3"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
          <el-button  type="primary" icon="icon iconfont icon-chaxun" @click="findInfo" class="mar-l-30"> 查询</el-button>
          <el-button type="primary" icon="icon iconfont icon-qingkong" class="mar-l-30 button-let" @click="clearInfo"> 清空</el-button>
        </div>
      </div>

      <div class="content-table">
        <el-table :data="tableData" class="table1" style="width: 100%; margin-top: 10px">
          <el-table-column type="index" :index="typeIndex" label="序号" width="60"></el-table-column>
          <el-table-column prop="proCname" label="项目名称" ></el-table-column>
          <el-table-column prop="isImport" label="是否为重要标准" >
            <template slot-scope="scope">
              <template v-if="scope.row.isImport == 1">
                 是
              </template>
              <template v-else>
                 否
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="mendType" label="制/修订" width="80">
            <template slot-scope="scope">
              <template v-if="scope.row && scope.row.mendType == '1'">
                修订
              </template>
              <template v-if="scope.row && scope.row.mendType == '0'">
                制定
              </template>
            </template>

          </el-table-column>

          <el-table-column prop="zxDepartment" label="执行单位" width="100"></el-table-column>
          <el-table-column prop="endTime" label="截止日期" ></el-table-column>
          <el-table-column prop="stateName" label="状态" width="100">
            <!-- <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.status | statusFilter}}</span>
            </template> -->
          </el-table-column>
          <el-table-column fixed="right" label="操作" >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="updateItemInfo(scope.row)" v-if="scope.row.state!=2"><i
                class="icon iconfont icon-xiugai"></i> 编辑</el-button>
              <el-button type="text" size="small" @click="showItemInfo(scope.row)"><i
                class="icon iconfont icon-chakan"></i> 查看
              </el-button>
            </template>
          </el-table-column>
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
      <!-- <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="formPage.limit"
        :total="formPage.total">
      </el-pagination> -->
    </div>
  </div>
</template>

<script>
  // import {
  //   warningList,
  //   warningDelete
  // } from 'api/oldCadre/adminManage'
  import {standardDraftQueryList,standardDraftReview} from 'api/standardAppliList/standardDrafting/standardDrafting'
  export default {
    // filters: {
    //   statusFilter: function (value) {
    //     if (value === 394) return '未提交'
    //     else if(value === 395) return '已提交'
    //     else if(value === 396) return '驳回'
    //   }
    // },
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
        }],
        selectedOptions:[],
        options2:{0:'制定',1:'修订'} ,
        options3:{1:'待执行',2:'未提交',3:'已提交'} ,
        type: 21,
        proCname:'',
        standardType:'',
        mendType:'',
        state:'',
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
      this.initInfo();
      // this.getSelectInfo();
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
      typeIndex(index) {
        return index + (this.formPage.page - 1) * this.formPage.limit + 1;
      },
      //清空
      clearInfo(){
          this.proCname = '';
          this.standardType = '';
          this.mendType = '';
          this.state = '';
          this.findInfo();
      },
      findInfo(){
          const data = {};
          if(this.proCname !== ''){
            data.proCname = this.proCname
          }
          if(this.standardType !== ''){
            data.standardType = this.standardType
          }
          if(this.mendType !== ''){
            data.mendType = this.mendType
          }
          if(this.state !== ''){
            data.state = this.state
          }
          // console.log(data)
         standardDraftQueryList(data).then(res=>{
            this.tableData = res.data.list
            this.formPage.total = res.data.total
          })
      },
      addInfo: function () {
        this.$router.push({path: '/drugDetail'});
      },
      showItemInfo(row){
        let { projId,state,times,id } = row
        this.$router.push({name: "standarDraftingDetail", query:{projId,state,times,id,type:'show'}})
      },
      updateItemInfo(row){

        let { projId,state,times,id } = row
        this.$router.push({name: "standarDraftingDetail", query:{projId,state,times,id,type:'update'}})
      },
      initInfo(){
        let data = {
          "createUserId": this.userInfo.userId,
          // "userId": this.userInfo.userId,
          "loginToken": this.userInfo.loginToken,
          "type": this.type,
          "pageNum": this.formPage.page,
          "pageSize": this.formPage.limit
        }
        standardDraftQueryList(data).then(response => {
          this.tableData = response.data.list
          this.formPage.total = response.data.total
        })
      },
      // 获取下拉列表信息
      // dataDictionary(){
      //   //制定/修订
      //   alert(111)
      //   let mendTypeOptionsData = {
      //       "userId":1,
      //       'loginToken':1,
      //       'parentId':345
      //   };
      //   dataDictionary(mendTypeOptionsData).then(res=>{
      //       this.mendTypeOptions = res.data
      //       console.log(this.mendTypeOptions)
      //   });
      //   // let data1 = {
      //   //   "userId": 1,
      //   //   "loginToken": 1,
      //   //   'parentId':337
      //   // }
      //   // getSelectInfo(data1).then(res=>{
      //   //   this.options1 = res.data;
      //   // });
      //   let data2 = {
      //     "userId": 1,
      //     "loginToken": 1,
      //     'parentId':345
      //   }
      //   dataDictionary(data2).then(res=>{
      //     this.options2 = res.data;
      //   });
      //   let data3 = {
      //     "userId": 1,
      //     "loginToken": 1,
      //     'parentId':393
      //   }
      //   dataDictionary(data3).then(res=>{
      //     this.options3 = res.data;
      //   })
      // },
      handleCurrentChange(val) {
        this.formPage.page = val
        let data = {
          "userId": this.userInfo.userId,
          "loginToken": this.userInfo.loginToken,
          "type": this.type,
          "pageNum": val,
          "pageSize": this.formPage.limit,
          "proCname": this.proCname,
          "standardType": this.standardType,
          "mendType": this.mendType,
          "state": this.state,
        }
       standardDraftQueryList(data).then(response => {
          this.tableData = response.data.list
          this.formPage.total = response.data.total
        })
      },

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
