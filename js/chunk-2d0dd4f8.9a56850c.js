(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0dd4f8"],{"819b":function(t,a,e){"use strict";e.r(a);var l=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"my-approve"},[e("div",{staticClass:"my-approve-top"},[e("MainTop",[t._v("我的审核 "),e("span",{staticClass:"gang"},[t._v(" / ")]),t._v(" 遗产申请")])],1),e("div",{staticClass:"my-approve-bottom padding15"},[e("div",{staticClass:"my-approve-btns"},[e("el-button",{attrs:{type:"primary"},on:{click:t.allClick}},[t._v("全部申请")]),e("el-button",{attrs:{type:"primary"},on:{click:t.adoptClick}},[t._v("已通过")]),e("el-button",{attrs:{type:"primary"},on:{click:t.rejectClick}},[t._v("已驳回")]),e("el-button",{attrs:{type:"primary"},on:{click:t.pendClick}},[t._v("待审批")])],1),e("br"),e("el-table",{staticStyle:{width:"100%"},attrs:{border:"",stripe:"",data:t.tableData,height:"550"}},[e("el-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"50"}}),e("el-table-column",{attrs:{prop:"name",label:"工业遗产名称",width:"180"}}),e("el-table-column",{attrs:{prop:"address",label:"地址"}}),e("el-table-column",{attrs:{prop:"type",align:"center",label:"遗产类型",width:"100"}}),e("el-table-column",{attrs:{prop:"addType",width:"100",align:"center",label:"所属分类"}}),e("el-table-column",{attrs:{prop:"company",label:"公司"}}),e("el-table-column",{attrs:{prop:"phone",label:"联系方式",width:"150"}}),e("el-table-column",{attrs:{prop:"applyName",label:"申请人",align:"center",width:"100"}}),e("el-table-column",{attrs:{label:"审批状态",width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return["pending"===a.row.approvalStatus?e("el-tag",{attrs:{type:"info"}},[t._v("待审批")]):t._e(),"adopt"===a.row.approvalStatus?e("el-tag",{attrs:{type:"success"}},[t._v("已通过")]):t._e(),"reject"===a.row.approvalStatus?e("el-tag",{attrs:{type:"danger"}},[t._v("已驳回")]):t._e()]}}])}),e("el-table-column",{attrs:{label:"操作",align:"center",width:"150"},scopedSlots:t._u([{key:"default",fn:function(a){return["pending"===a.row.approvalStatus?e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){return t.getApply(a.row)}}},[t._v("查看")]):t._e()]}}])})],1)],1)])},n=[],r=e("1da1"),i=(e("4de4"),e("d3b7"),e("96cf"),e("b2df")),o={components:{MainTop:i["a"]},created:function(){this.getAllData()},data:function(){return{tableData:[],listData:[]}},methods:{getAllData:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var e;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$axios.get("/getApplyHeritageData/getApplyHeritageData");case 2:e=a.sent,t.tableData=e.data.data,t.listData=e.data.data,console.log(t.tableData);case 6:case"end":return a.stop()}}),a)})))()},getApply:function(t){console.log(t),this.$router.push("/heritage/my/approve/"+t._id)},allClick:function(){this.tableData=this.listData},pendClick:function(){this.tableData=this.listData.filter((function(t){return"pending"===t.approvalStatus}))},adoptClick:function(){this.tableData=this.listData.filter((function(t){return"adopt"===t.approvalStatus}))},rejectClick:function(){this.tableData=this.listData.filter((function(t){return"reject"===t.approvalStatus}))}}},s=o,p=e("2877"),c=Object(p["a"])(s,l,n,!1,null,null,null);a["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d0dd4f8.9a56850c.js.map