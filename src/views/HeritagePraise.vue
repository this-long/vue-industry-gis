<template>
  <!-- 遗产报表 -->
  <div class="heritage-Hot-Map-p">
    <div class="heritage-industry">
      <!-- 地图容器 -->
      <div id="container" class="container"></div>
      <div class="info" style="min-width: 350px; mex-width: 450px">
        <h4>工业遗产聚集度详情(工业遗产分布越密集聚集度越高)</h4>
        <p>当前聚集度：<span id="val">--</span></p>
        <p>
          当前包含的数据索引：<span
            id="indexes"
            style="display: block; overflow: scroll"
            >--</span
          >
        </p>
        <p>当前包含的遗产数量：<span id="indexes-num">--</span></p>
        <p>
          聚集中心点坐标：
          <span id="lng-lat">--</span>
        </p>
      </div>
      <div class="prase-tuli">
        <div class="legend">
          <ul class="colors" id="legend-color"></ul>
          <ul class="labels" id="legend-label"></ul>
        </div>
      </div>
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
        pitch: 46,
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
          strokeWeight: 3,
          fillColor: "#F9D5A7",
          fillOpacity: 0.3,
        });
        polygon.setPath(pathArray);
        _this.map.add(polygon);
      });
    },

    // 渲染热力图

    async drawHotMap() {
      this.$message({
        message: "工业遗产聚集度蜂窝图绘制中，初次加载可能用时较长",
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
          count: i + 10,
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
          count: i + 10,
        });
      }

      this.layer = new Loca.HexagonLayer({
        map: this.map,
        fitView: true,
        eventSupport: true,
      });
      console.log(this.list);
      this.layer.setData(this.list, {
        lnglat: "coordinate",
        value: "count",
        type: "count",
      });

      //  radius为热力半径，由于初期数据未录入，故设置的较大，默认为16，后续数据全部录入后再进行修改。
      this.layer.setOptions({
        unit: "meter",
        mode: "count",
        style: {
          color: [
            "#4575b4",
            "#99d594",
            "#e6f598",
            "#ffffbf",
            "#fee08b",
            "#fee08b",
            "#d53e4f",
          ],
          radius: 6000,
          opacity: 1,
          gap: 300,
          height: [60000, 250000],
        },
      });
      // 渲染图例start
      this.layer.on("legendupdate", function (ev) {
        var colorLegend = ev.colorLegend;
        var legends = colorLegend.map((item) => {
          // color 为 gradient 传入的格式
          return `<li class="color-item" style="background-color: ${item.color}"></li>`;
        });

        var ranges = colorLegend.map((item, index) => {
          // range 可能为小数，可以自行取整计算
          item.range[0] = Math.round(item.range[0]);
          item.range[1] = Math.round(item.range[1]);

          if (index == colorLegend.length - 1) {
            return `<li class="label-item">${item.range[0]}</li><li class="label-item">${item.range[1]}</li>`;
          }
          return `<li class="label-item">${item.range[0]}</li>`;
        });

        document.getElementById("legend-color").innerHTML = legends.join("");
        document.getElementById("legend-label").innerHTML = ranges.join("");
      });
      // 渲染图例end
      // 鼠标事件statr
      this.layer.on("mousemove", function (ev) {
        var $val = document.getElementById("val");
        var $idx = document.getElementById("indexes");
        var $num = document.getElementById("indexes-num");
        var $lngLat = document.getElementById("lng-lat");

        $val.innerText = ev.value;
        $idx.innerText = ev.indexes.join(", ");
        $num.innerText = ev.indexes.length;
        $lngLat.innerText = ev.lngLat.valueOf();
      });
      // 鼠标事件end

      this.layer.render();

      // this.list = this.dataList.map((ele) => {
      //   console.log(ele.index);
      //   return { coordinate: ele.coordinate };
      // });

      // console.log("list", this.list);
    },

    initLegend(colorLegend) {},
  },
};
</script>

<style >
.heritage-Hot-Map-p .legend {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.heritage-Hot-Map-p .legend ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.heritage-Hot-Map-p .color-item {
  width: 30px;
  height: 20px;
  display: inline-block;
}

.heritage-Hot-Map-p .label-item {
  display: inline-block;
  width: 30px;
  margin-left: -2px;
  font-size: 14px;
}
.heritage-Hot-Map-p .info {
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  position: fixed;
  top: 1rem;
  background-color: white;
  width: auto;
  min-width: 22rem;
  border-width: 0;
  right: 1rem;
  box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5);
  font-size: 12px;
}
.heritage-Hot-Map-p .info span {
  color: #1b91ff;
}
</style>