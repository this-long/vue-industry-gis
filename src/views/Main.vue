<template>
  <!-- 内容主页面 -->
  <div class="main">
    <div class="main-left">
      <el-menu
        router
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#90AACB"
        text-color="#fff"
        active-text-color="#325288"
      >
        <el-menu-item index="/" style="font-size: 16px">
          <i class="myIcon el-icon-s-home"></i>
          <span class="menuSpan" slot="title">{{
            lang === "zh_cn" ? "首页" : "Home"
          }}</span>
        </el-menu-item>
        <el-submenu index="/heritage">
          <template slot="title">
            <i class="myIcon el-icon-location"></i>
            <span class="menuSpan">{{
              lang === "zh_cn" ? "遗产展示" : "Heritage"
            }}</span>
          </template>
          <el-menu-item index="/heritage/industry">{{
            lang === "zh_cn" ? "工业遗产" : "Industry"
          }}</el-menu-item>
          <el-menu-item index="/heritage/museum">{{
            lang === "zh_cn" ? "遗产博物馆" : "Museum"
          }}</el-menu-item>
          <el-menu-item index="/heritage/tourism">{{
            lang === "zh_cn" ? "工业旅游区" : "TouristArea"
          }}</el-menu-item>
        </el-submenu>

        <el-submenu v-if="nowUser !== 'admin'" index="遗产申请">
          <template slot="title">
            <i class="myIcon el-icon-s-promotion"></i>
            <span class="menuSpan">{{
              lang === "zh_cn" ? "遗产申请" : "Apply"
            }}</span>
          </template>
          <el-menu-item index="/heritage/apply">{{
            lang === "zh_cn" ? "遗产添加申请" : "Declare"
          }}</el-menu-item>
          <el-menu-item index="/heritage/repair">{{
            lang === "zh_cn" ? "遗产报修" : "Repair"
          }}</el-menu-item>
          <el-menu-item index="/heritage/myapply">{{
            lang === "zh_cn" ? "我的申请" : "MyApply"
          }}</el-menu-item>
          <el-menu-item index="/repair/my/applyRepair">{{
            lang === "zh_cn" ? "我的报修" : "MyRepair"
          }}</el-menu-item>
        </el-submenu>

        <el-submenu index="遗产数据">
          <template slot="title">
            <i class="myIcon el-icon-s-marketing"></i>
            <span class="menuSpan">{{
              lang === "zh_cn" ? "遗产数据" : "Information"
            }}</span>
          </template>

          <el-menu-item index="/heritage/hotmap">{{
            lang === "zh_cn" ? "游客量热力图" : "HeatMap"
          }}</el-menu-item>
          <el-menu-item index="/heritage/praise">{{
            lang === "zh_cn" ? "遗产聚集度" : "Praise"
          }}</el-menu-item>
          <!-- <el-menu-item index="/heritage/Echarts">{{
            lang === "zh_cn" ? "遗产可视化" : "ReportForm"
          }}</el-menu-item> -->

          <el-menu-item index="/heritage/ranking">{{
            lang === "zh_cn" ? "数据可视化" : "ReportForm"
          }}</el-menu-item>
          <el-menu-item index="/heritage/repairlocalmap">{{
            lang === "zh_cn" ? "遗产维修次数" : "ReportNum"
          }}</el-menu-item>
        </el-submenu>

        <el-submenu index="我要旅行">
          <template slot="title">
            <i class="myIcon el-icon-s-cooperation"></i>
            <span class="menuSpan">{{
              lang === "zh_cn" ? "我要旅行" : "Travel"
            }}</span>
          </template>

          <el-menu-item index="/travel/plan">{{
            lang === "zh_cn" ? "出行规划" : "TravelPlan"
          }}</el-menu-item>
          <el-menu-item index="/travel/money">{{
            lang === "zh_cn" ? "预算评估" : "Budget"
          }}</el-menu-item>
          <!-- 展示关闭该功能模块，后续再考虑是否开发 -->
          <!-- <el-menu-item index="/travel/map">{{
            lang === "zh_cn" ? "足迹地图" : "FootMap"
          }}</el-menu-item> -->
        </el-submenu>

        <el-submenu index="数据维护" v-if="nowUser === 'admin'">
          <template slot="title">
            <i class="myIcon el-icon-s-order"></i>
            <span class="menuSpan">{{
              lang === "zh_cn" ? "数据维护" : "AdminData"
            }}</span>
          </template>
          <el-menu-item index="/data/manage">{{
            lang === "zh_cn" ? "遗产管理" : "HeritageRun"
          }}</el-menu-item>
          <el-menu-item index="/edit/home">{{
            lang === "zh_cn" ? "遗产主页编辑" : "HomePageEdit"
          }}</el-menu-item>
        </el-submenu>

        <el-submenu index="我的审核" v-if="nowUser === 'admin'">
          <template slot="title">
            <i class="myIcon el-icon-s-check"></i>
            <span class="menuSpan">{{
              lang === "zh_cn" ? "我的审核" : "MyApprove"
            }}</span>
          </template>
          <el-menu-item index="/heritage/approve">{{
            lang === "zh_cn" ? "添加审核" : "HeritageApprove"
          }}</el-menu-item>
          <el-menu-item index="/repair/approve">{{
            lang === "zh_cn" ? "报修审核" : "RepairApprove"
          }}</el-menu-item>
          <el-menu-item index="/heritage/repairmap">{{
            lang === "zh_cn" ? "维修现状图" : "RepairMap"
          }}</el-menu-item>
        </el-submenu>

        <!-- 国家申遗 -->
        <el-submenu index="国家申遗">
          <template slot="title">
            <i class="myIcon el-icon-s-management"></i>
            <span class="menuSpan">{{
              lang === "zh_cn" ? "国家申遗" : "National"
            }}</span>
          </template>
          <el-menu-item @click="path1" index="">{{
            lang === "zh_cn" ? "工信官网" : "NationalWebsite"
          }}</el-menu-item>
          <el-menu-item @click="path2" index="">{{
            lang === "zh_cn" ? "申遗入口" : "ApplicationEntry"
          }}</el-menu-item>
          <!-- <el-menu-item index="/repair/approve">{{
            lang === "zh_cn" ? "报修申请" : "RepairApprove"
          }}</el-menu-item> -->
        </el-submenu>

        <el-menu-item index="/about">
          <i class="myIcon el-icon-s-comment"></i>
          <span class="menuSpan" slot="title">{{
            lang === "zh_cn" ? "关于我们" : "AboutUs"
          }}</span>
        </el-menu-item>
        <el-menu-item index="/setup">
          <i class="myIcon el-icon-s-tools"></i>
          <span class="menuSpan" slot="title">{{
            lang === "zh_cn" ? "设置" : "SetUp"
          }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main-right">
      <div class="all-coverage">
        <!-- <div class="coverage-top">
          <MainTop></MainTop>
        </div> -->
        <!-- <div class="coverage-bottom"> -->
        <!-- <MainTop></MainTop> -->
        <!-- </div> -->
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

// import MainTop from "../components/MainTop.vue";
export default {
  // components: { MainTop },

  data() {
    return {
      isCollapse: true,
      nowUser: "暂未获取用户数据",
    };
  },

  created() {
    this.nowUser = sessionStorage.getItem("username");
    console.log(this.nowUser);
  },

  computed: {
    ...mapState(["lang"]),
  },

  methods: {
    path1() {
      window.location.href = "https://wap.miit.gov.cn/";
    },

    path2() {
      window.location.href =
        "http://www.gov.cn/xinwen/2021-04/14/content_5599500.htm";
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
}
.main .main-left {
  width: 160px;
  overflow: auto;
  height: 100vh;
  background-color: #90aacb;
}

.main .main-left > ul {
  width: 160px;
}
.main .main-left > .el-menu-vertical-demo > .el-menu-item,
.main .main-left > .el-menu-vertical-demo .el-submenu__title {
  font-size: 16px !important;
}
.main .main-right {
  width: calc(100% - 160px);
  /* background-color: red; */
  overflow: auto;
  height: 100vh;
}

.main .main-right .coverage-top {
  width: 100%;
  height: 7vh;
  /* border-bottom: #000; */
}

/* .main .main-right .all-coverage {
  
} */
.el-menu-vertical-demo {
  overflow: hidden;
}
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
.myIcon {
  color: white;
}
.menuSpan {
  font-size: 15px;
  padding-left: 5px;
}
</style>