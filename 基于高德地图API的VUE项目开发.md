# 基于高德地图 API 的 VUE 项目开发踩坑

注：

- 登陆控制台请选择手机号登陆、

## 开发日志

2021 年 11 月

- 27day 开发语言国际化，仅针对系统本身，不计划支持遗产介绍国际化,
  国际以及用户退出计划放到设置项内。

## 显示地图

```js
  methods: {
    initMap() {
      this.map = new AMap.Map("container", {
        zoom: 11, //级别
        center: [116.397428, 39.90923], //中心点坐标
        // viewMode: "3D", //使用3D视图
        mapStyle: "amap://styles/whitesmoke",
      });
    },
  },

    mounted() {
    this.initMap();//地图初始化必须要在 mounted 生命周期内，在created内的话无法正常显示，但是不会报错。ECharts在绘制图形时同样需要注意这个问题。
  },
```

## JS API

在使用 JS API 时注意 key 的类型，web 服务主要针对线上服务，Web 端才是 JS API 的 key，key 不正确不报错但是不会返回结果。
