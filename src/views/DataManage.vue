<template>
  <!-- 数据管理 -->
  <div class="data-manage">
    <div class="data-manage-top">
      <MainTop>数据维护 <span class="gang"> / </span> 遗产管理</MainTop>
    </div>
    <div class="data-manage-bottom padding15">
      <div class="data-manage-buttons">
        <!-- 按钮组 -->
        <el-button @click="addHeritage" type="primary" size="small"
          >添加遗产</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import MainTop from "../components/MainTop.vue";
export default {
  components: {
    MainTop,
  },

  data() {
    return {};
  },

  methods: {
    addHeritage() {
      this.$router.push("/heritage/add");
    },
  },
};
</script>

<style>
</style>