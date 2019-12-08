import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        // 首页空间管理，我也不知道他们有啥区别
        path: '/home/spaces',
        name: 'spaces',
        component: () => import('../views/index/Spaces.vue'),
      },
      {
        // 查看详情
        path: '/home/items',
        name: 'spaces',
        component: () => import('../views/index/articleItems.vue'),
      },
      {
        // 首页
        path: '/home/index',
        name: 'spaces',
        component: () => import('../views/index/Index.vue'),
      },
      {
        // 空间管理
        path: '/home/spacemanage',     
        name: 'spacemanage',
        component: () => import('../views/spaceManager/index.vue'),
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
