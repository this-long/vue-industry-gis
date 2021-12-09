<template>
  <!-- 工业遗产报修审批的详情 -->
  <div class="ApplyHeritageMain">
    <div class="ApplyHeritageMain-top">
      <MainTop>遗产数据 <span class="gang"> / </span> 报修详情</MainTop>
    </div>
    <div class="ApplyHeritageMain-bottom padding15">
      <el-alert
        title="
        
            管理员，欢迎您,请对用户的报修申请进行客观审批。
           
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
              type="warning"
              >处理中</el-tag
            >
            <el-tag
              v-if="heritageMainData.approvalStatus === 'reject'"
              type="danger"
              >已驳回</el-tag
            >
            <el-tag
              v-if="heritageMainData.approvalStatus === 'isend'"
              type="success"
              >已完成</el-tag
            >
          </div>
        </div>
        <div class="text item">
          <div>
            <div class="text-che">
              <span>报修人：{{ heritageMainData.applyName }}</span>
            </div>
            <div class="text-che">
              <span>联系方式：{{ heritageMainData.phone }}</span>
            </div>
            <div class="text-che">
              <span>报修类型：{{ heritageMainData.repairType }}</span>
            </div>
            <div class="text-che">
              <span>报修详情：</span>
            </div>
            <div class="text-che" v-html="heritageMainData.repairMain"></div>
            <div class="text-che">
              <span>是否自备材料及配件：{{ heritageMainData.isPart }}</span>
            </div>

            <div class="text-che" v-if="heritageMainData.partMain !== ''">
              <span>材料描述：</span>
            </div>
            <div
              class="text-che"
              v-if="heritageMainData.partMain !== ''"
              v-html="heritageMainData.partMain"
            ></div>

            <el-divider></el-divider>
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

          <el-divider></el-divider>
          <div class="text-che">
            <span>遗产预览： </span>
          </div>

          <!-- 首页图片 -->
          <div class="text-che">
            <img class="mainImage" :src="heritageMainData.mainImage" alt="" />
          </div>
          <el-divider></el-divider>

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
            <el-form-item label="审批结果" prop="approvalStatus">
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
                <el-radio label="无需派工维修"></el-radio>
                <el-radio label="遗产报修相关内容不完善"></el-radio>
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
    console.log(this.$route);
    var res = await this.$axios.post("/getOneApplyRepair/getOneApplyRepair", {
      _id: this.$route.query._id,
    });
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
            "/editApplyRepair/editApplyRepair",
            this.heritageMainData
          );

          if (res.status === 200) {
            this.$message({
              message: "审批成功",
              type: "success",
            });
            this.$router.push("/repair/approve");
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