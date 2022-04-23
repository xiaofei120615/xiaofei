import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入router和store
import router from './router/router'
import store from './store/store'

// 引入mock，axios
import './mock/mock'
import axios from 'axios'
Vue.prototype.$axios = axios

// 引入瀑布流
import waterfall from 'vue-waterfall2'
Vue.use(waterfall)

//引入图片预览插件
// import preview from 'vue-photo-preview'
// import 'vue-photo-preview/dist/skin.css'
// Vue.use(preview)


//引入视频插件
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
Vue.use(VideoPlayer)

//引入loading插件
import easyLoading from 'easy-loading'
Vue.use(easyLoading)

//引入element-ui
import 'element-ui/lib/theme-chalk/index.css';
import { Skeleton, SkeletonItem, MessageBox, Dialog, Backtop, Icon,
        Carousel, CarouselItem } from 'element-ui'
Vue.use(Skeleton)
Vue.use(SkeletonItem)
Vue.use(Dialog)
Vue.use(Backtop)
Vue.use(Icon)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.prototype.$messageBox = MessageBox;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
