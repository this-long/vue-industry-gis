<template>
  <div class="main-top">
    <div class="main-top-left">
      <el-input placeholder="请输入内容"></el-input>

      <el-button icon="el-icon-search" circle></el-button>
    </div>
    <div class="main-top-right">
      <div class="btnBox">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ lang === "zh_cn" ? "中文" : "英文"
            }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh_cn">中文</el-dropdown-item>
            <el-dropdown-item command="zh_en">英文</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="text" style="margin-left: 10px">退出</el-button>
      </div>
      <el-avatar
        style="margin-left: 10px"
        shape="square"
        size="small"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "MainTop",

  created() {
    // console.log(this.lang);
  },

  computed: {
    ...mapState(["lang"]),
  },

  methods: {
    ...mapMutations(["langChange"]),

    handleCommand(command) {
      // console.log(command);
      this.langChange(command);
    },
  },
};
</script>

<style scoped>
.main-top {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.main-top .main-top-left {
  display: flex;
}
.main-top .main-top-right {
  display: flex;
  align-items: center;
}
.el-dropdown-link {
  cursor: pointer;
  color: #40a0fffd;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>