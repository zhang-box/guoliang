<template>
  <div class="content-wrapper">
    <div class="content-main">
      <div class="tab-toolbar">
        <div class="search-row">
          <div class="mar-l-30 span-width">用户编码：</div>
          <el-input v-model="searchForm.usercode" class="search-width"></el-input>
          <div class="mar-l-30 span-width">用户类型：</div>
          <el-select placeholder="请选择" @change="selectCity" v-model="searchForm.userkind">
            <el-option
              v-for="item in userTypeOptions"
              :key="item.dictId"
              :label="item.typeDesc"
              :value="item.dictId">
            </el-option>
          </el-select>
          <div class="mar-l-30 span-width">姓名：</div>
          <el-input v-model="searchForm.userName" class="search-width"></el-input>
          <el-button  type="primary" icon="icon iconfont icon-chaxun" class="mar-l-30" @click="search"> 查询</el-button>
          <el-button type="primary" icon="icon iconfont icon-qingkong" class="mar-l-30 button-let" @click="clearSearchForm"> 清空</el-button>
        </div>
      </div>
      <div class="content-table">
        <el-table :data="tableData" class="table1" style="width: 100%; margin-top: 10px">
          <el-table-column type="index" :index="typeIndex" label="序号" width="60"></el-table-column>
          <el-table-column prop="usercode" label="用户编号"></el-table-column>
          <el-table-column prop="userkind" label="用户类型" ></el-table-column>
          <el-table-column prop="realname" label="姓名" width="100"></el-table-column>
          <el-table-column prop="idnumber" label="身份证号码" width="180"></el-table-column>
          <el-table-column prop="userunit" label="行政单位" width="100"></el-table-column>
          <el-table-column prop="userEmail" label="邮箱" width="150"></el-table-column>
          <el-table-column prop="phoneNumber" label="手机" width="120"></el-table-column>
          <el-table-column prop="phoneNumber" label="电话" width="120"></el-table-column>
          <el-table-column prop="wechat" label="微信" width="120"></el-table-column>
          <el-table-column prop="qq" label="QQ" width="120"></el-table-column>
          <el-table-column prop="city" label="地区" width="100"></el-table-column>
          <el-table-column fixed="right" label="操作" >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="updateItemInfo(scope.row)"><i
                class="icon iconfont icon-xiugai"></i> 修改
              </el-button>
              <el-button type="text" size="small" @click="del(scope.row)"><i
                class="icon iconfont icon-lajitong"></i> 删除
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
  import {userType} from 'api/standardAppliList/standardApproval/standardApproval'
  import {registrantList, registrantDelete} from 'api/standardAppliList/registrant/registrant'
  export default {
    data(){
      return {
        searchForm:{
          usercode : '',
          userkind : '',
          userName : ''
        },
        userTypeOptions:[],
        type: 133,
        value:'',
        formPage: {
          page: 1,
          limit: 10,
          total: undefined,
        },
        tableData: [],
        userInfo:{},   //登录人信息
      };
    },
    created(){
      this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
      userType('biaozhun_user_type').then(response=>{
        this.userTypeOptions = response.data
      }).catch(err=>{

      })
      registrantList().then(response => {
        this.tableData = response.data.list
        this.formPage.total = response.data.total
      })
    // }
      // this.initInfo()
    },
    methods: {
      clearSearchForm(){
        this.searchForm.usercode = '';
        this.searchForm.userkind = '';
        this.searchForm.userName = '';
      },
      search(){
        registrantList(this.searchForm).then(response => {
          this.tableData = response.data.list
          this.formPage.total = response.data.total
        })
      },
      del(row){
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            'userName' : row.userName
          };
          registrantDelete(data).then(response => {
            if (response.code == 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              registrantList().then(response => {
                this.tableData = response.data.list
                this.formPage.total = response.data.total
              })
            }else{
              this.$message({
                type: 'error',
                message: '删除异常!'
              });
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        })
      },
      showItemInfo(row){
        this.$router.push({name: "registrantUpdate", params: {id: row.id, type: 'show'}});
      },
      updateItemInfo(row){
        this.$router.push({name: "registrantUpdate", params: {row: row, type: 'update'}})
      },
      // initInfo(){
      //   registrantList(data).then(response => {
      //     this.tableData = response.data.list
      //     this.formPage.total = response.data.total
      //   })
      // },
      handleCurrentChange(val) {
        this.formPage.page = val
        let data = {
          "usercode": this.searchForm.usercode,
          "userkind": this.searchForm.userkind,
          "userName": this.searchForm.userName,
          "pageNum": val,
          "pageSize": this.formPage.limit
        }
        registrantList(data).then(response => {
          this.tableData = response.data.list
          this.formPage.total = response.data.total
        })
      },
      typeIndex(index) {
        return index + (this.formPage.page - 1) * this.formPage.limit + 1;
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
