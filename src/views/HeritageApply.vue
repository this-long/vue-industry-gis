<template>
  <!-- 遗产申请 -->
  <div class="heritage-apply">
    <div class="heritage-apply-top">
      <MainTop>遗产申请 <span class="gang"> / </span> 遗产申报</MainTop>
    </div>
    <div class="heritage-apply-bottom padding15">
      <el-alert
        :title="
          lang === 'zh_cn'
            ? '为了您的申请能通过审核，请确保您的信息真实有效'
            : 'In order for your application to pass the examination, please ensure that your information is true and valid'
        "
        type="info"
      >
      </el-alert>
      <br />
      <el-button
        type="primary"
        @click="getapplyCoordinateP"
        v-show="applyCoordinate.length === 0"
        >点击拾取遗产坐标位置</el-button
      >

      <div class="main-box" v-show="applyCoordinate.length !== 0">
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

          <el-form-item label="添加类型" prop="addType">
            <el-radio-group v-model="ruleForm.addType">
              <el-radio label="工业遗产"></el-radio>
              <el-radio label="遗产博物馆"></el-radio>
              <el-radio label="工业旅游区"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="遗产名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="坐标经度" prop="jing">
            <el-input style="width: 200px" v-model="ruleForm.jing"></el-input>
          </el-form-item>
          <el-form-item label="坐标纬度" prop="wei">
            <el-input style="width: 200px" v-model="ruleForm.wei"></el-input>
            <el-button @click="getapplyCoordinateP" style="margin-left: 10px"
              >重新拾取</el-button
            >
          </el-form-item>
          <el-form-item label="所在地址" prop="address">
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>
          <el-form-item label="始建年份" prop="start">
            <el-date-picker
              v-model="ruleForm.start"
              type="year"
              value-format="yyyy"
              placeholder="选择年"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="遗产类型" prop="type">
            <el-input v-model="ruleForm.type"></el-input>
          </el-form-item>

          <el-form-item label="所属公司" prop="company">
            <el-input v-model="ruleForm.company"></el-input>
          </el-form-item>

          <el-form-item label="保护等级及再利用情况">
            <el-input v-model="ruleForm.prolevel"></el-input>
          </el-form-item>
          <el-form-item label="工业旅游示范点等级">
            <el-input v-model="ruleForm.trvlevel"></el-input>
          </el-form-item>

          <el-form-item label="旅游景区等级">
            <el-rate
              :texts="['1A景区', '2A景区', '3A景区', '4A景区', '5A景区']"
              v-model="ruleForm.scelevel"
              show-text
            >
            </el-rate>
          </el-form-item>

          <el-form-item label="遗产简介" prop="brief">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2 }"
              placeholder="请输入遗产简介"
              v-model="ruleForm.brief"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="详细介绍" prop="details">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2 }"
              placeholder="请输入详细介绍"
              v-model="ruleForm.details"
            >
            </el-input>
          </el-form-item>

          <el-divider></el-divider>
          <el-alert
            :title="
              lang === 'zh_cn'
                ? '请选择封面图片，注意封面图片仅允许上传一张，多次上传仅最后一张图会展示'
                : 'Please select a cover image. Note that only one cover image can be uploaded, and only the last image will be displayed after multiple uploads'
            "
            type="info"
          >
          </el-alert>
          <br />
          <input type="file" multiple="multiple" @change="mainImage" />
          <br />
          <el-divider></el-divider>

          <el-alert
            :title="
              lang === 'zh_cn'
                ? '请选择工业遗产详细图片，可以上传多张'
                : 'Please select a detailed picture of industrial heritage. You can upload multiple pictures'
            "
            type="info"
          >
          </el-alert>
          <br />
          <!-- 上传详细图片 -->
          <input type="file" multiple="multiple" @change="addImagesAll" />
          <el-divider></el-divider>

          <div class="subBtn">
            <el-button type="primary" @click="submitForm('ruleForm')"
              >立即创建</el-button
            >
            <el-button @click="resetForm('ruleForm')">清空提示</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import MainTop from "../components/MainTop.vue";
