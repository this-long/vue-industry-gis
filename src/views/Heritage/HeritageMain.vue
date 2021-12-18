<template>
  <!-- 工业遗产的详情 -->
  <div class="HeritageMain">
    <div class="HeritageMain-top">
      <MainTop>遗产数据 <span class="gang"> / </span> 遗产详情</MainTop>
    </div>
    <div class="HeritageMain-bottom padding15">
      <el-card v-if="heritageMainData !== null" class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span class="title">{{ heritageMainData.name }}</span>
          <span>{{ heritageMainData.addType }}</span>
        </div>
        <div class="text item">
          <div>
            <div class="text-che">
              <span>始建年份：{{ heritageMainData.start }}</span>
            </div>
          </div>
          <div class="text-che">
            <span>遗产类型：{{ heritageMainData.type }}</span>
          </div>
          <div class="text-che">
            <span>遗产地址：{{ heritageMainData.address }}</span>
          </div>
          <div class="text-che">
            <span>所属公司：{{ heritageMainData.company }}</span>
          </div>
          <div class="text-che">
            <span
              >地理坐标：{{ heritageMainData.jing }},{{
                heritageMainData.wei
              }}</span
            >
          </div>
          <div class="text-che">
            <span> 保护等级及再利用情况：</span>
            <p>
              {{
                heritageMainData.prolevel
                  ? heritageMainData.prolevel
                  : "暂无数据"
              }}
            </p>
          </div>
          <div class="text-che">
            <span
              >旅游景区等级：
              {{
                heritageMainData.scelevel
                  ? heritageMainData.scelevel + "A级示范景区"
                  : "暂无数据"
              }}</span
            >
          </div>
          <div class="text-che">
            <span
              >工业旅游示范点等级：
              {{
                heritageMainData.trvlevel
                  ? heritageMainData.trvlevel
                  : "暂无数据"
              }}</span
            >
          </div>
          <el-divider></el-divider>
          <div class="text-che">
            <span>遗产简介： </span>
          </div>
          <div class="text-che" v-html="heritageMainData.brief"></div>

          <!-- 首页图片 -->
          <div class="text-che">
            <img class="mainImage" :src="heritageMainData.mainImage" alt="" />
          </div>
          <el-divider></el-divider>
          <div class="text-che">
            <span>工业遗产详细介绍： </span>
          </div>
          <div class="text-che" v-html="heritageMainData.details"></div>

          <div class="text-che">
            <span>相关图片 </span>
          </div>

          <div class="text-che">
            <el-carousel
              :interval="4000"
              type="card"
              height="500px"
              width="700px"
            >
              <el-carousel-item
                v-for="item in heritageMainData.imagesAllurl"
                :key="item"
              >
                <img class="otherImage" :src="item" alt="" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import MainTop from "../../components/MainTop.vue";
import { mapState } from "vuex";

export default {
  name: "HeritageMain",
  components: {
    MainTop,
  },

  data() {
    return {
      heritageMainData: null,
    };
  },

  computed: {
    ...mapState(["instryType"]),
  },

  async created() {
    console.log(this.instryType);
    var res = "";
    console.log(this.$route.params.heritage);

    if (this.instryType === "one") {
      // console.log(1);

      res = await this.$axios.post(
        "https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/mainFun/getOneHeritageMainData/getOneHeritageMainData",
        {
          _id: this.$route.params.heritage,
        }
      );
    } else if (this.instryType === "two") {
      console.log(2);

      res = await this.$axios.post(
        "getOneHeritageMuseum/getOneHeritageMuseum",
        {
          _id: this.$route.params.heritage,
        }
      );
    } else if (this.instryType === "three") {
      console.log(3);

      res = await this.$axios.post(
        "getOneHeritageTourism/getOneHeritageTourism",
        {
          _id: this.$route.params.heritage,
        }
      );
    }

    this.heritageMainData = res.data.data[0];
    console.log("test", this.heritageMainData);
  },
};
</script>

<style >
.HeritageMain .HeritageMain-bottom .clearfix {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.HeritageMain .HeritageMain-bottom .clearfix span {
  font-size: 16px;
}
.HeritageMain .HeritageMain-bottom .clearfix .title {
  font-size: 20px;
}

.HeritageMain .HeritageMain-bottom .text span {
  font-size: 15px;
}

.HeritageMain .HeritageMain-bottom .text .text-che {
  padding: 5px 0;
}
.HeritageMain .HeritageMain-bottom .text p {
  margin: 0;
  margin-left: 5px;
  color: black;
  font-family: "楷体";
  padding: 8px 0;
  text-indent: 35px;
  word-break: break-all;
}
.HeritageMain .HeritageMain-bottom .text .mainImage {
  width: 80%;
  height: auto;
  display: block;
  margin: 0 auto;
}
/* .HeritageMain .HeritageMain-bottom .text .otherImage {

} */
</style>