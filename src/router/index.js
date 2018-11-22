import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: resolve => require(['@/views/Login/Index'],resolve)
    },
    {
      path: '/main',
      name: 'Main',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['@/views/Index/Index'],resolve)
    },
    {
      path: '/Register',
      name: 'Register',
      component: resolve => require(['@/views/Register/Index'],resolve)
    },
    {
      path: '/baseStep',
      name: 'BaseStep',
      component: resolve => require(['@/views/Register/BaseStep'],resolve)
    },
    {
      path: '/registersucess',
      name: 'LoginSucess',
      component: resolve => require(['@/views/Register/RegisterSucess'],resolve)
    },
    {
      path: '/findPwdOrAccount',
      name:  'FindPwdOrAccount',
      component: resolve => require(['@/views/FindPwdOrAccount/Index'],resolve)
    },
    {
      path: '/findpwd',
      name:  'FindPwd',
      component: resolve => require(['@/views/FindPwdOrAccount/FindPwd'],resolve)
    },
    {
      path: '/findaccount',
      name:  'FindAccount',
      component: resolve => require(['@/views/FindPwdOrAccount/FindAccount'],resolve)
    },{
      path: '/authentication',
      name: 'Authentication',
      component: resolve => require(['@/views/Authentication/Authentication'],resolve)
    },{
      path: '/agreement',
      name: 'Agreement',
      component: resolve => require(['@/views/Authentication/Agreement'],resolve)
    },{
      path: '/uploadcertificate',
      name: 'UploadCertificate',
      component: resolve => require(['@/views/Authentication/UploadCertificate'],resolve)
    }
    ,{
      path: '/authEnd',
      name: 'AuthEnd',
      component: resolve => require(['@/views/Authentication/AuthEnd'],resolve)
    },{
      path: '/institutionalReview',
      name: 'InstitutionalReview',
      component: resolve => require(['@/views/InstitutionalReview/InstitutionalReview'],resolve)
    }
  ]
})

