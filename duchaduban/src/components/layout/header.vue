<template>
    <el-header style="height:80px;">
      <el-row>
        <el-col :span="22">
          <div class="logo-wrap">
            <img src="../../assets/img/header-logo.png"><span> • 督查督办</span>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple ">
            <el-dropdown>
              <span class="el-dropdown-link">
                <img src="../../assets/img/profile.png"><br>测试用户<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>系统设置</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </el-header>
</template>
<script>
import jquery from './../../public-js/jquery-1.11.3.min.js'
import navslider from './../../public-js/navslider.js'
export default {
    data() {
      return {
        activeIndex: '6'
      };
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
</style>





<!--<template>-->
    <!--<el-header style="height:80px;">-->
      <!--<el-row>-->
        <!--<el-col :span="22">-->
          <!--<div class="logo-wrap">-->
            <!--<img src="../../assets/img/header-logo.png"><span> • 督查督办</span>-->
          <!--</div>-->
        <!--</el-col>-->
        <!--<el-col :span="2">-->
          <!--<div class="grid-content bg-purple ">-->
            <!--<el-dropdown>-->
              <!--<span class="el-dropdown-link">-->
                <!--<img src="../../assets/img/profile.png"><br>测试用户<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
              <!--</span>-->
              <!--<el-dropdown-menu slot="dropdown">-->
                <!--<el-dropdown-item>系统设置</el-dropdown-item>-->
                <!--<el-dropdown-item>退出登录</el-dropdown-item>-->
              <!--</el-dropdown-menu>-->
            <!--</el-dropdown>-->
          <!--</div>-->
        <!--</el-col>-->
      <!--</el-row>-->
    <!--</el-header>-->
<!--</template>-->
<!--<script>-->
<!--import jquery from './../../public-js/jquery-1.11.3.min.js'-->
<!--import navslider from './../../public-js/navslider.js'-->
<!--export default {-->
    <!--data() {-->
      <!--return {-->
        <!--activeIndex: '6'-->
      <!--};-->
    <!--}-->
  <!--}-->
<!--</script>-->
<!--<style type="text/css" scoped>-->
<!--#lianshi img{-->
	<!--margin-bottom: 5px-->
<!--}-->
	<!--#lianshi:hover{-->
		<!--color:#0079cf;-->
	<!--}-->
<!--</style>-->
