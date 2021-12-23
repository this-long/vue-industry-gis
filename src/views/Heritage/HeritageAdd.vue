<template>
  <!-- 工业遗产等三项内容添加 -->
  <div class="HeritageAdd">
    <div class="HeritageAdd-top">
      <MainTop
        >{{ lang === "zh_cn" ? "数据维护" : "Data maintenance" }}
        <span class="gang"> / </span>
        {{ lang === "zh_cn" ? "遗产管理" : "Heritage Management"
        }}<span class="gang"> / </span>
        {{ lang === "zh_cn" ? "遗产添加" : "Heritage Add" }}</MainTop
      >
    </div>

    <div class="HeritageAdd-bottom padding15">
      <el-alert
        :title="
          lang === 'zh_cn'
            ? '填写工业遗产、博物馆或工业旅游区的相关信息来添加一项遗产数据'
            : 'Fill in information about industrial heritage, museums or industrial tourist areas to add a heritage data'
        "
        type="info"
      >
      </el-alert>
      <br v-show="newCoordinate.length === 0" />
      <el-alert
        :title="
          lang === 'zh_cn'
            ? '请先拾取要添加的工业遗产的地理坐标'
            : 'Please pick the geographical coordinates of the industrial heritage to be added first'
        "
        type="info"
        v-show="newCoordinate.length === 0"
      >
      </el-alert>

      <br />
      <el-button
        type="primary"
        @click="getCoordinateP"
        v-show="newCoordinate.length === 0"
        >拾取遗产坐标位置</el-button
      >

      <div class="main-box" v-show="newCoordinate.length !== 0">
        <el-form
          size="mini"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
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
            <el-button @click="getCoordinateP" style="margin-left: 10px"
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
        </el-form>

        <el-divider></el-divider>
        <el-alert
          :title="
            lang === 'zh_cn'
              ? '请选择封面图片，注意封面图片仅允许上传一张，多次上传仅最后一张图会展示。为保证上传成功，图片大小建议小于3MB'
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
              ? '请选择工业遗产详细图片，可以上传多张。为保证上传成功，图片大小建议小于3MB'
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
      </div>
    </div>

    <div class="HeritageAdd-images"></div>
  </div>
</template>

