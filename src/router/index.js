import Vue from 'vue'
import Router from 'vue-router'
// import impress from '@/components/impress/impress'
// import login from '@/components/login/login'
// import ingredient from '@/components/ingredient/ingredient'
// import redPackets from '@/components/redPackets/redPackets'
// import appraises from '@/components/impress/appraises/appraises'
// import consultations from '@/components/ingredient/consultations/consultations'
// import department from '@/components/ingredient/department/department'
// import suggest from '@/components/ingredient/suggest/suggest'
// import reviewType from '@/components/reviewType/reviewType'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/impress',
      name: 'impress',
      component: resolve => require(['@/components/impress/impress'], resolve)
    },
    {
      path: '/ingredient',
      name: 'ingredient',
      component: resolve => require(['@/components/ingredient/ingredient'], resolve)
    },
    {
      path: '/appraises',
      name: 'appraises',
      component: resolve => require(['@/components/impress/appraises/appraises'], resolve)
    },
    {
      path: '/redPackets',
      name: 'redPackets',
      component: resolve => require(['@/components/redPackets/redPackets'], resolve)
    },
    {
      path: '/consultations',
      name: 'consultations',
      component: resolve => require(['@/components/impress/consultations/consultations'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/login/login'], resolve)
    },
    {
      path: '/department',
      name: 'department',
      component: resolve => require(['@/components/ingredient/department/department'], resolve)
    },
    {
      path: '/suggest',
      name: 'suggest',
      component: resolve => require(['@/components/ingredient/suggest/suggest'], resolve)
    },
    {
      path: '/description',
      name: 'description',
      component: resolve => require(['@/components/impress/description/description'], resolve)
    },
    {
      path: '/reviewType',
      name: 'reviewType',
      component: resolve => require(['@/components/reviewType/reviewType'], resolve)
    }
  ]
})
