import Vue from 'vue'
import VueRouter from 'vue-router'
//eg import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import HeritageIndustry from '../views/HeritageIndustry.vue'
import HeritageMuseum from '../views/HeritageMuseum.vue'
import Home from '../views/Home.vue'
// import { component } from 'vue/types/umd'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',//主页面
    name: 'Main',
    component: Main,
    children: [
      {
        path: '',//主页面
        component: Home
      },
      {
        path: "/heritage/industry",//工业遗产
        component: HeritageIndustry
      },

      {
        path: "/heritage/museum",//工业遗产博物馆
        component: HeritageMuseum
      },
      {
        path: '/heritage/tourism',//工业旅游区
        component: () => import('../views/HeritageTourism.vue')
      },
      {
        path: "/heritage/industry/main/:heritage",//工业遗产详情
        name: "industryMain",
        component: () => import('../views/Heritage/HeritageMain.vue')
      },
      // 遗产申请
      {
        path: '/heritage/apply',//遗产申报
        // name: 'About',
        component: () => import('../views/HeritageApply.vue')
      },
      {
        path: '/heritage/repair',//遗产报修
        component: () => import('../views/HeritageRepair.vue')
      },
      {
        path: '/heritage/myapply',//我的申请
        component: () => import('../views/MyApply.vue')
      },
      {
        path: "/heritage/my/apply/:applyid",//工业遗产申请详情
        name: "ApplyHeritageMain",
        component: () => import('../views/Heritage/ApplyHeritageMain.vue')
      },
      {
        path: "/heritage/my/approve/:applyid",//工业遗产审批详情
        name: "ApproveHeritageMain",
        component: () => import('../views/Heritage/ApproveHeritageMain.vue')
      },
      {
        path: "/heritage/my/approveRepair",//工业遗产报修审批详情
        name: "ApproveRepirMain",
        component: () => import('../views/Heritage/ApproveRepirMain.vue')
      },
      // 遗产数据
      {
        path: '/heritage/Echarts',//遗产报表
        component: () => import('../views/HeritageECharts.vue')
      },
      {
        path: '/heritage/ranking',//遗产排行榜
        component: () => import('../views/HeritageRanking.vue')
      },
      // 我要旅行
      {
        path: '/travel/plan',//出行规划
        component: () => import('../views/TravelPlan.vue')
      }, {
        path: '/travel/money',//预算评估
        component: () => import('../views/MoneyPlan.vue')
      }, {
        path: '/travel/map',//足迹地图
        component: () => import('../views/FootMap.vue')
      },
      // 数据维护
      {
        path: '/data/manage',//遗产管理
        component: () => import('../views/DataManage.vue')
      }, {
        path: '/edit/home',//遗产主页编辑
        component: () => import('../views/EditHome.vue')
      },
      // 我的审核
      {
        path: '/heritage/approve',//遗产申请
        component: () => import('../views/HeritageApprove.vue')
      }, {
        path: '/repair/approve',//报修申请
        component: () => import('../views/RepairApprove.vue')
      },
      {
        path: '/repair/apply/main',//报修新建
        component: () => import('../views/Heritage/ApplyRepair.vue')
      },
      {
        path: '/repair/my/applyRepair',//报修申请列表
        component: () => import('../views/MyRepir.vue')
      },
      {
        path: '/repair/my/applyRepairMain',//报修申请详情
        component: () => import('../views/Heritage/ApplyRepairMain.vue')
      },

      // 关于我们
      {
        path: '/about',
        component: () => import('../views/About.vue')
      },
      // 设置
      {
        path: '/setup',
        component: () => import('../views/SetUp.vue')
      },
      // 工业遗产数据添加
      {
        path: '/heritage/add/:editid',
        component: () => import('../views/Heritage/HeritageAdd.vue')
      },
      // 拾取遗产坐标位置页
      {
        path: '/get/coordinate',
        component: () => import('../views/Heritage/getCoordinate.vue')
      },
      //热力图
      {
        path: '/heritage/hotmap',
        component: () => import('../views/HeritageHotMap.vue')
      },
      {
        // 好评蜂窝图
        path: '/heritage/praise',
        component: () => import('../views/HeritagePraise.vue')
      },
      {
        // 维修现状图（在我的审核模块，仅对管理员开放）
        path: '/heritage/repairmap',
        component: () => import('../views/HeritageRepairMap.vue')
      },
      {
        // 遗产维修次数图
        path: '/heritage/repairlocalmap',
        component: () => import('../views/HeritageRepairLocalMap.vue')
      },
      {
        // 要闻详情
        path: '/main/noticemain',
        component: () => import('../views/NoticeMain.vue')
      },
    ]

  },
  {
    path: "/heritage/login",//登陆页面
    component: () => import('../views/LoginUser.vue')
  },
  {
    path: "/heritage/postUser",//登陆页面
    component: () => import('../views/postUser.vue')
  },

]



const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const username = sessionStorage.getItem('username')

  // console.log(username)

  if (to.path !== "/heritage/login" && to.path !== "/heritage/postUser" && username === null) next("/heritage/login");
  next();
})

export default router
