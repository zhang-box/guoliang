<template>
  <el-header style="height:80px;">
    <el-row>
      <el-col :span="21">
        <div class="logo-wrap">
          <img src="../../assets/img/header-logo.png"><span> • 标准制修订</span>
        </div>
      </el-col>
      <!--<el-col :span="12">-->
      <!--<div class="header-nav">-->
      <!--<div id="navCarousel" class="carousel slide">-->
      <!--<i class="el-icon-arrow-left nav-prev"></i>-->
      <!--<div class="carousel-inner">-->
      <!--<el-menu :default-active="$route.path" class="el-menu-demo nav-item" mode="horizontal" router>-->
      <!--<el-menu-item index="1" class="nav-li" @click="pagePush('fileSharingList')">-->
      <!--共享文件-->
      <!--</el-menu-item>-->
      <!--<el-dropdown>-->
      <!--<el-menu-item class="el-dropdown-link" style="font-size: 20px;line-height: 78px;height: 80px;margin-top:-10px;color:#fff;background: #0079cf;">-->
      <!--委员管理<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
      <!--</el-menu-item>-->
      <!--<el-dropdown-menu slot="dropdown">-->
      <!--<el-menu-item @click="pagePush('SCExpertList')">SC委员管理</el-menu-item>-->
      <!--<el-menu-item @click="pagePush('TCExpertList')">TC委员管理</el-menu-item>-->
      <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->
      <!--&lt;!&ndash; <el-submenu index="2" class="nav-li" style="font-size: 20px!important;color:#fff!important;">-->
      <!--<template slot="title" style="font-size: 20px!important;color:#fff!important;">委员管理</template>-->
      <!--<el-menu-item index="2-1" @click="pagePush('SCExpertList')">SC委员管理</el-menu-item>-->
      <!--<el-menu-item index="2-2" @click="pagePush('TCExpertList')">TC委员管理</el-menu-item>-->
      <!--</el-submenu> &ndash;&gt;-->
      <!--</el-menu>-->
      <!--</div>-->
      <!--<i class="el-icon-arrow-right nav-next"></i>-->
      <!--</div>-->
      <!--</div>-->
      <!--</el-col>-->
      <el-col :span="3">
        <div class="grid-content bg-purple ">
          <img src="../../assets/img/profile.png">
            <template v-if="userInfo.realname != undefined">
              <p>{{userInfo.realname}}</p>
              <p>{{userInfo.secondOrgName}}</p>
            </template>
            <template v-else>
              <p>{{userInfo.realName}}</p>
              <p>{{userInfo.sysgovname}}</p>
            </template>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>
<script>
  import jquery from './../../public-js/jquery-1.11.3.min.js'
  import navslider from './../../public-js/navslider.js'
  import {getUserData,userLogin,getSessionData} from  'api/standardAppliList/zuzhijigou'
  export default {
    data() {
      return {
        activeIndex: '6',
        userInfo:{}
      };
    },
    created(){
      const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
      if(userInfo){
        this.userInfo = userInfo;
      }else{
        getSessionData().then(res => {
          this.userInfo = res
          window.sessionStorage.setItem('userInfo',res)
        })
      }
    },
    methods:{
      handleCommand(command){
        if(command == 'out') {
          if(confirm("您确定退出登录吗？")){
            if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") !=-1) {
              window.location.href="about:blank";
              window.close();
            } else {
              window.opener = null;
              window.open("", "_self");
              window.close();
            }
          }

        }


      }
    }
  }
</script>
<style type="text/css" scoped>
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
  .grid-content {
    margin-top: 10px;
  }
  .grid-content img{
    width: 35px;
    height: 35px;
  }
  .grid-content p{
    height: 15px;
    margin: 0;
    font-size: 12px;
    color: #fff;
  }
  .el-menu--horizontal>.el-submenu .el-submenu__icon-arrow{
    margin-left: 3px !important;
  }
</style>
