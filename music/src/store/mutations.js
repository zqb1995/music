const mutations = {
  GETALL(state, payload) {
    state.mapList = payload.data.mapList
  },
  TOGGLE_ALBUM(state, payload) {
    state.album.isShowAlbum = payload.isShowAlbum
    state.album.albumList = payload.albumList
    state.album.index = payload.index
  },
  TOGGLE_PLAYER(state, payload) {
    state.player.isShowPlayer = payload.isShowPlayer
  },
  PLAYAUDIO(state, payload) {
    state.player.playType = payload.playType
    state.player.isShowPlayer = payload.isShowPlayer
    state.player.album = payload.album
    state.player.index = payload.index
    state.player.id = payload.id
    state.player.playerBg = payload.playerBg
    state.player.albumImgSrc = payload.albumImgSrc
  }
}
export default mutations