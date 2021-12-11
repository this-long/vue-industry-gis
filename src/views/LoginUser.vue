<template>
  <div class="ligin-user">
    <div class="ligin-user-right">
      <h1>欢迎登陆</h1>
      <span class="span"
        >没有帐户？点击 <a href="/#/heritage/postUser">注册</a></span
      >
      <br />
      <br />
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
      </el-form>
      <br />

      <div class="submit">
        <el-button
          @click="submitForm('ruleForm')"
          type="primary"
          round
          style="width: 60%; color: white; margin: 0 auto"
          >登陆</el-button
        >
      </div>
      <br />
      <br />
    </div>
    <div class="ligin-user-left">
      <h1 class="title">河北工业遗产保护开发</h1>
      <p class="title">用科技让工业遗产焕发新生</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [],

      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  async created() {
    var res = await this.$axios.get("/getAllUsers/getAllUsers");
    this.userList = res.data.data;
    console.log(this.userList);
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //   console.log(this.ruleForm);
          if (
            this.userList.some(
              (ele) =>
                ele.username === this.ruleForm.username &&
                ele.password === this.ruleForm.password
            )
          ) {
            sessionStorage.setItem("username", this.ruleForm.username);
            this.$message({
              message: "恭喜你，登陆成功",
              type: "success",
            });
            this.$router.push("/");
          } else {
            this.$message.error("用户名或密码错误");
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
  },
};
</script>

<style>
.ligin-user {
  height: 100vh;
  background-image: url("https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/451f007a-55ea-41d5-981d-ae092184527d.jpg");
  background-size: cover;
  /* background-position-y: 60%; */
}
.ligin-user-right {
  position: absolute;
  top: 80px;
  right: 50px;
  width: 430px;
  padding: 0 30px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
}
.ligin-user-right h1 {
  margin-bottom: 0;
}
.ligin-user-right .span {
  margin: 0;
  color: #9b9b9b;
}
.ligin-user-right .span a {
  color: #2e58ff;
  text-decoration: none;
}
.submit {
  text-align: center;
}
.title {
  color: white;
}
.ligin-user-left {
  position: absolute;
  left: 100px;
  top: 45%;
  margin-top: -50px;
}
.ligin-user-left h1 {
  font-size: 40px;
  margin: 0;
}
.ligin-user-left p {
  font-size: 30px;
  margin: 0;
  font-weight: 300;
}
</style>