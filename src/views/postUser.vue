<template>
  <!-- 注册页面 -->
  <div class="post-user">
    <div class="post-user-right">
      <h1>欢迎加入我们</h1>
      <span class="span"
        >已有帐户？点击 <a href="/#/heritage/login">登陆</a></span
      >
      <br />
      <br />
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            show-password
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <br />

      <div class="submit">
        <el-button
          @click="submitForm('ruleForm')"
          type="primary"
          round
          style="width: 60%; color: white; margin: 0 auto"
          >注册</el-button
        >
      </div>
      <br />
      <br />
    </div>
    <div class="post-user-left">
      <h1 class="title">河北工业遗产保护开发</h1>
      <p class="title">世纪的智慧、名声、辛勤，近乎落日</p>
      <p class="title">却值得铭记</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      userList: [],

      ruleForm: {
        username: "",
        password: "",
        checkPass: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
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
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          var sameName = this.userList.some(
            (ele) => ele.username === this.ruleForm.username
          );
          if (sameName) {
            this.$message.error("该用户名已被注册，请换一个");
          } else {
            console.log(this.ruleForm);
            var res = await this.$axios.post(
              "/postUser/postUser",
              this.ruleForm
            );

            console.log(res);
            if (res.status === 200) {
              this.$message({
                message: "恭喜你，注册成功",
                type: "success",
              });

              this.$router.push("heritage/login");
            }
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
.post-user {
  height: 100vh;
  background-image: url("https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/59834305-5a8c-49ee-a085-50d2d3683ef4.jpg");
  background-size: cover;
  /* background-position-y: 60%; */
}
.post-user-right {
  position: absolute;
  top: 80px;
  right: 50px;
  width: 430px;
  padding: 0 30px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
}
.post-user-right h1 {
  margin-bottom: 0;
}
.post-user-right .span {
  margin: 0;
  color: #9b9b9b;
}
.post-user-right .span a {
  color: #2e58ff;
  text-decoration: none;
}
.submit {
  text-align: center;
}
.title {
  color: white;
}
.post-user-left {
  position: absolute;
  left: 100px;
  top: 45%;
  margin-top: -50px;
}
.post-user-left h1 {
  font-size: 40px;
  margin: 0;
}
.post-user-left p {
  font-size: 30px;
  margin: 0;
  font-weight: 300;
}
</style>