
<template>
  <div class="content-wrapper content-wrapper-load content-wrapper-load-z" v-bind:style="{height: screenHeight+'px', width: screenWidth+'px'}">
    <div class="load-contains">
      <div class="detail-title">
        <span style="font-size: 32px; color: #6385ce; line-height: 70px;">国家粮食和物资储备局</span><br/>
        <span style="font-size: 44px; color: #d6dbe7;">标准制修订工作管理信息系统</span>
      </div>
      <div class="detail-load"  v-bind:style="{height: screenLoadHeight+'px'}">
        <div class="detail-load-left">
          <img src="../../../assets/img/pic.png" alt="">
        </div>
        <div class="detail-load-right">
          <div class="content-main">
            <span style="display: block; line-height: 87px; font-size: 26px; width: 100%; text-align: center; color: #fff;">用户登录</span>
            <el-form label-width="100px" class="load-ruleForm">
              <el-input prefix-icon="iconfont icon-yonghuming" v-model="formLode.account" style="margin-bottom: 15px;"></el-input>
              <el-input type="password" prefix-icon="iconfont icon-mima" v-model="formLode.password" style="margin-bottom: 18px;"></el-input>
              <span class="forget" @click="forgetPassword">忘记密码?</span>
              <el-form-item class="footer footer_load">
                <el-button v-if="showType" type="primary" style="" @click="load" :disabled="disableType">登录</el-button>
                <el-button type="primary" @click="registrant">注册</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {userLoad} from 'api/standardAppliList/Load/load'
  import {baseUrl} from 'api/index'
  // import {voteUrl,baseUrl} from 'api/index'
  import { Message } from 'element-ui'
  export default {
    data() {
      return {
        screenHeight: document.body.clientHeight + 10,
        screenWidth: document.body.clientWidth,
        screenLoadHeight: document.body.clientHeight * 0.7 - 109,
        disableType : false,
        baseUrl : baseUrl,
        randnum:0,
        loadType : '手机验证登录',  //登录方式
        showType : true,
        code :'',
        times : '60',
        sendMsgDisabled : false,
        formLode: {
          account : '',
          password : '',
        }
      }
    },
    created(){
      // this.createCode();
      window.sessionStorage.removeItem('userInfo');
      window.sessionStorage.clear();  //清空所有本地缓存
    },
    mounted () {
//      const that = this
      $(window).resize(()=>{
        window.screenHeight = document.body.clientHeight;
        this.screenHeight = window.screenHeight-180
      });

    },
    methods: {
      randomNumber(){
        this.randnum = Math.random();
      },
      registrant(){
        this.$router.push({name: "registrant"})
      },
      handleChangeLoad(){
        if(this.loadType == '手机验证登录'){
          this.loadType = '用户名登录';
          this.showType = false;
        }else{
          this.loadType = '手机验证登录';
          this.showType = true;
        }
      },

      forgetPassword(){
        this.$router.push({name: "password"})
      },
      load(){
        this.disableType = true;
        userLoad(this.formLode).then(res=>{
          if (res.code == 1) {
            this.$message.success('登录成功');
            window.sessionStorage.setItem('userInfo', JSON.stringify(res.data));
            this.$router.push({path:"/overview"})
          }else{
            this.$message.success(res.msg);
            this.disableType = false;
          }
        }).catch(err=>{
          console.log(err);
        });
      },

    }
  }
</script>
<style>
  .content-wrapper-load-z{
    margin-top: -14px;
    position: relative;
    border: none !important;
    background: url('../../../assets/img/bg.png') no-repeat center center !important;
    background-size: cover !important;
  }
  .load-contains{
    width: 875px;
    height: 72%;
    position: absolute;
    left:0; top: 0;
    bottom: 0;right: 0;
    margin: auto auto;
  }
  .detail-load-left{
    float: left;
    width: 50%;
    height: 100%;
    position: relative;
  }
  .detail-load-left img{
    position: absolute;
    left: 0; bottom: 0;
    top: 20px;
  }
  .detail-load-right{
    float: right;
    width: 50%;
    height: 100%;
    position: relative;
  }
  .detail-load-right .content-main{
    width: 345px;
    height: 317px;
    background: url('../../../assets/img/login-bg.png') no-repeat center center;
    background-size: cover;
    position: absolute;
    right: 0; bottom: 0;
    top: 0;
    margin: auto 0;
  }
  .detail-title{
    width: 100%;
    text-align: center;
  }
  .load-ruleForm .el-input{
    width: 300px;
    margin-left: 20px;
    border: 2px solid #7a8fbd;
    border-radius: 5px;
  }
  .load-ruleForm .el-input__icon{
    color: #fff;
  }
  .icon-yonghuming{
    font-size: 20px;
    margin-left: 4px !important;
  }
  .icon-mima{
    margin-left: 7px;
  }
  .load-ruleForm .el-input .el-input__inner{
    background-color: #214491;
    border: none;
    color: #fff
  }
  .forget{
    color: red;
    display:inline;
    cursor: pointer;
    margin-left: 25px;
    font-size: 16px;
  }
  .footer_load .el-form-item__content{
    margin-left: 70px !important;
    margin-top: 18px;
  }
  .load-contains .el-input--prefix .el-input__inner{
    padding-left: 40px;
  }
  .footer_load .el-form-item__content .el-button{
    width: 100px;
    height: 40px;
  }
  .el-button+.el-button{
    margin-left: 20px;
  }
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
  }

  .other-mation {
    margin-top: 30px;
  }
  .list-width{
    text-align: left;
  }
</style>


