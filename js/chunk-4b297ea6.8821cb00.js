(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4b297ea6"],{"2cab":function(a,t,e){"use strict";e("8845")},8845:function(a,t,e){},e4fb:function(a,t,e){"use strict";e.r(t);var i=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"ApplyHeritageMain"},[e("div",{staticClass:"ApplyHeritageMain-top"},[e("MainTop",[a._v("遗产数据 "),e("span",{staticClass:"gang"},[a._v(" / ")]),a._v(" 遗产详情")])],1),e("div",{staticClass:"ApplyHeritageMain-bottom padding15"},[null!==a.heritageMainData?e("el-card",{staticClass:"box-card",attrs:{shadow:"hover"}},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("span",{staticClass:"title"},[a._v(a._s(a.heritageMainData.name))]),e("div",[e("span",{staticStyle:{"margin-right":"10px"}},[a._v(a._s(a.heritageMainData.addType))]),"pending"===a.heritageMainData.approvalStatus?e("el-tag",{attrs:{type:"info"}},[a._v("待审批")]):a._e(),"adopt"===a.heritageMainData.approvalStatus?e("el-tag",{attrs:{type:"success"}},[a._v("已通过")]):a._e(),"reject"===a.heritageMainData.approvalStatus?e("el-tag",{attrs:{type:"danger"}},[a._v("已驳回")]):a._e(),""!==a.heritageMainData.rejectComment?e("el-tag",{attrs:{type:"danger"}},[a._v(a._s(a.heritageMainData.rejectComment))]):a._e()],1)]),e("div",{staticClass:"text item"},[e("div",[e("div",{staticClass:"text-che"},[e("span",[a._v("始建年份："+a._s(a.heritageMainData.start))])])]),e("div",{staticClass:"text-che"},[e("span",[a._v("遗产类型："+a._s(a.heritageMainData.type))])]),e("div",{staticClass:"text-che"},[e("span",[a._v("遗产地址："+a._s(a.heritageMainData.address))])]),e("div",{staticClass:"text-che"},[e("span",[a._v("所属公司："+a._s(a.heritageMainData.company))])]),e("div",{staticClass:"text-che"},[e("span",[a._v("地理坐标："+a._s(a.heritageMainData.jing)+","+a._s(a.heritageMainData.wei))])]),e("div",{staticClass:"text-che"},[e("span",[a._v(" 保护等级及再利用情况：")]),e("p",[a._v(" "+a._s(a.heritageMainData.prolevel?a.heritageMainData.prolevel:"暂无数据")+" ")])]),e("div",{staticClass:"text-che"},[e("span",[a._v("旅游景区等级： "+a._s(a.heritageMainData.scelevel?a.heritageMainData.scelevel+"A级示范景区":"暂无数据"))])]),e("div",{staticClass:"text-che"},[e("span",[a._v("工业旅游示范点等级： "+a._s(a.heritageMainData.trvlevel?a.heritageMainData.trvlevel:"暂无数据"))])]),e("el-divider"),e("div",{staticClass:"text-che"},[e("span",[a._v("遗产简介： ")])]),e("div",{staticClass:"text-che",domProps:{innerHTML:a._s(a.heritageMainData.brief)}}),e("div",{staticClass:"text-che"},[e("img",{staticClass:"mainImage",attrs:{src:a.heritageMainData.mainImage,alt:""}})]),e("el-divider"),e("div",{staticClass:"text-che"},[e("span",[a._v("工业遗产详细介绍： ")])]),e("div",{staticClass:"text-che",domProps:{innerHTML:a._s(a.heritageMainData.details)}}),e("div",{staticClass:"text-che"},[e("span",[a._v("相关图片 ")])]),e("div",{staticClass:"text-che"},[e("el-carousel",{attrs:{interval:4e3,type:"card",height:"500px",width:"700px"}},a._l(a.heritageMainData.imagesAllurl,(function(a){return e("el-carousel-item",{key:a},[e("img",{staticClass:"otherImage",attrs:{src:a,alt:""}})])})),1)],1),e("div",{staticClass:"text-che"},[e("span",[a._v("审批意见： ")])]),""!==a.heritageMainData.approvalComments?e("div",{staticClass:"text-che",domProps:{innerHTML:a._s(a.heritageMainData.approvalComments)}}):e("div",{staticClass:"text-che"},[e("p",[a._v("暂无意见")])])],1)]):a._e()],1)])},s=[],n=e("1da1"),r=(e("96cf"),e("b2df")),c={name:"ApproveHeritageMain",components:{MainTop:r["a"]},data:function(){return{heritageMainData:null}},created:function(){var a=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log(a.$route),t.next=3,a.$axios.post("/getOneApplyHeritage/getOneApplyHeritage",{_id:a.$route.params.applyid});case 3:e=t.sent,a.heritageMainData=e.data.data[0],console.log(a.heritageMainData);case 6:case"end":return t.stop()}}),t)})))()}},l=c,p=(e("2cab"),e("2877")),v=Object(p["a"])(l,i,s,!1,null,null,null);t["default"]=v.exports}}]);
//# sourceMappingURL=chunk-4b297ea6.8821cb00.js.map