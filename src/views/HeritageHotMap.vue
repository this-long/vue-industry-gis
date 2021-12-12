<template>
  <!-- 遗产报表 -->
  <div class="heritage-Hot-Map">
    <div class="heritage-industry">
      <!-- 地图容器 -->
      <div id="container" class="container"></div>
    </div>
  </div>
</template>
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=2eccb47b400c8ab58f2dc596dbfe9d53&plugin=AMap.MouseTool,AMap.DistrictSearch"></script>

    <script src="https://webapi.amap.com/loca?v=1.3.2&key=2eccb47b400c8ab58f2dc596dbfe9d53"></script>
    
<script>
import { mapState } from "vuex";
export default {
  components: {},

  data() {
    return {
      map: "",
      district: null,
      polygons: [],
      // 地图变量

      dataList1: [], //地图数据
      dataList2: [], //地图数据
      dataList3: [], //地图数据

      layer: null, //热力图层
      list: [],
    };
  },

  async created() {
    // console.log("list", this.list);
    // console.log(this.dataList);
  },

  mounted() {
    this.initMap(); //初始化地图
    this.drawBounds();
    this.drawHotMap();
  },

  computed: {
    ...mapState(["lang"]),
  },

  methods: {
    initMap() {
      //初始化地图
      this.map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 10, //级别
        zooms: [6.5, 18],
        center: [115.464523, 38.874476], //中心点坐标
        viewMode: "3D", //使用3D视图
        lang: this.lang,
        mapStyle: "amap://styles/db9efe6a1745ac24b7269b862f359536",
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

    // 渲染热力图

    async drawHotMap() {
      this.$message({
        message: "工业遗产建筑密度热力图绘制中，初次加载可能用时较长",
      });

      var res1 = await this.$axios.get(
        "/getHeritageMainData/getHeritageMainData"
      );
      this.dataList1 = res1.data.data;

      var res2 = await this.$axios.get("/getHeritageMuseum/getHeritageMuseum");
      this.dataList2 = res2.data.data;

      var res3 = await this.$axios.get(
        "/getHeritageTourism/getHeritageTourism"
      );
      this.dataList3 = res3.data.data;

      for (let i = 0; i < this.dataList1.length; i++) {
        this.list.push({
          coordinate: this.dataList1[i].coordinate,
          count: i + 1,
        });
      }
      for (let m = 0; m < this.dataList2.length; m++) {
        this.list.push({
          coordinate: this.dataList2[m].coordinate,
          count: m + 1,
        });
      }
      for (let i = 0; i < this.dataList3.length; i++) {
        this.list.push({
          coordinate: this.dataList3[i].coordinate,
          count: i + 1,
        });
      }

      this.layer = new Loca.HeatmapLayer({
        map: this.map,
      });
      console.log(this.list);
      this.layer.setData(this.list, {
        lnglat: "coordinate",
        value: "count",
      });

      //  radius为热力半径，由于初期数据未录入，故设置的较大，默认为16，后续数据全部录入后再进行修改。
      this.layer.setOptions({
        style: {
          radius: 40,
          color: {
            0.5: "#2c7bb6",
            0.65: "#abd9e9",
            0.7: "#ffffbf",
            0.9: "#fde468",
            1.0: "#d7191c",
          },
        },
      });

      this.layer.render();

      // this.list = this.dataList.map((ele) => {
      //   console.log(ele.index);
      //   return { coordinate: ele.coordinate };
      // });

      // console.log("list", this.list);
    },
  },
};
</script>

<style>
</style>