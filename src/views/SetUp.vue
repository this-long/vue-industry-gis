<template>
  <!-- 设置 -->
  <div class="set-up">
    <MainTop>设置 </MainTop>
    <br />
    <div class="set-up-bottom padding15">
      <el-alert
        :title="
          lang === 'zh_cn'
            ? '通过设置来使系统符合你的操作以及切换用户'
            : 'Make the system conform to your operation and switch users through settings'
        "
        type="info"
      >
      </el-alert>

      <div class="set-che">
        <span>{{ lang === "zh_cn" ? "语言偏好" : "Language preference" }}</span>
      </div>
      <el-switch
        @change="changeLang"
        style="display: block"
        v-model="myLang"
        active-color="#13ce66"
        inactive-color="#ff4949"
        :active-text="lang === 'zh_cn' ? '中文语言' : 'Chinese'"
        :inactive-text="lang === 'zh_cn' ? '英文语言' : 'English'"
      >
      </el-switch>
      <el-divider></el-divider>
      <div class="set-che">
        <span>{{ lang === "zh_cn" ? "当前用户" : "Current user" }}</span>
        <p>{{ nowUser }}</p>
      </div>

      <div class="set-che">
        <span>{{ lang === "zh_cn" ? "用户权限" : "User rights" }}</span>
        <p>
          <el-tag style="margin: 8px 0">{{
            nowUser === "admin" ? "系统管理员" : "普通用户"
          }}</el-tag>
        </p>
      </div>
      <el-divider></el-divider>
      <el-button type="danger" @click="removeNowUser" plain
        >退出当前账户</el-button
      >
    </div>
    <!-- <div></div> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import MainTop from "../components/MainTop.vue";
// import MainTop from "../components/MainTop.vue";
export default {
  components: { MainTop },

  data() {
    return {
      myLang: null,
      nowUser: "用户数据未获取到",
    };
  },
  computed: {
    ...mapState(["lang"]),
  },

  created() {
    if (this.lang === "zh_cn") {
      this.myLang = true;
    } else {
      this.myLang = false;
    }
    this.nowUser = sessionStorage.getItem("username");
  },

  methods: {
    ...mapMutations(["langChange"]),
    changeLang(value) {
      // console.log(value);
      if (value) {
        this.langChange("zh_cn");
      } else {
        this.langChange("zh_en");
      }
    },

    removeNowUser() {
      // console.log(1);
      sessionStorage.removeItem("username");
      this.$router.push("/heritage/login");
    },
  },
};
</script>

<style scoped>
.set-up .set-che {
  padding: 10px 0;
}
.set-up p {
  margin: 0;
}
</style>
