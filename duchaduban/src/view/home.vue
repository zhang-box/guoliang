<template>
  <div class="content-wrapper">
    <h6 class="statistics">数据更新时间：{{editTime}}</h6>
    <div class="list home-card">
      <h3>
        <span class="home-card-tit">督办任务统计</span>
      </h3>
      <div class="home-echarts-box">
        <table class="dcdb-home-tab">
          <tr>
            <td style="width:120px;">累计在办任务数：</td>
            <td><div class="dcdb-home-numbox"><div class="dcdb-home-num">{{allTaskCount}}</div></div></td>
          </tr>
          <tr>
            <td>累计办结任务数：</td>
            <td><div class="dcdb-home-numbox"><div class="dcdb-home-num">{{didTaskCount}}</div></div></td>
          </tr>
          <tr>
            <td>累计逾期任务数：</td>
            <td><div class="dcdb-home-numbox"><div class="dcdb-home-num">{{outTimeCount}}</div></div></td>
          </tr>
          <tr>
            <td>整体办结率：</td>
            <td><span class="handlingRate-span" v-for="handlingRateVal in handlingRate">{{handlingRateVal}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="list home-card max-list">
      <h3 class="more-font">
        <span class="home-card-tit">各类型任务总数及占比</span>
        <el-select v-model="month1" placeholder="月度" @change="yearMonthFun('month',1)">
          <el-option
            v-for="item in monthOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="year1" placeholder="年度" @change="yearMonthFun('year',1)">
          <el-option
            v-for="item in yearOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </h3>
      <div class="home-echarts-box">
        <div id="homeEcharts1" class="home-echarts"></div>
        <ul class="subtext">
          <li v-for="numItem in total">任务总数：<span>{{numItem}}</span>件</li>
        </ul>
      </div>
    </div>
    <div class="list home-card">
      <h3>
        <span class="home-card-tit">办结率排行榜</span>
        <el-select v-model="month2" placeholder="月度" @change="yearMonthFun('month',2)">
          <el-option
            v-for="item in monthOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="year2" placeholder="年度" @change="yearMonthFun('year',2)">
          <el-option
            v-for="item in yearOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </h3>
      <div class="bjl-box">
        <el-scrollbar class="nav-scrollbar">
          <div class="home-echarts-box">
            <table class="dcdb-home-tab progress-tab">
              <tr v-for="bjlVal in bjlData">
                <td style="width:47px;">{{bjlVal.name}}</td>
                <td><div class="progress-box"><div class="progress-bar" :style="'width:'+ bjlVal.value +';'"></div></div></td>
                <td style="width:65px;">{{bjlVal.value}}</td>
              </tr>
            </table>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <div class="list home-card max-list">
      <h3 class="more-font">
        <span class="home-card-tit">司局办理数量</span>
      </h3>
      <div class="home-echarts-box">
        <div id="homeEcharts2" class="home-echarts"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    docCompanyRatios,
    privateLocalityWorkingNum,
    taskTypeRatios,
    taskTypeTotal,
    didTaskRanking
  } from 'api/supervision/home'

  export default {
    data (){
      return {
        year1:"",
        year2:"",
        yearOptions: [{
          value: '2016',
          label: '2016年'
        }, {
          value: '2017',
          label: '2017年'
        }, {
          value: '2018',
          label: '2018年'
        }, {
          value: '2019',
          label: '2019年'
        }, {
          value: '2020',
          label: '2020年'
        }],
        month1:"",
        month2:"",
        monthOptions: [{
          value: '01',
          label: '一月'
        }, {
          value: '02',
          label: '二月'
        }, {
          value: '03',
          label: '三月'
        }, {
          value: '04',
          label: '四月'
        }, {
          value: '05',
          label: '五月'
        },{
          value: '06',
          label: '六月'
        }, {
         value: '07',
         label: '七月'
       }, {
         value: '08',
         label: '八月'
       }, {
         value: '09',
         label: '九月'
       }, {
         value: '10',
         label: '十月'
       },{
         value: '11',
         label: '十一月'
       },{
         value: '12',
         label: '十一月'
       }],
       total:[],
       bjlData:[],
        didTaskCount: null,
        outTimeCount: null,
        allTaskCount: null,
        handlingRate: null,
        editTime: null,
        doingTaskCount:null,
      }
    },
    created(){
      taskTypeTotal().then(res => {
        this.didTaskCount = res.data.didTaskCount
        this.allTaskCount = res.data.allTaskCount
        this.outTimeCount = res.data.outTimeCount
        this.doingTaskCount = res.data.doingTaskCount

        this.handlingRate=this.toDecimal(res.data.didTaskCount/ res.data.allTaskCount)+"%"

        let handlingRateHtml=[]
        for(let handlingRate=0; handlingRate<this.handlingRate.length; handlingRate++){
          handlingRateHtml.push(this.handlingRate.substring(handlingRate,handlingRate+1))
        }

        this.handlingRate=handlingRateHtml
        let fillNum=["","0","00","000","0000","00000"]
        if(JSON.stringify(this.allTaskCount).length < this.handlingRate.length){
          this.allTaskCount=fillNum[this.handlingRate.length-JSON.stringify(this.allTaskCount).length]+this.allTaskCount
        }
        if(JSON.stringify(this.outTimeCount).length < this.handlingRate.length){
          this.outTimeCount=fillNum[this.handlingRate.length-JSON.stringify(this.outTimeCount).length]+this.outTimeCount
        }
        if(JSON.stringify(this.didTaskCount).length < this.handlingRate.length){
          this.didTaskCount=fillNum[this.handlingRate.length-JSON.stringify(this.didTaskCount).length]+this.didTaskCount
        }

        this.editTime = res.data.editTime.split('-').join('.')

        this.year1=this.editTime.substring(0,4)
        this.year2=this.editTime.substring(0,4)

        this.month1=this.editTime.substring(5,7)
        this.month2=this.editTime.substring(5,7)

      })
      didTaskRanking().then(res => {
        this.bjlData=res.data
      })
    },
    mounted(){
      this.homeEcharts1()
      this.homeEcharts2()
    },
    methods: {
      yearMonthFun(d,i){
        if(i===1){
          this.homeEcharts1()
        }else{
          this.homeEcharts2()
        }
      },
      homeEcharts1(){
        let homeEcharts1 = this.$echarts.init(document.getElementById('homeEcharts1'))
        let pieColor = [{"color":["#13ca9e", "#0e89cd"]},{"color":["#d6b539", "#0e89cd"]},{"color":["#8400ff", "#0e89cd"]},{"color":["#3353e6", "#0e89cd"]},{"color":["#cc6fa6", "#0e89cd"]}]
        let data = {
          year: this.year1,
          month: this.month1
        }
        taskTypeRatios(data).then(res => {
					let titData=[]
					let seriesData=[]
          this.total=[]
          for(let i=0; i<res.data.data.length; i++){
            this.total.push(res.data.data[i].value)
						let xVal=10+i*20
						titData.push({
							text: res.data.data[i].name,
							textStyle:{
								color: '#31d6ff',
								fontSize:16
							},
							top:40,
							x: xVal+'%',
							textAlign: 'center'
						})
						seriesData.push({
							name:res.data.data[i].name,
							type:'pie',
							radius: ['28%', '44%'],
							center : [xVal+'%', '60%'],
							avoidLabelOverlap: false,
							hoverAnimation:false,
							label: {
									normal: {
											show: false,
											position: 'center',
											textStyle: {
													fontSize: 16,
													fontWeight: 'bold'
											},
											formatter:'{d}%'
									}
							},
							itemStyle: {
								borderColor: 'rgba(255, 255, 255, 0.2)',
								shadowColor: 'rgba(255, 255, 255, 0.5)',
								shadowBlur: 10
							},
							color: pieColor[i].color,
							data: [
									{
										value: res.data.data[i].value,
										name:res.data.data[i].name,
										label:{
												normal:{
														show:true,
														color:'#31d6ff'
												}
										}
									},
									{
										value: res.data.total-res.data.data[i].value,
										name:res.data.data[i].name+ '比例'
									}
							]
						})
          }
          let option = {
              title: titData,
              tooltip: {
                  trigger: 'item',
                  formatter: "{d}%"
              },
              series: seriesData
          };
          homeEcharts1.setOption(option,true)
        })
      },
      homeEcharts2(){
        let homeEcharts2 = this.$echarts.init(document.getElementById('homeEcharts2'))
        let data = {
          year: this.year2,
          month: this.month2
        }
        didTaskRanking(data).then(res => {
          this.bjlData=res.data
        })
        privateLocalityWorkingNum(data).then(res => {
          let option = {
							tooltip : {
                  trigger: 'axis',
                  axisPointer : {
                      type : 'shadow'
                  }
              },
              legend: {
                  x: 'center',
                  top:15,
                  data:res.data.xAxisName,
                  textStyle: {
                    color: '#31d6ff'
                  }
              },
              grid: {
                  left: '2%',
                  right: '2%',
                  bottom: '3%',
                  containLabel: true
              },
              xAxis: [
                  {
                      type: 'category',
                      data: res.data.xAxis[0].data,
                      axisPointer: {
                          type: 'shadow'
                      },
                      axisLabel: {
                        rotate:40,
                        textStyle: {
                          color: '#31d6ff'
                        }
                      },
                      axisLine: {
                        lineStyle: {
                          color: '#31d6ff'
                        }
                      }
                  }
              ],
              yAxis: [
                  {
                      type: 'value',
                      interval: 5,
                      axisLabel: {
                          formatter: '{value}',
                          textStyle: {
                            color: '#31d6ff'
                          }
                      },
                      axisLine: {
                        lineStyle: {
                          color: '#31d6ff'
                        }
                      },
                      splitLine: {
                        lineStyle: {
                          color: '#31d6ff'
                        }
                      }
                  }
              ],
              series: [
                  {
                      name:res.data.series[0].name,
                      type:'bar',
                      itemStyle: {
                          normal: {
                              color: new this.$echarts.graphic.LinearGradient(
                                  0, 0, 0, 1,
                                  [
                                      {offset: 0, color: '#42fda6'},
                                      {offset: 0.5, color: '#1ec070'},
                                      {offset: 1, color: '#0ba055'}
                                  ]
                              )
                          }
                      },
                      data:res.data.series[0].data
                  },
                  {
                      name:res.data.series[1].name,
                      type:'bar',
                      itemStyle: {
                          normal: {
                              color: new this.$echarts.graphic.LinearGradient(
                                  0, 0, 0, 1,
                                  [
                                      {offset: 0, color: '#698cff'},
                                      {offset: 0.5, color: '#2c5adc'},
                                      {offset: 1, color: '#0237c5'}
                                  ]
                              )
                          }
                      },
                      data:res.data.series[1].data
                  },
                  {
                      name:res.data.series[2].name,
                      type:'bar',
                      itemStyle: {
                          normal: {
                              color: new this.$echarts.graphic.LinearGradient(
                                  0, 0, 0, 1,
                                  [
                                      {offset: 0, color: '#fff39c'},
                                      {offset: 0.5, color: '#ffe350'},
                                      {offset: 1, color: '#ffd40b'}
                                  ]
                              )
                          }
                      },
                      data:res.data.series[2].data
                  }
              ]
          };
          homeEcharts2.setOption(option,true)
        })
      },

      toDecimal(x) {
        let f = parseFloat(x);
        if (isNaN(f)) {
          return;
        };
        if ( f==1 ){
          return (100).toFixed(2);
        }else{
          return f = Math.round(x * 100);
        }

        // f=(Math.round(x  * 100)/ 100).toFixed(2);
        // return f;
      }
    }
  }
