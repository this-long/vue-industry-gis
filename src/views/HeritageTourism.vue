<template>
  <!-- 工业旅游区 -->
  <div class="heritage-tourism">
    <div class="heritage-museum">
      <div class="heritage-industry">
        <!-- 地图容器 -->
        <div id="container" class="container">
          <div class="map-buttons">
            <!-- 类型搜索start -->
            <el-select
              class="typeSelect"
              v-model="typeSelect"
              placeholder="请选择类型"
              size="mini"
            >
              <el-option
                v-for="item in options"
                :key="item.type"
                :label="item.type"
                :value="item.type"
              >
              </el-option>
            </el-select>
            <el-button
              id="selectBtn"
              class="selectBtn"
              size="mini"
              icon="el-icon-search"
              @click="searchTypeClick"
            ></el-button>
            <!-- 类型搜索end -->

            <!-- 带有输入建议的搜索框start -->
            <el-autocomplete
              class="inline-input"
              v-model="searchIndustry"
              :fetch-suggestions="querySearch"
              :placeholder="
                lang === 'zh_cn' ? '请输入工业旅游区名称' : 'Please enter'
              "
              @select="handleSelect"
              value-key="name"
              size="mini"
              style="width: 300px; margin-right: 10px"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchIndustryCli"
              ></el-button>
            </el-autocomplete>
            <!-- 带有输入建议的搜索框end -->

            <el-button
              v-show="!geometryBox"
              size="mini"
              @click="opengeometryBox"
              class="map-btn map-element"
              >{{
                lang === "zh_cn" ? "几何查询" : "Geometric query"
              }}</el-button
            >
            <el-button
              v-show="geometryBox"
              size="mini"
              @click="closegeometryBox"
              class="map-btn map-element closegeometryBox"
              >{{ lang === "zh_cn" ? "关闭面板" : "Close panel" }}</el-button
            >

            <el-button
              size="mini"
              @click="addRoadLayer"
              v-show="!roadNetwork"
              class="map-btn map-element"
              >{{ lang === "zh_cn" ? "打开路网" : "Open road" }}</el-button
            >
            <el-button
              size="mini"
              @click="removeRoadLayer"
              v-show="roadNetwork"
              class="map-btn map-element"
              >{{ lang === "zh_cn" ? "关闭路网" : "Close road" }}</el-button
            >

            <el-button
              size="mini"
              @click="addSatellite"
              v-show="isOrdMap"
              class="map-btn map-element"
              >{{ lang === "zh_cn" ? "卫星地图" : "Satellite map" }}</el-button
            >
            <el-button
              size="mini"
              @click="removeSatellite"
              v-show="!isOrdMap"
              class="map-btn map-element"
              >{{ lang === "zh_cn" ? "普通地图" : "General map" }}</el-button
            >

            <el-button
              size="mini"
              @click="resetMap"
              class="map-btn map-element"
              >{{ lang === "zh_cn" ? "复位" : "Reset" }}</el-button
            >
          </div>

          <!-- 几何查询弹框 -->
          <div v-show="geometryBox" class="geometrySearch">
            <el-radio-group v-model="geometrySearchType">
              <span class="geometryType"
                >{{
                  lang === "zh_cn"
                    ? "请选择绘制的几何元素类型"
                    : "Please select the type of geometric element to draw"
                }}<el-popover
                  placement="top-start"
                  :title="lang === 'zh_cn' ? '提示' : 'Tips'"
                  width="200"
                  trigger="hover"
                  style="font-size: 10px"
                  :content="
                    lang === 'zh_cn'
                      ? '每次选择完元素类型后点击绘制元素按钮进行绘制，每次选择后可绘制一次，如要再次绘制请重新选择。'
                      : 'After selecting the element type each time, click the draw element button to draw. You can draw once after each selection. If you want to draw again, please select again.'
                  "
                >
                  <i slot="reference" class="el-icon-question"></i>
                  <!-- <el-button slot="reference">hover 激活</el-button> -->
                </el-popover>
              </span>
              <br />
              <el-radio :label="'circle'">{{
                lang === "zh_cn" ? "绘制圆形" : "circle"
              }}</el-radio>
              <el-radio :label="'rectangle'">{{
                lang === "zh_cn" ? "绘制矩形" : "rectangle"
              }}</el-radio>
              <el-radio :label="'polygon'">{{
                lang === "zh_cn" ? "绘制多边形" : "polygon"
              }}</el-radio>
            </el-radio-group>
            <div class="geometryBtns">
              <el-button
                size="mini"
                type="primary"
                @click="drawGeometry"
                class="map-btn map-element"
                >{{ lang === "zh_cn" ? "绘制元素" : "Draw element" }}</el-button
              >
              <el-button
                size="mini"
                type="primary"
                @click="clearDrawGeometry"
                class="map-btn map-element"
                >{{ lang === "zh_cn" ? "清除" : "Clear" }}</el-button
              >
              <el-button
                size="mini"
                type="primary"
                @click="closeDraw"
                class="map-btn map-element"
                >{{
                  lang === "zh_cn" ? "清除并关闭面板" : "Clear and close"
                }}</el-button
              >

              <el-button
                size="mini"
                type="primary"
                v-show="issearchRes"
                @click="changeissearchRes"
                class="map-btn map-element"
                >{{ lang === "zh_cn" ? "关闭结果" : "Close result" }}</el-button
              >
              <el-button
                size="mini"
                type="primary"
                v-show="!issearchRes"
                @click="changeissearchRes"
                class="map-btn map-element"
                >{{ lang === "zh_cn" ? "打开结果" : "Open result" }}</el-button
              >
            </div>
            <!-- 查询数据结果 -->
            <div class="searchRes" v-show="issearchRes">
              <el-table
                :data="geometrySearchRes"
                height="250"
                border
                style="width: 100%"
              >
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form
                      style="font-size: 12px"
                      label-position="left"
                      inline
                      class="demo-table-expand"
                    >
                      <el-form-item
                        :label="lang === 'zh_cn' ? '旅游区名称' : 'Tourist'"
                      >
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item
                        :label="lang === 'zh_cn' ? '景区地址' : 'Address'"
                      >
                        <span>{{ props.row.address }}</span>
                      </el-form-item>
                      <el-form-item
                        :label="lang === 'zh_cn' ? '单位名称' : 'Company'"
                      >
                        <span>{{ props.row.company }}</span>
                      </el-form-item>
                      <el-form-item
                        :label="lang === 'zh_cn' ? '始建时间' : 'Start'"
                      >
                        <span>{{ props.row.start }}</span>
                      </el-form-item>
                      <el-form-item
                        :label="lang === 'zh_cn' ? '类型' : 'Tourist category'"
                      >
                        <span>{{ props.row.type }}</span>
                      </el-form-item>
                      <!-- <el-form-item label="所属店铺">
                    <span>{{ props.row.shop }}</span>
                  </el-form-item> -->
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="start"
                  :label="lang === 'zh_cn' ? '建于' : 'Start'"
                  width="70"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  :label="lang === 'zh_cn' ? '景区名称' : 'Tourist name'"
                >
                </el-table-column>
                <el-table-column
                  :label="lang === 'zh_cn' ? '查看详情' : 'Details'"
                  width="80"
                >
                  <template slot-scope="row">
                    <el-button type="text" size="mini" @click="lookthis(row)">{{
                      lang === "zh_cn" ? "查看" : "More"
                    }}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=2eccb47b400c8ab58f2dc596dbfe9d53&plugin=AMap.MouseTool,AMap.DistrictSearch"></script>
