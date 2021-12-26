<template>
  <!-- 要闻详情 -->
  <div class="noticemain">
    <div class="noticemain-top">
      <MainTop>要闻详情 </MainTop>
    </div>
    <div class="noticemain-bottom padding15">
      <div class="maniText-top">
        <span class="title">{{ mainText.name }}</span>
        <br />
        <br />
        <span class="date">{{ mainText.date1 }}</span>
        <el-tag effect="plain" type="info">
          {{ mainText.region }}
        </el-tag>
      </div>
      <el-divider></el-divider>
      <div class="mainText-bottom" v-html="mainText.mainTextP"></div>
    </div>
  </div>
</template>

<script>
import MainTop from "../components/MainTop.vue";
export default {
  components: {
    MainTop,
  },

  created() {
    console.log(this.$route);
    this.getOneNoticeList();
  },

  data() {
    return {
      mainText: [],
    };
  },

  methods: {
    async getOneNoticeList() {
      var res = await this.$axios.post("/getOneNoticeList/getOneNoticeList", {
        _id: this.$route.query._id,
      });
      this.mainText = res.data.data[0];
      console.log(this.mainText);
    },
  },
};
</script>

<style>
.noticemain .maniText-top {
  text-align: center;
}
.noticemain .maniText-top .title {
  font-size: 35px;
  font-weight: 600;
}
.noticemain .maniText-top .date {
  margin-right: 20px;
  font-size: 18px;
}

.noticemain .mainText-bottom .test {
  margin: 0;
  margin-left: 5px;
  color: black;
  font-family: "楷体";
  padding: 8px 0;
  text-indent: 35px;
  word-break: break-all;
}
</style>
