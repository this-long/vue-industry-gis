(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2c2abf00"],{"0cb2":function(e,r,a){var t=a("e330"),n=a("7b0b"),l=Math.floor,i=t("".charAt),s=t("".replace),o=t("".slice),u=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,p=/\$([$&'`]|\d{1,2})/g;e.exports=function(e,r,a,t,c,m){var d=a+e.length,g=t.length,f=p;return void 0!==c&&(c=n(c),f=u),s(m,f,(function(n,s){var u;switch(i(s,0)){case"$":return"$";case"&":return e;case"`":return o(r,0,a);case"'":return o(r,d);case"<":u=c[o(s,1,-1)];break;default:var p=+s;if(0===p)return n;if(p>g){var m=l(p/10);return 0===m?n:m<=g?void 0===t[m-1]?i(s,1):t[m-1]+i(s,1):n}u=t[p-1]}return void 0===u?"":u}))}},1276:function(e,r,a){"use strict";var t=a("2ba4"),n=a("c65b"),l=a("e330"),i=a("d784"),s=a("44e7"),o=a("825a"),u=a("1d80"),p=a("4840"),c=a("8aa5"),m=a("50c4"),d=a("577e"),g=a("dc4a"),f=a("f36a"),b=a("14c3"),v=a("9263"),h=a("9f7f"),y=a("d039"),F=h.UNSUPPORTED_Y,x=4294967295,$=Math.min,k=[].push,w=l(/./.exec),M=l(k),R=l("".slice),I=!y((function(){var e=/(?:)/,r=e.exec;e.exec=function(){return r.apply(this,arguments)};var a="ab".split(e);return 2!==a.length||"a"!==a[0]||"b"!==a[1]}));i("split",(function(e,r,a){var l;return l="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,a){var l=d(u(this)),i=void 0===a?x:a>>>0;if(0===i)return[];if(void 0===e)return[l];if(!s(e))return n(r,l,e,i);var o,p,c,m=[],g=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),b=0,h=new RegExp(e.source,g+"g");while(o=n(v,h,l)){if(p=h.lastIndex,p>b&&(M(m,R(l,b,o.index)),o.length>1&&o.index<l.length&&t(k,m,f(o,1)),c=o[0].length,b=p,m.length>=i))break;h.lastIndex===o.index&&h.lastIndex++}return b===l.length?!c&&w(h,"")||M(m,""):M(m,R(l,b)),m.length>i?f(m,0,i):m}:"0".split(void 0,0).length?function(e,a){return void 0===e&&0===a?[]:n(r,this,e,a)}:r,[function(r,a){var t=u(this),i=void 0==r?void 0:g(r,e);return i?n(i,r,t,a):n(l,d(t),r,a)},function(e,t){var n=o(this),i=d(e),s=a(l,n,i,t,l!==r);if(s.done)return s.value;var u=p(n,RegExp),g=n.unicode,f=(n.ignoreCase?"i":"")+(n.multiline?"m":"")+(n.unicode?"u":"")+(F?"g":"y"),v=new u(F?"^(?:"+n.source+")":n,f),h=void 0===t?x:t>>>0;if(0===h)return[];if(0===i.length)return null===b(v,i)?[i]:[];var y=0,k=0,w=[];while(k<i.length){v.lastIndex=F?0:k;var I,T=b(v,F?R(i,k):i);if(null===T||(I=$(m(v.lastIndex+(F?k:0)),i.length))===y)k=c(i,k,g);else{if(M(w,R(i,y,k)),w.length===h)return w;for(var q=1;q<=T.length-1;q++)if(M(w,T[q]),w.length===h)return w;k=y=I}}return M(w,R(i,y)),w}]}),!I,F)},"44e7":function(e,r,a){var t=a("861d"),n=a("c6b6"),l=a("b622"),i=l("match");e.exports=function(e){var r;return t(e)&&(void 0!==(r=e[i])?!!r:"RegExp"==n(e))}},5319:function(e,r,a){"use strict";var t=a("2ba4"),n=a("c65b"),l=a("e330"),i=a("d784"),s=a("d039"),o=a("825a"),u=a("1626"),p=a("5926"),c=a("50c4"),m=a("577e"),d=a("1d80"),g=a("8aa5"),f=a("dc4a"),b=a("0cb2"),v=a("14c3"),h=a("b622"),y=h("replace"),F=Math.max,x=Math.min,$=l([].concat),k=l([].push),w=l("".indexOf),M=l("".slice),R=function(e){return void 0===e?e:String(e)},I=function(){return"$0"==="a".replace(/./,"$0")}(),T=function(){return!!/./[y]&&""===/./[y]("a","$0")}(),q=!s((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}));i("replace",(function(e,r,a){var l=T?"$":"$0";return[function(e,a){var t=d(this),l=void 0==e?void 0:f(e,y);return l?n(l,e,t,a):n(r,m(t),e,a)},function(e,n){var i=o(this),s=m(e);if("string"==typeof n&&-1===w(n,l)&&-1===w(n,"$<")){var d=a(r,i,s,n);if(d.done)return d.value}var f=u(n);f||(n=m(n));var h=i.global;if(h){var y=i.unicode;i.lastIndex=0}var I=[];while(1){var T=v(i,s);if(null===T)break;if(k(I,T),!h)break;var q=m(T[0]);""===q&&(i.lastIndex=g(s,c(i.lastIndex),y))}for(var j="",O=0,A=0;A<I.length;A++){T=I[A];for(var _=m(T[0]),C=F(x(p(T.index),s.length),0),D=[],P=1;P<T.length;P++)k(D,R(T[P]));var N=T.groups;if(f){var S=$([_],D,C,s);void 0!==N&&k(S,N);var E=m(t(n,void 0,S))}else E=b(_,s,C,D,N,n);C>=O&&(j+=M(s,O,C)+E,O=C+_.length)}return j+M(s,O)}]}),!q||!I||T)},"8aa5":function(e,r,a){"use strict";var t=a("6547").charAt;e.exports=function(e,r,a){return r+(a?t(e,r).length:1)}},ebf8:function(e,r,a){"use strict";a.r(r);var t=function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("div",{staticClass:"apply-repair"},[a("div",{staticClass:"apply-repair-top"},[a("MainTop",[e._v("遗产申请 "),a("span",{staticClass:"gang"},[e._v(" / ")]),e._v(" 遗产报修"),a("span",{staticClass:"gang"},[e._v(" / ")]),e._v(" 新建报修")])],1),a("div",{staticClass:"apply-repair-bottom padding15"},[a("br"),a("el-alert",{attrs:{title:"\n       请确保报修信息真实有效，否则您的申请可能会不被通过\n      ",type:"info"}}),a("br"),a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{size:"mini",model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"申请人姓名",prop:"applyName"}},[a("el-input",{attrs:{placeholder:"请输入申请人或申请公司"},model:{value:e.ruleForm.applyName,callback:function(r){e.$set(e.ruleForm,"applyName",r)},expression:"ruleForm.applyName"}})],1),a("el-form-item",{attrs:{label:"手机号",prop:"phone"}},[a("el-input",{attrs:{placeholder:"手机号主要用于审核时与您的联系"},model:{value:e.ruleForm.phone,callback:function(r){e.$set(e.ruleForm,"phone",r)},expression:"ruleForm.phone"}})],1),a("el-form-item",{attrs:{label:"申请分类",prop:"addType"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.ruleForm.addType,callback:function(r){e.$set(e.ruleForm,"addType",r)},expression:"ruleForm.addType"}})],1),a("el-form-item",{attrs:{label:"遗产名称",prop:"name"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.ruleForm.name,callback:function(r){e.$set(e.ruleForm,"name",r)},expression:"ruleForm.name"}})],1),a("el-form-item",{attrs:{label:"所在地址",prop:"address"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.ruleForm.address,callback:function(r){e.$set(e.ruleForm,"address",r)},expression:"ruleForm.address"}})],1),a("el-form-item",{attrs:{label:"始建年份",prop:"start"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.ruleForm.start,callback:function(r){e.$set(e.ruleForm,"start",r)},expression:"ruleForm.start"}})],1),a("el-form-item",{attrs:{label:"遗产类型",prop:"type"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.ruleForm.type,callback:function(r){e.$set(e.ruleForm,"type",r)},expression:"ruleForm.type"}})],1),a("el-form-item",{attrs:{label:"所属公司",prop:"company"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.ruleForm.company,callback:function(r){e.$set(e.ruleForm,"company",r)},expression:"ruleForm.company"}})],1),a("el-form-item",{attrs:{label:"报修类型",prop:"repairType"}},[a("el-radio-group",{model:{value:e.ruleForm.repairType,callback:function(r){e.$set(e.ruleForm,"repairType",r)},expression:"ruleForm.repairType"}},[a("el-radio",{attrs:{label:"建筑修缮"}}),a("el-radio",{attrs:{label:"设备维修"}}),a("el-radio",{attrs:{label:"环境改造"}})],1)],1),a("el-form-item",{attrs:{label:"报修详情",prop:"repairMain"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2},placeholder:"请输入对于报修的详细描述"},model:{value:e.ruleForm.repairMain,callback:function(r){e.$set(e.ruleForm,"repairMain",r)},expression:"ruleForm.repairMain"}})],1),a("el-form-item",{attrs:{label:"是否自备材料及配件",prop:"isPart"}},[a("el-radio-group",{model:{value:e.ruleForm.isPart,callback:function(r){e.$set(e.ruleForm,"isPart",r)},expression:"ruleForm.isPart"}},[a("el-radio",{attrs:{label:"是"}}),a("el-radio",{attrs:{label:"否"}}),a("el-radio",{attrs:{label:"部分自备"}})],1)],1),"是"!==e.ruleForm.isPart?a("el-form-item",{attrs:{label:"材料详情"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2},placeholder:"请输入对于维修材料的详细描述"},model:{value:e.ruleForm.partMain,callback:function(r){e.$set(e.ruleForm,"partMain",r)},expression:"ruleForm.partMain"}})],1):e._e(),a("el-divider"),a("el-alert",{attrs:{title:"如有请上传相关图片，可上传多张",type:"info"}}),a("br"),a("input",{attrs:{type:"file",multiple:"multiple"},on:{change:e.addImagesAll}}),a("el-divider"),a("div",{staticClass:"subBtn"},[a("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm")}}},[e._v("立即创建")])],1)],1)],1)])},n=[],l=a("5530"),i=a("1da1"),s=(a("b0c0"),a("ac1f"),a("5319"),a("1276"),a("d81d"),a("a15b"),a("96cf"),a("b2df")),o={components:{MainTop:s["a"]},created:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(console.log(e.$route.query),!e.$route.query.applyId){r.next=8;break}return r.next=4,e.$axios.post("/getOneApplyRepair/getOneApplyRepair",{_id:e.$route.query.applyId});case 4:a=r.sent,e.ruleForm=Object(l["a"])({},a.data.data[0]),r.next=9;break;case 8:e.getData();case 9:case"end":return r.stop()}}),r)})))()},data:function(){return{data:[],ruleForm:{applyName:"",phone:"",addType:"",name:"",address:"",type:"",company:"",jing:0,wei:0,start:"",mainImage:"",coordinate:[],approvalStatus:"pending",approvalComments:"",rejectComment:"",repairType:"",repairMain:"",imagesAllurl:[],isPart:"是",partMain:""},rules:{applyName:[{required:!0,message:"请输入申请人",trigger:"blur"}],phone:[{required:!0,message:"请输入正确手机号",trigger:"blur"}],addType:[{required:!0,message:"请选择添加类型",trigger:"change"}],name:[{required:!0,message:"请输入工业遗产名称",trigger:"blur"},{min:3,message:"长度在不少于3个字符",trigger:"blur"}],address:[{required:!0,message:"请选择工业遗产所在地址",trigger:"blur"}],type:[{required:!0,message:"请输入工业遗产类型",trigger:"blur"}],company:[{required:!0,message:"请输入工业遗产所属公司",trigger:"blur"}],start:[{required:!0,message:"请选择遗产始建年份",trigger:"blur"}],repairType:[{required:!0,message:"请选择报修类型",trigger:"blur"}],repairMain:[{required:!0,message:"请输入报修详情",trigger:"blur"}],isPart:[{required:!0,message:"请确定是否需要维修材料",trigger:"blur"}]}}},methods:{getData:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(a="","工业遗产"!==e.$route.query.addType){r.next=5;break}return r.next=4,e.$axios.post("/getOneHeritageMainData/getOneHeritageMainData",{_id:e.$route.query._id});case 4:a=r.sent;case 5:e.data=a.data.data[0],e.ruleForm.addType=e.data.addType,e.ruleForm.name=e.data.name,e.ruleForm.address=e.data.address,e.ruleForm.type=e.data.type,e.ruleForm.company=e.data.company,e.ruleForm.jing=e.data.jing,e.ruleForm.wei=e.data.wei,e.ruleForm.start=e.data.start,e.ruleForm.mainImage=e.data.mainImage,e.ruleForm.coordinate=e.data.coordinate,console.log(e.data);case 17:case"end":return r.stop()}}),r)})))()},submitForm:function(e){var r=this;this.$refs[e].validate(function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(a){var t,n,i,s,o,u,p,c,m,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!a){e.next=18;break}if(console.log(r.ruleForm),""!==r.ruleForm.repairMain&&(t=/\n/g,r.ruleForm.repairMain=r.ruleForm.repairMain.replace(t,"<br>"),console.log(r.ruleForm.repairMain.split("<br>")),n=r.ruleForm.repairMain.split("<br>"),i=n.map((function(e){return"<p class='test'>"+e+"</p>"})),s=i.join(""),r.ruleForm.repairMain=s),""!==r.ruleForm.partMain&&(o=/\n/g,r.ruleForm.partMain=r.ruleForm.partMain.replace(o,"<br>"),console.log(r.ruleForm.partMain.split("<br>")),u=r.ruleForm.partMain.split("<br>"),p=u.map((function(e){return"<p class='test'>"+e+"</p>"})),c=p.join(""),r.ruleForm.partMain=c),!r.$route.query.applyId){e.next=12;break}return r.ruleForm.approvalStatus="pending",e.next=8,r.$axios.post("/editApplyRepair/editApplyRepair",Object(l["a"])(Object(l["a"])({},r.ruleForm),{},{user:sessionStorage.getItem("username")}));case 8:m=e.sent,200===m.status&&(r.$message({message:"编辑成功",type:"success"}),r.$router.push({path:"/repair/my/applyRepair"})),e.next=16;break;case 12:return e.next=14,r.$axios.post("/postApplyRepairData/postApplyRepairData",Object(l["a"])(Object(l["a"])({},r.ruleForm),{},{user:sessionStorage.getItem("username")}));case 14:d=e.sent,200===d.status&&(r.$message({message:"报修信息提交成功，请耐心等待审核",type:"success"}),r.$router.push("/repair/my/applyRepair"));case 16:e.next=20;break;case 18:return console.log("error submit!!"),e.abrupt("return",!1);case 20:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}())},addImagesAll:function(e){var r=this,a=e.target.files[0];console.log(a);var t=new FileReader;t.readAsDataURL(a),t.onload=function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){var n,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=r.src=t.target.result,e.next=3,r.$axios.post("https://790d5b85-9674-4a89-9bcc-c0657ea369be.bspapp.com/image",{dataUrl:n,name:a.name});case 3:l=e.sent,200===l.status?(r.$message({message:"图片上传成功",type:"success"}),r.ruleForm.imagesAllurl.push(l.data.fileID)):r.$message.error("图片上传失败，请检查网络设置");case 5:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}()}}},u=o,p=a("2877"),c=Object(p["a"])(u,t,n,!1,null,null,null);r["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2c2abf00.d72a3c76.js.map