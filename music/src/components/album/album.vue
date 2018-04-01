<template>
  <div class="album" v-height>
    <div :style="{background:'url('+ albumList.albumBg +') 0 0 / 100% 100% no-repeat'}">
      <div class="header">
        {{albumList.albumTitle}}
        <span @click="goBack" class="icon-arrow-left2"></span>
      </div>
      <div class="album-content">
        <div class="album-content-top">
          <img :src="albumList.albumImgSrc">
          <div class="detail">
            <p class="album-name">专辑 : {{albumList.albumTitle}}</p>
            <p class="singer">
              <img class="avatar" :src="albumList.albumImgSrc" >
              <span class="singer-name">歌手: {{albumList.albumSinger}}</span>
            </p>
          </div>
        </div>
        <div class="album-content-bottom">
            <ul>
                <li class="icon-folder-plus"></li>
                <li class="icon-bubble"></li>
                <li class="icon-share"></li>
                <li class="icon-folder-download"></li>
            </ul>
        </div>
      </div>
    </div>
    <div class="album-content-songList" v-height="260">
      <ul>
        <li v-for="(item,index) of albumList.albumMusicList" @click="showPlayer(albumList.albumMusicList, index)">
          <span class="song-order">{{index + 1}}</span>
          <div class="song-detail">
            <p class="music-name">{{item.musicName}}</p>
            <p class="singer-name">{{item.musicSinger}}</p>
          </div>
          <div class="icon-play_circle_outline"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { randomNum } from '../../assets/js/util'
export default {
  props: {
    albumList: {
      type: Object,
      default: {}
    }
  },
  methods: {
    goBack() {
      this.$store.commit("TOGGLE_ALBUM", {
        isShowAlbum: false
      })
    },
    showPlayer(album, index) {
      console.log(1223)
      this.$store.commit("PLAYAUDIO", {
        playType: 1,
        isShowPlayer: true,
        album: album,
        index: index,
        id: randomNum(8),
        playerBg: this.albumList.playerBg,
        albumImgSrc: this.albumList.albumImgSrc
      })
    }
  }
};
</script>
<style lang="stylus" scoped>

  $album-header-h = 50px        // header height
  $goBack-icon-fontSize = 24px  // goback font-size

  .album
    position fixed
    width 100%
    top 0
    left 0
    background #fff
    z-index 1
    .header
      position relative
      height $album-header-h
      line-height $album-header-h
      font-size 16px
      text-align center
      color #fff
      .icon-arrow-left2
        position absolute
        display block
        top 0
        left 0
        width 50px
        height 50px
        font-size $goBack-icon-fontSize
        line-height $album-header-h
    .album-content
      width: 100%;
      .album-content-top
        margin-top 20px
        padding 0 16px
        overflow hidden
        img
          float left
          display block
          width 110px
          height 110px
        .detail
          float left
          margin-top 10px
          margin-left 20px
          .album-name, .singer 
            color #fff
            padding 5px 0
          .album-name
            font-style 16px
          .singer
            font-style 14px
            overflow hidden
            .avatar
              width 26px
              height 26px
              border-radius 50%
            span 
              display inline-block
              height 26px
              line-height 26px
              padding-left 5px
      .album-content-bottom
          padding 15px 0
          ul
            overflow hidden
            li
              float left
              width 25%
              height 50px
              text-align center
              line-height 50px
              font-size 26px
              color #fff
    .album-content-songList
        overflow-y scroll 
        ul
          li
            overflow hidden
            height 50px
            .song-order
              float left
              width 50px
              height 50px
              line-height 50px
              text-align center
            .song-detail
              float left
              .music-name, .singer-name
                height 25px
                line-height 25px
                font-size 12px
                color #989898
              .music-name
                font-style 14px
                color #333
            .icon-play_circle_outline
              float right
              width 50px
              height 50px
              text-align center 
              line-height 50px
              font-style 26px
              color #333
</style>

