<template>
  <div class="audio-player" v-height :style="{background: '#223950 url(' + player.playerBg +') 0 0 /100% 100% no-repeat'}">
    <span v-if="typeof player.index === 'number'">
      <audio id="audio" :src="player.album[player.index].musicUrl" autoplay :loop="playState == 'once'" @timeupdate="play()"></audio>
    </span>
    <div class="header">
      {{player.index === null? '播放器' : player.album[player.index].musicName}}
      <span @click="goBack" class="icon-arrow-left2"></span>
    </div>
    <div class="content-cd" v-show="!isShowLyric" @click="showLyric" v-height="300">
      <div class="switch" :class="{cur: addSwithClass}">
        <img src="../../../static/img/swith.png">
      </div>
      <div class="cd" :class="{cur: addSwithClass}">
        <img src="../../../static/img/cd.png" class="cd-img">
        <div class="singerImg">
          <img :src="player.albumImgSrc">
        </div>
      </div>
    </div>
    <div class="lyric" v-show="isShowLyric" @click="hideLyric" v-height="250">
      <ul>
        <li v-for="item in lyric">{{item[1]}}</li>
      </ul>
    </div>
    <div class="setting">
      <ul>
        <li class="icon-star-empty"></li>
        <li class="icon-folder-download"></li>
        <li class="icon-bubble"></li>
        <li class="icon-more-horizontal"></li>
      </ul>
    </div>
    <div class="timeBar">
      <div class="startTime">{{currentTime | timeReversal}}</div>
      <div class="bar">
        <span class="duration" @click="goTime($event)">
          <span class="currentTime" :style="{width: currentTime/duration * 100 + '%'}"></span>
        </span>
      </div>
      <div class="endTime">{{duration | timeReversal}}</div>
    </div>
    <div class="controller">
      <ul>
        <li class="icon-replay"></li>
        <li class="icon-media-rewind-outline" @click="goPrev"></li>
        <li @click="player_pause" :class="[!addSwithClass === true ? 'icon-media-play-outline' : 'icon-media-pause-outline']"></li>
        <li class="icon-media-fast-forward-outline" @click="goNext"></li>
        <li class="icon-media-eject-outline" @click="showSongList"></li>
      </ul>
    </div>
    <div class="songListPopWindow" v-height :class="{cur: isShowSongList}">
      <div class="list-wrapper">
        <div class="title">
          <span class="icon-cancel-circle" @click="closeSongList"></span>
        </div>
        <ul>
          <li class="songList-item" v-for="(item, index) in player.album" :class="{cur: index == player.index}" @click="songListIndex(index)">
            <span class="text">{{item.musicSinger}} - {{item.musicName}}</span> 
            <span class="icon-play_circle_outline"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    player: {
      type: Object
    }
  },
  data() {
    return {
      isShowLyric: false,      // 歌词 默认隐藏
      addSwithClass: false,    // 磁头、CD 默认拨开
      isAddSwithClass: true,   // 磁头、CD 节流开关
      lyric: [],
      currentTime: 0,
      duration: 0,
      isShowSongList: false,
      isNext: true             // 进度条 节流开关
    }
  },
  computed: {
    index() {
      return this.player.index
    },
    playState() {
      return this.$store.state.playState
    }
  },
  watch: {
    index() {
      let vm = this
      this.axios.get(this.player.album[this.index].lyric).then(res => {
        vm.lyric = vm.parseLyric(res.data)
      }) 
    },
    'player.id': function() {
        var vm = this
        setTimeout(function() {
          vm.addSwithClass = true
        },200)
      }
  },
  methods: {
    goBack() {
      this.$store.commit("TOGGLE_PLAYER", {
        isShowPlayer: false
      })
    },
    showLyric() {
      var vm = this
      this.isShowLyric = true
      this.axios.get(this.player.album[this.index].lyric).then(res => {
        vm.lyric = vm.parseLyric(res.data)
      })
    },
    hideLyric() {
      this.isShowLyric = false
    },
    parseLyric(lyric) {
      let lines = lyric.split(/\n/)                 // 去掉换行
      let getLyricTime = /\[\d{2}:\d{2}.\d{2}\]/g   // 匹配时间
      let lyricArr = []
      // 得到有时间的歌词
      while (!getLyricTime.test(lines[0])) {
        lines = lines.splice(1)
      }
      // 清除末尾没有时间的项
      if (lines[lines.length - 1].length === 0) {
        lines.pop()
      }
      /**
       * lyricArr: [
       *   [当前累计时间, 歌词],
       *   ...
       * ]
       */
      lines.forEach(function(item) {
        let index = item.indexOf(']')
        let time = item.substr(1, index - 1)
        let timeArr = time.split(':')
        let geci = item.substr(index + 1)
        lyricArr.push([timeArr[0] * 60 + parseFloat(timeArr[1]), geci])
        // 歌词数组排序
        lyricArr.sort(function(a, b) {
          return a[0] - b[0]
        })
      })
      return lyricArr
    },
    goTime(event) {
      let audio = document.getElementById('audio')
      let duration = document.getElementsByClassName('duration')[0]
      let durationWidth = parseFloat(window.getComputedStyle(duration)['width'])

      audio.currentTime = event.offsetX / durationWidth * this.duration
    },
    goPrev() {
      if (this.index == 0) {
        this.playIndex(0)
      } else {
        this.playIndex(this.index - 1)
      }
    },
    goNext() {
      if (this.index == this.player.album.length - 1) {
        this.playIndex(this.player.album.length - 1)
      } else {
        this.playIndex(this.index + 1)
      }
    },
    player_pause() {
      let paused = document.getElementById("audio").paused
      if (!paused) {
        document.getElementById("audio").pause()
        this.isAddSwithClass = false
        this.addSwithClass = false
      } else {
        document.getElementById("audio").play()
        this.isAddSwithClass = true
        this.addSwithClass = true
      }
    },
    playIndex(index) {
      this.addSwithClass = true
      /**
       * playType === 0  专辑页面播放
       * playType === 1  推荐歌曲页面播放
       */
      if (this.$store.state.player.playType === 0) {
        this.$store.commit("PLAYAUDIO", {
          playType: 0,
          isShowPlayer: true,
          album: this.player.album,
          index: index,
          id: this.player.id,
          playerBg: this.player.album[index].playerBg,
          albumImgSrc: this.player.album[index].albumImgSrc
        })
      } else if (this.$store.state.player.playType === 1) {
        this.$store.commit("PLAYAUDIO", {
          playType: 1,
          isShowPlayer: true,
          album: this.player.album,
          index: index,
          id: this.player.id,
          playerBg: this.player.playerBg,
          albumImgSrc: this.player.albumImgSrc
        })
      }
    },
    play() {
      let currentTime = document.getElementById('audio').currentTime
      let duration = document.getElementById('audio').duration
      let paused = document.getElementById('audio').paused
      let ended = document.getElementById('audio').ended
      // 歌曲是否结束
      if (ended && this.isNext) {
        this.isNext = false
        // 当前为最后一首, 则播放器暂停
        if (this.index === this.player.album.length - 1 && ended) {
          document.getElementById("audio").pause()
          this.addSwithClass = false
        } else {
          this.goNext()
        }
        this.isNext = true
      }
      // 判断播放状态
      if (!paused) {
        if (this.isAddSwithClass) {
          this.addSwithClass = true
          this.isAddSwithClass = false
        }
      }
      this.currentTime = currentTime
      this.duration = duration
      for (let p = 0; p < this.lyric.length - 1; p++) {
        if (this.currentTime > this.lyric[p][0]) {
          $('.lyric ul li').removeClass('cur').eq(p).addClass('cur')
          $('.lyric ul').css('top', 200 - 20 * (p + 1))
        }
      }
    },
    showSongList() {
      this.isShowSongList = true
    },
    closeSongList() {
      this.isShowSongList = false
    },
    songListIndex(index) {
      this.playIndex(index)
    }
  },
  filters: {
    timeReversal: function(second) {
      let t
      if (second > -1) {
        let min = second >= 3600 ? (Math.floor(second / 60) % 60) : Math.floor(second / 60) + ''
        let sec = ~~(second % 60) + ''
        min = ('00' + min).substring(min.length)
        sec = ('00' + sec).substring(sec.length)
        t = min + ':' + sec
      }
      return t
    }
  }
}
</script>
<style lang="stylus" scoped>
  .audio-player
    position fixed
    top 0
    left 0
    width 100%
    background #fff
    z-index 1
    .header
      position relative
      top 0
      left 0
      height 50px
      line-height 50px
      text-align center
      font-size 16px
      color #fff
      .icon-arrow-left2
        position absolute
        display block 
        top 0
        left 0
        width 50px
        height 50px
        font-size 24px
        line-height 50px
        color #fff
    .content-cd
      position relative
      width 100%
      padding-top 50px
      overflow hidden
      .cd 
        position relative
        width 100%
        animation rotate 5s linear infinite paused
        &.cur
          animation-play-state running
        .cd-img
          display block 
          margin 0 auto 
          width 70%
          border-radius 50%
          box-shadow 0 0 30px #fff
          border 10px solid rgba(0, 0, 0, .6)
        .singerImg
          position absolute 
          top 50%
          left 50%
          width 40%
          transform translate(-50%, -50%)
          overflow hidden
          border-radius 50%
          img 
            width 100%
      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      .switch
        position absolute
        width 110px
        height 165px
        top -18px
        left 62%
        transform translate(-50%) rotate(-23deg)
        transform-origin 15px 15px
        transition all 1s ease  
        z-index 4
        &.cur
          transform translate(-50%) rotate(0deg)
        img
          width 100%
    .lyric
      position relative
      overflow hidden
      ul
        position absolute
        width 100%
        transition all 1s ease 
        li
          color rgba(0, 0, 0, .7)
          text-align center
          font-size 1px
          height 20px
          line-height 20px
          &.cur
            color #fff
    .setting
      padding-top 50px
      ul
        overflow hidden
        margin 0 auto 
        width 70%
        li
          float left
          width 25%
          height 50px
          line-height 50px
          text-align center
          font-size 24px
          color rgba(0, 0, 0, .7)
    .timeBar
      overflow hidden
      width 100%
      height 40px
      .startTime
        float left
        width 15%
        height 40px
        line-height 40px
        font-size 1px
        text-align right 
        color rgba(255, 255, 255, .8)
      .bar
        float left
        width 60%
        height 2px
        margin 19px 5%
        .duration
          position relative
          display block
          height 2px
          width 100%
          background wheat
          .currentTime
            position absolute
            top 0
            left 0
            height 2px
            width 20%
            background gold
            display block
      .endTime
        float left
        width 15%
        height 40px
        line-height 40px
        font-size 1px
        text-align left 
        color rgba(255, 255, 255, .8)
    .controller
      ul
        overflow hidden
        li
          float left
          width 20%
          height 50px
          text-align center 
          line-height 50px
          font-size 30px
          color rgba(255, 255, 255, .7)
          &.icon-media-pause-outline, &.icon-media-play-outline
            font-size 48px
    .songListPopWindow
      position fixed
      top 0
      left 0
      width 100%
      transition all .4s ease
      background rgba(0, 0, 0, .7)
      opacity 0
      z-index -1
      &.cur
        opacity 1
        z-index 0
        .list-wrapper
          bottom 0
      .list-wrapper
        position absolute
        bottom -240px
        left 0
        width 100%
        height 240px
        transition all .4s ease
        overflow-y scroll
        background #fff
        .title
          overflow hidden
          height 40px
          .icon-cancel-circle
            position absolute
            top 0
            right 0
            float right 
            width 40px
            height 40px
            line-height 40px
            text-align center
            font-size 20px
        ul
          .songList-item
            border-top 1px solid #ccc
            overflow hidden
            height 40px
            text-indent 1em  
            .text
              font-size 14px
              line-height 40px
            &.cur
              color red
            .icon-play_circle_outline 
              float right
              width 40px
              height 40px
              line-height 40px
              text-align center
              font-size  24px
              position relative
              right 1em
          
</style>
