(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7a2f45e7"],{1691:function(t,e,a){},"5d9c":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"heritage-Hot-Map"},[a("div",{staticClass:"heritage-industry"},[a("div",{staticClass:"container",attrs:{id:"container"}}),a("div",{staticClass:"info",staticStyle:{"min-width":"350px","mex-width":"450px"}},[a("h4",[t._v("工业遗产聚集度详情(工业遗产分布越密集聚集度越高)")]),a("p",[t._v("当前聚集度："),a("span",{attrs:{id:"val"}},[t._v("--")])]),a("p",[t._v(" 当前包含的数据索引："),a("span",{staticStyle:{display:"block",overflow:"scroll"},attrs:{id:"indexes"}},[t._v("--")])]),a("p",[t._v("当前包含的遗产数量："),a("span",{attrs:{id:"indexes-num"}},[t._v("--")])]),a("p",[t._v(" 聚集中心点坐标： "),a("span",{attrs:{id:"lng-lat"}},[t._v("--")])])]),a("div",{staticClass:"prase-tuli"},[a("div",{staticClass:"legend"},[a("ul",{staticClass:"colors",attrs:{id:"legend-color"}}),a("ul",{staticClass:"labels",attrs:{id:"legend-label"}})])])])])}],r=a("5530"),s=a("1da1"),o=(a("d81d"),a("ac1f"),a("841c"),a("99af"),a("a15b"),a("96cf"),a("2f62")),c={components:{},data:function(){return{map:"",district:null,polygons:[],dataList1:[],dataList2:[],dataList3:[],layer:null,list:[]}},created:function(){return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},mounted:function(){this.initMap(),this.drawBounds(),this.drawHotMap()},computed:Object(r["a"])({},Object(o["c"])(["lang"])),methods:{initMap:function(){this.map=new AMap.Map("container",{resizeEnable:!0,zoom:10,zooms:[6.5,18],center:[115.464523,38.874476],viewMode:"3D",lang:this.lang,mapStyle:"amap://styles/db9efe6a1745ac24b7269b862f359536",infoWindow:null,pitch:46})},drawBounds:function(){if(!this.district){var t={subdistrict:0,extensions:"all",level:"province"};this.district=new AMap.DistrictSearch(t)}this.district.setLevel("province");var e=this;this.district.search("河北省",(function(t,a){var n=[new AMap.LngLat(-360,90,!0),new AMap.LngLat(-360,-90,!0),new AMap.LngLat(360,-90,!0),new AMap.LngLat(360,90,!0)],i=a.districtList[0].boundaries,r=[n];r.push.apply(r,i);var s=new AMap.Polygon({pathL:r,strokeColor:"#F9D5A7",strokeWeight:1,fillColor:"#F9D5A7",fillOpacity:.2});s.setPath(r),e.map.add(s)}))},drawHotMap:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a,n,i,r,s,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.$message({message:"工业遗产聚集度蜂窝图绘制中，初次加载可能用时较长"}),e.next=3,t.$axios.get("/getHeritageMainData/getHeritageMainData");case 3:return a=e.sent,t.dataList1=a.data.data,e.next=7,t.$axios.get("/getHeritageMuseum/getHeritageMuseum");case 7:return n=e.sent,t.dataList2=n.data.data,e.next=11,t.$axios.get("/getHeritageTourism/getHeritageTourism");case 11:for(i=e.sent,t.dataList3=i.data.data,r=0;r<t.dataList1.length;r++)t.list.push({coordinate:t.dataList1[r].coordinate,count:r+10});for(s=0;s<t.dataList2.length;s++)t.list.push({coordinate:t.dataList2[s].coordinate,count:s+1});for(o=0;o<t.dataList3.length;o++)t.list.push({coordinate:t.dataList3[o].coordinate,count:o+10});t.layer=new Loca.HexagonLayer({map:t.map,fitView:!0,eventSupport:!0}),console.log(t.list),t.layer.setData(t.list,{lnglat:"coordinate",value:"count",type:"count"}),t.layer.setOptions({unit:"meter",mode:"count",style:{color:["#4575b4","#99d594","#e6f598","#ffffbf","#fee08b","#fee08b","#d53e4f"],radius:6e3,opacity:1,gap:300,height:[6e4,25e4]}}),t.layer.on("legendupdate",(function(t){var e=t.colorLegend,a=e.map((function(t){return'<li class="color-item" style="background-color: '.concat(t.color,'"></li>')})),n=e.map((function(t,a){return t.range[0]=Math.round(t.range[0]),t.range[1]=Math.round(t.range[1]),a==e.length-1?'<li class="label-item">'.concat(t.range[0],'</li><li class="label-item">').concat(t.range[1],"</li>"):'<li class="label-item">'.concat(t.range[0],"</li>")}));document.getElementById("legend-color").innerHTML=a.join(""),document.getElementById("legend-label").innerHTML=n.join("")})),t.layer.on("mousemove",(function(t){var e=document.getElementById("val"),a=document.getElementById("indexes"),n=document.getElementById("indexes-num"),i=document.getElementById("lng-lat");e.innerText=t.value,a.innerText=t.indexes.join(", "),n.innerText=t.indexes.length,i.innerText=t.lngLat.valueOf()})),t.layer.render();case 23:case"end":return e.stop()}}),e)})))()},initLegend:function(t){}}},l=c,d=(a("c4b1"),a("2877")),u=Object(d["a"])(l,n,i,!1,null,"278fb9cc",null);e["default"]=u.exports},"99af":function(t,e,a){"use strict";var n=a("23e7"),i=a("da84"),r=a("d039"),s=a("e8b5"),o=a("861d"),c=a("7b0b"),l=a("07fa"),d=a("8418"),u=a("65f0"),g=a("1dde"),p=a("b622"),f=a("2d00"),m=p("isConcatSpreadable"),h=9007199254740991,v="Maximum allowed index exceeded",b=i.TypeError,w=f>=51||!r((function(){var t=[];return t[m]=!1,t.concat()[0]!==t})),y=g("concat"),L=function(t){if(!o(t))return!1;var e=t[m];return void 0!==e?!!e:s(t)},x=!w||!y;n({target:"Array",proto:!0,forced:x},{concat:function(t){var e,a,n,i,r,s=c(this),o=u(s,0),g=0;for(e=-1,n=arguments.length;e<n;e++)if(r=-1===e?s:arguments[e],L(r)){if(i=l(r),g+i>h)throw b(v);for(a=0;a<i;a++,g++)a in r&&d(o,g,r[a])}else{if(g>=h)throw b(v);d(o,g++,r)}return o.length=g,o}})},c4b1:function(t,e,a){"use strict";a("1691")}}]);
//# sourceMappingURL=chunk-7a2f45e7.6aa76fbb.js.map