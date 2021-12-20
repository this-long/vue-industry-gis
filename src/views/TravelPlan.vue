<template>
  <!-- 出行规划 -->
  <div class="travel-plan">
    <!-- <div class="travel-plan-top">
      <MainTop>我要旅行 <span class="gang"> / </span> 出行规划</MainTop>
    </div> -->

    <div class="opePanel" v-if="mainType.length !== 0" v-show="opePanel">
      <p class="opetitle">出行规划查看面板</p>
      <el-divider><span>遗产简介</span></el-divider>
      <span>景区类型：</span>
      <span class="greyText">{{ mainType[0] }}</span>
      <br />
      <span>景区名称：</span>

      <span class="greyText">{{ mainType[1].name }}</span>
      <br />
      <span>景区地址：</span>
      <span class="greyText">{{ mainType[1].address }}</span>
      <br />
      <span>所属公司：</span>
      <span class="greyText">{{ mainType[1].company }}</span>
      <br />
      <span>始建年限：</span>
      <span class="greyText">{{ mainType[1].start }}</span>
      <br />
      <span>景区类型：</span>
      <span class="greyText">{{ mainType[1].type }}</span>
      <br />
      <span>详细地址：</span>
      <span class="greyText">{{ geocoderText }}</span>
      <el-divider><span>天气预报</span></el-divider>
      <span>城市/区：</span>
      <span class="greyText">{{ todayWeather.city }}</span>
      <br />
      <span>天气：</span>
      <span class="greyText">{{ todayWeather.weather }}</span>
      <br />
      <span>温度：</span>
      <span class="greyText">{{ todayWeather.temperature }}</span>
      <br />
      <span>风向：</span>
      <span class="greyText">{{ todayWeather.windDirection }}</span>
      <br />
      <span>风力：</span>
      <span class="greyText">{{ todayWeather.windPower }}</span>
      <br />
      <span>空气湿度：</span>
      <span class="greyText">{{ todayWeather.humidity }}</span>
      <br />
      <span>发布时间：</span>
      <span class="greyText">{{ todayWeather.reportTime }}</span>
      <br />
      <br />
      <el-button
        type="primary"
        size="mini"
        @click="isfourDayWeather = true"
        v-if="!isfourDayWeather"
        >查看未来4天天气预报</el-button
      >
      <el-button
        type="primary"
        size="mini"
        @click="isfourDayWeather = false"
        v-else
        >关闭未来4天天气预报</el-button
      >
      <br />

      <div v-if="fourDayWeatherList.length && isfourDayWeather">
        <br />
        <div
          class="weatherList"
          v-for="(ele, index) in fourDayWeatherList"
          :key="index"
        >
          <span class="fourtext">日期：{{ ele.date }} | </span>
          <span class="fourtext">天气：{{ ele.dayWeather }} | </span>
          <span class="fourtext"
            >气温：{{ ele.nightTemp }} ~ {{ ele.dayTemp }}℃</span
          >
        </div>
      </div>
      <el-divider><span>规划推荐线路</span></el-divider>
      <el-radio v-model="radio" label="LEAST_TIME">最快捷</el-radio>
      <el-radio v-model="radio" label="LEAST_FEE">最经济</el-radio>
      <el-radio v-model="radio" label="LEAST_DISTANCE">最短距离</el-radio>
      <el-radio v-model="radio" label="REAL_TRAFFIC">考虑实时路况</el-radio>
      <br />
      <br />
      <el-button type="primary" size="mini" @click="getDrvie"
        >查看推荐线路</el-button
      >
      <el-button type="primary" size="mini" @click="clearDrvie" v-if="driving"
        >清空线路</el-button
      >
      <el-divider>
        <span class="fourtext">查看周边：</span><span>吃喝玩乐</span>
      </el-divider>

      <el-autocomplete
        class="inline-input"
        v-model="periphery"
        :fetch-suggestions="querySearch"
        placeholder="请输入想要查询的周边内容"
        size="mini"
      ></el-autocomplete>
      <br />
      <div>
        <br />
        <span>查询范围</span><br />
        <el-radio v-model="perRange" :label="1000">1千米</el-radio>
        <el-radio v-model="perRange" :label="2000">2千米</el-radio>
        <el-radio v-model="perRange" :label="3000">3千米</el-radio>
        <el-radio v-model="perRange" :label="5000">5千米</el-radio>
        <br />
        <br />
      </div>
      <el-button type="primary" size="mini" @click="getperiphery"
        >查找</el-button
      >
      <el-button
        type="primary"
        size="mini"
        @click="clearperiphery"
        v-if="placeSearch"
        >清空查找结果</el-button
      >
      <el-divider>
        <span class="fourtext">预算评估</span>
      </el-divider>
      <el-button type="primary" size="mini" @click="moneyplan"
        >点击进行预算评估</el-button
      >
    </div>

    <div class="travel-plan-bottom">
      <div class="travel-plan-btns">
        <el-cascader
          class="maincascader"
          size="mini"
          v-model="mainType"
          :options="selOptions"
          @change="handleChange"
          placeholder="请选择出行目的地"
        ></el-cascader>
        <el-button
          class="tranPlanBtn"
          type="primary"
          size="mini"
          @click="openOpePanel"
          v-if="!opePanel"
          >进行规划</el-button
        >
        <el-button
          v-else
          class="tranPlanBtn"
          type="primary"
          size="mini"
          @click="opePanel = false"
          >关闭面板</el-button
        >

        <el-button size="mini" @click="dialogVisible = true"
          >查看当前位置</el-button
        >
      </div>

      <div id="container" class="container"></div>
      <div id="panel"></div>
      <div id="place"></div>
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
    src="https://webapi.amap.com/maps?v=1.4.15&key=2eccb47b400c8ab58f2dc596dbfe9d53&plugin=AMap.MouseTool,AMap.Driving,AMap.DistrictSearch,AMap.Geocoder"></script>
