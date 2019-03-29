<template>
  <div class="content-wrapper">
    <div class="content-title">
      <el-button class="title-button" size="mini" @click="returnList"><i class="el-icon-arrow-left"></i> 返回</el-button>
      <!--<span class="title-info">{{this.$route.query.returnType}}专家管理新增</span>-->
    </div>
    <!--<span class="detail-num">-->
    <!--序号：<span>{{wookSheetNum}}</span>-->
    <!--</span>-->
    <div class="detail-title">
      <!--<h1>{{this.$route.query.returnType}}专家管理新增</h1>-->
    </div>

    <div class="tableList-super">
      <div style="font-size: 16px;font-weight: bolder;padding-left:5%;">基础信息</div>
      <table :data="form" cellpadding="0" cellspacing="0" style="margin-top:20px;">
        <tr>
          <td class="th-title">姓名<span style="color: red;"> *</span></td>
          <td>
            <input v-if="!showType" type="text" name="text" v-model="form.name">
            <div v-else class="list-width">{{form.name}}</div>
          </td>
          <td class="th-title th-style">委员会名称<span style="color: red;"> *</span></td>
          <td>
            <el-select v-if="!showType" v-model="form.committee" placeholder="请选择">
              <el-option v-for="item in optionsCommites" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
            <div v-else class="list-width">{{form.committee}}</div>
          </td>
        </tr>
        <tr>
          <td class="th-title">委员会职务</td>
          <td>
            <input v-if="!showType" type="text" name="text" v-model="form.position">
            <div v-else class="list-width">{{form.position}}</div>
          </td>
          <td class="th-title th-style">委员会类型<span style="color: red;"> *</span></td>
          <td>
            <el-select v-if="!showType" v-model="form.committeeType" placeholder="请选择">
              <el-option v-for="item in optionsCommitesType" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
            <div v-else class="list-width">{{form.committeeType}}</div>
          </td>
        </tr>
        <tr>
          <td class="th-title th-style">加入标委会时间</td>
          <td>
            <el-date-picker  v-if="!showType"
                             v-model="form.joinTime"
                             type="date"
                             value-format="yyyy-MM-dd"
                             style="width: 100%;"
                             :picker-options="pickerOptions1">
            </el-date-picker>
            <div v-else class="list-width">{{form.joinTime}}</div>
          </td>
          <td class="th-title th-style">性别</td>
          <td>
            <el-select v-if="!showType" v-model="form.sex" placeholder="请选择">
              <el-option v-for="item in optionsSex" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
            <div v-else class="list-width">{{form.sex}}</div>
          </td>
        </tr>
        <tr>
          <td class="th-title th-style">民族</td>
          <td>
            <input v-if="!showType" type="text" name="text" v-model="form.nation">
            <div v-else class="list-width">{{form.nation}}</div>
          </td>
          <td class="th-title th-style">出生年月</td>
          <td>
            <el-date-picker  v-if="!showType"
              v-model="form.birthday"
              type="date"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions0">
            </el-date-picker>
            <div v-else class="list-width">{{form.birthday}}</div>
          </td>
        </tr>
        <tr>
          <td class="th-title th-style">身份证<span style="color: red;"> *</span></td>
          <td>
            <input v-if="!showType" type="text" name="text" v-model="form.idCard">
            <div v-else class="list-width">{{form.idCard}}</div>
          </td>
          <td class="th-title th-style">技术职称</td>
          <td>
            <input v-if="!showType" type="text" name="text" v-model="form.technicalTitle">
            <div v-else class="list-width">{{form.technicalTitle}}</div>
          </td>
        </tr>
        <tr>
          <td v-if="returnType == 'SC'" class="th-title th-style">SC号</td>
          <td v-else class="th-title th-style">TC号</td>
          <td>
            <input v-if="!showType" type="text" name="text" v-model="form.number">
            <div v-else class="list-width">{{form.number}}</div>
          </td>
          <td class="th-title th-style">委员聘书编号</td>
          <td colspan="3">
            <input v-if="!showType" type="text" name="text" v-model="form.appointNum">
            <div v-else class="list-width">{{form.appointNum}}</div>
          </td>
        </tr>
      </table>

      <div style="font-size: 16px;font-weight: bolder;padding-left:5%;">工作信息</div>
      <table cellpadding="0" cellspacing="0" style="margin-top:20px;">
        <tr>
          <td class="th-title">工作单位</td>
          <td>
            <input v-if="!showType" type="text" name="text" v-model="form.workUnit">
            <div v-else class="list-width">{{form.workUnit}}</div>
          </td>
          <td class="th-title th-style">工作性质</td>
          <td>
            <input v-if="!showType" type="text" name="text" v-model="form.workUnitNature">
            <div v-else class="list-width">{{form.workUnitNature}}</div>
          </td>
        </tr>
        <tr>
          <td class="th-title">所属相关方</td>
          <td>
            <input v-if="!showType" type="text" name="text" v-model="form.relatedParty">
            <div v-else class="list-width">{{form.relatedParty}}</div>
          </td>
          <td class="th-title th-style">委员所在单位类型是否属于质检系统</td>
          <td>
            <input v-if="!showType" type="text" name="text" v-model="form.isQualityInspectSystem">
            <div v-else class="list-width">{{form.isQualityInspectSystem}}</div>
          </td>
        </tr>
        <tr>
          <td class="th-title">行政职务</td>
          <td>
            <input v-if="!showType" type="text" name="text" v-model="form.administrativeDuty">
            <div v-else class="list-width">{{form.administrativeDuty}}</div>
          </td>
          <td class="th-title th-style">从事专业</td>
          <td>
            <input v-if="!showType" type="text" name="text" v-model="form.profession">
            <div v-else class="list-width">{{form.profession}}</div>
          </td>
        </tr>
        <tr>
          <td class="th-title">通信地址</td>
          <td>
            <input v-if="!showType" type="text" name="text" v-model="form.address">
            <div v-else class="list-width">{{form.address}}</div>
          </td>
          <td class="th-title th-style">邮政编码</td>
          <td>
            <input v-if="!showType" type="text" name="text" v-model="form.zipCode">
            <div v-else class="list-width">{{form.zipCode}}</div>
          </td>
        </tr>
        <tr>
          <td class="th-title">联系电话</td>
          <td>
            <input v-if="!showType" type="text" name="text" v-model="form.contactNumber">
            <div v-else class="list-width">{{form.contactNumber}}</div>
          </td>
          <td class="th-title th-style">手机<span style="color: red;"> *</span></td>
          <td>
            <input v-if="!showType" type="text" name="text" v-model="form.phone">
            <div v-else class="list-width">{{form.phone}}</div>
          </td>
        </tr>
        <tr>
          <td class="th-title">传真</td>
          <td>
            <input v-if="!showType" type="text" name="text" v-model="form.fax">
            <div v-else class="list-width">{{form.fax}}</div>
          </td>
          <td class="th-title th-style">电子邮箱<span style="color: red;"> *</span></td>
          <td>
            <input v-if="!showType" type="text" name="text" v-model="form.email">
            <div v-else class="list-width">{{form.email}}</div>
          </td>
        </tr>
      </table>

      <div style="font-size: 16px;font-weight: bolder;padding-left:5%;">简历信息</div>
      <table cellpadding="0" cellspacing="0" style="margin-top:20px;">
        <tr>
          <td class="th-title">学历</td>
          <td>
            <el-select v-if="!showType" v-model="form.education" placeholder="请选择">
              <el-option v-for="item in optionsEducation" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
            <div v-else class="list-width">{{form.education}}</div>
          </td>
          <td class="th-title th-style">专业技术特长</td>
          <td>
            <input v-if="!showType" type="text" name="text" v-model="form.expertise">
            <div v-else class="list-width">{{form.expertise}}</div>
          </td>
        </tr>
        <tr>
          <td class="th-title">学位</td>
          <td>
            <el-select v-if="!showType" v-model="form.degree" placeholder="请选择">
              <el-option v-for="item in optionsDegree" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
            <div v-else class="list-width">{{form.degree}}</div>
          </td>
          <td class="th-title th-style">毕业院校</td>
          <td>
            <input v-if="!showType" type="text" name="text" v-model="form.school">
            <div v-else class="list-width">{{form.school}}</div>
          </td>
        </tr>
        <tr>
          <td class="th-title">所学专业</td>
          <td>
            <input v-if="!showType" type="text" name="text" v-model="form.major">
            <div v-else class="list-width">{{form.major}}</div>
          </td>
          <td class="th-title th-style">会何种外语及熟练程度</td>
          <td>
            <input v-if="!showType" type="text" name="text" v-model="form.language">
            <div v-else class="list-width">{{form.language}}</div>
          </td>
        </tr>
        <tr>
          <td class="th-title">其它语言及熟练程度</td>
          <td>
            <input v-if="!showType" type="text" name="text" v-model="form.otherLanguage">
            <div v-else class="list-width">{{form.otherLanguage}}</div>
          </td>
          <td class="th-title th-style">是否院士</td>
          <td>
            <input v-if="!showType" type="text" name="text" v-model="form.isAcademician">
            <div v-else class="list-width">{{form.isAcademician}}</div>
          </td>
        </tr>
        <tr>
          <td class="th-title">备注</td>
          <td colspan="3">
            <input v-if="!showType" type="text" name="text" style="width: 94%; padding-right: 20px;" v-model="form.remark">
            <div v-else class="list-width" style="width: 94%; padding-right: 20px;">{{form.remark}}</div>
          </td>
        </tr>
      </table>
    </div>
    <div class="button-last">
      <el-button v-if="!showType" type="primary" @click="returnList" :disabled="disableType">返 回</el-button>
      <el-button v-if="updateType" type="primary" @click="submit" :disabled="disableType">保 存</el-button>
      <el-button v-if="addType" type="primary" @click="add" :disabled="disableType">保 存</el-button>
    </div>
  </div>
