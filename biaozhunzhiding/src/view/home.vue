<template>
  <div class="content-wrapper">
    <div class="main-wrapper clearFix">
      <div class="time-box">数据更新时间:{{editTime}}</div>
      <div class="main-left left">
        <div class="left-top">
          <div class="left-bzzs">
            <span>{{standardSum.name}} :</span>
            <span>{{standardSum.value}}</span>
          </div>
        </div>

        <div class="home-card " style="margin-bottom: 20px">
          <h3>
            <span class="home-card-tit card-tit-small">年度标准发布数 : {{countRelease}}</span>
          </h3>
          <div id="drawPieRelease"></div>
        </div>

        <div class="home-card">
          <h3>
            <span class="home-card-tit card-tit-small">专家人员数量统计</span>
            <el-radio-group class="home-card-radio" v-model="expertType" @change="change">
              <el-radio label="SC">SC</el-radio>
              <el-radio label="TC">TC</el-radio>
            </el-radio-group>
          </h3>
          <div class="expert-wrapperPie" v-show="!showExpert" >
            <img src="@/assets/img/home/fh.png" alt="" @click="showExpert = true">
            <div id="drawPieExpert"> </div>
          </div>
          <ul class="expert-wrapper clearFix" v-show="showExpert">
            <li class="expert-li left" v-for="item in expertList" @click="showInfo(item)">
              <img src="@/assets/img/home/expert.png" alt="">
              <span>{{item.value}}人</span>
              <div class="expert-name">
                {{item.name}}
              </div>
            </li>
          </ul>

        </div>

      </div>

      <!--start center-->

      <div class="main-center left">
        <div class="content-top">
          <div class="content-zybz">
            <span>{{standardIng.name}} :</span>
            <span style="color: #27FEBE">{{standardIng.value}}</span>
          </div>
        </div>

        <div class="home-card " style="margin-bottom: 20px">
          <h3><span class="home-card-tit card-tit-small">在研标准各阶段数量占比</span></h3>
          <ul class="number-stages">
            <li class="number-stages-li" v-for="(item,index) in listData" :key="index">
              <div class="stages-name">{{item.name}}</div>
              <div class="stages-num">
                <div class="progress-bar" :style="'width:'+ toDecimal(item.value / count)+'%;'" ></div>
                <span>{{item.value}}</span>
              </div>
              <div class="stages-percentage"> {{toDecimal(item.value / count)}}%</div>
            </li>
          </ul>

        </div>
        <div class="home-card ">
          <h3><span class="home-card-tit card-tit-small">标准类型占比</span></h3>
          <div id="drawPieType"></div>
        </div>

      </div>

      <!--end center-->

      <div class="main-right left">
        <div class="right-top">
          <div class="right-xxbz">
            <span>{{standardNow.name}} :</span>
            <span style="color: #FFF837">{{standardNow.value}}</span>
          </div>
        </div>
        <div class="home-card" style="margin-bottom: 20px">
          <h3><span class="home-card-tit card-tit-small">标准动态</span></h3>
          <vueSeamless :data="topData" :class-option="classOption" style="overflow: hidden;height: 227px">
            <ul class="article-list">
              <li v-for="(item,index) in topData" :key="index">
                <span >{{item.data}}</span>
              </li>
            </ul>
          </vueSeamless>
        </div>
        <div class="home-card" style="margin-bottom: 20px">
          <h3><span class="home-card-tit card-tit-small">通用标准子类占比</span></h3>
          <div id="drawPieChildType"></div>
        </div>

      </div>

    </div>

  </div>
