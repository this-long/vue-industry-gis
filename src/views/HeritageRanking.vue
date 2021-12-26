<template>
  <!-- 遗产排行榜 -->
  <div class="heritage-ranking">
    <div class="heritage-ranking-top">
      <MainTop>遗产数据 <span class="gang"> / </span> 数据可视化</MainTop>
    </div>
    <div class="heritage-ranking-bottom padding15">
      <el-button-group>
        <el-button @click="changeType('one')" icon="el-icon-data-analysis"
          >各年限遗产数量分布榜</el-button
        >
        <el-button @click="changeType('four')" icon="el-icon-s-data"
          >工业遗产旅游热度排行榜</el-button
        >
        <el-button @click="changeType('three')" icon="el-icon-notebook-1"
          >遗产详细分类汇总</el-button
        >
        <el-button @click="changeType('two')" icon="el-icon-pie-chart"
          >工业遗产各分类占比</el-button
        >
        <el-button
          @click="changeType('help')"
          icon="el-icon-thumb
"
          >查看帮助</el-button
        >
      </el-button-group>
      <br />
      <br />

      <el-card shadow="hover">
        <div class="loading" v-show="!dataisok">
          <img
            src="
https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/83aff900-03ef-4380-86c1-d452e085589f.gif"
            alt=""
          />
        </div>
        <!-- 建议使用v-show来代替 v-if，否者容易出现不可预见的错误 -->
        <div v-show="rankType === 'one' && dataisok" id="main1"></div>
        <div v-show="rankType === 'two' && dataisok" class="maintwo"></div>
        <div v-show="rankType === 'three' && dataisok" id="mainthree"></div>
        <div v-show="rankType === 'four' && dataisok" id="mainfour"></div>

        <div v-if="rankType === 'help' && dataisok">
          可视化图表操作简介：
          <br />
          <br />
          <span
            >1、在拥有图例的图表点击对应图例可以将该图例所指示的数据暂时隐藏</span
          >
          <el-divider></el-divider>
          <span>2、讲鼠标移动到对应数据上可以查看数据详情</span>
          <el-divider></el-divider>
          <span>3、在图表右上方的操作栏可以查看图表的数据视图</span
          ><el-divider></el-divider>
          <span>4、在图表右上方的操作栏可以将图表导出为图片</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
