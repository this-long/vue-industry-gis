

<template>
  <!-- 数据管理 -->
  <div class="data-manage">
    数据管理
    <div class="box" v-html="end"></div>

    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="textarea"
    >
    </el-input>

    <el-button @click="col">test</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: "",
      end: "",
    };
  },

  methods: {
    col() {
      var re = /\n/g;
      this.textarea = this.textarea.replace(re, "<br>");

      console.log(this.textarea.split("<br>"));
      var arr = this.textarea.split("<br>");
      var newarr = arr.map((ele) => "<p class='test'>" + ele + "</p>");
      var newStr = newarr.join("");
      this.end = newStr;
    },
  },
};
</script>

<style>
.box {
  width: 200px;
}
.test {
  text-indent: 20px;
  word-break: break-all;
  /* 注意，默认情况下连续的英文单词或者是数字是不会自动换行的，需要设置这条属性才可以 */
}
</style>
