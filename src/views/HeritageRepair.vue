<template>
  <!-- 遗产报修 -->
  <div class="heritage-repair">
    <div class="heritage-repair-top">
      <MainTop>遗产申请 <span class="gang"> / </span> 遗产报修</MainTop>
    </div>
    <div class="heritage-repair-bottom">
      <el-button @click="test">test</el-button>
      <el-button @click="test2">test2</el-button>
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
    async test() {
      var res = await this.$axios.get(
        "https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/image"
      );
      console.log(res.data);
    },

    test2() {
      let fs = require("fs");
      console.log(fs.createReadStream(`C:/Users/龙仔/Desktop/users.jpg`));
    },
  },
};
</script>

<style>
</style>