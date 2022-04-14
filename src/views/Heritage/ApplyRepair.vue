<template>
  <!-- 提交报修 -->
  <div class="apply-repair">
    <div class="apply-repair-top">
      <MainTop
        >遗产申请 <span class="gang"> / </span> 遗产报修<span class="gang">
          /
        </span>
        新建报修</MainTop
      >
    </div>
    <div class="apply-repair-bottom padding15">
      <br />
      <el-alert
        title="
         请确保报修信息真实有效，否则您的申请可能会不被通过
        "
        type="info"
      >
      </el-alert>
      <br />

      <el-form
        size="mini"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="申请人姓名" prop="applyName">
          <el-input
            placeholder="请输入申请人或申请公司"
            v-model="ruleForm.applyName"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            placeholder="手机号主要用于审核时与您的联系"
            v-model="ruleForm.phone"
          ></el-input>
        </el-form-item>

        <el-form-item label="申请分类" prop="addType">
          <el-input :disabled="true" v-model="ruleForm.addType"></el-input>
        </el-form-item>
        <el-form-item label="遗产名称" prop="name">
          <el-input :disabled="true" v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="所在地址" prop="address">
          <el-input :disabled="true" v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="始建年份" prop="start">
          <el-input :disabled="true" v-model="ruleForm.start"></el-input>
        </el-form-item>

        <el-form-item label="遗产类型" prop="type">
          <el-input :disabled="true" v-model="ruleForm.type"></el-input>
        </el-form-item>

        <el-form-item label="所属公司" prop="company">
          <el-input :disabled="true" v-model="ruleForm.company"></el-input>
        </el-form-item>

        <!-- 保修内容 -->
        <el-form-item label="报修类型" prop="repairType">
          <el-radio-group v-model="ruleForm.repairType">
            <el-radio label="建筑修缮"></el-radio>
            <el-radio label="设备维修"></el-radio>
            <el-radio label="环境改造"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="报修详情" prop="repairMain">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2 }"
            placeholder="请输入对于报修的详细描述"
            v-model="ruleForm.repairMain"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="是否自备材料及配件" prop="isPart">
          <el-radio-group v-model="ruleForm.isPart">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
            <el-radio label="部分自备"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="材料详情" v-if="ruleForm.isPart !== '是'">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2 }"
            placeholder="请输入对于维修材料的详细描述"
            v-model="ruleForm.partMain"
          >
          </el-input>
        </el-form-item>
        <!-- 保修内容 -->

        <el-divider></el-divider>
        <el-alert title="如有请上传相关图片，可上传多张" type="info">
        </el-alert>
        <br />
        <input type="file" multiple="multiple" @change="addImagesAll" />
        <el-divider></el-divider>

        <div class="subBtn">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import MainTop from "../../components/MainTop.vue";
