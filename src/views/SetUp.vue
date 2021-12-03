<template>
  <!-- 设置 -->
  <div class="set-up mainPadding">
    <MainTop>设置 </MainTop>
    <br />
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
  },
};
</script>

<style scoped>
.set-up .set-che {
  padding: 10px 0;
}
</style>
