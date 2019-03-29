<template>
  <div class="content-wrapper">
    <div class="content-title">
      <el-button class="title-button" size="mini" @click="returnList"><i class="el-icon-arrow-left"></i> 返回</el-button>
      <span class="title-info">标准发布</span>
    </div>
    <div class="content-main">
      <el-tabs tab-position="left" >
          <el-tab-pane label="业务办理" v-if="updateType">
            <el-form :model="ruleForm"  ref="ruleForm" label-width="50px">
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="执行单位:" prop="zxDepartment" label-width="120px">
                      <div v-if="showType" class="list-width" >{{ruleForm.zxDepartment}}</div>
                      <el-input size="small" v-else-if="updateType" v-model="ruleForm.zxDepartment" >
                      </el-input>
                      <el-input size="small" v-else v-model="ruleForm.zxDepartment"  >
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="标准发布时间" prop="releaseTime" label-width="120px">
                      <div v-if="showType" class="list-width">{{ruleForm.releaseTime}}</div>
                      <el-date-picker  v-else
                        v-model="ruleForm.releaseTime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="标准实施时间" prop="implementTime" label-width="120px">
                      <div v-if="showType" class="list-width">{{ruleForm.implementTime}}</div>
                      <el-date-picker  v-else
                        v-model="ruleForm.implementTime"
                        value-format="yyyy-MM-dd"
                        type="date"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
            </el-form>
          </el-tab-pane>
        <el-tab-pane label="基本信息">
            <el-form :model="ruleForm"  ref="ruleForm" label-width="235px" class="demo-ruleForm mar-t-20">
        <el-row>
          <el-col :span="20">
            <el-form-item label="中文名称:" prop="proCname">
              <div  v-if="showType1" class="list-width" >{{ruleForm.proCname}}</div>
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
              <div  v-if="showType1" class="list-width" >{{ruleForm.proEname}}</div>
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
                <div  v-if="showType1" class="list-width" >{{options2[ruleForm.mendType]}}</div>
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
              <div  v-if="showType1" class="list-width" >{{ruleForm.standardNo}}</div>
              <el-input class="input-width" v-else-if="updateType" v-model="ruleForm.standardNo"></el-input>
              <el-input class="input-width" v-else v-model="ruleForm.standardNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
              <el-form-item label="采标类型:" prop="dictValue">
                  <div  v-if="showType1" class="list-width" ><span v-for="item in cbTypeOptions" v-if="ruleForm.cbType == item.id">{{item.dictValue}}</span></div>
                <el-select v-else v-model="ruleForm.cbType"  placeholder="请选择">
                  <el-option v-for="item in cbTypeOptions" :key="item.id" :label="item.dictValue" :value="item.id"> </el-option>
                </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="10" v-if="ruleForm.cbType != 643">
              <el-form-item label="采用程度:" prop="cbLevel">
                <div  v-if="showType1" class="list-width" ><span v-for="item in cbLevelOptions" v-if="ruleForm.cbLevel == item.id">{{item.dictValue}}</span></div>
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
              <div  v-if="showType1" class="list-width" >{{ruleForm.cbNo}}</div>
              <el-input class="input-width" v-else-if="updateType" v-model="ruleForm.cbNo"></el-input>
              <el-input class="input-width" v-else v-model="ruleForm.cbNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" v-if="ruleForm.cbType != 643">
            <el-form-item label="采标名称:" prop="cbName">
              <div  v-if="showType1" class="list-width" >{{ruleForm.cbName}}</div>
              <el-input class="input-width" v-else-if="updateType" v-model="ruleForm.cbName"></el-input>
              <el-input class="input-width" v-else v-model="ruleForm.cbName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
              <el-form-item label="标准类别:" prop="standardType">
                  <div  v-if="showType1" class="list-width" >{{ruleForm.standardType}}</div>
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
        </el-row>
        <el-row>
            <el-col :span="10">
                <el-form-item label="ICS:" prop="ics">
                    <div  v-if="showType1" class="list-width" >{{ruleForm.ics}}</div>
                    <el-input class="input-width" v-else-if="updateType" v-model="ruleForm.ics"></el-input>
                    <el-input class="input-width" v-else v-model="ruleForm.ics"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="是否为重要标准:" prop="isImport">
                <div  v-if="showType1" class="list-width" >{{isImportOptions[ruleForm.isImport]}}</div>
              </el-form-item>
            </el-col>
          </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="上报单位:" prop="reportDepartment">
              <div  v-if="showType1" class="list-width" >{{ruleForm.reportDepartment}}</div>
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
              <div  v-if="showType1" class="list-width" >{{ruleForm.technicalDepartment}}</div>
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
              <div  v-if="showType1" class="list-width" >{{ruleForm.chargeDepartment}}</div>
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
              <div  v-if="showType1" class="list-width" >{{ruleForm.draftDepartment}}</div>
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
                <div  v-if="showType1" class="list-width" ><span v-for="item in projectCycleOptions" v-if="ruleForm.projectCycle == item.id">{{item.dictValue}}</span></div>
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
                <div  v-if="showType1" class="list-width" >{{column1Options[ruleForm.column1]}}</div>
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
            <el-col :span="10"  v-if="ruleForm.column1 ==1">
              <el-form-item label="是否采用快速程序:" prop="column2">
                <div  v-if="showType1" class="list-width" ><span v-for="item in column2Options" v-if="ruleForm.column2 == item.id">{{item.dictValue}}</span></div>
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
              <div  v-if="showType1" class="list-width" >{{ruleForm.budgetExplain}}</div>
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
              <div  v-if="showType1" class="list-width" >{{ruleForm.purpose}}</div>
              <el-input type="textarea" autosize v-else-if="updateType" v-model="ruleForm.purpose" ></el-input>
              <el-input type="textarea" autosize v-else v-model="ruleForm.purpose" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="范围和主要技术内容:" prop="mainContent">
              <div  v-if="showType1" class="list-width" >{{ruleForm.mainContent}}</div>
              <el-input type="textarea" autosize v-else-if="updateType" v-model="ruleForm.mainContent" ></el-input>
              <el-input type="textarea" autosize v-else v-model="ruleForm.mainContent" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="国内外情况简要说明:" prop="briefDescription">
              <div  v-if="showType1" class="list-width" >{{ruleForm.briefDescription}}</div>
              <el-input type="textarea" autosize v-else-if="updateType" v-model="ruleForm.briefDescription" ></el-input>
              <el-input type="textarea" autosize v-else v-model="ruleForm.briefDescription" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="有关法律法规和强制性标准的关系:" prop="lawsShip">
              <div  v-if="showType1" class="list-width" >{{ruleForm.lawsShip}}</div>
              <el-input type="textarea" autosize v-else-if="updateType" v-model="ruleForm.lawsShip" ></el-input>
              <el-input type="textarea" autosize v-else v-model="ruleForm.lawsShip" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="标准涉及的产品清单:" prop="inventory">
              <div  v-if="showType1" class="list-width" >{{ruleForm.inventory}}</div>
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
                <div  v-if="showType1" class="list-width" >{{hasNationalOptions[ruleForm.hasNational]}}</div>
                <el-select v-else-if="updateType" v-model="ruleForm.hasNational" >
                  <el-option v-for="(item,index) in hasNationalOptions" :key="index" :label="item" :value="index"> </el-option>
                </el-select>
                <el-select v-else v-model="ruleForm.hasNational" >
                  <el-option v-for="(item,index) in hasNationalOptions" :key="index" :label="item" :value="index"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="是否涉及专利:" prop="hasPatent">
                <div  v-if="showType1" class="list-width" >{{hasPatentOptions[ruleForm.hasPatent]}}</div>
                <el-select v-else-if="updateType" v-model="ruleForm.hasPatent"  >
                  <el-option v-for="(item,index) in hasPatentOptions" :key="index" :label="item" :value="index"> </el-option>
                </el-select>
                <el-select v-else v-model="ruleForm.hasPatent" >
                  <el-option v-for="(item,index) in hasPatentOptions" :key="index" :label="item" :value="index"> </el-option>
                </el-select>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" v-if="ruleForm.hasPatent == 1">
            <el-form-item label="专利号及名称:" prop="patentNo">
              <div  v-if="showType1" class="list-width" >{{ruleForm.patentNo}}</div>
              <el-input class="input-width" v-else-if="updateType" v-model="ruleForm.patentNo"></el-input>
              <el-input class="input-width" v-else v-model="ruleForm.patentNo"></el-input>
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
            <el-table-column prop="name" label="文件名称" width="300"> </el-table-column>
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
            <el-table-column>

            </el-table-column>
          </el-table>
          <!-- 附件上传 -->
           <el-form :model="ruleForm"   ref="ruleForm" label-width="235px" class="demo-ruleForm mar-t-20">
              <el-row>
                  <el-col :span="10" v-if="!showType">
                      <el-form-item label="附件上传:" prop="attachmentResIds">
                          <el-upload class="upload-demo"
                          :action="fileUploadUrl+'resNew/fileUpload'"
                          :on-success="handleSuccess"
                          :before-remove="beforeRemove"
                          :on-remove="handleRemove"
                          :multiple="true" :before-upload="onBeforeUpload">
                            <el-button size="small" type="primary">上传</el-button>
                          </el-upload>
                          <!-- <el-upload
                          :multiple="false"
                          :limit="100"
                          class="upload-demo"
                          :on-remove="handReremove"
                          :action="fileUploadUrl+'resNew/fileUpload'"
                          :on-success='uploadSuccess1'
                          :file-list="fileList2"
                          >
                          <el-button :disabled="showType" type="primary">点击上传</el-button>
                      </el-upload> -->
                  </el-form-item>
              </el-col>
              <el-col v-else :span="20">
                  <el-form-item label="附近上传:" prop="unitPrice">
                      <a @click="downloadFile(meetingSummaryRes.resId)" href="javascript:void(0)"><span>{{meetingSummaryRes.resName}}</span></a>
                  </el-form-item>
              </el-col>
          </el-row>
          <!-- <el-form-item v-show="!showType">
              <el-button type="primary" @click="submitForm()">确认发布</el-button>
              <el-button @click="returnList">取消</el-button>
          </el-form-item> -->
        </el-form>
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
      <div v-show="!showType" style="text-align:center">
          <el-button type="primary" @click="submitForm()">确认发布</el-button>
          <el-button @click="returnList">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {MultiFileUpload,dataDictionary,SCfirstTrialExamine,FileUploadDetails,ConfirmationRelease,applicationDetail,VoteResults,standardReleaseProgress,standardReleaseDocuments,standardReleaseDetail,fileDownload} from 'api/standardAppliList/standardProject/standardProject'
