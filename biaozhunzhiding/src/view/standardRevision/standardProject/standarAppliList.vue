<template>
  <div class="content-wrapper">
    <div class="content-main">
      <div class="tab-toolbar">
        <div class="search-row">
          <div class="mar-l-30 span-width">项目名称：</div>
          <el-input v-model="proCname" class="search-width"></el-input>
          <div class="mar-l-30 span-width">标准类别：</div>
          <div class=""  style="display:inline-block;">
            <el-cascader style="width:260px;"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange">
          </el-cascader>
        </div>
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
          <el-button  type="primary" icon="icon iconfont icon-xinzeng" @click="addInfo" class="mar-l-30" > 新增</el-button>
          <el-button  type="primary" icon="icon iconfont icon-chaxun" @click="findInfo" class="mar-l-30"> 查询</el-button>
          <el-button type="primary" icon="icon iconfont icon-qingkong" class="mar-l-30 button-let" @click="clearInfo"> 清空</el-button>
        </div>
      </div>

      <div class="content-table">
        <el-table :data="tableData" class="table1" style="width: 100%; margin-top: 10px">
          <el-table-column type="index" :index="typeIndex" label="序号" ></el-table-column>
          <el-table-column prop="proCname" label="项目名称" ></el-table-column>
          <el-table-column prop="isImport" label="是否为重要标准" ></el-table-column>
          <el-table-column prop="mendType" label="制/修订" ></el-table-column>
          <el-table-column prop="standardType" label="标准类别" ></el-table-column>
          <el-table-column prop="operateTime" label="填写时间" ></el-table-column>
          <el-table-column prop="stateName" label="状态">
            <!-- <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.status | statusFilter}}</span>
            </template> -->
          </el-table-column>
          <el-table-column prop="applicantName" label="填写人" ></el-table-column>
          <el-table-column fixed="right" label="操作"  width="300">
            <template slot-scope="scope">
              <el-button type="text" size="small" v-if="scope.row.state == 1" @click="submitItemInfo(scope.row.projId,scope.row.id)"><i
                class="icon iconfont icon-tijiao"></i> 提交</el-button>
              <el-button type="text" size="small" v-if="scope.row.state == 1" @click="updateItemInfo(scope.row.projId,scope.row.id)"><i
                class="icon iconfont icon-xiugai"></i> 修改</el-button>
              <el-button type="text" size="small"  @click="showItemInfo(scope.row.projId)"><i
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
    </div>
  </div>
</template>