</template>
<script>
  import {expertById, expertUpdate, expertAdd} from 'api/standardAppliList/standardApproval/standardApproval'
  export default {
    data() {
      return {
        pickerOptions0: {
          disabledDate: (time) => {
            return time.getTime() > Date.now() - 8.64e7;
          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            return time.getTime() > Date.now();
          }
        },
        disableType : false,
        returnType : '',  //返回SC or  TC列表
        showType: false,
        updateType : false,
        addType : false,
        joinTime : '请选择加入标委会时间',
        birthday : '请选择出生日期',
        form:{
          id : this.$route.query.id,
          scTc : this.$route.query.returnType,
          name : '',
          committee : '',
          committeeType : '',
          position : '',
          joinTime : '',
          sex : '',
          nation : '',
          birthday : '',
          idCard : '',
          technicalTitle : '',
          number : '',
          appointNum : '',
          validityPeriod : '',
          workUnit : '',
          workUnitNature : '',
          relatedParty : '',
          isQualityInspectSystem : '',
          administrativeDuty : '',
          profession : '',
          address : '',
          zipCode : '',
          contactNumber : '',
          phone : '',
          fax : '',
          email : '',
          education : '',
          expertise : '',
          degree : '',
          school : '',
          major : '',
          language : '',
          otherLanguage : '',
          isAcademician : '',
          remark : '',
          govname:'标准外部专家'
        },
        //******************************下拉框***************************************//
        optionsSex: [{
          value : '男',
          label : '男',
        }, {
          value : '女',
          label : '女',
        }],
        optionsCommites: [],
        optionsCommitesType: [{
          value: '普通',
          label: '普通'
        }, {
          value: '审核',
          label: '审核'
        }],
        optionsEducation : [{
          value : '专科',
          label : '专科'
        }, {
          value : '本科',
          label : '本科'
        }, {
          value : '硕士研究生',
          label : '硕士研究生'
        }, {
          value : '博士研究生',
          label : '博士研究生'
        }],
        optionsDegree : [{
          value : '学士学位',
          label : '学士学位'
        }, {
          value : '硕士学位',
          label : '硕士学位'
        }, {
          value : '博士学位',
          label : '博士学位'
        }],
        userInfo:{},   //登录人信息
      }
    },
    created(){
      this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
      this.returnType = this.$route.query.returnType;
      if(this.$route.query.type == 'show'){
        this.showType = true;
        this.updateType = false;
        this.addType = false;
        let data = {
          'id' : this.$route.query.id
        };
        expertById(data).then(response => {
          this.form = response.data
        })
      }else if(this.$route.query.type == 'update'){
        this.showType = false;
        this.updateType = true;
        this.addType = false;
        let data = {
          'id' : this.$route.query.id
        };
        expertById(data).then(response => {
          this.form = response.data
        })
      }else if(this.$route.query.type == 'add'){
        this.showType = false;
        this.updateType = false;
        this.addType = true;
      }
      if(this.$route.query.returnType == 'SC'){
        this.optionsCommites = [{
          value : 'SC1',
          label : 'SC1',
        }, {
          value : 'SC2',
          label : 'SC2',
        }, {
          value : 'SC3',
          label : 'SC3',
        }, {
          value : 'SC4',
          label : 'SC4',
        }]
      }else if(this.$route.query.returnType == 'TC'){
        this.optionsCommites = [{
          value : 'TC',
          label : 'TC',
        }]
      }
    },
    methods:{

      //校验
      verify(){
        if(this.form.name == ''){
          this.$message.warning('请填写姓名！');
          return false;
        } else if(this.form.committee == ''){
          this.$message.warning('请填写委员会名称！');
          return false;
        } else if(this.form.committeeType == ''){
          this.$message.warning('请选择委员会类型！');
          return false;
        } else if(this.form.idCard == ''){
          this.$message.warning('请填写身份证！');
          return false;
        } else if(this.form.email == ''){
          this.$message.warning('请填写电子邮箱！');
          return false;
        } else if(this.form.phone == ''){
          this.$message.warning('请填写手机号！');
          return false;
        }
        return true;
      },
      returnList(){
        if(this.returnType == 'SC'){
          this.$router.push({name:'SCExpertList'});
        }else{
          this.$router.push({name:'TCExpertList'});
        }
      },
      submit(){
        this.disableType = true;
        if(this.verify()){
          let data = this.form;
          expertUpdate(data).then(response => {
            if (response.code == 1) {
              this.$message.success('提交成功');
              this.$router.push({name: this.returnType + 'ExpertList'});
            }else{
              this.$message.error(response.msg);
              this.disableType = false;
            }
          }).catch(err=>{

          })
        }else{
          this.disableType = false;
        }
      },
      add(){
        this.disableType = true;
        if(this.verify()) {
          let data = this.form;
          expertAdd(data).then(response => {
            if (response.code == 1) {
              this.$message.success('保存成功');
              this.$router.push({name: this.returnType + 'ExpertList'});
            } else {
              this.$message.error(response.msg);
              this.disableType = false;
            }
          }).catch(err => {

          })
        }else{
          this.disableType = false;
        }
      }
    }
  }
