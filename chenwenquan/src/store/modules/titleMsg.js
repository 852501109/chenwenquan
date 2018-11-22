export default{
    state:{
        msg:'我的',
        show:false,
        back:true,
        close:false
    }
    ,
    getters:{
        //可定义多个
        visible(state){//这里的state对应着上面这个state
            return !state.show;
        }
    },
    mutations:{
        title_hide(state){
            state.show = false
        },
        msg_patient_diagnosis(state){
            state.msg = '我的诊疗'
            state.show = false
            state.back = false
        },
        first_consultation(state){
            state.msg = '中医咨询'
            state.show = true
            state.back = true
        },
        msg_recommend(state){
            state.msg = '推荐医生'
            state.show = true
            state.back = true
        },
        msg_doctor_data(state){
            state.msg = '医生详情'
            state.show = true
            state.back = true
        },
        msg_disease_descript(state){
            state.msg = '病情描述'
            state.show = true
            state.back = false
            state.close = true
        },
        msg_doctorInquisition_data(state){
            state.msg = '患者'
            state.show = true
            state.back = true
            state.close = false
        },
        msg_math_descript(state){
            state.msg = '匹配结果'
            state.show = true
            state.back = true
            state.close = false
        },
        msg_own_selectdoctor(state){
            state.msg = '自选医生'
            state.show = true
            state.back = true
            state.close = false
        },
        msg_select_address(state){
            state.msg = '选择地址'
            state.show = true
            state.back = false
            state.close = true
        }
        ,
        msg_appointment(state){
            state.msg = '预约时间'
            state.show = true
            state.back = true
            state.close = false
        },
        msg_sureOrder(state){
            state.msg = '确认订单'
            state.show = true
            state.back = true
            state.close = false
        },
        msg_signin(state){
            state.msg = '手机快速登录'
            state.show = true
            state.back = true
            state.close = false
        },
        msg_logopwd(state){
            state.msg = '密码登录'
            state.show = true
            state.back = true
            state.close = false
        },
        msg_changepwd(state){
            state.msg = '找回密码'
            state.show = true
            state.back = true
            state.close = false
        },
        msg_chatlog(state){
            state.msg = ''
            state.show = true
            state.back = true
            state.close = false
        },
        msg_register(state){
            state.msg = "账号注册"
            state.show = true
            state.back = true
            state.close = false
        },
        msg_protocol(state){
            state.msg = "用户协议"
            state.show = true
            state.back = true
            state.close = false
        },
        msg_privacy(state){
            state.msg = "隐私协议"
            state.show = true
            state.back = true
            state.close = false
        },
        msg_clause(state){
            state.msg = "使用条款"
            state.show = true
            state.back = true
            state.close = false
        },
        msg_choice (state){
            state.msg = "选择身份"
            state.show = true
            state.back = false
            state.close = false
        },
    }
}
