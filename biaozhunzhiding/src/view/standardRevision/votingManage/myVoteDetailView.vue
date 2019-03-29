<template>
  <div class="content-wrapper">
      <div class="content-title">
        <el-button  class="title-button" size="mini" @click="returnList()"><i class="el-icon-arrow-left"></i> 返回</el-button>
        <span  class="title-info">查看投票</span>
    </div>
     <div class="content-main">
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" ref="formLabelAlign">
            <el-row  :gutter="20">
                <el-col :span="10">
                    <el-form-item label="投票状态 :">
                        <span>{{formLabelAlign.voteStatus}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
           <el-row  :gutter="20">
                <el-col :span="24">
                    <el-form-item label="投票结果 :">
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="赞成 :">
                                    <span>{{formLabelAlign.approveCount}}    票</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="不赞成 :">
                                    <span>{{formLabelAlign.opposeCount}}    票</span>
                                </el-form-item>
                            </el-col>
                           <el-col :span="6">
                                <el-form-item label="弃权 :">
                                    <span>{{formLabelAlign.abstainCount}}    票</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="投票率 :">
                                  <span class="list-width">{{formLabelAlign.voteRate}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
            </el-row>
          </el-form>
          <hr>
            <el-table :data="formLabelAlign.voteList" style="width: 100%; margin-top:25px;"  class="table1">
                <el-table-column   type="index"    label="序号" width="100"> </el-table-column>
                <el-table-column   prop="title"     label="标题" > </el-table-column>
                <el-table-column   prop="userName"  label="投票人"> </el-table-column>
                <el-table-column   prop="result"  label="投票结果">
                  <template slot-scope="scope">
                    <template v-if="scope.row.result == '1'">
                      赞成
                    </template>
                    <template v-if="scope.row.result == '2'">
                      反对
                    </template>
                    <template v-if="scope.row.result == '3'">
                      弃权
                    </template>
                  </template>
                </el-table-column>
            </el-table>
     </div>
  </div>
</template>
<script>
  import {voteDetail} from 'api/standardAppliList/voteManage/vote_zj'
  export default {
    data() {
      return {
        labelPosition: 'left',
        formLabelAlign: {},
        userInfo:{
          userId: -1,
          loginToken: -1,
          realName: -1,
          sysgovname: -1,
        },   //登录人信息
      };
    },
    created(){
      const user = JSON.parse(window.sessionStorage.getItem('userInfo'));
      if(user){
        this.userInfo = user;
      }
      let data = {
        "voteId": this.$route.query.row.id,
        "projectId": this.$route.query.row.projectId,
        'times' : this.$route.query.row.times,
        'workflow' : this.$route.query.row.workflow
      };
      console.log(data)
      voteDetail(data).then(response => {
        this.formLabelAlign = response.data;
      })
    },

    methods: {
      returnList(){
        if(this.$route.query.type == 'myVote'){
          this.$router.push({name:'myVote'});
        }else if(this.$route.query.type == 'initiateVote'){
          this.$router.push({name:'initiateVote'});
        }
      }
    },
  }
</script>
<style scoped>
 .content-main{
     margin-top: 15px;
 }
 .el-select{
     width:100%;
 }
 .el-date-editor.el-input, .el-date-editor.el-input__inner{
     width: 100%;
 }
.content-main{
    padding:10px;
}
 .list-width{
    width: 389px;
    text-align: center;
  }
</style>


