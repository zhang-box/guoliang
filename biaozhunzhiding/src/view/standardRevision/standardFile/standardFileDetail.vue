<template>
  <div class="content-wrapper">
    <div class="content-title">
      <el-button class="title-button" size="mini" @click="returnList"><i class="el-icon-arrow-left"></i> 返回</el-button>
      <span class="title-info">标准档案详情</span>
    </div>
    <div class="content-main">
      <el-tabs tab-position="left" >
        <el-tab-pane label="基本信息">
            <el-form :model="ruleForm"  ref="ruleForm" label-width="235px" class="demo-ruleForm mar-t-20">
        <el-row>
          <el-col :span="20">
            <el-form-item label="中文名称:" prop="proCname">
              <div  v-if="showType" class="list-width" >{{ruleForm.proCname}}</div>
              <el-input size="small" v-else-if="updateType" v-model="ruleForm.proCname" >
              </el-input>
              <el-input size="small" v-else v-model="ruleForm.proCname"  >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="英文名称:" prop="proEname">
              <div  v-if="showType" class="list-width" >{{ruleForm.proEname}}</div>
              <el-input size="small" v-else-if="updateType" v-model="ruleForm.proEname" >
              </el-input>
              <el-input size="small" v-else v-model="ruleForm.proEname"  >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="制定/修订:" prop="mendType">
              <div  v-if="showType" class="list-width" >{{options2[ruleForm.mendType]}}</div>
              <el-select v-else-if="updateType" v-model="ruleForm.mendType"  >
                <el-option v-for="item in mendTypeOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
              </el-select>
              <el-select v-else v-model="ruleForm.mendType" >
                <el-option v-for="item in mendTypeOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10"  v-if="ruleForm.mendType != 0 ">
            <el-form-item label="被修订的标准号:" prop="standardNo">
              <div  v-if="showType" class="list-width" >{{ruleForm.standardNo}}</div>
              <el-input class="input-width" v-else-if="updateType" v-model="ruleForm.standardNo"></el-input>
              <el-input class="input-width" v-else v-model="ruleForm.standardNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="采标类型:" prop="dictValue">
              <div  v-if="showType" class="list-width" ><span v-for="item in cbTypeOptions" v-if="ruleForm.cbType === item.id">{{item.dictValue}}</span></div>
              <el-select v-else v-model="ruleForm.cbType"  placeholder="请选择">
                <el-option v-for="item in cbTypeOptions" :key="item.id" :label="item.dictValue" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10"  v-if="ruleForm.cbType != 643">
            <el-form-item label="采用程度:" prop="cbLevel">
              <div  v-if="showType" class="list-width" ><span v-for="item in cbLevelOptions" v-if="ruleForm.cbLevel == item.id">{{item.dictValue}}</span></div>
              <el-input class="input-width" v-else-if="updateType" v-model="ruleForm.cbLevel"></el-input>
              <el-input class="input-width" v-else v-model="ruleForm.cbLevel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10"  v-if="ruleForm.cbType != 643">
            <el-form-item label="采标号:" prop="cbNo">
              <div  v-if="showType" class="list-width" >{{ruleForm.cbNo}}</div>
              <el-input class="input-width" v-else-if="updateType" v-model="ruleForm.cbNo"></el-input>
              <el-input class="input-width" v-else v-model="ruleForm.cbNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10"  v-if="ruleForm.cbType != 643">
            <el-form-item label="采标名称:" prop="cbName">
              <div  v-if="showType" class="list-width" >{{ruleForm.cbName}}</div>
              <el-input class="input-width" v-else-if="updateType" v-model="ruleForm.cbName"></el-input>
              <el-input class="input-width" v-else v-model="ruleForm.cbName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="标准类别:" prop="standardType">
              <div  v-if="showType" class="list-width" >{{ruleForm.standardType}}</div>
              <el-select v-else-if="updateType" v-model="ruleForm.standardType"  >
                <el-option v-for="item in standardTypeOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
              </el-select>
              <el-select v-else v-model="ruleForm.standardType" >
                <el-option v-for="item in standardTypeOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <el-form-item label="ICS:" prop="ics">
                    <div class="list-width" >{{ruleForm.ics}}</div>
                </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="是否为重要标准:" prop="isImport">
                <div class="list-width" >{{isImportOptions[ruleForm.isImport]}}</div>
              </el-form-item>
            </el-col>
          </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="上报单位:" prop="reportDepartment">
              <div  v-if="showType" class="list-width" >{{ruleForm.reportDepartment}}</div>
              <el-input size="small" v-else-if="updateType" v-model="ruleForm.reportDepartment" >
              </el-input>
              <el-input size="small" v-else v-model="ruleForm.reportDepartment"  >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="技术委员会或技术归口单位:" prop="technicalDepartment">
              <div  v-if="showType" class="list-width" >{{ruleForm.technicalDepartment}}</div>
              <el-input size="small" v-else-if="updateType" v-model="ruleForm.technicalDepartment" >
              </el-input>
              <el-input size="small" v-else v-model="ruleForm.technicalDepartment"  >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="主管部门:" prop="chargeDepartment">
              <div  v-if="showType" class="list-width" >{{ruleForm.chargeDepartment}}</div>
              <el-input size="small" v-else-if="updateType" v-model="ruleForm.chargeDepartment" >
              </el-input>
              <el-input size="small" v-else v-model="ruleForm.chargeDepartment"  >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="起草单位:" prop="draftDepartment">
              <div  v-if="showType" class="list-width" >{{ruleForm.draftDepartment}}</div>
              <el-input size="small" v-else-if="updateType" v-model="ruleForm.draftDepartment" >
              </el-input>
              <el-input size="small" v-else v-model="ruleForm.draftDepartment"  >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="项目周期:" prop="projectCycle">
              <div  v-if="showType" class="list-width" ><span v-for="item in projectCycleOptions" v-if="ruleForm.projectCycle == item.id">{{item.dictValue}}</span></div>
              <el-select v-else-if="updateType" v-model="ruleForm.projectCycle"  >
                <el-option v-for="item in projectCycleOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
              </el-select>
              <el-select v-else v-model="ruleForm.projectCycle" >
                <el-option v-for="item in projectCycleOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="是否采用快速程序:" prop="column1">
              <div  v-if="showType" class="list-width" >{{column1Options[ruleForm.column1]}}</div>
              <el-select v-else-if="updateType" v-model="ruleForm.column1"  >
                <el-option v-for="item in column1Options" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
              </el-select>
              <el-select v-else v-model="ruleForm.column1" >
                <el-option v-for="item in column1Options" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <el-form-item label="标准类别:" prop="standardType">
                    <div  v-if="showType" class="list-width" >{{ruleForm.standardType}}</div>
                        <el-cascader style="width:260px;" v-else-if="updateType"
                        :options="options"
                        v-model="selectedOptions"
                        @change="handleChange">
                        </el-cascader>
                    <!-- <el-option v-for="item in standardTypeOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option> -->
                        <el-cascader style="width:260px;" v-else
                        :options="options"
                        v-model="selectedOptions"
                        @change="handleChange">
                        </el-cascader>
                    <!-- <el-option v-for="item in standardTypeOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option> -->
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="经费预算说明:" prop="budgetExplain">
              <div  v-if="showType" class="list-width" >{{ruleForm.budgetExplain}}</div>
              <el-input size="small" v-else-if="updateType" v-model="ruleForm.budgetExplain" >
              </el-input>
              <el-input size="small" v-else v-model="ruleForm.budgetExplain"  >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="目的意义:" prop="purpose">
              <div  v-if="showType" class="list-width" >{{ruleForm.purpose}}</div>
              <el-input type="textarea" autosize v-else-if="updateType" v-model="ruleForm.purpose" ></el-input>
              <el-input type="textarea" autosize v-else v-model="ruleForm.purpose" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="范围和主要技术内容:" prop="mainContent">
              <div  v-if="showType" class="list-width" >{{ruleForm.mainContent}}</div>
              <el-input type="textarea" autosize v-else-if="updateType" v-model="ruleForm.mainContent" ></el-input>
              <el-input type="textarea" autosize v-else v-model="ruleForm.mainContent" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="国内外情况简要说明:" prop="briefDescription">
              <div  v-if="showType" class="list-width" >{{ruleForm.briefDescription}}</div>
              <el-input type="textarea" autosize v-else-if="updateType" v-model="ruleForm.briefDescription" ></el-input>
              <el-input type="textarea" autosize v-else v-model="ruleForm.briefDescription" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="有关法律法规和强制性标准的关系:" prop="lawsShip">
              <div  v-if="showType" class="list-width" >{{ruleForm.lawsShip}}</div>
              <el-input type="textarea" autosize v-else-if="updateType" v-model="ruleForm.lawsShip" ></el-input>
              <el-input type="textarea" autosize v-else v-model="ruleForm.lawsShip" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="标准涉及的产品清单:" prop="inventory">
              <div  v-if="showType" class="list-width" >{{ruleForm.inventory}}</div>
              <el-input type="textarea" autosize v-else-if="updateType" v-model="ruleForm.inventory" ></el-input>
              <el-input type="textarea" autosize v-else v-model="ruleForm.inventory" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="是否由行标或地表转化:" prop="inventory">
              <div v-if="showType" class="list-width" >
                <template v-if="ruleForm.hasChange == '1'">
                  是
                </template>
                <template v-else-if="ruleForm.hasChange == '0'">
                  否
                </template>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="是否有国家级科研项目支撑:" prop="hasNational">
              <div  v-if="showType" class="list-width" >{{hasNationalOptions[ruleForm.hasNational]}}</div>
              <el-select v-else-if="updateType" v-model="ruleForm.hasNational"  >
                <el-option v-for="item in hasNationalOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
              </el-select>
              <el-select v-else v-model="ruleForm.hasNational" >
                <el-option v-for="item in hasNationalOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="是否涉及专利:" prop="hasPatent">
              <div  v-if="showType" class="list-width" >{{hasPatentOptions[ruleForm.hasPatent]}}</div>
              <el-select v-else-if="updateType" v-model="ruleForm.hasPatent"  >
                <el-option v-for="item in hasPatentOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
              </el-select>
              <el-select v-else v-model="ruleForm.hasPatent" >
                <el-option v-for="item in hasPatentOptions" :key="item.id" :label="item.dictValue" :value="item.dictValue"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="专利号及名称:" prop="patentNo">
              <div  v-if="showType" class="list-width" >{{ruleForm.patentNo}}</div>
              <el-input class="input-width" v-else-if="updateType" v-model="ruleForm.patentNo"></el-input>
              <el-input class="input-width" v-else v-model="ruleForm.patentNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" v-if="!showType">
            <el-form-item label="项目建议:" prop="proProposalResId">
              <el-upload
                :multiple="true"
                :limit="1000"
                class="upload-demo"
                :on-remove="handReremove"
                :action="fileUploadUrl+'resNew/fileUpload'"
                :on-success='uploadSuccess'
                :file-list="fileList1"
                >
                <el-button :disabled="showType" type="primary">点击上传</el-button>
              </el-upload>
              <el-input class="input-width" type="hidden" v-model="ruleForm.proProposalResId"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-else :span="20">
              <el-form-item label="项目建议:" prop="unitPrice">
                  <a style="display:block" v-for="item in proProposalRes"  @click="downloadFile(item.resId)" href="javascript:void(0)"><span>{{item.resName}}</span></a>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" v-if="!showType">
            <el-form-item label="会议纪要:" prop="unitPrice">
              <el-upload
                :multiple="true"
                :limit="1000"
                class="upload-demo"
                :on-remove="handReremove"
                :action="fileUploadUrl+'resNew/fileUpload'"
                :on-success='uploadSuccess1'
                :file-list="fileList2"
                >
                <el-button :disabled="showType" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col v-else :span="20">
              <el-form-item label="会议纪要:" prop="unitPrice">
                  <a style="display:block" v-for="item in meetingSummaryRes" @click="downloadFile(item.resId)" href="javascript:void(0)"><span>{{item.resName}}</span></a>
              </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-show="!showType">
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="returnList">取消</el-button>
        </el-form-item>
      </el-form>
        </el-tab-pane>
        <el-tab-pane label="相关文件">
          <el-table
            :data="tableData"
            border
            class="table1"
            style="width: 100%;margin-top: 10px">
            <el-table-column prop="name" label="文件名称" width="300"> </el-table-column>
            <el-table-column prop="type" label="类型" width="180"> </el-table-column>
            <el-table-column prop="size" label="大小"> </el-table-column>
            <el-table-column prop="createTime" label="创建时间"> </el-table-column>
            <el-table-column prop="username" label="创建者"> </el-table-column>
            <el-table-column fixed="right" label="操作" >
              <template slot-scope="scope">
                <!-- <el-button type="text" size="small"><i
                  class="icon iconfont icon-xiazai"></i> 下载
              </el-button> -->
                  <a @click="downloadFile(scope.row.resId)" href="javascript:void(0)" size="small"><i
                    class="icon iconfont icon-xiazai">下载</i>
                  </a>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="投票结果">
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlignSC" ref="formLabelAlignSC">
            <el-row  :gutter="20">
                <el-col :span="10">
                    <el-form-item label="投票状态:">
                        <span>{{formLabelAlignSC.voteStatus}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
           <el-row  :gutter="20">
                <el-col :span="24">
                    <el-form-item label="投票结果:">
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="赞成 :">
                                    <span>{{formLabelAlignSC.approveCount}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="不赞成 :">
                                    <span>{{formLabelAlignSC.opposeCount}}</span>
                                </el-form-item>
                            </el-col>
                           <el-col :span="6">
                                <el-form-item label="弃权 :">
                                    <span>{{formLabelAlignSC.abstainCount}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="投票率 :">
                                  <span class="list-width">{{formLabelAlignSC.voteRate}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
            </el-row>
          </el-form>
          <hr>
         <el-table
            :data="tableDataSC"
            border
            style="width: 100%;margin-top: 25px">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="title" label="投票标题" width="180"> </el-table-column>
            <el-table-column prop="createTime" label="创建日期"> </el-table-column>
            <el-table-column prop="result" label="投票情况"> </el-table-column>
            <el-table-column prop="userName" label="投票人"> </el-table-column>
            <el-table-column prop="address" label="备注"> </el-table-column>
          </el-table>
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlignTC" ref="formLabelAlignTC">
            <el-row  :gutter="20">
                <el-col :span="10">
                    <el-form-item label="投票状态:">
                        <span>{{formLabelAlignTC.voteStatus}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
           <el-row  :gutter="20">
                <el-col :span="24">
                    <el-form-item label="投票结果:">
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="赞成 :">
                                    <span>{{formLabelAlignTC.approveCount}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="不赞成 :">
                                    <span>{{formLabelAlignTC.opposeCount}}</span>
                                </el-form-item>
                            </el-col>
                           <el-col :span="6">
                                <el-form-item label="弃权 :">
                                    <span>{{formLabelAlignTC.abstainCount}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="投票率 :">
                                  <span class="list-width">{{formLabelAlignTC.voteRate}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
            </el-row>
          </el-form>
          <hr>
         <el-table
            :data="tableDataTC"
            border
            style="width: 100%;margin-top: 25px">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="title" label="投票标题" width="180"> </el-table-column>
            <el-table-column prop="createTime" label="创建日期"> </el-table-column>
            <el-table-column prop="result" label="投票情况"> </el-table-column>
            <el-table-column prop="userName" label="投票人"> </el-table-column>
            <el-table-column prop="address" label="备注"> </el-table-column>
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
import {applicationDetail,standardFileProgress,standardFileDocuments,fileDownload,VoteResults,dataDictionary,MultiFileUpload} from 'api/standardAppliList/standardProject/standardProject'
import 'api/standardAppliList/standardProject/setData.js'
import {voteUrl} from 'api/index'
import {Message} from 'element-ui'
  export default {
    data() {
      return {
        proProposalResId:[],
        meetingSummaryResId:[],
        labelPosition:'left',
        explainRes:[],
        meetingSummaryRes:[],
        manuscriptsRes:[],
        cbLevelOptions: [],
        downloadUrl:voteUrl,
        // userId:1,
        // loginToken:1,
        operateUserName:'',
        isImport:'',//是否为重要标准 0:否 1:是
        isImportOptions:{0:'否',1:'是'},
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
        ruleForm:{
            proCname:'',//中文名称
            proEname:'',//英文名称
            mendType:'',
            standardNo:'',
            cbType:'',
            cbLevel :'',
            cbNo :'',
            cbName :'',
            standardType :'',
            ics :'',
            reportDepartment :'',
            technicalDepartment :'',
            chargeDepartment :'',
            draftDepartment :'',
            projectCycle :'',
            column1 :[],
            column2 :[],
            proStandardType :'',
            budgetExplain :'',
            purpose :'',
            mainContent :'',
            childNodes :'',
            lawsShip :'',
            inventory :'',
            hasNational :'',
            hasPatent :'',
            patentNo:'',
            proProposalResId:'',//项目建议文件
            meetingSummaryResId:[], //会议纪要文档
        },
        formLabelAlignSC:{
            states:'',
            zancheng:20,
            buzancheng :10,
            qiquan :10,
            lv:'10%'
          },
          formLabelAlignTC:{
              states:'',
              zancheng:20,
              buzancheng :10,
              qiquan :10,
              lv:'10%'
            },
        fileList1:[],
        fileList2:[],
        proProposalRes:[],
        meetingSummaryRes:[],
        value1:null,
        radio2:1,
        textarea3:null,
        showType: false,
        updateType: false,
        plateOptions: [],
        payOptions: [],
        refuelingOptions: [],
        mendTypeOptions:[],
        cbTypeOptions:[],
        standardTypeOptions:[] ,
        options2:{0:'制定',1:'修订'},
        options3:[] ,
        projectCycleOptions:[],
        column1Options:{0:'否',1:'是'},
        column2Options:[],
        hasNationalOptions:{0:'否',1:'是'},
        hasPatentOptions:{0:'否',1:'是'},
        proStandardTypeOptions:[],
        tableData:[],
        tableData2:[],
        tableDataSC:[],
        tableDataTC:[],
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
        this.showType = true
        // 基本信息
        applicationDetail(this.$route.query.projId).then(res=>{
            if (res.code == 1) {
                res.data.standardType = mdata.getData(this.options,res.data.standardType);
                res.data.cbType       = parseInt(res.data.cbType);
                this.ruleForm = res.data
                // 获取项目建议上传数据
                if (res.data.proProposalResId != null) {
                    MultiFileUpload(res.data.proProposalResId.replace(',','%2C')).then(res=>{
                        if (res.code == 1) {
                            this.proProposalRes = res.data
                        }
                    }).catch(err=>{

                    })
                }
                // 获取会议纪要上传数据
                if (res.data.meetingSummaryResId != null) {
                    MultiFileUpload(res.data.meetingSummaryResId.replace(',','%2C')).then(res=>{
                        if (res.code == 1) {
                            this.meetingSummaryRes = res.data
                        }
                    }).catch(err=>{

                    })
                }
            }
        }).catch(err=>{
            console.log(err);
        })
      }
      //获取项目进度数据
      standardFileProgress({projId:this.$route.query.projId}).then(res=>{
          if (res.code == 1) {
              this.tableData2 = res.data
          }
      }).catch(err=>{
          console.log(err)
      })

      // 获取相关文件信息
      standardFileDocuments({projId:this.$route.query.projId}).then(res=>{
          if (res.code == 1) {
              this.tableData = res.data
          }
      }).catch(err=>{
          console.log(err)
      })
      VoteResults({projId:this.$route.query.projId}).then(res=>{
          if (res.code == 1) {
              this.formLabelAlignSC = res.data.SC
              this.formLabelAlignTC = res.data.TC
              this.tableDataSC = res.data.SC.voteList
              this.tableDataTC = res.data.TC.voteList
              console.log(this.formLabelAlignSC);
          }
      }).catch(err=>{
          console.log(err);
      })
      //采用程度
      let cbLevelOptionsData = {
          'userId': this.userInfo.userId,
            'loginToken': this.userInfo.loginToken,
          'parentId':649
      };
      dataDictionary(cbLevelOptionsData).then(res=>{
          this.cbLevelOptions = res.data
      })
      //采标类型
      let cbTypeOptionsData = {
          'userId': this.userInfo.userId,
            'loginToken': this.userInfo.loginToken,
          'parentId':642
      };
      dataDictionary(cbTypeOptionsData).then(res=>{
          this.cbTypeOptions = res.data
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
        handReremove(file, fileList) {
            console.log(file);
            console.log(fileList);
            return false
            if (file.hasOwnProperty('resId')) {
                if (this.proProposalResId.indexOf(file.resId) ) {
                    this.proProposalResId.splice(this.manuscriptsResId.indexOf(file.resId),1);
                }else if(this.meetingSummaryResId.indexOf(file.resId) ) {
                    this.meetingSummaryResId.splice(this.manuscriptsResId.indexOf(file.resId),1);
                }
            }else if(file.response.data[0].hasOwnProperty('resId')) {
                if (this.proProposalResId.indexOf(file.response.data[0].resId)) {
                    this.proProposalResId.splice(this.proProposalResId.indexOf(this.proProposalResId.indexOf(file.response.data[0].resId)),1);
                }else if(this.meetingSummaryResId.indexOf(file.response.data[0].resId)) {
                    this.meetingSummaryResId.splice(this.meetingSummaryResId.indexOf(this.meetingSummaryResId.indexOf(file.response.data[0].resId)),1);
                }
            }
        },
        uploadSuccess(response, file, fileList){
            this.ruleForm.proProposalResId = response.data[0].resId
            if (response.data[0].resId != null) {
                this.proProposalResId.push(response.data[0].resId)
            }
        },
        uploadSuccess1(response, file, fileList){
            this.ruleForm.meetingSummaryResId = response.data[0].resId
            if (response.data[0].resId != null) {
                this.meetingSummaryResId.push(response.data[0].resId)
            }
        },
        downloadFile(id){
            window.location.href = this.downloadUrl + '/resNew/fileDownload?resId=' + id
        },
      submitForm(ruleForm) {
          let data = ruleForm
          data["userId"] = this.userInfo.userId
          data["loginToken"] = this.userInfo.loginToken
          data["projId"] = this.$route.query.proId
          data["operate"] = 2
          data["operateUserName"] = this.userInfo.realName
          data['meetingSummaryResId']  = this.meetingSummaryResId.join(',');
          data['proProposalResId']  = this.proProposalResId.join(',');
          if (this.$route.query.id != null) {
              data['id'] = this.$route.query.id
          }

      },
      returnList(){
        this.$router.push({path: '/standardFileList'})
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
