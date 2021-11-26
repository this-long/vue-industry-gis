<template>
  <!-- 工业遗产 -->
  <div class="heritage-industry">
    <!-- 地图容器 -->
    <div id="container" class="container"></div>
  </div>
</template>

<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=2eccb47b400c8ab58f2dc596dbfe9d53&plugin=AMap.DistrictSearch"></script>
<script>
export default {
  name: "HeritageIndustry",

  data() {
    return {
      map: "",
      district: null,
      polygons: [],
      zoom: 10,

      // _this: null,
    };
  },

  mounted() {
    this.initMap(); //初始化地图
    // this.disSearch();
    this.drawBounds();
    console.log("test", this.map.getZoom());
    this.mapZoom();
  },

  methods: {
    initMap() {
      //初始化地图
      this.map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: this.zoom, //级别
        zooms: [6.5, 18],
        center: [115.464523, 38.874476], //中心点坐标
        viewMode: "3D", //使用3D视图
        mapStyle: "amap://styles/whitesmoke",
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
        // var bounds = result.districtList[0].boundaries;
        console.log(result);
        console.log(status);

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
          strokeColor: "#545C64",
          strokeWeight: 1,
          fillColor: "black",
          fillOpacity: 0,
        });
        polygon.setPath(pathArray);
        _this.map.add(polygon);
      });
    },

    // 地图缩放监听
    mapZoom() {
      this.map.on("zoomchange", () => {
        // this.zoom=this.map.getZoom()
        console.log("当前地图级别", this.map.getZoom());
        if (this.map.getZoom() < 7) {
          this.zoom = 7;
        }
      });
    },
  },
};
</script>

<style>
</style>