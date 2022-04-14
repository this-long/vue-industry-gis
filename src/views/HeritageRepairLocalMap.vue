<template>
  <!-- 遗产维修状况柱状图 -->
  <div class="heritage-Hot-Map">
    <div class="heritage-industry">
      <!-- 地图容器 -->
      <div id="container" class="container">
        <div class="demo-title">
          <h3>所有工业遗产累计维修次数多面棱柱图</h3>
        </div>
      </div>
    </div>
  </div>
</template>
  <script type="text/javascript"
    src="https://webapi.amap.com/maps?v=1.4.15&key=2eccb47b400c8ab58f2dc596dbfe9d53&plugin=AMap.MouseTool,AMap.Driving,AMap.DistrictSearch,AMap.Geocoder,Map3D"></script>
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
      layer: null, //棱柱图层
      angle: 90,
      // pl: null, //棱柱图层
      // geo: null, //数据源
      // clickInfo: null,
      // dat: null,
      // 地图变量
      infoWin: null,
      tableDom: null,
      list: [],
    };
  },

  created() {
    // console.log("list", this.list);
    // console.log(this.dataList);
  },

  mounted() {
    this.initMap(); //初始化地图
    this.drawBounds();
    this.drawLocal(); //创建棱柱图
    this.changeLightDirection();
  },

  computed: {
    ...mapState(["lang"]),
  },

  methods: {
    initMap() {
      //初始化地图
      this.map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 9, //级别
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
          strokeWeight: 1,
          fillColor: "#F9D5A7",
          fillOpacity: 0.2,
        });
        polygon.setPath(pathArray);
        _this.map.add(polygon);
      });
    },

    async drawLocal() {
      this.$message({
        message: "工业遗产累计维修次数棱柱图绘制中，初次加载可能用时较长",
      });

      // 获取数据start
      var res;
      res = await this.$axios.get("/getApplyRepairData/getApplyRepairData");
      console.log(res);
      res.data.data.forEach((ele) => {
        // console.log(ele);
        var index = this.list.findIndex((che) => che.name === ele.name);
        // console.log(index);
        if (index !== -1) {
          this.list[index].num = this.list[index].num + 1;
          this.list[index].num1 = this.list[index].num * 100;
        } else {
          this.list = [
            ...this.list,
            {
              ...ele,
              num: 1,
              num1: 10,
              coordinateStr: ele.jing + `,` + ele.wei,
            },
          ];
        }
      });
      console.log("格式化数据", this.list);
      // 获取数据end

      this.layer = new Loca.ScatterPointLayer({
        map: this.map,
        eventSupport: true,
      });

      this.layer.setData(this.list.slice(0, 5000), {
        lnglat: "coordinateStr",
      });

      var colors = ["#0553A1", "#0B79B0", "#10B3B0", "#7CCF98", "#DCE872"];

      this.layer.setOptions({
        // 设定棱柱体顶点数量, 默认 16，呈现圆柱体
        //vertex: 4,
        // 单位米
        unit: "meter",
        light: {
          // 环境光
          ambient: {
            // 光照颜色
            color: "#ffffff",
            // 光照强度，范围 [0, 1]
            intensity: 0.5,
          },
          // 平行光
          directional: {
            color: "#ffffff",
            // 光照方向，是指从地面原点起，光指向的方向。
            // 数组分别表示 X 轴、Y 轴、Z 轴。
            // 其中 X 正向朝东、Y 正向朝南、Z 正向朝地下。
            direction: [1, -1.5, 2],
            intensity: 0.6,
          },
        },
        style: {
          // 正多边形半径
          radius: 3500,
          height: {
            key: "num1",
            value: [0, 50000],
          },
          // 顶边颜色
          color: {
            key: "num",
            scale: "quantile",
            value: colors,
          },
          opacity: 0.9,
          // 旋转角度，单位弧度
          rotate: (Math.PI / 180) * 45,
        },
        selectStyle: {
          color: "#fcff19",
          opacity: 0.9,
        },
      });

      this.layer.on("mousemove", (ev) => {
        this.openInfoWin(this.map, ev.originalEvent, {
          遗产名称: ev.rawData.name,
          维修次数: ev.rawData.num,
          遗产类型: ev.rawData.addType,
          遗产地址: ev.rawData.address,

          坐标: ev.rawData.coordinateStr,
        });
      });
      this.layer.render();
      this.map.DirectionLight = new AMap.Lights.DirectionLight(
        [0, -1, 2],
        [1, 1, 1],
        0.7
      );
    },

    openInfoWin(map, event, content) {
      // 鼠标移入弹出圆柱信息
      if (!this.infoWin) {
        this.infoWin = new AMap.InfoWindow({
          autoMove: false,
          isCustom: true, //使用自定义窗体
          offset: new AMap.Pixel(130, 100),
        });
      }

      var x = event.offsetX;
      var y = event.offsetY;
      var lngLat = this.map.containerToLngLat(new AMap.Pixel(x, y));

      if (!this.tableDom) {
        let infoDom = document.createElement("div");
        infoDom.className = "info";
        this.tableDom = document.createElement("table");
        infoDom.appendChild(this.tableDom);
        this.infoWin.setContent(infoDom);
      }

      var trStr = "";
      for (var name in content) {
        var val = content[name];
        trStr +=
          "<tr>" +
          '<td class="label">' +
          name +
          "</td>" +
          "<td>&nbsp;</td>" +
          '<td class="content">' +
          val +
          "</td>" +
          "</tr>";
      }

      this.tableDom.innerHTML = trStr;
      this.infoWin.open(this.map, lngLat);
    },

    closeInfoWin() {
      if (this.infoWin) {
        this.infoWin.close();
      }
    },
    changeLightDirection() {
      // 改变光影
      this.angle += 2;
      var dir = [
        Math.cos((this.angle / 180) * Math.PI),
        -Math.sin((this.angle / 180) * Math.PI),
        2,
      ];
      this.map.DirectionLight.setDirection(dir);
      this.map.render();
      AMap.Util.requestAnimFrame(this.changeLightDirection);
    },
  },
};
</script>

<style>
.heritage-Hot-Map .demo-title {
  position: relative;
  top: 10px;
  z-index: 9;
  left: 15px;
}
.heritage-Hot-Map .demo-title h1 {
  margin: 0;
  color: #acb3bb;
}

.heritage-Hot-Map .demo-title h3 {
  font-weight: normal;
  margin-top: 5px;
  color: #8e939d;
}

/* .heritage-Hot-Map .legend {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.heritage-Hot-Map .legend ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.heritage-Hot-Map .color-item {
  width: 30px;
  height: 20px;
  display: inline-block;
}

.heritage-Hot-Map .label-item {
  display: inline-block;
  width: 30px;
  margin-left: -2px;
  font-size: 14px;
} */
.heritage-Hot-Map .info {
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
.heritage-Hot-Map .info span {
  color: #1b91ff;
}
</style>