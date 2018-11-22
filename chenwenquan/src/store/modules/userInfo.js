export default{
    state:{
        customerId:'',
        consultationId:'',
        consultationSubId:'',
        doctorCustomId:'',
        featureId:'',
        fromCustomerId:'',
        receiveCustomerId:'',
        institutionId:'',
        reservationId:'',
        patientId:'',
        userName:'',
        sex:'',
        patientMobile:''
    },
    mutations:{
        refresh_customerId(state){
            state.customerId =  sessionStorage.getItem('customerId')
        },
        refresh_consultationId(state){
            state.consultationId =  sessionStorage.getItem('consultationId')
        },
        refresh_doctorCustomId(state){
            state.doctorCustomId =  sessionStorage.getItem('doctorCustomId')
        },
        refresh_featureId(state){
            state.featureId =  sessionStorage.getItem('featureId')
        },
        refresh_fromCustomerId(state){
            state.fromCustomerId =  sessionStorage.getItem('fromCustomerId')
        }
        ,
        refresh_consultationSubId(state){
            state.consultationSubId =  sessionStorage.getItem('consultationSubId')
        },
        refresh_receiveCustomerId(state){
            state.receiveCustomerId =  sessionStorage.getItem('receiveCustomerId')
        },
        refresh_institutionId(state){
            state.institutionId =  sessionStorage.getItem('institutionId')
        },
        refresh_reservationId(state){
            state.reservationId =  sessionStorage.getItem('reservationId')
        },
        refresh_patientId(state){
            state.patientId =  sessionStorage.getItem('patientId')
        },
        refresh_userName(state){
            state.userName =  sessionStorage.getItem('userName')
        },
        refresh_sex(state){
            state.sex =  sessionStorage.getItem('sex')
        },
        refresh_patientMobile(state){
            state.patientMobile =  sessionStorage.getItem('patientMobile')
        }
    },
    actions:{
        refresh_all(context){
            context.commit('refresh_customerId')
            context.commit('refresh_consultationId')
            context.commit('refresh_doctorCustomId')
            context.commit('refresh_featureId')
            context.commit('refresh_fromCustomerId')
            context.commit('refresh_consultationSubId')
            context.commit('refresh_receiveCustomerId')
            context.commit('refresh_institutionId')
            context.commit('refresh_reservationId')
            context.commit('refresh_patientId')
            context.commit('refresh_userName')
            context.commit('refresh_sex')
            context.commit('refresh_patientMobile')
        },
    }
}