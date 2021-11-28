<template>
  <!-- 工业遗产 -->
  <div class="heritage-industry">
    <!-- 地图容器 -->
    <div id="container" class="container"></div>
  </div>
</template>

<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=2eccb47b400c8ab58f2dc596dbfe9d53&plugin=AMap.DistrictSearch"></script>
<script>
import { mapState } from "vuex";
export default {
  name: "HeritageIndustry",

  data() {
    return {
      map: "",
      district: null,
      polygons: [],
      zoom: 10,
      marker: null, //工业遗产点位

      // 弹框内容
      title: "",
      content: [],
      infoWindow: null,

      // 模拟工业遗产数据
      dataList: null,

      // nowMarker: null,
    };
  },

  computed: {
    ...mapState(["lang"]),
  },
  created() {
    // 发送请求获取所有点位
  },

  mounted() {
    this.initMap(); //初始化地图

    // this.disSearch();
    this.addMarker();
    this.drawBounds();
    // console.log("test", this.map.getZoom());
    // this.mapZoom();

    // console.log("返回所有覆盖物", this.map.getAllOverlays("marker"));
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

    async addMarker() {
      var res = await this.$axios.get(
        "/getHeritageMainData/getHeritageMainData"
      );
      // console.log("请求结果", res);
      this.dataList = res.data.data;
      console.log("请求结果", this.dataList);

      for (let i = 0; i < this.dataList.length; i++) {
        // 循环点坐标
        // 注意这里一定得用 let
        let marker = new AMap.Marker({
          map: this.map,
          position: this.dataList[i].coordinate,
        });

        AMap.event.addListener(marker, "click", () => {
          // this.nowMarker = marker;

          // console.log(this.infoWindow);
          this.title =
            this.dataList[i].name +
            '<span style="font-size:11px;">建于：' +
            this.dataList[i].start +
            "</span>";

          (this.content = [
            "<img src='" +
              this.dataList[i].mainImage +
              "'style='wtdth:100px;height:auto;'>地址：" +
              this.dataList[i].address,
            // "单位名称：" + this.dataList[i].company,
            "工业类别：" + this.dataList[i].type,
            `<a href="#/heritage/industry/main/` +
              this.dataList[i].company +
              `" class="">详细信息</a>`,
          ]),
            (this.infoWindow = new AMap.InfoWindow({
              isCustom: true, //使用自定义窗体
              // content: '  <div style="background-color:white">111</div>',
              content: this.createInfoWindow(
                this.title,
                this.content.join("<br/>")
              ),
              offset: new AMap.Pixel(16, -45),
            }));
          this.infoWindow.open(this.map, marker.getPosition());
          console.log(marker.getPosition());
        });
      }

      // var marker = new AMap.Marker({
      //   map: this.map,
      //   position: [116.481181, 39.989792],
      // });
      //鼠标点击marker弹出自定义的信息窗体

      //鼠标点击marker弹出自定义的信息窗体

      // this.title =
      //   `{10}<span style="font-size:11px;color:#F00;">` + this.zoom + `</span>`;
      // this.infoWindow = new AMap.InfoWindow({
      //   isCustom: true, //使用自定义窗体
      //   // content: '  <div style="background-color:white">111</div>',
      //   content: this.createInfoWindow(this.title, this.content.join("<br/>")),
      //   offset: new AMap.Pixel(16, -45),
      // });

      // AMap.event.addListener(marker, "click", () => {
      //   // console.log(this.infoWindow);
      //   this.infoWindow.open(this.map, marker.getPosition());
      // });
    },

    // 已经渲染出来了
    createInfoWindow(title, content) {
      // console.log("11111111");
      var info = document.createElement("div");
      info.className = "custom-info input-card content-window-card";

      //可以通过下面的方式修改自定义窗体的宽高
      //info.style.width = "400px";
      // 定义顶部标题
      var top = document.createElement("div");
      var titleD = document.createElement("div");
      var closeX = document.createElement("img");
      top.className = "info-top";
      titleD.innerHTML = title;
      closeX.src = "https://webapi.amap.com/images/close2.gif";
      closeX.onclick = this.closeInfoWindow;

      top.appendChild(titleD);
      top.appendChild(closeX);
      info.appendChild(top);

      // 定义中部内容
      var middle = document.createElement("div");
      middle.className = "info-middle";
      middle.style.backgroundColor = "white";
      middle.innerHTML = content;
      info.appendChild(middle);

      // 定义底部内容
      var bottom = document.createElement("div");
      bottom.className = "info-bottom";
      bottom.style.position = "relative";
      bottom.style.top = "0px";
      bottom.style.margin = "0 auto";
      var sharp = document.createElement("img");
      sharp.src = "https://webapi.amap.com/images/sharp.png";
      bottom.appendChild(sharp);
      info.appendChild(bottom);
      return info;
    },

    // 无关
    closeInfoWindow() {
      this.map.clearInfoWindow();
    },
  },
};
</script>

<style>
.heritage-industry #container {
  border-bottom: 1px solid #f9d5a7;
}
/* 弹框 */
.content-window-card {
  position: relative;
  box-shadow: none;
  bottom: 0;
  left: 0;
  width: auto;
  padding: 0;
}

.content-window-card p {
  height: 2rem;
}

.custom-info {
  border: solid 1px silver;
  width: 280px;
  background-color: white;
}

div.info-top {
  position: relative;
  background: none repeat scroll 0 0 #f9f9f9;
  border-bottom: 1px solid #ccc;
  border-radius: 5px 5px 0 0;
}

div.info-top div {
  display: inline-block;
  color: #333333;
  font-size: 14px;
  font-weight: bold;
  line-height: 31px;
  padding: 0 10px;
}

div.info-top img {
  position: absolute;
  top: 10px;
  right: 10px;
  transition-duration: 0.25s;
}

/* div.info-top img:hover {
  box-shadow: 0px 0px 5px #000;
} */

div.info-middle {
  font-size: 12px;
  padding: 10px 6px;
  line-height: 20px;
}
div.info-middle img {
  width: 100px;
  height: 70px;
  padding-bottom: 10px;
}

div.info-bottom {
  height: 0px;
  width: 100%;
  clear: both;
  text-align: center;
}

div.info-bottom img {
  position: relative;
  z-index: 104;
}

span {
  margin-left: 5px;
  font-size: 11px;
}

.info-middle img {
  float: left;
  margin-right: 6px;
}
</style>