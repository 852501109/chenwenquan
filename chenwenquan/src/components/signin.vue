<template>

  <el-container class="contaner content">
    <el-main>
      <div class="maindiv">
            <el-row :gutter="20" class="pXiah" style="margin-top:10px;" >
            <el-col :span="20">
                <div class="grid-content bg-purple"><input  ref="inpFocus" placeholder="请输入手机号" type="number"   maxlength="11" class="inpIphone" v-model.number="cellPhone" @blur="voidAll(1)"></div>
            </el-col>
            <div class="tipmsg" v-if="!isVoid">{{tipmsg}}</div>
            <!-- <span @click="uptet" >发送验证码</span> -->
            <timer-btn  @run="uptet" style="top: 3px;" :cellPhone="cellPhone" ref="timer"></timer-btn>
            </el-row>

            <el-row :gutter="20" class="pXiah" v-if="coderow">
            <el-col :span="17">
                <div class="grid-content bg-purple"><input class="inpIphone" @blur="voidAll(2)" placeholder="请输入验证码" maxlength="4" v-model.number="sendMterrcode" ></div>
                <div class="tipmsg">{{codeTipmsg}}</div>
            </el-col>
            </el-row>

        <!-- <el-row :gutter="20" class="btnr" style="">

          <el-col :span="24">
            <div class="grid-content bg-purple">
              <a href="#/loginByPwd">使用密码登录</a>
            </div>
          </el-col>
        </el-row> -->
        <el-row :gutter="20" class="btnr" style="">

          <el-col :span="24">
            <div class="grid-content bg-purple">
                <div  :class="{isVoidActive:!isVoidActive}" @click="spaStatus" style="width: 100%;background: rgb(16, 203, 126);text-align: center;margin-left: -20px;height: 35px;line-height: 35px;border-radius: 5px;color: #fff;">
                    登录
                </div>
            </div>
          </el-col>
        </el-row>
        <div class="protocol">点击查看"<router-link to="/userProtocol"><span style="color:#11cc49;">用户协议</span></router-link>"和"<router-link to="/privacyPolicy"><span style="color:#11cc49;">隐私政策</span></router-link></div>
        <div class="sub-group"><span><router-link to="loginByPwd">密码登录</router-link></span>&nbsp;&nbsp;&nbsp;&nbsp;|<span><router-link to="register">账号注册</router-link></span></div>
        <div class="sub-chat">
            <div>使用第三方登录</div>
            <div class="chat-wrap">
                <router-link to="wechatLog">
                    <img  width="30" height="30" :src="require('@/assets/image/chat.png')"/>
                </router-link>
            </div>
            </div>
      </div>

    </el-main>
    <public-js ref="publicjs"></public-js>
  </el-container>

</template>

<script>
import publicJs from "@/components/PublicJs";
import timerBtn from "@/components/LoginTimerBtn"
import {existCustomerUnite,loginByCode,loginByPwd} from '@/api/Registerlogo'

export default {
    name: "signin",
    components: {
        publicJs,
        timerBtn
    },
    data() {
        return {
            tipmsg:'',
            codeTipmsg:'',
            isVoid:true,
            isVoidActive:false,
            list: 0,
            cellPhone: "",
            sendMterrcode: "",
            timeout: 60,
            mtmsgid: "",
            mimarow: false,
            coderow: true
        };
    },
    mounted(){
        
    },
    methods: {
        voidAll(type){
            return type === 1?this.idenfyCellphone(this.cellPhone,this):this.idenfyCode(this.sendMterrcode,this)
        },
        uptet(e) {
             existCustomerUnite(this.cellPhone).then(res =>{
                if(res.data.returnCode !== 1){
                    this.isVoid = false
                    return
                }
            })
            if(!this.voidAll(1)){
                return 
            }
            this.$refs.timer.start();
            if (!this.$refs.publicjs.validCellphone(this.cellPhone)) {
                return;
            }

            var url =
                this.$refs.publicjs.server_customer_url +
                "/customerSms/getVerificationCode";
            var params = {
                cellPhone: this.cellPhone
            };
            var slf = this;
            this.$refs.publicjs.post(url, params, function(data) {
                if (data.returnStatus == 1) {
                    slf.sendMterrcode = Number(
                        data.returnDataList.sendMterrcode
                    );
                    slf.mtmsgid = data.returnDataList.mtmsgid;
                } else {
                    this.tips().warning(data.returnMsg)
                }
            });
            this.list = this.timeout;
            var interval = setInterval(() => {
                this.list--;
                if (this.list == 0) {
                    clearInterval(interval);
                }
            }, 1000);
        },
        spaStatus() {
            if(!this.isVoidActive){
                 return
            }
            if(this.sendMterrcode === ''){
                this.codeTipmsg = ''
                return
            }
            loginByCode(this.cellPhone,this.sendMterrcode,this.mtmsgid).then(res =>{
                let data = res.data.returnDataList
                if(res.data.returnCode === 1){
                    sessionStorage.setItem('customerId',data.customer.customerId)
                    if(res.data.returnDataList.feature === ""){
                        this.$router.push({path:'/status'})
                    }else{
                        //这里先写定跳转患者  增加医生后 跳转至医生
                        this.$router.push({path:'/patientIndex'})
                    }
                    
                }else{
                    if(data.returnMsg.indexOf('验证码') !==-1){
                        this.codeTipmsg = data.returnMsg
                    }else{
                        this.tips().warning(data.returnMsg)
                    }
                }
            })
        }
    }
};
</script>

<style scoped lang="scss">
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
.sub-group{
    width: 90%;
    text-align: center;
    margin:40px -20px;
    color: #11cc49;
    a{
       color: #11cc49 !important;  
    }
    span{
        display:inline-block;
        margin-left: 30px;
    }
}
.sub-chat{
    width: 60%;
    margin: 2px 32px;
    font-size: 0.8rem;
    color: #444;
    text-align: center;
}
.chat-wrap{
    width: 50px;
    margin: 15px 81px;
}
.protocol{
    width: 92%;
    text-align: center;
    margin: 11px -20px;
    color: rgb(170, 170, 170);
    font-size: 0.8rem;
}
.getcode{
    position: absolute;
    top: 3px;
    right: 3px;
    padding-left: 10px;
    padding-right: 10px;
}
.title1 {
    font-size: 2rem;
    text-align: center;
    color: #ffffff;
    margin-top: 3rem;
    width: 97%;
}
.maindiv {
    margin: 0 auto;
    min-width: 300px;
    max-width: 480px;
}

.pXiah {
    position: relative;
    border-bottom: 2px solid #ffffff;
    padding-bottom: 20px;
    background: #ffffff;
    border-radius: 10px;
    height: 40px;
    margin-top: 35px;
    line-height: 40px;
}

.inpIphone {
    background: #ffffff;
    border: none;
    outline: none;
}
.btn {
    height: 30px;
    line-height: 30px;
    text-align: center;
    width: 100%;
    background-color: #11cc49;
    border-radius: 0.3rem;
    font-size: 13px;
    color: #fff;
}
.btnr {
    margin-top: 1.5rem;
    padding-bottom: 0.2rem;
    height: 3rem;
    padding-top: 10px;
}

</style>
