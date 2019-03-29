<template>
  <div id="app">
      <el-header></el-header>
      <!-- <home></home> -->
      <router-view></router-view>
      <el-footer></el-footer>
  </div>
</template>

<script>
import header from './components/layout/header.vue'
// import home from 'home.vue'
import footer from './components/layout/footer.vue'
export default {
  name: 'App',
  components: {
    'el-header':header,
//    'el-aside':nav,
//    'el-breadcrumb':breadcrumb,
    'el-footer':footer,
    // 'el-home':home
  },
  data() {
        return {
          screenHeight: document.body.clientHeight-180
        };
  },
  mounted () {
    const that = this
    $(window).resize(function() {
       return (() => {
            window.screenHeight = document.body.clientHeight
            that.screenHeight = window.screenHeight-180
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
  }
}
</script>

<style>
#app {
  font-family:'微软雅黑', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height:100%;
}
</style>
