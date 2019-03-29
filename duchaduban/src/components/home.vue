<template>
  <el-container>
    <el-header style="height:80px;">
      <el-row>
        <el-col :span="10">
          <div class="logo-wrap">
            <img src="../assets/img/logo.png">
          </div>
        </el-col>
        <el-col :span="12">
			<div class="header-nav">
				<div id="navCarousel" class="carousel slide">
					<i class="el-icon-arrow-left nav-prev"></i>
					<div class="carousel-inner">
						<el-menu :default-active="activeIndex" class="el-menu-demo nav-item" mode="horizontal">
						  <el-menu-item index="1" class="nav-li">
						  	<img class="img-none" src="../assets/img/liangshisg_icon.png">
							<img class="img-pre" src="../assets/img/liangshisg.png">
							粮食收购资格
						  </el-menu-item>
						  <el-menu-item index="2" class="nav-li">
						  	<img class="img-none" src="../assets/img/waishi_icon.png">
							<img class="img-pre" src="../assets/img/waishi.png">
							外事管理
						  </el-menu-item>
						  <el-menu-item index="3" class="nav-li">
						  	<img class="img-none" src="../assets/img/liangshi_icon.png">
							<img class="img-pre" src="../assets/img/liangshi.png">
							粮食行业数据库
						  </el-menu-item>
						  <el-menu-item index="4" class="nav-li">
						  	<img class="img-none" src="../assets/img/biaozhun_icon.png">
							<img class="img-pre" src="../assets/img/biaozhun.png">
							标准制修
						  </el-menu-item>
						  <el-menu-item index="5" class="nav-li">
						  	<img class="img-none" src="../assets/img/houqin_icon.png">
							<img class="img-pre" src="../assets/img/houqin.png">
							后勤保障
						  </el-menu-item>
						  <el-menu-item index="6" class="nav-li">
						  	<img class="img-none" src="../assets/img/cheliang_icon.png">
							<img class="img-pre" src="../assets/img/cheliang.png">
							车辆管理
						  </el-menu-item>
						  <el-menu-item index="7" class="nav-li">
						  	<img class="img-none" src="../assets/img/dangjian_icon.png">
							<img class="img-pre" src="../assets/img/dangjian.png">
							党建管理
						  </el-menu-item>
						  <el-menu-item index="8" class="nav-li">
						  	<img class="img-none" src="../assets/img/huiyi_icon.png">
							<img class="img-pre" src="../assets/img/huiyi.png">
							会议管理
						  </el-menu-item>
						  <el-menu-item index="9" class="nav-li">
						  	<img class="img-none" src="../assets/img/ducha_icon.png">
							<img class="img-pre" src="../assets/img/ducha.png">
							督查督办
						  </el-menu-item>
						  <el-menu-item index="10" class="nav-li">
						  	<img class="img-none" src="../assets/img/laoganbu_icon.png">
							<img class="img-pre" src="../assets/img/laoganbu.png">
							老干部服务
						  </el-menu-item>
						  <el-menu-item index="11" class="nav-li">
						  	<img class="img-none" src="../assets/img/xitong_icon.png">
							<img class="img-pre" src="../assets/img/xitong.png">
							系统设置
						  </el-menu-item>
						</el-menu>
					</div>
					<i class="el-icon-arrow-right nav-next"></i>
				</div>
			</div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple ">
            <el-dropdown>
              <span class="el-dropdown-link">
                <img src="../assets/img/profile.png"><br>王处长<i class="el-icon-arrow-down el-icon--right"></i>
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
    <el-container>
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
            <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#72a7e5" text-color="#fff" active-text-color="#0079cf" :collapse="isCollapse">
              <el-submenu index="1">
                <template slot="title">
                  <i class="iconfont icon-shenqingguanli1"></i>
                  <span>申请管理</span>
                </template>
                <el-menu-item index="1-1"><i class="iconfont icon-wenjianjia"></i>用车申请</el-menu-item>
            <el-menu-item index="1-2"><i class="iconfont icon-wenjianjia"></i>费用申请</el-menu-item>
                <el-submenu index="1-3">
                  <template slot="title"><i class="iconfont icon-wenjianjia"></i>车辆使用记录</template>
                  <el-menu-item index="1-3-1"><i class="iconfont icon-dian"></i>加油记录</el-menu-item>
              <el-menu-item index="1-3-2"><i class="iconfont icon-dian"></i>维修保养记录</el-menu-item>
              <el-menu-item index="1-3-3"><i class="iconfont icon-dian"></i>违章记录</el-menu-item>
              <el-menu-item index="1-3-4"><i class="iconfont icon-dian"></i>事故记录</el-menu-item>
              <el-menu-item index="1-3-5"><i class="iconfont icon-dian"></i>年检记录</el-menu-item>
              <el-menu-item index="1-3-6"><i class="iconfont icon-dian"></i>保险记录</el-menu-item>
              <el-menu-item index="1-3-7"><i class="iconfont icon-dian"></i>其他费用</el-menu-item>
                </el-submenu>
            <el-submenu index="1-4">
                  <template slot="title"><i class="iconfont icon-wenjianjia"></i>车辆情况汇总</template>
                  <el-menu-item index="1-4-1"><i class="iconfont icon-dian"></i>费用汇总</el-menu-item>
              <el-menu-item index="1-4-2"><i class="iconfont icon-dian"></i>车辆使用汇总</el-menu-item>
              <el-menu-item index="1-4-3"><i class="iconfont icon-dian"></i>司机工作汇总</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="iconfont icon-shenhe1"></i>
                  <span>车辆审核管理</span>
                </template>
            <el-menu-item index="2-1"><i class="iconfont icon-wenjianjia"></i>车辆申请审核</el-menu-item>
                <el-submenu index="2-2">
                  <template slot="title"><i class="iconfont icon-wenjianjia"></i>车辆情况汇总</template>
                  <el-menu-item index="2-2-1"><i class="iconfont icon-dian"></i>费用汇总</el-menu-item>
              <el-menu-item index="2-2-2"><i class="iconfont icon-dian"></i>车辆使用汇总</el-menu-item>
              <el-menu-item index="2-2-3"><i class="iconfont icon-dian"></i>司机工作汇总</el-menu-item>
                </el-submenu>
              </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                  <i class="iconfont icon-shenhe1"></i>
                  <span>费用审核管理</span>
                </template>
            <el-submenu index="3-1">
                  <template slot="title"><i class="iconfont icon-wenjianjia"></i>信息登记管理</template>
                  <el-menu-item index="3-1-1"><i class="iconfont icon-dian"></i>车辆登记</el-menu-item>
              <el-menu-item index="3-1-2"><i class="iconfont icon-dian"></i>司机登记</el-menu-item>
                </el-submenu>
                <el-submenu index="3-2">
                  <template slot="title"><i class="iconfont icon-wenjianjia"></i>费用审核</template>
                  <el-menu-item index="3-2-1"><i class="iconfont icon-dian"></i>加油记录</el-menu-item>
              <el-menu-item index="3-2-2"><i class="iconfont icon-dian"></i>维修保养记录</el-menu-item>
              <el-menu-item index="3-2-3"><i class="iconfont icon-dian"></i>违章记录</el-menu-item>
              <el-menu-item index="3-2-4"><i class="iconfont icon-dian"></i>事故记录</el-menu-item>
              <el-menu-item index="3-2-5"><i class="iconfont icon-dian"></i>年检记录</el-menu-item>
              <el-menu-item index="3-2-6"><i class="iconfont icon-dian"></i>保险记录</el-menu-item>
              <el-menu-item index="3-2-7"><i class="iconfont icon-dian"></i>其他费用记录</el-menu-item>
                </el-submenu>
            <el-menu-item index="3-3"><i class="iconfont icon-wenjianjia"></i>用车管理</el-menu-item>
            <el-submenu index="3-2">
                  <template slot="title"><i class="iconfont icon-wenjianjia"></i>车辆情况汇总</template>
                  <el-menu-item index="3-2-1"><i class="iconfont icon-dian"></i>费用汇总</el-menu-item>
              <el-menu-item index="3-2-2"><i class="iconfont icon-dian"></i>车辆使用汇总</el-menu-item>
              <el-menu-item index="3-2-3"><i class="iconfont icon-dian"></i>司机工作汇总</el-menu-item>
                </el-submenu>
            <el-menu-item index="3-5"><i class="iconfont icon-wenjianjia"></i>车辆档案</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-scrollbar>
      </el-aside>
      <el-container>
        <el-main>
        </el-main>
      </el-container>
    </el-container>
    <el-footer style="height:39px;">版权所有：国家粮食和物资储备局</el-footer>
  </el-container>


