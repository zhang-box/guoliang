<template>
  <div class="newCar">
      <div class="content-title">
      <el-button class="title-button" size="mini"><i class="el-icon-arrow-left"></i> 返回</el-button>
      <span class="title-info">用车申请新增</span>
       <span class="required-msg">带<em>*</em>部分必须填写</span>
    </div>
     <div class="carBody">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <!-- 用车类型 -->
            <el-row :gutter="70">
                <!-- 用车类型 -->
                <el-col :span="8">
                        <el-form-item label="用车类型" prop="yclx" class="yclx">
                            <el-select v-model="ruleForm.yclx" placeholder="请选择">
                                <el-option label="局外租车" value="juwaizuche"></el-option>
                                <el-option label="局外租" value="zuwaizu"></el-option>
                            </el-select>
                        </el-form-item>
                </el-col>
                <!-- 车辆类型 -->
                <el-col :span="8">
                        <el-form-item label="车辆类型" prop="cllx">
                            <el-select v-model="ruleForm.cllx" placeholder="请选择">
                                <el-option label="111" value="111"></el-option>
                                <el-option label="222" value="222"></el-option>
                            </el-select>
                         </el-form-item>
                </el-col>
            </el-row>
            <!-- 事由 -->
            <el-row>
                <el-col :span="16">
                         <el-form-item label="事由" prop="sy" class="sy">
                            <el-input v-model="ruleForm.sy"></el-input>
                        </el-form-item>
                </el-col>
            </el-row>
           <!-- 出车时间 -->
           <el-row :gutter="70">
               <!-- 出车时间 -->
                <el-col :span="8">
                           <el-form-item label="出车时间" required>
                             <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="请选择" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                         </el-form-item>
                </el-col>
                <!-- 归队时间 -->
                <el-col :span="8">
                      <el-form-item label="归队时间" required>
                         <el-form-item prop="date2">
                             <el-date-picker type="date" placeholder="请选择" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
                         </el-form-item>
                        </el-form-item>
                </el-col>
            </el-row>
            <!-- 用车时长 -->
            <el-row :gutter="70">
                <!-- 用车时长 -->
               <el-col :span="8">
                        <el-form-item label="用车时长" prop="ycsc">
                            <el-input v-model="ruleForm.ycsc"></el-input>
                        </el-form-item>
                </el-col>
                <!-- 目的地 -->
                 <el-col :span="8">
                        <el-form-item label="目的地" prop="mdd">
                            <el-input v-model="ruleForm.mdd"></el-input>
                        </el-form-item>
                </el-col>
            </el-row>
            <!-- 行驶里程 -->
              <el-row :gutter="70">
                  <el-col :span="8">
                         <el-form-item label="行驶里程" prop="xslc">
                            <el-input v-model="ruleForm.xslc"></el-input>
                        </el-form-item>
                </el-col>
                <!-- 随行人数 -->
                <el-col :span="8">
                         <el-form-item label="随行人数">
                            <el-input v-model="ruleForm.sxrs"></el-input>
                        </el-form-item>
                </el-col>
              </el-row>

            <!-- 随行人员表格 -->
            <el-row>
                <el-col :span="24">
                        <el-form-item label="随行人员" prop="sxry" class="sxrs">
                          <el-table :data="tableData" style="width: 88%" border class="sxryTable" >
                            <el-table-column prop="number" label="序号" min-width="25%" align="center"></el-table-column>
                            <el-table-column prop="uname" label="人员姓名" min-width="25%" align="center"></el-table-column>
                            <el-table-column prop="department" label="部门" min-width="41%" align="center"></el-table-column>
                            <el-table-column prop="post" label="职务" min-width="19%" align="center"></el-table-column>
                          </el-table>
                          <!-- <el-button type="primary" icon="el-icon-circle-plus-outline" class="add">人员选择</el-button> -->
                          <add></add>
                        </el-form-item>
                </el-col>
            </el-row>

           <!-- 用车人 -->
           <el-row :gutter="70">
                <el-col :span="8">
                        <el-form-item label="用车人">
                           <el-input v-model="ruleForm.ycr"></el-input>
                        </el-form-item>
                </el-col>
                <el-col :span="8">
                        <el-form-item label="联系电话">
                           <el-input v-model="ruleForm.lxdh"></el-input>
                        </el-form-item>
                </el-col>
            </el-row>

         <!-- 备注 -->
           <el-row>
                <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input
                                type="textarea"
                                :rows="3"
                                placeholder=""
                                v-model="textarea">
                                </el-input>
                        </el-form-item>
                </el-col>
            </el-row>

    <!-- 底部提交 -->
            <el-form-item class="footer">
                <el-button type="primary" @click="resetForm('ruleForm')">保存不提交</el-button>
                <el-button  @click="submitForm('ruleForm')" class="footerSub">保存并提交</el-button>
            </el-form-item>

        </el-form>
     </div>
  </div>
