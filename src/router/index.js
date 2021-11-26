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
        path: 'home',//主页面
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
      }
    ]

  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
