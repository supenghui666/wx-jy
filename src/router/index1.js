import Vue from 'vue'
import Router from 'vue-router'
import impress from '@/components/impress/impress'
import login from '@/components/login/login'
import reviewType from '@/components/reviewType/reviewType'
import ingredient from '@/components/ingredient/ingredient'
import redPackets from '@/components/redPackets/redPackets'
import appraises from '@/components/impress/appraises/appraises'
import description from '@/components/impress/description/description'
import consultations from '@/components/impress/consultations/consultations'
import department from '@/components/ingredient/department/department'
import suggest from '@/components/ingredient/suggest/suggest'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/impress',
      name: 'impress',
      component: impress
    },
    {
      path: '/ingredient',
      name: 'ingredient',
      component: ingredient
    },
    {
      path: '/appraises',
      name: 'appraises',
      component: appraises
    },
    {
      path: '/redPackets',
      name: 'redPackets',
      component: redPackets
    },
    {
      path: '/consultations',
      name: 'consultations',
      component: consultations
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/department',
      name: 'department',
      component: department
    },
    {
      path: '/suggest',
      name: 'suggest',
      component: suggest
    },
    {
      path: '/description',
      name: 'description',
      component: description  
    },
    {
      path: '/reviewType',
      name: 'reviewType',
      component: reviewType  
    }
  ]
})