<script>
  import {applicationList,dataDictionary,insertProject,applicationDetail} from 'api/standardAppliList/standardProject/standardProject'
  import 'api/standardAppliList/standardProject/setData.js'
  import { Message } from 'element-ui'
  export default {
    data(){
      return {
    options:
        [
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
        options3:{1:'未提交',2:'已提交',3:'已通过',4:'驳回'} ,
        type: 133,
        proCname:'',
        standardType:'',
        mendType:'',
        state:'',
        // userId: '',
        // loginToken: '',
        formPage: {
          page: 1,
          limit: 10,
          total: undefined,
        },
        standardType:'',
        tableData: [],
        // proStandardType:'',
        proStandardTypeOptions:[],
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
      this.getdatalist()//获取列表数据
    },
    methods: {
      getdatalist(){
          let userId     = this.userId
          let loginToken = this.loginToken
          console.log(this.userInfo.loginToken)
          let data = {
              'pageNum':this.formPage.page,
              'pageSize':this.formPage.limit,
              "createUserId": this.userInfo.userId,
              'loginToken': this.userInfo.loginToken,
          }
          applicationList(this.userInfo.userId,this.userInfo.loginToken,data).then(res=>{
            if (res.code == 1) {
                for (var i = 0; i < res.data.list.length; i++) {
                    res.data.list[i].mendType = res.data.list[i].mendType == 0? '制定':'修订';
                    res.data.list[i].isImport = res.data.list[i].isImport == 0? '否':'是';
                    if (this.options,res.data.list[i].standardType == null) {
                        continue;
                    }
                    res.data.list[i].standardType = mdata.getData(this.options,res.data.list[i].standardType);
                }
                this.formPage.total = res.data.total
              this.tableData = res.data.list
            }
          }).catch( err=> {
    		      console.info( err );
          })
      },
      typeIndex(index) {
        return index + (this.formPage.page - 1) * this.formPage.limit + 1;
      },
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
          this.proCname = '';
          this.standardType = '';
          this.mendType = '';
          // this.proStandardType='';
          this.selectedOptions=[];
          this.state = '';
          this.findInfo();
      },
      findInfo(){
          let data = {};
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

          // if(this.proStandardType !== ''){
          //   data.proStandardType = this.proStandardType
          // }
          // console.log(data)
          applicationList(this.userInfo.userId,this.userInfo.loginToken,data).then(res=>{
              for (var i = 0; i < res.data.list.length; i++) {
                  res.data.list[i].mendType = res.data.list[i].mendType == 0? '制定':'修订';
                  res.data.list[i].isImport = res.data.list[i].isImport == 0? '否':'是';
                  if (this.options,res.data.list[i].standardType == null) {
                      continue;
                  }
                  res.data.list[i].standardType = mdata.getData(this.options,res.data.list[i].standardType);
              }
            this.tableData = res.data.list
            this.formPage.total = res.data.total
          })
      },
      addInfo: function () {
        this.$router.push({path: '/standarAppliDetail'});
      },
      // 提交
      submitItemInfo(proId,id){
          // 获取数据
          applicationDetail(proId,id).then(res=>{
              if (res.code == 1) {
                  res.data.operate = 2;
                  res.data.standardProjNewStageId = id
                  res.data.proId = proId
                  // 提交数据
                  insertProject(res.data).then(res=>{
                      if (res.code == 1) {
                          this.$message.success('提交成功')
                          // this.$router.push({path:'/standarAppliList'});
                          // window.history.go(0);
                          this.getdatalist()
                      }else{
                          this.$message.error(res.msg);
                      }
                  }).catch(err=>{

                  })
              }
          }).catch( err=> {
              console.info( err );
          })
        // this.$message.success('提交成功')
        // this.$router.push({path: '/standarAppliDetail', query:{info:row,type:'show'}})
      },
      updateItemInfo(proId,id = ''){
        this.$router.push({path: '/standarAppliDetail', query:{proId:proId,id:id,type:'update'}})
      },
      showItemInfo(row){
        this.$router.push({path: '/standarAppliDetail', query:{proId:row,type:'show'}})
      },
      initInfo(){
        let data = {
          "type": this.type,
          "pageNum": this.formPage.page,
          "pageSize": this.formPage.limit
        }
        applicationList(this.userInfo.userId,this.userInfo.loginToken,data).then(response => {
          this.tableData = response.data.list
          this.formPage.total = response.data.total
        })
      },
      //获取下拉列表信息
      getSelectInfo(){
        //制定/修订
        let mendTypeOptionsData = {
            "userId": this.userInfo.userId,
            "loginToken": this.userInfo.loginToken,
            'parentId':345
        };
        getSelectInfo(mendTypeOptionsData).then(res=>{
            this.mendTypeOptions = res.data
        });
       /* let data1 = {
          "userId": 1,
          "loginToken": 1,
          'parentId':337
        }
        getSelectInfo(data1).then(res=>{
          this.options1 = res.data;
        });*/
        let data2 = {
            "userId": this.userInfo.userId,
            "loginToken": this.userInfo.loginToken,
          'parentId':345
        }
        getSelectInfo(data2).then(res=>{
          this.options2 = res.data;
        });
        let data3 = {
            "userId": this.userInfo.userId,
        "loginToken": this.userInfo.loginToken,
          'parentId':393
        }
        getSelectInfo(data3).then(res=>{
          this.options3 = res.data;
        })
      },
      handleCurrentChange(val) {
        this.formPage.page = val
        let data = {
            "createUserId": this.userInfo.userId,
            "loginToken": this.userInfo.loginToken,
            "type": this.type,
            "proCname": this.proCname,
            "standardType": this.standardType,
            "mendType": this.mendType,
            "state": this.state,
            "pageNum": val,
            "pageSize": this.formPage.limit
        }
        // return false;
        applicationList(this.userInfo.userId,this.userInfo.loginToken,data).then(response => {
            for (var i = 0; i < response.data.list.length; i++) {
                response.data.list[i].mendType = response.data.list[i].mendType == 0? '制定':'修订';
                response.data.list[i].isImport = response.data.list[i].isImport == 0? '否':'是';
                if (this.options,response.data.list[i].standardType == null) {
                    continue;
                }
                response.data.list[i].standardType = mdata.getData(this.options,response.data.list[i].standardType);
            }
          this.tableData = response.data.list
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
    width: 80px;
    display: inline-block;
    text-align: right;
  }
  .search-width {
   width: 200px;
  }
</style>