<script>
import { mapState } from "vuex";
export default {
  name: "HeritageMuseum",

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

      dataList: null, // 工业遗产数据
      isOrdMap: true, //判断是卫星图还是普通图，普通图为true
      satellite: null, //用来存储卫星地图影像
      roadNetwork: false, //是否具有路网，默认没有
      roadNetLayer: null, //用来存储路网

      // 带有输入建议的搜索框
      restaurants: [],
      searchIndustry: "",
      searchObj: null,
      markers: [],

      // 几何查询
      geometrySearchType: "circle",
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
    ...mapState(["lang"]),
  },
  async created() {
    var res = await this.$axios.get("/getHeritageTourism/getHeritageTourism");
    this.dataList = res.data.data;

    // var res2 = await this.$axios.get("/getHeritageTourism/getHeritageTourism");
    // console.log("res2-------", res2.data.data);

    this.getAllType(); //初始化下拉菜单
  },

  mounted() {
    this.initMap(); //初始化地图

    // this.disSearch();
    this.addMarker();
    this.drawBounds();
    this.mouseTool = new AMap.MouseTool(this.map);

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
        mapStyle: "amap://styles/normal",
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

    // 添加工业遗产点集
    async addMarker() {
      var res = await this.$axios.get("/getHeritageTourism/getHeritageTourism");
      // console.log("请求结果", res);
      this.dataList = res.data.data;
      this.restaurants = res.data.data; //绑定输入建议数据
      console.log("请求结果", this.dataList);

      for (let i = 0; i < this.dataList.length; i++) {
        // 循环点坐标
        // 注意这里一定得用 let
        let marker = new AMap.Marker({
          map: this.map,
          position: this.dataList[i].coordinate,
          extData: this.dataList[i],
        });

        this.markers.push(marker);

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
            "类型：" + this.dataList[i].type,
            `<a href="#/heritage/industry/main/` +
              this.dataList[i]._id +
              `" class="xiangxi">详细信息</a>`,
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

    // 打开卫星地图
    addSatellite() {
      // console.log(111);
      this.isOrdMap = !this.isOrdMap;
      this.satellite = new AMap.TileLayer.Satellite();
      this.map.add(this.satellite);
    },

    // 关闭卫星地图
    removeSatellite() {
      this.isOrdMap = !this.isOrdMap;
      this.map.remove(this.satellite);
    },

    // 打开路网
    addRoadLayer() {
      this.roadNetwork = !this.roadNetwork;
      this.roadNetLayer = new AMap.TileLayer.RoadNet();
      this.map.add(this.roadNetLayer);
    },

    // 关闭路网
    removeRoadLayer() {
      this.roadNetwork = !this.roadNetwork;
      this.map.remove(this.roadNetLayer);
    },
    // 输入建议start
    handleSelect(item) {
      console.log(item);
      this.searchObj = item;
      console.log(this.searchIndustry);
    },

    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },

    // 点击搜索按钮
    searchIndustryCli() {
      // var targetMarker;
      // console.log("markers", this.markers[1].getExtData());
      // var res = this.markers.find((ele) => {
      //   console.log(ele.getExtData()._id);
      //   console.log(this.searchObj._id);
      //   return (ele.getExtData()._id = this.searchObj._id);
      // });
      // console.log(index);

      // console.log(this.markers[index]);
      this.addMarker();
      var title =
        this.searchObj.name +
        '<span style="font-size:11px;">建于：' +
        this.searchObj.start +
        "</span>";
      var content = [
        "<img src='" +
          this.searchObj.mainImage +
          "'style='wtdth:100px;height:auto;'>地址：" +
          this.searchObj.address,
        // "单位名称：" + this.searchObj.company,
        "类型：" + this.searchObj.type,
        `<a href="#/heritage/industry/main/` +
          this.searchObj._id +
          `" class="">详细信息</a>`,
      ];

      var infoWindow = new AMap.InfoWindow({
        position: this.searchObj.coordinate,
        isCustom: true, //使用自定义窗体
        // content: '  <div style="background-color:white">111</div>',
        content: this.createInfoWindow(title, content.join("<br/>")),
        offset: new AMap.Pixel(16, -45),
      });
      // infoWindow.open(this.map, marker.getPosition());
      // console.log(marker.getPosition());
      infoWindow.open(this.map);

      this.map.setCenter(this.searchObj.coordinate); //设置地图中心点为当前位置
    },
    // 输入建议end

    // 复位事件
    resetMap() {
      location.reload();
      // this.map.setCenter([115.464523, 38.874476]);
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
      // if (this.geometrySearchType === "Rectangle") {

      if (!this.geometrySearchType) {
        this.$message({
          message: "请先选择几何元素类型再开始绘制",
          type: "warning",
        });
      }

      console.log(this.geometrySearchType);
      switch (this.geometrySearchType) {
        case "polygon": {
          this.mouseTool.polygon({
            fillColor: "#00b0ff",
            strokeColor: "#80d8ff",
            //同Polygon的Option设置
          });
          break;
        }
        case "rectangle": {
          this.mouseTool.rectangle({
            fillColor: "#00b0ff",
            strokeColor: "#80d8ff",
            //同Polygon的Option设置
          });
          break;
        }
        case "circle": {
          this.mouseTool.circle({
            fillColor: "#00b0ff",
            strokeColor: "#80d8ff",
            //同Circle的Option设置
          });
          break;
        }
      }
      // this.mouseTool.close(); //关闭，并清除覆盖物
      this.mouseTool.on("draw", (e) => {
        this.overlays.push(e.obj);
        // console.log("e.obj---------", e.obj.contains([115.638353, 39.004825]));

        // 遍历点位，判断是否在范围内
        for (let i = 0; i < this.dataList.length; i++) {
          if (e.obj.contains(this.dataList[i].coordinate)) {
            if (
              !this.geometrySearchRes.some(
                (ele) => ele.name === this.dataList[i].name
              )
            ) {
              this.geometrySearchRes.push(this.dataList[i]);
            }
          }
        }
        // console.log("几何查询结果geometrySearchRes", this.geometrySearchRes);
        this.mouseTool.close(); //关闭
        this.geometrySearchType = null;
      }); //解除绑定，
    },

    clearDrawGeometry() {
      this.mouseTool.close(true);
      this.geometrySearchRes = [];
    },
    closeDraw() {
      this.mouseTool.close(true);
      this.geometryBox = false;

      this.geometrySearchRes = [];
    },

    changeissearchRes() {
      this.issearchRes = !this.issearchRes;
    },

    // 查询结果跳转详情
    lookthis(row) {
      console.log(row);
      // this.$router.push({
      //   name: `industryMain`,
      //   params: { heritage: row._id },
      // });
      this.$router.push("/heritage/industry/main/" + row.row._id);
    },

    // 类型查询start
    async getAllType() {
      // var res = await this.$axios.get(
      //   "/getHeritageTourism/getHeritageTourism"
      // );
      // res = res.data.data;
      // console.log("请求结果", res);
      // this.dataList = res.data.data;
      // console.log(this.dataList);

      for (let i = 0; i < this.dataList.length; i++) {
        if (!this.options.some((ele) => ele.type === this.dataList[i].type)) {
          this.options.push(this.dataList[i]);
        }
      }
      console.log(this.options);
    },

    searchTypeClick() {
      console.log(this.typeSelect);
      this.map.remove(this.markers);
      this.map.clearInfoWindow();
      if (this.typeSelect === "全部类型") {
        this.addMarker();
      } else {
        var filEnd = this.dataList.filter(
          (ele) => ele.type === this.typeSelect
        );
        console.log(filEnd);
        // this.map.clearMap();
        for (let i = 0; i < filEnd.length; i++) {
          // 循环点坐标
          // 注意这里一定得用 let
          let marker = new AMap.Marker({
            map: this.map,
            position: filEnd[i].coordinate,
            extData: filEnd[i],
          });

          this.markers.push(marker);

          AMap.event.addListener(marker, "click", () => {
            // this.nowMarker = marker;

            // console.log(this.infoWindow);
            this.title =
              filEnd[i].name +
              '<span style="font-size:11px;">建于：' +
              filEnd[i].start +
              "</span>";

            (this.content = [
              "<img src='" +
                filEnd[i].mainImage +
                "'style='wtdth:100px;height:auto;'>地址：" +
                filEnd[i].address,
              // "单位名称：" + filEnd[i].company,
              "类型：" + filEnd[i].type,
              `<a href="#/heritage/industry/main/` +
                filEnd[i]._id +
                `" class="xiangxi">详细信息</a>`,
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
        // this.map.setFitView();
        // AMap.event.addDomListener(
        //   document.getElementById("selectBtn"),
        //   "click",
        //   () => {
        //     this.map.setFitView();
        //   }
        // );
      }
    },
    // 类型查询end
  },
};
</script>

<style>
.heritage-industry #container {
  border-bottom: 1px solid #f9d5a7;
}
/* 弹框样式 */
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

.xiangxi {
  color: #555;
}

/* 地图元件样式 */
.heritage-industry .map-buttons {
  padding: 15px;
  z-index: 999;
  position: absolute;
  top: 0;
  right: 0;
}

.heritage-industry .geometrySearch {
  position: absolute;
  top: 60px;
  right: 0;
  z-index: 999;
  background-color: white;
  padding: 15px;
  border-radius: 5px;
  margin-right: 15px;
  border: 1px solid #dcdfe6;
}

.heritage-industry .geometrySearch .geometryType {
  display: block;
  padding-bottom: 15px;
  color: #606266;
}
.heritage-industry .geometrySearch .geometryBtns {
  padding-top: 15px;
}

.heritage-industry .map-buttons .closegeometryBox {
  margin-left: 0;
}

.heritage-industry .geometrySearch .searchRes {
  padding-top: 15px;
}

.heritage-industry .geometrySearch .searchRes .el-form-item__label {
  font-size: 12px;
  color: #111;
}
.heritage-industry .geometrySearch .searchRes .el-form-item {
  margin: 0;
  padding-left: 10px;
}
.heritage-industry .map-buttons .el-input__inner {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-right: none;
}
.heritage-industry .map-buttons .selectBtn {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  margin-right: 10px;
}
</style>