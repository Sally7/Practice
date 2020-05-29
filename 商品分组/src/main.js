// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'jquery'
import VueResource from 'vue-resource'
import VueVideoPlayer from 'vue-video-player'
 
Vue.use(VueVideoPlayer)
Vue.use(VueResource)
	
Vue.config.productionTip = false

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