</template>
<script>
  import {
    queryCount,
    updateTime,
    queryDwfz,
    queryDw,
    queryClassfy,
    queryAllDate,
    ExpertCount
  } from 'api/standardAppliList/home'
  import vueSeamless from 'vue-seamless-scroll'

  export default {
    data (){
      return {
        editTime: null,
        standardSum: {}, //标准总数
        standardIng: {}, //在研标准数
        standardNow: {}, //现行标准数
        prepareMemberTotal: 0,
        positiveMemberTotal: 0,
        memberTotal: 0,
        radioMechanism: 0,
        count: 0,
        countRelease: 0,
        expertType:'SC',
        topData: [
          {
              data:'粮油检验 粮食感官检验辅助图谱 第2部分：玉米'
          },
          {
            data:'粮油检验 粮食感官检验辅助图谱 第3部分：稻谷'
          },
          {
            data:'粮油机械 检验用粮食选筛'
          },
          {
            data:'粮食批发市场统一竞价交易管理规范'
          },
          {
            data:'粮油检验 粮食籽粒水分活度的测定 仪器法'
          },
          {
            data:'粮油检验 粮食及制品中粗蛋白测定 杜马斯燃烧法'
          },
          {
            data:'	粮食干燥系统安全操作规范'
          },
          {
            data:'横流粮食干燥机单位耗热量与处理量折算规则'
          },
          {
            data:'	粮油储藏 粮食烘干安全操作规程'
          },
        ],
        showExpert:true,
        listData:[],
        expertList:[],
      }
    },
    created(){
        /*头部数据*/
      queryCount().then(res => {
        this.standardSum = res.data[2]
        this.standardIng = res.data[1]
        this.standardNow = res.data[0]
      })
/*时间*/
      updateTime().then(res => {
        this.editTime = res.data
      })
      /*各阶段占比*/
      queryAllDate().then(res => {
          this.listData = res.data.name
          this.count = res.data.count
      })
      /*专家*/
      let data = {
        "name" : 'SC'
      }
      ExpertCount(data).then(res => {
        this.expertList = res.data[1].personCount

      })
    },
    mounted(){

      this.drawPieRelease()
      this.drawPieType()
      this.drawPieExpert('SC')
      this.drawPieChildType('标准类型')

    },
    computed: {
      classOption: function () {
        return {
          step: 0.5,
          limitMoveNum: this.topData.length
        }
      }
    },
    methods: {
      /*年度标准发布*/
      drawPieRelease(){
        queryDwfz().then(response => {
            this.countRelease = response.data.count
          let drawPieRelease = this.$echarts.init(document.getElementById('drawPieRelease'))
          let option = {
            title: {
              x: 'center',
              left: 10,
              textStyle: {
                fontSize: 15,
                color: '#26A8CC'
              },
            },
            tooltip: {
              trigger: 'item',
//              formatter: "{a} <br/>{b} : {c} ({d}%)"
              formatter: " {b}<br/>  {c}  ({d}%)"

            },
            series: [
              {
                type: 'pie',
                radius: ['15%', '60%'],
                center: ['50%', '65%'],
                label: {
                  color: '#26A8CC'
                },
                labelLine: {
                  lineStyle: {
                    color: '#26A8CC'
                  },

                },
                data: response.data.list,
                itemStyle: {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  shadowColor: 'rgba(255, 255, 255, 0.5)',
                  shadowBlur: 10

                },
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
              color: [  '#1CBFEA','#036BE9', '#3845E5','#DD451E', '#4160E8','#6A5DF3','#2ACFB0', '#40BED6']
              }
            ]
          };

          drawPieRelease.setOption(option)
        })
      },
      /*标准类型占比*/
      drawPieType(){
        queryClassfy().then(response => {

          let drawPieType = this.$echarts.init(document.getElementById('drawPieType'))
          let option = {
            title: {
              x: 'center',
              left: 10,
              textStyle: {
                fontSize: 15,
                color: '#26A8CC'
              },
            },
            tooltip: {
              trigger: 'item',
//              formatter: "{a} <br/>{b} : {c} ({d}%)"
              formatter: " {b}<br/>  {c} ({d}%)"

            },
            legend: {
              show: true,
              data: response.map.names,
              bottom:20,
              textStyle: {
                color: '#26A8CC'
              },
            },
            series: [
              {
                type: 'pie',
                radius: ['15%', '60%'],
                center: ['50%', '40%'],
                label: {
                  color: '#26A8CC'
                },
                labelLine: {
                  lineStyle: {
                    color: '#26A8CC'
                  },

                },
                data: response.map.list,
                itemStyle: {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  shadowColor: 'rgba(255, 255, 255, 0.5)',
                  shadowBlur: 10

                },
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                color: [  '#2ACFB0','#036BE9', '#3845E5', '#4160E8','#6A5DF3','#2ACFB0', '#40BED6']
              }
            ]
          };

          drawPieType.setOption(option)
          drawPieType.on('click', function (param) {
            this.drawPieChildType(param.name)
          }.bind(this))
        })
      },
      drawPieChildType(name){
          let data = {
              "id":name
          }
        queryDw(data).then(response => {

          let drawPieChildType = this.$echarts.init(document.getElementById('drawPieChildType'))
          let option = {
            title: {
              x: 'center',
              left: 10,
              textStyle: {
                fontSize: 15,
                color: '#26A8CC'
              },
            },
            tooltip: {
              trigger: 'item',
//              formatter: "{a} <br/>{b} : {c} ({d}%)"
              formatter: " {b}<br/>  {c} ({d}%)"

            },
            legend: {
              show: true,
              data: response.data.names,
              bottom:10,
              textStyle: {
                color: '#26A8CC'
              },
            },
            series: [
              {
                type: 'pie',
                radius: ['15%', '60%'],
                center: ['50%', '40%'],
                label: {
                  color: '#26A8CC'
                },
                labelLine: {
                  lineStyle: {
                    color: '#26A8CC'
                  },

                },
                data: response.data.list,
                itemStyle: {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  shadowColor: 'rgba(255, 255, 255, 0.5)',
                  shadowBlur: 10

                },
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                color: ['#D6BF1E', '#2ACFB0', '#2A9CEB', '#036BE9',  '#40BED6','#3845E5', '#4160E8','#6A5DF3']
              }
            ]
          };

          drawPieChildType.setOption(option)
        })
      },
      drawPieExpert(name){
          let data = {
              "name":this.expertType,
              "educationName":name
          }
        ExpertCount(data).then(response => {

          let drawPieExpert = this.$echarts.init(document.getElementById('drawPieExpert'))
          let option = {
            title: {
              x: 'center',
              left: 10,
              textStyle: {
                fontSize: 15,
                color: '#26A8CC'
              },
            },
            tooltip: {
              trigger: 'item',
//              formatter: "{a} <br/>{b} : {c} ({d}%)"
              formatter: " {b}<br/>  {c} ({d}%)"

            },
            legend: {
              show: true,
              data: response.data[0].names,
              bottom:20,
              textStyle: {
                color: '#26A8CC'
              },
            },
            series: [
              {
                type: 'pie',
                radius: ['15%', '60%'],
                center: ['50%', '40%'],
                label: {
                  color: '#26A8CC'
                },
                labelLine: {
                  lineStyle: {
                    color: '#26A8CC'
                  },

                },
                data: response.data[1].educationCount,
                itemStyle: {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  shadowColor: 'rgba(255, 255, 255, 0.5)',
                  shadowBlur: 10

                },
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                color: ['#D6BF1E', '#2ACFB0', '#e8901f', '#0468E8', '#8f52ea', '#1fe8c4', '#83ade2']
              }
            ]
          };

          drawPieExpert.setOption(option)
        })
      },
      showInfo(data){
          this.drawPieExpert(data.name)
        this.showExpert = false

      },
      toDecimal(x) {
        let f = parseFloat(x);
        if (isNaN(f)) {
          return;
        }
        ;
        if (f == 1) {
          return (100).toFixed(2);
        } else {
          return f = Math.round(x * 100);
        }

        // f=(Math.round(x  * 100)/ 100).toFixed(2);
        // return f;
      },
      change(value){
          let data = {
              "name" : value
          }
        ExpertCount(data).then(res => {
            this.expertList = res.data[1].personCount
            this.showExpert = true
        })
      },

    },
    components: {
      vueSeamless
    }
  }
