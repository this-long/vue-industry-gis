(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a0e84d3e"],{4071:function(t,e,o){"use strict";o("6430")},6430:function(t,e,o){},f289:function(t,e,o){"use strict";o.r(e);var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"getCoordinate"},[o("div",{staticClass:"heritage-industry"},[o("div",{staticClass:"container",attrs:{id:"container"}},[o("div",{staticClass:"map-buttons"},[o("el-button",{staticClass:"map-btn map-element",attrs:{size:"mini",type:"primary"},on:{click:t.drawGeometry}},[t._v(t._s("zh_cn"===t.lang?"拾取坐标":"Pick coordinates"))]),o("el-button",{staticClass:"map-btn map-element",attrs:{size:"mini",type:"primary"},on:{click:t.getAgin}},[t._v(t._s("zh_cn"===t.lang?"清空":"Clear"))]),o("el-button",{directives:[{name:"show",rawName:"v-show",value:0!==this.newCoordinate.length||0!==this.applyCoordinate.length,expression:"\n            this.newCoordinate.length !== 0 ||\n            this.applyCoordinate.length !== 0\n          "}],staticClass:"map-btn map-element",attrs:{size:"mini",type:"primary"},on:{click:t.sub}},[t._v(t._s("zh_cn"===t.lang?"确定":"OK"))])],1)])])])},n=[],a=o("5530"),s=(o("d81d"),o("ac1f"),o("841c"),o("2f62")),r={name:"HeritageIndustry",data:function(){return{map:"",district:null,polygons:[],zoom:10,marker:null,geometrySearchType:"marker",geometryBox:!1,mouseTool:null,overlays:[],geometrySearchRes:[],issearchRes:!0,options:[{type:"全部类型"}],typeSelect:"全部类型"}},computed:Object(a["a"])({},Object(s["c"])(["lang","newCoordinate","CoordinateType","applyCoordinate"])),created:function(){console.log(this.CoordinateType)},mounted:function(){this.initMap(),this.drawBounds(),this.mouseTool=new AMap.MouseTool(this.map)},methods:Object(a["a"])(Object(a["a"])({},Object(s["b"])(["getCoordinate","getapplyCoordinate"])),{},{initMap:function(){this.map=new AMap.Map("container",{resizeEnable:!0,zoom:this.zoom,zooms:[6.5,18],center:[115.464523,38.874476],viewMode:"3D",lang:this.lang,mapStyle:"amap://styles/fresh",infoWindow:null})},drawBounds:function(){if(!this.district){var t={subdistrict:0,extensions:"all",level:"province"};this.district=new AMap.DistrictSearch(t)}this.district.setLevel("province");var e=this;this.district.search("河北省",(function(t,o){var i=[new AMap.LngLat(-360,90,!0),new AMap.LngLat(-360,-90,!0),new AMap.LngLat(360,-90,!0),new AMap.LngLat(360,90,!0)],n=o.districtList[0].boundaries,a=[i];a.push.apply(a,n);var s=new AMap.Polygon({pathL:a,strokeColor:"#F9D5A7",strokeWeight:1,fillColor:"#F9D5A7",fillOpacity:.2});s.setPath(a),e.map.add(s)}))},opengeometryBox:function(){this.geometryBox=!this.geometryBox},closegeometryBox:function(){this.geometryBox=!this.geometryBox},drawGeometry:function(){var t=this;switch(this.geometrySearchType){case"marker":this.mouseTool.marker({});break}this.mouseTool.on("draw",(function(e){t.overlays.push(e.obj),console.log("e.obj---------",e.obj.getPosition());var o=e.obj.getPosition();"add"===t.CoordinateType?t.getCoordinate([o.lng,o.lat]):"apply"===t.CoordinateType&&t.getapplyCoordinate([o.lng,o.lat]),console.log(t.newCoordinate),t.mouseTool.close()}))},getAgin:function(){this.mouseTool.close(!0),this.getCoordinate([]),this.getapplyCoordinate([])},sub:function(){"add"===this.CoordinateType?this.$router.push("/heritage/add/add"):"apply"===this.CoordinateType&&this.$router.push("/heritage/apply")}})},l=r,c=(o("4071"),o("2877")),p=Object(c["a"])(l,i,n,!1,null,null,null);e["default"]=p.exports}}]);
//# sourceMappingURL=chunk-a0e84d3e.d7e7c214.js.map