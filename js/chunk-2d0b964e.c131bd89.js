(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b964e"],{3380:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"heritage-Hot-Map"},[a("div",{staticClass:"heritage-industry"},[a("div",{staticClass:"container",attrs:{id:"container"}})])])}],r=a("5530"),s=a("1da1"),o=(a("d81d"),a("ac1f"),a("841c"),a("96cf"),a("2f62")),c={components:{},data:function(){return{map:"",district:null,polygons:[],dataList1:[],dataList2:[],dataList3:[],layer:null,list:[]}},created:function(){return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},mounted:function(){this.initMap(),this.drawBounds(),this.drawHotMap()},computed:Object(r["a"])({},Object(o["c"])(["lang"])),methods:{initMap:function(){this.map=new AMap.Map("container",{resizeEnable:!0,zoom:10,zooms:[6.5,18],center:[115.464523,38.874476],viewMode:"3D",lang:this.lang,mapStyle:"amap://styles/db9efe6a1745ac24b7269b862f359536",infoWindow:null})},drawBounds:function(){if(!this.district){var t={subdistrict:0,extensions:"all",level:"province"};this.district=new AMap.DistrictSearch(t)}this.district.setLevel("province");var e=this;this.district.search("河北省",(function(t,a){var n=[new AMap.LngLat(-360,90,!0),new AMap.LngLat(-360,-90,!0),new AMap.LngLat(360,-90,!0),new AMap.LngLat(360,90,!0)],i=a.districtList[0].boundaries,r=[n];r.push.apply(r,i);var s=new AMap.Polygon({pathL:r,strokeColor:"#F9D5A7",strokeWeight:1,fillColor:"#F9D5A7",fillOpacity:.2});s.setPath(r),e.map.add(s)}))},drawHotMap:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a,n,i,r,s,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.$message({message:"工业遗产建筑密度热力图绘制中，初次加载可能用时较长"}),e.next=3,t.$axios.get("/getHeritageMainData/getHeritageMainData");case 3:return a=e.sent,t.dataList1=a.data.data,e.next=7,t.$axios.get("/getHeritageMuseum/getHeritageMuseum");case 7:return n=e.sent,t.dataList2=n.data.data,e.next=11,t.$axios.get("/getHeritageTourism/getHeritageTourism");case 11:for(i=e.sent,t.dataList3=i.data.data,r=0;r<t.dataList1.length;r++)t.list.push({coordinate:t.dataList1[r].coordinate,count:r+1});for(s=0;s<t.dataList2.length;s++)t.list.push({coordinate:t.dataList2[s].coordinate,count:s+1});for(o=0;o<t.dataList3.length;o++)t.list.push({coordinate:t.dataList3[o].coordinate,count:o+1});t.layer=new Loca.HeatmapLayer({map:t.map}),console.log(t.list),t.layer.setData(t.list,{lnglat:"coordinate",value:"count"}),t.layer.setOptions({style:{radius:40,color:{.5:"#2c7bb6",.65:"#abd9e9",.7:"#ffffbf",.9:"#fde468",1:"#d7191c"}}}),t.layer.render();case 21:case"end":return e.stop()}}),e)})))()}}},d=c,l=a("2877"),u=Object(l["a"])(d,n,i,!1,null,null,null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0b964e.c131bd89.js.map