<template>
  <!-- 工业遗产审批的申请 -->
  <div class="ApplyHeritageMain">
    <div class="ApplyHeritageMain-top">
      <MainTop>遗产数据 <span class="gang"> / </span> 遗产详情</MainTop>
    </div>
    <div class="ApplyHeritageMain-bottom padding15">
      <el-card v-if="heritageMainData !== null" class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span class="title">{{ heritageMainData.name }}</span>
          <div>
            <span style="margin-right: 10px">{{
              heritageMainData.addType
            }}</span>
            <el-tag
              v-if="heritageMainData.approvalStatus === 'pending'"
              type="info"
              >待审批</el-tag
            >
            <el-tag
              v-if="heritageMainData.approvalStatus === 'adopt'"
              type="success"
              >已通过</el-tag
            >
            <el-tag
              v-if="heritageMainData.approvalStatus === 'reject'"
              type="danger"
              >已驳回</el-tag
            >
            <el-tag
              v-if="heritageMainData.rejectComment !== ''"
              type="danger"
              >{{ heritageMainData.rejectComment }}</el-tag
            >
          </div>
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

          <div class="text-che">
            <span>审批意见： </span>
          </div>
          <div
            v-if="heritageMainData.approvalComments !== ''"
            class="text-che"
            v-html="heritageMainData.approvalComments"
          ></div>
          <div v-else class="text-che"><p>暂无意见</p></div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import MainTop from "../../components/MainTop.vue";

export default {
  name: "ApproveHeritageMain",
  components: {
    MainTop,
  },

  data() {
    return {
      heritageMainData: null,
    };
  },

  async created() {
    console.log(this.$route);
    var res = await this.$axios.post(
      "/getOneApplyHeritage/getOneApplyHeritage",
      {
        _id: this.$route.params.applyid,
      }
    );
    this.heritageMainData = res.data.data[0];
    console.log(this.heritageMainData);
  },
};
</script>

<style >
.ApplyHeritageMain .ApplyHeritageMain-bottom .clearfix {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ApplyHeritageMain .ApplyHeritageMain-bottom .clearfix span {
  font-size: 16px;
}
.ApplyHeritageMain .ApplyHeritageMain-bottom .clearfix .title {
  font-size: 20px;
}

.ApplyHeritageMain .ApplyHeritageMain-bottom .text span {
  font-size: 15px;
}

.ApplyHeritageMain .ApplyHeritageMain-bottom .text .text-che {
  padding: 5px 0;
}
.ApplyHeritageMain .ApplyHeritageMain-bottom .text p {
  margin: 0;
  margin-left: 5px;
  color: black;
  font-family: "楷体";
  padding: 8px 0;
  text-indent: 35px;
  word-break: break-all;
}
.ApplyHeritageMain .ApplyHeritageMain-bottom .text .mainImage {
  width: 80%;
  height: auto;
  display: block;
  margin: 0 auto;
}
/* .ApplyHeritageMain .ApplyHeritageMain-bottom .text .otherImage {

} */
</style>