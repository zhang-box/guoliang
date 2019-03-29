<template>
  <div class="breadcrumb-wrap">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="l-height">
      <el-breadcrumb-item  v-for="(item,index) in list" :key="index">
        <router-link :to="item.path">{{ showName(item) }}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-button class="return-btn right" v-if="showBackBtn" type="primary" size="small" @click="backUrl"></el-button>
  </div>
</template>
<script>
  export default {
    props: {
      list: {
        type: Array,
        required: true,
        default: () => []

      }
    },
    data (){
      return {
        showBackBtn:true,
      }
    },
    watch:{
      '$route'(to, from){

        if (this.$route.path == '/overview') {
          this.showBackBtn = false
        }else {
          this.showBackBtn = true
        }
      }
    },
    created(){
      if (this.$route.path == '/overview') {
        this.showBackBtn = false
      }else {
        this.showBackBtn = true
      }
    },
    methods: {
      showName (item) {
        if (item.meta.breadName) {
          item = item.meta.breadName
        }
        return item
      },
      backUrl(){
        this.$router.push({path:"/"})
      }
    }
  }
</script>
<style scoped>
  .l-height {
    line-height: 30px;
  }
</style>
