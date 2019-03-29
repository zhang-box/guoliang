
<template>
  <el-aside id="elAside" width="210px" v-bind:style="{height: screenHeight+'px'}">
    <el-scrollbar class="nav-scrollbar">
      <el-collapse-transition>
        <div class="group-ope-wrap">
          <transition name="el-fade-in">
           <div v-show="isShowText" class="transition-box">导航菜单</div>
          </transition>
           <div @click="switcherMenus()" class="switcher-wrap">
            <i v-bind:class="[isShowText ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right']"></i>
           </div>
        </div>
      </el-collapse-transition>
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#72a7e5" text-color="#fff" active-text-color="#0079cf" :collapse="isCollapse" router>
         <!--  <el-menu-item index="/vehicleManage">
            <i class="iconfont icon-shouye"></i>
            <span slot="title">首页</span>
          </el-menu-item> -->
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont icon-shenqingguanli1"></i>
              <span>申请管理</span>
            </template>
            <el-menu-item index="/listVehicleApply"><i class="iconfont icon-wenjianjia"></i>用车申请</el-menu-item>
            <el-submenu index="2-3">
              <template slot="title"><i class="iconfont icon-wenjianjia"></i>车辆使用记录</template>
              <el-menu-item index="/oilRecord"><i class="iconfont icon-dian"></i>加油记录</el-menu-item>
              <el-menu-item index="/ListMaintain"><i class="iconfont icon-dian"></i>维修保养记录</el-menu-item>
              <el-menu-item index="/violationRecord"><i class="iconfont icon-dian"></i>违章记录</el-menu-item>
              <el-menu-item index="/accidentList"><i class="iconfont icon-dian"></i>事故记录</el-menu-item>
              <el-menu-item index="/ListAnnual"><i class="iconfont icon-dian"></i>年检记录</el-menu-item>
              <el-menu-item index="/saferList"><i class="iconfont icon-dian"></i>保险记录</el-menu-item>
              <el-menu-item index="/otherFeeList"><i class="iconfont icon-dian"></i>其他费用</el-menu-item>
            </el-submenu>
        	  <el-submenu index="2-4">
              <template slot="title"><i class="iconfont icon-wenjianjia"></i>车辆情况汇总</template>
              <el-menu-item index="/carFeeSummary"><i class="iconfont icon-dian"></i>费用汇总</el-menu-item>
              <el-menu-item index="/vehicleUse"><i class="iconfont icon-dian"></i>车辆使用汇总</el-menu-item>
              <el-menu-item index="/driverSummary"><i class="iconfont icon-dian"></i>司机工作汇总</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="iconfont icon-shenhe1"></i>
              <span>车辆审核管理</span>
            </template>
        	  <el-menu-item index="/clApplication/listApplication"><i class="iconfont icon-wenjianjia"></i>车辆申请审核</el-menu-item>
            <el-submenu index="3-2">
              <template slot="title"><i class="iconfont icon-wenjianjia"></i>车辆情况汇总</template>
              <el-menu-item index="/carFeeSummary"><i class="iconfont icon-dian"></i>费用汇总</el-menu-item>
              <el-menu-item index="/vehicleUse"><i class="iconfont icon-dian"></i>车辆使用汇总</el-menu-item>
              <el-menu-item index="/driverSummary"><i class="iconfont icon-dian"></i>司机工作汇总</el-menu-item>
            </el-submenu>
          </el-submenu>
        	<el-submenu index="4">
            <template slot="title">
              <i class="iconfont icon-shenhe1"></i>
              <span>费用审核管理</span>
            </template>
        	  <el-submenu index="4-1">
              <template slot="title"><i class="iconfont icon-wenjianjia"></i>信息登记管理</template>
              <el-menu-item index="/cl-register"><i class="iconfont icon-dian"></i>车辆登记</el-menu-item>
          	  <el-menu-item index="/driverReg/listDriverReg"><i class="iconfont icon-dian"></i>司机登记</el-menu-item>
            </el-submenu>
            <el-submenu index="4-2">
              <template slot="title"><i class="iconfont icon-wenjianjia"></i>费用审核</template>
              <el-menu-item index="/oilRecordReview"><i class="iconfont icon-dian"></i>加油记录</el-menu-item>
              <el-menu-item index="/ListMaintainS"><i class="iconfont icon-dian"></i>维修保养记录</el-menu-item>
              <el-menu-item index="/violationRecordReview"><i class="iconfont icon-dian"></i> 违章记录</el-menu-item>
              <el-menu-item index="/accidentListReview"><i class="iconfont icon-dian"></i>事故记录</el-menu-item>
              <el-menu-item index="/ListAnnualS"><i class="iconfont icon-dian"></i>年检记录</el-menu-item>
              <el-menu-item index="/saferListReview"><i class="iconfont icon-dian"></i>保险记录</el-menu-item>
              <el-menu-item index="/otherFeeListReview"><i class="iconfont icon-dian"></i>其他费用记录</el-menu-item>
            </el-submenu>
        	  <el-menu-item index="/transportMgt/listTransportMgt"><i class="iconfont icon-wenjianjia"></i>用车管理</el-menu-item>
        	  <el-submenu index="4-4">
              <template slot="title"><i class="iconfont icon-wenjianjia"></i>车辆情况汇总</template>
              <el-menu-item index="/carFeeSummary"><i class="iconfont icon-dian"></i>费用汇总</el-menu-item>
              <el-menu-item index="/vehicleUse"><i class="iconfont icon-dian"></i>车辆使用汇总</el-menu-item>
              <el-menu-item index="/driverSummary"><i class="iconfont icon-dian"></i>司机工作汇总</el-menu-item>
            </el-submenu>
            <router-link to="/clFile"><el-menu-item index="4-5"><i class="iconfont icon-wenjianjia"></i>车辆档案</el-menu-item></router-link>
          </el-submenu>
        </el-menu>
      </el-scrollbar>
  </el-aside>
</template>
<script>
export default {
    data() {
      return {
        isCollapse: false,
        isShowText: true,
        screenHeight: document.body.clientHeight-80
      };
    },
    mounted () {
        const that = this
        $(window).resize(function() {
           return (() => {
                 window.screenHeight = document.body.clientHeight
                 that.screenHeight = window.screenHeight-80
            })()
        });
    },
    watch: {
        screenHeight (val) {
            if (!this.timer) {
                this.screenHeight = val
                this.timer = true
                let that = this
                setTimeout(function () {
                    that.timer = false
                }, 400)
            }
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      switcherMenus(){
        if( this.isCollapse ){
          this.isCollapse = false;
          this.isShowText=true;
          $("aside").animate({width:"210px"});
        }else{
          this.isCollapse = true;
          this.isShowText = false;
          $("aside").animate({width:"64px"});
        }
      }
    }
  }
</script>
