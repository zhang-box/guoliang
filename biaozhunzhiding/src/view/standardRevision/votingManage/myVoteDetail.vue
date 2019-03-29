<template>
  <div class="content-wrapper">
      <div class="content-title">
        <el-button  class="title-button" size="mini" @click="returnList()"><i class="el-icon-arrow-left"></i> 返回</el-button>
        <span  class="title-info">投票</span>
        <!-- <span  v-else-if="updateType" class="title-info">用品编辑</span>
        <span  v-else class="title-info">投票</span> -->
    </div>
     <div class="content-main">
         <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign" ref="formLabelAlign">
           <el-row  :gutter="20">
                <el-col :span="10">
                   <el-form-item label="标题 :">
                         <div  class="list-width">{{formLabelAlign.title}}</div>
                  </el-form-item>
                </el-col>
            </el-row>
         <el-row>
                <el-col :span="20">
                        <el-form-item label="描述 :">
                             <div class="list-width">{{formLabelAlign.description}}</div>
                        </el-form-item>
                </el-col>
            </el-row>
           <el-row  :gutter="20">
                <el-col :span="10">
                   <el-form-item label="截止日期 :">
                         <div class="list-width">{{formLabelAlign.endTime}}</div>
                  </el-form-item>
                </el-col>
            </el-row>
           <el-row  :gutter="20">
                <el-col :span="10">
                   <el-form-item label="项目编号 :">
                         <div class="list-width">{{formLabelAlign.projectNumber}}</div>
                  </el-form-item>
                </el-col>
            </el-row>
           <el-row  :gutter="20">
                <el-col :span="10">
                   <el-form-item label="项目名称 :">
                         <div class="list-width">{{formLabelAlign.projectName}}</div>
                  </el-form-item>
                </el-col>
            </el-row>
               <el-row :gutter="20">
                  <el-col :span="20">
                        <el-form-item label="投票方式：">
                          <div class="list-width">
                            {{isOpenResult}}  {{isAnonymous}}  {{isAllowModify}}
                          </div>
                    </el-form-item>
                  </el-col>
               </el-row>
                <el-radio-group v-model="formDate.result" style="margin-left: 3%">
                  <el-radio label="1">赞成</el-radio>
                  <el-radio label="2">反对</el-radio>
                  <el-radio label="3">弃权</el-radio>
                </el-radio-group>

            <!-- footer -->
            <el-form-item size="large" style="margin-left: 200px; margin-top:20px;">
                <el-button type="primary" @click="submitForm" size="large" :disabled="disabledType">投票</el-button>
            </el-form-item>
        </el-form>
     </div>
  </div>
</template>
<script>
  import {voteDetailById, voting} from 'api/standardAppliList/voteManage/vote_zj'
  export default {
    data() {
      return {
        disabledType : false,
        aa:'',
        options: [],
        value: '',
        labelPosition: 'right',
        showType:false,
        updateType:false,
        formLabelAlign: {},
        formDate : {
          userId: undefined,
          userName : undefined,
          id : this.$route.params.votePartId,
          result: '',
        },
        isOpenResult : '',
        isAnonymous : '',
        isAllowModify : '',
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
      this.formDate.userId = this.userInfo.userId;
      this.formDate.userName = this.userInfo.realName;
      let data = {
        'voteId' : this.$route.params.id
      };
      voteDetailById(data).then(response => {
        this.formLabelAlign = response.data.vote;
        if(response.data.vote.isOpenResult == "1"){
          this.isOpenResult = '结果公开、';
        }else{
          this.isOpenResult = '结果不公开、';
        };
        if(response.data.vote.isAnonymous == "1"){
          this.isAnonymous = '记名投票、';
        }else{
          this.isAnonymous = '不记名投票、';
        };
        if(response.data.vote.isAllowModify == "1"){
          this.isAllowModify = '允许修改投票结果';
        }else{
          this.isAllowModify = '不允修改投票结果';
        };
      });
    },
    methods: {
     submitForm() {
       this.disabledType = true;
       if(!this.formDate.result){
         this.$message.error('请投票');
       }else{
         voting(this.formDate).then(response => {
           if (response.code == 1) {
             this.$message.success('投票成功！');
             this.$router.push({name:"myVote"});
           }else{
             this.$message.error('投票异常！');
             this.disabledType = false;
           }
         }).catch(err=>{

         })
       }
      },
      returnList(){
        this.$router.push({name:'myVote'});
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
    padding-left:15px;
  }
</style>


