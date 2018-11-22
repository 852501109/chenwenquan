<template>

   <el-container class="contaner content" >  
     <el-main>
       <div class="maindiv">
         <el-row :gutter="20" class="pXiah">
          <el-col :span="20"><div class="grid-content bg-purple"><input ref="inpFocus" @blur = "voidAll(1)"  class="inpIphone" maxlength="11" placeholder="输入手机号" v-model.number="cellPhone"></div></el-col>
          <div class="tipmsg" style="top:40px;">{{tipmsg}}</div>
        </el-row>
        <el-row :gutter="20" class="pXiah" >
          <el-col :span="20"><div class="grid-content bg-purple"><input ref="inpFocus" @keyup="voidAll(2)" :type="isPassword" maxlength="20" class="inpIphone" placeholder="请输入密码" v-model="passwd"></div><i @click="changePwd" class="seepwd icon iconfont">&#xe62e;</i></el-col>
          <div class="tipmsg" style="top:40px;">{{pwdTipmsg}}</div>
        </el-row>
        <el-row :gutter="20" class="btnr" style="">
    
          <el-col :span="24"><div class="grid-content bg-purple"><el-button type="danger"  :class="{isVoidActive:!isVoidActive}"  @click="spaStatus" style="background:#10cb7e;border:0px;width:100%;text-align:center;margin-left:-20px;">登录</el-button></div></el-col>
        </el-row>

        <el-row :gutter="20" class="btnr" style="">
    
          <el-col :span="24"><div class="grid-content bg-purple" style="text-decoration: none;color: #504f4f;float: right;margin-right: 23px;font-size: 0.8rem;"><a href="javascript:void(0);"  @click="toPhonePage">忘记密码了吗？点此找回密码</a></div></el-col>
        
        </el-row>
       </div>

     </el-main>
     <public-js  ref="publicjs"></public-js>
   </el-container>
   
</template>

<script>
import publicJs from '@/components/PublicJs'
import {existCustomerUnite,loginByPwd} from '@/api/Registerlogo'
export default {
  name: 'loginByPwd',
  components:{
    publicJs
  },
  data () {
    return {
      tipmsg:'',
      isPassword:'password',
      pwdTipmsg:'',
      isVoidActive:false,
      loginType:2, //1、验证码登录 2、密码登录
      passwd:"",
      cellPhone:"",
    }
  },
  methods:{
    voidAll(type){
      if(type === 1){
        if(!this.idenfyCellphone(this.cellPhone,this) || this.passwd === ""){
              this.isVoidActive = false
        }
      }
      if(type === 2){
        if(this.tipmsg === "" && type === 2 && this.passwd !== "" && this.cellPhone !=""){
                this.isVoidActive = true
                this.pwdTipmsg = ""
        }else{
                this.isVoidActive = false
        }
      }
    },
    toPhonePage(){
      this.$router.push({path: '/findPwdPhoneNum',query: {cellPhone:this.cellPhone}});
    },
    changePwd(){
      if(this.isPassword!=""){
          this.isPassword = this.isPassword === "password"? 'text':'password'
      }
    },
    spaStatus(){
      let myreg = /^[0-9]{11}$/;
      if (!myreg.test(this.cellPhone)) {
          this.tipmsg = "请输入正确的手机号"
          return
      }
      if(this.isVoidActive){
        loginByPwd(this.cellPhone,this.passwd).then(res =>{
            if(res.data.returnCode === 1){
              sessionStorage.setItem('customerId',res.data.returnDataList.customer.customerId)
              if(res.data.returnDataList.feature === ""){
                this.$router.push('/status')
                return
              }
              this.$router.push({path:'/patientIndex'})
            }else{
              if(res.data.returnCode === 2007){
                this.pwdTipmsg = '密码错误，请重试'
              }
            }
        })
      }
   }
  }
}
</script>

<style scoped>
.fanhui{
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  border-radius: 1.5rem;
  border:1px solid #ffffff;
  color: #ffffff;
  font-size:2rem;
  float: left;
}

.maindiv{
  margin:0 auto;
  min-width:300px;
  max-width: 480px; 
}

.pXiah{
  margin-top: 29px;
  border-bottom: 2px solid #ffffff;
  padding-bottom: 10px;
  background: #ffffff;
  border-radius: 5px;
  height: 37px;
  padding-top: 10px;
}
.inpIphone{
  background:#ffffff;
  border:none;
  outline:none;
}
.btn{
  height: 1.6rem;
  text-align: center;
  width: 100%;
  background-color: #11cc49;
  border-radius:0.3rem;
}
.btnr{
  margin-top: 1.5rem;
  padding-bottom: 0.2rem;
  height: 3rem;
  padding-top: 10px;
}
</style>