</script>
<style scoped>
.content-wrapper{
  background: -webkit-linear-gradient(90deg, #0d1e3b, #06447a, #02579a, #025fa6, #055391); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(90deg, #0d1e3b, #06447a, #02579a, #025fa6, #055391); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(90deg, #0d1e3b, #06447a, #02579a, #025fa6, #055391); /* Firefox 3.6 - 15 */
  background: linear-gradient(90deg, #0d1e3b, #06447a, #02579a, #025fa6, #055391); /* 标准的语法（必须放在最后） */
  color:#31d6ff;
}
.home-card{ background:url(../assets/img/home-chard-bg.png) 0 0 repeat; height:350px; margin-bottom:20px; vertical-align:top; display:inline-block; *display:inline; *zoom:1; width:30%; margin-left:0.8%;}
.home-card.max-list{ width:66%}
.home-card h3{ background:url(../assets/img/h-bg.png) 0 0 no-repeat; width:100%; height:25px; font-size:16px; font-weight:normal; text-align:left; margin:0px 0px 10px;}
.home-card h3.more-font{ background:url(../assets/img/h-bg2.png) 0 0 no-repeat;}
.home-card-tit{ margin:0px 0px 0px 10px; position:relative; top:6px;}

.bjl-box{ margin:0px 10px; height:300px;}
.bjl-box .home-echarts-box{ margin:0;}
.home-echarts-box{ margin:0px 10px; float:left; width:100%;}
.statistics{ text-align:right; padding-right:10px; color:#31d6ff; font-size:13px; margin:10px 0px 5px; font-weight:normal;}


.home-echarts{ width:320px; height:320px; position:relative;}
#homeEcharts1{ width:710px; height:250px; margin:auto;}
#homeEcharts2{ width:710px;}

.dcdb-home-tab{ font-size:14px; color:#31d6ff; margin:50px 0px 0px 0px; width:100%;}
.dcdb-home-tab td{ padding:4px 0px;letter-spacing:1px;}
.dcdb-home-numbox{ background:url(../assets/img/num-bg.png) 0 0 repeat-x; height:32px; float:left;}
.dcdb-home-num{ font-size:25px; color:#50f4ee; letter-spacing:11px; position:relative; left:5px;}

.handlingRate-span{ background:url(../assets/img/num-bg.png) 0 0 no-repeat; width:26px; height:32px; line-height:32px; float:left; text-align:center; font-size:25px; color:#50f4ee;}
.subtext{ padding:0px; margin:0px; width:710px; margin:auto}
.subtext li{ color:#31d6ff; font-size:16px; list-style: none; float: left; width: 20%; text-align: center;}
.subtext li span{ font-size:20px;}

.progress-tab{ margin-top:0px;}
.progress-tab td{ padding:0px 5px; height:40px;}
.progress-box{ background:rgba(255,255,255,0.2); height:14px; width:100%; border-radius:8px;}
.progress-bar{
    background: -webkit-linear-gradient(left, #0b427b , #00ecfb); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #0b427b , #00ecfb); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #0b427b , #00ecfb); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #0b427b , #00ecfb); /* 标准的语法 */
    border:1px solid #00f2ff;
    height:12px;
    border-radius:8px;
}

</style>
<style>
.home-card .el-select{ width:62px; background:url(../assets/img/select-bg.png) 0 0 no-repeat; width:62px; height:18px; float: right; margin:3px 10px 0 0;}
.home-card .el-input__suffix{ display:none;}
.home-card .el-input--suffix .el-input__inner{ background:none; color:#31d6ff; font-size:11px; height:18px; line-height:0px; vertical-align:middle; border:0px none; padding:0px 0px 5px 5px;}

</style>

