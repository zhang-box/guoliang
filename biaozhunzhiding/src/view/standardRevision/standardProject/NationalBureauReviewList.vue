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
          <el-button  type="primary" icon="icon iconfont icon-chaxun"  @click="findInfo" class="mar-l-30"> 查询</el-button>
          <el-button type="primary" icon="icon iconfont icon-qingkong" class="mar-l-30 button-let" @click="clearInfo"> 清空</el-button>
        </div>
      </div>
      <div class="content-table">
        <el-button  type="primary" @click="batchSubmint" class="mar-l-30"> 批量审核</el-button>
        <el-table :data="tableData" class="table1" style="width: 100%; margin-top: 10px" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="60" :selectable='checkBox'></el-table-column>
          <el-table-column type="index" :index="typeIndex" label="序号" width="60"></el-table-column>
          <el-table-column prop="projNumber" label="项目编号" ></el-table-column>
          <el-table-column prop="proCname" label="项目名称" ></el-table-column>
          <el-table-column prop="isImport" label="是否为重要标准" ></el-table-column>
          <el-table-column prop="mendType" label="制/修订" width="80"></el-table-column>
          <el-table-column prop="applicantName" label="审批人" ></el-table-column>
          <el-table-column prop="operateTime" label="审批日期" ></el-table-column>
          <el-table-column prop="stateName" label="状态" width="100"></el-table-column>
          <el-table-column fixed="right" label="操作" >
            <template slot-scope="scope">
              <el-button type="text" size="small" v-if="scope.row.state != 2" @click="reviewItemInfo(scope.row)"><i
                class="icon iconfont icon-shenhe"></i> 审核
              </el-button>
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
      layout="total,prev, pager, next,jumper"
      :total="formPage.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {NationalBureauReviewList,dataDictionary,BatchAudit} from 'api/standardAppliList/standardProject/standardProject'
  import 'api/standardAppliList/standardProject/setData.js'
  import {voteUrl} from 'api/index'
  export default {
    data(){
      return {
          userInfo:{},   //登录人信息
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
        Item:[],
        selectedOptions: [],
        options1:[] ,
        options2:{0:'制定',1:'修订'} ,
        options3:{1:'未审核',2:'审核通过',3:'驳回'} ,
        // userId:1,//预留存储登录用户id
        // loginToken:1,
        zxDepartment:'执行单位',
        operateUserName:'',
        type: 133,
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
      NationalBureauReviewList(this.userInfo.userId,this.userInfo.loginToken).then(res=>{
          if (res.code ==1) {
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
          }
      }).catch(err=>{

      })
    },
    methods: {
      checkBox(row,index){
        if(row.state != '2' && row.stateName != '审核通过'){
          return true;     //可选
        }else{
          return false;
        }
      },
        handleSelectionChange(val){
            this.Item = [];
            for (var i = 0; i < val.length; i++) {
                let item = {};
                if (val[i].id == null) {
                    item = {projId:val[i].projId,zxDepartment:this.zxDepartment}
                }else{
                    item = {id:val[i].id,projId:val[i].projId,zxDepartment:this.zxDepartment}
                }
                this.Item.push(item)
            }
        },
      typeIndex(index) {
        return index + (this.formPage.page - 1) * this.formPage.limit + 1;
      },
        batchSubmint(){
            let that = this
            if (this.Item.length > 0) {
                let data = {
                    items:this.Item,
                    userId:this.userInfo.userId,
                    loginToken:this.userInfo.loginToken,
                    operateUserName:this.userInfo.realName
                };
                let url = voteUrl+'/project/standard-proj-grain/batchReview';
                this.$axios({
                    url:url,
                    method:'post',
                    data:data,
                    headers:{'Content-Type':'application/json'}
                }).then(function(res){
                    if (res.data.code == 1) {
                        that.$message.success('审核成功');
                        NationalBureauReviewList(that.userInfo.userId,that.userInfo.loginToken).then(response=>{
                            console.log(response);
                            if (response.code ==1) {
                                for (var i = 0; i < response.data.list.length; i++) {
                                    response.data.list[i].mendType = response.data.list[i].mendType == 0? '制定':'修订';
                                    response.data.list[i].isImport = response.data.list[i].isImport == 0? '否':'是';
                                    if (that.options,response.data.list[i].standardType == null) {
                                        continue;
                                    }
                                    response.data.list[i].standardType = mdata.getData(that.options,response.data.list[i].standardType);
                                }
                                that.tableData = response.data.list
                            }
                        })
                    }
                }
            ).catch(err=>{

                })

            }else{
                this.$message.error('没有要审核的数据');
            }
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
          NationalBureauReviewList(this.userInfo.userId,this.userInfo.loginToken,data).then(res=>{
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
        this.$router.push({path: '/drugDetail'});
      },
      showItemInfo(row){
        this.$router.push({name: "NationalBureauReviewDetail", query:{proId:row.projId,times:row.times,id:row.id,type:'show'}})
      },
      reviewItemInfo(row){
        this.$router.push({name: "NationalBureauReviewDetail", query:{proId:row.projId,id:row.id,type:'review'}})
      },
      initInfo(){
        let data = {
          "type": this.type,
          "pageNum": this.formPage.page,
          "pageSize": this.formPage.limit
        }
        NationalBureauReviewList(this.userInfo.userId,this.userInfo.loginToken,data).then(response => {
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
      //获取下拉列表信息
      getSelectInfo(){
        let data1 = {
            'userId': this.userInfo.userId,
  'loginToken': this.userInfo.loginToken,
          'parentId':337
        }
        getSelectInfo(data1).then(res=>{
          this.options1 = res.data;
        });
        let data2 = {
            'userId': this.userInfo.userId,
  'loginToken': this.userInfo.loginToken,
          'parentId':345
        }
        getSelectInfo(data2).then(res=>{
          this.options2 = res.data;
        });
        let data3 = {
            'userId': this.userInfo.userId,
  'loginToken': this.userInfo.loginToken,
          'parentId':393
        }
        getSelectInfo(data3).then(res=>{
          this.options3 = res.data;
        })
      },
      handleCurrentChange(val) {
        this.formPage.page = val
        let data = {
            'userId': this.userInfo.userId,
'loginToken': this.userInfo.loginToken,
            "type": this.type,
            "proCname": this.proCname,
            "standardType": this.standardType,
            "mendType": this.mendType,
            "state": this.state,
            "pageNum": val,
            "pageSize": this.formPage.limit
        }
        NationalBureauReviewList(this.userInfo.userId,this.userInfo.loginToken,data).then(response => {
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
    width: 70px;
    display: inline-block;
    text-align: right;
  }
  .search-width {
   width: 200px;
  }
</style>
