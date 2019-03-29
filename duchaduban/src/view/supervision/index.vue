<template>
  <div class="main">
    <el-container>
      <supervisionNav></supervisionNav>
      <el-container>
        <el-main>
          <bread-crumb :list="list"></bread-crumb>
          <div class="maincon-wrap" v-bind:style="{height: screenHeight+'px'}">
            <el-scrollbar class="nav-scrollbar">
              <router-view></router-view>
              <!-- <main-content></main-content> -->
            </el-scrollbar>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import supervisionNav from './nav.vue'
  import breadCrumb from '../../components/breadcrumb.vue'
  import jquery from './../../public-js/jquery-1.11.3.min.js'
  import mainContent from './main.vue'
  export default {
    data(){
      return{
        screenHeight: document.body.clientHeight-180,
      }
    },
    mounted () {
//      const that = this
      $(window).resize(()=>{
        window.screenHeight = document.body.clientHeight
        this.screenHeight = window.screenHeight-180
      });
//      $(window).resize(function() {
//        return (() => {
//          window.screenHeight = document.body.clientHeight
//          that.screenHeight = window.screenHeight-180
//        })()
//      });

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
      supervisionNav,
      breadCrumb,
      // mainContent
    },
    computed:{
      list(){
        return this.$route.matched
      }
    }
  }
</script>
