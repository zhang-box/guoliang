<template>
  <div class="content-wrapper">
    <div class="content-main">
      <div class="tab-toolbar">
        <div class="search-row">
          <div class="mar-l-30 span-width">标准名称：</div>
          <el-input v-model="proCname" class="search-width"></el-input>
          <div class="mar-l-30 span-width">标准类型：</div>
              <div class=""  style="display:inline-block;">
                <el-cascader style="width:260px;"
                :options="options"
                v-model="selectedOptions"
                @change="handleChange">
              </el-cascader>
            </div>
          <div class="mar-l-30 span-width">制/修订：</div>
          <el-select v-model="mendType" class="search-width" placeholder="请选择">
            <el-option
              v-for="(item,index) in options2"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>

        </div>
        <el-button  type="primary" icon="icon iconfont icon-chaxun" @click="findInfo" class="mar-l-30"> 查询</el-button>
        <el-button type="primary" icon="icon iconfont icon-qingkong" @click="clearInfo" class="mar-l-30 button-let"> 清空</el-button>
      </div>

      <div class="content-table">
        <el-table :data="tableData" class="table1" style="width: 100%; margin-top: 10px">
          <el-table-column type="selection" width="60"></el-table-column>
          <el-table-column type="index" :index="typeIndex" label="序号" width="60"></el-table-column>
          <el-table-column prop="standardNumber" label="标准号" ></el-table-column>
          <el-table-column prop="proCname" label="标准名称" ></el-table-column>
          <el-table-column prop="isImport" label="是否为重要标准" ></el-table-column>
          <el-table-column prop="mendType" label="制/修订" width="180"></el-table-column>
          <el-table-column prop="releaseTime" label="发布时间" ></el-table-column>
          <el-table-column prop="implementTime" label="实施时间" ></el-table-column>
          <el-table-column prop="operateUserName" label="负责人" width="180"></el-table-column>
          <el-table-column prop="zxDepartment" label="执行单位" ></el-table-column>
          <el-table-column fixed="right" label="操作" >
            <template slot-scope="scope">
              <!-- <el-button type="text" size="small" @click="updateItemInfo(scope.row)"><i
                class="icon iconfont icon-xiugai"></i> 编辑</el-button> -->
              <el-button type="text" size="small" @click="showItemInfo(scope.row)"><i
                class="icon iconfont icon-chakan"></i> 查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- <el-pagination
        background
        layout="total,prev, pager, next"
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
   // import {
  //   warningList,
  //   warningDelete
  // } from 'api/oldCadre/adminManage'
  // import {selectList,getSelectInfo} from 'api/standardAppliList/voteManage/vote'
  import {standardFileList,dataDictionary} from 'api/standardAppliList/standardProject/standardProject'
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
        // userId:1,
        // loginToken:1,
        type: 133,
        selectedOptions: [],
        options2:{0:'制定',1:'修订'} ,
        value:'',
        standardType:'',
        mendType:'',
        proCname:'',
        standardTypeOptions:[],
        mendTypeOptions:[],
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
      // this.initInfo()
      // this.getSelectInfo()
      standardFileList(this.userInfo.userId,this.userInfo.loginToken).then(res=>{
          for (var i = 0; i < res.data.list.length; i++) {
              res.data.list[i].mendType = res.data.list[i].mendType == 0? '制定':'修订';
              res.data.list[i].isImport = res.data.list[i].isImport == 0? '否':'是';
          }
          this.tableData = res.data.list
          this.formPage.total = res.data.total
      }).catch(res=>{
          console.info(err)
      })
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
          this.selectedOptions = [];
          this.mendType = '';
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
          // console.log(data)
          standardFileList(this.userInfo.userId,this.userInfo.loginToken,data).then(res=>{
            for (var i = 0; i < res.data.list.length; i++) {
              res.data.list[i].mendType = res.data.list[i].mendType == 0? '制定':'修订';
              res.data.list[i].isImport = res.data.list[i].isImport == 0? '否':'是';
            }
            this.tableData = res.data.list
            this.formPage.total = res.data.total
          })
      },
      addInfo: function () {
        this.$router.push({path: '/drugDetail'});
      },
      showItemInfo(row){
        this.$router.push({name: "standardFileDetail", query:{projId:row.projId,times:row.times,id:row.id,type:'show'}})
      },
      updateItemInfo(row){
        this.$router.push({name: "standardFileDetail", params: row})
      },
      initInfo(){
        let data = {
          "type": this.type,
          "pageNum": this.formPage.page,
          "pageSize": this.formPage.limit
        }
        standardFileList(this.userInfo.userId,this.userInfo.loginToken,data).then(response => {
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
      getSelectInfo(){
        //制定/修订
        // let mendTypeOptionsData = {
        //     "userId":1,
        //     'loginToken':1,
        //     'parentId':345
        // };
        // getSelectInfo(mendTypeOptionsData).then(res=>{
        //     this.mendTypeOptions = res.data
        // })
        // //采标类型
        // let cbTypeOptionsData = {
        //     "userId":1,
        //     'loginToken':1,
        //     'parentId':348
        // };
        // getSelectInfo(cbTypeOptionsData).then(res=>{
        //     this.cbTypeOptions = res.data
        // })
        // //标准类型
        // let standardTypeOptionsData = {
        //     "userId":1,
        //     'loginToken':1,
        //     'parentId':337
        // };
        // getSelectInfo(standardTypeOptionsData).then(res=>{
        //     this.standardTypeOptions = res.data
        // })
        // //项目周期
        // let projectCycleOptionsData = {
        //     "userId":1,
        //     'loginToken':1,
        //     'parentId':358
        // };
        // getSelectInfo(projectCycleOptionsData).then(res=>{
        //     this.projectCycleOptions = res.data
        // })
        // //是否采用快速程序
        // let column1OptionsData = {
        //     "userId":1,
        //     'loginToken':1,
        //     'parentId':362
        // };
        // getSelectInfo(column1OptionsData).then(res=>{
        //     this.column1Options = res.data
        // })
        // //标准类别
        // let proStandardTypeOptionsData = {
        //     "userId":1,
        //     'loginToken':1,
        //     'parentId':371
        // };
        // getSelectInfo(proStandardTypeOptionsData).then(res=>{
        //     this.proStandardTypeOptions = res.data
        // })
        // //是否有国家级科研项目支撑
        // let hasNationalOptionsData = {
        //     "userId":1,
        //     'loginToken':1,
        //     'parentId':387
        // };
        // getSelectInfo(hasNationalOptionsData).then(res=>{
        //     this.hasNationalOptions = res.data
        // })
        // //是否涉及专利
        // let hasPatentOptionsData = {
        //     "userId":1,
        //     'loginToken':1,
        //     'parentId':390
        // };
        // getSelectInfo(hasPatentOptionsData).then(res=>{
        //     this.hasPatentOptions = res.data
        // })

      },
      handleCurrentChange(val) {
        this.formPage.page = val
        let data = {
            "type": this.type,
            "proCname": this.proCname,
            "mendType": this.mendType,
            "standardType": this.standardType,
            "pageNum": val,
            "pageSize": this.formPage.limit
        }
        standardFileList(this.userInfo.userId,this.userInfo.loginToken,data).then(response => {
            for (var i = 0; i < response.data.list.length; i++) {
                response.data.list[i].mendType = response.data.list[i].mendType == 0? '制定':'修订';
                response.data.list[i].isImport = response.data.list[i].isImport == 0? '否':'是';
                if (this.options,response.data.list[i].standardType == null) {
                    continue;
                }
                response.data.list[i].standardType = mdata.getData(this.options,response.data.list[i].standardType);
            }
          this.tableData = response.data.list
          this.formPage.total = res.data.total
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
