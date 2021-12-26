

<template>
  <!-- 数据管理 -->
  <div class="home">
    <MainTop> 首页 </MainTop>

    <div class="home-bottom padding15">
      <div id="containerhome"></div>
      <div class="block">
        <el-carousel height="350px" :interval="5000">
          <el-carousel-item>
            <img
              class="img1"
              src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/25239b78-3d66-4137-bf12-37f954432a42.png"
              alt=""
            />
          </el-carousel-item>
          <el-carousel-item>
            <img
              class="img2"
              src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/f0bc2a5c-46b3-4d3e-9f21-1d17b74a9d0b.png"
              alt=""
            />
          </el-carousel-item>
          <el-carousel-item>
            <img
              class="img3"
              src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/f4daba88-6815-4353-96b5-cd63d8069d63.png"
              alt=""
            />
          </el-carousel-item>
          <el-carousel-item>
            <img
              class="img4"
              src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/ce4c4adb-16c8-413e-a940-b710b161e8ee.png"
              alt=""
            />
          </el-carousel-item>
          <el-carousel-item>
            <img
              class="img5"
              src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/ba83ae49-e379-4cfa-908d-d25f4924ee35.png"
              alt=""
            />
          </el-carousel-item>
          <!-- <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">{{ item }}</h3>
          </el-carousel-item> -->
        </el-carousel>
      </div>
      <div class="home-bottom-usermain">
        <div class="usermain-left">
          <el-card class="box-card" style="height: 320px">
            <span style="font-size: 16px; font-weight: 600">遗产要闻</span>
            <div class="notic-list">
              <div
                class="notic-che"
                @click="getNoticMain(ele)"
                v-for="ele in noticeList"
                :key="ele._id"
              >
                <span>[{{ ele.region }}] {{ ele.name }}</span
                ><span>{{ ele.date1 }}</span>
              </div>
            </div>
          </el-card>
        </div>
        <div class="usermain-right">
          <el-card class="box-card" style="height: 320px">
            <div class="user">
              <span>{{ nowUser }}</span>
              <el-tag v-if="nowUser === 'admin'">管理员</el-tag>
              <el-tag v-else type="info">普通用户</el-tag>
            </div>
            <div class="address">
              <span>定位状态</span>
              <el-tag v-if="geolocationRes.info !== 'SUCCESS'" type="danger"
                >定位失败</el-tag
              >
              <el-tag v-else type="success">定位成功</el-tag>
            </div>
            <div class="address">
              <span>定位类型</span>
              <el-tag
                v-if="geolocationRes.location_type === 'ip'"
                effect="plain"
                type="info"
                >网络定位</el-tag
              >
              <el-tag v-else effect="plain" type="info">本机定位</el-tag>
            </div>
            <div class="address">
              <span class="miniText">{{
                geolocationRes.formattedAddress
              }}</span>
            </div>

            <!-- 天气部分 -->
            <div class="weather" v-if="todayWeather">
              <div class="address">
                <span class="miniText">{{ todayWeather.reportTime }}</span>
                <span class="miniText">{{ todayWeather.city }}</span>
              </div>
              <div class="address">
                <span class="miniText"
                  >气温 {{ todayWeather.temperature }}</span
                >
                <span class="miniText" v-if="todayWeather.temperature < 5"
                  >注意保暖</span
                >
                <span
                  class="miniText"
                  v-if="
                    todayWeather.temperature > 5 &&
                    todayWeather.temperature < 15
                  "
                  >天气温暖，适合出行</span
                >
                <span class="miniText" v-if="todayWeather.temperature > 15"
                  >注意防暑</span
                >
              </div>
              <div class="address">
                <span class="miniText"
                  >风向 {{ todayWeather.windDirection }}</span
                >
                <span class="miniText">天气 {{ todayWeather.weather }}</span>
              </div>
            </div>

            <div class="weather" v-else>
              <div class="address">
                <span class="miniText">天气获取失败</span>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript"
    src="https://webapi.amap.com/maps?v=1.4.15&key=2eccb47b400c8ab58f2dc596dbfe9d53&plugin=AMap.MouseTool,AMap.Driving,AMap.DistrictSearch,AMap.Geocoder"></script>