<script>
import { mapState } from "vuex";

export default {
  components: {},

  data() {
    return {
      map: "",
      district: null,
      geolocation: null,
      geolocationRes: {}, //定位结果
      dialogVisible: false, //查看当前位置对话框

      mainType: [],
      selOptions: [
        {
          value: "工业遗产",
          label: "工业遗产",
          children: [],
        },
        {
          value: "工业博物馆",
          label: "工业博物馆",
          children: [],
        },
        {
          value: "工业旅游区",
          label: "工业旅游区",
          children: [],
        },
      ], //级联选择器数据

      opePanel: false, //控制面板显示与隐藏
      geocoder: null, //坐标解析实例
      geocoderText: "", //解析结果
      weatherPlace: "",
      todayWeather: {},
      isfourDayWeather: false,
      fourDayWeatherList: [],

      drivingOption: null, //出行线路
      driving: null,
      radio: "LEAST_TIME", //路线类型

      periphery: "", //周边查询关键词
      perRange: 1000, //查询范围
      restaurants: [
        {
          value: "宾馆",
        },
        {
          value: "酒店",
        },
        {
          value: "停车场",
        },
        {
          value: "公园",
        },
        {
          value: "超市",
        },
        {
          value: "医院",
        },
        {
          value: "学校",
        },
      ],
      placeSearch: null, //周边查询类
    };
  },
  computed: {
    ...mapState(["lang"]),
  },

  created() {
    this.getOptions();
  },
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
            // console.log("定位结果", result);
            this.geolocationRes = result;
            console.log(this.geolocationRes);
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

    // 初始化级联选择器数据
    async getOptions() {
      var res1 = await this.$axios.get(
        "/getHeritageMainData/getHeritageMainData"
      );
      // console.log("工业遗产", res1);
      this.selOptions[0].children = res1.data.data.map((ele) => {
        return {
          value: ele,
          label: ele.name,
        };
      });

      var res2 = await this.$axios.get("/getHeritageMuseum/getHeritageMuseum");
      // console.log("工业bwguan", res2);

      this.selOptions[1].children = res2.data.data.map((ele) => {
        return {
          value: ele,
          label: ele.name,
        };
      });

      var res3 = await this.$axios.get(
        "/getHeritageTourism/getHeritageTourism"
      );

      this.selOptions[2].children = res3.data.data.map((ele) => {
        return {
          value: ele,
          label: ele.name,
        };
      });
      console.log("all", this.selOptions);
    },

    //选择了一级数据
    handleChange(value) {
      console.log(value);
      this.opePanel = false;
    },

    //进行规划
    openOpePanel() {
      if (this.mainType.length !== 0) {
        this.getHeritageAddress();
        // this.getWeather();
        this.opePanel = true;
      } else {
        this.$message({
          message: "请先选择出行目的地在进行旅行规划",
          type: "warning",
        });
      }
    },

    // 解析遗产坐标
    getHeritageAddress() {
      this.geocoder = new AMap.Geocoder({
        // city: "010", //城市设为北京，默认：“全国”
        radius: 1000, //范围，默认：500
      });
      this.geocoder.getAddress(
        this.mainType[1].coordinate,
        (status, result) => {
          if (status === "complete" && result.regeocode) {
            this.geocoderText = result.regeocode.formattedAddress;
            var start = this.geocoderText.search("省");
            var end = this.geocoderText.search("市");
            // console.log(address);
            // console.log(start, end, this.geocoderText);
            // 获取市名
            this.weatherPlace = this.geocoderText.slice(start + 1, end);

            // 获取天气预报start
            AMap.plugin("AMap.Weather", () => {
              var weather = new AMap.Weather();
              //查询实时天气信息, 查询的城市到行政级别的城市，如朝阳区、杭州市
              weather.getLive(this.weatherPlace, (err, data) => {
                if (!err) {
                  console.log("当天天气", data);
                  this.todayWeather = data;
                }
              });
              //未来4天天气预报
              weather.getForecast(this.weatherPlace, (err, data) => {
                if (err) {
                  return;
                }

                this.fourDayWeatherList = data.forecasts;
                console.log("四天天气", this.fourDayWeatherList);
              });
            });
            // 获取天气预报end

            // console.log(this.weatherPlace);
          } else {
            log.error("根据经纬度查询地址失败");
          }
        }
      );
    },

    // // 路线

    getDrvie() {
      console.log(111);
      if (this.driving) {
        this.driving.clear();
      }

      if (this.radio === "LEAST_TIME") {
        this.drivingOption = {
          policy: AMap.DrivingPolicy.LEAST_TIME, // 其它policy参数请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy
          ferry: 1, // 是否可以使用轮渡
          province: "冀", // 车牌省份的汉字缩写
          map: this.map,
          panel: "panel",
          autoFitView: true,
        };
      } else if (this.radio === "LEAST_FEE") {
        this.drivingOption = {
          policy: AMap.DrivingPolicy.LEAST_FEE, // 其它policy参数请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy
          ferry: 1, // 是否可以使用轮渡
          province: "冀", // 车牌省份的汉字缩写
          map: this.map,
          panel: "panel",
          autoFitView: true,
        };
      } else if (this.radio === "LEAST_DISTANCE") {
        this.drivingOption = {
          policy: AMap.DrivingPolicy.LEAST_DISTANCE, // 其它policy参数请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy
          ferry: 1, // 是否可以使用轮渡
          province: "冀", // 车牌省份的汉字缩写
          map: this.map,
          panel: "panel",
          autoFitView: true,
        };
      } else if (this.radio === "REAL_TRAFFIC") {
        this.drivingOption = {
          policy: AMap.DrivingPolicy.REAL_TRAFFIC, // 其它policy参数请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy
          ferry: 1, // 是否可以使用轮渡
          province: "冀", // 车牌省份的汉字缩写
          map: this.map,
          panel: "panel",
          autoFitView: true,
        };
      }

      // 构造路线导航类
      this.driving = new AMap.Driving(this.drivingOption);

      // 根据起终点经纬度规划驾车导航路线
      // console.log("当前位置", this.geolocationRes.position);
      // console.log("目标位置", this.mainType);
      this.driving.search(
        [this.geolocationRes.position.R, this.geolocationRes.position.Q],
        this.mainType[1].coordinate,
        (status, result) => {
          // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
          if (status === "complete") {
            this.$message({
              message: "绘制驾车路线完成",
              type: "success",
            });

            console.log(result);
          } else {
            this.$message.error("获取驾车数据失败：");
          }
        }
      );
    },

    // 清空规划的路线
    clearDrvie() {
      this.driving.clear();
      this.driving = null;
      this.$message({
        message: "驾车路线已清空",
        type: "success",
      });
    },

    // 带有提示的输入框
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
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    // end
    // 查找周边
    getperiphery() {
      console.log(this.periphery);
      console.log(this.perRange);
      if (this.placeSearch) {
        this.placeSearch.clear();
        this.placeSearch = null;
      }

      if (this.periphery !== "") {
        AMap.service(["AMap.PlaceSearch"], () => {
          //构造地点查询类
          this.placeSearch = new AMap.PlaceSearch({
            type: this.periphery, // 兴趣点类别
            pageSize: 20, // 单页显示结果条数
            pageIndex: 1, // 页码

            map: this.map, // 展现结果的地图实例
            panel: "place", // 结果列表将在此容器中进行展示。
            autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
          });

          var cpoint = this.mainType[1].coordinate; //中心点坐标
          this.placeSearch.searchNearBy(
            "",
            cpoint,
            this.perRange,
            function (status, result) {}
          );
        });

        this.opePanel = false;
        this.$message({
          message: "为便于查看，出行规划面板已展示关闭，如需要再次打开即可。",
          type: "warning",
        });
      } else {
        this.$message.error("请选择查询关键词");
      }
    },
    // 清空查找结果
    clearperiphery() {
      this.placeSearch.clear();
      this.placeSearch = null;
    },

    // 跳转预算评估
    moneyplan() {
      console.log("moneyplan");
      this.$router.push({
        path: "/travel/money",
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
.maincascader .el-input input {
  width: 300px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.tranPlanBtn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: none;
}
.opePanel {
  position: absolute;
  right: 15px;
  top: 55px;
  z-index: 999;
  padding: 15px;
  width: 30%;
  height: 85vh;
  overflow: auto;
  background-color: white;
}

.opetitle {
  margin: 0;
  font-weight: 600;
}

/* .fourtext {
  margin-right: 10px;
} */
#panel {
  position: absolute;
  left: 175px;
  /* border: 1px solid silver; */
}
#panel .amap-call {
  display: none;
}
/* #panel .amap-lib-driving {
  border: none;
} */
</style>