<template>
  <!-- 我的报修 -->
  <div class="my-apply">
    <div class="my-apply-top">
      <MainTop>遗产申请 <span class="gang"> / </span> 我的报修</MainTop>
    </div>
    <div class="my-apply-bottom padding15">
      <div class="my-apply-buttons">
        <el-button type="primary" @click="allClick">全部申请</el-button>
        <el-button type="primary" @click="isendClick">已完成</el-button>
        <el-button type="primary" @click="rejectClick">已驳回</el-button>
        <el-button type="primary" @click="pendClick">待审批</el-button>
        <el-button type="primary" @click="adoptClick">维修中</el-button>
      </div>
      <br />
      <el-table
        border
        stripe
        :data="tableData"
        style="width: 100%"
        height="550"
      >
        <el-table-column type="index" width="60" align="center">
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
        <el-table-column prop="phone" label="联系方式" width="130">
        </el-table-column>
        <el-table-column prop="repairType" label="报修类型"> </el-table-column>
        <el-table-column label="审批状态" width="100" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.approvalStatus === 'pending'" type="info"
              >待审批</el-tag
            >
            <el-tag v-if="scope.row.approvalStatus === 'adopt'" type="warning"
              >处理中</el-tag
            >
            <el-tag v-if="scope.row.approvalStatus === 'reject'" type="danger"
              >已驳回</el-tag
            >
            <el-tag v-if="scope.row.approvalStatus === 'isend'" type="success"
              >已完成</el-tag
            >
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button @click="getApply(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button
              v-if="scope.row.approvalStatus === 'reject'"
              type="text"
              @click="editApply(scope.row)"
              size="small"
              >编辑</el-button
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

  data() {
    return {
      tableData: [],
      listData: [], //存储列表数据
    };
  },

  created() {
    this.getAllData();
  },

  methods: {
    async getAllData() {
      var res = await this.$axios.get("/getApplyRepairData/getApplyRepairData");
      this.tableData = res.data.data.filter(
        (ele) => ele.user === sessionStorage.getItem("username")
      );
      this.listData = res.data.data.filter(
        (ele) => ele.user === sessionStorage.getItem("username")
      );
      console.log(this.listData);
    },

    getApply(row) {
      console.log(row);
      this.$router.push({
        path: "/repair/my/applyRepairMain",
        query: {
          _id: row._id,
        },
      });
    },

    // 编辑按钮
    editApply(row) {
      console.log(row);

      this.$router.push({
        path: "/repair/apply/main",
        query: { applyId: row._id },
      });
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
    isendClick() {
      this.tableData = this.listData.filter(
        (ele) => ele.approvalStatus === "isend"
      );
    },
  },
};
</script>

<style>
</style>
