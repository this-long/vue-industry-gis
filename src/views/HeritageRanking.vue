<template>
  <!-- 遗产排行榜 -->
  <div class="heritage-ranking">
    <div class="heritage-ranking-top">
      <MainTop>遗产数据 <span class="gang"> / </span> 遗产排行榜</MainTop>
    </div>
    <div class="heritage-ranking-bottom padding15">
      <el-button-group>
        <el-button @click="changeType('one')" icon="el-icon-data-analysis"
          >各年限遗产数量分布榜</el-button
        >
        <el-button icon="el-icon-s-data">工业遗产旅游热度排行榜</el-button>
        <el-button icon="el-icon-notebook-1">工业遗产留存年限排行榜</el-button>
        <el-button icon="el-icon-pie-chart">工业遗产各分类占比</el-button>
        <el-button @click="changeType('help')" icon="el-icon-pie-chart"
          >查看帮助</el-button
        >
      </el-button-group>
      <br />
      <br />
      <el-card shadow="hover">
        <div v-if="rankType === 'one'" id="main"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
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

      console.log("mainData", this.mainData);
    },
    // 切换当前状态
    changeType(type) {
      this.rankType = type;

      setTimeout(() => {
        if (type === "one") {
          var chartDom = document.getElementById("main");
          this.myChart = echarts.init(chartDom);
          this.option;

          this.option = {
            title: {
              text: "World Population",
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
              data: ["Brazil", "Indonesia", "USA", "India", "China", "World"],
            },
            series: [
              {
                name: "2011",
                type: "bar",
                data: [18203, 23489, 29034, 104970, 131744, 630230],
              },
              {
                name: "2012",
                type: "bar",
                data: [19325, 23438, 31000, 121594, 134141, 681807],
              },
              {
                name: "2013",
                type: "bar",
                data: [19325, 23438, 31000, 121594, 134141, 681807],
              },
            ],
          };

          this.option && this.myChart.setOption(this.option);
        }
      }, 0);
    },
  },
  mounted() {
    var chartDom = document.getElementById("main");
    this.myChart = echarts.init(chartDom);
    this.option;

    this.option = {
      title: {
        text: "World Population",
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
        data: ["Brazil", "Indonesia", "USA", "India", "China", "World"],
      },
      series: [
        {
          name: "2011",
          type: "bar",
          data: [18203, 23489, 29034, 104970, 131744, 630230],
        },
        {
          name: "2012",
          type: "bar",
          data: [19325, 23438, 31000, 121594, 134141, 681807],
        },
        {
          name: "2013",
          type: "bar",
          data: [19325, 23438, 31000, 121594, 134141, 681807],
        },
      ],
    };

    this.option && this.myChart.setOption(this.option);
  },
};
</script>

<style>
.heritage-ranking .el-tab-pane {
  width: 100% !important;
}
.heritage-ranking #main {
  width: 100%;
  height: 550px;
  margin: 0 auto;
}
</style>