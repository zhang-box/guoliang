<template>
  <div class="content-wrapper">
    <div class="content-title">
      <el-button class="title-button" size="mini" @click="returnList">
        <i class="el-icon-arrow-left"></i> 返回</el-button>
      <span class="title-info">TC审核详情</span>
    </div>
    <div class="content-main">
      <el-tabs tab-position="left">
        <el-tab-pane label="业务办理">
          <el-form :model="ruleForm" ref="ruleForm" label-width="135px" class="demo-ruleForm mar-t-20">
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
                <el-form-item label="审核结果:" prop="resultStatus">
                  <el-radio-group v-model="ruleForm.result" :disabled="showType">
                    <el-radio v-model="ruleForm.result" label="1">同意</el-radio>
                    <el-radio v-model="ruleForm.result" label="0">驳回</el-radio>
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
          </el-form>
          <div v-if="showType">
            <el-form :model="ruleForm8" ref="ruleForm8" label-width="135px" class="demo-ruleForm mar-t-20">
              <el-row>
                <h3>标准审查—SC审核</h3>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="执行单位:" prop="ruleForm8.standardReviewScStage.zxDepartment">
                    <div class="list-width">{{ruleForm8.standardReviewScStage.zxDepartment}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="审核结果:" prop="ruleForm8.standardReviewScStage.result">
                    <div class="list-width">
                      <template v-if="ruleForm8.standardReviewScStage.result == '0'">
                        驳回
                      </template>
                      <template v-else-if="ruleForm8.standardReviewScStage.result == '1'">
                        同意
                      </template>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="审核意见:" prop="ruleForm8.standardReviewScStage.opinion">
                    <div v-if="showType" class="list-width">{{ruleForm8.standardReviewScStage.opinion}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="编制说明:">
                    <div class="list-width">
                      <li v-for="item in ruleForm8.instructionsList" :key="item.resId" @click="downloadFile(item.resId)" style="text-decoration:underline;color: #409EFF;">
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
                      <li v-for="item in ruleForm8.meetingSummaryList" :key="item.resId" @click="downloadFile(item.resId)" style="text-decoration:underline;color: #409EFF;">
                        {{item.name}}
                      </li>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-form :model="ruleForm7" ref="ruleForm7" label-width="135px" class="demo-ruleForm mar-t-20">
              <el-row>
                <h3>征集意见阶段</h3>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="执行单位:" prop="ruleForm7.seekOpinionTcStage.zxDepartment">
                    <div class="list-width">{{ruleForm7.seekOpinionTcStage.zxDepartment}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="截止日期:" prop="ruleForm7.seekOpinionTcStage.endTime">
                    {{ruleForm7.seekOpinionTcStage.endTime}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="征集方式:" prop="ruleForm7.seekOpinionTcStage.collectionMethod">
                    <div v-if="showType" class="list-width">
                      <template v-if="ruleForm7.seekOpinionTcStage.collectionMethod == '2'">
                        专家征集
                      </template>
                      <template v-else-if="ruleForm7.seekOpinionTcStage.collectionMethod == '1'">
                        公开征集
                      </template>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="标准送审稿:">
                    <div class="list-width">
                      <li v-for="item in ruleForm7.standReviewList" :key="item.resId" @click="downloadFile(item.resId)" style="text-decoration:underline;color: #409EFF;">
                        {{item.name}}
                      </li>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="编制说明:">
                    <div class="list-width">
                      <li v-for="item in ruleForm7.instructionsList" :key="item.resId" @click="downloadFile(item.resId)" style="text-decoration:underline;color: #409EFF;">
                        {{item.name}}
                      </li>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="征求意见汇总表:">
                    <div class="list-width">
                      <li v-for="item in ruleForm7.summaryList" :key="item.resId" @click="downloadFile(item.resId)" style="text-decoration:underline;color: #409EFF;">
                        {{item.name}}
                      </li>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-form :model="ruleForm6" ref="ruleForm6" label-width="135px" class="demo-ruleForm mar-t-20">
              <el-row>
                <h3>标准起草</h3>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="执行单位:" prop="ruleForm6.standardDraftStage.zxDepartment">
                    <div class="list-width">{{ruleForm6.standardDraftStage.zxDepartment}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="截止日期:" prop="ruleForm6.standardDraftStage.endTime">
                    <div v-if="showType" class="list-width">{{ruleForm6.standardDraftStage.endTime}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="编制说明:">
                    <div class="list-width">
                      <li v-for="item in ruleForm6.explainList" :key="item.resId" @click="downloadFile(item.resId)" style="text-decoration:underline;color: #409EFF;">
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
                      <li v-for="item in ruleForm6.meetingSummaryList" :key="item.resId" @click="downloadFile(item.resId)" style="text-decoration:underline;color: #409EFF;">
                        {{item.name}}
                      </li>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-form>
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
                  <!-- <div  v-if="showType" class="list-width" >{{ruleForm2.proCname}}</div>
               <el-input size="small" v-else-if="updateType" v-model="ruleForm2.proCname" >
               </el-input>
               <el-input size="small" v-else v-model="ruleForm2.proCname"  >
               </el-input> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="英文名称:" prop="proEname">
                  <div class="list-width">{{ruleForm2.proEname}}</div>
                  <!-- <div  v-if="showType" class="list-width" >{{ruleForm2.proEname}}</div>
               <el-input size="small" v-else-if="updateType" v-model="ruleForm2.proEname" >
               </el-input>
               <el-input size="small" v-else v-model="ruleForm2.proEname"  >
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
              <el-col :span="10" v-if="ruleForm2.mendType != 0 ">
                <el-form-item label="被修订的标准号:" prop="standardNo">
                  <div class="list-width">{{ruleForm2.mendType == null?'':ruleForm2.mendType==0?'制定':'修订'}}</div>
                  <!-- <div  v-if="showType" class="list-width" >{{ruleForm2.standardNo}}</div>
               <el-input class="input-width" v-else-if="updateType" v-model="ruleForm2.standardNo"></el-input>
               <el-input class="input-width" v-else v-model="ruleForm2.standardNo"></el-input> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item v-if="ruleForm2.mendType==1" label="标准类别:" prop="standardType">
                  <div class="list-width">{{showStandType(ruleForm2.standardType)}}</div>
                  <!-- <div  v-if="showType" class="list-width" >{{ruleForm2.standardType}}</div>
               <el-select v-else-if="updateType" v-model="ruleForm2.standardType"  >
                 <el-option v-for="item in standardTypeOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
               </el-select>
               <el-select v-else v-model="ruleForm2.standardType" >
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
                  <!-- <div  v-if="showType" class="list-width" >{{ruleForm2.technicalDepartment}}</div>
               <el-input size="small" v-else-if="updateType" v-model="ruleForm2.technicalDepartment" >
               </el-input>
               <el-input size="small" v-else v-model="ruleForm2.technicalDepartment"  >
               </el-input> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="起草单位:" prop="draftDepartment">
                  <div class="list-width">{{ruleForm2.draftDepartment}}</div>
                  <!-- <div  v-if="showType" class="list-width" >{{ruleForm2.draftDepartment}}</div>
                    <el-input class="input-width" v-else-if="updateType" v-model="ruleForm2.draftDepartment"></el-input>
                    <el-input class="input-width" v-else v-model="ruleForm2.draftDepartment"></el-input> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="项目周期:" prop="projectCycle">
                  <div class="list-width" :rel="ruleForm2.projectCycle">{{findDictValue(this.projectCycleOptions,ruleForm2.projectCycle)}}</div>
                  <!-- <div  v-if="showType" class="list-width" >{{ruleForm2.projectCycle}}</div>
               <el-select v-else-if="updateType" v-model="ruleForm2.projectCycle"  >
                 <el-option v-for="item in projectCycleOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
               </el-select>
               <el-select v-else v-model="ruleForm2.projectCycle" >
                 <el-option v-for="item in projectCycleOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
               </el-select> -->
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="是否有国家级科研项目支撑:" prop="hasNational">
                  <div class="list-width">{{ruleForm2.hasNational=='1'?'是':'否'}}</div>
                   <!-- <div v-if="showType" class="list-width">{{hasNationalOptions[ruleForm.hasNational]}}</div>
              <el-select v-else-if="updateType" v-model="ruleForm.hasNational">
                <el-option v-for="(item,index) in hasNationalOptions" :key="index" :label="item" :value="index"> </el-option>
              </el-select>
              <el-select v-else v-model="ruleForm.hasNational">
                <el-option v-for="(item,index) in hasNationalOptions" :key="index" :label="item" :value="index"> </el-option>
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
                <el-button type="text" size="small"  @click="downloadFile(scope.row.resId)">
                  <i class="icon iconfont icon-xiazai"></i> 下载
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="投票结果">
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" ref="formLabelAlign">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="投票状态 :">
                  <span>{{formLabelAlign.voteStatus}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="投票结果 :">
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="赞成 :">
                        <span>{{formLabelAlign.approveCount}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="不赞成 :">
                        <span>{{formLabelAlign.approveCount}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="弃权 :">
                        <span>{{formLabelAlign.approveCount}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="投票率 :">
                        <span class="list-width">{{formLabelAlign.voteRate}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <hr>
          <el-table :data="tableData3" border style="width: 100%;margin-top: 25px" class="table1">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="title" label="投票标题" width="180"> </el-table-column>
            <el-table-column prop="participateTime" label="创建日期"> </el-table-column>
            <el-table-column prop="result" label="投票情况">

              <!-- <el-form-item label="审核结果:" prop="resultStatus">
                  <el-radio-group v-model="ruleForm.result" :disabled="showType">
                    <el-radio v-model="ruleForm.result" label="1">同意</el-radio>
                    <el-radio v-model="ruleForm.result" label="0">驳回</el-radio>
                  </el-radio-group>
                </el-form-item> -->

            </el-table-column>
            <el-table-column prop="userName" label="投票人"> </el-table-column>
            <el-table-column prop="address" label="备注"> </el-table-column>
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
          <el-button type="primary" @click="submitForm">提交</el-button>
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
  import {getStandType , findDictValue} from 'api/vars';
  import {getProjectDetailById,relatedDocTc,getFlowTc,tcReviewListDetail,tcReview,voteDartList,dataDictionary} from 'api/standardAppliList/standardReview/standardReview'
  import {voteUrl} from 'api/index'
  import {projectDetail} from 'api/standardAppliList/standardApproval/standardApproval'
  import {Message} from 'element-ui'
  export default {
    data() {
      return {
        stateDoc:'',
        ruleForm8 : {
          instructionsList: [{
            name: '',
            resId: ''
          }],
          meetingSummaryList: [{
            name: '',
            resId: ''
          }],
          standardReviewScStage: {
            zxDepartment: "",
            result: "",
            opinion: "",
          },
        },       //标准审查-SC
        ruleForm7 : {
          seekOpinionTcStage: {
            zxDepartment: "",
            endTime: "",
            collectionMethod: ""
          },
          instructionsList: [{
            name: '',
            resId: ''
          }],
          standReviewList: [{
            name: '',
            resId: ''
          }],
          summaryList: [{
            name: '',
            resId: ''
          }],
        },        //征集意见
        ruleForm6: {
          standardDraftStage: {
            zxDepartment: "1",
            endTime: "",
          },
          meetingSummaryList: [
            {
              name: '',
              resId: ''
            }
          ],
          explainList: [
            {
              name: '',
              resId: ''
            }
          ],
        },        //起草
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
        fileList: [],
        pickerOptions0: {
          disabledDate: (time) => {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        isImport:'',//是否为重要标准 0:否 1:是
        isImportOptions:{0:'否',1:'是'},
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
        // 。。。。。。。。。。。。。。。。。。。。。。。。

    ruleForm: {
          result: '',
          opinion: '',
          zxDepartment:'',
          endTime: '',
          instructionsResId: '',
          approvalDraftResId: '',
          meetingSummaryResId: '',
            proCname:'', //中文名称
            proEname:'', //英文名称
            mendType:'',//制定/修订
            standardNo:'',//被修订的标准号
            cbType:0,//采标类型
            cbLevel:'',//采用程度
            cbNo:'',//采标号
            cbName:'',//采标名称
            standardType:'',//标准类别
            ics:'',//ics
            reportDepartment:'',//上报单位
            technicalDepartment:'',//技术委员会或技术归口单位
            chargeDepartment:'',//主管部门
            draftDepartment:'',//起草单位
            projectCycle:'',//项目周期
            column1:'',//是否采用快速程序
            column2:'',//是否采用快速程序
            budgetExplain:'',//经费预算说明
            purpose:'',//目的意义
            mainContent:'',//范围和主要技术内容
            briefDescription:'',//国内外情况简要说明
            lawsShip:'',//有关法律法规和强制性标准的关系
            inventory:'',//标准涉及的产品清单
            hasNational:'',//是否有国家级科研项目支撑 0:否 1:是
            hasPatent:'',//是否涉及专利 0:否 1:是
            patentNo:'',//专利号及名称
            proProposalResId:'',//项目建议文件
            meetingSummaryResId:'', //会议纪要文档
            operateUserName:'测试', //登录人姓名
        },

// 。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。

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

// 。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
        ruleForm2: {},
        downloadUrl:voteUrl,
        fileUploadUrl: null, //上传接口
        showType: false,
        updateType: false,
        radio2: 1,
        plateOptions: [],
        payOptions: [],
        refuelingOptions: [],
        tableData: [],
        tableData2: [],
        formLabelAlign: {
          states: '',
          zancheng: '',
          buzancheng: '',
          qiquan: '',
          lv: ''
        },
 tableData3: [],
        // 投票结果
        formLabelAlign: {},
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
      // debugger
      if (this.$route.query.type === 'show') {
        this.getInfo('show')
        this.showType = true;
      } else if (this.$route.query.type === 'review') {
        this.getInfo('review')
        this.updateType = true
      }
      this.fileUploadUrl = voteUrl;
      this.dataDictionary()
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
          'times': times,
          'workflow':'TC'
        };

        //获取项目进度
        getFlowTc(data).then(res => {
          // debugger
          if (res.data.length != '0') {
            for (var i = 0; i < res.data.length; i++) {
              this.tableData2.push(res.data[i])
            }
          }
        });
        //获取相关文件
        relatedDocTc(data).then(res => {
          // debugger
          // console.log(res)
          if (res.data.length != '0') {
            for (var i = 0; i < res.data.length; i++) {
              this.tableData.push(res.data[i])
            }
          }
        });
        // 投票结果
           voteDartList(data).then(res => {
          this.formLabelAlign = res.data?res.data:{}
          this.tableData3 = res.data.voteList?res.data.voteList:[]
        })
      })
    },
    methods: {
      // download(url) {
      //   window.location.href = url;
      // },
         findDictValue(dict,id){
         return findDictValue(dict,id)
       },
      showStandType(str){
        return getStandType(str);
      },
      downloadFile(id){
        if(id){
          window.location.href = voteUrl + '/resNew/fileDownload?resId=' + id
        }
      },
      returnList() {
        this.$router.push({
          name: "TCReviewList"
        })
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleRemove1(file, fileList) {
        this.ruleForm.instructionsResId = ''
      },
      handleRemove2(file, fileList) {
        this.ruleForm.approvalDraftResId = ''
      },
      handleRemove3(file, fileList) {
        this.ruleForm.meetingSummaryResId = ''
      },
      handleSuccess1(response, file, fileList) {
        // console.log(this.fileIds);
        this.ruleForm.instructionsResId = response.data[0].resId
      },
      handleSuccess2(response, file, fileList) {
        // console.log(this.fileIds);
        this.ruleForm.approvalDraftResId = response.data[0].resId
      },
      handleSuccess3(response, file, fileList) {
        // console.log(this.fileIds);
        this.ruleForm.meetingSummaryResId = response.data[0].resId
      },
      getInfo(val) {
        let data1 = {
          'id': this.$route.query.id
        };
        let data2 = {
          'projId': this.$route.query.projId,
          'state': 42,
          'times': this.$route.query.times,
        };
    // 业务办理
        tcReviewListDetail(parseInt(this.$route.query.id)).then(res => {
          // debugger
          console.log(res)

              this.ruleForm = res.data ? res.data : {}


        });
        //获取基本信息
        getProjectDetailById(data2).then(res => {
          // debugger
          this.ruleForm2 = res.data ? res.data : {}
        });
        if(val != 'review'){
          projectDetail(data2).then(res => {
            this.ruleForm3 = res.data[2];           //立项-国粮局    2
            this.ruleForm4 = res.data[1];           //立项-TC        1
            this.ruleForm5 = res.data[0];           //立项-SC        0
            this.ruleForm6 = res.data[3];           //起草           3
            this.ruleForm7 = res.data[4];           //征集意见       4
            this.ruleForm8 = res.data[5];           //标准审查-SC    5
          });
        }


      },
      submitForm() {
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
            "instructionsResId": this.ruleForm.instructionsResId,
            "approvalDraftResId": this.ruleForm.approvalDraftResId,
            "meetingSummaryResId": this.ruleForm.meetingSummaryResId,
            "operate": '2',
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
              "instructionsResId": this.ruleForm.instructionsResId,
              "approvalDraftResId": this.ruleForm.approvalDraftResId,
              "meetingSummaryResId": this.ruleForm.meetingSummaryResId,
              "operate": '2',
             "operateUserName": this.userInfo.realName,
          };
        }
        tcReview(data).then(res => {
          if (res.code == 1) {
            this.$message.success('提交成功');
            this.$router.push({
              path: '/TCReviewList'
            })
          }else{
            this.$message.error('提交失败');
          }
        }).catch(err=>{

        });
      },
        dataDictionary(){
        //制定/修订
        let mendTypeOptionsData = {
            "userId":1,
            'loginToken':1,
            'parentId':345
        };
        dataDictionary(mendTypeOptionsData).then(res=>{
            this.mendTypeOptions = res.data
        })
        //采标类型
        let cbTypeOptionsData = {
            "userId":1,
            'loginToken':1,
            'parentId':348
        };
        dataDictionary(cbTypeOptionsData).then(res=>{
            this.cbTypeOptions = res.data
        })
        //标准类型
        let standardTypeOptionsData = {
            "userId":1,
            'loginToken':1,
            'parentId':337
        };
        dataDictionary(standardTypeOptionsData).then(res=>{
            this.standardTypeOptions = res.data
        })
        //采用程度
        let cbLevelOptionsData = {
            "userId":1,
            'loginToken':1,
            'parentId':649
        };
        dataDictionary(cbLevelOptionsData).then(res=>{
            this.cbLevelOptions = res.data
        })
        //项目周期
        let projectCycleOptionsData = {
            "userId":1,
            'loginToken':1,
            'parentId':358
        };
        dataDictionary(projectCycleOptionsData).then(res=>{
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
            "userId":1,
            'loginToken':1,
            'parentId':687
        };
        dataDictionary(column2OptionsData).then(res=>{
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
  .btnGroup{
    text-align: center;
  }
  .zxInput .el-input__inner{
    height: 33px;
    line-height: 33px;
  }
</style>
