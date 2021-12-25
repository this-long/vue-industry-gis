(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3f45125f"],{"3f75":function(e,t,a){"use strict";a("f286")},d52d:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"heritage-tourism"},[a("div",{staticClass:"heritage-museum"},[a("div",{staticClass:"heritage-industry"},[a("div",{staticClass:"container",attrs:{id:"container"}},[a("div",{staticClass:"map-buttons"},[a("el-select",{staticClass:"typeSelect",attrs:{placeholder:"请选择类型",size:"mini"},model:{value:e.typeSelect,callback:function(t){e.typeSelect=t},expression:"typeSelect"}},e._l(e.options,(function(e){return a("el-option",{key:e.type,attrs:{label:e.type,value:e.type}})})),1),a("el-button",{staticClass:"selectBtn",attrs:{id:"selectBtn",size:"mini",icon:"el-icon-search"},on:{click:e.searchTypeClick}}),a("el-autocomplete",{staticClass:"inline-input",staticStyle:{width:"300px","margin-right":"10px"},attrs:{"fetch-suggestions":e.querySearch,placeholder:"zh_cn"===e.lang?"请输入工业旅游区名称":"Please enter","value-key":"name",size:"mini",clearable:""},on:{select:e.handleSelect},model:{value:e.searchIndustry,callback:function(t){e.searchIndustry=t},expression:"searchIndustry"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.searchIndustryCli},slot:"append"})],1),a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.geometryBox,expression:"!geometryBox"}],staticClass:"map-btn map-element",attrs:{size:"mini"},on:{click:e.opengeometryBox}},[e._v(e._s("zh_cn"===e.lang?"几何查询":"Geometric query"))]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.geometryBox,expression:"geometryBox"}],staticClass:"map-btn map-element closegeometryBox",attrs:{size:"mini"},on:{click:e.closegeometryBox}},[e._v(e._s("zh_cn"===e.lang?"关闭面板":"Close panel"))]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.roadNetwork,expression:"!roadNetwork"}],staticClass:"map-btn map-element",attrs:{size:"mini"},on:{click:e.addRoadLayer}},[e._v(e._s("zh_cn"===e.lang?"打开路网":"Open road"))]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.roadNetwork,expression:"roadNetwork"}],staticClass:"map-btn map-element",attrs:{size:"mini"},on:{click:e.removeRoadLayer}},[e._v(e._s("zh_cn"===e.lang?"关闭路网":"Close road"))]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.isOrdMap,expression:"isOrdMap"}],staticClass:"map-btn map-element",attrs:{size:"mini"},on:{click:e.addSatellite}},[e._v(e._s("zh_cn"===e.lang?"卫星地图":"Satellite map"))]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.isOrdMap,expression:"!isOrdMap"}],staticClass:"map-btn map-element",attrs:{size:"mini"},on:{click:e.removeSatellite}},[e._v(e._s("zh_cn"===e.lang?"普通地图":"General map"))]),a("el-button",{staticClass:"map-btn map-element",attrs:{size:"mini"},on:{click:e.resetMap}},[e._v(e._s("zh_cn"===e.lang?"复位":"Reset"))])],1),a("div",{directives:[{name:"show",rawName:"v-show",value:e.geometryBox,expression:"geometryBox"}],staticClass:"geometrySearch"},[a("el-radio-group",{model:{value:e.geometrySearchType,callback:function(t){e.geometrySearchType=t},expression:"geometrySearchType"}},[a("span",{staticClass:"geometryType"},[e._v(e._s("zh_cn"===e.lang?"请选择绘制的几何元素类型":"Please select the type of geometric element to draw")),a("el-popover",{staticStyle:{"font-size":"10px"},attrs:{placement:"top-start",title:"zh_cn"===e.lang?"提示":"Tips",width:"200",trigger:"hover",content:"zh_cn"===e.lang?"每次选择完元素类型后点击绘制元素按钮进行绘制，每次选择后可绘制一次，如要再次绘制请重新选择。":"After selecting the element type each time, click the draw element button to draw. You can draw once after each selection. If you want to draw again, please select again."}},[a("i",{staticClass:"el-icon-question",attrs:{slot:"reference"},slot:"reference"})])],1),a("br"),a("el-radio",{attrs:{label:"circle"}},[e._v(e._s("zh_cn"===e.lang?"绘制圆形":"circle"))]),a("el-radio",{attrs:{label:"rectangle"}},[e._v(e._s("zh_cn"===e.lang?"绘制矩形":"rectangle"))]),a("el-radio",{attrs:{label:"polygon"}},[e._v(e._s("zh_cn"===e.lang?"绘制多边形":"polygon"))])],1),a("div",{staticClass:"geometryBtns"},[a("el-button",{staticClass:"map-btn map-element",attrs:{size:"mini",type:"primary"},on:{click:e.drawGeometry}},[e._v(e._s("zh_cn"===e.lang?"绘制元素":"Draw element"))]),a("el-button",{staticClass:"map-btn map-element",attrs:{size:"mini",type:"primary"},on:{click:e.clearDrawGeometry}},[e._v(e._s("zh_cn"===e.lang?"清除":"Clear"))]),a("el-button",{staticClass:"map-btn map-element",attrs:{size:"mini",type:"primary"},on:{click:e.closeDraw}},[e._v(e._s("zh_cn"===e.lang?"清除并关闭面板":"Clear and close"))]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.issearchRes,expression:"issearchRes"}],staticClass:"map-btn map-element",attrs:{size:"mini",type:"primary"},on:{click:e.changeissearchRes}},[e._v(e._s("zh_cn"===e.lang?"关闭结果":"Close result"))]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.issearchRes,expression:"!issearchRes"}],staticClass:"map-btn map-element",attrs:{size:"mini",type:"primary"},on:{click:e.changeissearchRes}},[e._v(e._s("zh_cn"===e.lang?"打开结果":"Open result"))])],1),a("div",{directives:[{name:"show",rawName:"v-show",value:e.issearchRes,expression:"issearchRes"}],staticClass:"searchRes"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.geometrySearchRes,height:"250",border:""}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form",{staticClass:"demo-table-expand",staticStyle:{"font-size":"12px"},attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"zh_cn"===e.lang?"旅游区名称":"Tourist"}},[a("span",[e._v(e._s(t.row.name))])]),a("el-form-item",{attrs:{label:"zh_cn"===e.lang?"景区地址":"Address"}},[a("span",[e._v(e._s(t.row.address))])]),a("el-form-item",{attrs:{label:"zh_cn"===e.lang?"单位名称":"Company"}},[a("span",[e._v(e._s(t.row.company))])]),a("el-form-item",{attrs:{label:"zh_cn"===e.lang?"始建时间":"Start"}},[a("span",[e._v(e._s(t.row.start))])]),a("el-form-item",{attrs:{label:"zh_cn"===e.lang?"类型":"Tourist category"}},[a("span",[e._v(e._s(t.row.type))])])],1)]}}])}),a("el-table-column",{attrs:{prop:"start",label:"zh_cn"===e.lang?"建于":"Start",width:"70"}}),a("el-table-column",{attrs:{prop:"name",label:"zh_cn"===e.lang?"景区名称":"Tourist name"}}),a("el-table-column",{attrs:{label:"zh_cn"===e.lang?"查看详情":"Details",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){return e.lookthis(t)}}},[e._v(e._s("zh_cn"===e.lang?"查看":"More"))])]}}])})],1)],1)],1)])])])])},n=[],i=a("1da1"),o=a("5530"),r=(a("d81d"),a("ac1f"),a("841c"),a("b0c0"),a("a15b"),a("4de4"),a("d3b7"),a("96cf"),a("2f62")),l={name:"HeritageMuseum",data:function(){return{map:"",district:null,polygons:[],zoom:10,marker:null,title:"",content:[],infoWindow:null,dataList:null,isOrdMap:!0,satellite:null,roadNetwork:!1,roadNetLayer:null,restaurants:[],searchIndustry:"",searchObj:null,markers:[],geometrySearchType:"circle",geometryBox:!1,mouseTool:null,overlays:[],geometrySearchRes:[],issearchRes:!0,options:[{type:"全部类型"}],typeSelect:"全部类型"}},computed:Object(o["a"])({},Object(r["c"])(["lang"])),created:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("/getHeritageTourism/getHeritageTourism");case 2:a=t.sent,e.dataList=a.data.data,e.getAllType(),e.changeinstryType("three");case 6:case"end":return t.stop()}}),t)})))()},mounted:function(){this.initMap(),this.addMarker(),this.drawBounds(),this.mouseTool=new AMap.MouseTool(this.map)},methods:Object(o["a"])(Object(o["a"])({},Object(r["b"])(["changeinstryType"])),{},{initMap:function(){this.map=new AMap.Map("container",{resizeEnable:!0,zoom:this.zoom,zooms:[6.5,18],center:[115.464523,38.874476],viewMode:"3D",lang:this.lang,mapStyle:"amap://styles/normal",infoWindow:null})},drawBounds:function(){if(!this.district){var e={subdistrict:0,extensions:"all",level:"province"};this.district=new AMap.DistrictSearch(e)}this.district.setLevel("province");var t=this;this.district.search("河北省",(function(e,a){var s=[new AMap.LngLat(-360,90,!0),new AMap.LngLat(-360,-90,!0),new AMap.LngLat(360,-90,!0),new AMap.LngLat(360,90,!0)],n=a.districtList[0].boundaries,i=[s];i.push.apply(i,n);var o=new AMap.Polygon({pathL:i,strokeColor:"#F9D5A7",strokeWeight:1,fillColor:"#F9D5A7",fillOpacity:.2});o.setPath(i),t.map.add(o)}))},addMarker:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,s,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("/getHeritageTourism/getHeritageTourism");case 2:for(a=t.sent,e.dataList=a.data.data,e.restaurants=a.data.data,console.log("请求结果",e.dataList),s=function(t){var a=new AMap.Marker({map:e.map,position:e.dataList[t].coordinate,extData:e.dataList[t]});e.markers.push(a),AMap.event.addListener(a,"click",(function(){e.title=e.dataList[t].name+'<span style="font-size:11px;">建于：'+e.dataList[t].start+"</span>",e.content=["<img src='"+e.dataList[t].mainImage+"'style='wtdth:100px;height:auto;'>地址："+e.dataList[t].address,"类型："+e.dataList[t].type,'<a href="#/heritage/industry/main/'+e.dataList[t]._id+'" class="xiangxi">详细信息</a>'],e.infoWindow=new AMap.InfoWindow({isCustom:!0,content:e.createInfoWindow(e.title,e.content.join("<br/>")),offset:new AMap.Pixel(16,-45)}),e.infoWindow.open(e.map,a.getPosition())}))},n=0;n<e.dataList.length;n++)s(n);case 8:case"end":return t.stop()}}),t)})))()},createInfoWindow:function(e,t){var a=document.createElement("div");a.className="custom-info input-card content-window-card";var s=document.createElement("div"),n=document.createElement("div"),i=document.createElement("img");s.className="info-top",n.innerHTML=e,i.src="https://webapi.amap.com/images/close2.gif",i.onclick=this.closeInfoWindow,s.appendChild(n),s.appendChild(i),a.appendChild(s);var o=document.createElement("div");o.className="info-middle",o.style.backgroundColor="white",o.innerHTML=t,a.appendChild(o);var r=document.createElement("div");r.className="info-bottom",r.style.position="relative",r.style.top="0px",r.style.margin="0 auto";var l=document.createElement("img");return l.src="https://webapi.amap.com/images/sharp.png",r.appendChild(l),a.appendChild(r),a},closeInfoWindow:function(){this.map.clearInfoWindow(),this.searchIndustry=null},addSatellite:function(){this.isOrdMap=!this.isOrdMap,this.satellite=new AMap.TileLayer.Satellite,this.map.add(this.satellite)},removeSatellite:function(){this.isOrdMap=!this.isOrdMap,this.map.remove(this.satellite)},addRoadLayer:function(){this.roadNetwork=!this.roadNetwork,this.roadNetLayer=new AMap.TileLayer.RoadNet,this.map.add(this.roadNetLayer)},removeRoadLayer:function(){this.roadNetwork=!this.roadNetwork,this.map.remove(this.roadNetLayer)},handleSelect:function(e){console.log(e),this.searchObj=e,console.log(this.searchIndustry)},querySearch:function(e,t){var a=this.restaurants,s=e?a.filter(this.createFilter(e)):a;t(s)},createFilter:function(e){return function(t){return 0===t.name.toLowerCase().indexOf(e.toLowerCase())}},searchIndustryCli:function(){this.addMarker();var e=this.searchObj.name+'<span style="font-size:11px;">建于：'+this.searchObj.start+"</span>",t=["<img src='"+this.searchObj.mainImage+"'style='wtdth:100px;height:auto;'>地址："+this.searchObj.address,"类型："+this.searchObj.type,'<a href="#/heritage/industry/main/'+this.searchObj._id+'" class="">详细信息</a>'],a=new AMap.InfoWindow({position:this.searchObj.coordinate,isCustom:!0,content:this.createInfoWindow(e,t.join("<br/>")),offset:new AMap.Pixel(16,-45)});a.open(this.map),this.map.setCenter(this.searchObj.coordinate)},resetMap:function(){location.reload()},opengeometryBox:function(){this.geometryBox=!this.geometryBox},closegeometryBox:function(){this.geometryBox=!this.geometryBox},drawGeometry:function(){var e=this;switch(this.geometrySearchType||this.$message({message:"请先选择几何元素类型再开始绘制",type:"warning"}),console.log(this.geometrySearchType),this.geometrySearchType){case"polygon":this.mouseTool.polygon({fillColor:"#00b0ff",strokeColor:"#80d8ff"});break;case"rectangle":this.mouseTool.rectangle({fillColor:"#00b0ff",strokeColor:"#80d8ff"});break;case"circle":this.mouseTool.circle({fillColor:"#00b0ff",strokeColor:"#80d8ff"});break}this.mouseTool.on("draw",(function(t){e.overlays.push(t.obj);for(var a=function(a){t.obj.contains(e.dataList[a].coordinate)&&(e.geometrySearchRes.some((function(t){return t.name===e.dataList[a].name}))||e.geometrySearchRes.push(e.dataList[a]))},s=0;s<e.dataList.length;s++)a(s);e.mouseTool.close(),e.geometrySearchType=null}))},clearDrawGeometry:function(){this.mouseTool.close(!0),this.geometrySearchRes=[]},closeDraw:function(){this.mouseTool.close(!0),this.geometryBox=!1,this.geometrySearchRes=[]},changeissearchRes:function(){this.issearchRes=!this.issearchRes},lookthis:function(e){console.log(e),this.$router.push("/heritage/industry/main/"+e.row._id)},getAllType:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:for(a=function(t){e.options.some((function(a){return a.type===e.dataList[t].type}))||e.options.push(e.dataList[t])},s=0;s<e.dataList.length;s++)a(s);console.log(e.options);case 3:case"end":return t.stop()}}),t)})))()},searchTypeClick:function(){var e=this;if(console.log(this.typeSelect),this.map.remove(this.markers),this.map.clearInfoWindow(),"全部类型"===this.typeSelect)this.addMarker();else{var t=this.dataList.filter((function(t){return t.type===e.typeSelect}));console.log(t);for(var a=function(a){var s=new AMap.Marker({map:e.map,position:t[a].coordinate,extData:t[a]});e.markers.push(s),AMap.event.addListener(s,"click",(function(){e.title=t[a].name+'<span style="font-size:11px;">建于：'+t[a].start+"</span>",e.content=["<img src='"+t[a].mainImage+"'style='wtdth:100px;height:auto;'>地址："+t[a].address,"类型："+t[a].type,'<a href="#/heritage/industry/main/'+t[a]._id+'" class="xiangxi">详细信息</a>'],e.infoWindow=new AMap.InfoWindow({isCustom:!0,content:e.createInfoWindow(e.title,e.content.join("<br/>")),offset:new AMap.Pixel(16,-45)}),e.infoWindow.open(e.map,s.getPosition())}))},s=0;s<t.length;s++)a(s)}}})},c=l,m=(a("3f75"),a("2877")),p=Object(m["a"])(c,s,n,!1,null,null,null);t["default"]=p.exports},f286:function(e,t,a){}}]);
//# sourceMappingURL=chunk-3f45125f.9e0fea1d.js.map