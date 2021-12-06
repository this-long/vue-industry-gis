# 基于高德地图 API 的 VUE 项目开发踩坑

注：

- 登陆控制台请选择手机号登陆、

## 开发日志

2021 年 11 月：

- 1、27day 开发语言国际化，仅针对系统本身，不计划支持遗产介绍国际化,
  国际以及用户退出计划放到设置项内。

- 2、28day 已完成批量点数据的展示并上传线上仓库，系统开发暂停，下面进行数据库接口开发，将前端假数据替换掉后再继续进行前端开发。

- 28day 已完成点位创建接口并替换调线下假数据，后续计划开发卫星地图及各种查询,如下。

```
对不同的工业遗产进行精确查询、模糊查询、混合查询、几何查询等。
查询方式：

- 通过工业遗产名称、类型、年限等基于属性进行精准查询和模糊查询，
- 同时支持基于用户当位置、几何图形并结合遗产属性进行几何查询以及混合查询。
```

- 3、29day 完成遗产`主要内容添加`接口，卫星地图以及路网打开关闭

- 4、30day 完成通过遗产属性名查询遗产位置并跳转视口，以及复位按钮。

明日计划：注记、几何查询

2021-12

- 5、1day 注记不可行，几何查询已经实现。已经上传 git

- 6、2day 依据 type 类型动态展示覆盖点，工业旅游区数据已配置

- 7、3day 顶部展示配置(明日，开发工业遗产数据的添加)
- 8、4day 遗产添加功能已完全实现
- 9、5day 编辑功能实现,
- 10、6day 删除功能实现

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

## 云函数可行性分析

工业遗产以及博物馆的增加、删除修改。3

报修
查看报修
反馈报修

每个用户的各种详细信息

用户注册
登陆
删除、编辑

---

基于以上分析，选择采用 uni-cloud-router 技术开发接口，如此可避免接口数目限制。

且 unicloud 可以支持文件的上传。

## 数据库设计

表：

- heritageMainData：工业遗产主要信息表，通过将遗产 \_id 传入详情页进行详细内容的查询展示。

```js
// 示例数据
{
    "company": "河北峪耳崖黄金矿业有限公司",//单位名称
    "coordinate": [
        118.558439,
        40.497856
    ],//经纬度
    "address": "河北省承德市城满战自治县裕耳行值",//单位地址
    "type": "B016",//工业类别
    "start": 1958,//建成年代
    "name": "河北峪耳崖金矿工业遗产建筑群",//遗产名称
    "mainImage": ""//主页图片
}

{
    "company": "乐凯胶片集团公司",
    "coordinate": [
        115.507904,
        40.3901
    ],
       "name": "长城酿造集团中国第一瓶干白葡萄酒研发生产基地",
    "address": "河北省张家口市怀来县沙城镇",
    "type": "C151",
    "start": 1960,
    "mainImage": ""
}

```

- heritageDetails:工业遗产详情信息表，通过`主要表传递的name值来进行查询展示`，字段采用富文本的方式添加以及渲染。

- users：用户数据表，初步包括账户、密码、名下遗产、用户名（后续的其他功能可以通过账户来进行相互链接）。

```js
{
    "account":"admin",//账号
    "password":"123456",
    "userName":"管理员",//用户名
    "myHeritage":["河北峪耳崖金矿工业遗产建筑群","保定乾义面粉厂旧址","长城酿造集团中国第一瓶干白葡萄酒研发生产基地","刘伶醉古烧锅","国营保定造纸厂"]//名下遗产
    }
```

- heritageMuseum：工业博物馆主要信息表,通过将博物馆 \_id 传入详情页进行详细内容的查询展示。

```js
// 示例数据
{
    "company": "唐山工业博物馆",
    "coordinate": [
118.192433,39.634984
    ],
    "name": "唐山工业博物馆",
    "address": "河北省唐山市路北区",
    "type": "综合型博物馆",
    "start": 2017,
    "mainImage": ""
}
```

- heritageTourism:工业旅游区主要信息表 通过将旅游区\_id 传入详情页进行详细内容查询展示。

```js
// 示例数据
{
    "company": "石家庄君乐宝乳业有限公司",
    "coordinate": [
114.393934,37.966148
    ],
    "name": "石家庄君乐宝乳业文化景区",
    "address": "河北省石家庄市鹿泉区",
    "type": "乳业生产园区",
    "start": 2012,
    "mainImage": ""
}
```

