export const GETALL = async function({ commit }, payload) {
  var data = await fetch('api/data').then(res => res.json())
  commit('GETALL', data)
}