</script>
<style scoped>

  .content-wrapper {
    background: -webkit-linear-gradient(90deg, #0d1e3b, #06447a, #02579a, #025fa6, #055391); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(90deg, #0d1e3b, #06447a, #02579a, #025fa6, #055391); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(90deg, #0d1e3b, #06447a, #02579a, #025fa6, #055391); /* Firefox 3.6 - 15 */
    background: linear-gradient(90deg, #0d1e3b, #06447a, #02579a, #025fa6, #055391); /* 标准的语法（必须放在最后） */
    color: #31d6ff;
  }

  .main-wrapper {
    width: 100%;
    padding: 10px 10px 0 0;
  }

  #drawPieRelease {
    width: 100%;
    height: 250px;
  }

  #drawPieType {
    width: 100%;
    height: 250px;
  }
  #drawPieChildType {
    width: 100%;
    height: 250px;
  }
  #drawPieExpert {
    width: 300px;
    height:250px;
  }

  .main-left {
    width: 30%;
    padding-left: 10px;
    /*display: inline-block;*/

  }

  .left-top, .content-top, .right-top {
    height: 90px;
  }

  .left-bzzs {
    background: url(../assets/img/home/icon-bz.png) 0 0 no-repeat;
    width: 200px;
    text-align: center;
    margin: 0 auto;
    height: 90px;
    padding-top: 15px;
  }

  .left-bzzs span {
    display: block;
    color: #30D4FD;
    margin: 0 0 10px 30px;
    font-size: 14px;
    font-weight: bold;
  }

  .content-zybz {
    background: url(../assets/img/home/icon-zy.png) 0 0 no-repeat;
    width: 200px;
    text-align: center;
    margin: 0 auto;
    height: 90px;
    padding-top: 15px;
  }

  .content-zybz span {
    display: block;
    color: #30D4FD;
    margin: 0 0 10px 55px;
    font-size: 14px;
    font-weight: bold;
  }

  .right-xxbz {
    background: url(../assets/img/home/icon-xxbz.png) 0 0 no-repeat;
    width: 200px;
    text-align: center;
    margin: 0 auto;
    height: 90px;
    padding-top: 15px;
  }

  .right-xxbz span {
    display: block;
    color: #30D4FD;
    margin: 0 0 10px 55px;
    font-size: 14px;
    font-weight: bold;
  }

  .expert-wrapperPie {
    width: 100%;
  }
  .expert-wrapperPie img {
    position: relative;
    top:0;
    left:270px;
    cursor: pointer;
    width: 17px;
  }
  .expert-wrapper {
    list-style: none;
    vertical-align: middle;
    margin-top: 30px;
    padding: 0;
  }
  .expert-li {
    width: 140px;
    margin: 10px ;
    cursor: pointer;
  }
  .expert-li .expert-name {
    margin-left: 30px;
  }

  .main-center {
    margin: 0 5px;
    width: 38%;
    text-align: center;

    position: relative;

  }

  .number-stages {
    list-style: none;
    margin-top: 15px;
    padding: 0;
    text-align: left;
  }

  .number-stages-li {
    margin: 20px 0;
    color: #fff;
    height: 20px;
  }

  .number-stages-li div {
    display: inline-block;
  }

  .stages-name {
    width: 105px;
    text-align: center;
  }

  .stages-num {
    width: 236px;
    height: 19px;
    margin-left: 10px;
    background: url(../assets/img/home/zt.png) 0 0 no-repeat;
  }

  .progress-bar {
    background: url(../assets/img/home/bar.png) 0 0 repeat-x;
    height: 15px;
    position: relative;
    top: 2px;
    left: 1px;
    text-align: right;
  }

  .stages-percentage {
    margin-left: 10px;
  }

  .main-right {
    width: 30%;

  }


  .article-list {
    list-style: none;
    color: #31d6ff;
    padding: 0;
  }

  .article-list li {
    margin: 5px 10px;
    font-size: 14px;
    padding:7px 20px ;
  }

  .home-card {
    background: url(../assets/img/home/home-chard-bg.png) 0 0 repeat;
    height: 300px;
  }
  .li-card {
    background: url(../assets/img/home/home-chard-bg.png) 0 0 repeat;
  }

  h3 {
    background: url(../assets/img/home/h-bg.png) 0 0 no-repeat;
    width: 100%;
    height: 25px;
    font-size: 16px;
    font-weight: normal;
    text-align: left;
    margin: 0px 0px 10px;
    position: relative;

  }

  .home-card-tit {
    margin: 0px 0px 0px 10px;
    position: absolute;
    top: 6px;
  }

  .home-card-radio {
    margin: 0px 0px 0px 10px;
    position: absolute;
    top: 7px;
    right: 7px
  }

  .home-card-radio /deep/ .el-radio {
    color: #31d6ff;
    margin-left: 10px
  }

  .card-tit-small {
    font-size: 14px;
  }

  .time-box {
    padding-right: 20px;
    text-align: right;
    color: #26A8CC;
  }


</style>
