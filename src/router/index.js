import Vue from 'vue'
import Router from 'vue-router'

const nodeEnv = 'development'
const _import = require('./_import_' + nodeEnv)

Vue.use(Router)

export default new Router({
  routes: [
    { path: '',
      name: 'home',
      component: _import('home/Home'),
      children: [
        { path: '/', name: 'main', component: _import('home/layout/main') },
        { path: '/main', redirect: '/' },
        { path: '/template/process', name: 'processTemplate', component: _import('template/processTemplate') },
        { path: '/template/deploy', name: 'processDeploy', component: _import('template/processDeploy') },
        { path: '*', component: _import('errorPage/404'), hidden: true }
      ]
    },
    { path: '/404', component: _import('errorPage/404'), hidden: true },
    { path: '*', redirect: '/404', hidden: true }
  ]
})
