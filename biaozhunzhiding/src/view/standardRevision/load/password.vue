
<template>
  <div class="content-wrapper" v-bind:style="{height: '1000px', width: screenWidth+'px'}">
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
      <span style="line-height: 50px;">您当前所在的位置：忘记密码</span>
      <!--<span class="required-msg" style="cursor: pointer;"><em @click="handleChangeLoad">{{this.loadType}}</em></span>-->
    </div>
    <!--<div class="detail-title">-->
      <!--<h1>密码找回</h1>-->
    <!--</div>-->
    <div class="content-main passwordCon"  v-bind:style="{minHeight:'380px',height: (screenHeight - 220)+'px', width: screenWidth+'px', border: '1px solid #ececec',marginTop: '10px', position: 'relative', overflowY: 'auto'}">
      <el-steps :active="step" align-center style="height: 90px;background-color: #f5f5f5;border-bottom: 1px solid #ececec;">
        <el-step title="填写账户名" description=""></el-step>
        <el-step title="验证身份" description=""></el-step>
        <el-step title="设置新密码" description=""></el-step>
        <el-step title="完成" description=""></el-step>
      </el-steps>
      <div v-bind:style="{width: '100%', height: '270px',position: 'absolute', left: '0', top: '0', right: '0', bottom: '0', margin: 'auto auto'}">
        <el-form label-width="165px" class="ruleForm1" style="width: 500px;height: 270px;margin: auto auto;" :inline="true">
          <div v-if="step === 1">
            <el-input class="userInput" prefix-icon="iconfont icon-yonghuming" placeholder="请输入用户名" v-model="formFirst.userName" required></el-input>
            <!--<el-form-item label="用户名：" required>-->
            <!--<el-input v-model="formFirst.userName" style="width: 270px;"></el-input>-->
            <!--</el-form-item>-->
            <div>
              <el-input class="codeInput" prefix-icon="iconfont icon-mn_dunpai_fill" placeholder="请输入图片验证码" v-model="formFirst.code" required style="margin-top: 30px;"></el-input>
              <!--<el-form-item label="验证码：">-->
              <!--<el-input v-model="formFirst.code" style="width: 180px;"></el-input>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="" class="codeContant" style="height:50px;border: 1px solid #e0e0e0;padding: 1px;margin: 0;">-->
              <div style="float: right;height:50px; width: 130px;border: 1px solid #e0e0e0;margin-top: 30px;margin-right: 10px;"><img @click="randomNumber" :src="baseUrl+'visitor/code?'+randnum" style="height: 48px; width: 128px;margin: 1px;"></div>
              <!--</el-form-item>-->
            </div>
          </div>
          <div v-if="step === 2">
            <el-form-item label="请选择验证身份方式：">
              <div class="list-width" style="width: 290px;">邮箱验证</div>
            </el-form-item>
            <el-form-item label="昵称：">
              <div class="list-width" style="width: 290px;">{{formFirst.userName}}</div>
            </el-form-item>
            <el-form-item label="已验证邮箱：">
              <div class="list-width" style="width: 290px;">
                  <span v-if="formEmail.userEmail">
                   {{formEmail.userEmail}}
                  </span>
                <span v-else style="color: red;">
                    邮箱获取失败
                  </span>
                若邮箱都已无法使用请
                <span style="color: #5495df;">联系我们</span>

              </div>
            </el-form-item>
            <el-form-item label="填写邮箱校验码：">
              <el-input v-model="formPsw.code" style="width: 180px;"></el-input>
            </el-form-item>
            <el-button v-if="!sendMsgDisabled" @click="countDown" style="width: 110px; height: 38px; padding: 5px;border: 1px solid #418cdd;">获取邮箱验证码</el-button>
            <span v-if="sendMsgDisabled" style="width: 110px; height: 38px; padding: 5px;">{{this.times}}秒后重新发送</span>
          </div>
          <div v-if="step === 3">
            <el-form-item label="新登录密码：" label-width="96px">
              <el-input type="password" v-model="formPsw.userPsw" placeholder="请输入新密码" style="width: 394px;"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码：" label-width="96px">
              <el-input type="password" v-model="password" placeholder="请再次输入新密码" style="width: 394px;"></el-input>
            </el-form-item>
          </div>
          <div v-if="step === 4">
            <el-form-item label="" style="margin-left: 140px;">
              <el-button icon="el-icon-check" circle style="width:80px;height:80px;cursor: default;background-color: #fff;color: #418cdd;border: none;"></el-button>
              <span style="color: #333333;display: inline-block;line-height: 20px;">
                  <div>新密码设置成功！</div>
                  <div>请牢记您的新密码！</div>
                </span>
            </el-form-item>
          </div>


          <el-form-item class="footer" style="margin-top: 40px;width: 490px;">
            <el-button v-if="step != 4" type="primary" @click="submit" :disabled="disableType" style="width: 220px;height: 50px;background: #418cdd;margin-right: 25px;border: none;">提 交</el-button>
            <el-button v-if="step != 4" type="primary" @click="returnList" style="width: 220px;height: 50px;background: #418cdd;border: none;">取 消</el-button>
            <el-button v-if="step == 4" type="primary" style="margin-left:205px; color: #418cdd;background:#fff;border: none;font-size: 16px;font-weight: 700;" @click="returnList">返回登录页</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-footer style="height:50px;line-height: 50px;">版权所有：国家粮食和物资储备局</el-footer>
  </div>
