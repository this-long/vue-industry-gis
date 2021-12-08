<template>
  <!-- 遗产报修 -->
  <div class="heritage-repair">
    <div class="heritage-repair-top">
      <MainTop>遗产申请 <span class="gang"> / </span> 遗产报修</MainTop>
    </div>
    <div class="heritage-repair-bottom padding15">
      <el-alert
        :title="
          lang === 'zh_cn'
            ? '请确保报修信息真实有效，否则您的申请可能会不被通过'
            : 'Please ensure that the repair information is true and valid, otherwise your application may not be passed'
        "
        type="info"
      >
      </el-alert>

      <br />
      <el-input
        placeholder="请输入关键词"
        v-model="searchStr"
        class="input-with-select"
        style="width: 400px"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="srarchString"
        ></el-button>
      </el-input>

      <br />
      <br />
      <el-tabs
        type="border-card"
        v-model="activeName"
        @tab-click="changeHeritage"
      >
        <el-tab-pane label="工业遗产报修" name="first">
          <el-table
            border
            stripe
            :data="tableData"
            style="width: 100%"
            height="420"
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
                <el-button @click="getMain(scope.row)" type="text" size="small"
                  >查看</el-button
                >
                <el-button
                  type="text"
                  @click="addRepair(scope.row)"
                  size="small"
                  >我要报修</el-button
                >
              </template>
            </el-table-column>
          </el-table></el-tab-pane
        >
        <el-tab-pane label="遗产博物馆报修" name="two"
          >遗产博物馆报修</el-tab-pane
        >
        <el-tab-pane label="工业旅游区报修" name="three"
          >工业旅游区报修</el-tab-pane
        >
      </el-tabs>
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

  computed: {
    ...mapState(["lang"]),
  },

  data() {
    return {
      activeName: "first",
      tableData: [],
      listData: [],
      searchStr: "",
    };
  },

  created() {
    this.getTableData();
    this.changeinstryType("first");
  },

  methods: {
    ...mapMutations(["changeinstryType"]),

    async getTableData() {
      var res = "";
      if (this.activeName === "first") {
        res = await this.$axios.get("/getHeritageMainData/getHeritageMainData");
        this.changeinstryType("one");
      } else if (this.activeName === "two") {
        res = await this.$axios.get("/getHeritageMuseum/getHeritageMuseum");
        this.changeinstryType("two");
      } else if (this.activeName === "three") {
        res = await this.$axios.get("/getHeritageTourism/getHeritageTourism");
        this.changeinstryType("three");
      }
      console.log(res);
      this.tableData = res.data.data;
      this.listData = res.data.data;
    },

    changeHeritage() {
      // console.log(this.activeName);
      // const { activeName } = this;
      this.getTableData();
    },

    srarchString() {
      if (this.searchStr) {
        this.tableData = this.listData.filter((ele) =>
          ele.name.includes(this.searchStr)
        );
      } else {
        this.tableData = this.listData;
      }
    },

    // 查看详情
    getMain(row) {
      // console.log(row);
      this.$router.push("/heritage/industry/main/" + row._id);
    },

    addRepair(row) {
      console.log(row);
      this.$router.push({
        path: "/repair/apply/main",
        query: {
          addType: row.addType,
          _id: row._id,
        },
      });
    },
  },
};
</script>

<style>
</style>