<script>
import MainTop from "../../components/MainTop.vue";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    MainTop,
  },
  name: "HeritageAdd",

  computed: {
    ...mapState(["lang"]),
    ...mapState(["newCoordinate", "instryType"]),
  },
  async created() {
    // 将坐标拾取状态改为add
    this.changeCoordinateType("add");
    console.log(this.$route);
    if (this.$route.params.editid !== "add") {
      var res = "";

      if (this.instryType === "one") {
        res = await this.$axios.post(
          "https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/mainFun/getOneHeritageMainData/getOneHeritageMainData",
          {
            _id: this.$route.params.editid,
          }
        );
      } else if (this.instryType === "two") {
        res = await this.$axios.post(
          "https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/mainFun/getOneHeritageMuseum/getOneHeritageMuseum",
          {
            _id: this.$route.params.editid,
          }
        );
      } else if (this.instryType === "three") {
        res = await this.$axios.post(
          "https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/mainFun/getOneHeritageTourism/getOneHeritageTourism",
          {
            _id: this.$route.params.editid,
          }
        );
      }

      console.log(res.data.data);

      this.ruleForm = res.data.data[0];
      this.getCoordinate(res.data.data[0].coordinate);
    } else {
      this.ruleForm.jing = this.newCoordinate[0];
      this.ruleForm.wei = this.newCoordinate[1];
    }
  },
  data() {
    return {
      ruleForm: {
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
      },
      // imgobj: {},
      rules: {
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
            trigger: "change",
          },
        ],
        type: [
          {
            required: true,
            message: "请输入工业遗产类型",
            trigger: "change",
          },
        ],
        company: [
          {
            required: true,
            message: "请输入工业遗产所属公司",
            trigger: "change",
          },
        ],
        start: [
          {
            required: true,
            message: "请选择遗产始建年份",
            trigger: "change",
          },
        ],
        brief: [
          {
            required: true,
            message: "请输入工业遗产简介",
            trigger: "change",
          },
        ],
        details: [
          {
            required: true,
            message: "请输入工业遗产详细介绍",
            trigger: "change",
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
      "getCoordinate",
      "changeCoordinateType",
      "getapplyCoordinate",
    ]),

    //跳转页面拾取坐标位置
    getCoordinateP() {
      this.getapplyCoordinate([]);
      this.$router.push("/get/coordinate");
    },

    //获取文本域内容并并自动换行缩进
    formatTextarea(textarea) {
      var re = /\n/g;
      textarea = textarea.replace(re, "<br>");

      console.log(textarea.split("<br>"));
      var arr = textarea.split("<br>");
      var newarr = arr.map((ele) => "<p class='test'>" + ele + "</p>");
      var newStr = newarr.join("");
      textarea = newStr;
      console.log();
    },

    submitForm(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // alert("submit!");
          if (
            this.ruleForm.mainImage !== "" &&
            this.ruleForm.imagesAllurl.length !== 0
          ) {
            // 格式化遗产简介
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
            // 格式已经处理完毕，下面发送请求

            // 发送请求;
            if (this.$route.params.editid !== "add") {
              // 编辑部分
              if (this.ruleForm.addType === "工业遗产") {
                var res = await this.$axios.post(
                  "https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/mainFun/editHeritageMainData/editHeritageMainData",
                  this.ruleForm
                );
                console.log("res====", res);
                if (res.status === 200) {
                  this.$message({
                    message: "工业遗产信息编辑成功",
                    type: "success",
                  });
                  this.getCoordinate([]); //将拾取到的坐标清空
                  this.$router.push("/data/manage");
                }
              }
              // --------------
              if (this.ruleForm.addType === "遗产博物馆") {
                res = await this.$axios.post(
                  "https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/mainFun/editHeritageMuseum/editHeritageMuseum",
                  this.ruleForm
                );
                console.log("res====", res);
                if (res.status === 200) {
                  this.$message({
                    message: "遗产博物馆信息编辑成功",
                    type: "success",
                  });
                  this.getCoordinate([]); //将拾取到的坐标清空
                  this.$router.push("/data/manage");
                }
              }
              // --------------

              if (this.ruleForm.addType === "工业旅游区") {
                res = await this.$axios.post(
                  "https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/mainFun/editHeritageTourism/editHeritageTourism",
                  this.ruleForm
                );
                console.log("res====", res);
                if (res.status === 200) {
                  this.$message({
                    message: "工业旅游区信息编辑成功",
                    type: "success",
                  });
                  this.getCoordinate([]); //将拾取到的坐标清空
                  this.$router.push("/data/manage");
                }
              }
            } else {
              // 添加部分
              if (this.ruleForm.addType === "工业遗产") {
                var res2 = await this.$axios.post(
                  "https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/mainFun/postHeritageMainData/postHeritageMainData",
                  this.ruleForm
                );
                // console.log("res====", res2);
                if (res2.status === 200) {
                  this.$message({
                    message: "工业遗产信息添加成功",
                    type: "success",
                  });
                  this.getCoordinate([]); //将拾取到的坐标清空
                  this.$router.push("/data/manage");
                }
              } else if (this.ruleForm.addType === "遗产博物馆") {
                // console.log(1);

                var resMuseum = await this.$axios.post(
                  "https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/mainFun/postHeritageMuseum/postHeritageMuseum",
                  this.ruleForm
                );
                // console.log("res====", res2);
                if (resMuseum.status === 200) {
                  this.$message({
                    message: "遗产博物馆信息添加成功",
                    type: "success",
                  });
                  this.getCoordinate([]); //将拾取到的坐标清空
                  this.$router.push("/data/manage");
                }
              } else if (this.ruleForm.addType === "工业旅游区") {
                var resTourism = await this.$axios.post(
                  "https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/mainFun/postHeritageTourism/postHeritageTourism",
                  this.ruleForm
                );
                // console.log("res====", res2);
                if (resTourism.status === 200) {
                  this.$message({
                    message: "工业旅游区信息添加成功",
                    type: "success",
                  });
                  this.getCoordinate([]); //将拾取到的坐标清空
                  this.$router.push("/data/manage");
                }
              }
            }
          } else {
            this.$message.error("请上传遗产相关图片");
          }

          console.log(this.ruleForm);
        } else {
          this.$message.error("请检查完善相关信息");
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
/* .HeritageAdd {
  overflow: auto;
} */
</style>