</template>

<script>
  import footer from '../../../components/layout/footer.vue'
  import {findUserExists, checkEmail, selectByIdLimit, sendEmail, findPwd} from 'api/standardAppliList/Load/load'
  import {baseUrl} from 'api/index'
  import { Message } from 'element-ui'
  export default {
    data() {
      return {
        screenHeight: document.body.clientHeight + 10,
        screenWidth: document.body.clientWidth,
        disableType : false,
        baseUrl : baseUrl,
        randnum:0,
        code :'',
        password:'',
        step:1,
        times : '60',
        sendMsgDisabled : false,
        formEmail:{
          userEmail : ''
        },
        formFirst : {
          userName : '',
          code : ''
        },
        formSecode : {
          code : ''
        },
        formPsw : {
          code : '',
          userPsw : this.password1,
          userEmail : '',
          userName: '',
        }
      }
    },
    components: {
      'el-footer':footer,
    },
    created(){

    },
    methods: {
      randomNumber(){
        this.randnum = Math.random();
      },
      returnList(){
        this.$router.push({name: "load"})
      },
      submit(){
        // this.step = this.step + 1;
        this.disableType = true;
        if(this.step === 1){
          findUserExists(this.formFirst).then(res=>{
            if (res.code == 0) {
              this.$message.error(res.msg);
            }else{
              selectByIdLimit(this.formFirst).then(res=>{
                if (res.code == -1) {
                  this.$message.error(res.msg);
                }else{
                  this.formEmail.userEmail = res.data.userEmail;
                  this.formPsw.userEmail = res.data.userEmail;
                  this.formPsw.userName = res.data.userName;
                  this.step = this.step + 1;
                }
              }).catch(err=>{
                console.log(err);
              });
            }
            this.disableType = false;
          }).catch(err=>{
            console.log(err);
          });
          return;
        }
        if(this.step === 2){
          let data = {
            'code' : this.formPsw.code
          };
          checkEmail(data).then(res=>{
            if (res.code == -1) {
              this.$message.error(res.msg);
              return;
            }else{
              this.step = this.step + 1;
            }
          }).catch(err=>{
            console.log(err);
          });
          this.disableType = false;
          return;
        }
        if(this.step === 3){
          if(this.formPsw.userPsw != this.password){
            this.$message.error('两次密码输入不一致,请重新输入');
            this.formPsw.userPsw = '';
            this.password = '';
          }else{
            findPwd(this.formPsw).then(res=>{
              if (res.code == -1) {
                this.$message.error(res.msg);
              }else{
                this.step = this.step + 1;
              }
            }).catch(err=>{
              console.log(err);
            });
          }
          this.disableType = false;
          return;
        }

      },
      countDown(){
        //倒计时
        sendEmail(this.formEmail).then(res=>{
          if (res.code == -1) {
            this.$message.error(res.msg);
          }else{
            this.$message.success('验证码发送成功');
            let me = this;
            me.sendMsgDisabled = true;
            let interval = window.setInterval(function() {
              if ((me.times--) <= 0) {
                me.times = 60;
                me.sendMsgDisabled = false;
                window.clearInterval(interval);
              }
            }, 1000);
          }
        }).catch(err=>{
          console.log(err);
        })



      },


    }
  }
