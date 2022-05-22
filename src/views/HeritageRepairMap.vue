<template>
  <!-- 遗产维修现状 -->
  <div class="heritage-Hot-Map">
    <div class="heritage-industry">
      <!-- 地图容器 -->
      <div id="container" class="container"></div>
      <!-- 图例盒子 -->
      <div class="legend-repair">
        <h4>图例</h4>
        <div class="legend-che">
          <img
            src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/ada663f6-8e24-43bc-a6c1-ce12f7f19d66.png"
            alt=""
          />
          <span>待审批遗产</span>
        </div>
        <div class="legend-che">
          <img
            src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/c4c8e30e-ed9a-4c0f-bca5-9019ca48a4aa.png"
            alt=""
          />
          <span>处理中遗产</span>
        </div>
        <div class="legend-che">
          <img
            src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/7f483aa8-7a31-4f3d-a84f-c5290712424d.png"
            alt=""
          />
          <span>已驳回遗产</span>
        </div>
        <div class="legend-che">
          <img
            src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/ad32d37e-82bc-4c73-8859-eda876b59683.png"
            alt=""
          />
          <span>已完成遗产</span>
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
      markers: [],
      marker: null, //工业遗产点位

      // 地图变量

      dataListPending: [], //地图数据待审批
      dataListAdopt: [], //地图数据处理中
      dataListReject: [], //地图数据已驳回
      dataListIsend: [], //地图数据已完成
      datalist: [],
    };
  },

  created() {
    // console.log("list", this.list);
  },

  mounted() {
    this.initMap(); //初始化地图
    this.addMarker();
    this.drawBounds();
  },

  computed: {
    ...mapState(["lang"]),
  },

  methods: {
    initMap() {
      //初始化地图
      this.map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 8, //级别
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
           strokeWeight: 3,
          fillColor: "#F9D5A7",
          fillOpacity: 0.3,
        });
        polygon.setPath(pathArray);
        _this.map.add(polygon);
      });
    },

    //维修点位添加start----------------
    // 添加工业遗产点集
    async addMarker() {
      // 对报修列表进行分类start
      var res = null;
      res = await this.$axios.get("/getApplyRepairData/getApplyRepairData");
      console.log("报修列表", res);
      this.dataListPending = res.data.data.filter(
        (ele) => ele.approvalStatus === "pending"
      );
      // console.log("待审批列表", this.dataListPending);
      this.dataListAdopt = res.data.data.filter((ele) => {
        var isPending = this.dataListPending.find(
          (che) => che.name === ele.name
        );
        return ele.approvalStatus === "adopt" && !isPending;
      });
      // console.log("处理中列表", this.dataListAdopt);
      this.dataListReject = res.data.data.filter((ele) => {
        var isPending = this.dataListPending.find(
          (che) => che.name === ele.name
        );
        var isadopt = this.dataListAdopt.find((che) => che.name === ele.name);
        return ele.approvalStatus === "reject" && !isPending && !isadopt;
      });
      // console.log("已驳回列表", this.dataListReject);
      this.dataListIsend = res.data.data.filter((ele) => {
        var isPending = this.dataListPending.find(
          (che) => che.name === ele.name
        );
        var isadopt = this.dataListAdopt.find((che) => che.name === ele.name);
        var isreject = this.dataListReject.find((che) => che.name === ele.name);
        return (
          ele.approvalStatus === "isend" && !isPending && !isadopt && !isreject
        );
      });
      console.log("已完成列表", this.dataListIsend);
      this.datalist = [
        this.dataListPending,
        this.dataListAdopt,
        this.dataListReject,
        this.dataListIsend,
      ];
      // 对报修列表进行分类end

      console.log("点位绘制完成", this.datalist);

      for (let m = 0; m < this.datalist.length; m++) {
        for (let i = 0; i < this.datalist[m].length; i++) {
          // 循环点坐标
          // 注意这里一定得用 let
          let marker;
          if (m === 0) {
            marker = new AMap.Marker({
              // 自定义图标
              icon: new AMap.Icon({
                image:
                  "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/ada663f6-8e24-43bc-a6c1-ce12f7f19d66.png",
                size: new AMap.Size(40, 40),
                imageSize: new AMap.Size(40, 40),
              }),
              map: this.map,
              position: this.datalist[m][i].coordinate,
              extData: this.datalist[m][i],
            });
          } else if (m === 1) {
            marker = new AMap.Marker({
              // 自定义图标
              icon: new AMap.Icon({
                image:
                  "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/c4c8e30e-ed9a-4c0f-bca5-9019ca48a4aa.png",
                size: new AMap.Size(40, 40),
                imageSize: new AMap.Size(40, 40),
              }),
              map: this.map,
              position: this.datalist[m][i].coordinate,
              extData: this.datalist[m][i],
            });
          } else if (m === 2) {
            marker = new AMap.Marker({
              // 自定义图标
              icon: new AMap.Icon({
                image:
                  "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/7f483aa8-7a31-4f3d-a84f-c5290712424d.png",
                size: new AMap.Size(40, 40),
                imageSize: new AMap.Size(40, 40),
              }),
              map: this.map,
              position: this.datalist[m][i].coordinate,
              extData: this.datalist[m][i],
            });
          } else if (m === 3) {
            marker = new AMap.Marker({
              // 自定义图标
              icon: new AMap.Icon({
                image:
                  "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/ad32d37e-82bc-4c73-8859-eda876b59683.png",
                size: new AMap.Size(40, 40),
                imageSize: new AMap.Size(40, 40),
              }),
              map: this.map,
              position: this.datalist[m][i].coordinate,
              extData: this.datalist[m][i],
            });
          }
          this.markers.push(marker);

          console.log("点位绘制完成");

          AMap.event.addListener(marker, "click", () => {
            // this.nowMarker = marker;

            // console.log(this.infoWindow);
            this.title =
              this.datalist[m][i].name +
              '<span style="font-size:11px;">建于：' +
              this.datalist[m][i].start +
              "</span>";

            (this.content = [
              "<img src='" +
                this.datalist[m][i].mainImage +
                "'style='wtdth:100px;height:auto;'>申请人：" +
                this.datalist[m][i].applyName,
              // "单位名称：" + this.datalist[m][i].company,
              "申请类型：" + this.datalist[m][i].repairType,
              "联系方式：" + this.datalist[m][i].phone,
              `<a href="#/repair/approve` + `" class="xiangxi">详细信息</a>`,
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
            // console.log(marker.getPosition());
          });
        }
      }
    },

    //渲染遗产弹框
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

    // 关闭遗产弹框
    closeInfoWindow() {
      this.map.clearInfoWindow();
      this.searchIndustry = null;
    },
    // 维修点位添加end----------------
  },
};
</script>

<style scoped>
.legend-repair {
  position: fixed;
  right: 15px;
  top: 15px;
  z-index: 9999;
  background-color: white;
  width: 130px;
  padding: 10px 20px;
  border-radius: 0.25rem;
  box-shadow: 0 2px 6px 0 rgb(114 124 245 / 50%);
}
.legend-repair h4 {
  font-weight: bold;
  font-size: 12px;
  padding-left: 7px;
}
.legend-repair .legend-che {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.legend-repair .legend-che img {
  width: 40px;
  height: auto;
}
.legend-repair .legend-che span {
  padding-left: 10px;
}
</style>