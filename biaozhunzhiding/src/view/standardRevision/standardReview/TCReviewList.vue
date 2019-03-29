<template>
  <div class="content-wrapper">
    <div class="content-main">
      <div class="tab-toolbar">
        <div class="search-row">
          <div class="mar-l-30 span-width">项目名称：</div>
          <el-input v-model="proCname" class="search-width"></el-input>
          <div class="mar-l-30 span-width">标准类别：</div>
          <div v-model="standardType" class="search-width" style="display:inline-block;">
            <el-cascader :options="options" v-model="selectedOptions" @change="handleChange">
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
            <el-option v-for="(item,index) in options2" :key="index" :label="item" :value="index">
            </el-option>
          </el-select>
          <div class="mar-l-30 span-width">状态：</div>
          <el-select v-model="status" class="search-width" placeholder="请选择">
            <el-option v-for="(item,index) in options3" :key="index" :label="item" :value="index">
            </el-option>
          </el-select>
          <el-button type="primary" icon="icon iconfont icon-chaxun" @click="findInfo" class="mar-l-30"> 查询</el-button>
          <el-button type="primary" icon="icon iconfont icon-qingkong" class="mar-l-30 button-let" @click="clearInfo"> 清空</el-button>
        </div>
      </div>

      <div class="content-table">
        <el-button @click="sendVote">发起投票</el-button>
        <el-table :data="tableData" class="table1" style="width: 100%; margin-top: 10px" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="60" :selectable='checkBox'></el-table-column>
          <el-table-column type="index" :index="typeIndex" label="序号" width="60"></el-table-column>
          <el-table-column prop="projNumber" label="项目编号" width="150"></el-table-column>
          <el-table-column prop="proCname" label="项目名称"></el-table-column>
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
          <el-table-column prop="mendType" label="制/修订" width="100">
            <template slot-scope="scope">
              <template v-if="scope.row && scope.row.mendType == '1'">
                修订
              </template>
              <template v-if="scope.row && scope.row.mendType == '0'">
                制定
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="voteStateName" label="投票状态" width="80"></el-table-column>
          <el-table-column prop="operateTime" label="审批时间" width="180"></el-table-column>
          <el-table-column prop="stateName" label="状态" width="100">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="reviewItemInfo(scope.row)" v-if="scope.row.state!=2" >
                <i class="icon iconfont icon-shenhe1"></i> 审核
              </el-button>
              <el-button type="text" size="small" @click="showItemInfo(scope.row)">
                <i class="icon iconfont icon-chakan"></i> 查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <el-pagination @current-change="handleCurrentChange" :current-page="formPage.page" :page-size="formPage.limit" layout="total,prev, pager, next"
        :total="formPage.total"> -->
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
  //  import {selectList,getProject,getSelectInfo} from 'api/standardAppliList/voteManage/vote'
  import {
    tcReviewList,
    scReview
  } from 'api/standardAppliList/standardReview/standardReview'
  export default {
    // filters: {
    //   statusFilter: function (value) {
    //     if (value === 394) return '未提交'
    //     else if(value === 395) return '已提交'
    //     else if(value === 396) return '驳回'
    //   }
    // },
    data() {
      return {
        options: [{
          value: '1',
          label: '通用标准',
          children: [{
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
              }, {
                value: '2',
                label: '输送机械'
              }, {
                value: '3',
                label: '售粮机械'
              }, {
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
            children: [{
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
        options2: {
          0: '制定',
          1: '修订'
        },
        options3: {
          1: '未审核',
          2: '审核通过',
          3: '驳回'
        },
        type: 133,
        proCname: '',
        standardType: '',
        mendType: '',
        status: '',
        formPage: {
          page: 1,
          limit: 10,
          total: undefined,
        },
        tableData: [],
        multipleSelection:'',
        voteStateName:'',
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
    },
    methods: {
      checkBox(row,index){
        if(row.voteStateName == '未发起' && row.state != '2'){
          return true;     //可选
        }else{
          return false;
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleChange(value) {
        this.standardType = '';
        for (var i = 0; i < value.length; i++) {
          if (i + 1 == value.length) {
            this.standardType += value[i];
          } else {
            this.standardType += value[i] + '-';
          }
        }
      },
      //清空
      clearInfo() {
        this.proCname = '';
        this.standardType = '';
        this.mendType = '';
        this.status = '';
        this.findInfo();
      },
      findInfo() {
        const data = {};
        if (this.proCname !== '') {
          data.proCname = this.proCname
        }
        if (this.standardType !== '') {
          data.standardType = this.standardType
        }
        if (this.mendType !== '') {
          data.mendType = this.mendType
        }
        if (this.status !== '') {
          data.status = this.status
        }
        // console.log(data)
        tcReviewList(data).then(res => {
          this.tableData = res.data.list
          this.formPage.total = res.data.total
        }).catch((err) => {
          console.log(err)
        })
      },
      //发起投票跳转
      sendVote() {
        if(this.multipleSelection == ''){
          this.$message.warning('请选择发起投票的项目');
        }else{
          this.$router.push({name: 'initiateNewVote',query:{row : this.multipleSelection, type : 'addNew', standardType : 'TC'}})
        }
      },
      showItemInfo(row) {
        let {projId,state,times,id} = row
        this.$router.push({
          name: "TCReviewDetail",query: {projId,state,times,id,type: 'show'}
        })
      },
      reviewItemInfo(row) {
        // debugger
        let {projId,state,times,id} = row
        this.$router.push({
          name: "TCReviewDetail",query: {projId,state,times,id,type: 'review'}
        })
      },
      initInfo() {
        let data = {
          "userId": this.userInfo.userId,
          "loginToken": this.userInfo.loginToken,
          "type": this.type,
          "pageNum": this.formPage.page,
          "pageSize": this.formPage.limit
        }
        tcReviewList(data).then(response => {
          // debugger;
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
          "type": this.type,
          "proCname": this.proCname,
          "standardType": this.standardType,
          "mendType": this.mendType,
          "status": this.status,
          "pageNum": val,
          "pageSize": this.formPage.limit
        }
        tcReviewList(data).then(response => {
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

  .content-table {
    padding-top: 20px;
    border-top: 1px solid #dcdfe6;
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
