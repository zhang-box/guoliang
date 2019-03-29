<template>
  <div class="content-wrapper" >
    <div class="content-title">
      <el-button class="title-button" size="mini" @click="returnList"><i class="el-icon-arrow-left"></i> 返回</el-button>
      <span class="title-info" v-if="showType">立项申请详情页</span>
      <span class="title-info" v-else-if="updateType">立项申请修改页</span>
      <span class="title-info" v-else>立项申请新增页</span>
    </div>
    <div class="content-main">
      <el-form :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="235px" class="demo-ruleForm mar-t-20">
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
              <el-select v-else-if="updateType" v-model="ruleForm.mendType" class="search-width" placeholder="请选择">
                <el-option
                  v-for="(item,index) in options2"
                  :key="index"
                  :label="item"
                  :value="index">
                </el-option>
              </el-select>
              <el-select v-else v-model="ruleForm.mendType" class="search-width" placeholder="请选择">
                <el-option
                  v-for="(item,index) in options2"
                  :key="index"
                  :label="item"
                  :value="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10" v-if="ruleForm.mendType != 0 ">
            <el-form-item label="被修订的标准号:" prop="standardNo">
              <div  v-if="showType" class="list-width" >{{ruleForm.standardNo}}</div>
              <el-input class="input-width" v-else-if="updateType" v-model="ruleForm.standardNo"></el-input>
              <el-input class="input-width" v-else v-model="ruleForm.standardNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="采标类型:" prop="cbType">
              <div  v-if="showType" class="list-width" ><span v-for="item in cbTypeOptions" v-if="ruleForm.cbType == item.id">{{item.dictValue}}</span></div>
              <el-select v-else v-model="ruleForm.cbType"  placeholder="请选择">
                <el-option v-for="item in cbTypeOptions" :key="item.id" :label="item.dictValue" :value="item.id">{{item.dictValue}}</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10" v-if="ruleForm.cbType != 643">
            <el-form-item label="采用程度:" prop="cbLevel">
              <div  v-if="showType" class="list-width" ><span v-for="item in cbLevelOptions" v-if="ruleForm.cbLevel == item.id">{{item.dictValue}}</span></div>
              <el-select v-else-if="updateType" v-model="ruleForm.cbLevel"  >
                <el-option v-for="item in cbLevelOptions" :key="item.id" :label="item.dictValue" :value="item.id"> </el-option>
              </el-select>
              <el-select v-else v-model="ruleForm.cbLevel" >
                <el-option v-for="item in cbLevelOptions" :key="item.id" :label="item.dictValue" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" v-if="ruleForm.cbType != 643">
            <el-form-item label="采标号:" prop="cbNo">
              <div  v-if="showType" class="list-width" >{{ruleForm.cbNo}}</div>
              <el-input class="input-width" v-else-if="updateType" v-model="ruleForm.cbNo"></el-input>
              <el-input class="input-width" v-else v-model="ruleForm.cbNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" v-if="ruleForm.cbType != 643">
            <el-form-item label="采标名称:" prop="cbName">
              <div v-if="showType" class="list-width" >{{ruleForm.cbName}}</div>
              <el-input class="input-width" v-else-if="updateType" v-model="ruleForm.cbName"></el-input>
              <el-input class="input-width" v-else v-model="ruleForm.cbName"></el-input>
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
              <el-cascader style="width:260px;" v-else
                           :options="options"
                           v-model="selectedOptions"
                           @change="handleChange">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="ICS:" prop="ics">
              <div  v-if="showType" class="list-width" >{{ruleForm.ics}}</div>
              <el-input class="input-width" v-else-if="updateType" v-model="ruleForm.ics"></el-input>
              <el-input class="input-width" v-else v-model="ruleForm.ics"></el-input>
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
                <el-option v-for="item in projectCycleOptions" :key="item.id" :label="item.dictValue" :value="item.id"> </el-option>
              </el-select>
              <el-select v-else v-model="ruleForm.projectCycle" >
                <el-option v-for="item in projectCycleOptions" :key="item.id" :label="item.dictValue" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="是否采用快速程序:" prop="column1">
              <div  v-if="showType" class="list-width" >{{column1Options[ruleForm.column1]}}</div>
              <el-select v-else-if="updateType" v-model="ruleForm.column1"  >
                <el-option v-for="(item,index) in column1Options" :key="index" :label="item" :value="index"> </el-option>
              </el-select>
              <el-select v-else v-model="ruleForm.column1" >
                <el-option v-for="(item,index) in column1Options" :key="index" :label="item" :value="index"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" v-if="ruleForm.column1 ==1">
            <el-form-item label="是否采用快速程序:" prop="column2">
              <div  v-if="showType" class="list-width" ><span v-for="item in column2Options" v-if="ruleForm.column2 == item.id">{{item.dictValue}}</span></div>
              <el-select v-else-if="updateType" v-model="ruleForm.column2"  >
                <el-option v-for="item in column2Options" :key="item.id" :label="item.dictValue" :value="item.id"> </el-option>
              </el-select>
              <el-select v-else v-model="ruleForm.column2" >
                <el-option v-for="item in column2Options" :key="item.id" :label="item.dictValue" :value="item.id"> </el-option>
              </el-select>
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
              <el-input type="textarea" autosize v-else-if="updateType" v-model="ruleForm.purpose" class="fontSize"></el-input>
              <el-input type="textarea" autosize v-else v-model="ruleForm.purpose" class="fontSize"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="范围和主要技术内容:" prop="mainContent">
              <div  v-if="showType" class="list-width" >{{ruleForm.mainContent}}</div>
              <el-input type="textarea" autosize v-else-if="updateType" v-model="ruleForm.mainContent" class="fontSize" ></el-input>
              <el-input type="textarea" autosize v-else v-model="ruleForm.mainContent"  class="fontSize"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="国内外情况简要说明:" prop="briefDescription">
              <div  v-if="showType" class="list-width" >{{ruleForm.briefDescription}}</div>
              <el-input type="textarea" autosize v-else-if="updateType" v-model="ruleForm.briefDescription"  class="fontSize"></el-input>
              <el-input type="textarea" autosize v-else v-model="ruleForm.briefDescription"  class="fontSize"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="有关法律法规和强制性标准的关系:" prop="lawsShip">
              <div  v-if="showType" class="list-width" >{{ruleForm.lawsShip}}</div>
              <el-input type="textarea" autosize v-else-if="updateType" v-model="ruleForm.lawsShip" class="fontSize" ></el-input>
              <el-input type="textarea" autosize v-else v-model="ruleForm.lawsShip" class="fontSize" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="标准涉及的产品清单:" prop="inventory">
              <div  v-if="showType" class="list-width" >{{ruleForm.inventory}}</div>
              <el-input type="textarea" autosize v-else-if="updateType" v-model="ruleForm.inventory"  class="fontSize"></el-input>
              <el-input type="textarea" autosize v-else v-model="ruleForm.inventory"  class="fontSize"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="是否有国家级科研项目支撑:" prop="hasNational">
              <div  v-if="showType" class="list-width" >{{hasNationalOptions[ruleForm.hasNational]}}</div>
              <el-select v-else-if="updateType" v-model="ruleForm.hasNational" >
                <el-option v-for="(item,index) in hasNationalOptions" :key="index" :label="item" :value="index"> </el-option>
              </el-select>
              <el-select v-else v-model="ruleForm.hasNational" >
                <el-option v-for="(item,index) in hasNationalOptions" :key="index" :label="item" :value="index"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10" v-if="ruleForm.hasNational == 1">
            <el-form-item label="科研项目编号及名称:" prop="scienceProjectNo">
              <div  v-if="showType" class="list-width" >{{ruleForm.scienceProjectNo}}</div>
              <el-input class="input-width" v-else-if="updateType" v-model="ruleForm.scienceProjectNo"></el-input>
              <el-input class="input-width" v-else v-model="ruleForm.scienceProjectNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="是否涉及专利:" prop="hasPatent">
              <div  v-if="showType" class="list-width" >{{hasPatentOptions[ruleForm.hasPatent]}}</div>
              <el-select v-else-if="updateType" v-model="ruleForm.hasPatent"  >
                <el-option v-for="(item,index) in hasPatentOptions" :key="index" :label="item" :value="index"> </el-option>
              </el-select>
              <el-select v-else v-model="ruleForm.hasPatent" >
                <el-option v-for="(item,index) in hasPatentOptions" :key="index" :label="item" :value="index"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10" v-if="ruleForm.hasPatent == 1">
            <el-form-item label="专利号及名称:" prop="patentNo">
              <div  v-if="showType" class="list-width" >{{ruleForm.patentNo}}</div>
              <el-input class="input-width" v-else-if="updateType" v-model="ruleForm.patentNo"></el-input>
              <el-input class="input-width" v-else v-model="ruleForm.patentNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="是否由行标或地标转化:" prop="hasChange">
              <div  v-if="showType" class="list-width" >{{hasChangeOptions[ruleForm.hasChange]}}</div>
              <el-select v-else-if="updateType" v-model="ruleForm.hasChange"  >
                <el-option v-for="(item,index) in hasChangeOptions" :key="index" :label="item" :value="index"> </el-option>
              </el-select>
              <el-select v-else v-model="ruleForm.hasChange" >
                <el-option v-for="(item,index) in hasChangeOptions" :key="index" :label="item" :value="index"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10" v-if="ruleForm.hasChange == 1">
            <el-form-item label="行地标标准号及名称:" prop="landmarkNo">
              <div  v-if="showType" class="list-width" >{{ruleForm.landmarkNo}}</div>
              <el-input class="input-width" v-else-if="updateType" v-model="ruleForm.landmarkNo"></el-input>
              <el-input class="input-width" v-else v-model="ruleForm.landmarkNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="是否为重要标准:" prop="isImport">
              <div  v-if="showType" class="list-width" >{{isImportOptions[ruleForm.isImport]}}</div>
              <el-select v-else-if="updateType" v-model="ruleForm.isImport"  >
                <el-option v-for="(item,index) in isImportOptions" :key="index" :label="item" :value="index"> </el-option>
              </el-select>
              <el-select v-else v-model="ruleForm.isImport" >
                <el-option v-for="(item,index) in isImportOptions" :key="index" :label="item" :value="index"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20"  v-if="!showType">
            <el-form-item label="项目建议:" prop="proProposalResId">
              <div v-if="showType" class="list-width">
                <li v-for="item in proProposalResList" :key="item.resId"  style="text-decoration:underline;color: #409EFF;cursor: pointer;">
                  <a target="_blank" :href="downloadFileUrl(item.resId)"  style="text-decoration:underline;color: #409EFF;cursor: pointer;">{{item.resName}}</a>
                </li>
              </div>
              <el-upload v-else class="upload-demo" :action="fileUploadUrl+'resNew/fileUpload'" :on-success="handleSuccess1"
                         :on-remove="handleRemove1" :multiple="true" :file-list="fileListproProposalResList" :before-upload="onBeforeUpload">
                <el-button size="small" type="primary">上传</el-button>
                <div v-show="isShow" style="color:#f56c6c;font-size: 12px;">请上传项目建议</div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col v-else :span="20">
            <el-form-item label="项目建议:">
              <div class="list-width">
                <li v-for="item in fileListproProposalResList" :key="item.resId" @click="downloadFile(item.resId)"   style="text-decoration:underline;color: #409EFF;cursor: pointer;">
                  {{item.name}}
                  </li>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20"  v-if="!showType">
            <el-form-item label="会议纪要:" prop="meetingSummaryResId">
              <div v-if="showType" class="list-width">
                <li v-for="item in meetingSummaryResList" :key="item.resId" style="text-decoration:underline;color: #409EFF;cursor: pointer;">
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
                <li v-for="item in fileListMeetingSummaryResList" :key="item.resId" @click="downloadFile(item.resId)" style="text-decoration:underline;color: #409EFF;cursor: pointer;">
                  {{item.name}}
                  </li>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-show="!showType">
          <el-button type="primary" @click="submitForm('ruleForm',1)" :disabled = 'disable'>保存</el-button>
          <el-button type="primary" @click="submitForm('ruleForm',2)" :disabled = 'disable'>提交</el-button>
          <el-button @click="returnList" :disabled = 'disable'>取消</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
  import {getProject,updateProject} from 'api/standardAppliList/voteManage/vote'
  import {dataDictionary,insertProject,applicationDetail,MultiFileUpload} from 'api/standardAppliList/standardProject/standardProject'  //数据字典
  import 'api/standardAppliList/standardProject/setData.js'
  import {voteUrl} from 'api/index'
  import { Message } from 'element-ui'
  export default {
    data() {
      return {
        isShow:false,
        disable:false,
        proProposalResId:'',
        meetingSummaryResId:'',
        downloadUrl:voteUrl,
        fileListMeetingSummaryResList:[],
        fileListproProposalResList:[],
        ruleForm: {
          proCname:'', //中文名称
          proEname:'', //英文名称
          mendType:'',//制定/修订
          standardNo:'',//被修订的标准号
          cbType:'',//采标类型
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
          isImport:'',//是否为重要标准 0:否 1:是
          hasChange:'',//是否为重要标准 0:否 1:是
          patentNo:'',//专利号及名称
          scienceProjectNo:'',//科研项目编号及名称
          landmarkNo:'',//行地标标准号及名称
          proProposalResId:'',//项目建议文件
          meetingSummaryResId:'', //会议纪要文档
          operateUserName:'', //登录人姓名
          proProposalResList: [{
            resName: '',
            resId: ''
          }],
          meetingSummaryResList: [{
            resName: '',
            resId: ''
          }],
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
        fileList1:[],
        fileList2:[],
        proProposalRes:[],
        meetingSummaryRes:[],
        selectedOptions: [],
        cbLevelOptions: [],
        showType:false,
        updateType:false,
        plateOptions: [],
        payOptions: [],
        refuelingOptions: [],
        mendTypeOptions:[],
        cbTypeOptions:[],
        standardTypeOptions:[] ,
        options2:{0:'制定',1:'修订'} ,
        options3:[] ,
        projectCycleOptions:[],
        column1Options:{0:'否',1:'是'},
        column2Options:[],
        hasNationalOptions:{0:'否',1:'是'},
        hasPatentOptions:{0:'否',1:'是'},
        hasChangeOptions:{0:'否',1:'是'},
        isImportOptions:{0:'否',1:'是'},
        standardTypeOptions:[],
//********************************************************************** */
        fileUploadUrl:null, //上传接口
        // 必填提示
        rules: {
          proCname: [
            { required: true, message: '请输入中文名称', trigger: 'blur' }
          ],
          proEname: [
            { required: true, message: '请输入英文名称', trigger: 'blur' }
          ],
          mendType: [
            { required: true, message: '请选择制定/修订', trigger: 'change' }
          ],
          standardNo: [
            { required: true, message: '请输入被修订的标准号', trigger: 'blur' }
          ],
          cbType: [
            { required: true, message: '请输入采标类型', trigger: 'change' }
          ],
          cbLevel: [
            { required: true, message: '请输入采用程度', trigger: 'change' }
          ],
          cbNo: [
            { required: true, message: '请输入采标号', trigger: 'blur' }
          ],
          cbName: [
            { required: true, message: '请输入采标名称', trigger: 'blur' }
          ],
          standardType: [
            { required: true, message: '请选择标准类别', trigger: 'change' }
          ],
          ics: [
            { required: true, message: '请输入ics', trigger: 'blur' }
          ],
          reportDepartment: [
            { required: true, message: '请输入上报单位', trigger: 'blur' }
          ],
          technicalDepartment: [
            { required: true, message: '请输入技术委员会或技术归口单位', trigger: 'blur' }
          ],
          draftDepartment: [
            { required: true, message: '请输入起草单位', trigger: 'blur' }
          ],
          projectCycle: [
            { required: true, message: '请选择项目周期', trigger: 'change' }
          ],
          column1: [
            { required: true, message: '请选择是否采用快速程序', trigger: 'change' }
          ],
          column2: [
            { required: true, message: '请选择是否采用快速程序', trigger: 'change' }
          ],
          budgetExplain: [
            { required: true, message: '请输入经费预算说明', trigger: 'blur' }
          ],
          purpose: [
            { required: true, message: '请输入目的意义', trigger: 'blur' }
          ],
          mainContent: [
            { required: true, message: '请输入范围和主要技术内容', trigger: 'blur' }
          ],
          briefDescription: [
            { required: true, message: '请输入国内外情况简要说明', trigger: 'blur' }
          ],
          lawsShip: [
            { required: true, message: '请输入有关法律法规和强制性标准的关系', trigger: 'blur' }
          ],
          inventory: [
            { required: true, message: '请输入标准涉及的产品清单', trigger: 'blur' }
          ],
          hasNational: [
            { required: true, message: '请选择是否有国家级科研项目支撑', trigger: 'change' }
          ],
          hasPatent: [
            { required: true, message: '请选择是否涉及专利', trigger: 'change' }
          ],
          isImport: [
            { required: true, message: '是否为重要标准', trigger: 'change' }
          ],
          patentNo: [
            { required: true, message: '请输入专利号及名称', trigger: 'blur' }
          ],
          scienceProjectNo: [
            { required: true, message: '请输入科研项目编号及名称', trigger: 'blur' }
          ],
          hasChange: [
            { required: true, message: '请选择是否由行标或地标转化', trigger: 'change' }
          ],
          landmarkNo: [
            { required: true, message: '请输入行地标标准号及名称', trigger: 'blur' }
          ],
          proProposalResId:[
          { required: true, message: '  ' }
         ],
          userInfo:{
            userId: -1,
            loginToken: -1,
            realName: -1,
            sysgovname: -1,
          },   //登录人信息
        }
      }
    },
      created(){
        const user = JSON.parse(window.sessionStorage.getItem('userInfo'));
        if(user){
          this.userInfo = user;
        }
      if(this.$route.query.type === 'show'){
        this.showType = true
        applicationDetail(this.$route.query.proId).then(res=>{
          if (res.code == 1) {
            res.data.standardType = mdata.getData(this.options,res.data.standardType);
            res.data.cbType       = parseInt(res.data.cbType);
            this.ruleForm         = res.data

            const { meetingSummaryResId,proProposalResId } = res.data;
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
            if(proProposalResId){
              this.getFileDetails(proProposalResId,(info)=>{
                this.proProposalResList=info;
                this.fileListproProposalResList=info.map(item=>{
                  return {
                    name:item.resName,
                    percentage:100,
                    resId:item.resId,
                  }
                });
              });
            }

          }
        }).catch( err=> {
          console.info( err );
        })
      }else if(this.$route.query.type === 'update'){
        this.updateType = true
        applicationDetail(this.$route.query.proId).then(res=>{
          if (res.code == 1) {
            this.selectedOptions    = res.data.standardType.split('-');
            res.data.cbType         = parseInt(res.data.cbType);
            res.data.cbLevel        = parseInt(res.data.cbLevel);
            res.data.projectCycle   = parseInt(res.data.projectCycle);
            res.data.column2        = parseInt(res.data.column2);
            this.ruleForm           = res.data
            if(!res.data.cbLevel){
              this.ruleForm.cbLevel = '请选择'
            }
            if(!res.data.column2){
              this.ruleForm.column2 = '请选择'
            }
            this.standardType       = res.data.standardType
            // 获取会议纪要上传数据
            const { meetingSummaryResId,proProposalResId } = res.data;
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
            if(proProposalResId){
              this.getFileDetails(proProposalResId,(info)=>{
                this.proProposalResList=info;
                this.fileListproProposalResList=info.map(item=>{
                  return {
                    name:item.resName,
                    percentage:100,
                    resId:item.resId,
                  }
                });
              });
            }
          }
        }).catch( err=> {
          console.info( err );
        })
      }
      this.dataDictionary()

      this.fileUploadUrl = voteUrl;
      // console.log(this.options)
    },
    methods: {
      getFileDetails(ids,cb){
        MultiFileUpload(ids).then((res)=>{
          if(res.data){
            cb(res.data);
          }
        });
      },
      onBeforeUpload(file) {
          const isLt1M = file.size / 1024 / 1024 < 5;
          if (!isLt1M) {
              this.$message.error('上传文件大小不能超过 5MB!');
          }
          return isLt1M;
      },
      handleRemove1(file, fileList) {
        const repla = this.ruleForm.proProposalResId.indexOf(`,${file.resId}`) >= 0
          ? `,${file.resId}`
          : this.ruleForm.proProposalResId.indexOf(',') >= 0 ? `${file.resId},` : file.resId;
        this.ruleForm.proProposalResId = this.ruleForm.proProposalResId.replace(repla, '')
      },
      handleSuccess1(response, file, fileList){
        file.resId = response.data[0].resId
        this.isShow = false
        if (this.ruleForm.proProposalResId) {
          this.ruleForm.proProposalResId += `,${response.data[0].resId}`
        } else {
          this.ruleForm.proProposalResId = response.data[0].resId + ''
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
      downloadFile(id){
        window.location.href = this.downloadUrl + 'resNew/fileDownload?resId=' + id
      },
      handleChange(value) {
        this.ruleForm.standardType = '';
        this.standardType = '';
        for (var i = 0; i < value.length; i++) {
          if (i + 1 == value.length) {
            this.standardType += value[i];
          }else{
            this.standardType += value[i] + '-';
          }
        }
        this.ruleForm.standardType = this.standardType
      },
      submitForm(formName,state) {
          this.disable = true
          if(this.ruleForm.proProposalResId == ''){
            this.isShow = true;
         }else{
              this.isShow = false
          }
          // return false
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if(this.$route.query.type === 'update'){
                this.ruleForm.standardProjNewStageId = this.$route.query.id
                this.ruleForm.proId = this.$route.query.proId
                this.ruleForm.operateUserName =  this.userInfo.realName
                if (this.ruleForm.cbType == 643) {
                  this.ruleForm.cbLevel = ''
                  this.ruleForm.cbName  = ''
                  this.ruleForm.cbNo    = ''
                }
                if(this.ruleForm.column1 == 0){
                  this.ruleForm.column2 =''
                }
                if(this.ruleForm.hasPatent == 0){
                  this.ruleForm.patentNo =''
                }
              }

              this.ruleForm.standardType  = this.standardType;
              this.ruleForm.operate       = state;
              this.ruleForm.userId        = this.userInfo.userId;
              this.ruleForm.loginToken    = this.userInfo.loginToken;
              this.ruleForm.operateUserName =  this.userInfo.realName;
              // this.ruleForm.meetingSummaryResId  = this.meetingSummaryResId;
              // this.ruleForm.proProposalResId  = this.proProposalResId.join(',');

              let data = this.ruleForm;
              // data['proProposalResId'] = this.proProposalResId.join(',')
              // if(this.$route.query.type){
              let tipsMsg = 1 == state?'保存成功':'提交成功';
              insertProject(data).then(res => {
                if(res.code === 1){
                  this.$message.success(tipsMsg);
                  this.$router.push({path:'/standarAppliList'});
                }else{
                  this.disable = false
                  this.$message.error(res.msg)
                }
              })
            } else {
              this.disable = false
              return false;
            }
          });
      },

      dataDictionary(){
        //制定/修订
        let mendTypeOptionsData = {
          'userId': this.userInfo.userId,
          'loginToken': this.userInfo.loginToken,
          'parentId':345
        };
        dataDictionary(mendTypeOptionsData).then(res=>{
          this.mendTypeOptions = res.data
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
        //标准类型
        // let standardTypeOptionsData = {
        //     "userId":1,
        //     'loginToken':1,
        //     'parentId':337
        // };
        // dataDictionary(standardTypeOptionsData).then(res=>{
        //     this.standardTypeOptions = res.data
        // })
        //采用程度
        let cbLevelOptionsData = {
          'userId': this.userInfo.userId,
          'loginToken': this.userInfo.loginToken,
          'parentId':649
        };
        dataDictionary(cbLevelOptionsData).then(res=>{
          this.cbLevelOptions = res.data
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
          'userId': this.userInfo.userId,
          'loginToken': this.userInfo.loginToken,
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
      returnList(){
        this.$router.push({path:'/standarAppliList'})
      }
    }
  }
</script>

<style scoped>
  .list-width{
    width: 325px;
    text-align: left;
    margin-left: 20px;
  }
  .input-width {
    width: 217px;
  }
.fontSize{
      font-size: 13px!important;
  }
</style>
