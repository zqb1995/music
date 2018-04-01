import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import * as actions from './actions.js'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
Vue.config.productionTip = false;

export default new Vuex.Store({
  state: {
    mapList: [],
    album: {
      isShowAlbum: false, // 专辑页面默认隐藏
      albumList: [],      // 专辑默认列表
      index: 0            // 专辑默认下标
    },
    player: {
      isShowPlayer: false, // 默认隐藏播放器
      index: null,
      id: null
    }
  },
  actions,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

