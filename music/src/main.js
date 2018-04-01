import Vue from 'vue'
import App from './App'
import router from './router' 
import store from './store'
import fastclick from 'fastclick'
import direactive from './plugins/directive'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
// 轮播组件
Vue.use(VueAwesomeSwiper)
// 全局指令
Vue.use(direactive)
// 解决移动端300ms延迟
fastclick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