export default {
  components: {
    MainTop,
  },

  computed: {
    ...mapState(["lang", "applyCoordinate"]),
  },

  created() {
    // 将坐标拾取状态改为apply
    this.changeCoordinateType("apply");

    // 赋予经纬度数据
    this.ruleForm.jing = this.applyCoordinate[0];
    this.ruleForm.wei = this.applyCoordinate[1];
  },

  data() {
    return {
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
        prolevel: "", //保护等级及再利用情况（部分有，选择展示）
        trvlevel: "", //工业旅游示范点等级（部分有，选择展示）
        scelevel: null, //旅游景区等级（部分有，选择展示）
        brief: "", //简介
        details: "", //详细介绍
        mainImage: "", //封面图片
        imagesAllurl: [], //相关图片
        coordinate: [],
        approvalStatus: "pending", //待审批状态：pending  adopt reject
        approvalComments: "", //审批意见
        rejectComment: "", //驳回提示
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
        brief: [
          {
            required: true,
            message: "请输入工业遗产简介",
            trigger: "blur",
          },
        ],
        details: [
          {
            required: true,
            message: "请输入工业遗产详细介绍",
            trigger: "blur",
          },
        ],
        jing: [
          {
            required: true,
            message: "请输入工业遗产坐标",
            trigger: "change",
          },
        ],
        wei: [
          {
            required: true,
            message: "请输入工业遗产坐标",
            trigger: "change",
          },
        ],
      },
    };
  },

  methods: {
    ...mapMutations([
      "changeCoordinateType",
      "getCoordinate",
      "getapplyCoordinate",
    ]),

    getapplyCoordinateP() {
      this.getCoordinate([]);
      this.$router.push("/get/coordinate");
    },

    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // alert("submit!");
          if (
            this.ruleForm.mainImage !== "" &&
            this.ruleForm.imagesAllurl.length !== 0
          ) {
            if (this.ruleForm.brief !== "") {
              var re = /\n/g;
              this.ruleForm.brief = this.ruleForm.brief.replace(re, "<br>");

              console.log(this.ruleForm.brief.split("<br>"));
              var arr = this.ruleForm.brief.split("<br>");
              var newarr = arr.map((ele) => "<p class='test'>" + ele + "</p>");
              var newStr = newarr.join("");
              this.ruleForm.brief = newStr;
            } else {
              this.$message.error("请完善遗产简介");
            }
            // 格式化遗产详细介绍
            if (this.ruleForm.details !== "") {
              var re2 = /\n/g;
              this.ruleForm.details = this.ruleForm.details.replace(
                re2,
                "<br>"
              );

              console.log(this.ruleForm.details.split("<br>"));
              var arr2 = this.ruleForm.details.split("<br>");
              var newarr2 = arr2.map(
                (ele) => "<p class='test'>" + ele + "</p>"
              );
              var newStr2 = newarr2.join("");
              this.ruleForm.details = newStr2;
            } else {
              this.$message.error("请完善遗产简介");
            }

            this.ruleForm.coordinate = [this.ruleForm.jing, this.ruleForm.wei];
            // 格式处理完毕
            console.log(this.ruleForm);

            var res = await this.$axios.post(
              "/postApplyHeritageData/postApplyHeritageData",
              this.ruleForm
            );
            console.log("res----", res);
            if (res.status === 200) {
              this.$message({
                message: "申报信息提交成功，请耐心等待审核",
                type: "success",
              });
              this.getapplyCoordinate([]);
              this.getCoordinate([]); //将拾取到的坐标清空
              this.$router.push("/heritage/myapply");
            }
          } else {
            this.$message.error("请上传遗产相关图片");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 封面图片上传
    mainImage(e) {
      const file = e.target.files[0];
      console.log(file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      // var that = this;
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
          console.log(res);
          this.$message({
            message: "图片上传成功",
            type: "success",
          });

          // console.log(this.ruleForm.mainImageurl);
          this.ruleForm.mainImage = res.data.fileID;
        } else {
          this.$message.error("图片上传失败，请检查网络设置");
        }
      };
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