import { BarChart, PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,

  BarChart,
  PieChart,
  CanvasRenderer, // 渲染器的注册应当写到后面，数组是有顺序的。
]);
import MainTop from "../components/MainTop.vue";
export default {
  components: {
    MainTop,
  },

  data() {
    return {
      mainData: [], //所有遗产数据
      rankType: "one", //当前所展示的图表
      option: null,
      myChart: null,
      hertige1949: [0, 0, 0],
      hertige2000: [0, 0, 0],
      hertige2000later: [0, 0, 0], //图一绘图数据
      dataisok: false,
      heritageType: [], //图4绘图数据
      allType: [],
    };
  },

  created() {
    this.getDatas();
  },

  methods: {
    async getDatas() {
      var res1 = await this.$axios.get(
        "/getHeritageMainData/getHeritageMainData"
      );
      this.mainData.push(...res1.data.data);

      var res2 = await this.$axios.get("/getHeritageMuseum/getHeritageMuseum");
      this.mainData.push(...res2.data.data);

      var res3 = await this.$axios.get(
        "/getHeritageTourism/getHeritageTourism"
      );
      this.mainData.push(...res3.data.data);

      // 处理图1数据start

      for (let i = 0; i < this.mainData.length; i++) {
        if (this.mainData[i].addType === "工业遗产") {
          if (this.mainData[i].start < 1949) {
            this.hertige1949[0] = this.hertige1949[0] + 1;
          } else if (
            this.mainData[i].start >= 1949 &&
            this.mainData[i].start < 2000
          ) {
            this.hertige2000[0] = this.hertige2000[0] + 1;
          } else {
            this.hertige2000later[0] = this.hertige2000later[0] + 1;
          }
        } else if (this.mainData[i].addType === "遗产博物馆") {
          if (this.mainData[i].start < 1949) {
            this.hertige1949[1] = this.hertige1949[1] + 1;
          } else if (
            this.mainData[i].start >= 1949 &&
            this.mainData[i].start < 2000
          ) {
            this.hertige2000[1] = this.hertige2000[1] + 1;
          } else {
            this.hertige2000later[1] = this.hertige2000later[1] + 1;
          }
        } else if (this.mainData[i].addType === "工业旅游区") {
          if (this.mainData[i].start < 1949) {
            this.hertige1949[2] = this.hertige1949[2] + 1;
          } else if (
            this.mainData[i].start >= 1949 &&
            this.mainData[i].start < 2000
          ) {
            this.hertige2000[2] = this.hertige2000[2] + 1;
            // console.log(this.mainData[i]);
          } else {
            this.hertige2000later[2] = this.hertige2000later[2] + 1;
          }
        }
      }
      this.dataisok = true;
      // 处理图1数据end
      // 处理图4数据start
      this.heritageType[0] = {
        value:
          this.hertige1949[0] + this.hertige2000[0] + this.hertige2000later[0],
        name: "工业遗产遗址",
      };
      this.heritageType[1] = {
        value:
          this.hertige1949[1] + this.hertige2000[1] + this.hertige2000later[1],
        name: "遗产博物馆",
      };
      this.heritageType[2] = {
        value:
          this.hertige1949[2] + this.hertige2000[2] + this.hertige2000later[2],
        name: "工业旅游区",
      };
      // 处理图4数据end
      // var year1Data = res1.data.data.sort((a, b) => a.start - b.start);
      // // console.log("year1", year1Data);
      //处理图3start

      //处理图3end

      // console.log(
      //   "1",
      //   this.hertige1949,
      //   "2",
      //   this.hertige2000,
      //   "3",
      //   this.hertige2000later
      // );

      this.mainData.forEach((ele) => {
        // console.log(ele);
        var index = this.allType.findIndex((che) => che.name === ele.type);
        if (index === -1) {
          this.allType.push({
            value: 1,
            name: ele.type,
          });
        } else {
          this.allType[index].value = this.allType[index].value + 1;
        }
        // console.log("all type", this.allType);
      });

      this.allType.sort((a, b) => b.value - a.value);
    },
    // 切换当前状态
    changeType(type) {
      this.rankType = type;
      // console.log(this.rankType);

      setTimeout(() => {
        if (type === "one") {
          this.drawOne();
        }
        if (type === "two") {
          this.drawTwo();
        }
        if (type === "three") {
          this.drawThree();
        }
        if (type === "four") {
          this.drawFour();
        }
      }, 0);
    },

    drawOne() {
      var chartDom = document.getElementById("main1");
      var myChart = echarts.init(chartDom);
      var option;
      // console.log(this.hertige1949);

      option = {
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        title: {
          text: "各年限遗产数量分布榜",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: "category",
          data: ["工业遗产", "遗产博物馆", "工业旅游区"],
        },
        series: [
          {
            name: "1949前",
            type: "bar",
            data: this.hertige1949,
          },
          {
            name: "1949~2000",
            type: "bar",
            data: this.hertige2000,
          },
          {
            name: "2000后",
            type: "bar",
            data: this.hertige2000later,
          },
        ],
      };

      option && myChart.setOption(option);
    },

    drawTwo() {
      var chartDom = document.querySelector(".maintwo");
      var myChart = echarts.init(chartDom);

      var option = {
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        title: {
          text: "各类工业遗产分类占比",
          subtext: "整体分类",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "该分类总数量",
            type: "pie",
            radius: "50%",
            data: this.heritageType,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
    drawThree() {
      var chartDom = document.getElementById("mainthree");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "工业遗产详细分类数据汇总",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "该类型遗产数目",
            type: "pie",
            radius: [50, 250],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            label: {
              show: false,
            },

            data: this.allType,
          },
        ],
      };

      option && myChart.setOption(option);
    },

    drawFour() {
      var chartDom = document.getElementById("mainfour");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        title: {
          text: "工业遗产旅游热度排行榜(人次)",
        },
        xAxis: {
          data: [
            "食草堂小镇",
            "开滦矿山公园",
            "启新产业园",
            "和道创意小镇",
            "刘伶醉景区",
            "铁路源头博物馆",
            "林西矿遗址",
            "唐胥铁路遗址",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [
              {
                value: 8321,
                itemStyle: {
                  color: "#a90000",
                },
              },
              6742,
              5931,
              5028,
              4321,
              4178,
              3002,
              2814,
            ],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },

  // 表格数据是动态的，需要动态获取
  updated() {
    // 处理数据
    // console.log("1,=", this.mainData);
    if (this.rankType === "one") {
      // console.log("draw one");
      this.drawOne();
    }
  },
};
</script>

<style>
.heritage-ranking .el-tab-pane {
  width: 100% !important;
}
.heritage-ranking #main1,
.heritage-ranking #mainthree,
.heritage-ranking #mainfour {
  width: 100%;
  height: 550px;
  margin: 0 auto;
}

.heritage-ranking .maintwo {
  width: 100%;
  height: 550px;
  margin: 0 auto;
}

.heritage-ranking .loading {
  width: 80px;
  height: auto;
  margin: 0 auto;
  padding: 200px 0;
}
</style>