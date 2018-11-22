import Vue from 'vue'
import vuex, { install } from 'vuex'
Vue.use(vuex);
import title_msg from './modules/titleMsg.js'
import user_info from './modules/userInfo.js'
import map_info from './modules/map.js'
import logo_info from './modules/logo.js'
export default new vuex.Store({
    modules: {
        title:title_msg,
        userInfo:user_info,
        mapInfo:map_info,
        logoInfo:logo_info
    }
})
