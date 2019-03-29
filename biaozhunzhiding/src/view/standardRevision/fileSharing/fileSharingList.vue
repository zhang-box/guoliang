<template>
  <div class="content-wrapper">
    <div class="content-main" style="padding-left:5%;">
      <div style="float:left;padding-top:2%;width:35%;overflow: auto;">
        <el-tree :data="data" :props="defaultProps" accordion @node-click="handleNodeClick"></el-tree>
      </div>
      <!--<div style="clear: both"></div>-->
      <div style="float:left;border-left:1px solid #eee;width:60%;">
        <div class="tab-toolbar">
          <el-button type="primary" icon="icon iconfont icon-chaxun" class="mar-l-30" @click="newFloder('floder')" :disabled="disableType"> 创建文件夹</el-button>
          <el-button type="primary" icon="icon iconfont icon-qingkong" class="mar-l-30 button-let" @click="newFloder('file')" :disabled="disableType"> 创建文件</el-button>
          <el-button type="primary" icon="icon iconfont icon-qingkong" class="mar-l-30 button-let" @click="downloads()" :disabled="disableType"> 批量下载</el-button>
        </div>


        <div class="content-table">

          <el-table :data="tableData" class="table1" style="width: 100%; margin-top: 10px;margin-left:3%;" @selection-change="handleTable">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" :index="typeIndex" label="序号" width="60"></el-table-column>
            <el-table-column prop="name" label="名称"  width="150">
              <template slot-scope="scope">
                <div @click="handleFileName(scope.row)" style="cursor: pointer;">
                  {{scope.row.name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="size" label="大小(kb)">
              <template slot-scope="scope">
                <template v-if="scope.row.size == null">
                  —
                </template>
                <template v-else>
                  {{scope.row.size}}
                </template>
              </template>
            </el-table-column>
            <el-table-column prop="userId" label="创建者"></el-table-column>
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column label="操作" width="250">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="del(scope.row)" :disabled="disableType"><i
                  class="icon iconfont icon-lajitong"></i> 删除
                </el-button>
                <el-button type="text" size="small" @click="download(scope.row)" :disabled="disableType"><i
                  class="icon iconfont icon-xiazai"></i> 下载
                </el-button>
                <template v-if="scope.row.filetype == 'folder'">
                  <el-button type="text" size="small" @click="detail(scope.row)" :disabled="disableType"><i
                    class="icon iconfont icon-chakan"></i> 查看
                  </el-button>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-size="formPage.limit"
          :total="formPage.total">
        </el-pagination> -->
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="formPage.page"
          :page-size="formPage.limit"
          layout="total,prev, pager, next, jumper"
          :total="formPage.total">
        </el-pagination>
      </div>
      <div style="clear: both"></div>
      <el-dialog
        :title="titleText"
        :visible.sync="dialogVisible1"
        width="30%"
        :before-close="handleClose">
        <el-form label-width="135px" class="ruleForm mar-t-20">
          <el-row>
            <el-col :span="20">
              <el-form-item label="上级文件夹:">
                <el-cascader
                  :options="options"
                  v-model="selectedOptions"
                  change-on-select
                  @change="handleChange"
                  :disabled="disableType">
                </el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item v-if="floderType" label="文件夹名称:">
                <el-input v-model="name"></el-input>
              </el-form-item>
              <el-form-item v-else label="文件:">
                <el-upload class="upload-demo"
                           :action="url"
                           :on-success="handleSuccess"
                           :on-remove="handleRemove"
                           :before-upload="beforeUpload"
                           :file-list="fileList"
                           :limit="1">
                  <el-button size="small" type="primary">上传</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item v-if="fileType" label="文件名称:">
                <el-input v-model="name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeInfo">取 消</el-button>
          <el-button v-if="floderType" type="primary" @click="addFloder" :disabled="disableType">保 存</el-button>
          <el-button v-if="fileType" type="primary" @click="addFile" :disabled="disableType">保 存</el-button>
        </span>
      </el-dialog>


    </div>
    <!--<iframe v-if="showPFD" :src="hrefPDF" width="100%" height="100%">-->
      <!--This browser does not support PDFs. Please download the PDF to view it: <a href="/test.pdf" rel="external nofollow" >Download PDF</a>-->
    <!--</iframe>-->
  </div>


</template>

<script>
  // import {
  //   warningList,
  //   warningDelete
  // } from 'api/oldCadre/adminManage'
  import {voteUrl} from 'api/index'
  import {getFolder, getFileList, fileDownloads, fileDelete, fileFloder, fileUpload, getFolderList, fileLook} from 'api/standardAppliList/standardApproval/standardApproval'
  export default {
    data(){
      return {
        fileList: [],
        titleText:'',
        hrefPDF : '',
        showPFD : false,
        options:[],
        selectedOptions:[],
        disableType:false,
        floderType:false,
        fileType : false,
        form:{
          pid : '',
          realpath : '',
        },
        name : '',
        file : '',
        dialogVisible1: false,
        ids:'',
        formPage: {
          page: 1,
          limit: 10,
          total: undefined,
        },
        tableData:[],
        data:[],
        defaultProps: {
          children: 'childFolder',
          label: 'name'
        },
        fileurl:'',
        size : '',
        url:'',
        userInfo:{},   //登录人信息
      };
    },
    created(){
      this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
      getFolder().then(response => {
        this.data = response.data;
      });
      //文件路径
      getFolderList().then(response => {
        this.options = response.data;
      });
      //一级文件列表
      getFileList().then(response => {
        this.tableData = response.data.list;
        this.formPage.total = response.data.total
      });
      this.url = voteUrl + 'resNew/fileUpload';
    },
    methods: {
      beforeUpload(file){
        const isLt5M = file.size / 1024 / 1024 < 5;
        if(!isLt5M){
          this.$message.error('上传文件大小不能超过 5MB!');
        }
        return isLt5M;
      },
      closeInfo(){
        this.dialogVisible1 = false;
        this.fileList = [];
      },
      handleChange(val){

      },
      // tirggerFile : function (event) {
      //   this.file = event.target.files;
      // },
      newFloder(type){
        if(type == 'floder'){
            this.floderType = true;
            this.fileType = false;
            this.titleText = '创建文件夹';
          }else if(type == 'file'){
            this.fileType = true;
            this.floderType = false;
            this.titleText = '创建文件';
          }
        //文件路径
        getFolderList().then(response => {
          this.options = response.data;
        });
        this.name = '';
        this.selectedOptions = [];
        this.fileurl = '';
        this.size = '';
        this.dialogVisible1 = true
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.fileList = [];
            done();
          })
          .catch(_ => {});
      },
      addFloder(){
        this.disableType = true;
        let data = {
            'pid' : this.selectedOptions[this.selectedOptions.length - 1],
            'name' : this.name,
            'userId' : '1',
            'filetype' : 'folder'
          };
        fileFloder(data).then(response => {
          if (response.code == 1) {
            this.$message.success('创建成功');
            this.fileList = [];
            this.dialogVisible1 = false;
            getFolder().then(response => {
              this.data = response.data
            });
            //一级文件列表
            let data1 = {
              'id' : this.selectedOptions[this.selectedOptions.length - 1]
            };
            getFileList(data1).then(response => {
              this.tableData = response.data.list;
              this.formPage.total = response.data.total
            });
          }else{
            this.$message.error('创建异常');
          }
          this.disableType = false;
        }).catch(err=>{

        });
      },
      typeIndex(index) {
        return index + (this.formPage.page - 1) * this.formPage.limit + 1;
      },
      handleSuccess(response, file, fileList){
        this.fileurl = response.data[0].resOriginalUrl;
        this.size = response.data[0].resSize;
      },
      handleRemove(file, fileList) {
        this.fileurl = '';
        this.size = ''
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      addFile(){
        this.disableType = true;
        let data = {
            'pid' : this.selectedOptions[this.selectedOptions.length - 1],
            'name' : this.name,
            'userId' : '1',
            // 'lastFolder' : this.form.realpath,
            'fileurl' : this.fileurl,
            'size' : this.size,
          };
        fileUpload(data).then(response => {
          if (response.code == 1) {
            this.$message.success('创建成功');
            this.fileList = [];
            this.dialogVisible1 = false;
            getFolder().then(response => {
              this.data = response.data;
            });
            let data1 = {
              'id' : this.selectedOptions[this.selectedOptions.length - 1]
            };
            getFileList(data1).then(response => {
              this.tableData = response.data.list;
              this.formPage.total = response.data.total
            });
          }else{
            this.$message.error('创建异常');
          }
          this.disableType = false;
        }).catch(err=>{

        });
      },
      del(row){
        let text;
        if(row.filetype == 'folder'){
          text = '此操作将永久删除该文件夹下的所有文件, 是否继续?'
        }else if(row.filetype == 'file'){
          text = '此操作将永久删除该文件, 是否继续?'
        }
        this.$confirm(text, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            'id': row.id
          };
          fileDelete(data).then(response => {
            if (response.code == 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              getFolder().then(response => {
                this.data = response.data;
              });
              let data1 = {
                'id': parseInt(this.form.pid)
              };
              getFileList(data1).then(response => {
                this.tableData = response.data.list;
                this.formPage.total = response.data.total
              });
            } else {
              this.$message({
                type: 'error',
                message: '删除异常!'
              });
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        })
      },
      handleTable(val){
         this.ids = '';
         for(var i = 0; i < val.length; i++){
           if(i == '0'){
             this.ids += val[i].id
           }else{
             this.ids += ',' + val[i].id
           }
         }
      },
      handleFileName(row){
        if(row.filetype == 'file'){
          window.location.href = voteUrl + 'file/download?id=' + parseInt(row.id)
        }else if(row.filetype == 'folder'){
          let data = {
            'id' : parseInt(row.id)
          };
          getFileList(data).then(response => {
            this.tableData = response.data.list;
            this.formPage.total = response.data.total
          });
        }
      },
      download(row){
        if(row.filetype == 'file'){
          window.location.href = voteUrl + 'file/download?id=' + parseInt(row.id)
        }else if(row.filetype == 'folder'){
          debugger;
          window.location.href = voteUrl + 'file/downloads?ids=' + parseInt(row.id)
          // let data = {
          //   'ids' : parseInt(row.id)
          // };
          // fileDownloads(parseInt(row.id)).then(response => {
          //   if(response.code == 0){
          //     window.location.href = response.data
          //   }else{
          //     this.$message({
          //       type: 'error',
          //       message: '下载失败！'
          //     });
          //   }
          // });
        }
      },
      downloads(){
        if(this.ids != ''){
          window.location.href = voteUrl + 'file/downloads?ids=' + this.ids
          // let data = {
          //   'ids' : this.ids
          // };
          // fileDownloads(this.ids).then(response => {
          //   if(response.code == 0){
          //     window.location.href = response.data
          //   }else{
          //     this.$message({
          //       type: 'error',
          //       message: '下载失败！'
          //     });
          //   }
          // });
        }else{
          this.$message({
            type: 'warning',
            message: '请选择要下载的数据！'
          });
        }

      },
      detail(row){
        if(row.filetype == 'folder'){
          let data = {
            'id' : row.id
          };
          getFileList(data).then(response => {
            this.tableData = response.data.list;
            this.formPage.total = response.data.total
          });
        }else if(row.filetype == 'file'){
          fileLook(parseInt(row.id)).then(response => {
            window.open(response.data);
          });
        }
      },
      handleNodeClick(data) {
        this.form = {
          pid : data.id,
          realpath : data.realpath,
        };
        let data1 = {
          'id' : data.id
        };
        getFileList(data1).then(response => {
          this.tableData = response.data.list;
          this.formPage.total = response.data.total
        });
      },
      handleCurrentChange(val) {
        this.formPage.page = val;
        let data1 = {
          'id' : this.form.pid,
          "pageNum": val,
          "pageSize": this.formPage.limit
        };
        getFileList(data1).then(response => {
          this.tableData = response.data.list;
          this.formPage.total = response.data.total
        });
      },

    }
  }
</script>

<style scoped>
  .tab-toolbar {
    margin: 25px 0;
  }
  .content-table{
    padding-top: 20px;
    border-top: 1px solid #dcdfe6 ;
  }
  .search-row {
    margin-bottom: 10px;
  }
  .search-row .span-width {
    width: 70px;
    display: inline-block;
    text-align: right;
  }
  .search-width {
    width: 200px;
  }
</style>
