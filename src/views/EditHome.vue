<template>
  <!-- 主页编辑维护 -->
  <div class="my-approve">
    <div class="my-approve-top">
      <MainTop>数据维护 <span class="gang"> / </span> 遗产主页编辑</MainTop>
    </div>
    <div class="my-approve-bottom padding15">
      <el-button type="primary" size="small" @click="dialogFormVisible = true"
        >添加要闻</el-button
      >
      <br />
      <br />
      <!-- 添加或编辑用表单start -->
      <el-dialog
        title="添加 \ 编辑要闻"
        :visible.sync="dialogFormVisible"
        width="75%"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="要闻名称">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入要闻名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="要闻类型">
            <el-select v-model="ruleForm.region" placeholder="请选择要闻类型">
              <el-option label="政策" value="政策"></el-option>
              <el-option label="通知" value="通知"></el-option>
              <el-option label="综述" value="综述"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="要闻详情">
            <el-input
              v-model="ruleForm.mainText"
              type="textarea"
              placeholder="请输入要闻详情，注意格式排版"
              :autosize="{ minRows: 10 }"
            ></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加或编辑用表单end -->
      <!-- 数据表格start -->
      <el-table :data="tableList" height="600" border style="width: 100%">
        <el-table-column type="index" label="序号" width="100" align="center">
        </el-table-column>
        <el-table-column prop="date1" label="日期" width="180" align="center">
        </el-table-column>
        <el-table-column prop="name" label="要闻标题"> </el-table-column>
        <el-table-column prop="region" label="类型" width="100" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.region === '政策'">政策</el-tag>
            <el-tag v-if="scope.row.region === '通知'" type="success"
              >通知</el-tag
            >
            <el-tag v-if="scope.row.region === '综述'" type="info">综述</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="getNoticeMain(scope)"
              >查看</el-button
            >
            <el-button size="mini" type="warning" @click="editNoticeMain(scope)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="removeNoticeMain(scope)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- end -->
    </div>
  </div>
</template>

<script>
import MainTop from "../components/MainTop.vue";
export default {
  components: {
    MainTop,
  },

  watch: {
    dialogFormVisible(newValue) {
      // console.log(newValue);
      if (!newValue) {
        this.isEdit = false;
        console.log("取消了编辑装填");
        this.ruleForm = {
          name: "",
          region: "", //类型
          date1: "", //时间
          // date2: "",
          mainText: "",
          mainTextP: "",
        };
      }
    },
  },

  data() {
    return {
      noticeList: [],
      tableList: [],
      nowTime: "",
      date: null, //时间对象
      dialogFormVisible: false,
      ruleForm: {
        name: "",
        region: "", //类型
        date1: "", //时间
        // date2: "",
        mainText: "",
        mainTextP: "",
      },
      isEdit: false,
      formLabelWidth: "120px",
      // 表单验证规则

      rules: {
        name: [
          { required: true, message: "请输入要闻信息名称", trigger: "change" },
        ],
        region: [
          { required: true, message: "请选择要闻信息类型", trigger: "change" },
        ],
        mainText: [
          {
            required: true,
            message: "请输入要闻信息详细内容，注意格式排版",
            trigger: "change",
          },
        ],
      },
      // end
    };
  },

  created() {
    // this.nowTime;
    this.date = new Date();
    // console.log(this.date.getFullYear());
    // console.log(this.date.getMonth());
    // console.log(this.date.getDate());
    // console.log(this.date.getHours());
    // console.log(this.date.getMinutes());
    this.nowTime = `${this.date.getFullYear()}-${
      this.date.getMonth() + 1
    }-${this.date.getDate()}`;
    console.log(this.nowTime);

    this.getNoticeList();
  },

  methods: {
    async submitForm() {
      if (
        this.ruleForm.name === "" ||
        this.ruleForm.region === "" ||
        this.ruleForm.mainText === ""
      ) {
        this.$message({
          message: "请检查内容是否已全部填写",
          type: "warning",
        });
      } else {
        // 格式化文章内容start
        var re = /\n/g;
        var oldstr = this.ruleForm.mainText;
        this.ruleForm.mainText = this.ruleForm.mainText.replace(re, "<br>");

        console.log(this.ruleForm.mainText.split("<br>"));
        var arr = this.ruleForm.mainText.split("<br>");
        var newarr = arr.map((ele) => "<p class='test'>" + ele + "</p>");
        var newStr = newarr.join("");
        this.ruleForm.mainTextP = newStr;
        this.ruleForm.mainText = oldstr;
        console.log(this.ruleForm);
        this.ruleForm.date1 = this.nowTime;

        if (!this.isEdit) {
          var res = await this.$axios.post(
            "/postNoticeList/postNoticeList",
            this.ruleForm
          );
          console.log(res);
          if (res.status === 200) {
            this.$message({
              message: "首页要闻信息添加成功",
              type: "success",
            });
            this.dialogFormVisible = false;
            this.getNoticeList();
            this.ruleForm = {
              name: "",
              region: "", //类型
              date1: "", //时间
              // date2: "",
              mainText: "",
              mainTextP: "",
            };
          } else {
            this.$message({
              message: "添加失败，请检查网络或刷新页面重试",
              type: "danger",
            });
          }
        } else {
          var resedit = await this.$axios.post(
            "/editNoticeList/editNoticeList",
            this.ruleForm
          );
          console.log("resedit", resedit);
          if (resedit.status === 200) {
            this.$message({
              message: "首页要闻信息编辑成功",
              type: "success",
            });
            this.dialogFormVisible = false;
            this.getNoticeList();
            this.ruleForm = {
              name: "",
              region: "", //类型
              date1: "", //时间
              // date2: "",
              mainText: "",
              mainTextP: "",
            };
          } else {
            this.$message({
              message: "编辑失败，请检查网络或刷新页面重试",
              type: "danger",
            });
          }
        }

        // end
      }
    },

    // 获取列表
    async getNoticeList() {
      var res = await this.$axios.get("/getNoticeList/getNoticeList");
      console.log(res);
      this.noticeList = res.data.data;
      this.tableList = res.data.data;
    },

    getNoticeMain(row) {
      console.log(row);
      this.$router.push({
        path: "/main/noticemain?_id=" + row.row._id,
      });
    },

    // 编辑工业遗产
    editNoticeMain(row) {
      console.log(row);
      this.ruleForm = row.row;
      this.dialogFormVisible = true;
      this.isEdit = true;
    },

    // 删除单条
    async removeNoticeMain(row) {
      var res = await this.$axios.post(
        "/removeOneNoticeList/removeOneNoticeList",
        {
          _id: row.row._id,
        }
      );

      if (res.status === 200) {
        this.$message({
          message: "首页要闻信息删除成功",
          type: "success",
        });

        this.getNoticeList();
      } else {
        this.$message({
          message: "删除失败，请检查网络或刷新页面重试",
          type: "danger",
        });
      }
    },
  },
};
</script>

<style>
</style>