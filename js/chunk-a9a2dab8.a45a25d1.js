(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a9a2dab8"],{"011a":function(a,t,e){},"13ee":function(a,t,e){"use strict";e("011a")},4497:function(a,t,e){"use strict";e.r(t);var r=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"ApplyHeritageMain"},[e("div",{staticClass:"ApplyHeritageMain-top"},[e("MainTop",[a._v("遗产数据 "),e("span",{staticClass:"gang"},[a._v(" / ")]),a._v(" 报修详情")])],1),e("div",{staticClass:"ApplyHeritageMain-bottom padding15"},[e("el-alert",{attrs:{title:"\n      \n          管理员，欢迎您,请对用户的报修申请进行客观审批。\n         \n      ",type:"info"}}),e("br"),null!==a.heritageMainData?e("el-card",{staticClass:"box-card",attrs:{shadow:"hover"}},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("span",{staticClass:"title"},[a._v(a._s(a.heritageMainData.name))]),e("div",[e("span",{staticStyle:{"margin-right":"10px"}},[a._v(a._s(a.heritageMainData.addType))]),"pending"===a.heritageMainData.approvalStatus?e("el-tag",{attrs:{type:"info"}},[a._v("待审批")]):a._e(),"adopt"===a.heritageMainData.approvalStatus?e("el-tag",{attrs:{type:"warning"}},[a._v("处理中")]):a._e(),"reject"===a.heritageMainData.approvalStatus?e("el-tag",{attrs:{type:"danger"}},[a._v("已驳回")]):a._e(),"isend"===a.heritageMainData.approvalStatus?e("el-tag",{attrs:{type:"success"}},[a._v("已完成")]):a._e()],1)]),e("div",{staticClass:"text item"},[e("div",[e("div",{staticClass:"text-che"},[e("span",[a._v("报修人："+a._s(a.heritageMainData.applyName))])]),e("div",{staticClass:"text-che"},[e("span",[a._v("联系方式："+a._s(a.heritageMainData.phone))])]),e("div",{staticClass:"text-che"},[e("span",[a._v("报修类型："+a._s(a.heritageMainData.repairType))])]),e("div",{staticClass:"text-che"},[e("span",[a._v("报修详情：")])]),e("div",{staticClass:"text-che",domProps:{innerHTML:a._s(a.heritageMainData.repairMain)}}),e("div",{staticClass:"text-che"},[e("span",[a._v("是否自备材料及配件："+a._s(a.heritageMainData.isPart))])]),""!==a.heritageMainData.partMain?e("div",{staticClass:"text-che"},[e("span",[a._v("材料描述：")])]):a._e(),""!==a.heritageMainData.partMain?e("div",{staticClass:"text-che",domProps:{innerHTML:a._s(a.heritageMainData.partMain)}}):a._e(),e("el-divider"),e("div",{staticClass:"text-che"},[e("span",[a._v("始建年份："+a._s(a.heritageMainData.start))])])],1),e("div",{staticClass:"text-che"},[e("span",[a._v("遗产类型："+a._s(a.heritageMainData.type))])]),e("div",{staticClass:"text-che"},[e("span",[a._v("遗产地址："+a._s(a.heritageMainData.address))])]),e("div",{staticClass:"text-che"},[e("span",[a._v("所属公司："+a._s(a.heritageMainData.company))])]),e("div",{staticClass:"text-che"},[e("span",[a._v("地理坐标："+a._s(a.heritageMainData.jing)+","+a._s(a.heritageMainData.wei))])]),e("div",{staticClass:"text-che"},[e("span",[a._v(" 保护等级及再利用情况：")]),e("p",[a._v(" "+a._s(a.heritageMainData.prolevel?a.heritageMainData.prolevel:"暂无数据")+" ")])]),e("el-divider"),e("div",{staticClass:"text-che"},[e("span",[a._v("遗产预览： ")])]),e("div",{staticClass:"text-che"},[e("img",{staticClass:"mainImage",attrs:{src:a.heritageMainData.mainImage,alt:""}})]),e("el-divider"),e("div",{staticClass:"text-che"},[e("span",[a._v("相关图片 ")])]),e("div",{staticClass:"text-che"},[e("el-carousel",{attrs:{interval:4e3,type:"card",height:"500px"}},a._l(a.heritageMainData.imagesAllurl,(function(a){return e("el-carousel-item",{key:a},[e("img",{staticClass:"otherImage",attrs:{src:a,alt:""}})])})),1)],1),e("div",{staticClass:"text-che"},[e("span",[a._v("审批意见： ")])]),""!==a.heritageMainData.approvalComments?e("div",{staticClass:"text-che",domProps:{innerHTML:a._s(a.heritageMainData.approvalComments)}}):e("div",{staticClass:"text-che"},[e("p",[a._v("暂无意见")])]),e("el-divider"),e("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:a.ruleForm,rules:a.rules,"label-width":"100px"}},[e("el-form-item",{attrs:{label:"审批结果",prop:"approvalStatus"}},[e("el-radio-group",{model:{value:a.ruleForm.approvalStatus,callback:function(t){a.$set(a.ruleForm,"approvalStatus",t)},expression:"ruleForm.approvalStatus"}},[e("el-radio",{attrs:{label:"同意",value:"adopt"}}),e("el-radio",{attrs:{label:"驳回",value:"reject"}})],1)],1),e("el-form-item",{attrs:{label:"审批意见",prop:"approvalComments"}},[e("el-input",{attrs:{type:"textarea"},model:{value:a.ruleForm.approvalComments,callback:function(t){a.$set(a.ruleForm,"approvalComments",t)},expression:"ruleForm.approvalComments"}})],1),"驳回"===a.ruleForm.approvalStatus?e("el-form-item",{attrs:{label:"驳回原因"}},[e("el-radio-group",{model:{value:a.ruleForm.rejectComment,callback:function(t){a.$set(a.ruleForm,"rejectComment",t)},expression:"ruleForm.rejectComment"}},[e("el-radio",{attrs:{label:"图片不全"}}),e("el-radio",{attrs:{label:"无需派工维修"}}),e("el-radio",{attrs:{label:"遗产报修相关内容不完善"}}),e("el-radio",{attrs:{label:"其他"}})],1)],1):a._e(),e("el-form-item",[e("el-button",{attrs:{type:"primary"},on:{click:function(t){return a.submitForm("ruleForm")}}},[a._v("立即创建")])],1)],1)],1)]):a._e()],1)])},s=[],i=e("1da1"),n=(e("96cf"),e("b2df")),l={name:"ApplyHeritageMain",components:{MainTop:n["a"]},data:function(){return{heritageMainData:null,ruleForm:{approvalStatus:"",approvalComments:"",rejectComment:""},rules:{approvalStatus:[{required:!0,message:"请输入选择审批类型",trigger:"blur"}],approvalComments:[{required:!0,message:"请输入审批意见",trigger:"change"}]}}},created:function(){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log(a.$route),t.next=3,a.$axios.post("/getOneApplyRepair/getOneApplyRepair",{_id:a.$route.query._id});case 3:e=t.sent,a.heritageMainData=e.data.data[0],console.log(a.heritageMainData);case 6:case"end":return t.stop()}}),t)})))()},methods:{submitForm:function(a){var t=this;this.$refs[a].validate(function(){var a=Object(i["a"])(regeneratorRuntime.mark((function a(e){var r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(!e){a.next=11;break}return console.log(t.ruleForm),"同意"===t.ruleForm.approvalStatus?t.heritageMainData.approvalStatus="adopt":"驳回"===t.ruleForm.approvalStatus&&(t.heritageMainData.approvalStatus="reject"),t.heritageMainData.approvalComments=t.ruleForm.approvalComments,t.heritageMainData.rejectComment=t.ruleForm.rejectComment,a.next=7,t.$axios.post("/editApplyRepair/editApplyRepair",t.heritageMainData);case 7:r=a.sent,200===r.status&&(t.$message({message:"审批成功",type:"success"}),t.$router.push("/repair/approve")),a.next=13;break;case 11:return t.$message.error("请完善审批信息"),a.abrupt("return",!1);case 13:case"end":return a.stop()}}),a)})));return function(t){return a.apply(this,arguments)}}())}}},o=l,p=(e("8bd0"),e("2877")),c=Object(p["a"])(o,r,s,!1,null,null,null);t["default"]=c.exports},"8bd0":function(a,t,e){"use strict";e("c472")},b2df:function(a,t,e){"use strict";var r=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"main-top"},[e("div",{staticClass:"main-top-left"},[e("span",{staticClass:"el-icon-arrow-left"}),e("span",[a._t("default")],2)]),e("div",{staticClass:"main-top-right"},[e("div",{staticClass:"btnBox"},[e("el-dropdown",{on:{command:a.handleCommand}},[e("span",{staticClass:"el-dropdown-link"},[a._v(" "+a._s("zh_cn"===a.lang?"中文":"English")),e("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[e("el-dropdown-item",{attrs:{command:"zh_cn"}},[a._v(" "+a._s("zh_cn"===a.lang?"中文":"Chinese"))]),e("el-dropdown-item",{attrs:{command:"zh_en"}},[a._v(" "+a._s("zh_cn"===a.lang?"英文":"English"))])],1)],1),e("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"text"},on:{click:a.leginOut}},[a._v(" "+a._s("zh_cn"===a.lang?"退出登陆":"SignOut"))])],1),e("el-avatar",{staticStyle:{"margin-left":"10px"},attrs:{shape:"square",size:"small",src:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/5f0c8b2c-22e0-42f3-9ed3-539de3652c08.jpg"}})],1)])},s=[],i=e("5530"),n=e("2f62"),l={name:"MainTop",created:function(){},computed:Object(i["a"])({},Object(n["c"])(["lang"])),methods:Object(i["a"])(Object(i["a"])({},Object(n["b"])(["langChange"])),{},{handleCommand:function(a){this.langChange(a)},leginOut:function(){sessionStorage.removeItem("username"),this.$router.push("/heritage/login")}})},o=l,p=(e("13ee"),e("2877")),c=Object(p["a"])(o,r,s,!1,null,"0096d332",null);t["a"]=c.exports},c472:function(a,t,e){}}]);
//# sourceMappingURL=chunk-a9a2dab8.a45a25d1.js.map