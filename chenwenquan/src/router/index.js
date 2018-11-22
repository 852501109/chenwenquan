import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Message from '@/components/Message'
import Status from '@/components/Status'
import doctorAuth from '@/components/DoctorAuth'
import signin from '@/components/signin'
import loginByPwd from '@/components/LoginByPwd'
import findPwdPhoneNum from '@/components/FindPwdPhoneNum'
import changePwdPage from '@/components/ChangePwdPage'
import patientPage from '@/components/PatientPage'
import doctorPage from '@/components/DoctorPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      redirect: '/signin'
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/message',
      name: 'message',
      component: Message
    },
    {
      path: '/status',
      name: 'status',
      component: Status
    },
    {
      path: '/doctorAuth',
      name: 'doctorAuth',
      component: doctorAuth
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin
    },
    {
      path: '/loginByPwd',
      name: 'loginByPwd',
      component: loginByPwd
    },
    {
      path: '/findPwdPhoneNum',
      name: 'findPwdPhoneNum',
      component: findPwdPhoneNum
    },
  
    {
      path: '/changePwdPage',
      name: 'changePwdPage',
      component: changePwdPage
    },
  
    {
      path: '/patientPage',
      name: 'patientPage',
      component: patientPage
    },
    {
      path: '/doctorPage',
      name: 'doctorPage',
      component: doctorPage
    },
    {
      path: '/doctorDiagnosisIndex',
      name: 'DoctorDiagnosisIndex',
      component: resolve => require(['@/views/DiagnosisConsultation/DoctorDiagnosisIndex'],resolve)
    },
    {
      path: '/patientIndex',
      name: 'PatientIndex',
      component: resolve => require(['@/views2.0/Index/PatientIndex'],resolve)
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: resolve => require(['@/views/ReservationsProcess/Recommend'],resolve)
    },
    {
      path: '/firstConsultation',
      name: 'FirstConsultation',
      component: resolve => require(['@/views/ReservationsProcess/FirstConsultation'],resolve)
    },
    {
      path: '/patientInquisition',
      name: 'PatientInquisition',
      component: resolve => require(['@/views/ReservationsProcess/PatientInquisition'],resolve)
    },
    {
      path: '/doctorData',
      name: 'DoctorData',
      component: resolve => require(['@/views/PersonalData/DoctorData'],resolve)
    },
    {
      path: '/doctorInquisition',
      name: 'DoctorInquisition',
      component: resolve => require(['@/views/ReservationsProcess/DoctorInquisition'],resolve)
    },
    {
      path: '/descriptionDisease',
      name: 'DescriptionDisease',
      component: resolve => require(['@/views2.0/ReservationsProcess/DescriptionDisease'],resolve)
    }
    ,
    {
      path: '/mapSearch',
      name: 'MapSearch',
      component: resolve => require(['@/components/MapSearch'],resolve)
    }
    ,
    {
      path: '/mathDoctor',
      name: 'MathDoctor',
      component: resolve => require(['@/views2.0/ReservationsProcess/MathDoctor'],resolve)
    },
    {
      path: '/appointmentTime',
      name: 'AppointmentTime',
      component: resolve => require(['@/components/AppointmentTime'],resolve)
    },
    {
      path: '/ownSelectDoctor',
      name: 'OwnSelectDoctor',
      component: resolve => require(['@/views2.0/ReservationsProcess/OwnSelectDoctor'],resolve)
    },
    {
      path: '/sureOrder',
      name: 'SureOrder',
      component: resolve => require(['@/views2.0/ReservationsProcess/SureOrder'],resolve)
    },
    {
      path: '/wechatLog',
      name: 'WechatLog',
      component: resolve => require(['@/components/WechatLog'],resolve)
    },
    {
      path: '/userProtocol',
      name: 'UserProtocol',
      component: resolve => require(['@/views2.0/UserProtocol/UserProtocol'],resolve)
    },
    {
      path: '/privacyPolicy',
      name: 'PrivacyPolicy',
      component: resolve => require(['@/views2.0/UserProtocol/PrivacyPolicy'],resolve)
    },
    {
      path: '/useClause',
      name: 'UseClause',
      component: resolve => require(['@/views2.0/UserProtocol/UseClause'],resolve)
    }
  ]
})
