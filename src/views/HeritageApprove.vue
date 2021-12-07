<template>
  <!-- 遗产申请审批 -->
  <div class="my-approve">
    <div class="my-approve-top">
      <MainTop>我的审核 <span class="gang"> / </span> 遗产申请</MainTop>
    </div>
    <div class="my-approve-bottom padding15">
      <div class="my-approve-btns">
        <el-button type="primary" @click="allClick">全部申请</el-button>
        <el-button type="primary" @click="adoptClick">已通过</el-button>
        <el-button type="primary" @click="rejectClick">已驳回</el-button>
        <el-button type="primary" @click="pendClick">待审批</el-button>
      </div>
      <br />
      <el-table
        border
        stripe
        :data="tableData"
        style="width: 100%"
        height="550"
      >
        <el-table-column align="center" type="index" label="序号" width="50">
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
        <el-table-column prop="phone" label="联系方式" width="150">
        </el-table-column>
        <el-table-column
          prop="applyName"
          label="申请人"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column label="审批状态" width="100" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.approvalStatus === 'pending'" type="info"
              >待审批</el-tag
            >
            <el-tag v-if="scope.row.approvalStatus === 'adopt'" type="success"
              >已通过</el-tag
            >
            <el-tag v-if="scope.row.approvalStatus === 'reject'" type="danger"
              >已驳回</el-tag
            >
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.approvalStatus === 'pending'"
              @click="getApply(scope.row)"
              type="text"
              size="small"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
    this.getAllData();
  },

  data() {
    return {
      tableData: [],
      listData: [], //存储列表数据
    };
  },

  methods: {
    // 获取申请列表信息
    async getAllData() {
      var res = await this.$axios.get(
        "/getApplyHeritageData/getApplyHeritageData"
      );
      this.tableData = res.data.data;
      this.listData = res.data.data;
      console.log(this.tableData);
    },

    getApply(row) {
      console.log(row);
      this.$router.push("/heritage/my/approve/" + row._id);
    },

    // 分类按钮
    allClick() {
      this.tableData = this.listData;
    },

    // 待审批
    pendClick() {
      this.tableData = this.listData.filter(
        (ele) => ele.approvalStatus === "pending"
      );
    },

    // 通过
    adoptClick() {
      this.tableData = this.listData.filter(
        (ele) => ele.approvalStatus === "adopt"
      );
    },

    // 驳回
    // 通过
    rejectClick() {
      this.tableData = this.listData.filter(
        (ele) => ele.approvalStatus === "reject"
      );
    },
  },
};
</script>

<style>
</style>