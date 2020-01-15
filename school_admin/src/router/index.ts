import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect:"/home/index",
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
        name: 'index',
        component: () => import('../views/index/Index.vue'),
      },
      {
        // 空间管理
        path: '/home/spacemanage',     
        name: 'spacemanage',
        component: () => import('../views/spaceManager/index.vue'),
      },
      {
        // 用户管理
        path: '/home/usersManager',     
        name: 'usersManager',
        component: () => import('../views/usersManager/index.vue'),
      },
      {
        // 用户管理
        path: '/home/managers',     
        name: 'managers',
        component: () => import('../views/managersManager/index.vue'),
      },
      {//空间管理
        path:"/home/spaceItem",
        name:'spaceItem',
        component:()=>import('../views/spaceManager/item.vue')
      },
      {
        path:"/home/articleManager",//文章管理
        name:"articleManager",
        component:()=>import('../views/articleManager/index.vue')
      },
      {
        path:"/home/revieweManager",
        name:"revieweManager",
        component:()=>import('../views/revieweManager/index.vue')
      },
      {
        path:"home/classifyManager",
        name:"classifyManager",
        component:()=>import('../views/classifyManager/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
