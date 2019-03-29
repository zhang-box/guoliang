<template>
  <div class="content-wrapper">
    <div class="content-title">
      <el-button class="title-button" size="mini" @click="returnList"><i class="el-icon-arrow-left"></i> 返回</el-button>
      <span class="title-info">SC初审详情</span>
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
            <el-row>
              <el-col v-if="!showType" :span="20">
                <el-form-item label="编制说明:" prop="explainResId">
                  <div v-if="showType" class="list-width">
                    <li v-for="item in explainResList" :key="item.resId"  style="text-decoration:underline;color: #409EFF;cursor: pointer;">
                      <a target="_blank" :href="downloadFileUrl(item.resId)"  style="text-decoration:underline;color: #409EFF;cursor: pointer;">{{item.resName}}</a>
                    </li>
                  </div>
                  <el-upload v-else class="upload-demo" :action="fileUploadUrl+'resNew/fileUpload'" :on-success="handleSuccess1"
                    :on-remove="handleRemove1" :multiple="true" :file-list="fileListExplainResList" :before-upload="onBeforeUpload">
                    <el-button size="small" type="primary">上传</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col v-else :span="20">
                <el-form-item label="编制说明:">
                  <div class="list-width">
                    <li v-for="item in ruleForm.explainList" :key="item.resId" @click="downloadFile(item.resId)"  style="text-decoration:underline;color: #409EFF;cursor: pointer;">
                      {{item.resName}}
                    </li>
                  </div>
                </el-form-item>
              </el-col>
              <!-- <el-col v-else :span="20">
                <el-form-item label="编制说明:" prop="unitPrice">
                    <a style="display:block" v-for="item in explainRes" @click="downloadFile(item.resId)" href="javascript:void(0)"><span>{{item.resName}}</span></a>
                </el-form-item>
              </el-col> -->
            </el-row>
            <el-row>
                <el-col :span="20" v-if="!showType">
                  <el-form-item label="会议纪要:" prop="meetingSummaryResId">
                    <div v-if="showType" class="list-width">
                      <li v-for="item in meetingSummaryResList" :key="item.resId"  style="text-decoration:underline;color: #409EFF;cursor: pointer;">
                        <a target="_blank" :href="downloadFileUrl(item.resId)" style="text-decoration:underline;color: #409EFF;cursor: pointer;">{{item.resName}}</a>
                        </li>
                    </div>
                    <el-upload v-else class="upload-demo" :action="fileUploadUrl+'resNew/fileUpload'" :on-success="handleSuccess3"
                      :on-remove="handleRemove3" :multiple="true" :file-list="fileListMeetingSummaryResList" :before-upload="onBeforeUpload">
                      <el-button size="small" type="primary">上传</el-button>
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col v-else :span="20">
                  <el-form-item label="会议纪要:">
                    <div class="list-width">
                      <li v-for="item in ruleForm.meetingSummaryList" :key="item.resId" @click="downloadFile(item.resId)" style="text-decoration:underline;color: #409EFF;cursor: pointer;">
                        {{item.resName}}
                      </li>
                    </div>
                  </el-form-item>
                </el-col>
              <!-- <el-col v-else :span="20">
                <el-form-item label="会议纪要:" prop="resName">
                    <a style="display:block" v-for="item in meetingSummaryRes" @click="downloadFile(item.resId)" href="javascript:void(0)"><span>{{item.resName}}</span></a>
                </el-form-item>
              </el-col> -->
            </el-row>
            <el-form-item v-show="!showType">
              <el-button type="primary" @click="submitForm('ruleForm',1)" :disabled = 'disable'>保存</el-button>
              <el-button type="primary" @click="submitForm('ruleForm',2)" :disabled = 'disable'>提交</el-button>
              <el-button @click="returnList" :disabled = 'disable'>取消</el-button>
            </el-form-item>
          </el-form>
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
           <el-col :span="10" v-if="ruleForm2.mendType != 0">
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
              <a href="javascript:void(0)" @click="downloadFile(scope.row.resId)" size="small"><i
                class="icon iconfont icon-xiazai"></i> 下载
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
  import {SCfirstTrialExamine,applicationDetail,SCProjectProgress,SCRelatedDocuments,SCFirstTrialDetail,MultiFileUpload,fileDownload,dataDictionary} from 'api/standardAppliList/standardProject/standardProject'
  import 'api/standardAppliList/standardProject/setData.js'
  import {voteUrl} from 'api/index'
  import {Message} from 'element-ui'
  export default {
    data() {
      return {
          stateDoc:'',
          disable:false,
          unitPrice:'',
          fileListExplainResList:[],
          fileListMeetingSummaryResList:[],
          meetingSummaryResList:[],
          explainResList:[],
          explainRes:[],
          meetingSummaryRes:[],
          downloadUrl:voteUrl,
          explainResId:[],
          meetingSummaryResId:[],
          operateUserName:'',
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
        ruleForm: {
            explainResId:'',
            meetingSummaryResId:'',
            explainList: [{
              resName: '',
              resId: ''
            }],
            meetingSummaryList: [{
              resName: '',
              resId: ''
            }],
         },
        ruleForm2: { },
        fileUploadUrl:null, //上传接口
        showType: false,
        updateType: false,
        radio2: 1,
        plateOptions: [],
        payOptions: [],
        refuelingOptions: [],
       tableData:[],
        // 项目进度
        tableData2:[],
        // ********************下拉列表*******************************
        plateOptions: [],
        fileList1:[],
        fileList2:[],
        fileList3:[],
        payOptions: [],
        refuelingOptions: [],
        mendTypeOptions:[],
        cbTypeOptions:[],
        standardTypeOptions:[] ,
        options2:{0:'制定',1:'修订'},
        options3:[] ,
        projectCycleOptions:[],
        column1Options:[],
        column2Options:[],
        isImport:'',//是否为重要标准 0:否 1:是
        isImportOptions:{0:'否',1:'是'},
        hasNationalOptions:{0:'否',1:'是'},
        hasPatentOptions:[],
        proStandardTypeOptions:[],
        rules: {
          // zxDepartment: [
          //       { required: true, message: '请输入执行单位', trigger: 'blur' }
          //   ],
          result:[
              { required: true, message: '请选择审核结果', trigger: 'change' }
          ]
        },
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
          this.showType = true;
          let id = null;
          this.$route.query.id == null? '':  id = this.$route.query.id;
          if (id != null) {
              SCFirstTrialDetail(id).then(res=>{
                  if (res.code == 1) {
                      this.ruleForm  = res.data
                      // let fileids = {0:res.data.explainResId,1:res.data.manuscriptsResId,2:res.data.meetingSummaryResId};
                      const { meetingSummaryResId,explainResId } = res.data;

                      if(meetingSummaryResId){
                        this.getFileDetails(meetingSummaryResId,(info)=>{
                          this.ruleForm.meetingSummaryList=info;
                        });
                      }
                      if(explainResId){
                        this.getFileDetails(explainResId,(info)=>{
                          this.ruleForm.explainList=info;
                        });
                      }
                  }
              })
          }
          applicationDetail(this.$route.query.proId).then(res=>{
              if (res.code == 1) {
                  this.ruleForm2 = res.data
                  this.ruleForm2.standardType = mdata.getData(this.options,res.data.standardType);
              }
          }).catch(err=>{
              console.log(err);
          })

      } else if (this.$route.query.type === 'review') {
        this.updateType = true
        let id = null;
        this.$route.query.id == null? '':  id = this.$route.query.id;
        if (id != null) {
            SCFirstTrialDetail(id).then(res=>{
                if (res.code == 1) {
                    this.ruleForm  = res.data

                    const { meetingSummaryResId,explainResId } = res.data;

                    if(meetingSummaryResId){
                      this.getFileDetails(meetingSummaryResId,(info)=>{
                        this.meetingSummaryResList=info;
                        this.fileListMeetingSummaryResList=info.map(item=>{
                          return {
                            name:item.resName,
                            percentage:100,
                            resId:item.resId,
                          }
                        });
                      });
                    }
                    if(explainResId){
                      this.getFileDetails(explainResId,(info)=>{
                        this.explainResList=info;
                        this.fileListExplainResList=info.map(item=>{
                          return {
                            name:item.resName,
                            percentage:100,
                            resId:item.resId,
                          }
                        });
                      });
                    }
                }
            })
        }
        applicationDetail(this.$route.query.proId).then(res=>{
            if (res.code == 1) {
                this.ruleForm2 = res.data
                this.ruleForm2.standardType = mdata.getData(this.options,res.data.standardType);
            }
        }).catch(err=>{
            console.log(err);
        })
      }

      //获取项目进度数据
      SCProjectProgress({times:this.$route.query.times,projId:this.$route.query.proId}).then(res=>{
          if (res.code == 1) {
              this.tableData2 = res.data
          }
      }).catch(err=>{
          console.log(err)
      })
      let state = this.$route.query.state;
      // console.log(this.$route.query);
      if(state == '2'){
          this.stateDoc = '2'   //通过
        }else{
          this.stateDoc = ''
        }
      // 获取相关文件信息
      SCRelatedDocuments({times:this.$route.query.times,projId:this.$route.query.proId,state:this.$route.query.state,stateType:this.stateDoc}).then(res=>{
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
      // this.selectAllInfo()

      this.fileUploadUrl = voteUrl;
      // this.getSelectInfo();

    },
    methods: {
        onBeforeUpload(file) {
               const isLt1M = file.size / 1024 / 1024 < 5;
               if (!isLt1M) {
                   this.$message.error('上传文件大小不能超过 5MB!');
               }
               return isLt1M;
           },
        getFileDetails(ids,cb){
          MultiFileUpload(ids).then((res)=>{
            if(res.data){
              cb(res.data);
            }
          });
        },
        handleRemove1(file, fileList) {
          const repla = this.ruleForm.explainResId.indexOf(`,${file.resId}`) >= 0
          ? `,${file.resId}`
          : this.ruleForm.explainResId.indexOf(',') >= 0 ? `${file.resId},` : file.resId;
          this.ruleForm.explainResId = this.ruleForm.explainResId.replace(repla, '')
        },
        handleSuccess1(response, file, fileList){
          file.resId = response.data[0].resId
          if (this.ruleForm.explainResId) {
            this.ruleForm.explainResId += `,${response.data[0].resId}`
          } else {
            this.ruleForm.explainResId = response.data[0].resId + ''
          }
        },
        handleRemove3(file, fileList) {
          const repla = this.ruleForm.meetingSummaryResId.indexOf(`,${file.resId}`) >= 0
          ? `,${file.resId}`
          : this.ruleForm.meetingSummaryResId.indexOf(',') >= 0 ? `${file.resId},` : file.resId;
          this.ruleForm.meetingSummaryResId = this.ruleForm.meetingSummaryResId.replace(repla, '')
        },
        handleSuccess3(response, file, fileList){
          file.resId = response.data[0].resId
          if (this.ruleForm.meetingSummaryResId) {
            this.ruleForm.meetingSummaryResId += `,${response.data[0].resId}`
          } else {
            this.ruleForm.meetingSummaryResId = response.data[0].resId + ''
          }
        },
        returnList(){
            this.$router.push({path: '/standarFirstTrialList'})
        },
        downloadFile(id){
            window.location.href = this.downloadUrl + '/resNew/fileDownload?resId=' + id
        },
        // 提交审核
        submitForm(formName,state) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.disable = true
                    let data = this.ruleForm
                    data["userId"]            = this.userInfo.userId
                    data["loginToken"]        = this.userInfo.loginToken
                    data["projId"]            = this.$route.query.proId
                    data["operate"]           = state
                    data["operateUserName"]   = this.userInfo.realName
                    // data['meetingSummaryResId']  = this.meetingSummaryResId.join(',');
                    // data['explainResId']  = this.explainResId.join(',');
                    // data['manuscriptsResId']  = this.manuscriptsResId.join(',');
                    if (this.$route.query.id != null) {
                        data['id'] = this.$route.query.id
                    }
                    // console.log(data['meetingSummaryResId']);
                    // if(data['meetingSummaryResId'][0]==','){
                    //     data['meetingSummaryResId'][0].splice(0,1)
                    // }
                    SCfirstTrialExamine(data).then(res=>{
                        if (res.code == 1) {
                            var msg = (state==1)?'保存成功':'提交成功';
                            this.$message.success(msg);
                            this.$router.push({path:'/standarFirstTrialList'});
                        }else{
                            this.disable = false
                            this.$message.error(res.msg)
                        }
                    }).catch(err=>{
                        // console.log('111');
                    })
                }
            })
        }
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