<script>
import MainTop from "../components/MainTop.vue";
export default {
  components: { MainTop },

  data() {
    return {
      map: "",
      geolocationRes: {}, //定位结果
      dialogVisible: false, //查看当前位置对话框
      geolocation: null,
      nowUser: "暂无用户",
      todayWeather: null,
      fourDayWeatherList: null,

      noticeList: [], //要闻列表
    };
  },

  created() {
    this.initMap();
    this.nowUser = sessionStorage.getItem("username");
    this.getNoticeList();
  },

  methods: {
    // 初始化获取定位
    initMap() {
      //初始化地图
      this.map = new AMap.Map("containerhome", {
        resizeEnable: true,
        // zoom: this.zoom, //级别
        zooms: [6.5, 18],
        // center: [115.464523, 38.874476], //中心点坐标
        viewMode: "3D", //使用3D视图

        mapStyle: "amap://styles/macaron",
        // infoWindow: null,
      });

      AMap.plugin("AMap.Geolocation", () => {
        // console.log(111);
        // 注意这里由于函数嵌套需要使用箭头函数
        this.geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          buttonPosition: "RB", //定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
        });
        this.map.addControl(this.geolocation);
        this.geolocation.getCurrentPosition((status, result) => {
          if (status == "complete") {
            // onComplete(result);
            // console.log("定位结果", result);
            this.geolocationRes = result;
            console.log(this.geolocationRes);
          } else {
            // onError(result);
            this.$message.error(
              "定位失败，请检查浏览器权限。可以更换Eage浏览器进行定位。"
            );
            console.log("定位结果", result);
          }
        });
      });

      // 获取天气start
      // 获取天气预报start
      AMap.plugin("AMap.Weather", () => {
        var weather = new AMap.Weather();
        //查询实时天气信息, 查询的城市到行政级别的城市，如朝阳区、杭州市
        weather.getLive("唐山", (err, data) => {
          if (!err) {
            console.log("当天天气", data);
            this.todayWeather = data;
          }
        });
        //未来4天天气预报
        weather.getForecast("唐山", (err, data) => {
          if (err) {
            return;
          }
          console.log("4天天气", data);
          this.fourDayWeatherList = data.forecasts;
          // console.log("四天天气", this.fourDayWeatherList);
        });
      });
      // 获取天气预报end
    },

    async getNoticeList() {
      var res = await this.$axios.get("/getNoticeList/getNoticeList");
      console.log(res);
      this.noticeList = res.data.data;
    },
    getNoticMain(ele) {
      // console.log(ele);
      this.$router.push({
        path: "/main/noticemain?_id=" + ele._id,
      });
    },
  },
};
</script>

<style scoped>
.el-carousel__item {
  text-align: center;
  color: #475669;
  font-size: 14px;
  line-height: 350px;
  margin: 0;
}
.el-carousel__item .img1 {
  width: 100%;
  height: auto;
}
.el-carousel__item .img2 {
  margin-top: -5%;
  width: 100%;
  height: auto;
}
.el-carousel__item .img3 {
  margin-top: -30%;
  width: 100%;
  height: auto;
}
.el-carousel__item .img5 {
  margin-top: -25%;
  width: 100%;
  height: auto;
}
.el-carousel__item .img4 {
  margin-top: -16%;
  width: 100%;
  height: auto;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.home-bottom-usermain {
  display: flex;
  padding-top: 15px;
}
.home-bottom-usermain .usermain-left {
  width: 60%;
  margin-right: 15px;
}
.home-bottom-usermain .usermain-right {
  width: calc(40% - 15px);
}
.home-bottom-usermain .usermain-right span {
  font-size: 16px;
}
.home-bottom-usermain .usermain-right .miniText {
  font-size: 14px;
  color: #606266;
}

.home-bottom-usermain .usermain-right .user,
.home-bottom-usermain .usermain-right .address {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.home-bottom-usermain .notic-list {
  height: 250px;
  overflow: auto;
  margin-top: 5px;
}
.home-bottom-usermain .notic-list .notic-che {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  cursor: pointer;
  color: #606266;
}
.home-bottom-usermain .notic-list .notic-che:hover {
  color: black;
  /* font-weight: 600; */
}
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
</style>
