// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import Mint from 'mint-ui';
import store from './store'
import rem from '@/utils/rem.js'
import getping from '@/assets/js/getping'
import Base  from '@/utils/base'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/global.css';
import '@/assets/iconfont/iconfont.css';
import '@/assets/iconfont/iconfont.ttf';
Vue.config.productionTip = false
Vue.use(Base);
Vue.use(rem);
Vue.use(Mint);
Vue.use(ElementUI);
Vue.use(getping)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  data: {
    eventHub: new Vue()
  }
})
