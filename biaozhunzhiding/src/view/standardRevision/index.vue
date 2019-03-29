
<template>
  <div class="main">
    <el-header></el-header>
    <el-container>
      <Nav></Nav>
      <el-container>
      <el-main>
        <bread-crumb :list="list"></bread-crumb>
        <div class="maincon-wrap" v-bind:style="{height: screenHeight+'px'}">
          <el-scrollbar class="nav-scrollbar">
           <router-view></router-view>
          </el-scrollbar>
        </div>
      </el-main>
      </el-container>
    </el-container>
    <el-footer></el-footer>
  </div>
</template>
<script>
  import header from '../../components/layout/header.vue'
  import footer from '../../components/layout/footer.vue'
  import Nav from './Nav.vue'
  import breadCrumb from '../../components/breadCrumb.vue'
  import jquery from './../../public-js/jquery.min.js'
//  import mainContent from './main.vue'
  export default {
    data(){
        return{
          screenHeight: document.body.clientHeight-180,
        }
    },
    mounted () {
//      const that = this
      $(window).resize(()=>{
        window.screenHeight = document.body.clientHeight;
        this.screenHeight = window.screenHeight-180
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
    components: {
      'el-header':header,
      'el-footer':footer,
      Nav,
      breadCrumb,
//      mainContent
    },
    computed:{
      list(){
        return this.$route.matched
      }
    }
  }
</script>
