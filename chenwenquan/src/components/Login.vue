<template>
<div>
  <div class="hello contaner">
    <p class="h3Title">欢迎来到中医药港</p>
    <div class="phoneRegister"><router-link to="/register">手机号注册</router-link></div>
    <div class="wxResister"><router-link to="/wxlogin">使用微信号</router-link></div>
    <div style="color:#ffffff;text-align:center;">其他方式</div>
    <div class="loginAccount"><a href="#/signin" >已有账号,现在登录</a></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js '
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.h3Title{
  color:#ffffff;
  margin-bottom:100px;
  font-size: 2rem;
  padding-top:3rem;
  font-weight: inherit;
  letter-spacing: 0.1rem;
  padding-bottom: 3rem;
  text-align:center;
}
.hello{
  background-image: linear-gradient(to bottom, #6ad6af,#fff);
  overflow: auto;
  height: 100vh;
  width: 100%;
}
.phoneRegister{
  width: 16rem;
  height: 2.5rem;
  margin:0 auto;
  border-radius: 1.5rem;
  line-height: 2.5rem;
  text-align: center;
  background: #ffffff;
}
.phoneRegister>a{
    color:#6ad6af;
    text-decoration: none;
}
.wxResister{
  width: 16rem;
  height: 2.5rem;
  line-height: 2.5rem;
  border-radius: 1.5rem;
  border:1px solid #ffffff;
  margin:1rem auto;
  text-align: center;
}
.wxResister>a{
  color:#ffffff;
  text-decoration: none;
}
.loginAccount{
  width: 16rem;
  height: 2.5rem;
  line-height: 2.5rem;
  border-radius: 1.5rem;
  /* border:1px solid #ffffff; */
  margin:1rem auto;
  text-align: center;
}
.loginAccount>a{
  color:#1b0101;
  text-decoration: underline;
}
</style>
