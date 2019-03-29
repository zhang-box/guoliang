<template>
  <div class="content-wrapper" v-bind:style="{height:'1000px'}">
      <el-header style="height:80px;">
        <el-row>
          <el-col :span="21">
            <div class="logo-wrap">
              <img src="../../../assets/img/header-logo.png"><span> • 标准制修订</span>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <div class="content-title" style="background-color: #e5edfa;height: 50px;padding-left: 10px;">
        <i class="iconfont icon-weizhi" style="color: #0079cf;"></i>
        <span v-if="!addType" style="line-height: 50px;">您当前所在的位置：人员修改</span>
        <span v-if="addType" style="line-height: 50px;">您当前所在的位置：注册</span>
      </div>
    <div class="detail-title">
      <!-- <h1>用 户 注 册</h1> -->
      <span class="required-msg">带<em>*</em>部分必须填写</span>
    </div>
    <div class="content-main registrantForm" style="width: auto;height: 700px;">
      <el-form :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="100px" class="ruleForm" style="width: 1250px;margin: 0 auto;">
        <el-row>
          <el-col v-if="updateType" :span="12">
            <el-form-item label="用户编号：" label-width="145px">
              <div class="list-width">{{ruleForm.usercode}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户类型：" label-width="145px" prop="userkind">
              <el-select v-if="!showType" placeholder="请选择" style="width:400px;" v-model="ruleForm.userkind">
                <el-option
                v-for="item in userTypeOptions"
                :key="item.dictId"
                :label="item.typeDesc"
                :value="item.dictId">
                </el-option>
              </el-select>
              <div v-if="showType" class="list-width" style="width:400px;">{{ruleForm.userkind}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名：" label-width="145px" prop="realname">
              <el-input v-if="!showType" v-model="ruleForm.realname" style="width:400px;"></el-input>
              <div v-if="showType" class="list-width" style="width:400px;">{{ruleForm.realname}}</div>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="12">
            <el-form-item label="身份证号码：" label-width="145px" prop="idnumber">
              <el-input v-if="!showType" v-model="ruleForm.idnumber" style="width:400px;"></el-input>
              <div v-if="showType" class="list-width" style="width:400px;">{{ruleForm.idnumber}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行政单位：" label-width="145px" prop="userunit">
              <el-input v-if="!showType" v-model="ruleForm.userunit" style="width:400px;"></el-input>
              <div v-if="showType" class="list-width" style="width:400px;">{{ruleForm.userunit}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="省：" label-width="145px">
              <el-select v-if="!showType" placeholder="请选择"   @change="selectCity" v-model="ruleForm.province">
                  <el-option
                    v-for="item in province"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
              </el-select>
              <div v-if="showType" class="list-width" style="width:233px;"></div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="市：" label-width="150px" >
              <el-select v-if="!showType" placeholder="请选择" style="width:208px;"  @change="selectcountry" v-model="ruleForm.city">
                  <el-option
                    v-for="item in city"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
              </el-select>
              <div v-if="showType" class="list-width" style="width:293px;"></div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="县：" label-width="145px" >
                <el-select v-if="!showType" placeholder="请选择" style="width:238px;" v-model="ruleForm.country">
                    <el-option
                      v-for="item in country"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                </el-select>
                <div v-if="showType" class="list-width" style="width:400px;"></div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="电话：" label-width="145px" prop="phoneNumber">
              <el-input v-if="!showType" v-model="ruleForm.phoneNumber" style="width:400px;"></el-input>
              <div v-if="showType" class="list-width" style="width:400px;">{{ruleForm.phoneNumber}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机：" label-width="145px" prop="mobile">
              <el-input v-if="!showType" v-model="ruleForm.mobile" style="width:400px;"></el-input>
              <div v-if="showType" class="list-width" style="width:400px;">{{ruleForm.mobile}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
              <el-form-item
                prop="userEmail"
                label-width="145px"
                label="邮箱：">
                <el-input v-if="!showType" v-model="ruleForm.userEmail" style="width:400px;"></el-input>
                <div v-if="showType" class="list-width" style="width:400px;">{{ruleForm.userEmail}}</div>
              </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="微信：" label-width="145px">
              <el-input v-if="!showType" v-model="ruleForm.wechat" style="width:400px;"></el-input>
              <div v-if="showType" class="list-width" style="width:400px;">{{ruleForm.wechat}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="QQ：" label-width="145px">
              <el-input v-if="!showType" v-model="ruleForm.qq" style="width:400px;"></el-input>
              <div v-if="showType" class="list-width" style="width:400px;">{{ruleForm.qq}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名：" label-width="145px" prop="userName">
              <el-input v-if="!showType" v-model="ruleForm.userName" style="width:400px;"></el-input>
              <div v-if="showType" class="list-width" style="width:400px;">{{ruleForm.userName}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="!updateType">
          <el-col :span="12">
            <el-form-item label="密码：" label-width="145px" prop="userPsw">
              <el-input type="password" v-if="!showType" v-model="ruleForm.userPsw" style="width:400px;"></el-input>
              <div v-if="showType" class="list-width" style="width:400px;">{{ruleForm.userPsw}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="验证码：" label-width="145px" prop="code"  style="width: 542px;">
              <el-input v-model="ruleForm.code" style="width: 270px;"></el-input>
              <img @click="randomNumber" :src="baseUrl+'visitor/code?'+randnum" style="width: 100px; height: 38px;float:right">
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-form-item class="footer" style="margin-top: 30px;">
          <div style="width: 180px; margin: 0 auto;">
            <el-button style="" @click="returnList" style="margin-left: -10%;">返 回</el-button>
            <el-button v-if="addType" type="primary" @click="submit('ruleForm')" :disabled="disableType">提 交</el-button>
            <el-button v-else-if="updateType" type="primary" @click="update('ruleForm')" :disabled="disableType">保 存</el-button>
          </div>
        </el-form-item> -->
      </el-form>
      <div style="width: 515px; margin: 0 auto;margin-top: 50px;">
        <el-button @click="returnList" style="width: 220px;height: 50px;border-color: #418cdd;margin-right: 50px;">返 回</el-button>
        <el-button v-if="addType" type="primary" @click="submit('ruleForm')" :disabled="disableType" style="width: 220px;height: 50px;background-color: #418cdd;border-color: #418cdd;">提 交</el-button>
        <el-button v-else-if="updateType" type="primary" @click="update('ruleForm')" :disabled="disableType" style="width: 220px;height: 50px;background-color: #418cdd;border-color: #418cdd;">保 存</el-button>
      </div>
    </div>
    <el-footer style="height:50px;line-height: 50px;">版权所有：国家粮食和物资储备局</el-footer>
  </div>
</template>

<script>

  import {register,region,VerificationCode,checkEmail,userType} from 'api/standardAppliList/standardApproval/standardApproval'
  import {voteUrl,baseUrl} from 'api/index'
  import {registrantUpdate, registrantDetail} from 'api/standardAppliList/registrant/registrant'
  import { Message } from 'element-ui'
  export default {
    data() {
        var reg_tel = /^1\d{10}$/; // 手机号的正则
        var tel_empty = '请输入手机号码';
        var tel_err = '请输入正确的手机号！';
        var reg_name = /^[\u4e00-\u9fa5]{0,}$/; // 姓名的正则
        var name_empty = '请输入姓名';
        var name_err = '请输入汉字！';
        var reg_idnumber = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; // 身份证号码的正则
        var idnumber_empty = '请输入身份证号';
        var idnumber_err = '请输入正确的身份证号码！';
        var reg_userName = /^[A-Za-z0-9]{4,40}$/; // 用户名的正则
        var userName_empty = '请输入用户名';
        var userName_err = '请输入字母+数字！';
        var reg_userPsw = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,})$/; // 密码的正则
        var userPsw_empty = '请输入密码';
        var userPsw_err = '请输入至少6位字母+数字的密码！';
      var validateTelBlur = (rule, value, callback) => {
        // 电话号码 blur事件
        if (!value) {
          callback(new Error(tel_empty));
        } else if (!reg_tel.test(value)) {
          callback(new Error(tel_err));
        }
        callback();
      }
      var validateTelChange = (rule, value, callback) => {
        // 电话号码 change事件
        if (value.length === 11 && !reg_tel.test(value)) {
          callback(new Error(tel_err));
        }
        callback();
      }

      var validateNameBlur = (rule, value, callback) => {
        // 姓名 blur事件
        if (!value) {
          callback(new Error(name_empty));
      } else if (!reg_name.test(value)) {
          callback(new Error(name_err));
        }
        callback();
      }
      var validateNameChange = (rule, value, callback) => {
        // 姓名 change事件
        if (value.length === 11 && !reg_name.test(value)) {
          callback(new Error(name_err));
        }
        callback();
      }

      var validateIdnumberBlur = (rule, value, callback) => {
        // 身份证blur事件
        if (!value) {
          callback(new Error(idnumber_empty));
      } else if (!reg_idnumber.test(value)) {
          callback(new Error(idnumber_err));
        }
        callback();
      }
      var validateIdnumberChange = (rule, value, callback) => {
        // 身份证 change事件
        if (value.length === 11 && !reg_idnumber.test(value)) {
          callback(new Error(idnumber_err));
        }
        callback();
      }
      var validateUserNameBlur = (rule, value, callback) => {
        // 用户名blur事件
        if (!value) {
          callback(new Error(userName_empty));
      } else if (!reg_userName.test(value)) {
          callback(new Error(userName_err));
        }
        callback();
      }
      var validateUserNameChange = (rule, value, callback) => {
        // 用户名 change事件
        if (value.length === 11 && !reg_userName.test(value)) {
          callback(new Error(userName_err));
        }
        callback();
      }
      var validateUserPswBlur = (rule, value, callback) => {
        // 用户名blur事件
        if (!value) {
          callback(new Error(userPsw_empty));
      } else if (!reg_userPsw.test(value)) {
          callback(new Error(userPsw_err));
        }
        callback();
      }
      var validateUserPswChange = (rule, value, callback) => {
        // 用户名 change事件
        if (value.length === 11 && !reg_userPsw.test(value)) {
          callback(new Error(userPsw_err));
        }
        callback();
      }
      return {
        // screenHeight: document.body.clientHeight - 220,
        screenWidth: document.body.clientWidth,
        disableType:false,
        randnum:0,
        addType : true,
        showType : false,
        updateType : false,
        baseUrl : baseUrl,
        userTypeOptions:{},
        province:{},
        city:{},
        country:{},
        code : '',  //验证码
        ruleForm:{
          userName:'',//用户名
          idnumber:'', //身份证号
          userunit:'', //用户单位
          phoneNumber:'', //电话
          userkind: undefined,//用户类型
          realname:'',//真实姓名
          mobile:'', //手机
            userPsw:'',//密码
            userEmail:'', //电子邮件province
            wechat:'', //微信
            qq:'', //QQ
            code:'', //验证码
            province:null,
            city:null,
            country:null,
        },
        rules:{
            userEmail:[
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ],
            idnumber:[
                { required: true, validator: validateIdnumberBlur,trigger: 'blur' },
                { required: true, validator: validateIdnumberChange,trigger: 'change'}
            ],
            userunit:[
                { required: true, message: '请输入用户单位', trigger: 'blur' }
            ],
            mobile:[
                { required: true, validator: validateTelBlur,trigger: 'blur' },
                { required: true, validator: validateTelChange,trigger: 'change'}
            ],
            userkind:[
                { required: true, message: '请选择用户类型', trigger: 'change' }
            ],
            userPsw:[
                { required: true, validator: validateUserPswBlur,trigger: 'blur' },
                { required: true, validator: validateUserPswChange,trigger: 'change'}
            ],
            realname:[
                { required: true, validator: validateNameBlur,trigger: 'blur' },
                { required: true, validator: validateNameChange,trigger: 'change'}
            ],
            phoneNumber:[
                { required: true, message: '请输入您的电话', trigger: 'blur' }
            ],
            userName:[
                { required: true, validator: validateUserNameBlur,trigger: 'blur' },
                { required: true, validator: validateUserNameChange,trigger: 'change'}
            ],
            code:[
                { required: true, message: '请输入验证码', trigger: 'blur' }
            ]
        }
      }
    },
    created(){
      //详情
      userType('biaozhun_user_type').then(res=>{
        this.userTypeOptions = res.data
      }).catch(err=>{

      });
      // 初始化获取省份数据
      region().then(res=>{
        this.province = res.data
      }).catch(err=>{
        console.log(err);
      })
      if(this.$route.params){
        if(this.$route.params.type == 'update'){
          this.showType = false;
          this.updateType = true;
          this.addType = false;
          let data = {
              'userName' : this.$route.params.row.userName
          }
          registrantDetail(data).then(res=>{
              if(res.code == 1){
                  this.ruleForm = res.data;
                  this.ruleForm.userkind = parseInt(res.data.userkind)

                  let city = res.data.city
                  region({pcode:res.data.province}).then(res=>{
                      this.city = res.data
                      for (var i = 0; i < res.data.length; i++) {
                          if (res.data[i].code == city) {
                              this.ruleForm.city = res.data[i].name
                          }
                      }
                  }).catch(err=>{
                      console.log(err);
                  })
                  let country = res.data.country
                  region({pcode:res.data.city}).then(res=>{
                      this.country = res.data
                      for (var i = 0; i < res.data.length; i++) {
                          if (res.data[i].code == country) {
                              this.ruleForm.country = res.data[i].name
                          }
                      }
                  }).catch(err=>{
                      console.log(err);
                  })
                  // this.selectCity(res.data.province)
                  // this.selectcountry(res.data.city)

              }
          }).catch(err=>{

          })
        }else if(this.$route.params.type == 'show'){
          this.showType = true;
          this.updateType = false;
          this.addType = false;
        }
      }
        // 初始化加载验证码
        // VerificationCode().then(res=>{
        //     if (res.code ==1) {
        //         console.log(res);
        //     }
        // }).catch(err=>{
        //     console.log(err);
        // })
    },
    methods: {
      submit(formName){
        this.disableType = true;
          this.$refs[formName].validate((valid) => {
              if (valid) {
                  register(this.ruleForm).then(res=>{
                      console.log(res);
                      if (res.code == 1) {
                          this.$message.success('注册成功');
                          this.$router.push({path:"/load"})
                      }else{
                        this.$message.error(res.msg);
                        this.disableType = false;
                      }
                  }).catch(err=>{
                      console.log(err);
                  })
              }else {
                this.disableType = false;
                return false;
              }
          });
      },
      update(formName){
          console.log(this.ruleForm);
        this.disableType = true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            registrantUpdate(this.ruleForm).then(res=>{

              if (res.code == 1) {
                this.$message.success('修改成功');
                this.$router.push({path:"/registrantList"})
              }else{
                this.$message.error(res.msg);
                this.disableType = false;
              }
            }).catch(err=>{
              console.log(err);
            })
          }else {
            this.disableType = false;
            return false;
          }
        });
      },
      returnList(){
         // history.back()
        this.$router.push({path:"/load"})
      },
      randomNumber(){
          this.randnum = Math.random();
      },
      // 获取对应省份的市区
      selectCity(val){
          region({pcode:val}).then(res=>{
              this.city = {}
              this.country = {}
              this.ruleForm.city = null
              this.ruleForm.country = null
              this.city = res.data

          }).catch(err=>{
              console.log(err);
          })
      },
      selectcountry(val){
          region({pcode:val}).then(res=>{
              debugger;
              this.country = {}
              this.ruleForm.country = null
              this.country = res.data
          }).catch(err=>{
              console.log(err);
          })
      }

    }
  }
</script>
<style>
  body{
    background-color: #fff;
    overflow-y: scroll;
  }
  .content-wrapper{
    padding-top: 20px;
    border: none;
    background-color: #fff;
  }
  .content-title{
    border: none;
  }
  .ruleForm .el-input .el-input__inner{
    background-color: #fff;
    color: #000;
  }
  .ruleForm /deep/ .el-input{
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .codeContant .el-form-item__content{
    margin-left: 3% !important;
  }
  .detail-title{
    margin-bottom: 30px;
  }
  .detail-title h1{
    text-align: center;
    font-size:20px;
    font-weight: 600;
    color:#333;
  }
  .codeText{width: 90px; height: 40px; background-color: #ddd; font-weight: bolder; font-size: 28px; line-height: 40px;text-align: center; color: #759254;}
  .el-textarea.is-disabled .el-textarea__inner{height: 100px;}
  .table-pos{ position:relative;}
  .edit-table-icon{ font-size: 20px;color:#0079cf; position:absolute; right:0px; top:15px; cursor: pointer;}
  .edit-table-icon i{ cursor:pointer;}
  .text-box{ height:28px; line-height:28px;}

  .mar-1{ margin:0px 20px;}
  .content-main  .info-head{ border-left:3px solid #0079cf; padding-left:10px; position: relative; height:19px; line-height:19px; margin:20px 0px;}

  .content-main .info-head .head-xian{
    border-bottom: 1px dashed #eeeeee;
    position:absolute;
    left: 77px;
    right:10px;
    height: 19px;
    margin-top: -28px;
  }
  .content-main .info-head .head-xian.mar-left{	left: 47px;}


  .mation {
    padding: 20px 0px 10px;
    border: 1px dashed #bdb9b1;
    border-radius: 5px;
    position: relative;
    margin: 12px 10px 30px;
  }

  .mation .own-title {
    padding: 5px 15px;
    position: absolute;
    top: -15px;
    left: 35px;
    background-color: #FFF;
  }

  .other-mation {
    margin-top: 30px;
  }
  .registrantForm .list-width{
    text-align: left;
  }
  .registrantForm .el-row{
    margin-bottom: 10px;
  }
</style>
