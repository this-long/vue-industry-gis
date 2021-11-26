<template>
  <!-- 内容主页面 -->
  <div class="main">
    <div class="main-left">
      <el-menu
        router
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
      >
        <el-menu-item index="/home">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>遗产展示</span>
          </template>
          <el-menu-item index="/heritage/industry">工业遗产</el-menu-item>
          <el-menu-item index="/heritage/museum">遗产博物馆</el-menu-item>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>遗产申请</span>
          </template>
          <el-menu-item index="2-1">遗产申报</el-menu-item>
          <el-menu-item index="2-2">遗产报修</el-menu-item>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>遗产数据</span>
          </template>
          <el-menu-item index="3-1">遗产报表</el-menu-item>
          <el-menu-item index="3-2">遗产排行榜</el-menu-item>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>我要旅行</span>
          </template>
          <el-menu-item index="4-1">出行规划</el-menu-item>
          <el-menu-item index="4-2">预算评估</el-menu-item>
          <el-menu-item index="4-3">足迹地图</el-menu-item>
        </el-submenu>

        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>数据维护</span>
          </template>
          <el-menu-item index="5-1">遗产管理</el-menu-item>
          <el-menu-item index="5-2">遗产主页编辑</el-menu-item>
        </el-submenu>

        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>我的审核</span>
          </template>
          <el-menu-item index="6-1">遗产申请</el-menu-item>
          <el-menu-item index="6-2">报修申请</el-menu-item>
        </el-submenu>

        <el-menu-item index="aboutOur">
          <i class="el-icon-menu"></i>
          <span slot="title">关于我们</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main-right">
      <div class="all-coverage">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
    };
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
  background-color: #545c64;
}
.main .main-right {
  width: calc(100% - 160px);
  /* background-color: red; */
  overflow: auto;
  height: 100vh;
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
</style>