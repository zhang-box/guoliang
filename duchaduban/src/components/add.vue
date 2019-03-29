<template>
  <div class="pSelection">  
      <el-button type="primary"  @click="dialogVisible = true" icon="el-icon-circle-plus-outline" class="add">人员选择</el-button>
      <el-dialog title="人员选择" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <!-- body $refs.msg-->
         <el-input placeholder="" suffix-icon="el-icon-search" v-model="input1"></el-input>
         <div class="Mselection">
            <i class="iconfont icon-jiantouarrow486 arrow " @click="changeIcon($event)"></i>
            <el-checkbox :indeterminate="OfficeisIndeterminate" v-model="Office" @change="handleOfficeChange" >办公室</el-checkbox>
            <el-checkbox-group v-model="OfficeP" @change="handleOfficeVFChange" >
                <el-checkbox v-for="people in officeVF" :label="people" :key="people">{{people}}</el-checkbox>
            </el-checkbox-group>
         </div>
         <div class="Mselection">
            <i class="iconfont icon-jiantouarrow486 arrow " @click="changeIcon($event)"></i>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">调控司</el-checkbox>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
         </div>
        <!-- footer -->
        <div slot="footer" class="dialog-footer center" >
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
        </el-dialog>
      
  </div>
</template>
<script>
import jquery from './../public-js/jquery-1.11.3.min.js'
const cityOptions = ['张三', '李四'];
const Opersonnels=['小明','小红'];
export default {
 data() {
      return {
        checkAll: false,
        checkedCities: ['张三', '李四'],  /*v-model*/
        cities: cityOptions,
        isIndeterminate: false,

        Office:false,
        OfficeP:['小明','小红'], /*v-model*/
        officeVF:Opersonnels,
        OfficeisIndeterminate:false,
        
       
        dialogVisible: false,
        input1:'',
        department:[{

        }]
      };
    },
    methods: {
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleCheckAllChange(val) {
          console.log(val)
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      handleOfficeChange(val){
         this.OfficeP = val ? Opersonnels : [];
        this.isIndeterminate = false;
      },
      handleOfficeVFChange(value){
        let hOffice = value.length;
        this.Office = hOffice === this.officeVF.length;
        this.OfficeisIndeterminate = hOffice > 0 && hOffice < this.officeVF.length;
      },
      changeIcon($event){
            if($($event.path[0]).hasClass('icon-jiantouarrow486')){
               $($event.path[0]).removeClass('icon-jiantouarrow486').addClass('icon-jiantouarrow486-copy');
                $($event.path[1]).find('.el-checkbox-group').hide()
            }else{
                $($event.path[0]).removeClass('icon-jiantouarrow486-copy').addClass('icon-jiantouarrow486');
                 $($event.path[1]).find('.el-checkbox-group').show()
            }

      }
    }
}

</script>
<style>
.pSelection{
    color:#000;
}
.pSelection .center{
    text-align: center;
}
.pSelection .el-checkbox{
    color:#000;
}
.pSelection .el-checkbox__input.is-checked+.el-checkbox__label{
    color:#000;
}
.pSelection .el-checkbox-group label {
    display: block;
}
.pSelection .el-checkbox+.el-checkbox {
    margin-left: 0;
}
.pSelection .el-checkbox-group{
    margin-left: 25px;
}
.pSelection .el-checkbox__inner{
    border: 1px solid #959595;
}
.pSelection .el-dialog__header {
    border-bottom: 1px solid #ccc;
}
.pSelection .el-input__inner{
    border-radius: 22px;
    border:1px solid #0079cf;
}
.pSelection .el-input__suffix{
    color:#0079cf;
    font-size: 23px;
}
.pSelection .el-checkbox__input.is-checked .el-checkbox__inner, .pSelection .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: transparent;
    border-color:#959595;
}
.pSelection .el-checkbox__inner::after{
    /* border:1px solid red; */
    box-sizing: content-box;
    content: "";
    border: 1px solid #000;
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
}
.pSelection .el-checkbox__input.is-indeterminate .el-checkbox__inner::before{
    content: '';
    position: absolute;
    display: block;
    background-color: #fff;
    height: 2px;
    -webkit-transform: scale(.5);
    transform: scale(.5);
    left: 0;
    right: 0;
    top: 5px;
}
.Mselection{
    margin-top: 10px;
}
</style>


