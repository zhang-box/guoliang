<template>
  <div class="content-wrapper">
    <div class="content-title">
      <el-button class="title-button" size="mini" @click="returnList"><i class="el-icon-arrow-left"></i> 返回</el-button>
      <span class="title-info">TC复审详情</span>
    </div>
    <div class="content-main">
      <el-tabs tab-position="left" >
        <el-tab-pane label="业务办理">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="135px" class="demo-ruleForm mar-t-20">
            <el-row>
            <el-col :span="20">
              <el-form-item label="执行单位:" prop="zxDepartment">
                <div v-if="showType" class="list-width">{{ruleForm.zxDepartment}}</div>
                <el-input type="textarea" autosize v-else-if="updateType" v-model="ruleForm.zxDepartment"></el-input>
                <el-input type="textarea" autosize v-else v-model="ruleForm.zxDepartment"></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="审核结果:" prop="result">
                  <el-radio-group v-model="ruleForm.result" :disabled ="showType" >
                    <el-radio label="1">同意</el-radio>
                    <el-radio label="0">驳回</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="审核意见:" prop="opinion">
                  <div v-if="showType" class="list-width">{{ruleForm.opinion}}</div>
                  <el-input type="textarea" autosize v-else-if="updateType" v-model="ruleForm.opinion"></el-input>
                  <el-input type="textarea" autosize v-else v-model="ruleForm.opinion"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item v-show="!showType">
              <el-button type="primary" @click="submitForm('ruleForm')" :disabled='disable'>提交</el-button>
              <el-button @click="returnList" :disabled='disable'>取消</el-button>
            </el-form-item>
          </el-form>
          <div v-if="showType">
            <el-form :model="ruleForm5" ref="ruleForm5" label-width="135px" class="demo-ruleForm mar-t-20">
            <el-row>
              <h3>立项阶段—SC初审</h3>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="执行单位:" prop="ruleForm5.standardProjScStage.zxDepartment">
                  <div class="list-width">{{ruleForm5.standardProjScStage.zxDepartment}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="审核结果:" prop="ruleForm5.standardProjScStage.result">
                  <div class="list-width">
                    <template v-if="ruleForm5.standardProjScStage.result == '0'">
                      驳回
                    </template>
                    <template v-else-if="ruleForm5.standardProjScStage.result == '1'">
                      同意
                    </template>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="审核意见:" prop="ruleForm5.standardProjScStage.opinion">
                  <div v-if="showType" class="list-width">{{ruleForm5.standardProjScStage.opinion}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="编制说明:">
                  <div class="list-width">
                    <li v-for="item in ruleForm5.explainList" :key="item.resId" @click="downloadFile(item.resId)" style="text-decoration:underline;color: #409EFF;cursor: pointer;">
                   {{item.name}}
                    </li>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="会议纪要:">
                  <div class="list-width">
                    <li v-for="item in ruleForm5.meetingSummaryList" :key="item.resId" @click="downloadFile(item.resId)"  style="text-decoration:underline;color: #409EFF;cursor: pointer;">
                    {{item.name}}
                    </li>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="基本信息">
            <el-form :model="ruleForm2"  ref="ruleForm2" label-width="235px" class="demo-ruleForm mar-t-20">
         <el-row>
           <el-col :span="20">
             <el-form-item label="中文名称:" prop="proCname">
               <div  class="list-width" >{{ruleForm2.proCname}}</div>
             </el-form-item>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="20">
             <el-form-item label="英文名称:" prop="proEname">
               <div  class="list-width" >{{ruleForm2.proEname}}</div>
             </el-form-item>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="10">
             <el-form-item label="制定/修订:" prop="mendType">
               <div class="list-width" >{{options2[ruleForm2.mendType]}}</div>
             </el-form-item>
           </el-col>
           <el-col :span="10"  v-if="ruleForm2.mendType != 0">
             <el-form-item label="被修订的标准号:" prop="standardNo">
               <div class="list-width" >{{ruleForm2.standardNo}}</div>
             </el-form-item>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="10">
             <el-form-item label="标准类别:" prop="standardType">
               <div class="list-width" >{{ruleForm2.standardType}}</div>
             </el-form-item>
           </el-col>
         </el-row>
         <el-row>
             <el-col :span="10">
                 <el-form-item label="ICS:" prop="ics">
                     <div class="list-width" >{{ruleForm2.ics}}</div>
                 </el-form-item>
             </el-col>
             <el-col :span="10">
               <el-form-item label="是否为重要标准:" prop="isImport">
                 <div class="list-width" >{{isImportOptions[ruleForm2.isImport]}}</div>
               </el-form-item>
             </el-col>
           </el-row>
         <el-row>
           <el-col :span="20">
             <el-form-item label="技术委员会或技术归口单位:" prop="technicalDepartment">
               <div class="list-width" >{{ruleForm2.technicalDepartment}}</div>
             </el-form-item>
           </el-col>
         </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="起草单位:" prop="draftDepartment">
                    <div class="list-width" >{{ruleForm2.draftDepartment}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
         <el-row>
           <el-col :span="10">
             <el-form-item label="项目周期:" prop="projectCycle">
               <div class="list-width" v-for="item in projectCycleOptions" v-if="item.id == ruleForm2.projectCycle">{{item.dictValue}}</div>
             </el-form-item>
           </el-col>
           <el-col :span="10">
             <el-form-item label="是否有国家级科研项目支撑:" prop="hasNational">
               <div class="list-width" >{{hasNationalOptions[ruleForm2.hasNational]}}</div>
             </el-form-item>
           </el-col>
         </el-row>
       </el-form>
        </el-tab-pane>
        <el-tab-pane label="相关文件">
          <el-table
            :data="tableData"
            border
            class="table1"
            style="width: 100%;margin-top: 10px">
            <el-table-column prop="name" label="文件名称" width="180"> </el-table-column>
            <el-table-column prop="type" label="类型" width="180"> </el-table-column>
            <el-table-column prop="size" label="大小"> </el-table-column>
            <el-table-column prop="createTime" label="创建时间"> </el-table-column>
            <el-table-column prop="username" label="创建者"> </el-table-column>
            <el-table-column fixed="right" label="操作" >
              <template slot-scope="scope">
                <a @click="downloadFile(scope.row.resId)" href="javascript:void(0)" size="small"><i
                class="icon iconfont icon-xiazai">下载</i>
                </a>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="项目进度">
          <el-table
            :data="tableData2"
            border
            style="width: 100%;margin-top: 10px"  class="table1">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="环节" width="180"> </el-table-column>
            <el-table-column prop="beginTime" label="开始时间"> </el-table-column>
            <el-table-column prop="endTime" label="结束时间"> </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import {applicationDetail,TCProjectProgress,projectDetail,TCRelatedDocuments,TCReview,TCReviewDetail,dataDictionary} from 'api/standardAppliList/standardProject/standardProject'
  import 'api/standardAppliList/standardProject/setData.js'
  import {voteUrl} from 'api/index'
  import {Message} from 'element-ui'
  export default {
    data() {
      return {
        disable:false,
        userId:1,
        loginToken:1,
        operateUserName:'',//审核人
        isImport:'',//是否为重要标准 0:否 1:是
        isImportOptions:{0:'否',1:'是'},
        ruleForm: {},
        ruleForm2: {},
        ruleForm5 : {
          standardProjScStage: {
            zxDepartment: "",
            result: "",
            opinion: "",
          },
          explainList: [{
            name: '',
            resId: ''
          }],
          meetingSummaryList: [{
            name: '',
            resId: ''
          }],
        },
        downloadUrl:voteUrl,
        showType: false,
        updateType: false,
        radio2: 1,
        options2:{0:'制定',1:'修订'},
        hasNationalOptions:{0:'否',1:'是'},
        plateOptions: [],
        payOptions: [],
        refuelingOptions: [],
        projectCycleOptions:[],
        tableData:[],
        tableData2:[],
        rules:{
            result:[
                { required: true, message: '请选择审核结果', trigger: 'change' }
            ]
        },
        options: [{
              value: '1',
              label: '通用标准',
              children: [{
                value: '1',
                label: '术语'
              }, {
                value: '2',
                label: '技术规范'
              }, {
                value: '3',
                label: '管理类'
              }, {
                value: '4',
                label: '标准物质'
              }, {
                value: '5',
                label: '标准样品'
              }, {
                value: '6',
                label: '标签'
              }, {
                value: '7',
                label: '代码'
              }, {
                value: '8',
                label: '信息管理'
              }]
            }, {
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
              children: [{
                value: '1',
                label: '粮油检测方法'
              }, {
                value: '2',
                label: '饲料检测方法'
              }, {
                value: '3',
                label: '粮油机械测试方法'
              }, {
                value: '4',
                label: '粮油仪器测试方法'
              }]
            }],
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
      if (this.$route.query.type === 'show') {
          // this.getInfo()
            let data2 = {
              'projId' : this.$route.query.proId,
              'state' : 13,
            };
            projectDetail(data2).then(res => {
              this.ruleForm5 = res.data[0];           //立项-SC        0
            });

        this.showType = true;
        TCReviewDetail(this.$route.query.id).then(res=>{
            if (res.code == 1) {
                this.ruleForm = res.data
            }
        }).catch(err=>{

        })
      } else if (this.$route.query.type === 'review') {
          // this.getInfo()
          // let data2 = {
          //   'projId' : this.$route.query.proId,
          //   'state' : 13,
          // };
          // projectDetail(data2).then(res => {
          //   this.ruleForm5 = res.data[0];           //立项-SC        0
          // });
        this.updateType = true

      }
      // 基本信息
      applicationDetail(this.$route.query.proId).then(res=>{
          if (res.code == 1) {
              res.data.standardType = mdata.getData(this.options,res.data.standardType);
              this.ruleForm2 = res.data
          }
      }).catch(err=>{
          console.log(err);
      })

      //获取项目进度数据
      TCProjectProgress({times:this.$route.query.times,projId:this.$route.query.proId}).then(res=>{
          if (res.code == 1) {
              this.tableData2 = res.data
          }
      }).catch(err=>{
          console.log(err)
      })

      // 获取相关文件信息
      TCRelatedDocuments({times:this.$route.query.times,projId:this.$route.query.proId}).then(res=>{
          if (res.code == 1) {
              this.tableData = res.data
          }
      }).catch(err=>{
          console.log(err)
      })
      //项目周期
      let projectCycleOptionsData = {
          'userId': this.userInfo.userId,
          'loginToken': this.userInfo.loginToken,
          'parentId':358
      };
      dataDictionary(projectCycleOptionsData).then(res=>{
          this.projectCycleOptions = res.data
      })
    },
    methods: {
        returnList(){
          this.$router.push({path: '/standarReviewList'})
      },

         downloadFile(id){
          if (id) {
              window.location.href = this.downloadUrl + '/resNew/fileDownload?resId=' + id
          }
      },
      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
              if (valid) {
                  this.disable = true
                  let data = this.ruleForm
                  data["userId"] = this.userInfo.userId
                  data["loginToken"] = this.userInfo.loginToken
                  data["projId"] = this.$route.query.proId
                  data["operate"] = 2
                  data["operateUserName"] = this.userInfo.realName
                  if (this.$route.query.id != null) {
                      data['id'] = this.$route.query.id
                  }
                  console.log(data);
                  // return false;
                  TCReview(data).then(res=>{
                      if (res.code == 1) {
                          var msg = '提交成功';
                          this.$message.success(msg);
                          this.$router.push({path:'/standarReviewList'});
                      }else{
                          this.disable = false
                      }
                  }).catch(err=>{

                  })
              }
          })
      },
      returnList(){
        this.$router.push({path: '/standarReviewList'})
    },

    }
  }
</script>

<style scoped>
  .list-width {
    width: 325px;
    text-align: left;
    margin-left: 20px;
  }

  .input-width {
    width: 217px;
  }
</style>
