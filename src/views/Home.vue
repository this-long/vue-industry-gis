<template>
  <div class="home">
    <div class="home-top">
      <MainTop>首页</MainTop>
    </div>
    <div class="home-bottom"></div>
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
};
</script>