## 接口开发

- 开发一个获取数据接口：

```js
// 在service文件夹内新建一个js
const { Service } = require("uni-cloud-router");
module.exports = class getHeritageMainData extends Service {
  getHeritageMainData() {
    const db = uniCloud.database();

    const collection = db.collection("contacts").get();
    return collection;
  }
};

// 为了方便记忆，所有相对应js文件命名相同
// 在controller文件夹内新建另一个同名js
const { Controller } = require("uni-cloud-router");
module.exports = class getHeritageMainData extends Controller {
  getHeritageMainData() {
    return this.service.getHeritageMainData.getHeritageMainData();
  }
};
```

- 开发一个添加数据接口

```js
// 添加工业遗产主要内容
const { Service } = require("uni-cloud-router");
module.exports = class postHeritageMainData extends Service {
  postHeritageMainData() {
    const db = uniCloud.database();

    const collection = db.collection("heritageMainData").add(
      // this.ctx.data 就是我们传入的参数，默认就是一个对象
      this.ctx.data
    );
    return collection;
  }
};
```

- 开发一个图片等文件上传的接口

```html
<!-- vue 代码 -->
<template>
  <div class="home">
    <div class="home-top">
      <MainTop>首页</MainTop>
    </div>
    <div class="home-bottom">
      <input type="file" multiple="multiple" @change="mainImage" />
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import MainTop from "../components/MainTop.vue";

  export default {
    name: "Home",
    components: {
      MainTop,
    },

    methods: {
      mainImage(e) {
        const file = e.target.files[0];
        console.log(file);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (event) => {
          let dataUrl = (this.src = event.target.result);
          var res = await this.$axios.post(
            "https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/image",
            {
              dataUrl,
              name: file.name,
            }
          );

          console.log(res);
        };
      },
    },
  };
</script>
```

```js
// uniCloud 代码
"use strict";

exports.main = async (event, context) => {
  console.log("event : ", event);
  let body = JSON.parse(event.body);
  let data, result;
  if (body.dataUrl) {
    // 前端base64   data:image/png;base64,iVBORw0KGgoAAAAN........  把前面data:image/png;base64,去掉再转buffter即可
    body.dataUrl = body.dataUrl.split(",")[1];
    data = Buffer.from(body.dataUrl, "base64");
  }
  result = await uniCloud.uploadFile({
    fileContent: data,
    cloudPath: body.name,
  });

  return result;
};
```

- 开发一个数据编辑接口，以工业遗产内容编辑为例

```js
// Cloud代码
// service.js
// 编辑工业遗产主要内容
const { Service } = require("uni-cloud-router");
module.exports = class editHeritageMainData extends Service {
  editHeritageMainData() {
    const db = uniCloud.database();

    let collection = db
      .collection("heritageMainData")
      .doc(this.ctx.data._id)
      .set(
        // this.ctx.data
        {
          addType: this.ctx.data.addType,
          name: this.ctx.data.name,
          address: this.ctx.data.address,
          type: this.ctx.data.type,
          company: this.ctx.data.company,
          jing: this.ctx.data.jing,
          wei: this.ctx.data.wei,
          start: this.ctx.data.start,
          prolevel: this.ctx.data.prolevel,
          trvlevel: this.ctx.data.trvlevel,
          scelevel: this.ctx.data.scelevel,
          brief: this.ctx.data.brief,
          details: this.ctx.data.details,
          mainImage: this.ctx.data.mainImage,
          imagesAllurl: this.ctx.data.imagesAllurl,
          coordinate: this.ctx.data.coordinate,
        }
      );
    return collection;
  }
};

// controller.js
const { Controller } = require("uni-cloud-router");
module.exports = class editHeritageMainData extends Controller {
  editHeritageMainData() {
    return this.service.editHeritageMainData.editHeritageMainData();
  }
};

// vue 代码
 async testEdit() {
      var res = await this.$axios.post(
        "https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/mainFun/editHeritageMainData/editHeritageMainData",
        {
          _id: "61ab909f291c0100018b9139",
          addType: "工业遗产",
          name: "为什么不变？？？new测试3测试3",
          address: "new测试3",
          type: "new测试3",
          company: "测试3",
          jing: 115.358093,
          wei: 39.071991,
          start: "2020",
          prolevel: "",
          trvlevel: "",
          scelevel: 4,
          brief: "<p class='test'>测试3</p>",
          details: "<p class='test'>测试3</p>",
          mainImage:
            "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/22d677cf-6455-41de-af73-e20776309469.jpg",
          imagesAllurl: [
            "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/bcaf6cf3-e4ab-452d-93a1-6369aceba0a4.jpg",
          ],
          coordinate: [115.358093, 39.071991],
        }
      );
      console.log("res---", res);
    },
```

