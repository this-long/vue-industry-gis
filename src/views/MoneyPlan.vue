<template>
  <!-- 预算评估 -->
  <div class="money-plan">
    <div class="money-plan-top">
      <MainTop>我要旅行 <span class="gang"> / </span> 预算评估</MainTop>
    </div>
    <div class="money-plan-bottom padding15">
      <el-alert
        title="由于实际出行的诸多不可控因素，评估结果与实际花销或有较大出入，评估结果仅供参考"
        type="info"
      >
      </el-alert>
      <br />
      <div class="form-morey-plan">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="遗产名称" prop="mainType">
            <el-cascader
              class="maincascader"
              size="mini"
              v-model="ruleForm.mainType"
              :options="selOptions"
              placeholder="请选择出行目的地"
            ></el-cascader>
          </el-form-item>
          <div v-if="ruleForm.mainType">
            <el-form-item label="遗产地址">
              <span>{{ ruleForm.mainType[1].address }}</span>
            </el-form-item>
            <el-form-item label="遗产类型">
              <span>{{ ruleForm.mainType[1].addType }}</span>
            </el-form-item>
            <el-form-item label="所属公司">
              <span>{{ ruleForm.mainType[1].company }}</span>
            </el-form-item>
          </div>

          <el-form-item label="距离(公里)" prop="distance">
            <el-input-number
              v-model="ruleForm.distance"
              :min="1"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="出行周期" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker
                  type="date"
                  placeholder="选择时间"
                  v-model="ruleForm.date1"
                  style="width: 100%"
                  value-format="yyyyMMdd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">至</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-date-picker
                  type="date"
                  placeholder="选择时间"
                  v-model="ruleForm.date2"
                  style="width: 100%"
                  value-format="yyyyMMdd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="游玩偏好" prop="playType">
            <el-radio-group v-model="ruleForm.playType">
              <el-radio label="四处逛逛"></el-radio>
              <el-radio label="简单逛逛"></el-radio>
              <el-radio label="看看就走"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出行方式" prop="gotype">
            <el-radio-group v-model="ruleForm.gotype">
              <el-radio label="跟团"></el-radio>
              <el-radio label="自驾游"></el-radio>
              <el-radio label="火车"></el-radio>
              <el-radio label="飞机"></el-radio>
              <el-radio label="大巴"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="住宿(元)" prop="hotel">
            <el-radio-group v-model="ruleForm.hotel">
              <el-radio label="100~300"></el-radio>
              <el-radio label="300~500"></el-radio>
              <el-radio label="500以上"></el-radio>
            </el-radio-group>
          </el-form-item>
          <div>
            <el-form-item label="预计花销">
              <el-tag>{{
                allMoney === "" ? "暂无数据" : allMoney + "元"
              }}</el-tag>
            </el-form-item>
          </div>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >立即评估</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
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
    // console.log(this.$route);
    this.getOptions();
    // var res = await this.$axios.get(
    //   "https://restapi.amap.com/v3/ip?key=f9ad07883aba0cb89e8e2ea081f0a355"
    // );
    // console.log(res);
  },

  data() {
    return {
      // 表单内容start
      ruleForm: {
        mainType: "", //级联选择器选择结果
        distance: 1, //出行距离
        date1: "", //出发时间
        date2: "", //结束时间
        playType: "",
        gotype: "",
        hotel: "", //宾馆价位
      },
      selOptions: [
        {
          value: "工业遗产",
          label: "工业遗产",
          children: [],
        },
        {
          value: "工业博物馆",
          label: "工业博物馆",
          children: [],
        },
        {
          value: "工业旅游区",
          label: "工业旅游区",
          children: [],
        },
      ], //级联选择器数据
      rules: {
        mainType: [
          { required: true, message: "请选择出行目的地", trigger: "change" },
        ],
        distance: [
          { required: true, message: "请输入出行距离", trigger: "change" },
        ],
        date1: [
          {
            required: true,
            message: "请选择出发时间",
            trigger: "change",
          },
        ],
        date2: [
          {
            required: true,
            message: "请选择返回时间",
            trigger: "change",
          },
        ],
        playType: [
          {
            required: true,
            message: "请选择一个游玩偏好",
            trigger: "change",
          },
        ],
        gotype: [
          { required: true, message: "请选择出行方式", trigger: "change" },
        ],
        hotel: [
          { required: true, message: "请选择住宿条件价位", trigger: "change" },
        ],
      },
      allMoney: "", //所有出行花销
      // 表单内容end
    };
  },

  methods: {
    submitForm(formName) {
      console.log(this.ruleForm);

      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.date2 > this.ruleForm.date1) {
            console.log(this.ruleForm);
            if (this.ruleForm.distance < 40) {
              this.$message({
                showClose: true,
                message: "您的出行距离较小，请注意检查是否正确",
              });
            }

            // 计算日期差
            var year1 = parseFloat(this.ruleForm.date1.slice(0, 4));
            var year2 = parseFloat(this.ruleForm.date2.slice(0, 4));
            var mon1 = parseFloat(this.ruleForm.date1.slice(4, 6));
            var mon2 = parseFloat(this.ruleForm.date2.slice(4, 6));
            var day1 = parseFloat(this.ruleForm.date1.slice(6));
            var day2 = parseFloat(this.ruleForm.date2.slice(6));
            // console.log(year1, mon1, day1);
            // console.log("day1,day2", day1, day2);
            if (year2 - year1 > 0) {
              mon2 = mon2 + 12 * (year2 - year1);
              // console.log(1);
            }
            if (mon2 - mon1 > 0) {
              day2 = day2 + 30 * (mon2 - mon1);
              console.log("mon2 - mon1", mon2 - mon1);
              // console.log(day2);
            }

            var days = day2 - day1;
            // console.log("日期差", days);
            var shuijishu = Math.floor(Math.random() * (100 - 1) + 1);
            var allMoney = shuijishu + 100;
            if (
              this.ruleForm.gotype === "跟团" ||
              this.ruleForm.gotype === "火车"
            ) {
              allMoney = allMoney + this.ruleForm.distance;
            } else if (
              this.ruleForm.gotype === "大巴" ||
              this.ruleForm.gotype === "飞机"
            ) {
              allMoney = allMoney + this.ruleForm.distance * 2;
            } else if (this.ruleForm.gotype === "火车") {
              allMoney = allMoney + this.ruleForm.distance * 3;
            }

            if (this.ruleForm.playType === "四处逛逛") {
              allMoney = allMoney + 1000;
            } else if (this.ruleForm.playType === "简单逛逛") {
              allMoney = allMoney + 500;
            } else if (this.ruleForm.playType === "看看就走") {
              allMoney = allMoney + 300;
            }

            if (this.ruleForm.hotel === "100~300") {
              allMoney = allMoney + 200 * days;
            } else if (this.ruleForm.hotel === "300~500") {
              allMoney = allMoney + 400 * days;
            } else if (this.ruleForm.hotel === "500以上") {
              allMoney = allMoney + 700 * days;
            }

            console.log("所有花销", allMoney);
            this.allMoney = allMoney;
            this.$notify({
              title: "成功",
              message: "预算评估成功",
              type: "success",
            });
          } else {
            this.$message({
              showClose: true,
              message: "结束时间请晚于开始时间",
              type: "warning",
            });
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

    // 初始化级联选择器数据
    async getOptions() {
      var res1 = await this.$axios.get(
        "/getHeritageMainData/getHeritageMainData"
      );
      // console.log("工业遗产", res1);
      this.selOptions[0].children = res1.data.data.map((ele) => {
        return {
          value: ele,
          label: ele.name,
        };
      });

      var res2 = await this.$axios.get("/getHeritageMuseum/getHeritageMuseum");
      // console.log("工业bwguan", res2);

      this.selOptions[1].children = res2.data.data.map((ele) => {
        return {
          value: ele,
          label: ele.name,
        };
      });

      var res3 = await this.$axios.get(
        "/getHeritageTourism/getHeritageTourism"
      );

      this.selOptions[2].children = res3.data.data.map((ele) => {
        return {
          value: ele,
          label: ele.name,
        };
      });
      // console.log("all", this.selOptions);
    },
  },
};
</script>

<style>
.money-plan .line {
  text-align: center;
}
</style>
