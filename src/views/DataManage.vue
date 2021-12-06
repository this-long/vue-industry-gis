<template>
  <!-- 数据管理 -->
  <div class="data-manage">
    <div class="data-manage-top">
      <MainTop>数据维护 <span class="gang"> / </span> 遗产管理</MainTop>
    </div>
    <div class="data-manage-bottom padding15">
      <div class="data-manage-buttons">
        <!-- 按钮组 -->
        <!-- <el-tag>遗产总数:{{ 1 }}</el-tag> -->
        <span style="margin-right: 15px">
          遗产总数:{{ tableData.length }}
        </span>
        <el-button @click="addHeritage" type="primary" size="small"
          >添加遗产</el-button
        >

        <el-input
          style="width: 300px; margin-left: 15px"
          placeholder="请输入关键词"
          v-model="searchStr"
          size="small"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchClick"
          ></el-button>
        </el-input>
        <br />
        <br />

        <!-- 工业遗产详情及表格 -->
        <el-tabs
          v-model="activeName"
          type="border-card"
          @tab-click="changeDataType"
        >
          <el-tab-pane label="工业遗产" name="first">
            <el-table
              border
              stripe
              :data="tableData"
              style="width: 100%"
              height="480"
            >
              <el-table-column
                prop="start"
                label="始建"
                width="60"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="name" label="工业遗产名称" width="180">
              </el-table-column>
              <el-table-column prop="address" label="地址"> </el-table-column>
              <el-table-column
                prop="type"
                align="center"
                label="遗产类型"
                width="100"
              >
              </el-table-column>
              <el-table-column
                prop="addType"
                width="100"
                align="center"
                label="所属分类"
              >
              </el-table-column>
              <el-table-column prop="company" label="公司"> </el-table-column>

              <el-table-column label="操作" align="center" width="150">
                <template slot-scope="scope">
                  <el-button
                    @click="getMain(scope.row)"
                    type="text"
                    size="small"
                    >查看</el-button
                  >
                  <el-button
                    type="text"
                    @click="editMain(scope.row)"
                    size="small"
                    >编辑</el-button
                  >
                  <el-button
                    type="text"
                    size="small"
                    @click="delMain(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="工业博物馆" name="second">
            <el-table
              border
              stripe
              :data="tableData"
              style="width: 100%"
              height="480"
            >
              <el-table-column
                prop="start"
                label="始建"
                width="60"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="name" label="工业博物馆名称" width="180">
              </el-table-column>
              <el-table-column prop="address" label="地址"> </el-table-column>
              <el-table-column
                prop="type"
                align="center"
                label="博物馆类型"
                width="100"
              >
              </el-table-column>
              <el-table-column
                prop="addType"
                width="100"
                align="center"
                label="所属分类"
              >
              </el-table-column>
              <el-table-column prop="company" label="公司"> </el-table-column>

              <el-table-column label="操作" align="center" width="150">
                <template slot-scope="scope">
                  <el-button
                    @click="getMain(scope.row)"
                    type="text"
                    size="small"
                    >查看</el-button
                  >
                  <el-button
                    type="text"
                    @click="editMain(scope.row)"
                    size="small"
                    >编辑</el-button
                  >
                  <el-button
                    type="text"
                    size="small"
                    @click="delMain(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="工业旅游区" name="third">
            <el-table
              border
              stripe
              :data="tableData"
              style="width: 100%"
              height="480"
            >
              <el-table-column
                prop="start"
                label="始建"
                width="60"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="name" label="工业旅游区名称" width="180">
              </el-table-column>
              <el-table-column prop="address" label="地址"> </el-table-column>
              <el-table-column
                prop="type"
                align="center"
                label="景区类型"
                width="100"
              >
              </el-table-column>
              <el-table-column
                prop="addType"
                width="100"
                align="center"
                label="所属分类"
              >
              </el-table-column>
              <el-table-column prop="company" label="公司"> </el-table-column>

              <el-table-column label="操作" align="center" width="150">
                <template slot-scope="scope">
                  <el-button
                    @click="getMain(scope.row)"
                    type="text"
                    size="small"
                    >查看</el-button
                  >
                  <el-button
                    type="text"
                    @click="editMain(scope.row)"
                    size="small"
                    >编辑</el-button
                  >
                  <el-button
                    type="text"
                    size="small"
                    @click="delMain(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import MainTop from "../components/MainTop.vue";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    MainTop,
  },

  data() {
    return {
      activeName: "first",

      tableData: [],

      searchStr: "",
    };
  },

  async created() {
    // 初始化数据
    var res = await this.$axios.get("/getHeritageMainData/getHeritageMainData");
    this.tableData = res.data.data;
    this.changeinstryType("one");
  },

  computed: {
    ...mapState(["instryType"]),
  },

  methods: {
    ...mapMutations(["changeinstryType", "getCoordinate"]),
    addHeritage() {
      this.getCoordinate([]);
      this.$router.push("/heritage/add/add");
    },

    async changeDataType() {
      // console.log(tab, event);
      if (this.activeName === "first") {
        var res = await this.$axios.get(
          "/getHeritageMainData/getHeritageMainData"
        );
        this.tableData = res.data.data;
        this.changeinstryType("one");
      } else if (this.activeName === "second") {
        var resMus = await this.$axios.get(
          "/getHeritageMuseum/getHeritageMuseum"
        );
        this.tableData = resMus.data.data;
        this.changeinstryType("two");
      } else if (this.activeName === "third") {
        var resTir = await this.$axios.get(
          "/getHeritageTourism/getHeritageTourism"
        );
        this.tableData = resTir.data.data;
        this.changeinstryType("three");
      }
      // console.log(this.tableData);
    },

    // 表格start
    // 查看详情
    getMain(row) {
      console.log(row);
      this.$router.push("/heritage/industry/main/" + row._id);
    },

    // 编辑按钮
    editMain(row) {
      console.log(row);
      this.$router.push("/heritage/add/" + row._id);
    },

    // 模糊查询按钮
    async searchClick() {
      if (this.searchStr) {
        // this.changeDataType();

        var res1 = "";
        if (this.instryType === "one") {
          res1 = await this.$axios.get(
            "/getHeritageMainData/getHeritageMainData"
          );
        } else if (this.instryType === "two") {
          res1 = await this.$axios.get("/getHeritageMuseum/getHeritageMuseum");
        } else if (this.instryType === "three") {
          res1 = await this.$axios.get(
            "/getHeritageTourism/getHeritageTourism"
          );
        }

        this.tableData = res1.data.data;

        var newtableData = this.tableData.filter((ele) =>
          ele.name.includes(this.searchStr)
        );

        this.tableData = newtableData;
      } else {
        var res = "";
        if (this.instryType === "one") {
          res = await this.$axios.get(
            "/getHeritageMainData/getHeritageMainData"
          );
        } else if (this.instryType === "two") {
          res = await this.$axios.get("/getHeritageMuseum/getHeritageMuseum");
        } else if (this.instryType === "three") {
          res = await this.$axios.get("/getHeritageTourism/getHeritageTourism");
        }

        this.tableData = res.data.data;
      }

      // console.log(newtableData);
    },

    async delMain(row) {
      // console.log(row, this.instryType);
      var res = "";
      if (this.instryType === "one") {
        res = await this.$axios.post(
          "/removeOneHeritageMainData/removeOneHeritageMainData",
          row
        );
      } else if (this.instryType === "two") {
        res = await this.$axios.post(
          "/removeOneHeritageMuseum/removeOneHeritageMuseum",
          row
        );
      } else if (this.instryType === "three") {
        res = await this.$axios.post(
          "/removeOneHeritageTourism/removeOneHeritageTourism",
          row
        );
      }

      if (res.status === 200) {
        this.$message({
          message: "信息删除成功",
          type: "success",
        });
      }

      // 重新获取数据
      var res1 = "";
      if (this.instryType === "one") {
        res1 = await this.$axios.get(
          "/getHeritageMainData/getHeritageMainData"
        );
      } else if (this.instryType === "two") {
        res1 = await this.$axios.get("/getHeritageMuseum/getHeritageMuseum");
      } else if (this.instryType === "three") {
        res1 = await this.$axios.get("/getHeritageTourism/getHeritageTourism");
      }

      this.tableData = res1.data.data;
    },
  },
};
</script>

<style>
</style>