<template>
    <button class="sendSmsBtn" :class="disabled?'dissendSmsBtn':''" type="button" v-on:click="run" :disabled="disabled || time > 0">{{ text }}</button>
</template>


<script>
import {getVerificationCode} from '@/api/public'
import {filterPhone} from "@/utils/publicMethods"
export default{
    props: {
        second: {
            type: Number,
            default: 60
        },
        cellPhone: {
            type: null,
            default: ''
        },
        smsType: {
            type: null,
            default: ''
        }
    },
    data() {
     return {
        time: 0,
        disabled:false
     }
    },
    methods: {
        run: function () {
         this.$emit('run');
        },
        start: function(){
         this.getCode()
        },
        setDisabled: function(val){
         this.disabled = val;
        },
        getCode(){
            getVerificationCode(filterPhone(this.cellPhone),this.smsType).then( res=>{
                if(res.data.returnCode !== 1){
                    alert(res.data.returnMsg)
                    return false
                }else{
                    alert('短信验证码为：'+ res.data.returnDataList.sendMterrcode)
                    this.time = this.second;
                    this.timer();
                }
            }).catch( err => {
                console.log(err)
            })
        },
        timer: function () {
            if (this.time > 0) {
                this.time--;
                setTimeout(this.timer, 1000);
            }else{
                this.disabled = false;
            }
        }
        
    },
    computed: {
        text: function () {
            return this.time > 0 ? this.time + 's 后重获取' : '获取验证码';
        }
    }
}
</script>

<style lang="scss" scoped>
    .sendSmsBtn{
        position: absolute;
        top: 0px;
        right: 0px;
        height: 34px;
        line-height: 34px;
        border-radius: 3px;
        background: #ffb400;
        border: none;
        padding: 0 6px;
        color: #fff;
        display: inline-block;
        width: 90px;
    }
    .sendSmsBtn.dissendSmsBtn{
        background-color: #FFE39F;
    }
</style>

