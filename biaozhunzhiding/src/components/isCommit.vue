<template>
  <div class="iscommit">
      <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

        <el-dialog
        title="提交"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <div  style="text-align: center;letter-spacing: 2px;">是否提交?</div>
        <div slot="footer" class="dialog-footer" style="text-align: center;">
             <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
        </div>
        </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
}
</script>
<style>
.el-dialog__header{
    border-bottom: 1px solid #ccc;
}
.el-dialog{
    width: 590px !important;
    height: 270px;
}
.el-dialog__body{
    line-height: 71px;
    font-size: 18px;
    color:#000;
}
</style>


