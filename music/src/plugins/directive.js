export default function(Vue) {
  Vue.directive("height", {
    inserted(el, binding) {
      if (binding.value == undefined) {
        console.log(el.height, window.innerHeight)
        el.style.height = window.innerHeight + 'px'
      } else if (typeof binding.value == 'number') {
        el.style.height = (window.innerHeight - binding.value) + 'px'
      }
    }
  })
}