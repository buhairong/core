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
        // 商户管理
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
          path: '/businessManagement/detail',
          name: 'MerchantDetail',
          component: () => import('../views/merchant/MerchantDetail.vue'),
          meta: {
            breadCrumb: [{ name: '商户管理' }, { name: '商户详情' }]
          }
        },
        {
          path: '/businessManagement/addMerchant',
          name: 'setMerchant',
          component: () => import('../views/merchant/SetMerchant.vue'),
          meta: {
            breadCrumb: [{ name: '商户管理' }, { name: '设置商户' }]
          }
        },

        // 产品管理
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

        // 订单管理
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
        },

        // 系统设置
        {
          path: '/system/openNewCar',
          name: 'openNewCar',
          component: () => import('../views/system/openNewCar.vue'),
          meta: {
            breadCrumb: [{ name: '系统配置' }, { name: '全新车开放' }]
          }
        },
        {
          path: '/system/openOldCar',
          name: 'openOldCar',
          component: () => import('../views/system/openOldCar.vue'),
          meta: {
            breadCrumb: [{ name: '系统配置' }, { name: '二手车开放' }]
          }
        },
        {
          path: '/system/account',
          name: 'account',
          component: () => import('../views/system/account.vue'),
          meta: {
            breadCrumb: [{ name: '系统配置' }, { name: '收款信息' }]
          }
        },
        {
          path: '/system/GPS',
          name: 'GPS',
          component: () => import('../views/system/GPS.vue'),
          meta: {
            breadCrumb: [{ name: '系统配置' }, { name: 'GPS' }]
          }
        },
        {
          path: '/system/IRR',
          name: 'IRR',
          component: () => import('../views/system/IRR.vue'),
          meta: {
            breadCrumb: [{ name: '系统配置' }, { name: 'IRR' }]
          }
        },
        {
          path: '/system/restrictedCity',
          name: 'restrictedCity',
          component: () => import('../views/system/restrictedCity.vue'),
          meta: {
            breadCrumb: [{ name: '系统配置' }, { name: '限牌城市' }]
          }
        },
        {
          path: '/system/limitedMileage',
          name: 'limitedMileage',
          component: () => import('../views/system/limitedMileage.vue'),
          meta: {
            breadCrumb: [{ name: '系统配置' }, { name: '限定里程' }]
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
