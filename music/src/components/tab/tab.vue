<template>
  <div class="tab">
    <!-- 菜单栏 -->
    <div class="tab-item-fix menu">
      <span class="icon-menu2 item-icon"></span>
    </div>
    <!-- 路由 index -->
    <router-link to="/index" tag="div" class="tab-item">
      <span class="item-icon icon-music"></span>
    </router-link>
    <!-- 路由 findMusic -->
    <router-link to="/findMusic" tag="div" class="tab-item">
      <span class="item-icon icon-headphones"></span>
    </router-link>
    <!-- 路由 myMusic -->
    <router-link to="/myMusic" tag="div" class="tab-item">
      <span class="item-icon icon-ipod"></span>
    </router-link>
    <!-- 播放器 -->
    <div class="tab-item-fix disk" @click="showPlayer">
      <span class="icon-vynil item-icon"></span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showPlayer() {
      this.$store.commit('TOGGLE_PLAYER', {
        isShowPlayer: true
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '~@/assets/stylus/variable.styl'

  $tab-height = 44px            // tab height
  $tab-item-fontSize = 28px     // tab fontSize
  $tab-item-fix-fontSize = 24px // fix tab-item fontSize

  .tab
    display flex
    width 100%
    height $tab-height
    min-width 340px
    font-style 0
    background $color-background-d
    color $tab-icon-color
    .tab-item-fix
      flex 0 0 80px
      text-align center
      .item-icon
        font-size $tab-item-fix-fontSize
        line-height $tab-height
    .tab-item
      flex 1
      text-align center
      .item-icon
        font-size $tab-item-fontSize
        line-height $tab-height
</style>

