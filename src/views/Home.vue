

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

  created() {
    // this.testEdit();
    // this.testPostMus();
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

    async testEdit() {
      await this.$axios.post(
        "https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/mainFun/editHeritageMainData/editHeritageMainData",
        {
          _id: "61ab909f291c0100018b9139",

          name: "为什么不变？？？new测试3测试3",
          address: "new测试3",
          type: "new测试3",
          company: "测试3",
          start: "2020",
          mainImage:
            "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/22d677cf-6455-41de-af73-e20776309469.jpg",
          coordinate: [115.358093, 39.071991],
          addType: "工业遗产", //new
          jing: 115.358093,
          wei: 39.071991,
          prolevel: "",
          trvlevel: "",
          scelevel: 4,
          brief: "<p class='test'>测试3</p>",
          details: "<p class='test'>测试3</p>",

          imagesAllurl: [
            "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/bcaf6cf3-e4ab-452d-93a1-6369aceba0a4.jpg",
          ],
        }
      );
    },

    async testPostMus() {
      var res = await this.$axios.post(
        "https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/mainFun/postHeritageMuseum/postHeritageMuseum",
        {
          name: "我是测试数据",
          address: "new测试3",
          type: "new测试3",
          company: "测试3",
          start: "2020",
        }
      );
      console.log(res);
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
