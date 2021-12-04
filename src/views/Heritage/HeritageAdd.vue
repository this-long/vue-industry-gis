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
        @click="getCoordinate"
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
            <el-rate v-model="ruleForm.scelevel" show-text> </el-rate>
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

        <div class="subBtn">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </div>
    </div>

    <div class="HeritageAdd-images"></div>
  </div>
</template>

<script>
import MainTop from "../../components/MainTop.vue";
import { mapState } from "vuex";

export default {
  components: {
    MainTop,
  },
  name: "HeritageAdd",

  computed: {
    ...mapState(["lang"]),
    ...mapState(["newCoordinate"]),
  },
  created() {
    // console.log(this.$route);
  },
  data() {
    return {
      ruleForm: {
        addType: "", //添加类型
        name: "", //遗产名称
        address: "", //遗产地址

        type: "", //类型
        company: "", //所属公司
        start: "", //年份
        prolevel: "", //保护等级及再利用情况（部分有，选择展示）
        trvlevel: "", //工业旅游示范点等级（部分有，选择展示）
        scelevel: null, //旅游景区等级（部分有，选择展示）
        brief: "", //简介
        details: "", //详细介绍
        imagesAll: [], //相关图片
      },
      imgobj: {},
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
      },
    };
  },
  methods: {
    //跳转页面拾取坐标位置
    getCoordinate() {
      this.$router.push("/get/coordinate");
    },
    submitForm(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          console.log(this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
/* .HeritageAdd {
  overflow: auto;
} */
</style>