</template>
<script>
import jquery from '../public-js/jquery-1.11.3.min.js'
import navslider from '../public-js/navslider.js'
export default {
    data() {
      return {
       active: 0,
        showImg: true,
        isCollapse: false,
        isShowText: true,
        activeIndex: '1',
        activeIndex2: '1',
        value6: '',
        selectValue: '',
        screenHeight: document.body.clientHeight-80,
        mounted () {
            const that = this
            window.onresize = () => {
                return (() => {
                    window.screenHeight = document.body.clientHeight
                    that.screenHeight = window.screenHeight-80
                })()
            }
        },
        watch: {
            screenWidth (val) {
                if (!this.timer) {
                    this.screenHeight = val
                    this.timer = true
                    let that = this
                    setTimeout(function () {
                        that.init()
                        that.timer = false
                    }, 400)
                }
            }
        },
        options: [{
                  value: '选项1',
                  label: '黄金糕'
                }, {
                  value: '选项2',
                  label: '双皮奶'
                }, {
                  value: '选项3',
                  label: '蚵仔煎'
                }, {
                  value: '选项4',
                  label: '龙须面'
                }, {
                  value: '选项5',
                  label: '北京烤鸭'
                }],
        tableData: [{
                  date: '2016-05-02',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1518 弄',
                  state:'待审批'
                }, {
                  date: '2016-05-04',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1517 弄',
                  state:'已审批'
                }, {
                  date: '2016-05-03',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1516 弄',
                  state:'待审批'
                }, {
                   date: '2016-05-01',
                   name: '王小虎',
                   address: '上海市普陀区金沙江路 1519 弄',
                   state:'退回'
                 }, {
                   date: '2016-05-03',
                   name: '王小虎',
                   address: '上海市普陀区金沙江路 1516 弄',
                   state:'待审批'
                 }]
      };
    },
    methods: {
      filterTag(value, row) {
        return row.state === value;
      },
      handleClick(row) {
        console.log(row);
      },
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
