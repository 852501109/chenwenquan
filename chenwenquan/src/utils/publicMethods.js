import {toast,MessageBox} from  'mint-ui';
//日期处理
export function _getDay(){
    // 获取中国标准时间(Wed Nov 07 2018 13:44:06 GMT+0800)
    // new Date(1541569446000)
    // 通过标准时间获取时间戳
    // Date.parse('Wed Nov 07 2018 13:44:06 GMT+0800')
    //获取星期几
    //new Date(1541569446000).getDay()
}

export function chksafe(value) {
    var fibdn = new Array("'", ">", "<", "*", "%", "#", "$", "}", "{", "~", "`", "!", "￥", "?", "&", "^", "(", ")", '=')
    var i = fibdn.length;
    var j = value.length;
    for (var ii = 0; ii < i; ii++) {
        for (var jj = 0; jj < j; jj++) {
            var temp1 = value.charAt(jj);
            var temp2 = fibdn[ii];
            if (temp1 == temp2) {
                return false;
            }
        }
    }
    return true;
}

// 防抖
export function _debounce(fn, wait) {
    let timer = null;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fun();
        }, delay);
    }
}

//函数节流
export function throttle(fun, delay) {
    let last = null;
    return () => {
        const now = + new Date();
        if (now - last > delay) {
            fun();
            last = now;
        }
    }
}

export function removeHandler(element, type, handler) {
    if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
        element.detachEvent('on' + type, handler);
    } else {
        element['on' + type] = null;
    }
}
export function todyStampToTime(isHasDate){
    const date = isHasDate?isHasDate:new Date();//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const S = "今天";
    const M = (date.getMonth()+1 < 10 ? ''+(date.getMonth()+1) : date.getMonth()+1) + '月';
    const D = date.getDate() + '日';
    return S+M+D;
}

