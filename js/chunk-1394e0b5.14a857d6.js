(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1394e0b5"],{"0cb2":function(e,t,r){var n=r("e330"),i=r("7b0b"),a=Math.floor,o=n("".charAt),s=n("".replace),l=n("".slice),c=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,u=/\$([$&'`]|\d{1,2})/g;e.exports=function(e,t,r,n,m,d){var g=r+e.length,f=n.length,p=u;return void 0!==m&&(m=i(m),p=c),s(d,p,(function(i,s){var c;switch(o(s,0)){case"$":return"$";case"&":return e;case"`":return l(t,0,r);case"'":return l(t,g);case"<":c=m[l(s,1,-1)];break;default:var u=+s;if(0===u)return i;if(u>f){var d=a(u/10);return 0===d?i:d<=f?void 0===n[d-1]?o(s,1):n[d-1]+o(s,1):i}c=n[u-1]}return void 0===c?"":c}))}},1276:function(e,t,r){"use strict";var n=r("2ba4"),i=r("c65b"),a=r("e330"),o=r("d784"),s=r("44e7"),l=r("825a"),c=r("1d80"),u=r("4840"),m=r("8aa5"),d=r("50c4"),g=r("577e"),f=r("dc4a"),p=r("f36a"),v=r("14c3"),h=r("9263"),b=r("9f7f"),x=r("d039"),w=b.UNSUPPORTED_Y,F=4294967295,y=Math.min,$=[].push,T=a(/./.exec),k=a($),_=a("".slice),N=!x((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var r="ab".split(e);return 2!==r.length||"a"!==r[0]||"b"!==r[1]}));o("split",(function(e,t,r){var a;return a="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,r){var a=g(c(this)),o=void 0===r?F:r>>>0;if(0===o)return[];if(void 0===e)return[a];if(!s(e))return i(t,a,e,o);var l,u,m,d=[],f=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),v=0,b=new RegExp(e.source,f+"g");while(l=i(h,b,a)){if(u=b.lastIndex,u>v&&(k(d,_(a,v,l.index)),l.length>1&&l.index<a.length&&n($,d,p(l,1)),m=l[0].length,v=u,d.length>=o))break;b.lastIndex===l.index&&b.lastIndex++}return v===a.length?!m&&T(b,"")||k(d,""):k(d,_(a,v)),d.length>o?p(d,0,o):d}:"0".split(void 0,0).length?function(e,r){return void 0===e&&0===r?[]:i(t,this,e,r)}:t,[function(t,r){var n=c(this),o=void 0==t?void 0:f(t,e);return o?i(o,t,n,r):i(a,g(n),t,r)},function(e,n){var i=l(this),o=g(e),s=r(a,i,o,n,a!==t);if(s.done)return s.value;var c=u(i,RegExp),f=i.unicode,p=(i.ignoreCase?"i":"")+(i.multiline?"m":"")+(i.unicode?"u":"")+(w?"g":"y"),h=new c(w?"^(?:"+i.source+")":i,p),b=void 0===n?F:n>>>0;if(0===b)return[];if(0===o.length)return null===v(h,o)?[o]:[];var x=0,$=0,T=[];while($<o.length){h.lastIndex=w?0:$;var N,L=v(h,w?_(o,$):o);if(null===L||(N=y(d(h.lastIndex+(w?$:0)),o.length))===x)$=m(o,$,f);else{if(k(T,_(o,x,$)),T.length===b)return T;for(var M=1;M<=L.length-1;M++)if(k(T,L[M]),T.length===b)return T;$=x=N}}return k(T,_(o,x)),T}]}),!N,w)},4004:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"my-approve"},[r("div",{staticClass:"my-approve-top"},[r("MainTop",[e._v("数据维护 "),r("span",{staticClass:"gang"},[e._v(" / ")]),e._v(" 遗产主页编辑")])],1),r("div",{staticClass:"my-approve-bottom padding15"},[r("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.dialogFormVisible=!0}}},[e._v("添加要闻")]),r("br"),r("br"),r("el-dialog",{attrs:{title:"添加 \\ 编辑要闻",visible:e.dialogFormVisible,width:"75%"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"要闻名称"}},[r("el-input",{attrs:{placeholder:"请输入要闻名称"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),r("el-form-item",{attrs:{label:"要闻类型"}},[r("el-select",{attrs:{placeholder:"请选择要闻类型"},model:{value:e.ruleForm.region,callback:function(t){e.$set(e.ruleForm,"region",t)},expression:"ruleForm.region"}},[r("el-option",{attrs:{label:"政策",value:"政策"}}),r("el-option",{attrs:{label:"通知",value:"通知"}}),r("el-option",{attrs:{label:"综述",value:"综述"}})],1)],1),r("el-form-item",{attrs:{label:"要闻详情"}},[r("el-input",{attrs:{type:"textarea",placeholder:"请输入要闻详情，注意格式排版",autosize:{minRows:10}},model:{value:e.ruleForm.mainText,callback:function(t){e.$set(e.ruleForm,"mainText",t)},expression:"ruleForm.mainText"}})],1)],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm()}}},[e._v("确 定")])],1)],1),r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableList,height:"600",border:""}},[r("el-table-column",{attrs:{type:"index",label:"序号",width:"100",align:"center"}}),r("el-table-column",{attrs:{prop:"date1",label:"日期",width:"180",align:"center"}}),r("el-table-column",{attrs:{prop:"name",label:"要闻标题"}}),r("el-table-column",{attrs:{prop:"region",label:"类型",width:"100",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return["政策"===t.row.region?r("el-tag",[e._v("政策")]):e._e(),"通知"===t.row.region?r("el-tag",{attrs:{type:"success"}},[e._v("通知")]):e._e(),"综述"===t.row.region?r("el-tag",{attrs:{type:"info"}},[e._v("综述")]):e._e()]}}])}),r("el-table-column",{attrs:{label:"操作",width:"250",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(r){return e.getNoticeMain(t)}}},[e._v("查看")]),r("el-button",{attrs:{size:"mini",type:"warning"},on:{click:function(r){return e.editNoticeMain(t)}}},[e._v("编辑")]),r("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(r){return e.removeNoticeMain(t)}}},[e._v("删除")])]}}])})],1)],1)])},i=[],a=r("1da1"),o=(r("96cf"),r("99af"),r("b0c0"),r("ac1f"),r("5319"),r("1276"),r("d81d"),r("a15b"),r("b2df")),s={components:{MainTop:o["a"]},watch:{dialogFormVisible:function(e){e||(this.isEdit=!1,console.log("取消了编辑装填"),this.ruleForm={name:"",region:"",date1:"",mainText:"",mainTextP:""})}},data:function(){return{noticeList:[],tableList:[],nowTime:"",date:null,dialogFormVisible:!1,ruleForm:{name:"",region:"",date1:"",mainText:"",mainTextP:""},isEdit:!1,formLabelWidth:"120px",rules:{name:[{required:!0,message:"请输入要闻信息名称",trigger:"change"}],region:[{required:!0,message:"请选择要闻信息类型",trigger:"change"}],mainText:[{required:!0,message:"请输入要闻信息详细内容，注意格式排版",trigger:"change"}]}}},created:function(){this.date=new Date,this.nowTime="".concat(this.date.getFullYear(),"-").concat(this.date.getMonth()+1,"-").concat(this.date.getDate()),console.log(this.nowTime),this.getNoticeList()},methods:{submitForm:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var r,n,i,a,o,s,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(""!==e.ruleForm.name&&""!==e.ruleForm.region&&""!==e.ruleForm.mainText){t.next=4;break}e.$message({message:"请检查内容是否已全部填写",type:"warning"}),t.next=28;break;case 4:if(r=/\n/g,n=e.ruleForm.mainText,e.ruleForm.mainText=e.ruleForm.mainText.replace(r,"<br>"),console.log(e.ruleForm.mainText.split("<br>")),i=e.ruleForm.mainText.split("<br>"),a=i.map((function(e){return"<p class='test'>"+e+"</p>"})),o=a.join(""),e.ruleForm.mainTextP=o,e.ruleForm.mainText=n,console.log(e.ruleForm),e.ruleForm.date1=e.nowTime,e.isEdit){t.next=23;break}return t.next=18,e.$axios.post("/postNoticeList/postNoticeList",e.ruleForm);case 18:s=t.sent,console.log(s),200===s.status?(e.$message({message:"首页要闻信息添加成功",type:"success"}),e.dialogFormVisible=!1,e.getNoticeList(),e.ruleForm={name:"",region:"",date1:"",mainText:"",mainTextP:""}):e.$message({message:"添加失败，请检查网络或刷新页面重试",type:"danger"}),t.next=28;break;case 23:return t.next=25,e.$axios.post("/editNoticeList/editNoticeList",e.ruleForm);case 25:l=t.sent,console.log("resedit",l),200===l.status?(e.$message({message:"首页要闻信息编辑成功",type:"success"}),e.dialogFormVisible=!1,e.getNoticeList(),e.ruleForm={name:"",region:"",date1:"",mainText:"",mainTextP:""}):e.$message({message:"编辑失败，请检查网络或刷新页面重试",type:"danger"});case 28:case"end":return t.stop()}}),t)})))()},getNoticeList:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("/getNoticeList/getNoticeList");case 2:r=t.sent,console.log(r),e.noticeList=r.data.data,e.tableList=r.data.data;case 6:case"end":return t.stop()}}),t)})))()},getNoticeMain:function(e){console.log(e),this.$router.push({path:"/main/noticemain?_id="+e.row._id})},editNoticeMain:function(e){console.log(e),this.ruleForm=e.row,this.dialogFormVisible=!0,this.isEdit=!0},removeNoticeMain:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$axios.post("/removeOneNoticeList/removeOneNoticeList",{_id:e.row._id});case 2:n=r.sent,200===n.status?(t.$message({message:"首页要闻信息删除成功",type:"success"}),t.getNoticeList()):t.$message({message:"删除失败，请检查网络或刷新页面重试",type:"danger"});case 4:case"end":return r.stop()}}),r)})))()}}},l=s,c=r("2877"),u=Object(c["a"])(l,n,i,!1,null,null,null);t["default"]=u.exports},"44e7":function(e,t,r){var n=r("861d"),i=r("c6b6"),a=r("b622"),o=a("match");e.exports=function(e){var t;return n(e)&&(void 0!==(t=e[o])?!!t:"RegExp"==i(e))}},5319:function(e,t,r){"use strict";var n=r("2ba4"),i=r("c65b"),a=r("e330"),o=r("d784"),s=r("d039"),l=r("825a"),c=r("1626"),u=r("5926"),m=r("50c4"),d=r("577e"),g=r("1d80"),f=r("8aa5"),p=r("dc4a"),v=r("0cb2"),h=r("14c3"),b=r("b622"),x=b("replace"),w=Math.max,F=Math.min,y=a([].concat),$=a([].push),T=a("".indexOf),k=a("".slice),_=function(e){return void 0===e?e:String(e)},N=function(){return"$0"==="a".replace(/./,"$0")}(),L=function(){return!!/./[x]&&""===/./[x]("a","$0")}(),M=!s((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}));o("replace",(function(e,t,r){var a=L?"$":"$0";return[function(e,r){var n=g(this),a=void 0==e?void 0:p(e,x);return a?i(a,e,n,r):i(t,d(n),e,r)},function(e,i){var o=l(this),s=d(e);if("string"==typeof i&&-1===T(i,a)&&-1===T(i,"$<")){var g=r(t,o,s,i);if(g.done)return g.value}var p=c(i);p||(i=d(i));var b=o.global;if(b){var x=o.unicode;o.lastIndex=0}var N=[];while(1){var L=h(o,s);if(null===L)break;if($(N,L),!b)break;var M=d(L[0]);""===M&&(o.lastIndex=f(s,m(o.lastIndex),x))}for(var R="",E=0,C=0;C<N.length;C++){L=N[C];for(var V=d(L[0]),I=w(F(u(L.index),s.length),0),O=[],P=1;P<L.length;P++)$(O,_(L[P]));var S=L.groups;if(p){var j=y([V],O,I,s);void 0!==S&&$(j,S);var z=d(n(i,void 0,j))}else z=v(V,s,I,O,S,i);I>=E&&(R+=k(s,E,I)+z,E=I+V.length)}return R+k(s,E)}]}),!M||!N||L)},"8aa5":function(e,t,r){"use strict";var n=r("6547").charAt;e.exports=function(e,t,r){return t+(r?n(e,t).length:1)}},"99af":function(e,t,r){"use strict";var n=r("23e7"),i=r("da84"),a=r("d039"),o=r("e8b5"),s=r("861d"),l=r("7b0b"),c=r("07fa"),u=r("8418"),m=r("65f0"),d=r("1dde"),g=r("b622"),f=r("2d00"),p=g("isConcatSpreadable"),v=9007199254740991,h="Maximum allowed index exceeded",b=i.TypeError,x=f>=51||!a((function(){var e=[];return e[p]=!1,e.concat()[0]!==e})),w=d("concat"),F=function(e){if(!s(e))return!1;var t=e[p];return void 0!==t?!!t:o(e)},y=!x||!w;n({target:"Array",proto:!0,forced:y},{concat:function(e){var t,r,n,i,a,o=l(this),s=m(o,0),d=0;for(t=-1,n=arguments.length;t<n;t++)if(a=-1===t?o:arguments[t],F(a)){if(i=c(a),d+i>v)throw b(h);for(r=0;r<i;r++,d++)r in a&&u(s,d,a[r])}else{if(d>=v)throw b(h);u(s,d++,a)}return s.length=d,s}})}}]);
//# sourceMappingURL=chunk-1394e0b5.14a857d6.js.map