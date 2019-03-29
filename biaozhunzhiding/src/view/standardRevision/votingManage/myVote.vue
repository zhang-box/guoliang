<template>
  <div class="content-wrapper">
    <div class="content-main">
      <div class="tab-toolbar">
        <div class="search-row">
          <div class="mar-l-30 span-width">标题：</div>
          <el-input v-model="formSearch.title" class="search-width"></el-input>
          <div class="mar-l-30 span-width">投票状态：</div>
          <el-select v-model="formSearch.status" class="search-width">
            <el-option v-for="item in optionStatus" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
          <el-button  type="primary" icon="icon iconfont icon-chaxun" @click="searchList" class="mar-l-30"> 查询</el-button>
          <el-button type="primary" icon="icon iconfont icon-qingkong" class="mar-l-30 button-let" @click="clear"> 清空</el-button>
        </div>
      </div>

      <div class="content-table">
        <el-table :data="tableData" class="table1" style="width: 100%; margin-top: 10px">
          <el-table-column type="index" :index="typeIndex" label="序号" width="60"></el-table-column>
          <el-table-column prop="title" label="标题" ></el-table-column>
          <el-table-column prop="isImport" label="是否为重要标准" >
            <template slot-scope="scope">
              <template v-if="scope.row.isImport == 1">
                是
              </template>
              <template v-else-if="scope.row.isImport == 0">
                否
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="endTime" label="截止时间" ></el-table-column>
          <el-table-column prop="informType" label="通知方式" width="150">
            <template slot-scope="scope">
              <template v-if="scope.row.informType == '1'">
                邮件
              </template>
              <template v-if="scope.row.informType == '2'">
                短信
              </template>
              <template v-if="scope.row.informType == '3'">
                邮件+短信
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="voteStatus" label="投票状态" ></el-table-column>
          <el-table-column fixed="right" label="操作" >
            <template slot-scope="scope">
              <template v-if="(scope.row.isAllowModify == '1' && scope.row.isStop == 1) || (scope.row.isAllowModify == '2' && scope.row.voteStatus == '未投票') ">
                <el-button type="text" size="small" @click="updateItemInfo(scope.row)"><i
                  class="icon iconfont icon-toupiao"></i> 投票</el-button>
              </template>
              <el-button type="text" size="small" @click="showItemInfo(scope.row)"><i
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
  // import {
  //   warningList,
  //   warningDelete
  // } from 'api/oldCadre/adminManage'
  import {myVoteList} from 'api/standardAppliList/voteManage/vote_zj'
  export default {
    data(){
      return {
        formSearch : {
          title : '',
          status : '',
        },
        optionStatus:[{
          value : '1',
          label : '待启动'
        }, {
          value : '2',
          label : '进行中'
        }, {
          value : '3',
          label : '已结束'
        }],
        // type: 133,
        value:'',
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
      addInfo: function () {
        this.$router.push({path: '/myVoteDetail'});
      },
      showItemInfo(row){
        this.$router.push({name: "myVoteDetailView", query: {row : row, type : 'myVote'}})
      },
      updateItemInfo(row){
        this.$router.push({name: "myVoteDetail", params: row})
      },
      initInfo(){
        let data = {
          "userId": this.userInfo.userId,
          "loginToken": this.userInfo.loginToken,
        }
        myVoteList(data).then(response => {
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
          "userId": this.userInfo.userId,
          "loginToken": this.userInfo.loginToken,
          // "type": this.type,
          'title' : this.formSearch.title,
          'status' : this.formSearch.status,
          "pageNum": val,
          "pageSize": this.formPage.limit
        };
        myVoteList(data).then(response => {
          this.tableData = response.data.list
          this.formPage.total = response.data.total
        })
      },
      searchList(){
        let data = {
          "userId": this.userInfo.userId,
          "loginToken": this.userInfo.loginToken,
          'title' : this.formSearch.title,
          'status' : this.formSearch.status,
          "pageNum": 1,
          "pageSize": this.formPage.limit
        };

        myVoteList(data).then(response => {
          this.tableData = response.data.list;
          this.formPage.total = response.data.total
        })
      },
      clear(){
        this.formSearch.title = '';
        this.formSearch.status = '';
        this.searchList();
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
