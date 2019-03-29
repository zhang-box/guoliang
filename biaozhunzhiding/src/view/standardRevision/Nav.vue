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
     <!-- <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
               background-color="#72a7e5" text-color="#fff" active-text-color="#0079cf" :collapse="isCollapse" router>
        <el-submenu index="/standardRevisionManage">
          <template slot="title">
            <i class="iconfont icon-wenjianjia"></i>
            <span>行业标准</span>
          </template>
          <el-submenu index="/standarAppliList">
            <template slot="title">
              <i class="iconfont icon-wenjianjia"></i>
              <span>标准立项阶段</span>
            </template>
            <el-menu-item index="/standarAppliList"><i class="iconfont icon-dian"></i>立项申请</el-menu-item>
            <el-menu-item index="/standarFirstTrialList"><i class="iconfont icon-dian"></i>SC初审</el-menu-item>
            <el-menu-item index="/standarReviewList"><i class="iconfont icon-dian"></i>TC复审</el-menu-item>
            <el-menu-item index="/NationalBureauReviewList"><i class="iconfont icon-dian"></i>国家局审核</el-menu-item>
          </el-submenu>
          <el-submenu index="/standarDraftingList">
            <template slot="title">
              <i class="iconfont icon-wenjianjia"></i>
              <span>标准起草阶段</span>
            </template>
            <el-menu-item index="/standarDraftingList"><i class="iconfont icon-dian"></i>标准起草</el-menu-item>
          </el-submenu>
          <el-submenu index="/standardSolicitOpinionsList">
            <template slot="title">
              <i class="iconfont icon-wenjianjia"></i>
              <span>征求意见阶段</span>
            </template>
            <el-menu-item index="/standardSolicitOpinionsList"><i class="iconfont icon-dian"></i>征集意见</el-menu-item>
          </el-submenu>
          <el-submenu index="/SCReviewList">
            <template slot="title">
              <i class="iconfont icon-wenjianjia"></i>
              <span>标准审查阶段</span>
            </template>
            <el-menu-item index="/SCReviewList"><i class="iconfont icon-dian"></i>SC审核</el-menu-item>
            <el-menu-item index="/TCReviewList"><i class="iconfont icon-dian"></i>TC审核</el-menu-item>
          </el-submenu>
          <el-submenu index="/NBApprovalList">
            <template slot="title">
              <i class="iconfont icon-wenjianjia"></i>
              <span>标准报批</span>
            </template>
            <el-menu-item index="/TCApprovalList"><i class="iconfont icon-dian"></i>TC审核</el-menu-item>
            <el-menu-item index="/NBApprovalList"><i class="iconfont icon-dian"></i>国家局审核</el-menu-item>
          </el-submenu>
          <el-submenu index="/standardReleaseList">
            <template slot="title">
              <i class="iconfont icon-wenjianjia"></i>
              <span>标准发布</span>
            </template>
            <el-menu-item index="/standardReleaseList"><i class="iconfont icon-dian"></i>标准发布</el-menu-item>
          </el-submenu>
          <el-submenu index="/standardFileList">
            <template slot="title">
              <i class="iconfont icon-wenjianjia"></i>
              <span>标准档案</span>
            </template>
            <el-menu-item index="/standardFileList"><i class="iconfont icon-dian"></i>标准档案</el-menu-item>
          </el-submenu>
          <el-submenu index="/initiateVote">
            <template slot="title">
              <i class="iconfont icon-wenjianjia"></i>
              <span>投票管理</span>
            </template>
            <el-menu-item index="/initiateVote"><i class="iconfont icon-dian"></i>发起投票</el-menu-item>
            <el-menu-item index="/myVote"><i class="iconfont icon-dian"></i>我的投票</el-menu-item>
            <el-menu-item index="/performanceAssessment"><i class="iconfont icon-dian"></i>委员履职考核</el-menu-item>
          </el-submenu>
          <el-submenu index="/fileSharingList">
            <template slot="title">
              <i class="iconfont icon-wenjianjia"></i>
              <span>文件共享</span>
            </template>
            <el-menu-item index="/fileSharingList"><i class="iconfont icon-dian"></i>文件共享</el-menu-item>
          </el-submenu>
          <el-submenu index="/statisticsSearch">
            <template slot="title">
              <i class="iconfont icon-wenjianjia"></i>
              <span>统计查询</span>
            </template>
            <el-menu-item index="/statisticsSearch"><i class="iconfont icon-dian"></i>统计查询</el-menu-item>
          </el-submenu>

        </el-submenu>
         <el-submenu index="/load">
          <template slot="title">
            <i class="iconfont icon-wenjianjia"></i>
            <span>登录</span>
          </template>
          <el-menu-item index="/load"><i class="iconfont icon-dian"></i>登录</el-menu-item>
        </el-submenu>

        <el-submenu index="/registrantList">
          <template slot="title">
            <i class="iconfont icon-wenjianjia"></i>
            <span>注册</span>
          </template>
          <el-menu-item index="/registrantList"><i class="iconfont icon-dian"></i>人员管理</el-menu-item>
          <el-menu-item index="/registrant"><i class="iconfont icon-dian"></i>注册页面</el-menu-item>

        </el-submenu>
        <el-submenu index="/Committee">
          <template slot="title">
            <i class="iconfont icon-wenjianjia"></i>
            <span>委员管理</span>
          </template>
          <el-menu-item index="/SCExpertList"><i class="iconfont icon-dian"></i>SC专家管理</el-menu-item>
          <el-menu-item index="/TCExpertList"><i class="iconfont icon-dian"></i>TC专家管理</el-menu-item>
        </el-submenu>
       <el-submenu index="/registrantList">
          <template slot="title">
            <i class="iconfont icon-wenjianjia"></i>
           <span>TC</span>
          </template>

        </el-submenu>


      </el-menu> -->
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#72a7e5" text-color="#fff" active-text-color="#0079cf" :collapse="isCollapse" router>
        <template v-for="(item,itemIndex) in menuList">
          <el-menu-item :index="item.powerPath" v-if="item.childList.length === 0"  >
            <i class="iconfont icon-shouye"></i>
            <span slot="title">{{item.powerName}}</span>
          </el-menu-item>

          <el-submenu :index="itemIndex+''" v-else >
            <template slot="title">
              <i class="iconfont icon-zonghechaxun"></i>
              <span>{{item.powerName}}</span>
            </template>
            <template v-for="(items,itemsIndex) in item.childList">
              <el-menu-item :index="items.powerPath" v-if="items.childList.length === 0"  >
                <i class="iconfont icon-wenjianjia"></i>
                {{items.powerName}}
          </el-menu-item>
              <el-submenu :index="itemIndex+'-'+itemsIndex" v-else >
                <template slot="title"><i class="iconfont icon-wenjianjia"></i>{{items.powerName}}</template>
                <el-menu-item :index="items1.powerPath" v-if="items1.childList.length === 0" v-for="(items1,itemsIndex1) in items.childList" :key="items1.powerId">
                  <i class="iconfont icon-dian"></i>
                  {{items1.powerName}}
            </el-menu-item>
                <el-submenu :index="itemIndex+'-'+itemsIndex+'-'+itemsIndex1" v-if="items1.childList.length !== 0" v-for="(items1,itemsIndex1) in items.childList" :key="items1.powerId">
                  <template slot="title"><i class="iconfont icon-wenjianjia"></i>{{items1.powerName}}</template>
                  <el-menu-item :index="items2.powerPath" v-if="items2.childList.length === 0" v-for="(items2,itemsIndex1) in items1.childList" :key="items2.powerId">
                    <i class="iconfont icon-dian"></i>
                    {{items2.powerName}}
              </el-menu-item>
                </el-submenu>
              </el-submenu>
            </template>

          </el-submenu>

        </template>

      <!-- </el-menu> -->
      <!--&ndash;&gt;-->
     </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<script>
  import {getMenu,getSessionData} from 'api/standardAppliList/zuzhijigou'
  export default {
    data() {
      return {
        isCollapse: false,
        isShowText: true,
        screenHeight: document.body.clientHeight-80,
        menuList:[]
      };
    },
    created(){
        let _this = this
        setTimeout(function () {
          _this.getRuterMenus()
        },1000)
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
      },
      handleClose(key, keyPath) {
      },
      switcherMenus() {
        if (this.isCollapse) {
          this.isCollapse = false;
          this.isShowText = true;
          $("aside").animate({width: "210px"});
          $("aside + section").animate({"margin-left": "230px"});
        } else {
          this.isCollapse = true;
          this.isShowText = false;
          $("aside").animate({width: "64px"});
          $("aside + section").animate({"margin-left": "83px"});
        }
      },
      /*  开发环境*/
      /*  getRuterMenus(){
       let info = {
       "userName":"1101",
       "userPsw":"123456789"
       }
       userLogin(info).then(res => {
       let data = {
       "userId": res.data.userId,
       "loginToken":res.data.loginToken,
       }
       getMenu().then(res => {
       res.data[0].childList.forEach(item => {
       if(item.powerName === "标准制修订"){
       this.menuList = item.childList
       }
       })

       })
       })

       },*/
      /*     生产环境*/

      getRuterMenus() {
        const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));

        if (userInfo) {
          userInfo.powerList[0].childList.forEach(item => {
            if (item.powerName === "标准制修订") {
              this.menuList = item.childList
            }
          })
        } else {
          getSessionData().then(res => {
            res.powerList[0].childList.forEach(item => {
              if(item.powerName === "标准制修订"){
                this.menuList = item.childList
              }
            })
          })

        }
      }
    }
  }
</script>