</script>
<style>

  /****************header*************************/
  #lianshi img{
    margin-bottom: 5px
  }
  #lianshi:hover{
    color:#0079cf;
  }
  .carousel-inner{
    float: right;
  }
  .carousel-inner ul{
    width: 300px !important;
    left: 330px !important;
  }
  .header-nav .el-menu--horizontal>.el-menu-item{
    line-height: 78px;
    font-size: 20px;
  }
  .nav-li{
    width: 150px;
  }
  .el-menu--horizontal>.el-submenu .el-submenu__icon-arrow{
    margin-left: 3px !important;
  }



  /********************passWord****************************/
  .passwordCon .el-input{
    width: auto;
  }
  .passwordCon .userInput .el-input__inner{
    width: 490px;
    height: 50px;
    padding-left: 60px;
    border-radius: 0;
  }
  .passwordCon .codeInput .el-input__inner{
    width: 340px;
    height: 50px;
    padding-left: 60px;
    border-radius: 0;
  }
  .passwordCon .el-input__prefix{
    display: inline-block;
    left: 1px;
    top: 1px;
    width: 50px;
    height: 48px;
    color: #ababab;
    background-color: #f3f3f3;
    border-right: 1px solid #e0e0e0;
  }
  .passwordCon .el-input__icon{
    line-height: 50px;
    font-size: 22px;
  }
  .passwordCon  .el-step__main{
    margin-top: 10px;
  }
  .passwordCon .el-step.is-center .el-step__head{
    margin-top: 10px;
  }
  .passwordCon .el-step__icon{
    width: 32px;
    height: 32px;
    background-color: #c4c4c4;
    border-color: #c4c4c4;
    color: #fff;
  }
  .passwordCon .el-step.is-horizontal .el-step__line{
    height: 3px;
    top: 15px;
    left: 70%;
    right: -30%;
  }
  .passwordCon .is-finish .el-step__icon{
    color: #fff;
    background: #418cdd;
    border-color: #418cdd;
  }
  .passwordCon .is-finish .is-finish{
    color: #418cdd;
  }
  .passwordCon .el-step__title.is-process,
  .passwordCon .el-step__title.is-wait{
    color: #333333;
    font-weight: 100;
  }
  body{
    overflow: hidden;
  }
  body /deep/  .content-wrapper{
    /*margin-top: -14px;*/
    /*border: none;*/
    background-color: #fff;
  }
  .ruleForm .el-input .el-input__inner{
    background-color: #fff;
    color: #000;
  }
  .ruleForm /deep/ .el-input{
    /*border: 1px solid #ccc;*/
    border-radius: 4px;
  }
  .codeContant .el-form-item__content{
    /*margin-left: 3% !important;*/
  }
  .el-icon-check:before{
    font-size: 55px;
  }
  .forget{
    color: red;
    display:inline;
    cursor: pointer;
    margin-left: 3%
  }
  .detail-title{
    padding-top: 30px;
    margin-bottom: 10px;
  }
  .detail-title h1{
    text-align: center;
    font-size:20px;
    font-weight: 600;
    color:#333;
  }
  .el-step__head.is-process{
    color: #c0c4cc;
    border-color: #c0c4cc;
  }
  .el-step__title.is-process{
    color: #c0c4cc;
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
  .list-width{
    text-align: left;
  }
</style>


