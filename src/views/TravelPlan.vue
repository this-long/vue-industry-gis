<template>
  <!-- 出行规划 -->
  <div class="travel-plan">
    <!-- <div class="travel-plan-top">
      <MainTop>我要旅行 <span class="gang"> / </span> 出行规划</MainTop>
    </div> -->
    <div class="travel-plan-bottom">
      <div class="travel-plan-btns">
        <el-button size="mini" @click="dialogVisible = true"
          >查看当前位置</el-button
        >
      </div>

      <div id="container" class="container"></div>
    </div>

    <el-dialog title="当前位置" :visible.sync="dialogVisible" width="45%">
      <span class="spanP">当前坐标：{{ geolocationRes.position }}</span
      ><br />
      <span class="spanP">定位类型：{{ geolocationRes.location_type }}</span
      ><br />
      <!-- <span class="spanP">城市代码：{{ geolocationRes.addressComponent.city }}</span><br/>
      <span class="spanP">当前街道：{{ geolocationRes.addressComponent.street }}</span><br/> -->
      <span class="spanP">详细地址：{{ geolocationRes.formattedAddress }}</span
      ><br />
      <span class="spanP"
        >定位状态：<el-tag
          v-if="geolocationRes.info === 'SUCCESS'"
          type="success"
          >定位正常</el-tag
        ><el-tag v-else type="danger">定位失败</el-tag></span
      >
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
  <script type="text/javascript"
    src="https://webapi.amap.com/maps?v=1.4.15&key=2eccb47b400c8ab58f2dc596dbfe9d53&plugin=AMap.MouseTool,AMap.DistrictSearch"></script>

<script>
import MainTop from "../components/MainTop.vue";
import { mapState } from "vuex";

export default {
  components: {
    MainTop,
  },

  data() {
    return {
      map: "",
      district: null,
      geolocation: null,
      geolocationRes: {}, //定位结果
      dialogVisible: false, //查看当前位置对话框
    };
  },
  computed: {
    ...mapState(["lang"]),
  },

  created() {},
  mounted() {
    this.initMap();
    this.drawBounds();
  },
  methods: {
    initMap() {
      //初始化地图
      this.map = new AMap.Map("container", {
        resizeEnable: true,
        // zoom: this.zoom, //级别
        zooms: [6.5, 18],
        // center: [115.464523, 38.874476], //中心点坐标
        viewMode: "3D", //使用3D视图
        lang: this.lang,
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
            console.log("定位结果", result);
            this.geolocationRes = result;
          } else {
            // onError(result);
            this.$message.error("定位失败，请检查浏览器权限");
            console.log("定位结果", result);
          }
        });
      });
    },

    // 裁剪边界
    drawBounds() {
      if (!this.district) {
        //实例化DistrictSearch
        var opts = {
          subdistrict: 0, //获取边界不需要返回下级行政区
          extensions: "all", //返回行政区边界坐标组等具体信息
          level: "province", //查询行政级别为 市
        };
        this.district = new AMap.DistrictSearch(opts);
      }
      this.district.setLevel("province");
      var _this = this;
      this.district.search("河北省", function (status, result) {
        // 河北省边界
        // var bounds = result.districtList[0].boundaries;
        // console.log(result);
        // console.log(status);

        var outer = [
          new AMap.LngLat(-360, 90, true),
          new AMap.LngLat(-360, -90, true),
          new AMap.LngLat(360, -90, true),
          new AMap.LngLat(360, 90, true),
        ];
        var holes = result.districtList[0].boundaries;

        var pathArray = [outer];
        pathArray.push.apply(pathArray, holes);
        var polygon = new AMap.Polygon({
          pathL: pathArray,
          strokeColor: "#F9D5A7",
          strokeWeight: 1,
          fillColor: "#F9D5A7",
          fillOpacity: 0.2,
        });
        polygon.setPath(pathArray);
        _this.map.add(polygon);
      });
    },
  },
};
</script>

<style>
.travel-plan-btns {
  padding: 15px;
  position: absolute;
  right: 0%;
  top: 0%;
  z-index: 999;
}
.spanP {
  display: block;
  font-size: 16px;
  /* padding-bottom: 15px; */
}
</style>