<template>
  <div class="content-wrapper">
    <div class="content-title">
      <el-button class="title-button" size="mini" @click="returnList"><i class="el-icon-arrow-left"></i> 返回</el-button>
      <span class="title-info">统计查询详情</span>
    </div>
    <div class="content-main">
      <el-tabs tab-position="left" >
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
                  <div class="list-width" >{{ruleForm2.proEname}}</div>
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
                </el-form-item>
              </el-col>
              <el-col :span="10" v-if="ruleForm2.mendType != 0 ">
                <el-form-item label="被修订的标准号:" prop="standardNo">
                  <div class="list-width" >{{ruleForm2.standardNo}}</div>
                  <!-- <div  v-if="showType" class="list-width" >{{ruleForm2.standardNo}}</div>
                  <el-input class="input-width" v-else-if="updateType" v-model="ruleForm2.standardNo"></el-input>
                  <el-input class="input-width" v-else v-model="ruleForm2.standardNo"></el-input> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="采标类型:" prop="cbType">
                  <div class="list-width">{{ruleForm2.cbType}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="采用程度:" prop="cbLevel">
                  <div class="list-width" >{{ruleForm2.cbLevel}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="采标号:" prop="cbNo">
                  <div class="list-width">{{ruleForm2.cbNo}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="采用名称:" prop="cbName">
                  <div class="list-width" >{{ruleForm2.cbName}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="标准类别:" prop="standardType">
                  <div class="list-width" >{{ruleForm2.standardType}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="ICS:" prop="ics">
                  <div class="list-width" >{{ruleForm2.ics}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="上报单位:" prop="reportDepartment">
                  <div class="list-width" >{{ruleForm2.reportDepartment}}</div>
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
              <el-col :span="20">
                <el-form-item label="主管部门:" prop="chargeDepartment">
                  <div class="list-width" >{{ruleForm2.chargeDepartment}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="起草单位:" prop="draftDepartment">
                  <div class="list-width" >{{ruleForm2.draftDepartment}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="项目周期:" prop="projectCycle">
                  <div class="list-width" >{{ruleForm2.projectCycle}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="标准类别:" prop="proStandardType">
                  <div class="list-width" >{{ruleForm2.proStandardType}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="是否采用快速程序:" prop="column1">
                  <div class="list-width" >{{ruleForm2.column1}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="是否采用快速程序:" prop="column2">
                  <div class="list-width" >{{ruleForm2.column2}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="经费预算说明:" prop="budgetExplain">
                  <div class="list-width" >{{ruleForm2.budgetExplain}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="目的意义:" prop="purpose">
                  <div class="list-width" >{{ruleForm2.purpose}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="范围和主要技术内容:" prop="mainContent">
                  <div class="list-width" >{{ruleForm2.mainContent}}</div>
                </el-form-item>
              </el-col>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="国外情况简要说明:" prop="briefDescription">
                    <div class="list-width" >{{ruleForm2.briefDescription}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="有关法律法规和强制性标准的关系:" prop="lawsShip">
                  <div class="list-width" >{{ruleForm2.lawsShip}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="标准涉及的产品清单:" prop="inventory">
                  <div class="list-width" >{{ruleForm2.inventory}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
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
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="是否涉及专利:" prop="hasPatent">
                  <div class="list-width" >
                    <template v-if="ruleForm2.hasPatent == '0'">
                      否
                    </template>
                    <template v-else-if="ruleForm2.hasPatent == '1'">
                      是
                    </template>
                  </div>
                </el-form-item>
              </el-col>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="专利号及名称:" prop="patentNo">
                    <div class="list-width" >{{ruleForm2.patentNo}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
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
                <el-button type="text" size="small" @click="download(scope.row.url)"><i
                  class="icon iconfont icon-xiazai"></i> 下载
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="投票结果">
          <el-form :model="tableData3" label-width="235px" class="demo-ruleForm mar-t-20">
          <el-row>
            <el-col :span="13">
              <el-form-item label="SC投票情况:" label-width="100px" style="margin-bottom:0;">
                <div  class="list-width-vote" >{{tableData3.voteStatus}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="投票结果:" label-width="100px">
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="赞成:" label-width="100px">
                <div  class="list-width-vote" >{{tableData3.approveCount}}    票</div>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="反对:" label-width="100px">
                <div  class="list-width-vote" >{{tableData3.opposeCount}}    票</div>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="弃权:" label-width="100px">
                <div  class="list-width-vote" >{{tableData3.abstainCount}}    票</div>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="投票率:" label-width="100px">
                <div  class="list-width-vote" >{{tableData3.voteRate}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-table
            :data="tableData3.voteList"
            border
            class="table1"
            style="width: 100%;margin-top: 10px">
            <el-table-column type="index" label="序号" width="180"> </el-table-column>
            <el-table-column prop="title" label="投票标题" width="180"> </el-table-column>
            <el-table-column prop="createTime" label="创建日期" width="180"> </el-table-column>
            <el-table-column prop="result" label="投票情况">
              <template slot-scope="scope">
                <template v-if="scope.row.result == '1'">
                  赞成
                </template>
                <template v-if="scope.row.result == '2'">
                  反对
                </template>
                <template v-if="scope.row.result == '3'">
                  放弃
                </template>
              </template>
            </el-table-column>
            <el-table-column prop="userName" label="投票人"> </el-table-column>
            <el-table-column prop="remark" label="备注"> </el-table-column>
          </el-table>
          </el-form>
            <el-form :model="tableData4" label-width="235px" class="demo-ruleForm mar-t-20">
              <el-row>
                <el-col :span="13">
                  <el-form-item label="TC投票情况:" label-width="100px" style="margin-bottom:0;">
                    <div  class="list-width-vote" >{{tableData4.voteStatus}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-form-item label="投票结果:" label-width="100px">
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-form-item label="赞成:" label-width="100px">
                    <div  class="list-width-vote" >{{tableData4.approveCount}}    票</div>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-form-item label="反对:" label-width="100px">
                    <div  class="list-width-vote" >{{tableData4.opposeCount}}    票</div>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-form-item label="弃权:" label-width="100px">
                    <div  class="list-width-vote" >{{tableData4.abstainCount}}    票</div>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-form-item label="投票率:" label-width="100px">
                    <div  class="list-width-vote" >{{tableData4.voteRate}}</div>
                  </el-form-item>
                </el-col>
              </el-row>

          <el-table
            :data="tableData4.voteList"
            border
            class="table1"
            style="width: 100%;margin-top: 10px">
            <el-table-column type="index" label="序号" width="180"> </el-table-column>
            <el-table-column prop="title" label="投票标题" width="180"> </el-table-column>
            <el-table-column prop="createTime" label="创建日期" width="180"> </el-table-column>
            <el-table-column prop="result" label="投票情况">
              <template slot-scope="scope">
                <template v-if="scope.row.result == '1'">
                  赞成
                </template>
                <template v-if="scope.row.result == '2'">
                  反对
                </template>
                <template v-if="scope.row.result == '3'">
                  放弃
                </template>
              </template>
            </el-table-column>
            <el-table-column prop="userName" label="投票人"> </el-table-column>
            <el-table-column prop="remark" label="备注"> </el-table-column>
          </el-table>
          </el-form>

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
  import {getProjectDetailById, relatedDoc, getFlow, approvalGrainById, approvalGrainReview, voteResult} from 'api/standardAppliList/standardApproval/standardApproval'
  import {Message} from 'element-ui'

  import {voteUrl} from 'api/index'
  export default {
    data() {
      return {
        labelPosition:'left',
        ruleForm: {},
        ruleForm2: { },
        fileUploadUrl:null, //上传接口
        radio2: 1,
        plateOptions: [],
        payOptions: [],
        refuelingOptions: [],
        tableData:[],
        tableData2: [],
        tableData3: {},
        tableData4: {},


        // ********************下拉列表*******************************
        plateOptions: [],
        payOptions: [],
        refuelingOptions: [],
        mendTypeOptions:[],
        cbTypeOptions:[],
        standardTypeOptions:[] ,
        options2:[] ,
        options3:[] ,
        projectCycleOptions:[],
        column1Options:[],
        column2Options:[],
        hasNationalOptions:[],
        hasPatentOptions:[],
        proStandardTypeOptions:[],
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
        this.getInfo();

    },
    mounted(){
      this.$nextTick(function() {
        let data = {
          'projId' : this.$route.query.projId,
          'state' : '61',
          // 'times' : this.$route.query.times
        };
        //获取项目进度
        getFlow(data).then(res=>{
          // debugger
          if(res.data.length != '0'){
            for(var i = 0; i< res.data.length; i++){
              this.tableData2.push(res.data[i])
            }
          }
        });
        //获取相关文件
        relatedDoc(data).then(res=>{
          // debugger
          // console.log(res)
          if(res.data.length != '0') {
            for (var i = 0; i < res.data.length; i++) {
              this.tableData.push(res.data[i])
            }
          }
        });
        //获取投票结果
        voteResult(data).then(res=>{
           this.tableData3 = res.data.SC;
          this.tableData4 = res.data.TC;
        });
      })
    },
    methods: {
      download(url){
        window.location.href = url;
      },
      returnList(){
        this.$router.push({name: "NBApprovalList"})
      },
      getInfo(){
        let data1 = {
          'id' : this.$route.query.id
        };
        let data2 = {
          'projId' : this.$route.query.projId,
          'state' : '61',
          // 'times' : this.$route.query.info.times
        };

        //获取基本信息
        getProjectDetailById(data2).then(res=>{
          // debugger
          // console.log(res)
          this.ruleForm2 = res.data
        });
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
  .list-width-vote {
    width: 325px;
    text-align: left;
    margin-left: 0px;
  }

  .input-width {
    width: 217px;
  }
</style>
