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
        name: 'Home',
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
      // 关于我们
      {
        path: '/about',//报修申请
        component: () => import('../views/About.vue')
      },
      // 设置
      {
        path: '/setup',//报修申请
        component: () => import('../views/SetUp.vue')
      },
    ]

  },

]

const router = new VueRouter({
  routes
})

export default router
