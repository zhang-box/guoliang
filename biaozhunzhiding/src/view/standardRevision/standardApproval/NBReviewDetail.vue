<template>
  <div class="content-wrapper">
    <div class="content-title">
      <el-button class="title-button" size="mini" @click="returnList"><i class="el-icon-arrow-left"></i> 返回</el-button>
      <span class="title-info">国家局审核</span>
    </div>
    <div class="content-main">
      <el-tabs tab-position="left" >
        <el-tab-pane label="业务办理">
          <el-form :model="ruleForm" ref="ruleForm" label-width="135px" class="demo-ruleForm mar-t-20">
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
                <el-form-item label="审核结果:" prop="result" required>
                  <div v-if="showType" class="list-width">
                    <template v-if="ruleForm3.standardProjGrainStage.result == '0'">
                      驳回
                    </template>
                    <template v-else-if="ruleForm3.standardProjGrainStage.result == '1'">
                      同意
                    </template>
                  </div>
                  <el-radio-group v-else v-model="ruleForm.result" :disabled ="showType" >
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
            <el-form :model="ruleForm10" ref="ruleForm10" label-width="135px" class="demo-ruleForm mar-t-20">
              <el-row>
                <h3>标准报批—TC审核</h3>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="执行单位:" prop="ruleForm10.standardApprovalTcStage.zxDepartment">
                    <div class="list-width">{{ruleForm10.standardApprovalTcStage.zxDepartment}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="审核结果:" prop="ruleForm10.standardApprovalTcStage.result">
                    <div class="list-width">
                      <template v-if="ruleForm10.standardApprovalTcStage.result == '0'">
                        驳回
                      </template>
                      <template v-else-if="ruleForm10.standardApprovalTcStage.result == '1'">
                        同意
                      </template>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="审核意见:" prop="ruleForm10.standardApprovalTcStage.opinion">
                    <div v-if="showType" class="list-width">{{ruleForm10.standardApprovalTcStage.opinion}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="截止日期:" prop="ruleForm10.standardApprovalTcStage.endTime">
                    <div v-if="showType" class="list-width">{{ruleForm10.standardApprovalTcStage.endTime}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="编制说明:">
                    <div class="list-width">
                      <li v-for="item in ruleForm10.instructionsList" :key="item.resId" @click="downloadFile(item.resId)" style="text-decoration:underline;color: #409EFF;">
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
                      <li v-for="item in ruleForm10.meetingSummaryList" :key="item.resId" @click="downloadFile(item.resId)" style="text-decoration:underline;color: #409EFF;">
                     {{item.name}}
                      </li>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-form :model="ruleForm9" ref="ruleForm9" label-width="135px" class="demo-ruleForm mar-t-20">
              <el-row>
                <h3>标准审查—TC审核</h3>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="执行单位:" prop="ruleForm9.standardReviewTcStage.zxDepartment">
                    <div class="list-width">{{ruleForm9.standardReviewTcStage.zxDepartment}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="审核结果:" prop="ruleForm9.standardReviewTcStage.result">
                    <div class="list-width">
                      <template v-if="ruleForm9.standardReviewTcStage.result == '0'">
                        驳回
                      </template>
                      <template v-else-if="ruleForm9.standardReviewTcStage.result == '1'">
                        同意
                      </template>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="审核意见:" prop="ruleForm9.standarstandardReviewTcStagedProjTcStage.opinion">
                    <div v-if="showType" class="list-width">{{ruleForm9.standardReviewTcStage.opinion}}</div>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-form>
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
          <el-button v-if="!showType" type="primary" style="margin-left:20%;margin-right:5%;" @click="saveForm" :disabled="disableType">保 存</el-button>
          <el-button v-if="!showType" type="primary" style="margin-right:5%;" @click="submitForm" :disabled="disableType">提 交</el-button>
          <el-button v-if="!showType" type="primary" @click="returnList">取 消</el-button>
        </el-tab-pane>
        <el-tab-pane label="基本信息">
          <el-form :model="ruleForm2"  ref="ruleForm2" label-width="235px" class="demo-ruleForm mar-t-20">
            <el-row>
              <el-col :span="20">
                <el-form-item label="中文名称:" prop="proCname">
                  <div class="list-width" >{{ruleForm2.proCname}}</div>
                  <!-- <div  v-if="showType" class="list-width" >{{ruleForm2.proCname}}</div>
                  <el-input size="small" v-else-if="updateType" v-model="ruleForm2.proCname" >
                  </el-input>
                  <el-input size="small" v-else v-model="ruleForm2.proCname" >
                  </el-input>-->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="英文名称:" prop="proEname">
                  <div class="list-width" >{{ruleForm2.proEname}}</div>
                  <!-- <div  v-if="showType" class="list-width" >{{ruleForm2.proEname}}</div>
                  <el-input size="small" v-else-if="updateType" v-model="ruleForm2.proEname" >
                  </el-input>
                  <el-input size="small" v-else v-model="ruleForm2.proEname"  >
                  </el-input>-->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="制定/修订:" prop="mendType">
                  <div class="list-width" >
                    <!--<template slot-scope="scope">-->
                    <template v-if="ruleForm2.mendType == '0'">
                      制定
                    </template>
                    <template v-else-if="ruleForm2.mendType == '1'">
                      修订
                    </template>
                    <!--</template>-->
                  </div>
                  <!-- <div  v-if="showType" class="list-width" >{{ruleForm2.mendType}}</div>
                  <el-select v-else-if="updateType" v-model="ruleForm2.mendType"  >
                    <el-option v-for="item in mendTypeOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
                  </el-select>
                  <el-select v-else v-model="ruleForm2.mendType">
                    <el-option
                      v-for="(item,index) in options2"
                      :key="index"
                      :label="item"
                      :value="index">
                    </el-option>
                  </el-select>-->
                </el-form-item>
              </el-col>
              <el-col :span="10" v-if="ruleForm2.mendType != 0 ">
                <el-form-item label="被修订的标准号:" prop="standardNo">
                  <div class="list-width" >{{ruleForm2.standardNo}}</div>
                  <!-- <div  v-if="showType" class="list-width" >{{ruleForm2.standardNo}}</div>
                  <el-input class="input-width" v-else-if="updateType" v-model="ruleForm2.standardNo"></el-input>
                  <el-input class="input-width" v-else v-model="ruleForm2.standardNo"></el-input>-->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="标准类别:" prop="standardType">
                  <div class="list-width" >{{ruleForm2.standardType}}</div>
                  <!-- <div  v-if="showType" class="list-width" >{{ruleForm2.standardType}}</div>
                  <el-select v-else-if="updateType" v-model="ruleForm2.standardType"  >
                    <el-option v-for="item in standardTypeOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
                  </el-select>
                  <div v-else v-model="ruleForm2.standardType" class="search-width" style="display:inline-block;">
                    <el-cascader
                      :options="options"
                      v-model="selectedOptions"
                      @change="handleChange">
                    </el-cascader>
                  </div>-->
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
                  <!-- <div  v-if="showType" class="list-width" >{{ruleForm2.technicalDepartment}}</div>
                  <el-input size="small" v-else-if="updateType" v-model="ruleForm2.technicalDepartment" >
                  </el-input>
                  <el-input size="small" v-else v-model="ruleForm2.technicalDepartment"  >
                  </el-input>-->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="起草单位:" prop="draftDepartment">
                  <div class="list-width" >{{ruleForm2.draftDepartment}}</div>
                  <!-- <div  v-if="showType" class="list-width" >{{ruleForm2.draftDepartment}}</div>
                  <el-input class="input-width" v-else-if="updateType" v-model="ruleForm2.draftDepartment"></el-input>
                  <el-input class="input-width" v-else v-model="ruleForm2.draftDepartment"></el-input>-->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="项目周期:" prop="projectCycle">
                  <div class="list-width" >
                    <span v-for="item in projectCycleOptions" v-if="ruleForm2.projectCycle == item.id">{{item.dictValue}}</span>
                  </div>
                  <!-- <div  v-if="showType" class="list-width" >{{ruleForm2.projectCycle}}</div>
                  <el-select v-else-if="updateType" v-model="ruleForm2.projectCycle"  >
                    <el-option v-for="item in projectCycleOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
                  </el-select>
                  <el-select v-else v-model="ruleForm2.projectCycle" >
                    <el-option v-for="item in projectCycleOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
                  </el-select>-->
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="是否有国家级科研项目支撑:" prop="hasNational">
                  <div class="list-width" >
                    <template v-if="ruleForm2.hasNational == '0'">
                      否
                    </template>
                    <template v-else-if="ruleForm2.hasNational == '1'">
                      是
                    </template>
                  </div>
                  <!-- <div  v-if="showType" class="list-width" >{{ruleForm2.hasNational}}</div>
                  <el-select v-else-if="updateType" v-model="ruleForm2.hasNational"  >
                    <el-option v-for="item in hasNationalOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
                  </el-select>
                  <el-select v-else v-model="ruleForm2.hasNational" >
                    <el-option v-for="item in hasNationalOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
                  </el-select>-->
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
          <!--<el-button v-if="!showType" type="primary" style="margin-left:20%;margin-right:5%;" @click="saveInfo">保 存</el-button>-->
          <!--<el-button v-if="!showType" type="primary" style="margin-right:5%;" @click="submitInfo">提 交</el-button>-->
          <!--<el-button v-if="!showType" type="primary" @click="returnList">取 消</el-button>-->
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
                <el-button type="text" size="small" @click="download(scope.row.resId)"><i
                  class="icon iconfont icon-xiazai"></i> 下载
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="项目进度">
          <el-table :data="tableData2" border style="width: 100%;margin-top:10px;" class="table1">
            <el-table-column type="index" label="序号" width="180"></el-table-column>
            <el-table-column prop="name" label="环节" width="300"></el-table-column>
            <el-table-column prop="beginTime" label="开始时间" width="250"></el-table-column>
            <el-table-column prop="endTime" label="结束时间" width="250"></el-table-column>
          </el-table>
        </el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>

<script>
  import {getProjectDetailById, relatedDoc, getFlow, approvalGrainById, approvalGrainReview, applySend, projectDetail} from 'api/standardAppliList/standardApproval/standardApproval'
  import {Message} from 'element-ui'

  import {voteUrl} from 'api/index'
  import 'api/standardAppliList/standardProject/setData.js'
  import {dataDictionary} from 'api/standardAppliList/standardProject/standardProject'  //数据字典
  export default {
    data() {
      return {
        stateDoc:'',
        zxDepartment:'',
        disableType:false,
        fileList:[],
        pickerOptions0: {
          disabledDate: (time) => {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        labelPosition:'left',
        ruleForm: {
          result: '',
          opinion: '',
          zxDepartment: '',
        },
        ruleForm2: { },
        ruleForm10 : {
          instructionsList: [{
            name: '',
            resId: ''
          }],
          meetingSummaryList: [{
            name: '',
            resId: ''
          }],
          standardApprovalTcStage: {
            result: "",
            opinion: "",
            zxDepartment: "",
            endTime: "",
          },
        },       //标准报批-TC
        ruleForm9: {
          standardReviewTcStage: {
            zxDepartment: "",
            result: "",
            opinion: "",
          },
        },       //标准审查-TC
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

        fileUploadUrl:null, //上传接口
        showType: false,
        updateType: false,
        radio2: 1,
        plateOptions: [],
        payOptions: [],
        refuelingOptions: [],
        tableData:[],
        tableData2: [],


        // ********************下拉列表*******************************
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
        selectedOptions: [],
        options2:{0:'制定',1:'修订'} ,
        isImport:'',//是否为重要标准 0:否 1:是
        isImportOptions:{0:'否',1:'是'},
        // plateOptions: [],
        // payOptions: [],
        // refuelingOptions: [],
        // mendTypeOptions:[],
        // cbTypeOptions:[],
        // standardTypeOptions:[] ,
        // options3:[] ,
        projectCycleOptions:[],
        // column1Options:[],
        // column2Options:[],
        hasNationalOptions:[],
        // hasPatentOptions:[],
        // proStandardTypeOptions:[],
        userInfo:{},   //登录人信息
      };
    },
    created(){
      this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
      if (this.$route.query.type === 'show') {
        // console.log("show")
        this.getInfo('show');
        this.showType = true;
      } else if (this.$route.query.type === 'review') {
        this.getInfo('review');
        this.updateType = true
      }
      // this.selectAllInfo()

      this.fileUploadUrl = voteUrl;
      this.dataDictionary();
      // this.getSelectInfo();

    },
    mounted(){
      this.$nextTick(function() {
        if(this.$route.query.info.state == '2'){
          this.stateDoc = '2'   //通过
        }else{
          this.stateDoc = ''
        }
        let data = {
          'projId' : this.$route.query.info.projId,
          'stateType' : this.stateDoc,
          'state' : '52',
          'times' : this.$route.query.info.times
        };
        //获取项目进度
        getFlow(data).then(res=>{
          if(res.data.length != '0'){
            for(var i = 0; i< res.data.length; i++){
              this.tableData2.push(res.data[i])
            }
          }
        });
        //获取相关文件
        relatedDoc(data).then(res=>{
          if(res.data.length != '0') {
            for (var i = 0; i < res.data.length; i++) {
              this.tableData.push(res.data[i])
            }
          }
        });
      })
    },
    methods: {
      downloadFile(id){
        if(id){
          window.location.href = voteUrl + '/resNew/fileDownload?resId=' + id
        }
      },
      dataDictionary(){
        //项目周期
        let projectCycleOptionsData = {
          "userId": this.userInfo.userId,
          'loginToken': this.userInfo.loginToken,
          'parentId': 358
        };
        dataDictionary(projectCycleOptionsData).then(res => {
          this.projectCycleOptions = res.data
        })
      },
      download(url){
        window.location.href = url;
      },
      returnList(){
        this.$router.push({name: "NBApprovalList"})
      },
      getInfo(val){
        let data1 = {
          'id' : this.$route.query.info.id
        };
        let data2 = {
          'projId' : this.$route.query.info.projId,
          'state' : '52',
          'times' : this.$route.query.info.times
        };

        //获取办理业务
        approvalGrainById(parseInt(this.$route.query.info.id)).then(res=>{
          this.ruleForm = res.data
        });
        //获取基本信息
        getProjectDetailById(data2).then(res=>{
          this.ruleForm2 = res.data;
          this.ruleForm2.standardType = mdata.getData(this.options,res.data.standardType);
        });
        if(val != 'review'){
          projectDetail(data2).then(res => {
            this.ruleForm3 = res.data[2];           //立项-国粮局    2
            this.ruleForm4 = res.data[1];           //立项-TC        1
            this.ruleForm5 = res.data[0];           //立项-SC        0
            this.ruleForm6 = res.data[3];           //起草           3
            this.ruleForm7 = res.data[4];           //征集意见       4
            this.ruleForm8 = res.data[5];           //标准审查-SC    5
            this.ruleForm9 = res.data[6];           //标准审查-TC    6
            this.ruleForm10 = res.data[7];          //标准报批-TC    7
          });
        }
      },
      submitForm() {
        this.disableType = true;
        if(this.ruleForm.result == '') {
          this.$message.warning('请选择审核结果！');
          this.disableType = false;
        }else{
          let data = {};
          if(this.$route.query.info.id){
            data = {
              "userId": this.userInfo.userId,
              "loginToken": this.userInfo.loginToken,
              "id": this.$route.query.info.id,
              "projId": this.$route.query.info.projId,
              "result": this.ruleForm.result,
              "opinion": this.ruleForm.opinion,
              "zxDepartment": this.ruleForm.zxDepartment,
              "operate": '2',
              "operateUserName": this.userInfo.realName
            };
          }else{
            data = {
              "userId": this.userInfo.userId,
              "loginToken": this.userInfo.loginToken,
              "projId": this.$route.query.info.projId,
              "result": this.ruleForm.result,
              "opinion": this.ruleForm.opinion,
              "zxDepartment": this.ruleForm.zxDepartment,
              "operate": '2',
              "operateUserName": this.userInfo.realName
            };
          }
          approvalGrainReview(data).then(res=>{
            if (res.code == 1) {
              this.$message.success('提交成功');
              this.$router.push({
                path: '/NBApprovalList'
              })
            }else{
              this.$message.error('提交异常');
              this.disableType = false;
            }
          }).catch(err=>{

          });
        }

      },
      saveForm() {
        this.disableType = true;
        if(this.ruleForm.result == '' && this.ruleForm.opinion == '' && this.ruleForm.zxDepartment == ''){
          this.$message.warning('请填写页面信息！');
          this.disableType = false;
        }else{
          let data = {};
          if(this.$route.query.info.id){
            data = {
              "userId": this.userInfo.userId,
              "loginToken": this.userInfo.loginToken,
              "id": this.$route.query.info.id,
              "projId": this.$route.query.info.projId,
              "result": this.ruleForm.result,
              "opinion": this.ruleForm.opinion,
              "zxDepartment": this.ruleForm.zxDepartment,
              "operate": '1',
              "operateUserName": this.userInfo.realName
            };
          }else{
            data = {
              "userId": this.userInfo.userId,
              "loginToken": this.userInfo.loginToken,
              "projId": this.$route.query.info.projId,
              "result": this.ruleForm.result,
              "opinion": this.ruleForm.opinion,
              "zxDepartment": this.ruleForm.zxDepartment,
              "operate": '1',
              "operateUserName": this.userInfo.realName
            };
          }
          approvalGrainReview(data).then(res=>{
            if (res.code == 1) {
              this.$message.success('保存成功');
              this.$router.push({
                path: '/NBApprovalList'
              })
            }else{
              this.$message.error('保存异常');
              this.disableType = false;
            }
          }).catch(err=>{

          });
        }

      },
      returnList(){
        this.$router.push({path: '/NBApprovalList'})
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