export default {
  components: {
    MainTop,
  },
  async created() {
    console.log(this.$route.query);

    // if (this.$route.query._id && this.$route.query.addType === "工业遗产") {
    //   var res = await this.$axios.post("/getOneApplyRepair/getOneApplyRepair", {
    //     _id: this.$route.query.applyId,
    //   });
    //   // this.editData = { ...res.data.data[0] };
    //   this.ruleForm = { ...res.data.data[0] };
    //   // console.log(res);
    // } else {
    this.getData();
    // }
  },

  data() {
    return {
      data: [],

      ruleForm: {
        applyName: "", //申请人姓名
        phone: "", //申请手机号
        addType: "", //添加类型
        name: "", //遗产名称
        address: "", //遗产地址
        type: "", //类型
        company: "", //所属公司
        jing: 0,
        wei: 0,
        start: "", //年份
        mainImage: "", //封面图片
        coordinate: [],
        approvalStatus: "pending", //待审批状态：pending 待审批 adopt 处理中 reject 已驳回 isend 已完成
        approvalComments: "", //审批意见
        rejectComment: "", //驳回提示

        repairType: "", //报修类型
        repairMain: "", //报修详情
        imagesAllurl: [], //报修相关图片
        isPart: "是", //是否需要材料
        partMain: "", //材料详情
      },

      // 验证规则
      rules: {
        applyName: [
          { required: true, message: "请输入申请人", trigger: "blur" },
        ],
        phone: [
          {
            required: true,
            message: "请输入正确手机号",
            trigger: "blur",
          },
        ],
        addType: [
          { required: true, message: "请选择添加类型", trigger: "change" },
        ],
        name: [
          { required: true, message: "请输入工业遗产名称", trigger: "blur" },
          { min: 3, message: "长度在不少于3个字符", trigger: "blur" },
        ],
        address: [
          {
            required: true,
            message: "请选择工业遗产所在地址",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "请输入工业遗产类型",
            trigger: "blur",
          },
        ],
        company: [
          {
            required: true,
            message: "请输入工业遗产所属公司",
            trigger: "blur",
          },
        ],
        start: [
          {
            required: true,
            message: "请选择遗产始建年份",
            trigger: "blur",
          },
        ],
        repairType: [
          {
            required: true,
            message: "请选择报修类型",
            trigger: "blur",
          },
        ],
        repairMain: [
          {
            required: true,
            message: "请输入报修详情",
            trigger: "blur",
          },
        ],
        isPart: [
          {
            required: true,
            message: "请确定是否需要维修材料",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    async getData() {
      var res = "";
      if (this.$route.query.addType === "工业遗产") {
        res = await this.$axios.post(
          "/getOneHeritageMainData/getOneHeritageMainData",
          {
            _id: this.$route.query._id,
          }
        );
      } else if (this.$route.query.addType === "遗产博物馆") {
        res = await this.$axios.post(
          "/getOneHeritageMuseum/getOneHeritageMuseum",
          {
            _id: this.$route.query._id,
          }
        );
      } else if (this.$route.query.addType === "工业旅游区") {
        res = await this.$axios.post(
          "/getOneHeritageTourism/getOneHeritageTourism",
          {
            _id: this.$route.query._id,
          }
        );
      }
      this.data = res.data.data[0];
      this.ruleForm.addType = this.data.addType;
      this.ruleForm.name = this.data.name;
      this.ruleForm.address = this.data.address;
      this.ruleForm.type = this.data.type;
      this.ruleForm.company = this.data.company;
      this.ruleForm.jing = this.data.jing;
      this.ruleForm.wei = this.data.wei;
      this.ruleForm.start = this.data.start;
      this.ruleForm.mainImage = this.data.mainImage;
      this.ruleForm.coordinate = this.data.coordinate;
      console.log(this.data);
    },

    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //   alert("submit!");
          console.log(this.ruleForm);

          // 处理文件格式
          if (this.ruleForm.repairMain !== "") {
            var re = /\n/g;
            this.ruleForm.repairMain = this.ruleForm.repairMain.replace(
              re,
              "<br>"
            );

            console.log(this.ruleForm.repairMain.split("<br>"));
            var arr = this.ruleForm.repairMain.split("<br>");
            var newarr = arr.map((ele) => "<p class='test'>" + ele + "</p>");
            var newStr = newarr.join("");
            this.ruleForm.repairMain = newStr;
          }
          if (this.ruleForm.partMain !== "") {
            var re2 = /\n/g;
            this.ruleForm.partMain = this.ruleForm.partMain.replace(
              re2,
              "<br>"
            );

            console.log(this.ruleForm.partMain.split("<br>"));
            var arr2 = this.ruleForm.partMain.split("<br>");
            var newarr2 = arr2.map((ele) => "<p class='test'>" + ele + "</p>");
            var newStr2 = newarr2.join("");
            this.ruleForm.partMain = newStr2;
          }

          if (this.$route.query.applyId) {
            // 编辑
            this.ruleForm.approvalStatus = "pending";
            var editRes = await this.$axios.post(
              "/editApplyRepair/editApplyRepair",
              {
                ...this.ruleForm,
                user: sessionStorage.getItem("username"),
              }
            );
            if (editRes.status === 200) {
              this.$message({
                message: "编辑成功",
                type: "success",
              });
              this.$router.push({
                path: "/repair/my/applyRepair",
              });
            }
          } else {
            var res = await this.$axios.post(
              "/postApplyRepairData/postApplyRepairData",
              {
                ...this.ruleForm,
                user: sessionStorage.getItem("username"),
              }
            );
            if (res.status === 200) {
              this.$message({
                message: "报修信息提交成功，请耐心等待审核",
                type: "success",
              });
              this.$router.push("/repair/my/applyRepair");
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 展示图片上传
    addImagesAll(e) {
      const file = e.target.files[0];
      console.log(file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async (event) => {
        let dataUrl = (this.src = event.target.result);
        var res = await this.$axios.post(
          "https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/image",
          {
            dataUrl,
            name: file.name,
          }
        );

        if (res.status === 200) {
          this.$message({
            message: "图片上传成功",
            type: "success",
          });

          this.ruleForm.imagesAllurl.push(res.data.fileID);
        } else {
          this.$message.error("图片上传失败，请检查网络设置");
        }
        // console.log(res);
      };
    },
  },
};
</script>

<style>
</style>