</template>
<script>
//   import getInsert from '../api/dialog'
import add from './add'
export default {
    data() {
      return {
        ruleForm: {
          yclx: '',
          cllx:'',
          sy:'',
          ycsc:'',
          date1: '',
          date2: '',
          sxrs:'',
          mdd:'',
          sxry:'',
          xslc:'',
          ycr:'',
          lxdh:''
        },
        textarea:'',
        rules: {
          yclx: [
             { required: true, message: '请选择用车类型', trigger: 'change' }
          ],
          cllx: [
             { required: true, message: '请选择车辆类型', trigger: 'change' }
          ],
         sy: [
            { required: true, message: '请输入事由', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          ycsc:[
            { required: true, message: '请输入用车时长', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          xslc:[
            { required: true, message: '请输入行驶里程', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          mdd: [
            { required: true, message: '请输入目的地', trigger: 'blur' }
          ],
          sxry:[
              { required: true, message: '请添加随行人员', trigger: 'blur' }
          ],
        },
         tableData: [{
            number: '1',
            uname: '张三',
            department: '仓储科技司-综合处',
            post:'处长'
          }]
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    components:{
    'add': add,
    }
    // created(){
    //       getInsert(1,1).then(response => {
    //         console.log(response)
    //       })
    //   }
}
</script>
<style>
body{
     margin: 0;
    padding: 0;
    background-color: #fff;
}
.newCar{
    width: 100%;
    overflow: hidden;
}
.carHeaderR{
    float: right;
    margin-right: 10px;
}
.carHeaderR em{
    color:#f56c6c;
    font-style: normal;
}
.newCar .el-row {
    margin-bottom: 20px;
  }
.newCar.el-col {
    border-radius: 0px;
  }
.newCar .el-input__inner {
      border-radius: 0;
  }
 .newCar .el-form-item__label, .newCar .footerSub{
      color:#000;
  }
  .newCar .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .carBody{
      padding:20px;
  }
  .sy{
      word-spacing: 50px;
  }
  .sxryTable{
      color:#333 !important;
  }
  .sxryTable th{
    background-color: #f5f5f5;
    height: 40px;
    }
 .sxryTable tr{
    height: 40px !important;
    }
.sxryTable .el-table__empty-block{
    min-height: 40px;
}
.sxryTable .has-gutter tr{
    height: 40px !important;
}
.sxryTable .el-table td, .el-table th{
    padding: 0;
}
.newCar .el-table thead {
    color:#333 !important;
}
.newCar .el-table thead th{
    font-weight: normal;
}
.sxrs{
    position: relative;
}
.add{
    position: absolute;
    right: 0;
    bottom:0;
    border-radius: 10px;
}
.newCar .el-row{
    margin-bottom: 0px;
}
.newCar .footer{
    text-align: center;
}
.newCar .el-form-item__label{
    text-align: left;
}
</style>


