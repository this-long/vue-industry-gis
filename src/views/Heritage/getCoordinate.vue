<template>
  <!-- 工业遗产 -->
  <div class="getCoordinate">
    <div class="heritage-industry">
      <!-- 地图容器 -->
      <div id="container" class="container">
        <div class="map-buttons">
          <el-button
            size="mini"
            type="primary"
            @click="drawGeometry"
            class="map-btn map-element"
            >{{ lang === "zh_cn" ? "拾取坐标" : "Pick coordinates" }}</el-button
          >

          <el-button
            size="mini"
            type="primary"
            @click="getAgin"
            class="map-btn map-element"
            >{{ lang === "zh_cn" ? "清空" : "Clear" }}</el-button
          >

          <el-button
            v-show="
              this.newCoordinate.length !== 0 ||
              this.applyCoordinate.length !== 0
            "
            size="mini"
            type="primary"
            @click="sub"
            class="map-btn map-element"
            >{{ lang === "zh_cn" ? "确定" : "OK" }}</el-button
          >
        </div>

        <!-- 几何查询弹框 -->
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=2eccb47b400c8ab58f2dc596dbfe9d53&plugin=AMap.MouseTool,AMap.DistrictSearch"></script>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "HeritageIndustry",

  data() {
    return {
      map: "",
      district: null,
      polygons: [],
      zoom: 10,
      marker: null, //工业遗产点位

      // 几何查询
      geometrySearchType: "marker", //始终为点
      geometryBox: false, //几何查询面板隐藏展示
      mouseTool: null,
      overlays: [], //绘制好的覆盖物
      geometrySearchRes: [], //几何查询结果
      issearchRes: true, //查询结果图标显示隐藏

      // 类型查询
      options: [
        {
          type: "全部类型",
        },
      ],
      typeSelect: "全部类型",
    };
  },

  computed: {
    ...mapState(["lang", "newCoordinate", "CoordinateType", "applyCoordinate"]),
  },

  created() {
    console.log(this.CoordinateType);
  },

  mounted() {
    this.initMap(); //初始化地图

    // this.disSearch();
    this.drawBounds();
    this.mouseTool = new AMap.MouseTool(this.map);
  },

  methods: {
    ...mapMutations(["getCoordinate", "getapplyCoordinate"]),

    initMap() {
      //初始化地图
      this.map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: this.zoom, //级别
        zooms: [6.5, 18],
        center: [115.464523, 38.874476], //中心点坐标
        viewMode: "3D", //使用3D视图
        lang: this.lang,
        mapStyle: "amap://styles/fresh",
        infoWindow: null,
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

    // 几何查询函数系列start
    opengeometryBox() {
      this.geometryBox = !this.geometryBox;
    },
    closegeometryBox() {
      this.geometryBox = !this.geometryBox;
    },
    // 集合查询函数系列start

    drawGeometry() {
      // console.log(this.geometrySearchType);
      switch (this.geometrySearchType) {
        case "marker": {
          this.mouseTool.marker({
            //同Marker的Option设置
          });
          break;
        }
      }
      // this.mouseTool.close(); //关闭，并清除覆盖物
      this.mouseTool.on("draw", (e) => {
        this.overlays.push(e.obj);
        console.log("e.obj---------", e.obj.getPosition()); //获取点标记的位置

        var zb = e.obj.getPosition();
        if (this.CoordinateType === "add") {
          this.getCoordinate([zb.lng, zb.lat]);
        } else if (this.CoordinateType === "apply") {
          this.getapplyCoordinate([zb.lng, zb.lat]);
        }

        console.log(this.newCoordinate);

        this.mouseTool.close(); //关闭
      }); //解除绑定，
    },

    getAgin() {
      this.mouseTool.close(true);
      this.getCoordinate([]);
      this.getapplyCoordinate([]);
    },

    sub() {
      if (this.CoordinateType === "add") {
        this.$router.push("/heritage/add/add");
      } else if (this.CoordinateType === "apply") {
        this.$router.push("/heritage/apply");
      }
    },
  },
};
</script>

<style>
.heritage-industry #container {
  border-bottom: 1px solid #f9d5a7;
}
</style>