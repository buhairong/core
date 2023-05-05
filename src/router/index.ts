import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login.vue'
import Home from '../views/home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/businessManagement/businessManagement',
          name: 'CarDealer',
          component: () => import('../views/merchant/CarDealer.vue'),
          meta: {
            breadCrumb: [{ name: '商户管理' }, { name: '汽车经销商' }]
          }
        },
        {
          path: '/businessManagement/businessAudit',
          name: 'FinancialService',
          component: () => import('../views/merchant/FinancialService.vue'),
          meta: {
            breadCrumb: [{ name: '商户管理' }, { name: '金融服务商' }]
          }
        },
        {
          path: '/product/productTemplate',
          name: 'Template',
          component: () => import('../views/plan/Template.vue'),
          meta: {
            breadCrumb: [{ name: '产品管理' }, { name: '产品模板' }]
          }
        },
        {
          path: '/product/subscribe',
          name: 'Subscribe',
          component: () => import('../views/plan/Subscribe.vue'),
          meta: {
            breadCrumb: [{ name: '产品管理' }, { name: '订阅方案' }]
          }
        },
        {
          path: '/product/finance',
          name: 'Financial',
          component: () => import('../views/plan/Financial.vue'),
          meta: {
            breadCrumb: [{ name: '产品管理' }, { name: '金融方案' }]
          }
        },
        {
          path: '/order/financialOrderManagement',
          name: 'NewCarOrder',
          component: () => import('../views/order/NewCarOrder.vue'),
          meta: {
            breadCrumb: [{ name: '订单管理' }, { name: '全新车订单' }]
          }
        },
        {
          path: '/order/olderCarOrder',
          name: 'OldCarOrder',
          component: () => import('../views/order/OldCarOrder.vue'),
          meta: {
            breadCrumb: [{ name: '订单管理' }, { name: '二手车订单' }]
          }
        }
      ]
    }
  ]
})

// 登录鉴权
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  if (whiteList.includes(to.path)) {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
