<template>

  <el-container class="contaner content">
    <el-main>
      <div class="maindiv">
        <el-row :gutter="20" class="pXiah" style="margin-bottom:28px;">
          <el-col :span="20">
            <div class="grid-content bg-purple"><input placeholder="输入验证码" class="inpIphone" v-model.number="sendMterrcode" maxlength="4"></div>
          </el-col>
          <timer-btn style="top: 0px;height: 25px;line-height: 40px;" @run="uptet" ref="timer"></timer-btn>
        </el-row>
        <el-row :gutter="20" class="pXiah">
          <el-col :span="24">
            <div class="grid-content bg-purple">
               <input style="width:70%;"  placeholder="请输入新密码(6-20个字母或数字)" ref="" class="inpIphone" v-model="passwd" @keyup="checkPasswd" :type="isPassword" maxlength="20" />
               <i @click="changePwd" class="seepwd icon iconfont">&#xe62e;</i>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="pXiah">
          <el-col :span="20">
            <div class="grid-content bg-purple">
                <input placeholder="确认密码"   class="inpIphone" v-model="repasswd" :type="isPassword" maxlength="20" @keyup="checkPasswd" />
            </div>
          </el-col>
        </el-row>
         <div class="tipmsg" style="top: 14px;margin-left: -21px;position: relative;">{{tipmsg}}</div>
        <el-row :gutter="20" class="btnr" style="">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-button type="danger" @click="spaStatus"  
                :class="{isVoidActive:!isVoidActive}" 
                 style="margin-left: -14px;background:#10cb7e;border:0px;width:100%;text-align:center">注册</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-main>
    <public-js ref="publicjs"></public-js>
  </el-container>
</template>

<script>
import timerBtn from "@/components/LoginTimerBtn";
import publicJs from "@/components/PublicJs";
import {register} from "@/api/Registerlogo"
export default {
    name: "changePwdPage",
    components: {
        publicJs,
        timerBtn
    },
    data() {
        return {
            isPassword: "password",
            isVoidActive:false,
            tipmsg:'',
            loginType: 1, //1、验证码登录 2、密码登录
            list: 0,
            cellPhone: "",
            sendMterrcode: "",
            timeout: 60,
            mtmsgid: "",
            passwd: "",
            repasswd: ""
        };
    },
    mounted() {
        this.cellPhone = this.$route.query.cellPhone;
        this.uptet();
    },
    methods: {
        history1() {
            this.$router.push({ path: "/findPwdPhoneNum" });
        },
        changePwd() {
            if (this.isPassword != "") {
                this.isPassword =
                    this.isPassword === "password" ? "text" : "password";
            }
        },
        spaStatus() {
            if(!this.isVoidActive){ return }
            register(this.cellPhone,this.sendMterrcode,this.mtmsgid,this.passwd).then(res =>{
                if(res.data.returnCode === 1){
                    this.tips().success('注册成功')
                    this.$router.push({path:'/'})
                }else{
                    //处理验证码
                }
            })
        },
        checkPasswd() {
            const reg = /^[0-9A-Za-z]{6,20}$/
            if(this.repasswd === "" && this.passwd === ""){
                this.isVoidActive = false
                this.tipmsg = ""
            }
            else if(!reg.test(this.repasswd)){
                this.isVoidActive = false
                this.tipmsg = "请输入6-20位字母或数字"
            }else if ( this.repasswd != this.passwd) {
                this.tipmsg = "两次密码输入不同"
                this.isVoidActive = false
                return false;
            }else{
                this.tipmsg = ""
                this.isVoidActive = true
            }
        },
        uptet() {
            this.$refs.timer.start();
            var url =
                this.$refs.publicjs.server_customer_url +
                "/customerSms/getVerificationCode";
            var params = {
                cellPhone: this.cellPhone
            };
            var slf = this;
            this.$refs.publicjs.post(url, params, function(data) {
                if (data.returnStatus === 1) {
                    slf.sendMterrcode = data.returnDataList.sendMterrcode;
                    slf.mtmsgid = data.returnDataList.mtmsgid;
                } else {
                    slf.tips().warning(data.returnMsg);
                }
            });
            this.list = this.timeout;
            var interval = setInterval(() => {
                this.list--;
                if (this.list == 0) {
                    clearInterval(interval);
                }
            }, 1000);
        }
    }
};
</script>

<style scoped>
.fanhui {
    width: 3rem;
    height: 3rem;
    line-height: 3rem;
    border-radius: 1.5rem;
    border: 1px solid #ffffff;
    color: #ffffff;
    font-size: 2rem;
    float: left;
}

.title1 {
    font-size: 2rem;
    text-align: center;
    color: #ffffff;
    margin-top: 3rem;
}
.maindiv {
    margin: 0 auto;
    min-width: 300px;
    font-size: 0.8rem;
}

.pXiah {
    border-bottom: 2px solid #ffffff;
    padding-bottom: 10px;
    background: #ffffff;
    border-radius: 5px;
    height: 38px;
    padding-top: 10px;
}
.inpIphone {
    background: #ffffff;
    border: none;
    outline: none;
}
.btn {
    height: 1.6rem;
    text-align: center;
    width: 100%;
    background-color: #11cc49;
    border-radius: 0.3rem;
}
.btnr {
    margin-top: 1.5rem;
    padding-bottom: 0.2rem;
    height: 3rem;
    padding-top: 10px;
}
</style>