import 'api/standardAppliList/standardProject/setData.js'
import {voteUrl} from 'api/index'
import {Message} from 'element-ui'
  export default {
    data() {
      return {
          releaseTime : '请选择发布时间',
          implementTime : '请选择实施时间',
          disable:false,
          proProposalResId:[],
          meetingSummaryResId:[],
          explainRes:[],
          meetingSummaryRes:[],
          manuscriptsRes:[],
          downloadUrl:voteUrl,
          releaseTime:[],
          implementTime:[],
          zxDepartment:'',
          operateUserName:'',
          fileList2:[],
          fileUploadUrl:voteUrl,
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
        labelPosition:'left',
        ruleForm:{
            proCname:'',
            proEname:'',
            mendType:'',
            standardNo:'',
            cbType:0,
            cbLevel :'',
            cbNo :'',
            cbName :'',
            standardType :'',
            isImport:'',
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
            meetingSummaryResId:[],
            releaseTime:[],
            implementTime:[],
            zxDepartment:'',
            attachmentResIds:'',
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
        value1:null,
        radio2:1,
        textarea3:null,
        proProposalRes:[],
        meetingSummaryRes:[],
        proStandardTypeOptions:[],
        selectedOptions: [],
        cbLevelOptions: [],
        fileList1:[],
        fileList2:[],
        showType:false,
        showType1:false,
        updateType:false,
        plateOptions: [],
        payOptions: [],
        refuelingOptions: [],
        mendTypeOptions:[],
        cbTypeOptions:{},
        standardTypeOptions:[] ,
        options2:{0:'制定',1:'修订'} ,
        options3:[] ,
        projectCycleOptions:[],
        column1Options:{0:'否',1:'是'},
        column2Options:[],
        hasNationalOptions:{0:'否',1:'是'},
        hasPatentOptions:{0:'否',1:'是'},
        isImportOptions:{0:'否',1:'是'},
        standardTypeOptions:[],
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
          this.showType1 = true
        applicationDetail(this.$route.query.proId).then(res=>{
            if (res.code == 1) {
                res.data.standardType = mdata.getData(this.options,res.data.standardType);
                res.data.cbType       = parseInt(res.data.cbType);
                this.ruleForm         = res.data
            }
        }).catch(err=>{

        })
      }else if (this.$route.query.type === 'review') {
        this.updateType = true
        this.showType1 = true
        applicationDetail(this.$route.query.proId).then(res=>{
            if (res.code == 1) {
                // res.data.standardType = mdata.getData(this.options,res.data.standardType);
                // this.ruleForm = res.data
                this.selectedOptions = res.data.standardType.split('-');
                res.data.cbType         = parseInt(res.data.cbType);
                res.data.cbLevel        = parseInt(res.data.cbLevel);
                res.data.projectCycle   = parseInt(res.data.projectCycle);
                res.data.column2        = parseInt(res.data.column2);
                this.ruleForm           = res.data
                this.meetingSummaryResId= this.ruleForm.meetingSummaryResId.split(',');
                this.proProposalResId   = this.ruleForm.proProposalResId.split(',');
                if(!res.data.cbLevel){
                    this.ruleForm.cbLevel = '请选择'
                }
                if(!res.data.column2){
                    this.ruleForm.column2 = '请选择'
                }
            }
        }).catch(err=>{

        })
    }else if(this.$route.query.type === 'update'){
      this.updateType = true
      this.showType1 = true
      applicationDetail(this.$route.query.proId).then(res=>{
          if (res.code == 1) {
              this.selectedOptions = res.data.standardType.split('-');
              res.data.cbType         = parseInt(res.data.cbType);
              res.data.cbLevel        = parseInt(res.data.cbLevel);
              res.data.projectCycle   = parseInt(res.data.projectCycle);
              res.data.column2        = parseInt(res.data.column2);
              this.ruleForm           = res.data
              // res.data.standardType = mdata.getData(this.options,res.data.standardType);
              // this.ruleForm = res.data
              this.meetingSummaryResId= this.ruleForm.meetingSummaryResId.split(',');
              this.proProposalResId   = this.ruleForm.proProposalResId.split(',');
              if(!res.data.cbLevel){
                  this.ruleForm.cbLevel = '请选择'
              }
              if(!res.data.column2){
                  this.ruleForm.column2 = '请选择'
              }
          }
      }).catch(err=>{

      })
  }
      //
      //获取项目进度数据
      standardReleaseProgress({times:this.$route.query.times,projId:this.$route.query.proId}).then(res=>{
          if (res.code == 1) {
              this.tableData2 = res.data
          }
      }).catch(err=>{
          console.log(err)
      })

      // 获取相关文件信息
      standardReleaseDocuments({times:this.$route.query.times,projId:this.$route.query.proId}).then(res=>{
          if (res.code == 1) {
              this.tableData = res.data
              console.log(this.tableData);
          }
      }).catch(err=>{
          console.log(err)
      })
      VoteResults({projId:this.$route.query.proId}).then(res=>{
          if (res.code == 1) {
              this.formLabelAlignSC = res.data.SC
              this.formLabelAlignTC = res.data.TC
              this.tableDataSC = res.data.SC.voteList
              this.tableDataTC = res.data.TC.voteList
              for (var i = 0; i <this.tableDataSC.length; i++) {
                  this.tableDataSC[i]['createTime'] = res.data.SC.createTime
              }
              for (var i = 0; i < this.tableDataTC.length; i++) {
                 this.tableDataTC[i]['createTime'] = res.data.TC.createTime
              }
              console.log(this.tableDataSC);
              console.log(this.tableDataTC);
          }
      }).catch(err=>{
          console.log(err);
      })
      this.dataDictionary()
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
        // beforeRemove(file, fileList) {
        //   return this.$confirm(`确定移除 ${ file.name }？`);
        // },
        handleRemove(file, fileList) {
          const repla = this.ruleForm.attachmentResIds.indexOf(`,${file.resId}`) >= 0
          ? `,${file.resId}`
          : this.ruleForm.attachmentResIds.indexOf(',') >= 0 ? `${file.resId},` : file.resId;
          this.ruleForm.attachmentResIds = this.ruleForm.attachmentResIds.replace(repla, '')
        },
        handleSuccess(response, file, fileList){
          file.resId = response.data[0].resId
          if (this.ruleForm.attachmentResIds) {
            this.ruleForm.attachmentResIds += `,${response.data[0].resId}`
          } else {
            this.ruleForm.attachmentResIds = response.data[0].resId + ''
          }
        },
        downloadFile(id){
            window.location.href = this.downloadUrl + '/resNew/fileDownload?resId=' + id
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
      //根据id获取立项详情
      getProjectInfo(proId){
        getProject({proId}).then(res=>{
          // console.log(res)
          this.ruleForm = res.data;
        })
      },

      submitForm() {
          let data = {};
          console.log(data);
          data["userId"] = this.userInfo.userId
          data["loginToken"] = this.userInfo.loginToken
          data["projId"] = this.$route.query.proId
          data["operateUserName"] = this.userInfo.realName
          data["zxDepartment"] = this.ruleForm.zxDepartment
          data["releaseTime"] = this.ruleForm.releaseTime
          data["implementTime"] = this.ruleForm.implementTime
          data['attachmentResIds'] = this.ruleForm.attachmentResIds
          // return false;
          ConfirmationRelease(data).then(res=>{
              if (res.code == 1) {
                  var msg = '发布成功';
                  this.$message.success(msg);
                  this.$router.push({path:'/standardReleaseList'});
              }
          }).catch(err=>{

          })
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
        // //标准类型
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
        let column2OptionsData = {
            'userId': this.userInfo.userId,
            'loginToken': this.userInfo.loginToken,
            'parentId':687
        };
        dataDictionary(column2OptionsData).then(res=>{
            this.column2Options = res.data
        })

      },
      returnList(){
        this.$router.push({path: '/standardReleaseList'})
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
