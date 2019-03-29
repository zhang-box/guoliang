// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import '@css/public.css'
import echarts from 'echarts'
import axios from 'axios'
import scroll from 'vue-seamless-scroll'

Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(scroll)

//or you can set componentName default componentName is vue-seamless-scroll
Vue.use(scroll,{componentName: 'scroll-seamless'})
/* eslint-disable no-new */
Vue.use(ElementUI)


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
