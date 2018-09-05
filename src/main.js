import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import changeFontSize from '../static/js/init'
import navBar from './components/common/navBar'
import mySearch from './components/common/mySearch'
import axios from 'axios'
import store from './vuex/store'
import vuePicturePreview from 'vue-picture-preview'

// 图片预览功能
Vue.use(vuePicturePreview)
// axios配置
axios.defaults.baseURL = 'http://47.95.210.82/chat/'
// axios.defaults.baseURL = 'http://localhost:8080/chat/'

Vue.use(MuseUI)
Vue.prototype.$axios = axios
// 注册全局自定义组件
Vue.component('nav-bar', navBar)
Vue.component('my-search', mySearch)
// 动态设置html的font-size
changeFontSize(window)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