## 接口文档

接口：

- 1、获取遗产主要内容
  url:https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/mainFun/getHeritageMainData/getHeritageMainData
  参数：无
  请求方式：get
  返回值：

  ```js
  {
    "affectedDocs": 5,
    "data": [
        {
            "_id": "61a34542a283f300016867bc",
            "company": "河北峪耳崖黄金矿业有限公司",
            "coordinate": [
                118.558439,
                40.497856
            ],
            "address": "河北省承德市城满战自治县裕耳行值",
            "type": "B016",
            "start": 1958,
            "name": "河北峪耳崖金矿工业遗产建筑群",
            "mainImage": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/84da483a-4891-40c3-99be-ab35cb1b3e5f.png"
        },
        {
            "_id": "61a345f9c29f750001ae819b",
            "company": "新中国面粉厂",
            "coordinate": [
                115.504115,
                38.849684
            ],
            "address": "河北省保定市莲池区长城南大街654号",
            "type": "C131",
            "start": 1925,
            "name": "保定乾义面粉厂旧址",
            "mainImage": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/db2b48ac-0e7d-4280-9850-4d3be57ed14e.png"
        },
        {
            "_id": "61a346660c80970001bb768f",
            "company": "张家口长城酿造(集团)有限责任公司",
            "coordinate": [
                115.507904,
                40.3901
            ],
            "address": "河北省张家口市怀来县沙城镇",
            "type": "C151",
            "start": 1960,
            "name": "长城酿造集团中国第一瓶干白葡萄酒研发生产基地",
            "mainImage": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/b2dab95f-4b1a-44ac-a464-9eacbbcc0656.png"
        },
        {
            "_id": "61a346c30c80970001bb789b",
            "company": "刘伶醉酿酒股份有限公司",
            "coordinate": [
                115.638353,
                39.004825
            ],
            "address": "河北省保定市徐水区",
            "type": "C151",
            "start": 1958,
            "name": "刘伶醉古烧锅",
            "mainImage": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/ba7d10f4-1196-4132-8f55-1b0ae51ccb24.png"
        },
        {
            "_id": "61a347053a9dc80001628579",
            "company": "保定钞票纸业有限公司",
            "coordinate": [
                115.425957,
                38.897087
            ],
            "address": "河北省保定市",
            "type": "C222",
            "start": 1956,
            "name": "国营保定造纸厂",
            "mainImage": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/ec192069-31bd-4ac7-a206-5fc9bbf5eeac.png"
        }
    ]
  }
  ```

- 2、添加遗产主要内容
  url:https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/mainFun/postHeritageMainData/postHeritageMainData

  参数：

  ```js
  {
     "company": "昌黎地王酿酒有限公司",
     "coordinate": [
     119.164415,39.69823
     ],
     "address": "河北省秦皇岛市昌黎县",
     "type": "C151",
     "start": 1958,
     "name": "昌黎地王酿酒有限公司-中国第一瓶干红葡萄酒",
     "mainImage": "https://vkceyugu.cdn.bspapp.com/     VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/     6b26f8e7-6ec3-4a61-b1c3-73f74098b7ef.png"
   }
  ```

  请求方式：post
  返回值：

  ```js
  {
    "id": "61a4b5c73d5f3a0001846ae5"//数据id
  }
  ```

- 3、编辑遗产主要内容
  url:https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/mainFun/editHeritageMainData/editHeritageMainData

  参数：

  ```js
   {
          _id: "61ab909f291c0100018b9139",
          addType: "工业遗产",
          name: "为什么不变？？？new测试3测试3",
          address: "new测试3",
          type: "new测试3",
          company: "测试3",
          jing: 115.358093,
          wei: 39.071991,
          start: "2020",
          prolevel: "",
          trvlevel: "",
          scelevel: 4,
          brief: "<p class='test'>测试3</p>",
          details: "<p class='test'>测试3</p>",
          mainImage:
            "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/22d677cf-6455-41de-af73-e20776309469.jpg",
          imagesAllurl: [
            "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/bcaf6cf3-e4ab-452d-93a1-6369aceba0a4.jpg",
          ],
          coordinate: [115.358093, 39.071991],
        }
  ```

  请求方式：post
  返回值：

  ```js
  {
    affectedDocs: 1;
    updated: 1;
    upsertedId: null;
  }
  ```

