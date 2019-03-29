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
         <!--  <el-menu-item index="/super">
            <i class="iconfont icon-shouye"></i>
            <span slot="title">首页</span>
          </el-menu-item> -->
    	    <el-submenu index="2">
            <template slot="title">
              <i class="iconfont icon-wenjianjia"></i>
              <span>办公室</span>
            </template>
            <el-menu-item index="/waitingProcessed">
              <i class="iconfont icon-dian"> </i>
              <span>待办任务管理</span>
            </el-menu-item>
            <el-menu-item index="/supervisoryManage">
              <i class="iconfont icon-dian"> </i>
              <span>督办登记管理</span>
            </el-menu-item>
            <el-menu-item index="/overseeReport">
              <i class="iconfont icon-dian"> </i>
              <span>督办报告管理</span>
            </el-menu-item>
            <el-menu-item index="/overdueItems">
              <i class="iconfont icon-dian"> </i>
              <span>逾期事项管理</span>
            </el-menu-item>
            <el-menu-item index="/supervisoryStatistics">
              <i class="iconfont icon-dian"> </i>
              <span>督办统计</span>
            </el-menu-item>
            <el-menu-item index="/leadershipAudit">
              <i class="iconfont icon-dian"> </i>
              <span>领导审核页面</span>
            </el-menu-item>
            <el-menu-item index="/aggregationQuery">
              <i class="iconfont icon-dian"> </i>
              <span>汇总查询</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="iconfont icon-wenjianjia"></i>
              <span>承办司局</span>
            </template>
            <el-menu-item index="/toDoManaged">
              <i class="iconfont icon-dian"></i>
              <span slot="title">待办任务管理</span>
            </el-menu-item>
            <el-menu-item index="/progressSummary">
              <i class="iconfont icon-dian"></i>
              <span slot="title">进展汇总</span>
            </el-menu-item>
            <el-menu-item index="/overseeEvents">
              <i class="iconfont icon-dian"></i>
              <span slot="title">督办事件办理</span>
            </el-menu-item>
            <el-menu-item index="/overdueMatters">
              <i class="iconfont icon-dian"></i>
              <span slot="title">逾期办理事项</span>
            </el-menu-item>
            <el-menu-item index="/submitStatistical">
              <i class="iconfont icon-dian"></i>
              <span slot="title">报送统计</span>
            </el-menu-item>
            <el-menu-item index="/supervisorAudit">
              <i class="iconfont icon-dian"></i>
              <span slot="title">领导审核</span>
            </el-menu-item>
          </el-submenu>
      </el-menu>

  	</el-scrollbar>
  </el-aside>
</template>
<script type="text/javascript">
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
</script>
