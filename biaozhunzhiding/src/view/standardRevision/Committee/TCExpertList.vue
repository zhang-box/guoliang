<template>
  <div class="content-wrapper">
    <h3 class="h3"><i class="icon iconfont icon-liebiao"></i> TC专家管理列表</h3>
    <div class="content-main">
      <div class="tab-toolbar">
        <div class="search-row">
          <div class="mar-l-30 span-width">聘书编号：</div>
          <el-input class="search-width" v-model="appointNum"></el-input>
          <div class="mar-l-30 span-width">姓名：</div>
          <el-input class="search-width" v-model="name"></el-input>
          <el-button  type="primary" icon="icon iconfont icon-chaxun" class="mar-l-30" @click="search"> 查询</el-button>
          <el-button type="primary" icon="icon iconfont icon-qingkong" class="mar-l-30 button-let" @click="clear"> 清空</el-button>
          <el-button  type="primary" icon="icon iconfont icon-chaxun" class="mar-l-30" @click="add"> 新增</el-button>
        </div>

      </div>
      <div class="content-table">
        <el-table :data="tableData" class="table1" stripe="" style="width: 100%">

          <el-table-column type="index" :index="typeIndex" label="序号" width="60"></el-table-column>
          <el-table-column prop="name" label="姓名" width="130"></el-table-column>
          <el-table-column prop="committee" label="委员会名称"></el-table-column>
          <el-table-column prop="workUnit" label="工作单位" width="200"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="email" label="电子邮箱" width="200"></el-table-column>
          <el-table-column prop="appointNum" label="聘书编号"></el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="updateItemInfo(scope.row)"><i
                class="icon iconfont icon-xiugai"></i> 编辑
              </el-button>
              <el-button type="text" size="small" @click="del(scope.row)"><i
                class="icon iconfont icon-lajitong"></i> 删除
              </el-button>
              <el-button type="text" size="small" @click="showItemInfo(scope.row)"><i
                class="icon iconfont icon-chakan"></i> 详情
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
  import {expertList, expertDel} from 'api/standardAppliList/standardApproval/standardApproval'
  import { Message } from 'element-ui'
  export default {
    data() {
      return {
        rowData:'',
        appointNum:'',
        name:'',
        formPage:{
          page: 1,
          limit: 10,
          total:undefined,
        },
        tableData:[],
        userInfo:{
          userId: -1,
          loginToken: -1
        },   //登录人信息
      };
    },
    created(){
      const user = JSON.parse(window.sessionStorage.getItem('userInfo'));
      if(user){
        this.userInfo = user;
      }
      let data = {
        "userId": this.userInfo.userId,
        "loginToken": this.userInfo.loginToken,
        "scTc": 'TC',
        "pageNum": this.formPage.page,
        "pageSize": this.formPage.limit
      }
      expertList(data).then(response => {
        this.tableData = response.data.list
        this.formPage.total = response.data.total
      })
    },
    methods:{
      search(){
        let data = {
          "userId": this.userInfo.userId,
          "loginToken": this.userInfo.loginToken,
          "scTc": 'TC',
          "pageNum": this.formPage.page,
          "pageSize": this.formPage.limit,
          'appointNum' : this.appointNum,
          'name' : this.name
        };
        expertList(data).then(response => {
          this.tableData = response.data.list
          this.formPage.total = response.data.total
        })
      },
      clear(){
        this.appointNum = '';
        this.name = '';
      },
      handleCurrentChange(val) {
        this.page = val;
        this.formPage.page == val
        let data = {
          "userId": this.userInfo.userId,
          "loginToken": this.userInfo.loginToken,
          "scTc": 'TC',
          'appointNum' : this.appointNum,
          'name' : this.name,
          "pageNum":val,
          "pageSize":this.formPage.limit
        };
        expertList(data).then(response => {
          this.tableData = response.data.list
          this.formPage.total = response.data.total
        })
      },
      typeIndex(index) {
        return index + (this.formPage.page - 1) * this.formPage.limit + 1;
      },
      handleClose(done){
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});

      },
      add(){
        this.$router.push({name:'expertAdd',query:{type : 'add', returnType : 'TC'}})
      },
      showItemInfo(row){
        this.$router.push({name:'expertAdd2',query:{id:row.id, type : 'show', returnType : 'TC'}})
      },
      updateItemInfo(row){
        this.$router.push({name:'expertAdd1',query:{id:row.id,type : 'update', returnType : 'TC'}})
      },
      del(row){
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            'id' : row.id,
            'userName' : row.idCard
          };
          expertDel(data).then(response => {
            if (response.code == 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              let data = {
                "userId": this.userInfo.userId,
                "loginToken": this.userInfo.loginToken,
                "scTc": 'TC',
                "pageNum": this.formPage.page,
                "pageSize": this.formPage.limit
              };
              expertList(data).then(response => {
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
      }
    }

  }
</script>