</script>
<style type="text/css" scoped>
  .detail-title{
    padding-top:30px;
    margin-bottom: 10px;
  }
  .detail-title h1{
    text-align: center;
    font-size:16px;
    font-weight: 600;
    color:#333;
  }
  .things-title{
    border-bottom: 1px #ddd solid;
  }
  .tableList-super{
    margin-bottom: 10px;
  }
  .thing-title{
    border-bottom:  1px #ddd solid;
    text-align: center;
    border-right: 1px #ddd solid;
  }
  .tableList-super table{
    margin-left: 150px;
    border:1px #ddd solid;
    margin-bottom: 15px;
  }
  .tableList-super table input{
    width: 213px;
    border: none;
    height: 27px;
    padding: 6px 0;
    margin-left: 20px;
    outline: none;
  }
  .tableList-super table td{
    width:215px;
    border-bottom: 1px #ddd solid;
    padding-top: 2px;
    padding-right: 2px;
  }
  .tableList-super table div{
    width:215px;
    border:none;
    padding: 6px;
    /*border-bottom: 1px #ddd solid;*/
    outline: none;
  }
  .tableList-super table .th-title{
    min-width: 215px;
    height: 30px;
    width: auto;
    padding: 6px;
    border-right: 1px #ddd solid;
    /*border-bottom: 1px #ddd solid;*/
  }
  .tableList-super table .th-style{
    border-left: 1px #ddd solid;
  }
  .tableList-super   /deep/   .el-input--suffix .el-input__inner{
    border-radius: inherit;
    width: 213px;
    height: 28px;
    border: none;
  }
  .el-textarea textarea{
    height: 100px !important;
    border:none;
    border-radius: inherit;
    border-bottom:1px #ccc solid;
    border-right: 1px #ccc solid;
    border-top: 1px #ccc solid;
  }
  .el-button--primary{
    padding:8px 20px;
    margin-left: 20px;
  }
  .button-last{
    width:500px;
    margin-left: auto;
    margin-right: auto;
    padding-top:20px;
    margin-bottom: 20px;
  }
  .button-last button{
    margin-right: 20px;
  }
  .detail-num{
    float:right;
    padding-right:6%;
  }
  .list-width{
    width: 330px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }
</style>
