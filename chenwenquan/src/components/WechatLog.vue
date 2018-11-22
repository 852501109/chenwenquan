<template>
 
    <div>
         <div class="maindiv" v-show = "isFirst">
            <el-row :gutter="20" class="pXiah">
            <el-col :span="20">
                <div class="grid-content bg-purple"><input  ref="inpFocus" placeholder="请输入手机号" maxlength="11" class="inpIphone" v-model.number="cellphone " ></div>
            </el-col>
         
            </el-row>
            <div class="bind" @click="nextStep()">下一步</div>
        </div>
        <div class="maindiv" v-show = "!isFirst">
            <el-row :gutter="20" class="pXiah">
            <el-col :span="20">
                <div class="grid-content bg-purple"><input  ref="inpFocus" placeholder="请输入验证码" maxlength="11" class="inpIphone" v-model.number="verifiCode " ></div>
            </el-col>
            <timer-btn style="top: 4px;"  @run="uptet"  :cellPhone="cellPhone" ref="timer"></timer-btn>
            </el-row>
            <div class="bind">绑定</div>
        </div>
    </div>
</template>

<script>
import timerBtn from "@/components/LoginTimerBtn"
export default {
    name: "signin",
    components: {
        timerBtn
    },
    data() {
        return {
            loginType: 1, //1、验证码登录 2、密码登录
            cellphone:'',
            isFirst:true,
            list: 0,
            verifiCode: "",
            sendMterrcode: "",
            timeout: 60,
            mtmsgid: "",
            mimarow: false,
            coderow: true
        }
    },
    methods: {
       uptet(){
           this.$refs.timer.start();
       },
       nextStep(){
           this.isFirst = false
           this.$refs.timer.start();
       }
    }
}
</script>

<style scoped lang="scss">
    .maindiv{
        margin: 19px 10%;
        width: 84%;
    }
    .bind{
        width: 80%;
        margin: 30px 6%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #9e9e9e;
        border-radius: 6px;
        color: #fff;
    }
    .pXiah{
        margin-top: 20px;
        border-bottom: 2px solid #ffffff;
        padding-bottom: 20px;
        background: #ffffff;
        border-radius: 5px;
        height: 40px;
        padding-top: 10px;
    }
    .inpIphone{
        background: #ffffff;
        border: none;
        outline: none;
        padding-left: 9px;
        line-height: 23px;
    }

</style>
