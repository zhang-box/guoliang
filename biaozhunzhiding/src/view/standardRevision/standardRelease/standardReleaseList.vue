<template>
  <div class="content-wrapper">
    <div class="content-main">
      <div class="tab-toolbar">
        <div class="search-row">
          <div class="mar-l-30 span-width">标准号：</div>
          <el-input v-model="standardNumber" class="search-width"></el-input>
          <div class="mar-l-30 span-width">标准名称：</div>
          <el-input v-model="proCname" class="search-width"></el-input>
          <div class="mar-l-30 span-width">发布时间：</div>
          <!-- <el-input v-model="publishTime" class="search-width"></el-input> -->
          <el-date-picker
          v-model="operateTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
          </el-date-picker>
        </div>
        <el-button  type="primary" icon="icon iconfont icon-chaxun" @click="findInfo" class="mar-l-30"> 查询</el-button>
        <el-button type="primary" icon="icon iconfont icon-qingkong" @click="clearInfo" class="mar-l-30 button-let" > 清空</el-button>
      </div>

      <div class="content-table">
        <!--<el-button type="primary"  @click="batchReview"> 发布</el-button>-->
        <!--<el-table :data="tableData" class="table1" style="width: 100%; margin-top: 10px"  @selection-change="handleSelectionChange">-->
        <el-table :data="tableData" class="table1" style="width: 100%; margin-top: 10px">
          <!--<el-table-column type="selection" width="60"></el-table-column>-->
          <el-table-column type="index" :index="typeIndex" label="序号" width="60"></el-table-column>
          <el-table-column prop="standardNumber" label="标准号" ></el-table-column>
          <el-table-column prop="proCname" label="标准名称" ></el-table-column>
          <el-table-column prop="isImport" label="是否为重要标准" ></el-table-column>
          <el-table-column prop="briefDescription" label="标准简要信息" width="180"></el-table-column>
          <el-table-column prop="releaseTime" label="发布时间" ></el-table-column>
          <el-table-column prop="implementTime" label="实施时间" ></el-table-column>
          <el-table-column fixed="right" label="操作" >
            <template slot-scope="scope">
             <el-button type="text" size="small" v-if="scope.row.state != 1" @click="updateItemInfo(scope.row)"><i
                    class="icon iconfont icon-xiugai"></i> 编辑</el-button>
              <el-button type="text" size="small" @click="showItemInfo(scope.row)"><i
                class="icon iconfont icon-chakan"></i> 查看
              </el-button>
              <el-button type="text" size="small" v-if="scope.row.state != 1" @click="submitItemInfo(scope.row)"><i
                class="icon iconfont icon-tijiao"></i> 发布</el-button>
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
  import {standardReleaseList,dataDictionary,batchConfirmationRelease} from 'api/standardAppliList/standardProject/standardProject'
  import 'api/standardAppliList/standardProject/setData.js'
  import { Message } from 'element-ui'
  export default {
    data(){
      return {
         Items:'',//被选中的id
         operateUserName:'',
         // userId:1,
         // loginToken:1,
         standardNumber:'',
         proCname:'',
         operateTime:'',
        type: 133,
        value:'',
        standardNo:'',
        cbName:'',
        publishTime:'',
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
      standardReleaseList(this.userInfo.userId,this.userInfo.loginToken).then(res=>{
          if (res.code == 1) {
              for (var i = 0; i < res.data.list.length; i++) {
                  res.data.list[i].isImport = res.data.list[i].isImport == 0? '否':'是';
                  if (this.options,res.data.list[i].standardType == null) {
                      continue;
                  }
                  res.data.list[i].standardType = mdata.getData(this.options,res.data.list[i].standardType);
              }
              this.formPage.total = res.data.total
              this.tableData = res.data.list
          }
      }).catch(err=>{
          console.info( err );
      })
    },
    methods: {
        handleSelectionChange(val){
            this.Items = '';
            for (var i = 0; i < val.length; i++) {
                if (val[i].state == 2) {
                    continue;
                }
                if (i == val.length -1) {
                    this.Items += val[i].projId
                }else{
                    this.Items += val[i].projId+','
                }
            }
        },
        batchReview(){
            let data = {};
            data["userId"] = this.userInfo.userId
            data["loginToken"] = this.userInfo.loginToken
            data["projIds"] = this.Items
            data["operateUserName"] = this.userInfo.realName
            batchConfirmationRelease(data).then(res=>{
                if (res.code == 1) {
                    var msg = '发布成功';
                    this.$message.success(msg);
                    standardReleaseList(this.userInfo.userId,this.userInfo.loginToken).then(res=>{
                        this.tableData = res.data.list
                    }).catch(err=>{
                        console.info( err );
                    })
                }
            }).catch(err=>{

            })
        },
        addInfo: function () {
          this.$router.push({name: "standardReleaseDetail"});
        },
        showItemInfo(row){
          this.$router.push({name: "standardReleaseDetail", query:{proId:row.projId,times:row.times,id:row.id,type:'show'}})
        },
        updateItemInfo(row){
          this.$router.push({name: "standardReleaseDetail", query:{proId:row.projId,times:row.times,id:row.id,type:'update'}})
        },
        submitItemInfo(row){
          this.$router.push({name: "standardReleaseDetail", query:{proId:row.projId,times:row.times,id:row.id,type:'review'}})
        },
      //清空
      clearInfo(){
          this.standardNumber = '';
          this.proCname = '';
          this.operateTime = '';
          this.findInfo();
      },
      findInfo(){
          const data = {};
          if(this.standardNumber !== ''){
            data.standardNumber = this.standardNumber
          }
          if(this.proCname !== ''){
            data.proCname = this.proCname
          }
          if(this.operateTime !== ''){
            data.operateTime = this.operateTime
          }
          // console.log(data)
          standardReleaseList(this.userInfo.userId,this.userInfo.loginToken,data).then(res=>{
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
          })
      },

      initInfo(){
        let data = {
            'userId': this.userInfo.userId,
            'loginToken': this.userInfo.loginToken,
          "type": this.type,
          "pageNum": this.formPage.page,
          "pageSize": this.formPage.limit
        }
        standardReleaseList(data).then(response => {
          this.tableData = response.data.list
          this.formPage.total = response.data.total
        })
      },

      typeIndex(index) {
        return index + (this.formPage.page - 1) * this.formPage.limit + 1;
      },
      handleCurrentChange(val) {
        this.formPage.page = val
        let data = {
            "type": this.type,
            "proCname": this.proCname,
            "standardNumber": this.standardNumber,
            "operateTime": this.operateTime,
            "pageNum": val,
            "pageSize": this.formPage.limit
        }
        standardReleaseList(this.userInfo.userId,this.userInfo.loginToken,data).then(response => {
            if (response.code == 1) {
                for (var i = 0; i < response.data.list.length; i++) {
                    response.data.list[i].mendType = response.data.list[i].mendType == 0? '制定':'修订';
                    response.data.list[i].isImport = response.data.list[i].isImport == 0? '否':'是';
                    if (this.options,response.data.list[i].standardType == null) {
                        continue;
                    }
                    response.data.list[i].standardType = mdata.getData(this.options,response.data.list[i].standardType);
                }
                this.formPage.total = response.data.total
                this.tableData = response.data.list
            }
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
