<template>
  <!-- 工业遗产申请的详情 -->
  <div class="ApplyHeritageMain">
    <div class="ApplyHeritageMain-top">
      <MainTop>遗产数据 <span class="gang"> / </span> 遗产详情</MainTop>
    </div>
    <div class="ApplyHeritageMain-bottom padding15">
      <el-alert
        title="
        
            管理员，欢迎您,请对用户的申请进行客观审批。
           
        "
        type="info"
      >
      </el-alert>
      <br />
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
            <el-carousel :interval="4000" type="card" height="500px">
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
          <el-divider></el-divider>

          <!-- 审批表单部分 -->
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="特殊资源" prop="approvalStatus">
              <el-radio-group v-model="ruleForm.approvalStatus">
                <el-radio label="同意" value="adopt"></el-radio>
                <el-radio label="驳回" value="reject"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="审批意见" prop="approvalComments">
              <el-input
                type="textarea"
                v-model="ruleForm.approvalComments"
              ></el-input>
            </el-form-item>

            <el-form-item
              v-if="ruleForm.approvalStatus === '驳回'"
              label="驳回原因"
            >
              <el-radio-group v-model="ruleForm.rejectComment">
                <el-radio label="图片不全"></el-radio>
                <el-radio label="坐标或地址与实际不符"></el-radio>
                <el-radio label="个人信息或联系方式有误"></el-radio>
                <el-radio label="遗产内容不完善"></el-radio>
                <el-radio label="其他"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >立即创建</el-button
              >
            </el-form-item>
          </el-form>
          <!-- end -->
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import MainTop from "../../components/MainTop.vue";

export default {
  name: "ApplyHeritageMain",
  components: {
    MainTop,
  },

  data() {
    return {
      heritageMainData: null,
      ruleForm: {
        approvalStatus: "",
        approvalComments: "",
        rejectComment: "",
      },

      rules: {
        approvalStatus: [
          { required: true, message: "请输入选择审批类型", trigger: "blur" },
        ],
        approvalComments: [
          { required: true, message: "请输入审批意见", trigger: "change" },
        ],
      },
    };
  },

  async created() {
    console.log(this.heritageMainData);
    var res = await this.$axios.post(
      "/getOneApplyHeritage/getOneApplyHeritage",
      {
        _id: this.$route.params.applyid,
      }
    );
    this.heritageMainData = res.data.data[0];
    console.log(this.heritageMainData);
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log(this.ruleForm);
          if (this.ruleForm.approvalStatus === "同意") {
            this.heritageMainData.approvalStatus = "adopt";
          } else if (this.ruleForm.approvalStatus === "驳回") {
            this.heritageMainData.approvalStatus = "reject";
          }

          this.heritageMainData.approvalComments =
            this.ruleForm.approvalComments;
          this.heritageMainData.rejectComment = this.ruleForm.rejectComment;
          var res = await this.$axios.post(
            "/editApplyHeritage/editApplyHeritage",
            this.heritageMainData
          );

          if (res.status === 200) {
            if (this.heritageMainData.approvalStatus === "adopt") {
              var postres = "";
              var postdata = {
                addType: this.heritageMainData.addType,
                name: this.heritageMainData.name,
                address: this.heritageMainData.address,

                type: this.heritageMainData.type,
                company: this.heritageMainData.company,
                jing: this.heritageMainData.jing,
                wei: this.heritageMainData.wei,
                start: this.heritageMainData.start,
                prolevel: this.heritageMainData.prolevel,
                trvlevel: this.heritageMainData.trvlevel,
                scelevel: this.heritageMainData.scelevel,
                brief: this.heritageMainData.brief,
                details: this.heritageMainData.details,
                mainImage: this.heritageMainData.mainImage,
                imagesAllurl: this.heritageMainData.imagesAllurl,
                coordinate: this.heritageMainData.coordinate,
              };
              if (this.heritageMainData.addType === "工业遗产") {
                postres = await this.$axios.post(
                  "/postHeritageMainData/postHeritageMainData",
                  postdata
                );
              } else if (this.heritageMainData.addType === "遗产博物馆") {
                postres = await this.$axios.post(
                  "/postHeritageMuseum/postHeritageMuseum",
                  postdata
                );
              } else if (this.heritageMainData.addType === "工业旅游区") {
                postres = await this.$axios.post(
                  "/postHeritageTourism/postHeritageTourism",
                  postdata
                );
              }
              if (postres.status === 200) {
                this.$message({
                  message: "审批成功",
                  type: "success",
                });
                this.$router.push("/heritage/approve");
              }
            } else {
              this.$message({
                message: "审批成功",
                type: "success",
              });
              this.$router.push("/heritage/approve");
            }
          }
        } else {
          this.$message.error("请完善审批信息");
          return false;
        }
      });
    },
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