- 4、依据 id 获取单条工业遗产信息
  url:https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/mainFun/getOneHeritageMainData/getOneHeritageMainData

  参数：

  ```js
   {
        _id: this.$route.params.heritage,
      }
  ```

  请求方式：post
  返回值：

  ```js
  <!-- 该遗产数据; -->
  ```

- 3、编辑遗产主要内容
  url:https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/mainFun/editHeritageMainData/editHeritageMainData

  参数：

  ```js
   {
          _id: "61ab909f291c0100018b9139",
          addType: "工业遗产",
          name: "为什么不变？？？new测试3测试3",
          address: "new测试3",
          type: "new测试3",
          company: "测试3",
          jing: 115.358093,
          wei: 39.071991,
          start: "2020",
          prolevel: "",
          trvlevel: "",
          scelevel: 4,
          brief: "<p class='test'>测试3</p>",
          details: "<p class='test'>测试3</p>",
          mainImage:
            "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/22d677cf-6455-41de-af73-e20776309469.jpg",
          imagesAllurl: [
            "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/bcaf6cf3-e4ab-452d-93a1-6369aceba0a4.jpg",
          ],
          coordinate: [115.358093, 39.071991],
        }
  ```

  请求方式：post
  返回值：

  ```js
  {
    affectedDocs: 1;
    updated: 1;
    upsertedId: null;
  }
  ```

- 5、获取遗产博物馆主要内容
  url:https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/mainFun/getHeritageMuseum/getHeritageMuseum

  参数：无

  请求方式：get
  返回值：

  ```js
  {
    "affectedDocs": 12,
    "data": [
        {
            "_id": "61a763ea3d5f3a0001966237",
            "company": "唐山工业博物馆",
            "coordinate": [
                118.192433,
                39.634984
            ],
            "name": "唐山工业博物馆",
            "address": "河北省唐山市路北区",
            "type": "综合型博物馆",
            "start": 2017,
            "mainImage": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/392ea8ed-2ad3-466f-82a3-1c2247501f46.png"
        },
        {
            "_id": "61a889e48e97d900017109a6",
            "company": "中国铁路源头博物馆",
            "coordinate": [
                118.198669,
                39.62063
            ],
            "name": "中国铁路源头博物馆",
            "address": "河北省唐山市路南区",
            "type": "铁路业",
            "start": 2018,
            "mainImage": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/faa6833d-6d0a-4c99-a969-164346bc722c.png"
        }...
    ]
  }
  ```

- 6、 添加工业博物馆主要
  url:https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/mainFun/postHeritageMuseum/postHeritageMuseum

- 7、获取`工业旅游区`主要内容
  url:https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/mainFun/getHeritageTourism/getHeritageTourism

  参数：无

  请求方式：get
  返回值：

  ```js
  {
    "affectedDocs": 14,
    "data": [
        {
            "_id": "61a8be0654ebf6000194750b",
            "company": "石家庄君乐宝乳业有限公司",
            "coordinate": [
                114.393934,
                37.966148
            ],
            "name": "石家庄君乐宝乳业文化景区",
            "address": "河北省石家庄市鹿泉区",
            "type": "乳业生产园区",
            "start": 2012,
            "mainImage": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/0999b84b-077d-4fd2-98a5-a189db96c1cd.png"
        },
        {
            "_id": "61a8bf2c344587000171c8c8",
            "company": "井矿集团",
            "coordinate": [
                114.032609,
                38.037056
            ],
            "name": "段家楼正丰矿工业旅游景区",
            "address": "河北省石家庄市井径矿区",
            "type": "工业遗址旅游",
            "start": 1912,
            "mainImage": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/9e2a5e4b-08ae-4271-b9d0-45321499666a.png"
        }...
    ]
  }
  ```

```js
{
"addType":"",
"jing": 0,
"wei": 0,
"prolevel": "",
"trvlevel": "",
"scelevel": 0,
"brief": "",
"details": "",
"imagesAllurl": [],
}
```

- 8 添加工业旅游区主要内
  url:https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/mainFun/postHeritageTourism/postHeritageTourism
