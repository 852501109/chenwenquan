import Vue from 'vue'
import vuex, { install } from 'vuex'
Vue.use(vuex);
import dialog_token from './modules/submit.js'
import institution_id from './modules/userInfo.js'
import verification_code from './modules/verificationCode.js'
export default new vuex.Store({
    modules: {
        token:dialog_token,
        institutionId:institution_id,
        verificationCode: verification_code
    }
})