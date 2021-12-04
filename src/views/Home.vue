<template>
  <div class="home">
    <div class="home-top">
      <MainTop>首页</MainTop>
    </div>
    <div class="home-bottom">
      <input type="file" multiple="multiple" @change="change" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MainTop from "../components/MainTop.vue";

export default {
  name: "Home",
  components: {
    MainTop,
  },

  methods: {
    change(e) {
      const file = e.target.files[0];
      console.log(file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async (event) => {
        let dataUrl = (this.src = event.target.result);
        var res = await this.$axios.post(
          "https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/image",
          {
            dataUrl,
            name: file.name,
          }
        );

        console.log(res);
      };
    },
  },
};
</script>
