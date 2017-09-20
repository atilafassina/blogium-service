import Vue from 'vue'
import App from './App.vue'

 function getPosts () {
  // const resp = await fetch('https://blogium.wedeploy.io/atilafassina')
  // return resp.json()
  return [
    { 'id': 'foo' }
  ]
}

new Vue({
  el: '#app',
  props: {
    title: 'title',
    postList: getPosts()
  },
  render: h => h(App)
})
