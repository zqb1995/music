<template>
  <div id="app">
    <music-tab></music-tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <transition name="slide">
      <audio-player class="player" v-show="$store.state.player.isShowPlayer" :player="player"></audio-player>
    </transition>
  </div>
</template>

<script>
  import tab from './components/tab/tab.vue'
  import audioPlayer from './components/audioPlay/audioPlay.vue'
export default {
  name: 'App',
  computed: {
    player() {
      return this.$store.state.player
    }
  },
  components: {
    'music-tab': tab,
    'audio-player': audioPlayer
  }
}
</script>

<style lang="stylus">
  // 全局样式
  @import '~@/assets/stylus/index.styl'
  .player
    transform translate3d(0, 0, 0)
    transition: all 0.4s ease-in
    &.slide-enter, &.slide-leave-to
      transform translate3d(100%, 0, 0)
</style>
