import Vue from 'vue'
import Router from 'vue-router'

import index from '../view/index/index.vue'
import findMusic from '../view/findMusic/findMusic.vue'
import myMusic from '../view/myMusic/myMusic.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: index
    },{
      path: '/findMusic',
      component: findMusic
    },{
      path: '/myMusic',
      component: myMusic
    },{
      path: '*',
      redirect: '/index'
    }
  ]
})
