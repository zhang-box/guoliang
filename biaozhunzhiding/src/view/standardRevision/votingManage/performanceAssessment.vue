<template>
  <div class="content-wrapper">
    <div class="content-main">
      <div class="tab-toolbar">
        <div class="search-row">
          <div class="mar-l-30 span-width">委员姓名：</div>
          <el-input v-model="name" class="search-width"></el-input>
          <div class="mar-l-30 span-width">开始时间：</div>
          <el-date-picker
            v-model="startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择开始日期">
          </el-date-picker>
          <div class="mar-l-30 span-width">结束时间：</div>
          <el-date-picker
            v-model="endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择结束日期"
            :picker-options="pickerOptions1">
          </el-date-picker>
        </div>
        <el-button  type="primary" icon="icon iconfont icon-chaxun" class="mar-l-30" @click="search"> 查询</el-button>
        <el-button type="primary" icon="icon iconfont icon-qingkong" class="mar-l-30 button-let" @click="clear"> 清空</el-button>
      </div>

      <div class="content-table">
        <el-table :data="tableData" class="table1" style="width: 100%; margin-top: 10px">
          <el-table-column type="index" :index="typeIndex" label="序号" width="60"></el-table-column>
          <el-table-column prop="userName" label="委员姓名" ></el-table-column>
          <el-table-column prop="allCount" label="应参与投票次数" ></el-table-column>
          <el-table-column prop="partCount" label="实际参与投票次数" >
            <template slot-scope="scope">
              <template v-if="scope.row.partCount">
                {{scope.row.partCount}}
              </template>
              <template v-else>
                 0
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="nopartCount" label="未参与投票次数" >
            <template slot-scope="scope">
              <template v-if="scope.row.nopartCount">
                {{scope.row.nopartCount}}
              </template>
              <template v-else>
                0
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="参与率" >
            <template slot-scope="scope">
              <!--<template v-if="(parseInt(scope.row.partCount / scope.row.allCount)*100) <= 100">-->
                <!-- -100%-->
              <!--</template>-->
              <!--<template v-else>-->
                {{parseInt(scope.row.partCount / scope.row.allCount)*100}}  %
              <!--</template>-->
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
  import {memberVoteList} from 'api/standardAppliList/voteManage/vote_zj'
  export default {
    data(){
      return {
        pickerOptions1: {
          disabledDate: (time) => {
            return time.getTime() < Date.parse(this.startTime) - 8.64e7;
          }
        },
        // type: 133,
        value:'',
        formPage: {
          page: 1,
          limit: 10,
          total: undefined,
        },
        name : '',
        startTime : null,
        endTime : null,
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
      search(){
        let data = {
          "userId": this.userInfo.userId,
          "loginToken": this.userInfo.loginToken,
          'name' : this.name,
          'startTime' : this.startTime,
          'endTime' : this.endTime,
          "pageNum": 1,
          "pageSize": this.formPage.limit
        };
        memberVoteList(data).then(response => {
          this.tableData = response.data
          this.formPage.total = response.data.total
        })
      },
      clear(){
        this.name = '';
        this.startTime = '';
        this.endTime = '';
        this.initInfo();
      },
      initInfo(){
        memberVoteList().then(response => {
          this.tableData = response.data;
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
          // "type": this.type,
          'name' : this.name,
          'startTime' : this.startTime,
          'endTime' : this.endTime,
          "pageNum": val,
          "pageSize": this.formPage.limit
        };
        memberVoteList(data).then(response => {
          this.tableData = response.data
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
