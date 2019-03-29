<template>
  <div class="content-wrapper">
    <div class="content-title">
      <el-button class="title-button" size="mini" @click="returnList">
        <i class="el-icon-arrow-left"></i> 返回</el-button>
      <span class="title-info">标准起草</span>
    </div>
    <div class="content-main">
      <el-tabs tab-position="left">
        <el-tab-pane label="业务办理">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="135px" class="demo-ruleForm mar-t-20">
            <el-row>
              <el-col :span="20">
                <el-form-item label="执行单位:" prop="zxDepartment">
                  <div v-if="showType" class="list-width">{{ruleForm.zxDepartment}}</div>
                  <el-input autosize v-else-if="updateType" v-model="ruleForm.zxDepartment"></el-input>
                  <el-input autosize v-else v-model="ruleForm.zxDepartment"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="截止日期:" prop="endTime">
                  <div v-if="showType" class="list-width">{{ruleForm.endTime}}</div>
                  <el-date-picker
                   v-else-if="updateType"
                  v-model="ruleForm.endTime"
                   type="date"
                  value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions0"
                    >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="编制说明:" prop="explainResId">
                  <div v-if="showType" class="list-width">
                    <li v-for="item in explainResList" :key="item.resId" @click="downloadFile(item.resId)" style="text-decoration:underline;color: #409EFF;cursor: pointer;">
                      {{item.resName}}
                    </li>
                    <!--<li v-for="item in explainResList" :key="item.resId" style="text-decoration:underline;color: #409EFF;">-->
                      <!--<a target="_blank" :href="downloadFileUrl(item.resId)" style="text-decoration:underline;color: #409EFF;">{{item.resName}}</a>-->
                    <!--</li>-->
                  </div>
                  <el-upload v-else class="upload-demo" :action="fileUploadUrl+'resNew/fileUpload'" :on-success="handleSuccess1" :before-remove="beforeRemove"
                    :on-remove="handleRemove1" :multiple="true" :file-list="fileListExplainResList" :before-upload="onBeforeUpload">
                    <el-button size="small" type="primary">上传</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="会议纪要:" prop="meetingSummaryResId">
                  <div v-if="showType" class="list-width">
                    <li v-for="item in meetingSummaryResList" :key="item.resId" @click="downloadFile(item.resId)" style="text-decoration:underline;color: #409EFF;cursor: pointer;">
                      {{item.resName}}
                    </li>
                    <!--<li v-for="item in meetingSummaryResList" :key="item.resId" style="text-decoration:underline;color: #409EFF;">-->
                      <!--<a target="_blank" :href="downloadFileUrl(item.resId)" style="text-decoration:underline;color: #409EFF;">{{item.resName}}</a>-->
                      <!--</li>-->
                  </div>
                  <el-upload v-else class="upload-demo" :action="fileUploadUrl+'resNew/fileUpload'" :on-success="handleSuccess3" :before-remove="beforeRemove"
                    :on-remove="handleRemove3" :multiple="true" :file-list="fileListMeetingSummaryResList" :before-upload="onBeforeUpload">
                    <el-button size="small" type="primary">上传</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
          <div v-if="showType">
            <el-form :model="ruleForm3" ref="ruleForm3" label-width="135px" class="demo-ruleForm mar-t-20">
              <el-row>
                <h3>立项阶段—国粮局审核</h3>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="执行单位:" prop="ruleForm3.standardProjGrainStage.zxDepartment">
                    <div class="list-width">{{ruleForm3.standardProjGrainStage.zxDepartment}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="审核结果:" prop="ruleForm3.standardProjGrainStage.result">
                    <div class="list-width">
                      <template v-if="ruleForm3.standardProjGrainStage.result == '0'">
                        驳回
                      </template>
                      <template v-else-if="ruleForm3.standardProjGrainStage.result == '1'">
                        同意
                      </template>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="审核意见:" prop="ruleForm3.standardProjGrainStage.opinion">
                    <div v-if="showType" class="list-width">{{ruleForm3.standardProjGrainStage.opinion}}</div>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-form>
            <el-form :model="ruleForm4" ref="ruleForm4" label-width="135px" class="demo-ruleForm mar-t-20">
              <el-row>
                <h3>立项阶段—TC复审</h3>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="执行单位:" prop="ruleForm4.standardProjTcStage.zxDepartment">
                    <div class="list-width">{{ruleForm4.standardProjTcStage.zxDepartment}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="审核结果:" prop="ruleForm4.standardProjTcStage.result">
                    <div class="list-width">
                      <template v-if="ruleForm4.standardProjTcStage.result == '0'">
                        驳回
                      </template>
                      <template v-else-if="ruleForm4.standardProjTcStage.result == '1'">
                        同意
                      </template>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="审核意见:" prop="ruleForm4.standardProjTcStage.opinion">
                    <div v-if="showType" class="list-width">{{ruleForm4.standardProjTcStage.opinion}}</div>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-form>
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
                      <li v-for="item in ruleForm5.explainList" :key="item.resId" @click="downloadFile(item.resId)" style="text-decoration:underline;color: #409EFF;">
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
                      <li v-for="item in ruleForm5.meetingSummaryList" :key="item.resId" @click="downloadFile(item.resId)" style="text-decoration:underline;color: #409EFF;">
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

          <el-form :model="ruleForm2" ref="ruleForm2" label-width="235px" class="demo-ruleForm mar-t-20">
            <el-row>
              <el-col :span="20">
                <el-form-item label="中文名称:" prop="proCname">
                  <div class="list-width">{{ruleForm2.proCname}}</div>
                  <!-- <div v-if="showType" class="list-width">{{ruleForm2.proCname}}</div>
                  <el-input size="small" v-else-if="updateType" v-model="ruleForm2.proCname">
                  </el-input>
                  <el-input size="small" v-else v-model="ruleForm2.proCname">
                  </el-input> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="英文名称:" prop="proEname">
                  <div class="list-width">{{ruleForm2.proEname}}</div>
                  <!-- <div v-if="showType" class="list-width">{{ruleForm2.proEname}}</div>
                  <el-input size="small" v-else-if="updateType" v-model="ruleForm2.proEname">
                  </el-input>
                  <el-input size="small" v-else v-model="ruleForm2.proEname">
                  </el-input> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="制定/修订:" prop="mendType">
                  <div class="list-width">
                    <template v-if="ruleForm2.mendType == '0'">
                      制定
                    </template>
                    <template v-else-if="ruleForm2.mendType == '1'">
                      修订
                    </template>
                  </div>
                  <!-- <div v-if="showType" class="list-width">{{ruleForm2.mendType}}</div>
                  <el-select v-else-if="updateType" v-model="ruleForm2.mendType">
                    <el-option v-for="item in mendTypeOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
                  </el-select>
                  <el-select v-else v-model="ruleForm2.mendType">
                    <el-option v-for="item in mendTypeOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
                  </el-select> -->
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item v-if="ruleForm2.mendType == 1 " label="被修订的标准号:" prop="standardNo">
                  <div class="list-width">{{ruleForm2.standardNo}}</div>
                  <!-- <div v-if="showType" class="list-width">{{ruleForm2.standardNo}}</div>
                  <el-input class="input-width" v-else-if="updateType" v-model="ruleForm2.standardNo"></el-input>
                  <el-input class="input-width" v-else v-model="ruleForm2.standardNo"></el-input> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="标准类别:" prop="standardType">
                  <div class="list-width">{{showStandType(ruleForm2.standardType)}}</div>
                  <!-- <div v-if="showType" class="list-width">{{ruleForm2.standardType}}</div>
                  <el-select v-else-if="updateType" v-model="ruleForm2.standardType">
                    <el-option v-for="item in standardTypeOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
                  </el-select>
                  <el-select v-else v-model="ruleForm2.standardType">
                    <el-option v-for="item in standardTypeOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
                  </el-select> -->
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
                  <div class="list-width">{{ruleForm2.technicalDepartment}}</div>
                  <!-- <div v-if="showType" class="list-width">{{ruleForm2.technicalDepartment}}</div>
                  <el-input size="small" v-else-if="updateType" v-model="ruleForm2.technicalDepartment">
                  </el-input>
                  <el-input size="small" v-else v-model="ruleForm2.technicalDepartment">
                  </el-input> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="起草单位:" prop="draftDepartment">
                  <div class="list-width">{{ruleForm2.draftDepartment}}</div>
                  <!-- <div v-if="showType" class="list-width">{{ruleForm2.draftDepartment}}</div>
                  <el-input class="input-width" v-else-if="updateType" v-model="ruleForm2.draftDepartment"></el-input>
                  <el-input class="input-width" v-else v-model="ruleForm2.draftDepartment"></el-input> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="项目周期:" prop="projectCycle">
                  <div class="list-width" :rel="ruleForm2.projectCycle">
                    <template v-if="ruleForm2.projectCycle == '359'">
                      12个月
                    </template>
                    <template v-else-if="ruleForm2.projectCycle == '360'">
                      18个月
                    </template>
                    <template v-else-if="ruleForm2.projectCycle == '361'">
                      24个月
                    </template>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="是否有国家级科研项目支撑:" prop="hasNational">
                  <div class="list-width">{{ruleForm2.hasNational=='1'?'是':'否'}}</div>
                  <!-- <div v-if="showType" class="list-width">{{ruleForm2.hasNational}}</div>
                  <el-select v-else-if="updateType" v-model="ruleForm2.hasNational">
                    <el-option v-for="item in hasNationalOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
                  </el-select>
                  <el-select v-else v-model="ruleForm2.hasNational">
                    <el-option v-for="item in hasNationalOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
                  </el-select> -->

                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </el-tab-pane>
        <el-tab-pane label="相关文件">
          <el-table :data="tableData" border class="table1" style="width: 100%;margin-top: 10px">
            <el-table-column prop="name" label="文件名称" width="180"> </el-table-column>
            <el-table-column prop="type" label="类型" width="180"> </el-table-column>
            <el-table-column prop="size" label="大小"> </el-table-column>
            <el-table-column prop="createTime" label="创建时间"> </el-table-column>
            <el-table-column prop="username" label="创建者"> </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="download(scope.row.resId)">
                  <i class="icon iconfont icon-xiazai"></i> 下载
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="项目进度">
          <el-table :data="tableData2" border style="width: 100%;margin-top: 10px" class="table1">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="环节" width="180"> </el-table-column>
            <el-table-column prop="beginTime" label="开始时间"> </el-table-column>
            <el-table-column prop="endTime" label="结束时间"> </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-form>
        <el-form-item v-show="!showType" class="btnGroup">
          <el-button type="primary" @click="saveForm">保存</el-button>
          <el-button type="primary" @click="submitForm(e)">提交</el-button>
          <el-button @click="returnList">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
  // import {
  //   oilRecordAdd,
  //   oilRecordShow,
  //   oilRecordUpdate,
  //   license
  // } from 'api/vehicleManage/cl-register'
  // import {
  //   payType,
  //   refuelingType,

  // } from 'api/vehicleManage/selectInfo/selectInfo'
  // import {getProject,getSelectInfo,insertProject,updateProject,getRecordList} from 'api/standardAppliList/voteManage/vote'
  import {
    applicationDetail,
    RelatedFile,
    projectSchedule,
    standardDraftGetById,
    standardDraftReview,
    dataDictionary,
  } from 'api/standardAppliList/standardDrafting/standardDrafting'
  import {
    voteUrl
  } from 'api/index'
  import {
    MultiFileDetail,
    projectDetail
  } from 'api/standardAppliList/standardApproval/standardApproval'
  import {getStandType } from 'api/vars';
  import {
    Message
  } from 'element-ui'
  export default {
    data() {
      return {
        endTime : '请选择截止日期',
        stateDoc: '',    //流程状态
        fileListExplainResList:[],
        fileListMeetingSummaryResList:[],

        rules:{
          endTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          instructionsResId:[{}
          ]
        },
        fileList: [],
        pickerOptions0: {
          disabledDate: (time) => {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        labelPosition: 'left',
        // ruleForm: {
        //   result: '',
        //   opinion: '',
        //   zxDepartment: '',
        //   endTime: '',
        //   instructionsResId: '',
        //   approvalDraftResId: '',
        //   meetingSummaryResId: '',
        // },
          meetingSummaryResList:[],
          explainResList:[],

         ruleForm: {
              result: '',
          opinion: '',
          zxDepartment: '',
          endTime: '',
          instructionsResId: '',
          approvalDraftResId: '',
          meetingSummaryResId: '',
          result: '',
          opinion: '',
          zxDepartment: '',
          collectionMethod: '',
          instructionsResId: '',
          approvalDraftResId: '',
          meetingSummaryResId: '',
          explainResId:'',
          proCname: '', //中文名称
          proEname: '', //英文名称
          mendType: '', //制定/修订
          standardNo: '', //被修订的标准号
          cbType: 0, //采标类型
          cbLevel: '', //采用程度
          cbNo: '', //采标号
          cbName: '', //采标名称
          standardType: '', //标准类别
          ics: '', //ics
          reportDepartment: '', //上报单位
          technicalDepartment: '', //技术委员会或技术归口单位
          chargeDepartment: '', //主管部门
          draftDepartment: '', //起草单位
          projectCycle: '', //项目周期
          column1: '', //是否采用快速程序
          column2: '', //是否采用快速程序
          standardType: '', //标准类别
          budgetExplain: '', //经费预算说明
          purpose: '', //目的意义
          mainContent: '', //范围和主要技术内容
          briefDescription: '', //国内外情况简要说明
          lawsShip: '', //有关法律法规和强制性标准的关系
          inventory: '', //标准涉及的产品清单
          hasNational: '', //是否有国家级科研项目支撑 0:否 1:是
          hasPatent: '', //是否涉及专利 0:否 1:是
          patentNo: '', //专利号及名称
          proProposalResId: '', //项目建议文件
          meetingSummaryResId: '', //会议纪要文档
          operateUserName: '测试', //登录人姓名
        },

        ruleForm2: {},
        ruleForm3: {
          standardProjGrainStage: {
            zxDepartment: "",
            result: "",
            opinion: "",
          }
        },        //立项-国粮局
        ruleForm4 : {
          standardProjTcStage: {
            zxDepartment: "",
            result: "",
            opinion: "",
          },
        },       //立项-TC
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
        },       //立项-SC
        downloadUrl:voteUrl,
        fileUploadUrl: null,
        showType: false,
        updateType: false,
        plateOptions: [],
        payOptions: [],
        refuelingOptions: [],
        tableData: [],
        tableData2: [],
        // ********************下拉列表*******************************
        plateOptions: [],
        payOptions: [],
        refuelingOptions: [],
        mendTypeOptions: [],
        cbTypeOptions: [],
        standardTypeOptions: [],
        options2: [],
        options3: [],
        projectCycleOptions: [],
        column1Options: [],
        column2Options: [],
        hasNationalOptions: [],
        hasPatentOptions: [],
        proStandardTypeOptions: [],
        isImport:'',//是否为重要标准 0:否 1:是
        isImportOptions:{0:'否',1:'是'},
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
        firstUpload: {
          instructionsResId: 0,
          approvalDraftResId: 0,
          meetingSummaryResId: 0,
          standReviewResId: 0,
          summaryResId: 0,
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
        this.getInfo('show')
        this.showType = true;
      } else if (this.$route.query.type === 'update') {
        this.getInfo('update')
        this.updateType = true
      }
      this.fileUploadUrl = voteUrl;


      // this.dataDictionary()
    },
    mounted() {

      this.$nextTick(function () {

        let {
          projId,
          state,
          times
        } = this.$route.query;
        if(state == '2'){
          this.stateDoc = '2'   //通过
        }else{
          this.stateDoc = ''
        }
        let data = {
          'projId': projId,
          'stateType': this.stateDoc,
          'times': times
        };
        //获取项目进度
        projectSchedule(data).then(res => {
          if (res.data && res.data.length != '0') {
            for (var i = 0; i < res.data.length; i++) {
              this.tableData2.push(res.data[i])
            }
          }else{
            console.log(res)
          }
        });
        //获取相关文件
        RelatedFile(data).then(res => {
          if (res.data && res.data.length != '0') {
            for (var i = 0; i < res.data.length; i++) {
              this.tableData.push(res.data[i])
            }
          }
        });
      })
    },
    methods: {
        onBeforeUpload(file) {
               const isLt1M = file.size / 5120 / 5120 < 1;
               if (!isLt1M) {
                   this.$message.error('上传文件大小不能超过 5MB!');
               }
               return isLt1M;
           },
      downloadFile(id){
        if(id){
          window.location.href = voteUrl + '/resNew/fileDownload?resId=' + id
        }
      },
      downloadFileUrl(id){
        return this.downloadUrl + '/resNew/fileDownload?resId=' + id
      },
      getFileDetails(ids,cb){
        MultiFileDetail(ids).then((res)=>{
          if(res.data){
            cb(res.data);
          }
        });
      },
      findDictValue(dict,id){
         return findDictValue(dict,id)
       },
      showStandType(str){
        return getStandType(str);
      },
      download(id) {
        if(id){
          window.location.href = voteUrl + '/resNew/fileDownload?resId=' + id
        };
      },
      returnList() {
        this.$router.push({
          path: '/standarDraftingList'
        })
      },
      handleRemove1(file, fileList) {
        const repla = this.ruleForm.explainResId.indexOf(`,${file.resId}`) >= 0
        ? `,${file.resId}`
        : this.ruleForm.explainResId.indexOf(',') >= 0 ? `${file.resId},` : file.resId;

        this.ruleForm.explainResId = this.ruleForm.explainResId.replace(repla, '')
      },
      handleRemove2(file, fileList) {
        const repla = this.ruleForm.approvalDraftResId.indexOf(`,${file.resId}`) >= 0
        ? `,${file.resId}`
        : this.ruleForm.approvalDraftResId.indexOf(',') >= 0 ? `${file.resId},` : file.resId;
        this.ruleForm.approvalDraftResId = this.ruleForm.approvalDraftResId.replace(repla, '')
      },
      handleRemove3(file, fileList) {
        const repla = this.ruleForm.meetingSummaryResId.indexOf(`,${file.resId}`) >= 0
        ? `,${file.resId}`
        : this.ruleForm.meetingSummaryResId.indexOf(',') >= 0 ? `${file.resId},` : file.resId;
        this.ruleForm.meetingSummaryResId = this.ruleForm.meetingSummaryResId.replace(repla, '')
      },
      handleSuccess1(response, file, fileList){

        file.resId = response.data[0].resId
        if (this.ruleForm.explainResId) {
          this.ruleForm.explainResId += `,${response.data[0].resId}`
        } else {
          this.ruleForm.explainResId = response.data[0].resId + ''
        }

      },
      handleSuccess2(response, file, fileList){
        file.resId = response.data[0].resId
        if (this.ruleForm.approvalDraftResId) {
          this.ruleForm.approvalDraftResId += `,${response.data[0].resId}`
        } else {
          this.ruleForm.approvalDraftResId = response.data[0].resId + ''
        }
      },
      handleSuccess3(response, file, fileList){
        file.resId = response.data[0].resId
        if (this.ruleForm.meetingSummaryResId) {
          this.ruleForm.meetingSummaryResId += `,${response.data[0].resId}`
        } else {
          this.ruleForm.meetingSummaryResId = response.data[0].resId + ''
        }
      },
      getInfo(val) {
        let data1 = {
          'id': this.$route.query.id
        };
        let data2 = {
          'projId': this.$route.query.projId,
          'state': 21,
          // 'times': this.$route.query.times
        };
        // 业务办理
        standardDraftGetById(parseInt(this.$route.query.id)).then(res => {
          if(res.data){
            const { explainResId,approvalDraftResId,meetingSummaryResId } = res.data;
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

          }
          this.ruleForm = res.data? res.data : {}

        });
        //获取基本信息
        applicationDetail(data2).then(res => {
          this.ruleForm2 = res.data ? res.data : {}
        });
        if(val != 'update'){
          projectDetail(data2).then(res => {
            this.ruleForm3 = res.data[2];           //立项-国粮局    2
            this.ruleForm4 = res.data[1];           //立项-TC        1
            this.ruleForm5 = res.data[0];           //立项-SC        0
          });
        }
      },
      // 提交
      submitForm() {
        if (!this.ruleForm.endTime) {
          this.$message.error('请选择截止日期')
          return
        }
        if (!this.ruleForm.explainResId) {

          this.$message.error('请上传编制说明')
          return
        }
        let data;
        if (this.$route.query.id) {
          data = {
            "userId": this.userInfo.userId,
            "loginToken": this.userInfo.loginToken,
            "id": this.$route.query.id,
            "projId": this.$route.query.projId,
            "result": this.ruleForm.result,
            "opinion": this.ruleForm.opinion,
            "zxDepartment": this.ruleForm.zxDepartment,
            "endTime": this.ruleForm.endTime,
            "explainResId": this.ruleForm.explainResId,
            "approvalDraftResId": this.ruleForm.approvalDraftResId,
            "meetingSummaryResId": this.ruleForm.meetingSummaryResId,
            "operate": '2',
            "operateUserName": this.userInfo.realName
          };
        } else {
          data = {
            "userId": this.userInfo.userId,
            "loginToken": this.userInfo.loginToken,
            "projId": this.$route.query.projId,
            "result": this.ruleForm.result,
            "opinion": this.ruleForm.opinion,
            "zxDepartment": this.ruleForm.zxDepartment,
            "endTime": this.ruleForm.endTime,
            "explainResId": this.ruleForm.explainResId,
            "approvalDraftResId": this.ruleForm.approvalDraftResId,
            "meetingSummaryResId": this.ruleForm.meetingSummaryResId,
            "operate": '2',
            "operateUserName": this.userInfo.realName
          };
        }
        standardDraftReview(data).then(res => {
          if (res.code == 1) {
            this.$message.success('提交成功');
            this.$router.push({
              path: '/standarDraftingList'
            })
          }else{
            this.$message.error('提交失败');
          }
        }).catch(err=>{

        });
      },
      // 保存
      saveForm() {
        if (!this.ruleForm.endTime) {
          this.$message.error('请选择截止日期')
          return
        }
        if (!this.ruleForm.explainResId) {
          this.$message.error('请上传编制说明')
          return
        }
        let data;
        if (this.$route.query.id) {
          data = {
            "userId": this.userInfo.userId,
            "loginToken": this.userInfo.loginToken,
            "id": this.$route.query.id,
            "projId": this.$route.query.projId,
            "result": this.ruleForm.result,
            "opinion": this.ruleForm.opinion,
            "zxDepartment": this.ruleForm.zxDepartment,
            "endTime": this.ruleForm.endTime,
            "explainResId": this.ruleForm.explainResId,
            "approvalDraftResId": this.ruleForm.approvalDraftResId,
            "meetingSummaryResId": this.ruleForm.meetingSummaryResId,
            "operate": '1',
            "operateUserName": this.userInfo.realName,
          };
        } else {
          data = {
            "userId": this.userInfo.userId,
            "loginToken": this.userInfo.loginToken,
            "projId": this.$route.query.projId,
            "result": this.ruleForm.result,
            "opinion": this.ruleForm.opinion,
            "zxDepartment": this.ruleForm.zxDepartment,
            "endTime": this.ruleForm.endTime,
            "explainResId": this.ruleForm.explainResId,
            "approvalDraftResId": this.ruleForm.approvalDraftResId,
            "meetingSummaryResId": this.ruleForm.meetingSummaryResId,
            "operate": '1',
            "operateUserName": this.userInfo.realName,
          };
        }

        standardDraftReview(data).then(res => {
          if (res.code == 1) {
            this.$message.success('保存成功');
            this.$router.push({
              path: '/standarDraftingList'
            })
          }else{
            this.$message.error('保存失败');
          }
        }).catch(err=>{

        });
      },
         // 下拉框
      dataDictionary() {
      //  debugger
        //制定/修订
        let mendTypeOptionsData = {
          "userId": 1,
          'loginToken': 1,
          'parentId': 345
        };
        dataDictionary(mendTypeOptionsData).then(res => {
          this.mendTypeOptions = res.data
        })
        //采标类型
        let cbTypeOptionsData = {
          "userId": 1,
          'loginToken': 1,
          'parentId': 348
        };
        dataDictionary(cbTypeOptionsData).then(res => {
          this.cbTypeOptions = res.data
        })
        //标准类型
        let standardTypeOptionsData = {
          "userId": 1,
          'loginToken': 1,
          'parentId': 337
        };
        dataDictionary(standardTypeOptionsData).then(res => {
          this.standardTypeOptions = res.data
        })
        //采用程度
        let cbLevelOptionsData = {
          "userId": 1,
          'loginToken': 1,
          'parentId': 649
        };
        dataDictionary(cbLevelOptionsData).then(res => {
          this.cbLevelOptions = res.data
        })
        //项目周期
        let projectCycleOptionsData = {
          "userId": 1,
          'loginToken': 1,
          'parentId': 358
        };
        dataDictionary(projectCycleOptionsData).then(res => {
          // debugger
          this.projectCycleOptions = res.data
        })
        //是否采用快速程序
        // let column1OptionsData = {
        //     "userId":1,
        //     'loginToken':1,
        //     'parentId':362
        // };
        // dataDictionary(column1OptionsData).then(res=>{
        //     this.column1Options = res.data
        // })
        //是否采用快速程序
        let column2OptionsData = {
          "userId": 1,
          'loginToken': 1,
          'parentId': 687
        };
        dataDictionary(column2OptionsData).then(res => {
          this.column2Options = res.data
        })
        //标准类别
        // let standardTypeOptionsData = {
        //     "userId":1,
        //     'loginToken':1,
        //     'parentId':371
        // };
        // dataDictionary(standardTypeOptionsData).then(res=>{
        //     this.standardTypeOptions = res.data
        // })
        //是否有国家级科研项目支撑
        // let hasNationalOptionsData = {
        //     "userId":1,
        //     'loginToken':1,
        //     'parentId':387
        // };
        // dataDictionary(hasNationalOptionsData).then(res=>{
        //     this.hasNationalOptions = res.data
        // })
        //是否涉及专利
        // let hasPatentOptionsData = {
        //     "userId":1,
        //     'loginToken':1,
        //     'parentId':390
        // };
        // dataDictionary(hasPatentOptionsData).then(res=>{
        //     this.hasPatentOptions = res.data
        // })

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

  .btnGroup {
    margin-top: 30px;
    margin-left: 105px;
  }
</style>
