<template>
    <div class="index">
        <div class="index-wrapper" ref="indexWrapper">
            <swiper-x :swiper="swiperArr"></swiper-x>
            <div class="albumList">
                <h3 class="title">专辑列表</h3>
                <div class="list-wrapper">
                    <ul>
                        <li v-for="(item,index) in albumList" @click="showAlbum(item,index)" class="list-item">
                            <div class="album-wrapper">
                                <img :src="item.albumImgSrc">
                            </div>
                            <p class="album-name">{{item.albumTitle}}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="recommendList">
                <h3 class="title">热歌列表</h3>
                <div class="list-wrapper">
                    <ul>
                        <li v-for="(item, index) in recommendList" @click="playRecomment(recommendList, index)">
                            <span class="index">{{index + 1}}</span>
                            <div class="item-content">
                                <p>{{item.musicName}}</p>
                                <p>{{item.musicSinger}}</p>
                            </div>
                            <span class="icon-play_circle_outline"></span>
                        </li>
                    </ul>
                </div>  
            </div>
            <transition name="slide">
                <music-album class="album" v-if="$store.state.album.isShowAlbum" :albumList="albumList[$store.state.album.index]"></music-album>
            </transition>
        </div>
    </div>
</template>
<script>
import carousel from '../../components/carousel/carousel';
import album from '../../components/album/album';
import { randomNum } from '../../assets/js/util'
import Vue from 'vue';
export default {
    data() {
        return {
            // 轮播图数据
            swiperArr: [{
                imgUrl: "http://p1.music.126.net/piXJCyIWqYGWEYy2AFnoBA==/19047939440081948.jpg",
            }, {
                imgUrl: "http://p1.music.126.net/-pzOigsoJj3vZehOQqj6vA==/18801648837108169.jpg",
            }, {
                imgUrl: "http://p1.music.126.net/JFBuZQCQJF9vCwsp3tnhzg==/18801648837108172.jpg",
            }, {
                imgUrl: "http://p1.music.126.net/tN-BGO2bOm59xLvf7WOhCA==/18963277044745659.jpg",
            }, {
                imgUrl: "http://p1.music.126.net/QlMwys9zc4Bg3Rm5qj8fsA==/19161189137713255.jpg",
            }],
        }
    },
    created() {
        // 拉去全部数据
        this.$store.dispatch("GETALL")
    },
    methods: {
        showAlbum(item, index) {
            this.$store.commit("TOGGLE_ALBUM", {
                isShowAlbum: true,  // 显示专辑
                album: item,        // 专辑内容  
                index: index,        // 专辑序号
            })
        },
        playRecomment(recommendList, index){
            this.$store.commit("PLAYAUDIO", {
                playType: 0,
                isShowPlayer: true,
                album: recommendList,
                index: index,
                id: randomNum(8),
                playerBg: recommendList[index].playerBg,
                albumImgSrc: recommendList[index].albumImgSrc
            })
        }
    },
    computed: {
        albumList() {
            return this.$store.state.mapList.albumList
        },
        recommendList() {
            return this.$store.state.mapList.recommendList
        }
    },
    components: {
        'swiper-x': carousel,
        'music-album': album
    }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/variable.styl'
    .index
        overflow-y: scroll;
        .title
            padding 2% 0
            font-size 16px
            height 30px
            line-height 30px
            color #000
            &:before
                content '|'
                position relative
                top -1px
                margin 0 5px
                font-size 12px
                color $color-background-d
                background $color-background-d
        .albumList
            .list-wrapper
                ul
                    display flex
                    flex-wrap wrap 
                    .list-item
                        flex 0 0 33.33%
                        width 33.33%
                        .album-wrapper
                            width 100%
                            img 
                                width 100%
                        .album-name
                            height 24px
                            line-height 24px
        .recommendList
            .list-wrapper
                ul
                    li
                        overflow hidden
                        border-top 1px solid #ccc
                        .index
                            float left
                            height 40px
                            width 40px
                            line-height 40px
                            text-align center
                        .item-content
                            float left
                            padding 4px 0
                            p
                                font-size 12px
                                &:first-child
                                    font-size 14px
                                    margin-bottom 6px
                        .icon-play_circle_outline
                            float: right;
                            height: 40px;
                            width: 40px;
                            line-height: 40px;
                            text-align: center;
                            font-size: 26px;  
        .album
            transform translate3d(0, 0, 0)
            transition: all 0.4s ease-in
            &.slide-enter, &.slide-leave-to
                transform translate3d(100%, 0, 0)
                
</style>
