<template>
  <div class="main-top">
    <div class="main-top-left">
      <span class="el-icon-arrow-left"></span>
      <span> <slot></slot></span>
    </div>
    <div class="main-top-right">
      <div class="btnBox">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ lang === "zh_cn" ? "中文" : "English"
            }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh_cn">
              {{ lang === "zh_cn" ? "中文" : "Chinese" }}</el-dropdown-item
            >
            <el-dropdown-item command="zh_en">
              {{ lang === "zh_cn" ? "英文" : "English" }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="text" style="margin-left: 10px">
          {{ lang === "zh_cn" ? "退出登陆" : "SignOut" }}</el-button
        >
      </div>
      <el-avatar
        style="margin-left: 10px"
        shape="square"
        size="small"
        src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/5f0c8b2c-22e0-42f3-9ed3-539de3652c08.jpg"
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
  /* border-bottom: 1px; */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.main-top .main-top-left {
  display: flex;
  align-items: center;
  color: #444;
  font-size: 15px !important;
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