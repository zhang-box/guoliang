<template>
  <div class="main">
    <div class="mainbox fl">
      <div class="tableHeader">
        <em class="tab-title fl dbsx"><span class="iconfont icon-daibanshixiang"></span>待办事项</em>
        <i class="more fr" @click="handleClick()">更多>></i>
      </div>
      <el-table :data="tableData" style="width:100%;height:100%" :header-cell-class-name="headerBb">
        <el-table-column prop="msg" align="left" min-width="80%"></el-table-column>
        <el-table-column prop="date" align="right" min-width="20%" class-name="fontColor"></el-table-column>
      </el-table>
    </div>
    <div class="mainbox fr">
      <div class="tableHeader">
        <em class="tab-title fl dbsx"><span class="iconfont icon-tongzhi"></span>通知公告</em>
        <i class="more fr" @click="handleClick()">更多>></i>
      </div>
      <el-table :data="tableData" style="width:100%;height:100%" :header-cell-class-name="headerBb">
        <el-table-column prop="msg" align="left" min-width="80%"></el-table-column>
        <el-table-column prop="date" align="right" min-width="20%" class-name="fontColor"></el-table-column>
      </el-table>
    </div>
    <div class="mainbox fl mt10">
      <div class="tableHeader-b">
        <em class="tab-title fl spqk"><span class="iconfont icon-shenpi"></span>局内督察督办统计</em>
        <i class="more fr" @click="handleClick()">更多>></i>
      </div>
      <el-table :data="spqk" style="width:100%;margin-top:10px;" :header-cell-class-name="headerBgc">
        <el-table-column prop="thing" align="center" label="事件"></el-table-column>
        <el-table-column prop="thisMonth" align="center" label="当月办理/件"></el-table-column>
        <el-table-column prop="thisYear" align="center" label="当年办理/件" class-name="fontColor"></el-table-column>
      </el-table>
    </div>
    <div class="mainbox fr mt10">
      <div class="tableHeader-b">
        <em class="tab-title fl spqk"><span class="iconfont icon-jiesuanshenpi"></span>督办类型统计</em>
        <i class="more fr" @click="more()">更多>></i>
      </div>
      <div style="width:500px; height:400px; background: #cff;"></div>
    </div>
  </div>
</template>
<script>
  import jquery from '../../public-js/jquery-1.11.3.min.js'
  export default {
    methods: {
      handleClick(){
        console.log('更多');
      },
      //  rowStyle({ row, rowIndex}) {
      //      console.log(row, rowIndex);
      //     return 'border-bottom: 1px dashed #ccc;'
      //  },
      headerBgc({ row, rowIndex }) {
        return "headerBgc";
      },
      headerBb({ row, rowIndex }) {
        return "headerBb";
      }
    },
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          msg: '编审核管理（车管处处长）号20171212事件任务下达',
        },
          {
            date: '2016-05-02',
            msg: '编审核管理（车管处处长）号20171212事件任务下达'
          },
          {
            date: '2016-05-02',
            msg: '编审核管理（车管处处长）号20171212事件任务下达'
          },
          {
            date: '2016-05-02',
            msg: '编审核管理（车管处处长）号20171212事件任务下达'
          },
          {
            date: '2016-05-02',
            msg: '编审核管理（车管处处长）号20171212事件任务下达'
          }],
        spqk: [
          {
            thing:'督办事件',
            thisMonth:'51',
            thisYear:'402'
          },
          {
            thing:'办结事件',
            thisMonth:'51',
            thisYear:'1510'
          },
          {
            thing:'逾期办理',
            thisMonth:'51',
            thisYear:'1510'
          },
          {
            thing:'无法办结',
            thisMonth:'51',
            thisYear:'1510'
          },
          {
            thing:'督办进度上报',
            thisMonth:'51',
            thisYear:'1510'
          }
        ],
        expenses: [{
          bm:'规划财务司',
          sy:'10',
          spsj:'5'
        },
          {
            bm:'规划财务司',
            sy:'5.7',
            spsj:'3'
          },
          {
            bm:'规划财务司',
            sy:'5.7',
            spsj:'5'
          },
          {
            bm:'规划财务司',
            sy:'10',
            spsj:'6'
          }]
      }
    }
  }
</script>
<style>
  body{
    background-color: #eee;
  }
  .main .el-table td, .main .el-table th.is-leaf{
    border-bottom: 1px dashed #ccc;
  }
  .main .el-table .headerBgc{
    background-color:#3582cd;
    color:white;
    border-bottom: 1px solid #ccc !important;
  }
  .main .el-table .headerBb{
    border-bottom: 1px solid #ccc !important;
  }
  .fontColor{
    color:#747474;
  }
  .main{
    width:100%;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  .mt10{
    margin-top: 10px;
  }
  /* .fs23{
      font-size: 0.23rem;
      padding-right: 5px;
      color:#16508d;
      line-height: 40px;
  } */
  .mainbox{
    width: 49.6%;
    position: relative;
    padding: 0 5px;
    background-color: #fff;
    box-sizing: border-box;
  }
  .tableHeader{
    position: absolute;
    top:0;
    left:0;
    z-index: 999;
    width: 100%;
    line-height: 40px;
  }

  .tableHeader em{
    font-style: normal;
    font-size: 15px;
  }
  .tableHeader em{
    line-height: 40px;
    padding-left: 8px;
    color: #333;
  }
  .tableHeader em span{
    color:#16508d;
    margin-right: 5px;
    font-weight: 700;
  }
  .more{
    cursor: pointer;
    color:#747474;
  }
  .tableHeader i{
    font-style: normal;
    line-height: 40px;
    padding-right: 11px;
    font-size: 15px;
    color: #666;
  }
  .tableHeader-b{
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e7eaec;
  }
  .tableHeader-b em{
    font-style: normal;
    font-size: 15px;
  }
  .tableHeader-b em{
    line-height: 40px;
    padding-left: 2px;
    color: #333;
  }
  .tableHeader-b em span{
    color:#16508d;
    margin-right: 5px;
  }

  .tableHeader-b i{
    font-style: normal;
    line-height: 40px;
    padding-right: 11px;
    font-size: 15px;
    color: #666;
  }
  .el-table{
    color: #333 !important;
  }
</style>

