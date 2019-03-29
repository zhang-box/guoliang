<style>
  .secondTitle {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #c0c4cc;
    padding: 5px 10px;
  }

  .secondTitle span:nth-of-type(2) {
    margin-left: 10px;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }
  #back{
    padding: 7px 11px;
    border-radius: 3px;
    box-sizing: content-box;
  }

</style>
<template>
  <div class="secondTitle">
    <el-button id="back" size="min" class="fl" @click="returnList"><i class="el-icon-arrow-left"></i> 返回</el-button>
    <span class="fl" style="margin-left: 10px">{{title}}</span>
    <span class="fr">带*部分必须填写</span>

  </div>
</template>
<script>
  export default {
    name: 'secondTitle',
    props: {
      title: {
        title: String,
        required: true
      }
    },
    methods: {
      returnList() {
        this.$router.go(-1)
      }
    }

  }
</script>