export function timestampToTime(isHasDate) {
    const date = isHasDate?isHasDate:new Date();//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const Y = date.getFullYear() + '年';
    const M = (date.getMonth()+1 < 10 ? ''+(date.getMonth()+1) : date.getMonth()+1) + '月';
    const D = date.getDate() + '日';
    const h = date.getHours()<10? '0' + date.getHours()+ ':': date.getHours() +':'
    const m = date.getMinutes()<10? '0'+date.getMinutes():date.getMinutes()
    return Y+M+D;
}
export function yearNtilMonth() {
    const date = new Date();//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const Y = date.getFullYear() + '/';
    const M = (date.getMonth()+1 < 10 ? ''+(date.getMonth()+1) : date.getMonth()+1) + '/';
    const D = date.getDate() ;
    return Y+M+D;
}
// 返回按钮跳转路径配置
export function backCallBack(obj){
    switch(obj.$route.path){
        case '/signin':
            MessageBox({
                title:'验证手机号就可以成功登录了',
                cancelButtonText:'返回',
                confirmButtonText:'继续登录',
                showCancelButton:true,
                callback: function (action) {
                    if(action !== 'confirm'){
                        obj.$router.push({path:'/patientIndex'})
                    }
                }
            })
             break;
        default:
        window.history.back()
    }
    //这里先都写成历史纪录,如果出现清楚缓存问题,应该详细配置
   
    
    // switch(obj.$route.path){
    // case '/firstConsultation':
    // obj.$router.push({path:'/patientDiagnosisIndex'})
    //     break; 
    // case '/recommend':
    // obj.$router.push({path:'/firstConsultation'})
    //     break;  
    // case '/patientInquisition':
    // window.history.back()
    //   //this.$router.push({path:'/recommend'})
    //     break;
    // case '/doctorData':
    // obj.$router.push({path:'/recommend'})
    //     break;
    // case '/doctorInquisition':
    // obj.$router.push({path:'/doctorDiagnosisIndex'})
    //     break;
    // case '/descriptionDisease':
    // obj.$router.push({path:'/patientIndex'})
    //   break;
    // case '/mathDoctor':
    // obj.$router.push({path:'/descriptionDisease'})
    //     break;
    // case '/ownSelectDoctor':
    // window.history.back()
    // //obj.$router.push({path:'/patientIndex'})
    //     break;
    // case '/mapSearch':
    // obj.$router.push({path:'/descriptionDisease'})
    //     break;
    // case '/appointmentTime':
    // obj.$router.push({path:'/mathDoctor'})
    //     break;
    // case '/sureOrder':
    // obj.$router.push({path:'/appointmentTime'})
    //     break;
    // case '/signin':
    // obj.$router.push({path:'/'})
    //     break;
    // case '/loginByPwd':
    // obj.$router.push({path:'/signin'})
    //     break;
    // case '/findPwdPhoneNum':
    // case '/changePwdPage':
    // window.history.back()
    //     break;
    // case '/wechatLog':
    // window.history.back()
    //     break;
    // case '/register':
    // window.history.back()
    // }
}
//   配置每个界面DOM显示或者隐藏
export function assemblyControl(self){
    switch(self.$route.path){
    case '/doctorDiagnosisIndex':
    case '/doctordiagnosisIndex':
    self.$store.commit('title_hide')
    self.$root.eventHub.$emit('footShow', true)
        break;
    case '/patientIndex':
    self.$store.commit('title_hide')
    self.$root.eventHub.$emit('footShow',true)
        break;
    case '/doctorData':
    self.$store.commit('msg_doctor_data')
    self.$root.eventHub.$emit('footShow', false)
        break;
    case '/patientInquisition':
    self.$store.commit('msg_doctor_data')
    self.$root.eventHub.$emit('footShow', true)
        break;
    case '/firstConsultation':
    self.$store.commit('first_consultation')
    self.$root.eventHub.$emit('footShow', false)
        break;
    case '/recommend':
    self.$store.commit('msg_recommend')
    self.$root.eventHub.$emit('footShow', true)
        break;
    case '/doctorInquisition':
    self.$store.commit('msg_doctorInquisition_data')
    self.$root.eventHub.$emit('footShow', false)
        break;
    case '/personalIndex':
    self.$store.commit('msg_my_personal')
    self.$root.eventHub.$emit('footShow', true)
        break;   
    case '/descriptionDisease':
    self.$store.commit('msg_disease_descript')
    self.$root.eventHub.$emit('footShow', false)
        break;
    case '/mathDoctor':
    self.$store.commit('msg_math_descript')
    self.$root.eventHub.$emit('footShow', false)
        break;
    case '/ownSelectDoctor':
    self.$store.commit('msg_own_selectdoctor')
    self.$root.eventHub.$emit('footShow', false)
        break;
    case '/mapSearch':
    self.$store.commit('msg_select_address')
    self.$root.eventHub.$emit('footShow', false)
        break;
    case '/appointmentTime':
    self.$store.commit('msg_appointment')
    self.$root.eventHub.$emit('footShow', false)
        break;
    case '/sureOrder':
    self.$store.commit('msg_sureOrder')
    self.$root.eventHub.$emit('footShow', false)
        break;
    case '/signin':
    self.$store.commit('msg_signin')
    self.$root.eventHub.$emit('footShow', false)
        break;
    case '/loginByPwd':
    self.$store.commit('msg_logopwd')
    self.$root.eventHub.$emit('footShow', false)
        break;
    case '/findPwdPhoneNum':
    case '/changePwdPage':
    self.$store.commit('msg_changepwd')
    self.$root.eventHub.$emit('footShow', false)
        break;
    case '/wechatLog':
    self.$store.commit('msg_chatlog')
    self.$root.eventHub.$emit('footShow', false)
        break;
    case '/register':
    case '/message':
    self.$store.commit('msg_register')
    self.$root.eventHub.$emit('footShow', false)
        break; 
    case '/userProtocol':
    self.$store.commit('msg_protocol')
    self.$root.eventHub.$emit('footShow', false)
        break; 
    case '/privacyPolicy':
    self.$store.commit('msg_privacy')
    self.$root.eventHub.$emit('footShow', false)
        break; 
    case '/useClause':
    self.$store.commit('msg_clause')
    self.$root.eventHub.$emit('footShow', false)
        break; 
    case '/status':
    self.$store.commit('msg_choice')
    self.$root.eventHub.$emit('footShow', false)
        break; 
    }
}
